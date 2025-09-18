import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';

@Component({
    selector: 'app-apexchart-slope',
    imports: [PageTitleComponent, DomixChartsComponent],
    templateUrl: './apexchart-slope.component.html',
    styleUrl: './apexchart-slope.component.scss'
})
export class ApexchartSlopeComponent {
  slopeChart!: ChartInfo
  lineChart!: ChartInfo

  constructor(private settingService: LayoutSettingService) {
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }
  renderChart(): void {
    this.slopeChart = {
      series: [
        {
          name: 'Blue',
          data: [
            { x: 'Jan', y: 43 },
            { x: 'Feb', y: 58 },
          ],
        },
        {
          name: 'Green',
          data: [
            { x: 'Jan', y: 33 },
            { x: 'Feb', y: 38 },
          ],
        },
        {
          name: 'Red',
          data: [
            { x: 'Jan', y: 55 },
            { x: 'Feb', y: 21 },
          ],
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'line',
        },
        plotOptions: {
          line: {
            isSlopeChart: true, // Indicates a slope chart
          },
        },
        grid: {
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
          },
        },
        dataSet: ['bg-primary-500', 'bg-green-500', 'bg-yellow-500'],
        xaxis: {
          type: 'category',
          categories: ['Jan', 'Feb'],
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
    this.lineChart = {
      series: [
        {
          name: 'Blue',
          data: [
            { x: 'Category 1', y: 503 },
            { x: 'Category 2', y: 580 },
            { x: 'Category 3', y: 135 },
          ],
        },
        {
          name: 'Green',
          data: [
            { x: 'Category 1', y: 733 },
            { x: 'Category 2', y: 385 },
            { x: 'Category 3', y: 715 },
          ],
        },
        {
          name: 'Orange',
          data: [
            { x: 'Category 1', y: 255 },
            { x: 'Category 2', y: 211 },
            { x: 'Category 3', y: 441 },
          ],
        },
        {
          name: 'Red',
          data: [
            { x: 'Category 1', y: 428 },
            { x: 'Category 2', y: 749 },
            { x: 'Category 3', y: 559 },
          ],
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'line',
        },
        plotOptions: {
          line: {
            isSlopeChart: true,
          },
        },
        tooltip: {
          followCursor: true,
          intersect: false,
          shared: true,
        },
        colors: [],
        dataSet: [
          'bg-primary-500',
          'bg-purple-500',
          'bg-red-500',
          'bg-green-500',
        ],
        dataLabels: {
          background: {
            enabled: true,
          },
          formatter(val, opts) {
            const seriesName = opts.w.config.series[opts.seriesIndex].name;
            return val !== null ? seriesName : '';
          },
        },
        yaxis: {
          show: true,
          labels: {
            show: true,
          },
        },
        xaxis: {
          position: 'bottom',
        },
        legend: {
          show: true,
          position: 'top',
          horizontalAlign: 'left',
        },
        stroke: {
          width: [2, 3, 4, 2],
          dashArray: [0, 0, 5, 2],
          curve: 'smooth',
        },
        grid: {
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
          },
        },
      },
    };
  }
}
