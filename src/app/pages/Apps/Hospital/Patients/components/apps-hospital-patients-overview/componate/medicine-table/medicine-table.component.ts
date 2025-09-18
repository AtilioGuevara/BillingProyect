import { Component } from '@angular/core';
import { AddReportsModalComponent } from '../../model/add-reports-modal/add-reports-modal.component';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddMedicineModalComponent } from '../../model/add-medicine-modal/add-medicine-modal.component';
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
export interface Prescription {
  date: string;
  time: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  prescribingDoctor: string;
  reasonCondition: string;
  notes: string;
}

@Component({
    selector: 'app-medicine-table',
    imports: [
        CommonModule,
        DomixPaginationComponent,
        FormsModule,
        DomixDropdownModule,
        LucideAngularModule,
    ],
    templateUrl: './medicine-table.component.html',
    styleUrl: './medicine-table.component.scss'
})
export class MedicineTableComponent extends DomixGridTestComponent {
  allMedicine: Prescription[] = [];
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
    this.restApiService.getMedicineData().subscribe((data: any) => {
      this.allMedicine = data;
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
      field: 'time',
      headerName: 'Time',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'medicineName',
      headerName: 'Medicine Name',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'dosage',
      headerName: '	Dosage',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'frequency',
      headerName: 'Frequency',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'prescribingDoctor',
      headerName: 'Prescribing Doctor',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'reasonCondition',
      headerName: 'Reason/Condition',
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

    this.modalService.open(AddMedicineModalComponent, data, (result) => {
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
