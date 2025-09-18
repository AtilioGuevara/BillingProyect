import { Component, ElementRef, ViewChild } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swiper from 'swiper';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { DomixDropdownModule } from '../../../module/domix dropdown/domix-dropdown.module';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';

interface FileItem {
  name: string;
  size: string;
  date: string;
  type: string;
  image: string;
}

@Component({
    selector: 'app-dashboards-file-manager',
    imports: [
        PageTitleComponent,
        DomixChartsComponent,
        CommonModule,
        FormsModule,
        RouterLink,
        DomixDropdownModule,
        LucideAngularModule,
    ],
    templateUrl: './dashboards-file-manager.component.html',
    styleUrl: './dashboards-file-manager.component.scss'
})
export class DashboardsFileManagerComponent {
  newChart!: ChartInfo
  donutChart!: ChartInfo
  constructor(private settingService: LayoutSettingService) {
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }

  renderChart(): void {
    this.newChart = {
      series: [
        {
          name: 'Total GB',
          data: [44, 55, 41, 67, 22],
        },
      ],
      chartOptions: {
        chart: {
          height: 315,
          type: 'bar',
          toolbar: {
            show: false,
          },
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
        dataSet: ['bg-primary-500', 'bg-gray-100'],
        grid: {
          padding: {
            right: -12,
            top: -18,
            bottom: -8,
          },
        },
        xaxis: {
          labels: {
            rotate: -45,
          },
          categories: ['Dropbox', 'Cloud', 'Mega', 'Google', 'Drive'],
          tickPlacement: 'on',
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [50, 0, 100],
          },
        },
      },
    };
    this.donutChart = {
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        chart: {
          height: 300,
          type: 'donut',
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 90,
            offsetY: 5,
          },
        },
        colors: [],
        dataSet: [
          'bg-primary-400',
          'bg-green-400',
          'bg-yellow-400',
          'bg-purple-400',
          'bg-red-400',
        ],
        grid: {
          padding: {
            bottom: -80,
          },
        },
        stroke: {
          width: 0,
        },
        fill: {
          type: 'gradient',
        },
        labels: ['Docs', 'Images', 'Video', 'Audio', 'Others'],
        legend: {
          position: 'bottom',
        },
      },
    };

  }
  originalData: FileItem[] = [
    {
      name: 'Animation Project',
      size: '24 MB',
      date: '21 July, 2024',
      type: 'Document',
      image: 'assets/images/file-manager/icons/document.png',
    },
    {
      name: 'UI Design',
      size: '154 MB',
      date: '28 May, 2024',
      type: 'Images',
      image: 'assets/images/file-manager/icons/picture.png',
    },
    {
      name: 'Admin Tutorial',
      size: '149 MB',
      date: '02 Feb, 2024',
      type: 'Video',
      image: 'assets/images/file-manager/icons/video.png',
    },
    {
      name: 'Brand Identity',
      size: '17 MB',
      date: '11 Feb, 2024',
      type: 'AI',
      image: 'assets/images/file-manager/icons/ai-file-format.png',
    },
    {
      name: 'Resume',
      size: '11 MB',
      date: '20 May, 2024',
      type: 'PDF',
      image: 'assets/images/file-manager/icons/pdf.png',
    },
  ];
  data: FileItem[] = [];
  searchTerm: string = '';

  @ViewChild('swiperRef') swiperContainer!: ElementRef;

  ngAfterViewInit() {
    new Swiper(this.swiperContainer.nativeElement, {
      direction: 'horizontal',
      loop: true,
      slidesPerView: 1,
    });
  }

  ngOnInit(): void {
    this.data = [...this.originalData];
  }

  filterData(): void {
    const searchTerm = this.searchTerm.toLowerCase();
    if (searchTerm) {
      this.data = this.originalData.filter((item) => {
        return Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchTerm)
        );
      });
    } else {
      this.data = [...this.originalData];
    }
  }

  deletePatient(item: FileItem): void {
    this.data = this.data.filter((i) => i !== item); // Remove item from data
  }
}
