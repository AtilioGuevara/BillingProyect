import { Component, ElementRef, ViewChild } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CountUpModule } from 'ngx-countup';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { CommonModule } from '@angular/common';
import { SimplebarAngularModule } from 'simplebar-angular';
import Swiper from 'swiper';
import { LucideAngularModule } from 'lucide-angular';

import { DomixDropdownModule } from '../../../module/domix dropdown/domix-dropdown.module';
import { EMAILS_DATA } from '../../../Data/result-list';
import { RouterLink } from '@angular/router';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';
interface Email {
  studentsName: string;
  image: string;
  marks: string;
  grade: string;
  resultDate: string;
  passFail: string;
}
@Component({
    selector: 'app-dashboards-school',
    imports: [
        PageTitleComponent,
        CountUpModule,
        DomixChartsComponent,
        CommonModule,
        SimplebarAngularModule,
        LucideAngularModule,
        DomixDropdownModule,
    ],
    templateUrl: './dashboards-school.component.html',
    styleUrl: './dashboards-school.component.scss'
})
export class DashboardsSchoolComponent {
  isDark!: boolean;
  donutChartConfig!: ChartInfo;
  dumbbellChart!: ChartInfo;

  constructor(
    private settingService: LayoutSettingService,
  ) {
    this.settingService.settings$.subscribe((settings) => {
      this.isDark = settings.mode === 'dark' ? true : false;
      this.renderChart()
    });
  }
  options = { autoHide: true };
  emails: Email[] = [];
  displayedEmails: Email[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  showingStart: number = 0;
  showingEnd: number = 0;
  monthName: string = '';
  year: number = new Date().getFullYear();
  daysInMonth: number[] = [];
  today: number = new Date().getDate();

  updateCalendar(): void {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    this.monthName = format(now, 'MMMM');
    this.year = now.getFullYear();
    this.daysInMonth = eachDayOfInterval({ start, end }).map((date) =>
      date.getDate()
    );
  }

  renderChart() {
    this.donutChartConfig = {
      series: [44, 55],
      chartOptions: {
        chart: {
          height: 180,
          type: 'donut',
        },
        legend: {
          show: true,
          position: 'bottom',
        },
        labels: ['Process', 'In Process'],
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270,
          },
        },
        dataLabels: {
          enabled: false,
        },
        dataSet: !this.isDark ? ['bg-gray-200', 'bg-primary-500'] : ['bg-dark-850', 'bg-primary-500'],
        colors: [],
        fill: {
          type: 'gradient',
        },
      },
    };
    this.dumbbellChart = {
      series: [
        {
          data: [
            { x: '2018', y: [241, 100] },
            { x: '2019', y: [150, 41] },
            { x: '2020', y: [210, 100] },
            { x: '2021', y: [200, 10] },
            { x: '2022', y: [100, 10] },
            { x: '2023', y: [190, 120] },
            { x: '2024', y: [154, 241] },
          ],
        },
      ],
      chartOptions: {
        chart: {
          height: 290,
          type: 'rangeBar',
          zoom: {
            enabled: false,
          },
        },
        plotOptions: {
          bar: {
            isDumbbell: true,
            columnWidth: 3,
            dumbbellColors: [['#ef4444', '#358ffc']],
          },
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          position: 'top',
          horizontalAlign: 'center',
          customLegendItems: ['New Students', 'Leave Students'],
        },
        fill: {
          type: 'gradient',
          gradient: {
            type: 'vertical',
            gradientToColors: ['#ef4444'],
            inverseColors: true,
            stops: [0, 100],
          },
        },
        colors: [],
        dataSet: ['bg-primary-500', 'bg-red-500'],
        grid: {
          padding: {
            bottom: -10,
            right: 0,
          },
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        xaxis: {
          tickPlacement: 'on',
        },
      },
    };
  }

  isToday(day: number): boolean {
    return day === this.today;
  }
  @ViewChild('swiperRef') swiperContainer!: ElementRef;

  ngAfterViewInit() {
    new Swiper(this.swiperContainer.nativeElement, {
      direction: 'horizontal',
      loop: true,
      slidesPerView: 1,
    });
  }

  ngOnInit(): void {
    this.renderChart();
    this.loadEmails();
    this.updatePagination();
    this.updateCalendar();
  }

  loadEmails(): void {
    this.emails = EMAILS_DATA;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.emails.length / this.itemsPerPage);
    this.showingStart = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.showingEnd = Math.min(
      this.currentPage * this.itemsPerPage,
      this.emails.length
    );
    this.displayedEmails = this.emails.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  gotoPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }
}
