import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../../componate/domix-grid-test/domix-grid-test.component';
import { RestApiService } from '../../../../Core/service/rest-api.service';
import { DomixTableService } from '../../../../componate/domix-grid-test/service/domix-table.service';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { DomixPaginationComponent } from '../../../../componate/domix-pagination/domix-pagination.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { LucideAngularModule } from 'lucide-angular';
import { AddEventModalComponent } from './model/add-event-modal/add-event-modal.component';
import { RouterLink } from '@angular/router';
import { DeleteModalComponent } from '../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
export interface EventDetails {
  image: string;
  eventName: string;
  eventDate: string;
  time: string;
  peopleSize: string;
  location: string;
  eventType: string;
  price: string;
  status: string;
}

@Component({
    selector: 'app-apps-events-list',
    imports: [
        PageTitleComponent,
        DomixPaginationComponent,
        CommonModule,
        FormsModule,
        DomixDropdownModule,
        LucideAngularModule,
        RouterLink,
    ],
    templateUrl: './apps-events-list.component.html',
    styleUrl: './apps-events-list.component.scss'
})
export class AppsEventsListComponent extends DomixGridTestComponent {
  allEvent: EventDetails[] = [];
  hasHeaderCheckbox = false;
  sortStatus=false;

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
    this.restApiService.getEventListData().subscribe((data: any) => {
      this.allEvent = data;
      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }
  columnDefs: ColDefs[] = [
    {
      field: 'eventName',
      headerName: 'Event Name',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'eventDate',
      headerName: 'Event Date',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'peopleSize',
      headerName: 'people Size',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'location',
      headerName: 'location',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'eventType',
      headerName: 'Event Type',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'price',
      headerName: 'price',
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

  sort(dir: string = 'asc', field: string = 'eventName', headerName: string = '') {
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

    this.modalService.open(AddEventModalComponent, data, (result) => {
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
}
