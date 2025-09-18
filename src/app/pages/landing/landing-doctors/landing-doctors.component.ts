import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import Aos from 'aos';
import { CountUpModule } from 'ngx-countup';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';

@Component({
    selector: 'app-landing-doctors',
    imports: [CommonModule, CountUpModule, LucideAngularModule, RouterLink],
    templateUrl: './landing-doctors.component.html',
    styleUrls: ['./landing-doctors.component.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LandingDoctorsComponent {
  @ViewChild('grabCursor') grabCursorContainer!: ElementRef;
  private stickyClass = 'scroll-sticky';
  currentYear: number = new Date().getFullYear();
  private threshold = 100;
  isMenuOpen = false;
  currentSection: string = 'home';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.updateStickyClass();
    Aos.init({
      duration: 2000,
      once: true,
    });

    register();
  }

  ngAfterViewInit() {
    new Swiper(this.grabCursorContainer.nativeElement, {
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 30,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        375: {
          slidesPerView: 1.5,
          spaceBetween: 20
        },
        557: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20
        }
      }
    });
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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDarkMode() {
    const modeElement = document.querySelector('[data-mode]');
    if (modeElement) {
      const currentMode = modeElement.getAttribute('data-mode');
      const newMode = currentMode === 'light' ? 'dark' : 'light';
      modeElement.setAttribute('data-mode', newMode);
    }
  }

  private updateStickyClass(): void {
    const offset = window.pageYOffset || document.documentElement.scrollTop;
    const headerElement = this.el.nativeElement.querySelector('header');
    if (headerElement) {
      if (offset > this.threshold) {
        this.renderer.addClass(headerElement, this.stickyClass);
      } else {
        this.renderer.removeClass(headerElement, this.stickyClass);
      }
    }
  }

  private detectCurrentSection(): void {
    const sections = ['home', 'about-us', 'services', 'doctors', 'feedback'];
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
}
