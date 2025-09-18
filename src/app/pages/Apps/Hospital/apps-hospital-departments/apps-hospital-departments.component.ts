import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { FormsModule } from '@angular/forms';
import { DomixPaginationComponent } from '../../../../componate/domix-pagination/domix-pagination.component';
import { CommonModule } from '@angular/common';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../../componate/domix-grid-test/domix-grid-test.component';
import { RestApiService } from '../../../../Core/service/rest-api.service';
import { DomixTableService } from '../../../../componate/domix-grid-test/service/domix-table.service';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { DeleteModalComponent } from '../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import { AddDepartmentModalComponent } from './modal/add-department-modal/add-department-modal.component';
import { DomixChartsComponent } from '../../../../componate/domix-charts/domix-charts.component';
import { ChartInfo } from '../../../../componate/domix-charts/Model/Display-Chart.model';
import { LayoutSettingService } from '../../../../layouts/layout-setting.service';
export interface Department {
  departmentName: string;
  doctor: string;
  totalEmployee: string;
  headOfDepartment: string;
  status: string;
}

@Component({
    selector: 'app-apps-hospital-departments',
    imports: [
        PageTitleComponent,
        CommonModule,
        DomixPaginationComponent,
        FormsModule,
        DomixDropdownModule,
        LucideAngularModule,
        DomixChartsComponent,
    ],
    templateUrl: './apps-hospital-departments.component.html',
    styleUrl: './apps-hospital-departments.component.scss'
})
export class AppsHospitalDepartmentsComponent extends DomixGridTestComponent {
  allDepartment: Department[] = [];
  distributedColumnChart!: ChartInfo

  hasHeaderCheckbox = false;
  renderChart(): void {
    this.distributedColumnChart = {
      series: [
        {
          name: 'Employee',
          data: [21, 22, 19, 10, 10, 28, 16],
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            columnWidth: '25%',
            distributed: true,
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.2,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 30],
          },
        },
        states: {
          normal: {
            filter: {
              type: 'none',
              value: 0,
            },
          },
          hover: {
            filter: {
              type: 'none',
              value: 0,
            },
          },
          active: {
            filter: {
              type: 'none',
              value: 0,
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [
            'Radiology',
            'Orthopedics',
            'Neurology',
            'Cardiology',
            'Pediatrics',
            'Nurse',
            'Others',
          ],
        },
        dataSet: [
          'bg-primary-500',
          'bg-pink-500',
          'bg-sky-500',
          'bg-green-300',
          'bg-yellow-200',
          'bg-orange-200',
          'bg-purple-500',
          'bg-red-500',
        ],
      },
    };
  }

  constructor(
    public restApiService: RestApiService,
    public domiex: DomixTableService,
    private modalService: ModalService, private settingService: LayoutSettingService
  ) {
    super(domiex);
    this.hasHeaderCheckbox = this.columnDefs.some((col) => col.headerCheckbox);
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }

  ngOnInit(): void {
    this.projectData();
  }

  projectData() {
    this.restApiService.getStaffDepartment().subscribe((data: any) => {
      this.allDepartment = data;
      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }

  generateAvatarText(name: string): string {
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return nameParts[0][0] + nameParts[1][0];
    }
    return name[0];
  }

  columnDefs: ColDefs[] = [
    {
      field: 'departmentID',
      headerName: 'ID',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'departmentName',
      headerName: 'Department Name',
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
      field: 'totalEmployee',
      headerName: 'Total Employee',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'headOfDepartment',
      headerName: 'Head of Dept.',
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

    this.modalService.open(AddDepartmentModalComponent, data, (result) => {
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
