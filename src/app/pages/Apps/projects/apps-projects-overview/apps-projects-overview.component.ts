import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { DomixChartsComponent } from '../../../../componate/domix-charts/domix-charts.component';
import { ChartInfo } from '../../../../componate/domix-charts/Model/Display-Chart.model';
import { LucideAngularModule } from 'lucide-angular';

import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { ShareProjectModalComponent } from '../share-project-modal/share-project-modal.component';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { RouterLink } from '@angular/router';
import { DomixTooltipModule } from '../../../../module/domix tooltip/domix-tooltip.module';
import { LayoutSettingService } from '../../../../layouts/layout-setting.service';

@Component({
    selector: 'app-apps-projects-overview',
    imports: [
        PageTitleComponent,
        CommonModule,
        DomixChartsComponent,
        LucideAngularModule,
        DomixDropdownModule,
        RouterLink,
        DomixTooltipModule,
    ],
    templateUrl: './apps-projects-overview.component.html',
    styleUrl: './apps-projects-overview.component.scss'
})
export class AppsProjectsOverviewComponent {
  taskChart!: ChartInfo
  lineChart!: ChartInfo

  currentUser = {
    name: 'Ina Payne',
    image: 'assets/images/avatar/user-5.png',
    role: 'Project Manager',
  };

  users = [
    {
      name: 'Ina Payne',
      image: 'assets/images/avatar/user-5.png',
      role: 'Project Manager',
    },
    {
      name: 'Robert Freeman',
      image: 'assets/images/avatar/user-11.png',
      role: 'Project Manager',
    },
    {
      name: 'Michelle Weigle',
      image: 'assets/images/avatar/user-13.png',
      role: 'Project Manager',
    },
    {
      name: 'William Keen',
      image: 'assets/images/avatar/user-14.png',
      role: 'Project Manager',
    },
  ];

  activeUser: { name: string; image: string; role: string } | null = null; // More specific type

  constructor(private modalService: ModalService, private settingService: LayoutSettingService) {
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }

  isActive(user: any): boolean {
    return this.activeUser === user;
  }

  selectUser(user: any): void {
    this.activeUser = user;
  }

  openModal() {
    this.modalService.open(ShareProjectModalComponent);
  }

  renderChart(): void {
    this.lineChart = {
      series: [
        {
          name: 'Hours',
          data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 16, 2, 7, 8],
        },
      ],
      chartOptions: {
        chart: {
          defaultLocale: 'en',
          height: 300,
          type: 'line',
          zoom: {
            enabled: true,
          },
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 3,
            color: '#000',
            opacity: 0.15,
          },
        },
        stroke: {
          width: 5,
          curve: 'smooth',
        },
        xaxis: {
          type: 'datetime',
          categories: [
            '1/11/2024',
            '2/11/2024',
            '3/11/2024',
            '4/11/2024',
            '5/11/2024',
            '6/11/2024',
            '7/11/2024',
            '8/11/2024',
            '9/11/2024',
            '10/11/2024',
            '11/11/2024',
            '12/11/2024',
            '1/11/2025',
            '2/11/2025',
            '3/11/2025',
            '4/11/2025',
            '5/11/2025',
            '6/11/2025',
          ],
          tickAmount: 10,
          labels: {
            formatter: function (
              value: string,
              timestamp?: number,
              opts?: any
            ): string {
              if (timestamp) {
                return opts.dateFormatter(new Date(timestamp), 'dd MMM');
              }
              return ''; // Return an empty string or some default value if timestamp is undefined
            },
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: ['#358ffc'],
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100],
          },
        },
        colors: ['#a855f7'],
        dataSet: ['bg-purple-500', 'bg-primary-500'],
        grid: {
          padding: {
            top: 0,
            right: 5,
            bottom: 0,
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
      },
    };
    this.taskChart = {
      series: [
        {
          name: 'Total Task',
          data: [3, 4, 8, 2, 6, 10, 8],
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#304758'],
          },
        },
        xaxis: {
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: true,
          },
        },
        colors: [],
        dataSet: ['bg-primary-500'],
        title: {
          text: 'Monthly Task Activities',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444',
          },
        },
      },
    };
  }
}
