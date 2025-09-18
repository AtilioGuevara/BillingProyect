import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';

@Component({
    selector: 'app-apexchart-funnel',
    imports: [PageTitleComponent, DomixChartsComponent],
    templateUrl: './apexchart-funnel.component.html',
    styleUrl: './apexchart-funnel.component.scss'
})
export class ApexchartFunnelComponent {
  funnelChart!: ChartInfo
  pyramidChart!: ChartInfo

  constructor(private settingService: LayoutSettingService) {
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }

  renderChart(): void {
    this.funnelChart = {
      series: [
        {
          name: 'Funnel Series',
          data: [1380, 1100, 990, 880, 740, 548, 330, 200],
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 0,
            horizontal: true,
            barHeight: '80%',
            isFunnel: true,
          },
        },
        dataLabels: {
          enabled: true,
          formatter: (val: number, opt: any) =>
            `${opt.w.globals.labels[opt.dataPointIndex]}: ${val}`,
          dropShadow: {
            enabled: true,
          },
        },
        colors: [], // Placeholder for dynamic color codes
        dataSet: ['bg-primary-500'],
        title: {
          text: 'Recruitment Funnel',
          align: 'center', // Corrected from 'middle' to 'center'
        },
        xaxis: {
          categories: [
            'Sourced',
            'Screened',
            'Assessed',
            'HR Interview',
            'Technical',
            'Verify',
            'Offered',
            'Hired',
          ],
        },
        legend: {
          show: false,
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

    this.pyramidChart = {
      series: [
        {
          name: 'Consumption',
          data: [200, 330, 548, 740, 880, 990, 1100, 1380],
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'bar',
          animations: {
            speed: 500,
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 0,
            horizontal: true,
            distributed: true,
            barHeight: '80%',
            isFunnel: true,
          },
        },
        colors: [
          '#F44F5E',
          '#E55A89',
          '#D863B1',
          '#CA6CD8',
          '#B57BED',
          '#8D95EB',
          '#62ACEA',
          '#4BC3E6',
        ],
        dataSet: [],
        dataLabels: {
          enabled: true,
          formatter: function (val: number, opt: any) {
            return opt.w.globals.labels[opt.dataPointIndex];
          },
          dropShadow: {
            enabled: true,
          },
        },
        title: {
          text: 'Pyramid Chart',
          align: 'center', // Updated from 'middle' to 'center'
        },
        xaxis: {
          categories: [
            'Sweets',
            'Processed Foods',
            'Healthy Fats',
            'Meat',
            'Beans & Legumes',
            'Dairy',
            'Fruits & Vegetables',
            'Grains',
          ],
        },
        legend: {
          show: false,
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
