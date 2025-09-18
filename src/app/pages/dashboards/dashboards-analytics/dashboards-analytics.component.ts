import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';

import { LucideAngularModule } from 'lucide-angular';
import { CountUpModule } from 'ngx-countup';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { CommonModule } from '@angular/common';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CAMPAIGN_DATA } from '../../../Data/campaign-data';
import { Campaign } from '../../../Data/models';
import { FormsModule } from '@angular/forms';
import { DomixDropdownModule } from '../../../module/domix dropdown/domix-dropdown.module';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';

@Component({
    selector: 'app-dashboards-analytics',
    imports: [
        PageTitleComponent,
        LucideAngularModule,
        CountUpModule,
        DomixChartsComponent,
        CommonModule,
        FormsModule,
        SimplebarAngularModule,
        DomixDropdownModule,
    ],
    templateUrl: './dashboards-analytics.component.html',
    styleUrl: './dashboards-analytics.component.scss'
})
export class DashboardsAnalyticsComponent {
  options = { autoHide: true };
  lineChart!: ChartInfo;
  lineChart2!: ChartInfo;
  totalSalesChart!: ChartInfo;
  totalSalesChart2!: ChartInfo;
  webAnalyticsChart!: ChartInfo;
  followersChart!: ChartInfo;
  donutChart!: ChartInfo;
  trafficSourceChart!: ChartInfo;

  constructor(private settingService: LayoutSettingService) {
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }

