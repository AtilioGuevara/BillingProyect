import { Component, inject } from '@angular/core';
import { ColDef, RowSelectedEvent } from 'ag-grid-community';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { DomixGridComponent } from '../../../../componate/domix-grid/domix-grid.component';
import { FooterComponent } from '../../../../layouts/footer/footer.component';
import { SidebarComponent } from '../../../../layouts/sidebar/sidebar.component';
import { NavbarComponent } from '../../../../layouts/navbar/navbar.component';
import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { GridSearchService } from '../../../../componate/domix-grid/service/grid-search.service';

@Component({
    selector: 'app-ag-grid-products-list',
    imports: [PageTitleComponent, RouterModule, DomixGridComponent, LucideAngularModule, FormsModule, NgSelectModule, FooterComponent, CommonModule, SidebarComponent, NavbarComponent, DomixDropdownModule, NgxSliderModule],
    templateUrl: './ag-grid-products-list.component.html',
    styleUrl: './ag-grid-products-list.component.scss'
})
export class AgGridProductsListComponent {
  products = [
    {
      "productName": "Blouse Ruffle Tube top",
      "category": "Fashion",
      "price": "14.99",
      "revenue": "$15,236",
      "qty": 154,
      "image": "assets/images/products/img-01.png",
      "image1": "assets/images/products/img-02.png",
      "image2": "assets/images/products/img-03.png",
      "status": true,
      "brand": "Gucci",
      "description": "lorem ipsm",
      "gender": "female",
      "size": [
        "S"
      ],
      "colores": [
        "Green"
      ],
      "cashOnDelivery": true,
      "visaAndMaster": true,
      "bankTransfer": false,
      "stock": 7,
      "discount": 10,
      "sellingPrice": 5,
      "productID": "PEP-19115"
    },
    {
      "productName": "Gold-colored locket watch",
      "category": "Watch",
      "price": "59.99",
      "revenue": "$18,956",
      "qty": 187,
      "image": "assets/images/products/img-02.png",
      "image1": "assets/images/products/img-01.png",
      "image2": "assets/images/products/img-03.png",
      "status": true,
      "brand": "Gucci",
      "description": "lorem ipsm",
      "gender": "male",
      "size": [
        "XS",
        "S"
      ],
      "colores": [
        "Blue",
        "Green"
      ],
      "cashOnDelivery": false,
      "visaAndMaster": false,
      "bankTransfer": true,
      "stock": 5,
      "discount": 1,
      "sellingPrice": 5,
      "productID": "PEP-19116"
    },
    {
      "productName": "Spar Men Black Running Shoes",
      "category": "Footwear",
      "price": "35.78",
      "revenue": "$0",
      "qty": 487,
      "image": "assets/images/products/img-03.png",
      "image1": "assets/images/products/img-01.png",
      "image2": "assets/images/products/img-02.png",
      "status": false,
      "brand": "Zara",
      "description": "lorem ipsm",
      "gender": "male",
      "size": [
        "L",
        "XL"
      ],
      "colores": [
        "Sky",
        "Red"
      ],
      "cashOnDelivery": false,
      "visaAndMaster": false,
      "bankTransfer": true,
      "stock": 7,
      "discount": 10,
      "sellingPrice": 5,
      "productID": "PEP-19117"
    },
    {
      "productName": "Crop top Sweater Clothing",
      "category": "Fashion",
      "price": "29.49",
      "revenue": "$4,265",
      "qty": 177,
      "image": "assets/images/products/img-04.png",
      "image1": "assets/images/products/img-01.png",
      "image2": "assets/images/products/img-02.png",
      "status": false,
      "brand": "Zara",
      "description": "lorem ipsm",
      "gender": "male",
      "size": [
        "L",
        "XL"
      ],
      "colores": [
        "Sky",
        "Red"
      ],
      "cashOnDelivery": false,
      "visaAndMaster": false,
      "bankTransfer": true,
      "stock": 7,
      "discount": 10,
      "sellingPrice": 5,
      "productID": "PEP-19118"
    },
    {
      "productName": "Sleeve Clothing Leggings",
      "category": "Fashion",
      "price": "22.00",
      "revenue": "$7,465",
      "qty": 183,
      "image": "assets/images/products/img-05.png",
      "image1": "assets/images/products/img-04.png",
      "image2": "assets/images/products/img-03.png",
      "status": true,
      "brand": "Zara",
      "description": "lorem ipsm",
      "gender": "male",
      "size": [
        "L",
        "XL"
      ],
      "colores": [
        "Sky",
        "Red"
      ],
      "cashOnDelivery": false,
      "visaAndMaster": false,
      "bankTransfer": true,
      "stock": 7,
      "discount": 10,
      "sellingPrice": 5,
      "productID": "PEP-19119"
    },
    {
      "productName": "Bra Lace Crop top",
      "category": "Fashion",
      "price": "29.99",
      "revenue": "$9,613",
      "qty": 326,
      "image": "assets/images/products/img-06.png",
      "image1": "assets/images/products/img-01.png",
      "image2": "assets/images/products/img-02 .png",
      "status": true,
      "brand": "Zara",
      "description": "lorem ipsm",
      "gender": "male",
      "size": [
        "L",
        "XL"
      ],
      "colores": [
        "Sky",
        "Red"
      ],
      "cashOnDelivery": false,
      "visaAndMaster": false,
      "bankTransfer": true,
      "stock": 7,
      "discount": 10,
      "sellingPrice": 5,
      "productID": "PEP-19120"
    },
    {
      "productName": "Yellow women shoes",
      "category": "Footwear",
      "price": "36.87",
      "revenue": "$11,074",
      "qty": 147,
      "image": "assets/images/products/img-07.png",
      "image1": "assets/images/products/img-04.png",
      "image2": "assets/images/products/img-05.png",
      "status": false,
      "brand": "Zara",
      "description": "lorem ipsm",
      "gender": "male",
      "size": [
        "L",
        "XL"
      ],
      "colores": [
        "Sky",
        "Red"
      ],
      "cashOnDelivery": false,
      "visaAndMaster": false,
      "bankTransfer": true,
      "stock": 7,
      "discount": 10,
      "sellingPrice": 5,
      "productID": "PEP-19121"
    },
    {
      "productName": "Tote bag Leather Handbag Dolce",
      "category": "Bags",
      "price": "79.99",
      "revenue": "$19,803",
      "qty": 98,
      "image": "assets/images/products/img-08.png",
      "image1": "assets/images/products/img-01.png",
      "image2": "assets/images/products/img-05.png",
      "status": true,
      "brand": "Zara",
      "description": "lorem ipsm",
      "gender": "male",
      "size": [
        "L",
        "XL"
      ],
      "colores": [
        "Sky",
        "Red"
      ],
      "cashOnDelivery": false,
      "visaAndMaster": false,
      "bankTransfer": true,
      "stock": 7,
      "discount": 10,
      "sellingPrice": 5,
      "productID": "PEP-19122"
    },
    {
      "productName": "Hoodie Jacket Letterman Sleeve Coat",
      "category": "Fashion",
      "price": "44.49",
      "revenue": "$9,961",
      "qty": 246,
      "image": "assets/images/products/img-09.png",
      "image1": "assets/images/products/img-07.png",
      "image2": "assets/images/products/img-05.png",
      "status": true,
      "brand": "Zara",
      "description": "lorem ipsm",
      "gender": "male",
      "size": [
        "L",
        "XL"
      ],
      "colores": [
        "Sky",
        "Red"
      ],
      "cashOnDelivery": false,
      "visaAndMaster": false,
      "bankTransfer": true,
      "stock": 7,
      "discount": 10,
      "sellingPrice": 5,
      "productID": "PEP-19123"
    },
    {
      "productName": "Straw hat Cap Cowboy hat Sun hat",
      "category": "Accessories",
      "price": "24.99",
      "revenue": "$6,087",
      "qty": 213,
      "image": "assets/images/products/img-10.png",
      "image1": "assets/images/products/img-4.png",
      "image2": "assets/images/products/img-8.png",
      "status": false,
      "brand": "Zara",
      "description": "lorem ipsm",
      "gender": "male",
      "size": [
        "L",
        "XL"
      ],
      "colores": [
        "Sky",
        "Red"
      ],
      "cashOnDelivery": false,
      "visaAndMaster": false,
      "bankTransfer": true,
      "stock": 7,
      "discount": 10,
      "sellingPrice": 5,
      "productID": "PEP-19124"
    },
    {
      "productName": "Sneakers Shoe Nike Basketball",
      "category": "Footwear",
      "price": "32.00",
      "revenue": "$14,872",
      "qty": 198,
      "image": "assets/images/products/img-11.png",
      "image1": "assets/images/products/img-1.png",
      "image2": "assets/images/products/img-11.png",
      "status": true,
      "brand": "Zara",
      "description": "lorem ipsm",
      "gender": "male",
      "size": [
        "L",
        "XL"
      ],
      "colores": [
        "Sky",
        "Red"
      ],
      "cashOnDelivery": false,
      "visaAndMaster": false,
      "bankTransfer": true,
      "stock": 7,
      "discount": 10,
      "sellingPrice": 5,
      "productID": "PEP-19125"
    },
    {
      "productName": "Bermuda shorts Denim Jeans Waist",
      "category": "Fashion",
      "price": "24.87",
      "revenue": "$5,108",
      "qty": 54,
      "image": "assets/images/products/img-12.png",
      "image2": "assets/images/products/img-5.png",
      "image1": "assets/images/products/img-2.png",
      "status": false,
      "brand": "Zara",
      "description": "lorem ipsm",
      "gender": "male",
      "size": [
        "L",
        "XL"
      ],
      "colores": [
        "Sky",
        "Red"
      ],
      "cashOnDelivery": false,
      "visaAndMaster": false,
      "bankTransfer": true,
      "stock": 7,
      "discount": 10,
      "sellingPrice": 5,
      "productID": "PEP-19126"
    },
    {
      "productName": "Jean jacket Denim Levi Strauss & Co. Jeans",
      "category": "Fashion",
      "price": "39.49",
      "revenue": "$9,780",
      "qty": 119,
      "image": "assets/images/products/img-13.png",
      "image1": "assets/images/products/img-1.png",
      "image2": "assets/images/products/img-3.png",
      "status": true,
      "brand": "Zara",
      "description": "lorem ipsm",
      "gender": "male",
      "size": [
        "L",
        "XL"
      ],
      "colores": [
        "Sky",
        "Red"
      ],
      "cashOnDelivery": false,
      "visaAndMaster": false,
      "bankTransfer": true,
      "stock": 7,
      "discount": 10,
      "sellingPrice": 5,
      "productID": "PEP-19127"
    }
  ]
  
