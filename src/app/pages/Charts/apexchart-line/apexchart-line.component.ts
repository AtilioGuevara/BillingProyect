import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';

@Component({
    selector: 'app-apexchart-line',
    imports: [PageTitleComponent, DomixChartsComponent],
    templateUrl: './apexchart-line.component.html',
    styleUrl: './apexchart-line.component.scss'
})
export class ApexchartLineComponent {
  lineChart!: ChartInfo
  labelLineChart!: ChartInfo
  basicChart!: ChartInfo
  zoomableLineChart!: ChartInfo
  steplineChart!: ChartInfo
  gradientLineChart!: ChartInfo
  sessionDurationChart!: ChartInfo

  constructor(private settingService: LayoutSettingService) {
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }

  renderChart(): void {
    this.lineChart = {
      series: [
        {
          name: 'Series name',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'line',
          zoom: {
            enabled: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // Alternating row colors
            opacity: 0.5,
          },
          padding: {
            top: 0,
            right: 5,
            bottom: 0,
          },
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
          title: {
            text: 'X-axis',
          },
        },
        tooltip: {
          x: {
            show: true,
          },
          y: {
            formatter: (val: number) =>
              `$${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`,
          },
        },
        colors: [],
        dataSet: ['bg-primary-500'],
      },
    };

    this.labelLineChart = {
      series: [
        {
          name: 'High - 2013',
          data: [28, 29, 33, 36, 32, 32, 33],
        },
        {
          name: 'Low - 2013',
          data: [12, 11, 14, 18, 17, 13, 13],
        },
      ],
      chartOptions: {
        chart: {
          defaultLocale: 'en',
          height: 300,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth',
        },
        grid: {
          padding: {
            top: -20,
            right: 0,
            bottom: 0,
          },
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
        xaxis: {
          title: {
            text: 'Month',
          },
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        },
        yaxis: {
          title: {
            text: 'Temperature',
          },
          min: 5,
          max: 40,
        },
        colors: [],
        dataSet: ['bg-primary-500', 'bg-gray-300'],
      },
    };

    this.basicChart = {
      series: [
        {
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: 'Revenue',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
          name: 'Free Cash Flow',
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'bar',
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
        dataSet: ['bg-primary-500', 'bg-green-500', 'bg-yellow-500'],
        colors: [],
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
        yaxis: {
          title: {
            text: '$ (thousands)',
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: (val: number) => `$ ${val} thousands`,
          },
        },
      },
    };

    this.zoomableLineChart = {
      series: [
        {
          name: 'XYZ MOTORS',
          data: [
            {
              x: new Date('2024-06-12').getTime(),
              y: 140,
            },
            {
              x: new Date('2024-06-13').getTime(),
              y: 147,
            },
            {
              x: new Date('2024-06-14').getTime(),
              y: 150,
            },
            {
              x: new Date('2024-06-15').getTime(),
              y: 154,
            },
            {
              x: new Date('2024-06-16').getTime(),
              y: 160,
            },
            {
              x: new Date('2024-06-17').getTime(),
              y: 165,
            },
            {
              x: new Date('2024-06-18').getTime(),
              y: 162,
            },
            {
              x: new Date('2024-06-20').getTime(),
              y: 159,
            },
            {
              x: new Date('2024-06-21').getTime(),
              y: 164,
            },
            {
              x: new Date('2024-06-22').getTime(),
              y: 160,
            },
            {
              x: new Date('2024-06-23').getTime(),
              y: 165,
            },
            {
              x: new Date('2024-06-24').getTime(),
              y: 169,
            },
            {
              x: new Date('2024-06-25').getTime(),
              y: 172,
            },
            {
              x: new Date('2024-06-26').getTime(),
              y: 177,
            },
            {
              x: new Date('2024-06-27').getTime(),
              y: 173,
            },
            {
              x: new Date('2024-06-28').getTime(),
              y: 169,
            },
            {
              x: new Date('2024-06-29').getTime(),
              y: 163,
            },
            {
              x: new Date('2024-06-30').getTime(),
              y: 158,
            },
            {
              x: new Date('2024-07-01').getTime(),
              y: 153,
            },
            {
              x: new Date('2024-07-02').getTime(),
              y: 149,
            },
            {
              x: new Date('2024-07-03').getTime(),
              y: 144,
            },
            {
              x: new Date('2024-07-05').getTime(),
              y: 150,
            },
            {
              x: new Date('2024-07-06').getTime(),
              y: 155,
            },
            {
              x: new Date('2024-07-07').getTime(),
              y: 159,
            },
            {
              x: new Date('2024-07-08').getTime(),
              y: 163,
            },
            {
              x: new Date('2024-07-09').getTime(),
              y: 156,
            },
            {
              x: new Date('2024-07-11').getTime(),
              y: 151,
            },
            {
              x: new Date('2024-07-12').getTime(),
              y: 157,
            },
            {
              x: new Date('2024-07-13').getTime(),
              y: 161,
            },
            {
              x: new Date('2024-07-14').getTime(),
              y: 150,
            },
            {
              x: new Date('2024-07-15').getTime(),
              y: 154,
            },
            {
              x: new Date('2024-07-16').getTime(),
              y: 160,
            },
            {
              x: new Date('2024-07-17').getTime(),
              y: 165,
            },
            {
              x: new Date('2024-07-18').getTime(),
              y: 162,
            },
            {
              x: new Date('2024-07-20').getTime(),
              y: 159,
            },
            {
              x: new Date('2024-07-21').getTime(),
              y: 164,
            },
            {
              x: new Date('2024-07-22').getTime(),
              y: 160,
            },
            {
              x: new Date('2024-07-23').getTime(),
              y: 165,
            },
            {
              x: new Date('2024-07-24').getTime(),
              y: 169,
            },
            {
              x: new Date('2024-07-25').getTime(),
              y: 172,
            },
            {
              x: new Date('2024-07-26').getTime(),
              y: 177,
            },
            {
              x: new Date('2024-07-27').getTime(),
              y: 173,
            },
            {
              x: new Date('2024-07-28').getTime(),
              y: 169,
            },
            {
              x: new Date('2024-07-29').getTime(),
              y: 163,
            },
            {
              x: new Date('2024-07-30').getTime(),
              y: 162,
            },
            {
              x: new Date('2024-08-01').getTime(),
              y: 158,
            },
            {
              x: new Date('2024-08-02').getTime(),
              y: 152,
            },
            {
              x: new Date('2024-08-03').getTime(),
              y: 147,
            },
            {
              x: new Date('2024-08-05').getTime(),
              y: 142,
            },
            {
              x: new Date('2024-08-06').getTime(),
              y: 147,
            },
            {
              x: new Date('2024-08-07').getTime(),
              y: 151,
            },
            {
              x: new Date('2024-08-08').getTime(),
              y: 155,
            },
            {
              x: new Date('2024-08-09').getTime(),
              y: 159,
            },
            {
              x: new Date('2024-08-11').getTime(),
              y: 162,
            },
            {
              x: new Date('2024-08-12').getTime(),
              y: 157,
            },
            {
              x: new Date('2024-08-13').getTime(),
              y: 161,
            },
            {
              x: new Date('2024-08-14').getTime(),
              y: 166,
            },
            {
              x: new Date('2024-08-15').getTime(),
              y: 169,
            },
            {
              x: new Date('2024-08-16').getTime(),
              y: 172,
            },
            {
              x: new Date('2024-08-17').getTime(),
              y: 177,
            },
            {
              x: new Date('2024-08-18').getTime(),
              y: 181,
            },
            {
              x: new Date('2024-08-20').getTime(),
              y: 178,
            },
            {
              x: new Date('2024-08-21').getTime(),
              y: 173,
            },
            {
              x: new Date('2024-08-22').getTime(),
              y: 169,
            },
            {
              x: new Date('2024-08-23').getTime(),
              y: 163,
            },
            {
              x: new Date('2024-08-24').getTime(),
              y: 159,
            },
            {
              x: new Date('2024-08-25').getTime(),
              y: 164,
            },
            {
              x: new Date('2024-08-26').getTime(),
              y: 168,
            },
            {
              x: new Date('2024-08-27').getTime(),
              y: 172,
            },
            {
              x: new Date('2024-08-28').getTime(),
              y: 169,
            },
            {
              x: new Date('2024-08-29').getTime(),
              y: 163,
            },
            {
              x: new Date('2024-08-30').getTime(),
              y: 162,
            },
            {
              x: new Date('2024-09-01').getTime(),
              y: 158,
            },
            {
              x: new Date('2024-09-02').getTime(),
              y: 152,
            },
            {
              x: new Date('2024-09-03').getTime(),
              y: 147,
            },
            {
              x: new Date('2024-09-05').getTime(),
              y: 142,
            },
            {
              x: new Date('2024-09-06').getTime(),
              y: 147,
            },
            {
              x: new Date('2024-09-07').getTime(),
              y: 151,
            },
            {
              x: new Date('2024-09-08').getTime(),
              y: 155,
            },
            {
              x: new Date('2024-09-09').getTime(),
              y: 159,
            },
            {
              x: new Date('2024-09-11').getTime(),
              y: 162,
            },
            {
              x: new Date('2024-09-12').getTime(),
              y: 157,
            },
            {
              x: new Date('2024-09-13').getTime(),
              y: 161,
            },
            {
              x: new Date('2024-09-14').getTime(),
              y: 166,
            },
            {
              x: new Date('2024-09-15').getTime(),
              y: 169,
            },
            {
              x: new Date('2024-09-16').getTime(),
              y: 172,
            },
            {
              x: new Date('2024-09-17').getTime(),
              y: 177,
            },
            {
              x: new Date('2024-09-18').getTime(),
              y: 181,
            },
            {
              x: new Date('2024-09-20').getTime(),
              y: 178,
            },
            {
              x: new Date('2024-09-21').getTime(),
              y: 173,
            },
          ],
        },
      ],
      chartOptions: {
        chart: {
          defaultLocale: 'en',
          height: 300,
          type: 'area',
          stacked: false,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: 'zoom',
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: [],
        dataSet: ['bg-sky-500'],
        markers: {
          size: 0,
        },
        title: {
          text: 'Stock Price Movement',
          align: 'left',
        },
        grid: {
          padding: {
            top: -20,
            right: 0,
            bottom: 0,
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },
        yaxis: {
          labels: {
            formatter: (val) => (val / 1000000).toFixed(0),
          },
          title: {
            text: 'Price',
          },
        },
        xaxis: {
          type: 'datetime',
        },
        tooltip: {
          shared: false,
          y: {
            formatter: (val) => (val / 1000000).toFixed(0),
          },
        },
      },
    };

    this.steplineChart = {
      series: [
        {
          name: 'Data Series',
          data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58],
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'line',
          zoom: {
            enabled: true,
          },
          defaultLocale: 'en',
        },
        stroke: {
          curve: 'stepline',
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: 'Stepline Chart',
          align: 'left',
        },
        markers: {
          hover: {
            sizeOffset: 4,
          },
        },
        colors: [],
        dataSet: ['bg-green-500'],
        grid: {
          padding: {
            top: 0,
            right: 5,
            bottom: 0,
          },
        },
        tooltip: {
          y: {
            formatter: (val: number) =>
              `$ ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`,
          },
        },
      },
    };

    this.gradientLineChart = {
      series: [
        {
          name: 'Sales',
          data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
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
        },
        forecastDataPoints: {
          count: 7,
        },
        stroke: {
          width: 5,
          curve: 'smooth',
        },
        xaxis: {
          type: 'datetime',
          categories: [
            '1/11/2000',
            '2/11/2000',
            '3/11/2000',
            '4/11/2000',
            '5/11/2000',
            '6/11/2000',
            '7/11/2000',
            '8/11/2000',
            '9/11/2000',
            '10/11/2000',
            '11/11/2000',
            '12/11/2000',
            '1/11/2001',
            '2/11/2001',
            '3/11/2001',
            '4/11/2001',
            '5/11/2001',
            '6/11/2001',
          ],
          tickAmount: 10,
          labels: {
            formatter: function (
              value: string,
              timestamp?: number,
              opts?: any
            ): string {
              return opts.dateFormatter(new Date(timestamp || 0), 'dd MMM');
            },
          },
        },
        title: {
          text: 'Forecast',
          align: 'left',
          style: {
            fontSize: '16px',
            color: '#666',
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: ['#FDD835'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100],
          },
        },
        yaxis: {
          min: -10,
          max: 40,
        },
        colors: [],
        dataSet: ['bg-orange-500', 'bg-primary-500'],
        grid: {
          padding: {
            top: 0,
            right: 5,
            bottom: 0,
          },
        },
      },
    };

    this.sessionDurationChart = {
      series: [
        {
          name: 'Session Duration',
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
        },
        {
          name: 'Page Views',
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
        },
        {
          name: 'Total Visits',
          data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
        },
      ],
      chartOptions: {
        chart: {
          defaultLocale: 'en',
          height: 300,
          type: 'line',
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [5, 7, 5],
          curve: 'smooth',
          dashArray: [0, 8, 5],
        },
        title: {
          text: 'Page Statistics',
          align: 'left',
        },
        legend: {
          tooltipHoverFormatter: function (val: string, opts: any): string {
            return (
              val +
              ' - <strong>' +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              '</strong>'
            );
          },
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6,
          },
        },
        grid: {
          padding: {
            top: -20,
            right: 0,
            bottom: 0,
          },
        },
        tooltip: {
          y: [],
        },
        colors: [],
        dataSet: ['bg-primary-500', 'bg-green-500', 'bg-gray-200'],
      },
    };

  }
}
