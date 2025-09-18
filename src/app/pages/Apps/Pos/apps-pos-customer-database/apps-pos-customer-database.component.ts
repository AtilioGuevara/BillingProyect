import { Component } from '@angular/core';
import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { DomixPaginationComponent } from '../../../../componate/domix-pagination/domix-pagination.component';
import { CommonModule } from '@angular/common';
import { ColDefs, DomixGridTestComponent } from '../../../../componate/domix-grid-test/domix-grid-test.component';
import { RestApiService } from '../../../../Core/service/rest-api.service';
import { DomixTableService } from '../../../../componate/domix-grid-test/service/domix-table.service';
import { ModalService } from '../../../../Core/service/modal/modal.service';
export interface Customer {
  avatar: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: string;
  lastOrder: string;
  outstanding: string;
  status: string;
  address: string;
  city: string;
  country: string;
  registrationDate?: string; // optional since not all customers have it
  notes: string;
}

@Component({
  selector: 'app-apps-pos-customer-database',
  imports: [DomixDropdownModule, PageTitleComponent, LucideAngularModule, DomixPaginationComponent, CommonModule],
  templateUrl: './apps-pos-customer-database.component.html',
  styleUrl: './apps-pos-customer-database.component.scss'
})
export class AppsPosCustomerDatabaseComponent extends DomixGridTestComponent {
  allEvent: Customer[] = [];
  hasHeaderCheckbox = false;
  sortStatus = false;

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
    this.restApiService.getPosCostomerData().subscribe((data: any) => {
      this.allEvent = data;
      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }
  columnDefs: ColDefs[] = [
    {
      field: 'CusData',
      headerName: 'Customer ID',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'avatar,name',
      headerName: 'Customer',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'email',
      headerName: '	Email',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'phone',
      headerName: '	Phone',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'totalOrders',
      headerName: 'Total Orders',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'lastOrder',
      headerName: 'Last Order',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'outstanding',
      headerName: 'Outstanding',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'status',
      headerName: '	Status',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      headerName: 'Action',
      sortable: false,
    },
  ];

}
