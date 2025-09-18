import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';

@Component({
    selector: 'app-apexchart-polar-area',
    imports: [PageTitleComponent, DomixChartsComponent],
    templateUrl: './apexchart-polar-area.component.html',
    styleUrl: './apexchart-polar-area.component.scss'
})
export class ApexchartPolarAreaComponent {
  polarChart!: ChartInfo
  monochromePolarChart!: ChartInfo

  constructor(private settingService: LayoutSettingService) {
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }

  renderChart(): void {
    this.polarChart = {
      series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
      chartOptions: {
        chart: {
          height: 300,
          type: 'polarArea',
        },
        stroke: {
          colors: ['#fff'],
        },
        fill: {
          opacity: 0.8,
        },
        colors: [],
        dataSet: [
          'bg-primary-500',
          'bg-green-500',
          'bg-yellow-500',
          'bg-purple-500',
          'bg-red-500',
          'bg-red-500',
        ],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    };
    this.monochromePolarChart = {
      series: [42, 47, 52, 58, 65],
      chartOptions: {
        chart: {
          height: 300,
          type: 'polarArea',
        },
        labels: ['Rose A', 'Rose B', 'Rose C', 'Rose D', 'Rose E'],
        fill: {
          opacity: 1,
        },
        stroke: {
          width: 1,
          colors: undefined,
        },
        yaxis: {
          show: false,
        },
        legend: {
          position: 'bottom',
        },
        plotOptions: {
          polarArea: {
            rings: {
              strokeWidth: 0,
            },
            spokes: {
              strokeWidth: 0,
            },
          },
        },
        theme: {
          monochrome: {
            enabled: true,
            shadeTo: 'light',
            shadeIntensity: 0.6,
          },
        },
        dataSet: [],
      },
    };
  }
}
