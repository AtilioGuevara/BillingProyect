import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LucideAngularModule } from 'lucide-angular';
import { CountUpModule } from 'ngx-countup';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
@Component({
    selector: 'app-landing-school',
    imports: [CommonModule, LucideAngularModule, CountUpModule, RouterLink],
    templateUrl: './landing-school.component.html',
    styleUrl: './landing-school.component.scss'
})
export class LandingSchoolComponent {
  @ViewChild('grabCursor') grabCursorContainer!: ElementRef;
  private stickyClass = 'scroll-sticky';
  private threshold = 100;
  isDarkMode: boolean = false;
  currentYear: number = new Date().getFullYear();
  isMenuOpen: boolean = false;
  currentSection: string = 'home';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit() {
    this.updateStickyClass();
    this.detectCurrentSection();

    register()
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
    });
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


  scrollToSection(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.currentSection = section;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.updateStickyClass();
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
    const sections = [
      'home',
      'about-us',
      'courses',
      'mentors',
      'blogs',
      'contact-us',
    ];
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
