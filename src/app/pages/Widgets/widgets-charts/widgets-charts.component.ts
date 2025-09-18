import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CountUpModule } from 'ngx-countup';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { DomixDropdownModule } from '../../../module/domix dropdown/domix-dropdown.module';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';

@Component({
    selector: 'app-widgets-charts',
    imports: [
        PageTitleComponent,
        CountUpModule,
        DomixChartsComponent,
        LucideAngularModule,
        CommonModule,
        DomixDropdownModule,
    ],
    templateUrl: './widgets-charts.component.html',
    styleUrl: './widgets-charts.component.scss'
})
export class WidgetsChartsComponent {
  adsRevenueChart!: ChartInfo
  lineChart!: ChartInfo
  adsRevenueChart2!: ChartInfo
  labelColumnChart!: ChartInfo
  semiDonutChart!: ChartInfo

  constructor(private settingService: LayoutSettingService) {
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }
  renderChart(): void {
    this.adsRevenueChart = {
      series: [
        {
          name: 'Total Revenue',
          data: [31, 77, 44, 31, 63, 94, 109],
        },
      ],
      chartOptions: {
        chart: {
          defaultLocale: 'en',
          height: 140,
          type: 'line',
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 3,
          curve: 'smooth',
          dashArray: [10],
        },
        legend: {
          tooltipHoverFormatter: function (val: string, opts: any) {
            return `${val} - <strong>${opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]
              }</strong>`;
          },
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 5,
          },
        },
        grid: {
          borderColor: '#e0e0e0', // You can adjust this as needed
          padding: {
            top: -20,
            right: 0,
            bottom: 0,
            left: 7,
          },
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        yaxis: {
          show: false,
        },
        colors: [],
        dataSet: ['bg-red-500'],
      },
    };
    this.lineChart = {
      series: [
        {
          name: 'Total Revenue',
          data: [31, 40, 28, 51, 42, 119, 100],
        },
      ],
      chartOptions: {
        chart: {
          defaultLocale: 'en',
          height: 140,
          type: 'line',
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 3,
          curve: 'smooth',
          dashArray: [10],
        },
        legend: {
          tooltipHoverFormatter: function (val: string, opts: any) {
            return `${val} - <strong>${opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]
              }</strong>`;
          },
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 5,
          },
        },
        grid: {
          borderColor: '#dcdcdc', // Example color; replace with dynamic color if needed
          padding: {
            top: -20,
            right: 0,
            bottom: 0,
            left: 7,
          },
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        yaxis: {
          show: false,
        },
        colors: [],
        dataSet: [
          'bg-primary-500',
          'bg-primary-100',
          'bg-primary-50',
          'bg-primary-300',
        ],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },
    };
    this.adsRevenueChart2 = {
      series: [
        {
          name: 'Total Revenue',
          data: [31, 77, 44, 31, 63, 94, 109],
        },
      ],
      chartOptions: {
        chart: {
          defaultLocale: 'en',
          height: 140,
          type: 'line',
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 3,
          curve: 'smooth',
          dashArray: [10],
        },
        legend: {
          tooltipHoverFormatter: function (val: string, opts: any) {
            return `${val} - <strong>${opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]
              }</strong>`;
          },
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 5,
          },
        },
        grid: {
          borderColor: '#e0e0e0', // You can adjust this as needed
          padding: {
            top: -20,
            right: 0,
            bottom: 0,
            left: 7,
          },
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        yaxis: {
          show: false,
        },
        colors: [],
        dataSet: ['bg-purple-500'],
      },
    };
    this.labelColumnChart = {
      series: [
        {
          name: 'Inflation',
          data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 1.3, 1.9, 2.8],
        },
      ],
      chartOptions: {
        chart: {
          height: 268,
          type: 'bar',
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: '60%',
            borderRadius: 5,
            dataLabels: {
              position: 'top',
            },
          },
        },
        dataLabels: {
          enabled: false,
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
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
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
            formatter: (val: number) => `${val}%`,
          },
        },
        grid: {
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
            top: -10,
            right: 1,
            bottom: 0,
            left: 0,
          },
        },
        colors: [],
        dataSet: ['bg-primary-500'],
      },
    };
    this.semiDonutChart = {
      series: [48, 98],
      chartOptions: {
        chart: {
          height: 200,
          type: 'donut',
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 90,
            offsetY: 20,
          },
        },
        legend: {
          show: false,
        },
        colors: [],
        dataSet: ['bg-primary-500', 'bg-pink-400'],
        grid: {
          padding: {
            top: -20,
            bottom: -80,
          },
        },
      },
    };
  }
}
