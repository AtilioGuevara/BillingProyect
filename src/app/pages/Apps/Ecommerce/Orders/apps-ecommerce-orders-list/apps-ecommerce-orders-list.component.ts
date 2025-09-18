import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../../layouts/page-title/page-title.component';
import { ColDefs, DomixGridTestComponent } from '../../../../../componate/domix-grid-test/domix-grid-test.component';
import { CommonModule } from '@angular/common';
import { DomixTableService } from '../../../../../componate/domix-grid-test/service/domix-table.service';
import { RestApiService } from '../../../../../Core/service/rest-api.service';
import { DomixDropdownModule } from '../../../../../module/domix dropdown/domix-dropdown.module';
import { DomixPaginationComponent } from '../../../../../componate/domix-pagination/domix-pagination.component';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ModalService } from '../../../../../Core/service/modal/modal.service';
import { AddEditOrderComponent } from './add-edit-order/add-edit-order.component';

export enum Payment {
  COD,
  Unpaid,
  Paid,
}

export enum OrderStatusList {
  Delivered,
  Shipping,
  Paid,
  New,
  Pending,
  Cancelled,
  AllOrder
}

export interface OrderList {
  ordersDate: string,
  deliveredDate: string,
  customersName: string,
  productName: string,
  payment: number,
  price: string,
  total: string,
  qty: number,
  status: number,
  image: string,
  orderID: string,
}
@Component({
    selector: 'app-apps-ecommerce-orders-list',
    imports: [PageTitleComponent, CommonModule, DomixDropdownModule, DomixPaginationComponent, FormsModule, LucideAngularModule],
    templateUrl: './apps-ecommerce-orders-list.component.html',
    styleUrl: './apps-ecommerce-orders-list.component.scss'
})

export class AppsEcommerceOrdersListComponent extends DomixGridTestComponent {

  defs: ColDefs[] = [
    {
      headerName: 'Order Id',
      field: 'orderID',
      sortable: true,
      sortDiraction: 'asc'
    },
    {
      headerName: 'Order Date',
      field: 'ordersDate',
      sortable: true,
      sortDiraction: 'asc'
    },
    {
      headerName: 'Delivered Date',
      field: 'deliveredDate',
      sortable: true,
      sortDiraction: 'asc'
    },
    {
      headerName: 'Customers',
      field: 'customersName',
      sortable: true,
      sortDiraction: 'asc'
    },
    {
      headerName: 'Product',
      field: 'productName',
      sortable: true,
      sortDiraction: 'asc'
    },
    {
      headerName: 'Payment',
      field: 'payment',
      sortable: true,
      sortDiraction: 'asc'
    },
    {
      headerName: 'Total',
      field: 'total',
      sortable: true,
      sortDiraction: 'asc'
    },
    {
      headerName: 'Qty',
      field: 'qty',
      sortable: true,
      sortDiraction: 'asc'
    },
    {
      headerName: 'Status',
      field: 'status',
      sortable: true,
      sortDiraction: 'asc'
    },
    {
      headerName: 'Action',
      sortable: false,
    },
  ]

  pObj = {
    headerName: 'Product',
    field: 'productName',
    sortable: true,
    sortDiraction: 'asc'
  } 

  orderStatusList = OrderStatusList;
  selectedOrederList!: OrderStatusList;
  orderList: OrderList[] = []
  Payment = Payment;

  constructor(private tableS: DomixTableService, private apiService: RestApiService, private modalSer: ModalService) { super(tableS) }
  ngOnInit() {
    this.getOrderData()
  }

  getOrderData() {
    this.apiService.getOrderList().subscribe(data => {
      this.orderList = data;
      this.setSelectedOrder();
    })
  }

  summary = [
    { title: 'New Orders', count: 345, percentage: '19%', class: 'bg-primary-100 dark:bg-primary-500/10 !border-primary-200 dark:!border-primary-500/20', icon: 'ri-arrow-right-up-line' },
    { title: 'Pending Orders', count: 120, percentage: '2.98%', class: 'bg-yellow-100 dark:bg-yellow-500/10 !border-yellow-200 dark:!border-yellow-500/20', icon: 'ri-arrow-right-down-line' },
    { title: 'Delivered Orders', count: 225, percentage: '8.56%', class: 'bg-green-100 dark:bg-green-500/10 !border-green-200 dark:!border-green-500/20', icon: 'ri-arrow-right-up-line' },
    { title: 'Total Orders', count: 9451, percentage: '24.08%', class: 'bg-purple-100 dark:bg-purple-500/10 !border-purple-200 dark:!border-purple-500/20', icon: 'ri-arrow-right-up-line' }
  ]

  setSelectedOrder(selectedOrder: OrderStatusList = OrderStatusList.AllOrder) {
    this.selectedOrederList = selectedOrder;
    this.getSelectedData();
  }

  getSelectedData() {
    if (this.selectedOrederList !== OrderStatusList.AllOrder) {
      this.gridData = this.orderList.filter(x => x.status === this.selectedOrederList);
    } else {
      this.gridData = this.orderList;
    }
    this.displayedData = [...this.gridData];
    this.updateDisplayedData();
  }

  getPaymentText(payment: Payment): string {
    if (payment === Payment.Paid) {
      return 'Paid';
    } else if (payment === Payment.COD) {
      return 'Cash on Delivery';
    } else {
      return 'Unpaid';
    }
  }

  delOrder() {
    this.deleteSelectedItem();
    // this.setSelectedOrder(this.selectedOrederList);
  }

  addEditOrder(data: any, index: any) {
    this.modalSer.open(AddEditOrderComponent, data, (data => {
      if (data) {
        if (index != null && index > -1) {
          this.gridData[index] = {
            ...this.gridData[index],
            ...data
          };
        } else {
          this.gridData.unshift(data)
        }
        this.displayedData = [...this.gridData];
        this.updateDisplayedData();
      }
    }))
  }
}
