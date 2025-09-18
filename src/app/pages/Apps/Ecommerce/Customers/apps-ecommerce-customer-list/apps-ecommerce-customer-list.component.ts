
import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { DomixDropdownModule } from '../../../../../module/domix dropdown/domix-dropdown.module';
import { FormsModule } from '@angular/forms';
import { DomixPaginationComponent } from '../../../../../componate/domix-pagination/domix-pagination.component';
import { CommonModule } from '@angular/common';
import { RestApiService } from '../../../../../Core/service/rest-api.service';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../../../componate/domix-grid-test/domix-grid-test.component';
import { DomixTableService } from '../../../../../componate/domix-grid-test/service/domix-table.service';
import { ModalService } from '../../../../../Core/service/modal/modal.service';
import { DeleteModalComponent } from '../../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import { AddEditReviewComponent } from '../../Products/components/apps-ecommerce-product-overview/add-edit-review/add-edit-review.component';
import { AddEditReviewCustomerComponent } from './model/add-edit-review/add-edit-review.component';
export interface Customer {
  image: string;
  customersName: string;
  email: string;
  phoneNumber: string;
  subscriber: string;
  gender: string;
  location: string;
  status: string;
}

@Component({
    selector: 'app-apps-ecommerce-customer-list',
    imports: [
        PageTitleComponent,
        CommonModule,
        DomixPaginationComponent,
        FormsModule,
        DomixDropdownModule,
        LucideAngularModule,
    ],
    templateUrl: './apps-ecommerce-customer-list.component.html',
    styleUrl: './apps-ecommerce-customer-list.component.scss'
})
export class AppsEcommerceCustomerListComponent extends DomixGridTestComponent {
  allProjectList: Customer[] = [];
  hasHeaderCheckbox = false;

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
    this.restApiService.getCustomerlistData().subscribe((data: any) => {
      this.allProjectList = data;
      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }
  columnDefs: ColDefs[] = [
    {
      field: 'customersID',
      headerName: 'ID',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'customersName',
      headerName: 'Name',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'subscriber',
      headerName: 'Subscriber',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'gender',
      headerName: 'Gender',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'location',
      headerName: 'Location',
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
  deleteModal(index: number) {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {
        this.displayedData.splice(index, 1);
      }
    });
  }
  openCreateModal(projectdata: any | null, index: number | null) {
    const data = projectdata;
    

    this.modalService.open(AddEditReviewCustomerComponent, data, (result) => {
      if (result) {
        if (result) {
          if (index !== null && index > -1) {
            this.gridData[index] = {
              ...this.gridData[index],
              ...result,
            };
            this.displayedData = [...this.gridData];
            this.updateDisplayedData();
          } else {
            this.gridData.unshift(result);
            this.displayedData = [...this.gridData];
            this.updateDisplayedData();
          }
        } 
      }
    });
  }
}
