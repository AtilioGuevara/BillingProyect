import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddAppointmentsModalComponent } from '../../model/add-appointments-modal/add-appointments-modal.component';
import { PageTitleComponent } from '../../../../../../../../layouts/page-title/page-title.component';
import { DomixPaginationComponent } from '../../../../../../../../componate/domix-pagination/domix-pagination.component';
import { DomixDropdownModule } from '../../../../../../../../module/domix dropdown/domix-dropdown.module';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../../../../../../componate/domix-grid-test/domix-grid-test.component';
import { RestApiService } from '../../../../../../../../Core/service/rest-api.service';
import { DomixTableService } from '../../../../../../../../componate/domix-grid-test/service/domix-table.service';
import { ModalService } from '../../../../../../../../Core/service/modal/modal.service';
import { DeleteModalComponent } from '../../../../../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
export interface Appointment {
  date: string;
  time: string;
  treatmentType: string;
  doctor: string;
  reasonCondition: string;
  notes: string;
  status: string;
}

@Component({
    selector: 'app-appointments-table',
    imports: [
        CommonModule,
        DomixPaginationComponent,
        FormsModule,
        DomixDropdownModule,
        LucideAngularModule,
    ],
    templateUrl: './appointments-table.component.html',
    styleUrl: './appointments-table.component.scss'
})
export class AppointmentsTableComponent extends DomixGridTestComponent {
  allAppointment: Appointment[] = [];
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
    this.restApiService.getAppointmentsData().subscribe((data: any) => {
      this.allAppointment = data;
      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }
  columnDefs: ColDefs[] = [
    {
      field: 'date',
      headerName: 'Date',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'treatmentType',
      headerName: 'Treatment Type',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'time',
      headerName: 'Time',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'reasonCondition',
      headerName: 'Reason Condition',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'notes',
      headerName: 'Notes',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'doctor',
      headerName: 'Doctor',
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
        this.gridData.splice(index, 1);
        this.displayedData = [...this.gridData];
        this.updateDisplayedData();
      }
    });
  }
  openCreateModal(projectdata: any | null, index: number | null) {
    const data = projectdata;

    this.modalService.open(AddAppointmentsModalComponent, data, (result) => {
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
