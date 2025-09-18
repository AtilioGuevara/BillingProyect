import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';

@Component({
    selector: 'app-apexchart-heatmap',
    imports: [PageTitleComponent, DomixChartsComponent],
    templateUrl: './apexchart-heatmap.component.html',
    styleUrl: './apexchart-heatmap.component.scss'
})
export class ApexchartHeatmapComponent {
  heatmapChart!: ChartInfo
  basicHatmapChart!: ChartInfo
  multiColorFlippedHatmapChart!: ChartInfo
  roundedHatmapChart!: ChartInfo

  constructor(private settingService: LayoutSettingService) {
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }

  renderChart(): void {
    this.heatmapChart = {
      series: [
        { name: 'Metric1', data: this.generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric2', data: this.generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric3', data: this.generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric4', data: this.generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric5', data: this.generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric6', data: this.generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric7', data: this.generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric8', data: this.generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric9', data: this.generateData(18, { min: 0, max: 90 }) },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'heatmap',
        },
        dataLabels: {
          enabled: false,
        },
        colors: ['#00E396', '#008FFB', '#FEB019'],
        dataSet: ['bg-primary-500'],
        title: {
          text: 'HeatMap Chart (Single color)',
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
    this.basicHatmapChart = {
      series: [
        { name: 'Metric1', data: this.generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric2', data: this.generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric3', data: this.generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric4', data: this.generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric5', data: this.generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric6', data: this.generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric7', data: this.generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric8', data: this.generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric9', data: this.generateData(18, { min: 0, max: 90 }) },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'heatmap',
        },
        dataLabels: {
          enabled: false,
        },
        colors: [],
        dataSet: [
          'bg-primary-500',
          'bg-green-500',
          'bg-pink-500',
          'bg-sky-500',
          'bg-indigo-500',
          'bg-purple-500',
          'bg-orange-500',
          'bg-yellow-500',
        ],
        title: {
          text: 'HeatMap Chart (Single color)',
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
    this.multiColorFlippedHatmapChart = {
      series: [
        {
          name: 'Jan',
          data: this.generateData(20, { min: -30, max: 55 }),
        },
        {
          name: 'Feb',
          data: this.generateData(20, { min: -30, max: 55 }),
        },
        {
          name: 'Mar',
          data: this.generateData(20, { min: -30, max: 55 }),
        },
        {
          name: 'Apr',
          data: this.generateData(20, { min: -30, max: 55 }),
        },
        {
          name: 'May',
          data: this.generateData(20, { min: -30, max: 55 }),
        },
        {
          name: 'Jun',
          data: this.generateData(20, { min: -30, max: 55 }),
        },
        {
          name: 'Jul',
          data: this.generateData(20, { min: -30, max: 55 }),
        },
        {
          name: 'Aug',
          data: this.generateData(20, { min: -30, max: 55 }),
        },
        {
          name: 'Sep',
          data: this.generateData(20, { min: -30, max: 55 }),
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'heatmap',
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          heatmap: {
            colorScale: {
              inverse: true,
            },
          },
        },
        colors: ['#00E396', '#008FFB', '#FEB019'],
        dataSet: [
          'bg-primary-500',
          'bg-green-500',
          'bg-pink-500',
          'bg-sky-500',
          'bg-indigo-500',
          'bg-purple-500',
          'bg-orange-500',
          'bg-yellow-500',
        ],
        xaxis: {
          type: 'category',
          categories: [
            'P1',
            'P2',
            'P3',
            'P4',
            'P5',
            'P6',
            'P7',
            'P8',
            'P9',
            'P10',
            'P11',
            'P12',
            'P13',
            'P14',
            'P15',
            'P16',
            'P17',
            'P18',
            'P19',
            'P20',
          ],
        },
        title: {
          text: 'Color Scales flipped Vertically',
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
    this.roundedHatmapChart = {
      series: [
        { name: 'Metric1', data: this.generateData(20, { min: 0, max: 90 }) },
        { name: 'Metric2', data: this.generateData(20, { min: 0, max: 90 }) },
        { name: 'Metric3', data: this.generateData(20, { min: 0, max: 90 }) },
        { name: 'Metric4', data: this.generateData(20, { min: 0, max: 90 }) },
        { name: 'Metric5', data: this.generateData(20, { min: 0, max: 90 }) },
        { name: 'Metric6', data: this.generateData(20, { min: 0, max: 90 }) },
        { name: 'Metric7', data: this.generateData(20, { min: 0, max: 90 }) },
        { name: 'Metric8', data: this.generateData(20, { min: 0, max: 90 }) },
        { name: 'Metric9', data: this.generateData(20, { min: 0, max: 90 }) },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'heatmap',
        },
        stroke: {
          width: 0,
        },
        plotOptions: {
          heatmap: {
            radius: 30,
            enableShades: false,
            colorScale: {
              ranges: [
                { from: 0, to: 50, color: '#008FFB' },
                { from: 51, to: 100, color: '#00E396' },
              ],
            },
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#fff'],
          },
        },
        colors: [],
        dataSet: ['bg-primary-500', 'bg-green-500'],
        xaxis: {
          type: 'category',
        },
        title: {
          text: 'Rounded (Range without Shades)',
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

  generateData(
    count: number,
    yrange: { min: number; max: number }
  ): { x: string; y: number }[] {
    const series = [];
    for (let i = 0; i < count; i++) {
      const x = (i + 1).toString();
      const y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      series.push({ x, y });
    }
    return series;
  }
}
