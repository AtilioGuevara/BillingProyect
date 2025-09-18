import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CountUpModule } from 'ngx-countup';
import { LucideAngularModule } from 'lucide-angular';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomixDropdownModule } from '../../../module/domix dropdown/domix-dropdown.module';
import { ColDefs, DomixGridTestComponent } from '../../../componate/domix-grid-test/domix-grid-test.component';
import { RestApiService } from '../../../Core/service/rest-api.service';
import { DomixTableService } from '../../../componate/domix-grid-test/service/domix-table.service';
import { DomixPaginationComponent } from '../../../componate/domix-pagination/domix-pagination.component';
import { RouterLink } from '@angular/router';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';
interface EmailReport {
  emailName: string;
  publishDate: string;
  sent: string;
  clickRate: string;
  deliveredRate: string;
  spamReport: string;
}


@Component({
  selector: 'app-dashboard-email',
  imports: [
    PageTitleComponent,
    DomixPaginationComponent,
    CommonModule, RouterLink,
    FormsModule,
    DomixDropdownModule,
    LucideAngularModule,
    DomixChartsComponent,
    CountUpModule
  ],
  templateUrl: './dashboard-email.component.html',
  styleUrl: './dashboard-email.component.scss'
})
export class DashboardEmailComponent extends DomixGridTestComponent {
  emails: EmailReport[] = [];
  hasHeaderCheckbox = false;
  isDark!: boolean;

  areaChart!: ChartInfo;
  donutChart!: ChartInfo;
  labelChart!: ChartInfo;
  timeSpendingChart!: ChartInfo;
  mailStatisticChart!: ChartInfo;

  constructor(
    public restApiService: RestApiService,
    public domiex: DomixTableService,
    private settingService: LayoutSettingService,
  ) {
    super(domiex);
    this.hasHeaderCheckbox = this.columnDefs.some((col) => col.headerCheckbox);

    this.settingService.settings$.subscribe((settings) => {
      this.isDark = settings.mode === 'dark' ? true : false;

      this.renderChart()
    });
  }

  renderChart() {
    this.areaChart = {
      series: [
        {
          name: 'Sent',
          data: [28, 29, 33, 36, 32, 32, 33],
        },
        {
          name: 'Opened',
          data: [12, 11, 14, 18, 17, 13, 13],
        },
      ],
      chartOptions: {
        chart: {
          defaultLocale: 'en',
          height: 280,
          type: 'area',
          toolbar: {
            show: false,
          },
        },
        stroke: {
          curve: 'smooth',
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            right: 0,
            top: -20,
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.4,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        },
        colors: [],
        dataSet: !this.isDark ? ['bg-primary-500', 'bg-gray-300'] : ['bg-primary-500', 'bg-dark-600'],
      },
    };
    this.donutChart = {
      series: [33, 57],
      chartOptions: {
        chart: {
          height: 170,
          type: 'donut',
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270,
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: [],
        dataSet: ['bg-primary-500', 'bg-red-500'],
        labels: ['Open Rate', 'Click Rate'],
        fill: {
          type: 'gradient',
        },
        legend: {
          formatter: function (val: string, opts: any) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
          },
          position: 'bottom',
        },
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
    this.labelChart = {
      series: [
        {
          name: 'Inflation',
          data: [5, 4, 7, 9, 2, 6, 10, 6, 3, 7, 9, 5],
        },
      ],
      chartOptions: {
        chart: {
          height: 100,
          type: 'bar',
          toolbar: {
            show: false,
          },
          sparkline: { enabled: true },
        },
        colors: [],
        dataSet: ['bg-primary-200'],
      },
    };
    this.mailStatisticChart = {
      series: [
        {
          name: 'Sent',
          data: [
            { x: 'Jan', y: 43 },
            { x: 'Feb', y: 58 },
          ],
        },
        {
          name: 'Pending',
          data: [
            { x: 'Jan', y: 33 },
            { x: 'Feb', y: 38 },
          ],
        },
        {
          name: 'Cancel',
          data: [
            { x: 'Jan', y: 55 },
            { x: 'Feb', y: 21 },
          ],
        },
      ],
      chartOptions: {
        chart: {
          height: 335,
          type: 'line',
        },
        stroke: {
          curve: 'smooth',
        },
        plotOptions: {
          line: {
            isSlopeChart: true,
          },
        },
        legend: {
          show: true,
          position: 'bottom',
          horizontalAlign: 'center',
        },
        xaxis: {
          axisBorder: {
            show: false,
          },
        },
        colors: [],
        dataSet: ['bg-primary-500', 'bg-green-500', 'bg-red-500'],
      },
    };
    this.timeSpendingChart = {
      series: [
        {
          name: 'Total Spend',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
        {
          name: 'Sales',
          data: [62, 69, 91, 54, 10, 41, 35, 51, 49],
        },
      ],
      chartOptions: {
        chart: {
          defaultLocale: 'en',
          height: 120,
          type: 'line',
          zoom: {
            enabled: true,
          },
          sparkline: {
            enabled: true,
          },
        },
        stroke: {
          curve: 'smooth', // Adjusted to 'smooth' for a better line chart effect
          width: 2, // Adjust stroke width for better visibility
        },
        xaxis: {
          title: {
            text: 'X-axis',
          },
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
        },
        tooltip: {
          x: {
            show: true,
          },
          y: {
            formatter: (val: number) =>
              `$${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}k`,
          },
        },
        legend: {
          show: true,
          position: 'bottom',
          horizontalAlign: 'center',
          offsetY: 8,
        },
        colors: [],
        dataSet: ['bg-primary-500', 'bg-green-500'],
        grid: {
          padding: {
            top: 0,
            right: 5,
            bottom: 20,
          },
        },
      },
    };
  }



  ngOnInit(): void {
    this.pageSize = 8;
    this.projectData();
    this.renderChart()
  }

  projectData() {
    this.restApiService.getDashboardEmailData().subscribe((data: any) => {
      this.emails = data;
      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }
  columnDefs: ColDefs[] = [
    {
      field: 'emailName',
      headerName: 'Title',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'publishDate',
      headerName: 'Publish Date',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'sent',
      headerName: 'Sent',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'clickRate',
      headerName: 'Click Rate (%)',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'deliveredRate',
      headerName: 'Delivered Rate',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'spamReport',
      headerName: 'Span Report Rate',
      sortable: true,
      sortDiraction: 'asc',
    },
  ];
}
