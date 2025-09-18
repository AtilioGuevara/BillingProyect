import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';

import { ChartInfo } from '../../../../componate/domix-charts/Model/Display-Chart.model';
import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomixChartsComponent } from '../../../../componate/domix-charts/domix-charts.component';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { BookEventModalComponent } from './model/book-event-modal/book-event-modal.component';
import { LayoutSettingService } from '../../../../layouts/layout-setting.service';

@Component({
    selector: 'app-apps-event-overview',
    imports: [
        PageTitleComponent,
        LucideAngularModule,
        DomixDropdownModule,
        CommonModule,
        DomixChartsComponent,
    ],
    templateUrl: './apps-event-overview.component.html',
    styleUrl: './apps-event-overview.component.scss'
})
export class AppsEventOverviewComponent {
  ticketSaleChart!: ChartInfo
  invitationChart!: ChartInfo

  constructor(private settingService: LayoutSettingService, private modalService: ModalService) {
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }
  renderChart(): void {
    this.invitationChart = {
      series: [87],
      chartOptions: {
        chart: {
          height: 300,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '60%',
            },
            dataLabels: {
              show: true,
              name: {
                fontWeight: '600',
              },
            },
          },
        },
        colors: ['#ec4899'],
        dataSet: ['bg-pink-500', 'bg-primary-500'],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#358ffc'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        stroke: {
          lineCap: 'round',
        },
        labels: ['Accept Invitation'],
      },
    };
    this.ticketSaleChart = {
      series: [
        {
          name: 'Ticket Sale',
          data: [10, 41, 35, 51, 49, 62, 69],
        },
      ],
      chartOptions: {
        chart: {
          defaultLocale: 'en',
          height: 180,
          type: 'line',
          zoom: {
            enabled: true,
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          curve: 'monotoneCubic',
          lineCap: 'butt',
          width: 3,
          dashArray: 0,
        },
        xaxis: {
          categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        },
        yaxis: {
          show: false,
        },
        tooltip: {
          x: {
            show: true,
          },
        },
        grid: {
          padding: {
            top: -10,
            right: 0,
            bottom: 0,
          },
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        colors: [],
        dataSet: ['bg-primary-500'],
      },
    };
  }

  bookEventModal() {
    this.modalService.open(BookEventModalComponent);
  }
}
