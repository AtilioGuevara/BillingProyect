import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';

import { DomixDropdownModule } from '../../../../../module/domix dropdown/domix-dropdown.module';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { fadeInOutAnimation } from '../../../../../Core/animation/animations';
import { DomixChartsComponent } from '../../../../../componate/domix-charts/domix-charts.component';
import { ChartInfo } from '../../../../../componate/domix-charts/Model/Display-Chart.model';
import { LayoutSettingService } from '../../../../../layouts/layout-setting.service';
import Swiper from 'swiper';

@Component({
    selector: 'app-apps-school-teachers-overview',
    imports: [
        PageTitleComponent,
        LucideAngularModule,
        DomixDropdownModule,
        RouterLink,
        CommonModule,
        DomixChartsComponent,
    ],
    templateUrl: './apps-school-teachers-overview.component.html',
    styleUrl: './apps-school-teachers-overview.component.scss',
    animations: [fadeInOutAnimation]
})
export class AppsSchoolTeachersOverviewComponent {
  currentExamIndex = 0;
  show = true;
  performanceChart!: ChartInfo

  exams = [
    { subject: 'Vector Algebra (Mathematics)', date: '15 July, 2024' },
    { subject: 'Biomolecules (Chemistry)', date: '20 August, 2024' },
    { subject: 'Human Reproduction (Biology)', date: '10 September, 2024' },
  ];

  constructor(private settingService: LayoutSettingService) {
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }

  get currentExam() {
    return this.exams[this.currentExamIndex];
  }

  nextExam(): void {
    this.show = false;
    setTimeout(() => {
      this.currentExamIndex = (this.currentExamIndex + 1) % this.exams.length;
      this.show = true;
    }, 500);
  }
  renderChart(): void {
    this.performanceChart = {
      series: [
        {
          name: 'Total Hours',
          data: [142, 139, 159, 149, 162, 187, 160, 154, 122],
        },
      ],
      chartOptions: {
        chart: {
          height: 260,
          type: 'bar',
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: '40%',
            distributed: true,
          },
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
            colorStops: [],
          },
        },
        states: {
          normal: {
            filter: {
              type: 'none',
              value: 0,
            },
          },
          hover: {
            filter: {
              type: 'none',
              value: 0,
            },
          },
          active: {
            filter: {
              type: 'none',
              value: 0,
            },
          },
        },
        dataLabels: {
          enabled: false,
          formatter: (val: number) => `${val}%`,
        },
        legend: {
          show: false,
        },
        xaxis: {
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
          ],
        },
        grid: {
          padding: {
            top: -20,
            right: 0,
            bottom: 0,
          },
        },
        yaxis: {
          labels: {
            formatter: (val: number) => `${val}%`,
          },
        },
        colors: [],
        dataSet: ['bg-primary-400'],
      },
    };
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

  startQuiz(quiz: any): void {
    // console.log(`Starting quiz: ${quiz.title}`);
  }

  achievements = [
    {
      title: 'Academic Excellence Awards',
      image: 'assets/images/school/trophy.png',
      color: 'yellow'
    },
    {
      title: 'Special Recognition Awards',
      image: 'assets/images/school/medal.png',
      color: 'green'
    },
    {
      title: 'Arts and Sports Awards',
      image: 'assets/images/school/winner.png',
      color: 'yellow'
    }
  ];
  getIconClass(color: string): string {
    return `bg-gradient-to-t from-${color}-500/10 ring-${color}-500/10`;
  }
  ngOnInit(): void {
    // Initialize Swiper after the component has been initialized
    new Swiper('.mySwiper', {
      // Optional Swiper parameters
      loop: true, // Enable infinite loop
      slidesPerView: 1, // Set the number of slides to show at once
      spaceBetween: 10, // Set spacing between slides
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      // You can also add other options here
    });
  }

}
