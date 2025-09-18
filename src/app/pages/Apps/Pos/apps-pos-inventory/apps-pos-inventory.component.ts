import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { ColDefs, DomixGridTestComponent } from '../../../../componate/domix-grid-test/domix-grid-test.component';
import { RestApiService } from '../../../../Core/service/rest-api.service';
import { DomixTableService } from '../../../../componate/domix-grid-test/service/domix-table.service';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { DomixPaginationComponent } from "../../../../componate/domix-pagination/domix-pagination.component";
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { DeleteModalComponent } from '../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import { AddInventoryModalComponent } from './model/add-inventory-modal/add-inventory-modal.component';
import { FormsModule } from '@angular/forms';
interface InventoryItem {
  id: number;
  name: string;
  description: string;
  sku: string;
  category: string;
  stock: number;
  unit: string;
  minStock: number;
  maxStock: number;
  price: number;
  cost: number;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-apps-pos-inventory',
  imports: [PageTitleComponent, DomixPaginationComponent, CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './apps-pos-inventory.component.html',
  styleUrl: './apps-pos-inventory.component.scss'
})
export class AppsPosInventoryComponent extends DomixGridTestComponent {
  allEmployee: InventoryItem[] = [];
  hasHeaderCheckbox = false;
  sortStatus = false;
  isAlertOpen = true;
  lowStockCount = 5;

  constructor(
    public restApiService: RestApiService,
    public domiex: DomixTableService,
    private modalService: ModalService
  ) {
    super(domiex);
    this.hasHeaderCheckbox = this.columnDefs.some((col) => col.headerCheckbox);
  }

  ngOnInit(): void {
    this.projectData();
  }

  projectData() {
    this.restApiService.getPosInventoryData().subscribe((data: any) => {
      this.allEmployee = data;
      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }

  getStockStatus(stock: number, minStock: number, maxStock: number): string {
    if (stock <= 0) return 'out_of_stock';
    if (stock < minStock) return 'low';
    if (stock <= maxStock) return 'medium';
    return 'active';
  }

  getStockBadgeClass(status: string): string {
    switch (status) {
      case 'out_of_stock':
      case 'low':
        return 'badge-red';
      case 'medium':
        return 'badge-green';
      case 'active':
        return 'badge-yellow';
      default:
        return 'badge-gray';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'out_of_stock':
        return 'Out of Stock';
      case 'low':
        return 'Low Stock';
      case 'medium':
        return 'Medium Stock';
      case 'active':
        return 'In Stock';
      default:
        return 'Unknown';
    }
  }

  calculateMargin(price: number, cost: number): string {
    if (!price || price === 0) return '0';
    const margin = ((price - cost) / price) * 100;
    return margin.toFixed(1);
  }


  openCreateModal(contactdata: any | null, index: number | null) {
    const data = contactdata;

    this.modalService.open(AddInventoryModalComponent, data, (result) => {
      if (result) {
        if (result.isAddOrEdit) {
          if (index !== null && index > -1) {
            this.gridData[index] = {
              ...this.gridData[index],
              ...result.formData,
            };
            this.displayedData = [...this.gridData];
            this.updateDisplayedData();
          }
        } else {
          this.gridData.unshift(result.formData);
          this.displayedData = [...this.gridData];
          this.updateDisplayedData();
        }
      }
    });
  }
  deleteModal(index: number) {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {
        this.gridData.splice(index, 1);
        this.displayedData = [...this.gridData];
        this.updateDisplayedData();
      }
    });
  }

  columnDefs: ColDefs[] = [
    {
      field: 'name',
      headerName: 'Product',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'sku',
      headerName: 'SKU',
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
      field: 'stock',
      headerName: 'Stock',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'price',
      headerName: '	Price',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'cost',
      headerName: 'Cost',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: '',
      headerName: 'Margin',
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
}
