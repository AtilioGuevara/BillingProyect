import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';

@Component({
    selector: 'app-apexchart-radar',
    imports: [PageTitleComponent, DomixChartsComponent],
    templateUrl: './apexchart-radar.component.html',
    styleUrl: './apexchart-radar.component.scss'
})
export class ApexchartRadarComponent {
  radarChart!: ChartInfo
  multipleRadarChart!: ChartInfo
  polygonRadarChart!: ChartInfo


  constructor(private settingService: LayoutSettingService) {
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }


  renderChart(): void {
    this.radarChart = {
      series: [
        {
          name: 'Series 1',
          data: [80, 50, 30, 40, 100, 20],
        },
      ],
      chartOptions: {
        chart: {
          height: 370,
          type: 'radar',
        },
        colors: [],
        dataSet: ['bg-primary-500'],
        title: {
          text: 'Basic Radar Chart',
        },
        xaxis: {
          categories: ['January', 'February', 'March', 'April', 'May', 'June'],
        },
      },
    };

    this.multipleRadarChart = {
      series: [
        {
          name: 'Series 1',
          data: [80, 50, 30, 40, 100, 20],
        },
        {
          name: 'Series 2',
          data: [20, 30, 40, 80, 20, 80],
        },
        {
          name: 'Series 3',
          data: [44, 76, 78, 13, 43, 10],
        },
      ],
      chartOptions: {
        chart: {
          height: 370,
          type: 'radar',
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1,
          },
        },
        title: {
          text: 'Radar Chart - Multi Series',
        },
        colors: [],
        dataSet: ['bg-primary-500', 'bg-yellow-500', 'bg-green-500'],
        stroke: {
          width: 2,
        },
        fill: {
          opacity: 0.1,
        },
        markers: {
          size: 0,
        },
        xaxis: {
          categories: ['2011', '2012', '2013', '2014', '2015', '2016'],
        },
      },
    };

    this.polygonRadarChart = {
      series: [
        {
          name: 'Series 1',
          data: [20, 100, 40, 30, 50, 80, 33],
        },
      ],
      chartOptions: {
        chart: {
          height: 330,
          type: 'radar',
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1,
          },
        },
        dataLabels: {
          enabled: true,
        },
        plotOptions: {
          radar: {
            size: 140,
            polygons: {
              strokeColors: '#e9e9e9',
              fill: {
                colors: ['#f8f8f8', '#fff'],
              },
            },
          },
        },
        title: {
          text: 'Radar with Polygon Fill',
        },
        colors: [], // Ensure colors are set properly elsewhere
        dataSet: ['bg-red-500'],
        markers: {
          size: 4,
          colors: ['#fff'],
          strokeColors: '#FF4560',
          strokeWidth: 2,
        },
        tooltip: {
          y: {
            formatter: function (val: number) {
              return val.toString();
            },
          },
        },
        xaxis: {
          categories: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
        },
        yaxis: {
          tickAmount: 7,
          labels: {
            formatter: function (val: number, i: number) {
              return i % 2 === 0 ? val.toString() : '';
            },
          },
        },
      },
    };
  }
}
