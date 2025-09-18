import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';

@Component({
    selector: 'app-apexchart-pie',
    imports: [PageTitleComponent, DomixChartsComponent],
    templateUrl: './apexchart-pie.component.html',
    styleUrl: './apexchart-pie.component.scss'
})
export class ApexchartPieComponent {
  pieChart!: ChartInfo
  donutChart!: ChartInfo
  updateDonutChart!: ChartInfo
  monochromePieChart!: ChartInfo
  gradientDonutChart!: ChartInfo
  semiDonutChart!: ChartInfo
  patternDonutChart!: ChartInfo

  constructor(private settingService: LayoutSettingService) {
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }

  renderChart(): void {

    this.pieChart = {
      series: [44, 55, 13, 43, 22],
      chartOptions: {
        chart: {
          height: 300,
          type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        colors: [],
        dataSet: [
          'bg-primary-500',
          'bg-green-500',
          'bg-yellow-500',
          'bg-purple-500',
          'bg-red-500',
        ],
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
    this.donutChart = {
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        chart: {
          height: 300,
          type: 'donut',
        },
        colors: [],
        dataSet: [
          'bg-primary-500',
          'bg-green-500',
          'bg-yellow-500',
          'bg-red-500',
        ],
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
    this.updateDonutChart = {
      series: [44, 55, 13, 33],
      chartOptions: {
        chart: {
          height: 300,
          type: 'donut',
        },
        dataLabels: {
          enabled: false,
        },
        colors: [],
        dataSet: [
          'bg-primary-500',
          'bg-green-500',
          'bg-yellow-500',
          'bg-red-500',
        ],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                show: false,
              },
            },
          },
        ],
        legend: {
          position: 'right',
          offsetY: 0,
          height: 230,
        },
      },
    };
    this.monochromePieChart = {
      series: [25, 15, 44, 55, 41, 17],
      chartOptions: {
        chart: {
          height: 340,
          type: 'pie',
        },
        labels: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        theme: {
          monochrome: {
            enabled: true,
          },
        },
        colors: [],
        dataSet: ['bg-yellow-500'],
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -5,
            },
          },
        },
        title: {
          text: 'Monochrome Pie',
        },
        dataLabels: {
          formatter(val: number, opts: any): string {
            const name = opts.w.globals.labels[opts.seriesIndex];
            return `${name}: ${val.toFixed(1)}%`;
          },
        },
        legend: {
          show: false,
        },
      },
    };
    this.gradientDonutChart = {
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        chart: {
          height: 300,
          type: 'donut',
        },
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
        title: {
          text: 'Gradient Donut with custom Start-angle',
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
    this.semiDonutChart = {
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        chart: {
          height: 300,
          type: 'donut',
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 90,
            offsetY: 10,
          },
        },
        colors: [],
        dataSet: [
          'bg-primary-500',
          'bg-green-500',
          'bg-yellow-500',
          'bg-purple-500',
          'bg-red-500',
        ],
        grid: {
          padding: {
            bottom: -80,
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
    this.patternDonutChart = {
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        chart: {
          height: 300,
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
                show: true,
                total: {
                  showAlways: true,
                  show: true,
                },
              },
            },
          },
        },
        labels: ['Comedy', 'Action', 'SciFi', 'Drama', 'Horror'],
        dataLabels: {
          dropShadow: {
            blur: 3,
            opacity: 0.8,
          },
        },
        fill: {
          type: 'pattern',
          opacity: 1,
          pattern: {
            style: [
              'verticalLines',
              'squares',
              'horizontalLines',
              'circles',
              'slantedLines',
            ],
          },
        },
        states: {
          hover: {},
        },
        theme: {
          palette: 'palette2',
        },
        title: {
          text: 'Favourite Movie Type',
        },
        colors: [],
        dataSet: [
          'bg-primary-500',
          'bg-green-500',
          'bg-yellow-500',
          'bg-purple-500',
          'bg-red-500',
        ],
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
  }
}
