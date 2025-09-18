import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { DomixDropdownModule } from '../../../../../module/domix dropdown/domix-dropdown.module';
import { FormsModule } from '@angular/forms';
import { DomixPaginationComponent } from '../../../../../componate/domix-pagination/domix-pagination.component';
import { CommonModule } from '@angular/common';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../../../componate/domix-grid-test/domix-grid-test.component';
import { RestApiService } from '../../../../../Core/service/rest-api.service';
import { DomixTableService } from '../../../../../componate/domix-grid-test/service/domix-table.service';
import { ModalService } from '../../../../../Core/service/modal/modal.service';
import { DeleteModalComponent } from '../../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import { AddExamModalComponent } from './model/add-exam-modal/add-exam-modal.component';
import { CountUpModule } from 'ngx-countup';
export interface TestDetails {
  testName: string;
  testCategory: string;
  testType: string;
  class: string;
  startDate: string;
  endDate: string;
  status: string;
}

@Component({
    selector: 'app-apps-school-exam-schedule',
    imports: [
        PageTitleComponent,
        CommonModule,
        DomixPaginationComponent,
        FormsModule,
        DomixDropdownModule,
        CountUpModule,
        LucideAngularModule,
    ],
    templateUrl: './apps-school-exam-schedule.component.html',
    styleUrl: './apps-school-exam-schedule.component.scss'
})
export class AppsSchoolExamScheduleComponent extends DomixGridTestComponent {
  allTestDetails: TestDetails[] = [];
  hasHeaderCheckbox = false;
  isOpen: boolean = true;
  percent: number = 34;
  dashArray: number = 100;
  progress: number = 100;

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
    this.animateProgress();
  }

  projectData() {
    this.restApiService.getTestDetails().subscribe((data: any) => {
      this.allTestDetails = data;
      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }
  columnDefs: ColDefs[] = [
    {
      field: 'scheduleID',
      headerName: 'ID',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'testName',
      headerName: 'Test Name',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'testCategory',
      headerName: 'Test Category',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'testType',
      headerName: '	Test Type',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'class',
      headerName: 'Class',
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

    this.modalService.open(AddExamModalComponent, data, (result) => {
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
  animateProgress(): void {
    const progressValue = this.calculateDashOffset(this.percent);
    setTimeout(() => {
      this.progress = progressValue;
    }, 100);
  }

  calculateDashOffset(percent: number): number {
    return this.dashArray - (this.dashArray * percent) / 100;
  }
}
