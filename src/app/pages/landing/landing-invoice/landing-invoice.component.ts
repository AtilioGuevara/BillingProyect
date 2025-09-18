import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LucideAngularModule } from 'lucide-angular';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import Aos from 'aos';
import { RouterLink } from '@angular/router';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';

@Component({
    selector: 'app-landing-invoice',
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
        LucideAngularModule,
        DomixChartsComponent,
    ],
    templateUrl: './landing-invoice.component.html',
    styleUrl: './landing-invoice.component.scss'
})
export class LandingInvoiceComponent {
  private stickyClass = 'scroll-sticky';
  currentYear: number = new Date().getFullYear();
  private threshold = 100;
  isMenuOpen = false;
  currentSection: string = 'home';
  isDark!: boolean;
  isDarkMode: boolean = false;
  lineChart!: ChartInfo

  documentElement = document.querySelector('body');

  constructor(private el: ElementRef, private renderer: Renderer2,
    private settingService: LayoutSettingService) {
    this.settingService.settings$.subscribe((settings) => {
      this.isDark = settings.mode === 'dark' ? true : false;

      this.renderChart()
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleMode() {
    const modeElement = document.querySelector('[data-mode]');
    if (modeElement) {
      const currentMode = modeElement.getAttribute('data-mode');
      const newMode = currentMode === 'light' ? 'dark' : 'light';

      // Set the new mode in the data attribute
      modeElement.setAttribute('data-mode', newMode);

      // Update the isDarkMode property
      this.isDarkMode = newMode === 'dark';

      // Optionally toggle a class on the body
      if (this.isDarkMode) {
        this.renderer.addClass(document.body, 'dark');
      } else {
        this.renderer.removeClass(document.body, 'dark');
      }
    }
  }


  ngOnInit() {
    this.updateStickyClass();
    Aos.init({
      duration: 2000, // Set default duration or override with data attributes
      once: true, // Choose whether animation should happen only once
    });

    document.querySelector('body')

    // console.log('dsadashdj');


    this.documentElement?.classList.add('dark:text-white', 'text-16', 'font-body', 'dark:bg-body-invoice');
  }

  ngOnDestroy() {
    this.documentElement?.classList.remove('dark:text-white', 'text-16', 'font-body', 'dark:bg-body-invoice');
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.updateStickyClass();
    this.detectCurrentSection();
  }
  scrollToSection(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.currentSection = section;
    }
  }
  private updateStickyClass(): void {
    const offset = window.pageYOffset || document.documentElement.scrollTop;
    if (offset > this.threshold) {
      this.renderer.addClass(
        this.el.nativeElement.querySelector('header'),
        this.stickyClass
      );
    } else {
      this.renderer.removeClass(
        this.el.nativeElement.querySelector('header'),
        this.stickyClass
      );
    }
  }
  private detectCurrentSection(): void {
    const sections = ['home', 'About', 'case', 'community', 'contact-us'];
    let currentSection = this.currentSection;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight * 0.5 &&
          rect.bottom >= window.innerHeight * 0.5
        ) {
          currentSection = section;
          break;
        }
      }
    }

    this.currentSection = currentSection;
  }
  renderChart(): void {
    this.lineChart = {
      series: [
        {
          name: 'Series name',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      chartOptions: {
        chart: {
          defaultLocale: 'en',
          height: 350,
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
          curve: 'smooth',
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
            formatter: (val: number) => {
              return `$ ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`;
            },
          },
        },
        colors: [],
        dataSet: !this.isDark ? ['bg-purple-500'] : ['bg-purple-500'],
        grid: {
          strokeDashArray: 2,
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
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
      },
    };
  }

  fullName: string = '';
  email: string = '';
  interest: string = '';
  budget: string = '';
  message: string = '';

  onSubmit(): void {
    if (this.fullName && this.email && this.interest && this.budget && this.message) {
      // Handle form submission (e.g., send data to server)
      console.log({
        fullName: this.fullName,
        email: this.email,
        interest: this.interest,
        budget: this.budget,
        message: this.message
      });
    }
  }

}
