import { Component } from '@angular/core';
import { AddHolidayModalComponent } from './modal/add-holiday-modal/add-holiday-modal.component';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../../../../../../layouts/page-title/page-title.component';
import { DomixPaginationComponent } from '../../../../../../componate/domix-pagination/domix-pagination.component';
import { DomixDropdownModule } from '../../../../../../module/domix dropdown/domix-dropdown.module';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../../../../componate/domix-grid-test/domix-grid-test.component';
import { RestApiService } from '../../../../../../Core/service/rest-api.service';
import { DomixTableService } from '../../../../../../componate/domix-grid-test/service/domix-table.service';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import { DeleteModalComponent } from '../../../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
export interface Event {
  name: string;
  date: string;
  day: string;
}

@Component({
    selector: 'app-apps-hospital-staff-holidays',
    imports: [
        PageTitleComponent,
        CommonModule,
        DomixPaginationComponent,
        FormsModule,
        DomixDropdownModule,
        LucideAngularModule,
    ],
    templateUrl: './apps-hospital-staff-holidays.component.html',
    styleUrl: './apps-hospital-staff-holidays.component.scss'
})
export class AppsHospitalStaffHolidaysComponent extends DomixGridTestComponent {
  allEvent: Event[] = [];
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
    this.restApiService.getMedicineholidayData().subscribe((data: any) => {
      this.allEvent = data;
      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }
  columnDefs: ColDefs[] = [
    {
      field: 'name',
      headerName: 'Holiday Name',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'date',
      headerName: 'Date',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'day',
      headerName: 'Day',
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
        this.gridData.splice(index, 1);
        this.displayedData = [...this.gridData];
        this.updateDisplayedData();
      }
    });
  }
  openCreateModal(projectdata: any | null, index: number | null) {
    const data = projectdata;

    this.modalService.open(AddHolidayModalComponent, data, (result) => {
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
