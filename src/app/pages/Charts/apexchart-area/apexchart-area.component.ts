import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';

@Component({
    selector: 'app-apexchart-area',
    imports: [PageTitleComponent, DomixChartsComponent],
    templateUrl: './apexchart-area.component.html',
    styleUrl: './apexchart-area.component.scss'
})
export class ApexchartAreaComponent {
  isDark = false;
  areaChart!: ChartInfo;
  splineAreaChart!: ChartInfo;
  negativeAreaChart!: ChartInfo;
  stackedAreaChart!: ChartInfo;
  missingAreaChart!: ChartInfo;

  constructor(private settingService: LayoutSettingService) {
    this.settingService.settings$.subscribe((settings) => {
      this.isDark = settings.mode === 'dark' ? true : false;

      this.renderChart()
    });
  }

  renderChart(): void {

    this.areaChart = {
      series: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
      chartOptions: {
        chart: {
          defaultLocale: 'en',
          height: 300,
          type: 'area',
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [5, 7, 5],
          curve: 'straight',
          dashArray: [0, 8, 5],
        },
        title: {
          text: 'Page Statistics',
          align: 'left',
        },
        legend: {
          tooltipHoverFormatter: (val, opts) => {
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
          y: [
            {
              title: {
                formatter: (val: string) => val + ' (mins)',
              },
            },
            {
              title: {
                formatter: (val: string) => val + ' per session',
              },
            },
            {
              title: {
                formatter: (val: string) => val,
              },
            },
          ],
        },
        dataSet: ['bg-primary-500'], // Example color classes, adjust as needed
        colors: [], // This will be populated dynamically by your ColorService
        xaxis: {
          categories: [
            '01 Jan',
            '02 Jan',
            '03 Jan',
            '04 Jan',
            '05 Jan',
            '06 Jan',
            '07 Jan',
            '08 Jan',
            '09 Jan',
            '10 Jan',
            '11 Jan',
            '12 Jan',
          ],
        },
      },
    };

    this.splineAreaChart = {
      series: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chartOptions: {
        chart: {
          defaultLocale: 'en',
          height: 300,
          type: 'area',
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'datetime',
          categories: [
            '2024-06-19T00:00:00.000Z',
            '2024-06-19T01:30:00.000Z',
            '2024-06-19T02:30:00.000Z',
            '2024-06-19T03:30:00.000Z',
            '2024-06-19T04:30:00.000Z',
            '2024-06-19T05:30:00.000Z',
            '2024-06-19T06:30:00.000Z',
          ],
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm',
          },
        },
        dataSet: ['bg-sky-500', 'bg-green-500'], // Example classes, replace with actual classes or logic
        colors: [],
      },
    };

    this.negativeAreaChart = {
      series: [
        {
          name: 'north',
          data: [
            { x: new Date(1996, 0, 1).getTime(), y: 322 },
            { x: new Date(1997, 0, 1).getTime(), y: 324 },
            { x: new Date(1998, 0, 1).getTime(), y: 329 },
            { x: new Date(1999, 0, 1).getTime(), y: 342 },
            { x: new Date(2000, 0, 1).getTime(), y: 348 },
            { x: new Date(2001, 0, 1).getTime(), y: 334 },
            { x: new Date(2002, 0, 1).getTime(), y: 325 },
            { x: new Date(2003, 0, 1).getTime(), y: 316 },
            { x: new Date(2004, 0, 1).getTime(), y: 318 },
            { x: new Date(2005, 0, 1).getTime(), y: 330 },
            { x: new Date(2006, 0, 1).getTime(), y: 355 },
            { x: new Date(2007, 0, 1).getTime(), y: 366 },
            { x: new Date(2008, 0, 1).getTime(), y: 337 },
            { x: new Date(2009, 0, 1).getTime(), y: 352 },
            { x: new Date(2010, 0, 1).getTime(), y: 377 },
            { x: new Date(2011, 0, 1).getTime(), y: 383 },
            { x: new Date(2012, 0, 1).getTime(), y: 344 },
            { x: new Date(2013, 0, 1).getTime(), y: 366 },
            { x: new Date(2014, 0, 1).getTime(), y: 389 },
            { x: new Date(2015, 0, 1).getTime(), y: 334 },
          ],
        },
        {
          name: 'south',
          data: [
            { x: new Date(1996, 0, 1).getTime(), y: 162 },
            { x: new Date(1997, 0, 1).getTime(), y: 90 },
            { x: new Date(1998, 0, 1).getTime(), y: 50 },
            { x: new Date(1999, 0, 1).getTime(), y: 77 },
            { x: new Date(2000, 0, 1).getTime(), y: 35 },
            { x: new Date(2001, 0, 1).getTime(), y: -45 },
            { x: new Date(2002, 0, 1).getTime(), y: -88 },
            { x: new Date(2003, 0, 1).getTime(), y: -120 },
            { x: new Date(2004, 0, 1).getTime(), y: -156 },
            { x: new Date(2005, 0, 1).getTime(), y: -123 },
            { x: new Date(2006, 0, 1).getTime(), y: -88 },
            { x: new Date(2007, 0, 1).getTime(), y: -66 },
            { x: new Date(2008, 0, 1).getTime(), y: -45 },
            { x: new Date(2009, 0, 1).getTime(), y: -29 },
            { x: new Date(2010, 0, 1).getTime(), y: -45 },
            { x: new Date(2011, 0, 1).getTime(), y: -88 },
            { x: new Date(2012, 0, 1).getTime(), y: -132 },
            { x: new Date(2013, 0, 1).getTime(), y: -146 },
            { x: new Date(2014, 0, 1).getTime(), y: -169 },
            { x: new Date(2015, 0, 1).getTime(), y: -184 },
          ],
        },
      ],
      chartOptions: {
        chart: {
          defaultLocale: 'en',
          height: 300,
          type: 'area',
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        title: {
          text: 'Area with Negative Values',
          align: 'left',
          style: {
            fontSize: '14px',
          },
        },
        xaxis: {
          type: 'datetime',
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          tickAmount: 4,
          floating: false,
          labels: {
            style: {
              colors: '#8e8da4',
            },
            offsetY: -7,
            offsetX: 0,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        fill: {
          opacity: 0.5,
        },
        tooltip: {
          x: {
            format: 'yyyy',
          },
          fixed: {
            enabled: false,
            position: 'topRight',
          },
        },
        grid: {
          yaxis: {
            lines: {
              offsetX: -30,
            },
          },
          padding: {
            left: 20,
          },
        },
        colors: [], // Colors will be dynamically assigned using the service
        dataSet: !this.isDark
          ? ['bg-primary-500', 'bg-gray-300']
          : ['bg-primary-500', 'bg-dark-700'], // Assuming these classes are defined for colors
      },
    };

    this.stackedAreaChart = {
      series: [
        {
          name: 'South',
          data: this.generateDayWiseTimeSeries(
            new Date('11 Feb 2024 GMT').getTime(),
            20,
            {
              min: 10,
              max: 60,
            }
          ),
        },
        {
          name: 'North',
          data: this.generateDayWiseTimeSeries(
            new Date('11 Feb 2024 GMT').getTime(),
            20,
            {
              min: 10,
              max: 20,
            }
          ),
        },
        {
          name: 'Central',
          data: this.generateDayWiseTimeSeries(
            new Date('11 Feb 2024 GMT').getTime(),
            20,
            {
              min: 10,
              max: 15,
            }
          ),
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'area',
          stacked: true,
          events: {
            selection: function (chart, e) {
              // console.log(new Date(e.xaxis.min));
            },
          },
        },
        colors: [],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 0.6,
            opacityTo: 0.8,
          },
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
        },
        xaxis: {
          type: 'datetime',
        },
        dataSet: !this.isDark
          ? ['bg-primary-500', 'bg-green-500', 'bg-gray-200']
          : ['bg-primary-500', 'bg-green-500', 'bg-dark-700'], // Example dataset for colors
      },
    };

    this.missingAreaChart = {
      series: [
        {
          name: 'Network',
          data: [
            { x: 'Dec 23 2017', y: null },
            { x: 'Dec 24 2017', y: 44 },
            { x: 'Dec 25 2017', y: 31 },
            { x: 'Dec 26 2017', y: 38 },
            { x: 'Dec 27 2017', y: null },
            { x: 'Dec 28 2017', y: 32 },
            { x: 'Dec 29 2017', y: 55 },
            { x: 'Dec 30 2017', y: 51 },
            { x: 'Dec 31 2017', y: 67 },
            { x: 'Jan 01 2018', y: 22 },
            { x: 'Jan 02 2018', y: 34 },
            { x: 'Jan 03 2018', y: null },
            { x: 'Jan 04 2018', y: null },
            { x: 'Jan 05 2018', y: 11 },
            { x: 'Jan 06 2018', y: 4 },
            { x: 'Jan 07 2018', y: 15 },
            { x: 'Jan 08 2018', y: null },
            { x: 'Jan 09 2018', y: 9 },
            { x: 'Jan 10 2018', y: 34 },
            { x: 'Jan 11 2018', y: null },
            { x: 'Jan 12 2018', y: null },
            { x: 'Jan 13 2018', y: 13 },
            { x: 'Jan 14 2018', y: null },
          ],
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'area',
          animations: {
            enabled: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        dataSet: ['bg-primary-500'],
        colors: [],
        stroke: {
          curve: 'straight',
        },
        fill: {
          opacity: 0.8,
          type: 'pattern',
          pattern: {
            style: ['verticalLines', 'horizontalLines'],
            width: 5,
            height: 6,
          },
        },
        markers: {
          size: 5,
          hover: {
            size: 9,
          },
        },
        title: {
          text: 'Network Monitoring',
        },
        tooltip: {
          intersect: true,
          shared: false,
        },
        theme: {
          palette: 'palette1',
        },
        xaxis: {
          type: 'datetime',
        },
        yaxis: {
          title: {
            text: 'Bytes Received',
          },
        },
      },
    };
  }

  generateDayWiseTimeSeries(
    baseval: number,
    count: number,
    yrange: { min: number; max: number }
  ) {
    const series = [];
    for (let i = 0; i < count; i++) {
      const x = baseval;
      const y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([x, y]);
      baseval += 86400000; // Increment by one day in milliseconds
    }
    return series;
  }
}