  selectedRows: any[] = [];
  public appliedFilters: any = {};
  public filterConfig: any = {};
  resetAllFilter = false;
  allowExportCsv = false;
  categories!: string[];
  selectedCategory: string | null = null;

  public selectedFilters = {
    status: {
      published: false,
      inactive: false
    },
    minPrice: 0,
    maxPrice: 1000
  };

  public sliderOptions: any = {
    floor: 0,
    ceil: 1000,
    step: 10
  };

  defs: ColDef[] = [
    {
      field: 'productID', headerName: 'Product Id', sortable: true, width: 110, checkboxSelection: true, headerCheckboxSelection: true,
    },
    {
      field: 'productName', headerName: 'Product Name', sortable: true, width: 400, cellRenderer: (params: any) => {
        return `
          <div class="flex items-center gap-2">
            <div class="flex items-center justify-center p-1 border border-gray-200 rounded dark:border-dark-800 size-9">
              <img src="${params.data.image}" alt="" class="rounded">
            </div>
            <span>${params.value}</span>
          </div>`;
      }, onCellClicked: (params: any) => { this.onProductCellClick(params) }
    },
    { field: 'category', headerName: 'Category', sortable: true, width: 100, filter: 'agTextColumnFilter' },
    { field: 'price', headerName: 'Price', sortable: true, filter: 'agNumberColumnFilter' },
    {
      field: 'sellingPrice', headerName: 'Revenue', sortable: true
    },
    { field: 'qty', headerName: 'Quantity', sortable: true },
    {
      field: 'status',
      headerName: 'Status',
      sortable: true,
      filter: 'agTextColumnFilter',
      cellRenderer: (params: any) => {
        const displayVal = params.value ? 'Published' : 'Inactive';
        const statusClass = params.value ? 'badge badge-green' : 'badge badge-gray';
        return `<span style="line-height: 1;" class="${statusClass}">${displayVal}</span>`;
      }
    },
  ]

  constructor(private searchService: GridSearchService, private router: Router) {
  }

  ngOnInit(): void {
    this.categories = Array.from(new Set(this.products.map(p => p.category)));
  }

  onProductCellClick(params: any) {
    const clickedProductData = params.data;
  }

  export() {
    this.allowExportCsv = true;

    setTimeout(() => {
      this.allowExportCsv = false;
    }, 1000);
  }

  selectedItem(event: any): void {
    const selectedRows = event.api.getSelectedRows();
    this.selectedRows = selectedRows;
  }

  editRecord(event: any) {
    // console.log(event.data);
  }

  delProd() {
    this.products = this.products.filter(product =>
      !this.selectedRows.some(row => row.productID === product.productID)
    );
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  onSearch(event: Event) {
    const searchText = (event.target as HTMLInputElement).value;
    this.searchService.setSearchText(searchText);
  }

  catgoryChange() {
    const filterModel: any = {};

    filterModel.category = {
      filterType: 'text',
      type: 'equals',
      filter: this.selectedCategory
    };

    this.appliedFilters = filterModel;
  }
}
