import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';

@Component({
    selector: 'app-apexchart-treemap',
    imports: [PageTitleComponent, DomixChartsComponent],
    templateUrl: './apexchart-treemap.component.html',
    styleUrl: './apexchart-treemap.component.scss'
})
export class ApexchartTreemapComponent {
  treemapChart!: ChartInfo
  multipleTreemapChart!: ChartInfo
  colorRangeTreemapChart!: ChartInfo
  distributedTreemapChart!: ChartInfo

  constructor(private settingService: LayoutSettingService) {
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }
  renderChart(): void {
    this.treemapChart = {
      series: [
        {
          data: [
            { x: 'New Delhi', y: 218 },
            { x: 'Kolkata', y: 149 },
            { x: 'Mumbai', y: 184 },
            { x: 'Ahmedabad', y: 55 },
            { x: 'Bangaluru', y: 84 },
            { x: 'Pune', y: 31 },
            { x: 'Chennai', y: 70 },
            { x: 'Jaipur', y: 30 },
            { x: 'Surat', y: 44 },
            { x: 'Hyderabad', y: 68 },
            { x: 'Lucknow', y: 28 },
            { x: 'Indore', y: 19 },
            { x: 'Kanpur', y: 29 },
          ],
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'treemap',
        },
        colors: [],
        dataSet: ['bg-primary-500'],
        legend: {
          show: false,
        },
        title: {
          text: 'Basic Treemap',
        },
        plotOptions: {
          treemap: {
            distributed: true, // Optionally set to true for distributed colors
          },
        },
      },
    };
    this.multipleTreemapChart = {
      series: [
        {
          name: 'Desktops',
          data: [
            { x: 'ABC', y: 10 },
            { x: 'DEF', y: 60 },
            { x: 'XYZ', y: 41 },
          ],
        },
        {
          name: 'Mobile',
          data: [
            { x: 'ABCD', y: 10 },
            { x: 'DEFG', y: 20 },
            { x: 'WXYZ', y: 51 },
            { x: 'PQR', y: 30 },
            { x: 'MNO', y: 20 },
            { x: 'CDE', y: 30 },
          ],
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'treemap',
        },
        colors: [],
        dataSet: ['bg-primary-500', 'bg-green-500'],
        legend: {
          show: false,
        },
        title: {
          text: 'Multi-dimensional Treemap',
          align: 'center',
        },
      },
    };
    this.colorRangeTreemapChart = {
      series: [
        {
          data: [
            { x: 'INTC', y: 1.2 },
            { x: 'GS', y: 0.4 },
            { x: 'CVX', y: -1.4 },
            { x: 'GE', y: 2.7 },
            { x: 'CAT', y: -0.3 },
            { x: 'RTX', y: 5.1 },
            { x: 'CSCO', y: -2.3 },
            { x: 'JNJ', y: 2.1 },
            { x: 'PG', y: 0.3 },
            { x: 'TRV', y: 0.12 },
            { x: 'MMM', y: -2.31 },
            { x: 'NKE', y: 3.98 },
            { x: 'IYT', y: 1.67 },
          ],
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'treemap',
        },
        legend: {
          show: false,
        },
        title: {
          text: 'Treemap with Color Scale',
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
          },
          formatter: function (
            text: string | number | number[],
            op: any
          ): string {
            return `${text}: ${op.value}`;
          },
          offsetY: -4,
        },
        colors: [],
        dataSet: ['bg-primary-500', 'bg-green-500'],
        plotOptions: {
          treemap: {
            enableShades: true,
            shadeIntensity: 0.5,
            reverseNegativeShade: true,
            colorScale: {
              ranges: [
                {
                  from: -6,
                  to: 0,
                  color: '#CD363A',
                },
                {
                  from: 0.001,
                  to: 6,
                  color: '#52B12C',
                },
              ],
            },
          },
        },
      },
    };
    this.distributedTreemapChart = {
      series: [
        {
          data: [
            { x: 'New Delhi', y: 218 },
            { x: 'Kolkata', y: 149 },
            { x: 'Mumbai', y: 184 },
            { x: 'Ahmedabad', y: 55 },
            { x: 'Bangaluru', y: 84 },
            { x: 'Pune', y: 31 },
            { x: 'Chennai', y: 70 },
            { x: 'Jaipur', y: 30 },
            { x: 'Surat', y: 44 },
            { x: 'Hyderabad', y: 68 },
            { x: 'Lucknow', y: 28 },
            { x: 'Indore', y: 19 },
            { x: 'Kanpur', y: 29 },
          ],
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'treemap',
        },
        legend: {
          show: false,
        },
        title: {
          text: 'Distributed Treemap (different color for each cell)',
          align: 'center',
        },
        colors: [],
        dataSet: [
          'bg-primary-500',
          'bg-green-500',
          'bg-yellow-500',
          'bg-purple-500',
          'bg-sky-500',
          'bg-red-500',
        ],
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false,
          },
        },
      },
    };
  }
}
