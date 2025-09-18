import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { RestApiService } from '../../../../Core/service/rest-api.service';
import { CommonModule } from '@angular/common';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../../componate/domix-grid-test/domix-grid-test.component';
import { DomixTableService } from '../../../../componate/domix-grid-test/service/domix-table.service';
import { FormsModule } from '@angular/forms';
import { DomixPaginationComponent } from '../../../../componate/domix-pagination/domix-pagination.component';
import { LucideAngularModule } from 'lucide-angular';
import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { ContactOverviewModalComponent } from './model/contact-overview-modal/contact-overview-modal.component';
import { ContactCreateModalComponent } from './model/contact-create-modal/contact-create-modal.component';
import { DeleteModalComponent } from '../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
export interface Contact {
  image: string;
  contactName: string;
  phoneNumber: string;
  company: string;
  role: string;
  email: string;
  website: string;
  status: string;
}

@Component({
    selector: 'app-apps-crm-contact',
    imports: [
        PageTitleComponent,
        CommonModule,
        FormsModule,
        DomixPaginationComponent,
        LucideAngularModule,
        DomixDropdownModule,
    ],
    templateUrl: './apps-crm-contact.component.html',
    styleUrl: './apps-crm-contact.component.scss'
})
export class AppsCrmContactComponent extends DomixGridTestComponent {
  allContact: Contact[] = [];
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
    this.restApiService.getContactData().subscribe((data: any) => {
      this.allContact = data;
      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }

  columnDefs: ColDefs[] = [
    {
      field: 'contactID',
      headerName: 'ID',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'contactName',
      headerName: 'Name',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'company',
      headerName: 'Company',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'role',
      headerName: 'Role',
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
      field: 'website',
      headerName: 'Website',
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

  openContactOverviewModal(contactdata: any, index: number | null) {
    this.modalService.open(ContactOverviewModalComponent, contactdata);
  }

  deleteModal(index: number) {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {
        this.allContact.splice(index, 1);

        this.gridData = this.allContact;
        this.displayedData = [...this.gridData];
        this.updateDisplayedData();
      }
    });
  }

  sort(dir: string = 'asc', field: string = 'contactName', headerName: string = 'Name') {
    let data = {
      field: field,
      headerName: headerName,
      sortable: true,
      sortDiraction: dir,
    }
    this.onSortChange(data)
    // this.updateDisplayedData()
  }

  statusSort() {
    let data = {
      field: 'status',
      headerName: 'Status',
      sortable: true,
      sortDiraction: !this.sortStatus ? 'desc' : 'asc',
    }

    this.onSortChange(data);
    this.sortStatus = !this.sortStatus;
  }

  openCreateModal(contactdata: any | null, index: number | null) {
    const data = contactdata;

    this.modalService.open(ContactCreateModalComponent, data, (result) => {
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
}
