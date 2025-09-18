import { Component, importProvidersFrom, inject } from '@angular/core';
import { PageTitleComponent } from '../../../../../../layouts/page-title/page-title.component';
import { RestApiService } from '../../../../../../Core/service/rest-api.service';
import { DomixGridComponent } from '../../../../../../componate/domix-grid/domix-grid.component';
import { FooterComponent } from '../../../../../../layouts/footer/footer.component';
import { SidebarComponent } from '../../../../../../layouts/sidebar/sidebar.component';
import { NavbarComponent } from '../../../../../../layouts/navbar/navbar.component';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { DomixDropdownModule } from '../../../../../../module/domix dropdown/domix-dropdown.module';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';
import { GridSearchService } from '../../../../../../componate/domix-grid/service/grid-search.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { Router, RouterModule } from '@angular/router';
import { Products } from '../../interfaces/product.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../store/actions/product.actions';
import * as ProductSelectors from '../../store/selectors/product.selectors';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../../../../componate/domix-grid-test/domix-grid-test.component';
import { DomixTableService } from '../../../../../../componate/domix-grid-test/service/domix-table.service';
import { DomixPaginationComponent } from '../../../../../../componate/domix-pagination/domix-pagination.component';

@Component({
    selector: 'app-apps-ecommerce-products-list',
    imports: [
        PageTitleComponent,
        RouterModule,
        DomixPaginationComponent,
        FormsModule,
        NgSelectModule,
        FooterComponent,
        CommonModule,
        SidebarComponent,
        NavbarComponent,
        LucideAngularModule,
        DomixDropdownModule,
        NgxSliderModule,
    ],
    templateUrl: './apps-ecommerce-products-list.component.html',
    styleUrl: './apps-ecommerce-products-list.component.scss'
})
export class AppsEcommerceProductsListComponent extends DomixGridTestComponent {
  store = inject(Store);
  products: Products[] = [];
  selectedRows: any[] = [];
  public filterConfig: any = {};
  resetAllFilter = false;
  allowExportCsv = false;
  categories!: string[];
  selectedCategory: string | null = null;
  hasHeaderCheckbox = false;

  products$!: Observable<Products[]>;
  

  public selectedFilters = {
    status: {
      published: true,
      inactive: true,
    },
    minPrice: 0,
    maxPrice: 1000,
  };

  public sliderOptions: any = {
    floor: 0,
    ceil: 100,
    step: 5,
    showTicks: true,
  };

  columnDefs: ColDefs[] = [
    {
      field: 'productID',
      headerName: 'Product Id',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'productName',
      headerName: 'Product Name',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'category',
      headerName: 'Category',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'price',
      headerName: 'Price',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      headerName: 'Revenue',
      sortable: false,
    },
    {
      field: 'qty',
      headerName: 'Quantity',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      headerName: 'Action',
      sortable: false,
    },
  ];

  constructor(
    private apiService: RestApiService,
    private searchService: GridSearchService,
    private router: Router,
    private test: DomixTableService
  ) {
    super(test);

    this.hasHeaderCheckbox = this.columnDefs.some((col) => col.headerCheckbox);
  }
  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());

    this.products$ = this.store.select(ProductSelectors.selectAllProducts);

    this.products$.subscribe((products) => {
      this.gridData = products;
      this.categories = Array.from(
        new Set(this.gridData.map((p) => p.category))
      );
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }

  getRevenue(product: Products){
    console.log(product);
    // return product.price * (product.quantitySold ?? 0);
  }

  onProductCellClick(params: any) {
    const clickedProductData = params.data;
    this.router.navigate([
      `/apps-ecommerce-product-overview/${clickedProductData.productID}`,
    ]);
  }

  selectedItem(event: any): void {
    const selectedRows = event.api.getSelectedRows();
    this.selectedRows = selectedRows;
  }

  editRecord(event: any) {
    this.router.navigate([
      `/apps-ecommerce-create-products/${event.data.productID}`,
    ]);
  }

  editProduct(pId: string) {
    this.router.navigate([`/apps-ecommerce-create-products/${pId}`]);
  }

  overviewProduct(pId: string) {
    this.router.navigate([`/apps-ecommerce-product-overview/${pId}`]);
  }

  delProduct(index: number) {
    const clonedData = [...this.gridData];
    clonedData.splice(index, 1);
    this.gridData = clonedData;
    this.updateDisplayedData();
  }

  delProd() {
    this.products = this.products.filter(
      (product) =>
        !this.selectedRows.some((row) => row.productID === product.productID)
    );
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  onSearch(event: Event) {
    const searchText = (event.target as HTMLInputElement).value;
    this.onSearchChange(searchText);
  }

  catgoryChange() {
    if (this.selectedCategory) {
      const filterModel: any = {};
      filterModel.category = {
        type: 'equals',
        filterType: 'text',
        filter: this.selectedCategory,
      };

      this.appliedFilters = filterModel;
      this.updateDisplayedData();
    }
  }

  onStatusChange() {
    const filterModel: any = {};

    filterModel.status = {
      type: 'contains',
      filterType: 'text',
      filter: null,
    };

    if (
      this.selectedFilters.status.published &&
      !this.selectedFilters.status.inactive
    ) {
      filterModel.status.filter = true;
    } else if (
      !this.selectedFilters.status.published &&
      this.selectedFilters.status.inactive
    ) {
      filterModel.status.filter = false;
    } else if (
      !this.selectedFilters.status.published &&
      !this.selectedFilters.status.inactive
    ) {
      filterModel.status = {
        type: 'contains',
        filterType: 'text',
        filter: null,
      };
    }

    this.appliedFilters = filterModel;
    this.updateDisplayedData();
  }

  applyFilters() {
    const filterModel: any = {};

    filterModel.price = {
      type: 'inRange',
      filterType: 'number',
      filter: this.selectedFilters.minPrice,
      filterTo: this.selectedFilters.maxPrice,
    };

    this.appliedFilters = filterModel;
    this.updateDisplayedData();
  }

  selectedFields() {
    return this.gridData.length > 0 ? Object.keys(this.gridData[0]) : [];
  }

  exportTable() {
    if (!this.gridData || this.gridData.length === 0) {
      return;
    }

    let csvContent = 'data:text/csv;charset=utf-8,';

    const headers = this.columnDefs.map((col) => col.headerName).join(',');
    csvContent += headers + '\n';

    this.gridData.forEach((product) => {
      const row = this.columnDefs
        .map((col) =>
          this.formatField(product[col.field as keyof typeof product])
        )
        .join(',');
      csvContent += row + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'products.csv');
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }

  formatField(fieldValue: any): string {
    if (typeof fieldValue === 'boolean') {
      return fieldValue ? 'Published' : 'InActive';
    }
    if (fieldValue instanceof Date) {
      return fieldValue.toLocaleDateString();
    }
    if (typeof fieldValue === 'number') {
      return fieldValue.toFixed(2);
    }
    return fieldValue ? fieldValue.toString() : '';
  }
}
