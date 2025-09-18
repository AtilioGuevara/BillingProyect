import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';
import { CountUpModule } from 'ngx-countup';
import { CommonModule } from '@angular/common';
import { patients } from '../../../Data/patients';
import { FormsModule } from '@angular/forms';
import { DomixDropdownModule } from '../../../module/domix dropdown/domix-dropdown.module';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { ColDefs, DomixGridTestComponent } from '../../../componate/domix-grid-test/domix-grid-test.component';
import { RestApiService } from '../../../Core/service/rest-api.service';
import { DomixTableService } from '../../../componate/domix-grid-test/service/domix-table.service';
import { DeleteModalComponent } from '../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import { ModalService } from '../../../Core/service/modal/modal.service';
import { DomixPaginationComponent } from '../../../componate/domix-pagination/domix-pagination.component';

interface RoomUsage {
  image: string;
  title: string;
  description: string;
  percentage: string;
}

interface AppointmentItem {
  image: string;
  name: string;
  time: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface Patient {
  patientName: string;
  age: string;
  phone: string;
  email: string;
  condition: string;
  medications: string;
  lastVisit: string;
}


@Component({
    selector: 'app-dashboards-hospital',
    imports: [
        PageTitleComponent,
        DomixChartsComponent,
        CountUpModule,
        CommonModule,
        DomixPaginationComponent,
        FormsModule,
        DomixDropdownModule,
        LucideAngularModule,
        RouterLink,
    ],
    templateUrl: './dashboards-hospital.component.html',
    styleUrl: './dashboards-hospital.component.scss'
})
export class DashboardsHospitalComponent extends DomixGridTestComponent {
  hospital: Patient[] = [];
  hasHeaderCheckbox = false;

  constructor(
    public restApiService: RestApiService,
    public domiex: DomixTableService,
    public modalService: ModalService
  ) {
    super(domiex);
    this.hasHeaderCheckbox = this.columnDefs.some((col) => col.headerCheckbox);
  }

  patientVisitChart: ChartInfo = {
    series: [
      {
        name: 'Net Profit',
        data: [32, 39, 43, 49, 52, 58, 63, 60, 66],
      },
    ],
    chartOptions: {
      chart: {
        height: 320,
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      colors: [],
      dataSet: ['bg-primary-500', 'bg-green-500', 'bg-yellow-500'],
      xaxis: {
        categories: [
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
        ],
      },
      fill: {
        opacity: 1,
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          top: -30,
          right: 0,
          bottom: -12,
          left: 0,
        },
      },
      tooltip: {
        y: {
          formatter: (val: number) => `$ ${val}k`,
        },
      },
    },
  };
  patientDepartmentChart: ChartInfo = {
    series: [44, 55, 41, 18],
    chartOptions: {
      chart: {
        height: 180,
        type: 'donut',
      },
      labels: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics'],
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: [],
      dataSet: [
        'bg-primary-500',
        'bg-green-500',
        'bg-yellow-500',
        'bg-purple-500',
        'bg-red-500',
      ],
      fill: {
        type: 'gradient',
      },
      legend: {
        formatter: function (val: string, opts: any) {
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };
  patientsHistoryChart: ChartInfo = {
    series: [
      {
        name: 'Inject Patients',
        data: [24, 32, 28, 62, 67, 80, 96, 106],
      },
      {
        name: 'Surgery Patients',
        data: [5, 14, 19, 27, 35, 44, 22, 49],
      },
    ],
    chartOptions: {
      chart: {
        defaultLocale: 'en',
        height: 195,
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 3,
        lineCap: 'butt',
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      tooltip: {
        x: {
          show: true,
        },
      },
      colors: [],

      grid: {
        strokeDashArray: 4,
        position: 'back',
        padding: {
          top: -20,
          right: 0,
          bottom: 0,
        },
      },
      dataSet: ['bg-primary-500', 'bg-purple-500'],
    },
  };
  hospitalBirthDeathChart: ChartInfo = {
    series: [
      {
        name: 'Birth Case',
        data: [80, 50, 30, 70, 99, 36],
      },
      {
        name: 'Death Case',
        data: [10, 14, 28, 16, 34, 87],
      },
      {
        name: 'Accident Case',
        data: [44, 98, 54, 46, 34, 22],
      },
    ],
    chartOptions: {
      chart: {
        height: 340,
        type: 'radar',
      },
      colors: [],
      dataSet: ['bg-primary-500', 'bg-red-500', 'bg-green-500'],
      stroke: {
        width: 1,
      },
      fill: {
        opacity: 0.1,
      },
      xaxis: {
        categories: ['2019', '2020', '2021', '2022', '2023', '2024'],
      },
    },
  };

  setStatus(index: number, status: 'accepted' | 'rejected') {
    this.appointmentItems[index].status = status;
  }

  roomUsages: RoomUsage[] = [
    {
      image: 'assets/images/dashboards/hospital/vip.png',
      title: 'VIP Rooms',
      description: 'Average usage of VIP Rooms',
      percentage: '36.7%',
    },
    {
      image: 'assets/images/dashboards/hospital/hospital-bed.png',
      title: 'Private Rooms',
      description: 'Average usage of Private Rooms',
      percentage: '61.6%',
    },
    {
      image: 'assets/images/dashboards/hospital/hospital.png',
      title: 'General Rooms',
      description: 'Average usage of General Rooms',
      percentage: '77.9%',
    },
    {
      image: 'assets/images/dashboards/hospital/emergency-room.png',
      title: 'ICU Rooms',
      description: 'Average usage of ICU Rooms',
      percentage: '24.1%',
    },
    {
      image: 'assets/images/dashboards/hospital/waiting-area.png',
      title: 'Waiting Area',
      description: 'Average usage of Waiting Area',
      percentage: '89.4%',
    },
    {
      image: 'assets/images/dashboards/hospital/meeting.png',
      title: 'Staff Rooms',
      description: 'Average usage of Staff Rooms',
      percentage: '99.9%',
    },
  ];

  appointmentItems: AppointmentItem[] = [
    {
      name: 'Jerry Kizer',
      status: 'pending',
      time: '11:49 AM - 12 Jun, 2024',
      image: 'assets/images/avatar/user-15.png',
    },
    {
      name: 'Thomas Maloney',
      status: 'pending',
      time: '04:44 PM - 18 Jul, 2024',
      image: 'assets/images/avatar/user-11.png',
    },
    {
      name: 'Dawn Beebe',
      status: 'accepted',
      time: '01:24 PM - 12 Jun, 2024',
      image: 'assets/images/avatar/user-13.png',
    },
  ];

  ngOnInit(): void {
    this.pageSize = 8;
    this.projectData();
  }

  projectData() {
    this.restApiService.getDashboardHospitalData().subscribe((data: any) => {
      this.hospital = data;
      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }
  columnDefs: ColDefs[] = [
    {
      field: 'patientName',
      headerName: 'Patient Name',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'phone',
      headerName: 'Phone',
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
      field: 'condition',
      headerName: 'Condition',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'medications',
      headerName: 'Medications',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'lastVisit',
      headerName: '	Last Visit',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      headerName: 'Action',
      sortable: false,
      sortDiraction: 'asc',
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
}
