import { Component, OnInit } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';

@Component({
    selector: 'app-apexchart-bubble',
    imports: [PageTitleComponent, DomixChartsComponent],
    templateUrl: './apexchart-bubble.component.html',
    styleUrls: ['./apexchart-bubble.component.scss']
})
export class ApexchartBubbleComponent {
  generateData(
    baseval: number,
    count: number,
    yrange: { min: number; max: number }
  ) {
    let i = 0;
    const series = [];
    while (i < count) {
      const x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      const y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000; // Increment by one day (in milliseconds)
      i++;
    }
    return series;
  }
  simpleBubbleChart!: ChartInfo
  bubbleChart!: ChartInfo

  constructor(private settingService: LayoutSettingService,) {
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }

  renderChart(): void {
    this.simpleBubbleChart = {
      series: [
        {
          name: 'Bubble1',
          data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: 'Bubble2',
          data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: 'Bubble3',
          data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: 'Bubble4',
          data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'bubble',
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: 0.8,
        },
        dataSet: [
          'bg-primary-500',
          'bg-green-500',
          'bg-red-500',
          'bg-yellow-500',
        ],
        colors: [],
        title: {
          text: 'Simple Bubble Chart',
        },
        xaxis: {
          tickAmount: 12,
          type: 'category',
        },
        yaxis: {
          max: 70,
        },
      },
    };

    this.bubbleChart = {
      series: [
        {
          name: 'Product1',
          data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: 'Product2',
          data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: 'Product3',
          data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: 'Product4',
          data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'bubble',
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          type: 'gradient',
        },
        title: {
          text: '3D Bubble Chart',
        },
        colors: [],
        dataSet: ['bg-primary-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500'],
        xaxis: {
          tickAmount: 12,
          type: 'datetime',
          labels: {
            rotate: 0,
          },
        },
        yaxis: {
          max: 70,
        },
        theme: {
          palette: 'palette2',
        },
      },
    };
  }
}
