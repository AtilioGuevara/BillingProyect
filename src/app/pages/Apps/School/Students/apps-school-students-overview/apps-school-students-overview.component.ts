import { Component, ElementRef, ViewChild } from '@angular/core';
import { PageTitleComponent } from '../../../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';

import { CommonModule } from '@angular/common';
import { fadeInOutAnimation } from '../../../../../Core/animation/animations';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { DomixChartsComponent } from '../../../../../componate/domix-charts/domix-charts.component';
import { ChartInfo } from '../../../../../componate/domix-charts/Model/Display-Chart.model';
import { RouterLink } from '@angular/router';
import { LayoutSettingService } from '../../../../../layouts/layout-setting.service';

@Component({
    selector: 'app-apps-school-students-overview',
    imports: [
        PageTitleComponent,
        LucideAngularModule,
        CommonModule,
        RouterLink,
    ],
    templateUrl: './apps-school-students-overview.component.html',
    styleUrl: './apps-school-students-overview.component.scss',
    animations: [fadeInOutAnimation]
})
export class AppsSchoolStudentsOverviewComponent {
  @ViewChild('paginationDynamicSlider')
  paginationDynamicSliderContainer!: ElementRef;
  @ViewChild('chart', { static: true }) chartRef: ElementRef | undefined;

  // Data for the chart
  series = [
    {
      name: 'Performance',
      data: [69, 78, 49, 63, 54, 87]
    }
  ];

  // Labels for the chart
  labels = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'CS',
    'English'
  ];

  chart: ApexCharts | undefined;

  private initializeChart(): void {
    const options = {
      series: this.series,
      chart: {
        height: 260,
        type: 'bar',
        toolbar: {
          show: false,
        },
        parentHeightOffset: 0
      },
      plotOptions: {
        bar: {
          columnWidth: '20%',
          distributed: true
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.2,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 30],
        }
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
        hover: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
        active: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
      },
      dataLabels: {
        enabled: false,
        formatter: (val: number) => val + '%',
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: this.labels,
      },
      grid: {
        padding: {
          top: -20,
          right: 0,
          bottom: 0
        },
      },
      yaxis: {
        labels: {
          formatter: (val: number) => val + '%'
        }
      },
      colors: ['#4B7BEC', '#6C5B7B', '#F0A202', '#E8E4E1', '#8E7CC3', '#CE93D8']
    };

    if (this.chartRef?.nativeElement) {
      this.chart = new ApexCharts(this.chartRef.nativeElement, options);
      this.chart.render(); // Render the chart
    }
  }
  quizzes = [
    {
      progress: 32,
      percent: 32,
      title: 'Trivia Time: Fun Facts and Figures',
      stars: [true, true, true],
    },
    {
      progress: 52,
      percent: 52,
      title: 'Chemistry Conundrums: Elemental Quiz',
      stars: [true, false, false],
    },
    {
      progress: 10,
      percent: 10,
      title: 'A Mathematics Challenge',
      stars: [true, true, false],
    },
    {
      progress: 95,
      percent: 95,
      title: 'The Digital World Quiz',
      stars: [true, true, true],
    },
  ];

  exams = [
    { subject: 'Vector Algebra (Mathematics)', date: '15 July, 2024' },
    { subject: 'Biomolecules (Chemistry)', date: '20 August, 2024' },
    { subject: 'Human Reproduction (Biology)', date: '10 September, 2024' },
  ];
  currentExamIndex = 0;
  show = true;
  intervalId: any;

  get currentExam() {
    return this.exams[this.currentExamIndex];
  }

  constructor(private settingService: LayoutSettingService) {
    this.settingService.settings$.subscribe((settings) => {
      this.initializeChart();
    });
  }

  ngOnInit(): void {
    this.startExamCycle();
    register();
    if (this.chart) {
      this.chart.destroy(); // Destroy the chart to clean up
    }

  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startQuiz(quiz: any): void {
    // console.log(`Starting quiz: ${quiz.title}`);
    // Add logic to start the quiz
  }

  ngAfterViewInit() {
    new Swiper(this.paginationDynamicSliderContainer.nativeElement, {
      loop: true,
      autoplay: {
        delay: 2000, // Changed to 2000ms for a more practical delay
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  nextExam(): void {
    this.show = false; // Hide content
    setTimeout(() => {
      this.currentExamIndex = (this.currentExamIndex + 1) % this.exams.length;
      this.show = true; // Show content
    }, 500); // Match the timeout with transition duration
  }

  startExamCycle(): void {
    this.intervalId = setInterval(() => {
      this.nextExam();
    }, 5000); // Change exam every 5 seconds
  }
}
