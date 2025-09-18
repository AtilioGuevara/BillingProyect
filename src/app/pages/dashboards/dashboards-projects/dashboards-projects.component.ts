import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LucideAngularModule } from 'lucide-angular';
import { DomixDropdownModule } from '../../../module/domix dropdown/domix-dropdown.module';
import { CountUpModule } from 'ngx-countup';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';
@Component({
    selector: 'app-dashboards-projects',
    imports: [
        PageTitleComponent,
        FormsModule,
        CommonModule,
        DomixChartsComponent,
        CountUpModule,
        SimplebarAngularModule,
        LucideAngularModule,
        DomixDropdownModule,
    ],
    templateUrl: './dashboards-projects.component.html',
    styleUrl: './dashboards-projects.component.scss'
})
export class DashboardsProjectsComponent {
  options = { autoHide: true };
  radialBarChart!: ChartInfo
  radialBarChart1!: ChartInfo
  radialBarChart2!: ChartInfo
  radialBarChart3!: ChartInfo
  earningsChart!: ChartInfo
  donutChart!: ChartInfo

  constructor(private settingService: LayoutSettingService) {
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart();
    });
  }

  renderChart(): void {
    this.radialBarChart = {
      series: [32],
      chartOptions: {
        chart: {
          height: 60,
          width: 50,
          type: 'radialBar',
          sparkline: { enabled: true },
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              show: false,
            },
            hollow: {
              size: '20%',
            },
          },
        },
        colors: [],
        dataSet: ['bg-primary-500'],
        labels: ['[Progress]'],
      },
    };
    this.radialBarChart1 = {
      series: [45],
      chartOptions: {
        chart: {
          height: 60,
          width: 50,
          type: 'radialBar',
          sparkline: { enabled: true },
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              show: false,
            },
            hollow: {
              size: '20%',
            },
          },
        },
        colors: [],
        dataSet: ['bg-green-500'],
        labels: ['[Progress]'],
      },
    };
    this.radialBarChart2 = {
      series: [79],
      chartOptions: {
        chart: {
          height: 60,
          width: 50,
          type: 'radialBar',
          sparkline: { enabled: true },
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              show: false,
            },
            hollow: {
              size: '20%',
            },
          },
        },
        colors: [],
        dataSet: ['bg-red-500'],
        labels: ['[Progress]'],
      },
    };
    this.radialBarChart3 = {
      series: [100],
      chartOptions: {
        chart: {
          height: 60,
          width: 50,
          type: 'radialBar',
          sparkline: { enabled: true },
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              show: false,
            },
            hollow: {
              size: '20%',
            },
          },
        },
        colors: [],
        dataSet: ['bg-yellow-500'],
        labels: ['[Progress]'],
      },
    };
    this.earningsChart = {
      series: [
        {
          name: 'Earnings',
          data: [67, 48, 85, 51, 93, 109, 116],
        },
      ],
      chartOptions: {
        chart: {
          defaultLocale: 'en',
          height: 125,
          type: 'area',
          sparkline: { enabled: true },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 3,
          curve: 'smooth',
          dashArray: 2,
        },
        legend: {
          tooltipHoverFormatter: (val, opts) =>
            `${val} - <strong>${opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]
            }</strong>`,
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6,
          },
        },
        labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        yaxis: {
          title: {
            text: 'Growth',
          },
          labels: {
            formatter: (y) => `$${y.toFixed(0)}k`,
          },
        },
        grid: {
          padding: {
            top: -20,
            right: 0,
            bottom: 0,
          },
        },
        colors: [],
        dataSet: ['bg-primary-500'],
      },
    };
    this.donutChart = {
      series: [55, 33, 46],
      chartOptions: {
        chart: {
          height: 200,
          type: 'donut',
          dropShadow: {
            enabled: true,
            color: '#111',
            top: -1,
            left: 3,
            blur: 3,
            opacity: 0.2,
          },
        },
        stroke: {
          width: 0,
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: false,
              },
            },
          },
        },
        labels: ['Afternoon', 'Evening', 'Morning'],
        dataLabels: {
          enabled: false,
        },
        fill: {
          type: 'pattern',
          pattern: {
            style: 'squares',
          },
        },
        states: {
          hover: {},
        },
        theme: {
          palette: 'palette2',
        },
        colors: [],
        dataSet: ['bg-primary-500', 'bg-purple-500', 'bg-green-500'],
        legend: {
          show: false,
        },
      },
    };
  }

  activeTab: number = 0; // Default active tab index

  // Method to set the active tab
  setActiveTab(index: number): void {
    this.activeTab = index;
  }
}
