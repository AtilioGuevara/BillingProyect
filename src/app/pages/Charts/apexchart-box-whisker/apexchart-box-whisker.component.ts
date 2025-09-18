import { Component, OnInit } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';

@Component({
    selector: 'app-apexchart-box-whisker',
    imports: [PageTitleComponent, DomixChartsComponent],
    templateUrl: './apexchart-box-whisker.component.html',
    styleUrls: ['./apexchart-box-whisker.component.scss']
})
export class ApexchartBoxWhiskerComponent {
  boxPlotChart!: ChartInfo
  boxplotChart!: ChartInfo
  boxplotChart1!: ChartInfo

  constructor(private settingService: LayoutSettingService) {
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }

  renderChart(): void {
    this.boxPlotChart = {
      series: [
        {
          type: 'boxPlot',
          data: [
            { x: 'Jan 2015', y: [54, 66, 69, 75, 88] },
            { x: 'Jan 2016', y: [43, 65, 69, 76, 81] },
            { x: 'Jan 2017', y: [31, 39, 45, 51, 59] },
            { x: 'Jan 2018', y: [39, 46, 55, 65, 71] },
            { x: 'Jan 2019', y: [29, 31, 35, 39, 44] },
            { x: 'Jan 2020', y: [41, 49, 58, 61, 67] },
            { x: 'Jan 2021', y: [54, 59, 66, 71, 88] },
          ],
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'boxPlot',
        },
        title: {
          text: 'Basic BoxPlot Chart',
          align: 'left',
        },
        dataSet: [],
        plotOptions: {
          boxPlot: {
            colors: {
              upper: '#5C4742',
              lower: '#A5978B',
            },
          },
        },
        xaxis: {
          type: 'category',
          categories: [
            'Jan 2015',
            'Jan 2016',
            'Jan 2017',
            'Jan 2018',
            'Jan 2019',
            'Jan 2020',
            'Jan 2021',
          ],
        },
        yaxis: {
          title: {
            text: 'Value',
          },
        },
        tooltip: {
          y: {
            formatter: (val: number) => `${val}`,
          },
        },
      },
    };

    this.boxplotChart = {
      series: [
        {
          name: 'box',
          type: 'boxPlot',
          data: [
            {
              x: new Date('2017-01-01').getTime(),
              y: [54, 66, 69, 75, 88],
            },
            {
              x: new Date('2018-01-01').getTime(),
              y: [43, 65, 69, 76, 81],
            },
            {
              x: new Date('2019-01-01').getTime(),
              y: [31, 39, 45, 51, 59],
            },
            {
              x: new Date('2020-01-01').getTime(),
              y: [39, 46, 55, 65, 71],
            },
            {
              x: new Date('2021-01-01').getTime(),
              y: [29, 31, 35, 39, 44],
            },
          ],
        },
        {
          name: 'outliers',
          type: 'scatter',
          data: [
            {
              x: new Date('2017-01-01').getTime(),
              y: 32,
            },
            {
              x: new Date('2018-01-01').getTime(),
              y: 25,
            },
            {
              x: new Date('2019-01-01').getTime(),
              y: 64,
            },
            {
              x: new Date('2020-01-01').getTime(),
              y: 27,
            },
            {
              x: new Date('2020-01-01').getTime(),
              y: 78,
            },
            {
              x: new Date('2021-01-01').getTime(),
              y: 15,
            },
          ],
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'boxPlot',
        },
        dataSet: [],
        colors: ['#008FFB', '#FEB019'],
        title: {
          text: 'BoxPlot - Scatter Chart',
          align: 'left',
        },
        xaxis: {
          type: 'datetime',
          tooltip: {
            formatter: (value: string) => {
              // Convert the string value to a number (timestamp) and then to a year
              const timestamp = parseInt(value, 10);
              return new Date(timestamp).getFullYear().toString();
            },
          },
        },
        tooltip: {
          shared: false,
          intersect: true,
        },
      },
    };

    this.boxplotChart1 = {
      series: [
        {
          data: [
            {
              x: 'Category A',
              y: [54, 66, 69, 75, 88],
            },
            {
              x: 'Category B',
              y: [43, 65, 69, 76, 81],
            },
            {
              x: 'Category C',
              y: [31, 39, 45, 51, 59],
            },
            {
              x: 'Category D',
              y: [39, 46, 55, 65, 71],
            },
            {
              x: 'Category E',
              y: [29, 31, 35, 39, 44],
            },
            {
              x: 'Category F',
              y: [41, 49, 58, 61, 67],
            },
            {
              x: 'Category G',
              y: [54, 59, 66, 71, 88],
            },
          ],
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'boxPlot',
        },
        title: {
          text: 'Horizontal BoxPlot Chart',
          align: 'left',
        },
        dataSet: [],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '50%',
          },
          boxPlot: {
            colors: {
              upper: '#e9ecef',
              lower: '#f8f9fa',
            },
          },
        },
        stroke: {
          colors: ['#6c757d'],
        },
      },
    };
  }

}