  renderChart(): void {
    this.lineChart = {
      series: [
        {
          name: 'Total Revenue',
          data: [31, 40, 28, 51, 42, 119, 100],
        },
      ],
      chartOptions: {
        chart: {
          defaultLocale: 'en',
          height: 140,
          type: 'line',
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 3,
          curve: 'smooth',
          dashArray: [10],
        },
        legend: {
          tooltipHoverFormatter: function (val, opts) {
            return (
              val +
              ' - <strong>' +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              '</strong>'
            );
          },
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 5,
          },
        },
        grid: {
          borderColor: '#e0e0e0', // Example color, replace with dynamic color if needed
          padding: {
            top: -20,
            right: 0,
            bottom: 0,
            left: 7,
          },
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        yaxis: {
          show: false,
        },
        colors: [],
        dataSet: [
          'bg-primary-500',
          'bg-primary-100',
          'bg-primary-50',
          'bg-primary-300',
        ],
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July'],
      },
    };
    this.lineChart2 = {
      series: [
        {
          name: 'Total Revenue',
          data: [31, 77, 44, 31, 63, 94, 109]
        },
      ],
      chartOptions: {
        chart: {
          defaultLocale: 'en',
          height: 140,
          type: 'line',
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 3,
          curve: 'smooth',
          dashArray: [10],
        },
        legend: {
          tooltipHoverFormatter: function (val, opts) {
            return (
              val +
              ' - <strong>' +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              '</strong>'
            );
          },
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 5,
          },
        },
        grid: {
          borderColor: '#e0e0e0', // Example color, replace with dynamic color if needed
          padding: {
            top: -20,
            right: 0,
            bottom: 0,
            left: 7,
          },
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        yaxis: {
          show: false,
        },
        colors: [],
        dataSet: ['bg-red-500'],
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July'],
      },
    };
    this.totalSalesChart = {
      series: [
        {
          name: 'Total Sales',
          data: [44, 55, 41, 67, 22, 43, 21, 33],
        },
      ],
      chartOptions: {
        chart: {
          height: 180,
          type: 'bar',
          sparkline: { enabled: true },
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: '50%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 1,
        },
        colors: [],
        dataSet: ['bg-sky-500'],
        xaxis: {
          labels: {
            rotate: -45,
          },
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Pears'],
          tickPlacement: 'on',
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [50, 0, 100],
          },
        },
      },
    };
    this.totalSalesChart2 = {
      series: [
        {
          name: 'Total Sales',
          data: [22, 43, 21, 44, 55, 33, 41],
        },
      ],
      chartOptions: {
        chart: {
          height: 160,
          type: 'bar',
          sparkline: { enabled: true },
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: '50%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 1,
        },
        colors: [],
        dataSet: ['bg-sky-500'],
        xaxis: {
          labels: {
            rotate: -45,
          },
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Pears'],
          tickPlacement: 'on',
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [50, 0, 100],
          },
        },
      },
    };
    this.webAnalyticsChart = {
      series: [
        {
          name: 'Referral',
          data: [
            { x: 'Aug', y: 43 },
            { x: 'Sep', y: 58 },
            { x: 'Oct', y: 66 },
            { x: 'Nov', y: 44 },
          ],
        },
        {
          name: 'Direct',
          data: [
            { x: 'Aug', y: 33 },
            { x: 'Sep', y: 43 },
            { x: 'Oct', y: 34 },
            { x: 'Nov', y: 53 },
          ],
        },
        {
          name: 'Ads',
          data: [
            { x: 'Jan', y: 55 },
            { x: 'Feb', y: 33 },
            { x: 'Oct', y: 54 },
            { x: 'Nov', y: 65 },
          ],
        },
      ],
      chartOptions: {
        chart: {
          height: 315,
          type: 'line',
        },
        stroke: {
          curve: 'smooth',
          width: 3,
        },
        plotOptions: {
          line: {
            isSlopeChart: true,
          },
        },
        dataLabels: {
          background: {
            enabled: true,
          },
          formatter: (val: any, opts: any) => {
            const seriesName = opts.w.config.series[opts.seriesIndex].name;
            return val !== null ? seriesName : '';
          },
        },
        legend: {
          show: false,
          position: 'bottom',
          horizontalAlign: 'center',
        },
        grid: {
          padding: {
            bottom: -15,
            right: 0,
          },
        },
        xaxis: {
          axisBorder: {
            show: false,
          },
        },
        colors: [],
        dataSet: ['bg-primary-500', 'bg-green-500', 'bg-purple-500'],
      },
    };
    this.followersChart = {
      series: [
        {
          name: 'Followers',
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: 'Unfollow',
          data: [13, 23, 20, 8, 13, 27],
        },
      ],
      chartOptions: {
        chart: {
          height: 360,
          type: 'bar',
          stacked: true,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: true,
          },
        },
        colors: [],
        dataSet: ['bg-primary-500', 'bg-primary-200'],
        plotOptions: {
          bar: {
            columnWidth: '40%',
            horizontal: false,
            borderRadius: 13,
          },
        },
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        legend: {
          position: 'bottom',
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: -20,
            right: 0,
            bottom: 0,
          },
        },
      },
    };
    this.donutChart = {
      series: [44, 55, 41],
      chartOptions: {
        chart: {
          height: 150,
          type: 'donut',
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 90,
            offsetY: 10,
          },
        },
        labels: ['Chrome', 'Safari', 'Edge'],
        colors: [],
        fill: {
          type: 'gradient',
        },
        grid: {
          padding: {
            bottom: -80,
          },
        },
        legend: {
          position: 'bottom',
        },
        dataSet: ['bg-primary-500', 'bg-orange-500', 'bg-yellow-500'], // Example classes, adjust based on your needs
      },
    };
    this.trafficSourceChart = {
      series: [
        {
          name: 'Direct Traffic',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: 'Search Engine Traffic',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
      ],
      chartOptions: {
        chart: {
          height: 145,
          type: 'bar',
          sparkline: { enabled: true },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: true,
          position: 'top',
          offsetY: -3,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        dataSet: ['bg-primary-500', 'bg-gray-200'],
        colors: [],
        xaxis: {
          categories: [
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
          ],
        },
        grid: {
          padding: {
            top: 4,
            right: 0,
            left: 0,
          },
        },
        tooltip: {
          y: {
            formatter: (val: number) => `$${val}k`,
          },
        },
      },
    };
  }
  openTab = 1;

  setActiveTab(tabIndex: number) {
    this.openTab = tabIndex;
  }

  getActiveClass(tabIndex: number): string {
    return this.openTab === tabIndex
      ? 'bg-white text-gray-800 dark:bg-dark-900 dark:text-dark-50'
      : 'hover:text-gray-800 dark:hover:text-dark-50';
  }
  data = [
    {
      name: 'Jeremy McMullen',
      status: 'Success',
      date: '21 Jan, 2024',
      price: '$154',
    },
    {
      name: 'Charles Fischer',
      status: 'Cancel',
      date: '28 Jan, 2024',
      price: '$150',
    },
    {
      name: 'Louise Harms',
      status: 'Success',
      date: '02 Feb, 2024',
      price: '$255',
    },
    {
      name: 'Henry Boyle',
      status: 'Success',
      date: '11 Feb, 2024',
      price: '$347',
    },
    {
      name: 'Isabella Smith',
      status: 'Success',
      date: '15 Feb, 2024',
      price: '$398',
    },
    {
      name: 'Ethan Johnson',
      status: 'Cancel',
      date: '20 Feb, 2024',
      price: '$495',
    },
    {
      name: 'Marina Bashirian',
      status: 'Success',
      date: '18 Mar, 2025',
      price: '$174',
    },
  ];
  campaigns: Campaign[] = CAMPAIGN_DATA;
  displayedCampaigns: Campaign[] = [];
  searchTerm: string = '';
  sortBy: keyof Campaign = 'campaignTitle';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  itemsPerPage: number = 8;

  ngOnInit(): void {
    this.updateDisplayedCampaigns();
  }

  updateDisplayedCampaigns(): void {
    this.displayedCampaigns = this.campaigns
      .filter((campaign) =>
        campaign.campaignTitle
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      )
      .sort((a, b) => this.compare(a, b))
      .slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
  }

  compare(a: Campaign, b: Campaign): number {
    if (this.sortBy) {
      const valueA = a[this.sortBy];
      const valueB = b[this.sortBy];
      if (this.sortDirection === 'asc') {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    }
    return 0;
  }

  sort(column: string): void {
    if (this.isKeyOfCampaign(column)) {
      if (this.sortBy === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortBy = column as keyof Campaign;
        this.sortDirection = 'asc';
      }
      this.updateDisplayedCampaigns();
    } else {
      console.error(`Invalid column key: ${column}`);
    }
  }
  isKeyOfCampaign(key: any): key is keyof Campaign {
    return [
      'campaignTitle',
      'clickRate',
      'deliveredRate',
      'impressions',
      'cpc',
      'cr',
      'revenue',
    ].includes(key);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedCampaigns();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedCampaigns();
    }
  }

  gotoPage(page: number): void {
    this.currentPage = page;
    this.updateDisplayedCampaigns();
  }

  get totalPages(): number {
    return Math.ceil(this.campaigns.length / this.itemsPerPage);
  }

  get showingStart(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get showingEnd(): number {
    return Math.min(
      this.currentPage * this.itemsPerPage,
      this.campaigns.length
    );
  }
  exportTable(): void {
    const csvRows = [];
    const headers = Object.keys(
      this.displayedCampaigns[0]
    ) as (keyof Campaign)[];
    csvRows.push(headers.join(','));
    for (const campaign of this.displayedCampaigns) {
      const values = headers.map((header) => campaign[header]);
      csvRows.push(values.join(','));
    }
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'campaigns.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
