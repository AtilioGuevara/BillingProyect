import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  HostListener,
  Renderer2,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { DomixDropdownModule } from '../../../module/domix dropdown/domix-dropdown.module';
import { PRODUCTS } from '../../../Data/landing-products-data';
import { CommonModule } from '@angular/common';
import 'img-comparison-slider';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-landing-ecommerce',
    imports: [LucideAngularModule, DomixDropdownModule, CommonModule, RouterLink],
    templateUrl: './landing-ecommerce.component.html',
    styleUrl: './landing-ecommerce.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LandingEcommerceComponent {
  private stickyClass = 'scroll-sticky';
  currentYear: number = new Date().getFullYear();
  isDarkMode: boolean = false;
  private threshold = 100;
  products = PRODUCTS;
  filteredProducts = PRODUCTS;
  activeTab: string = 'brand';
  columns: number = 4;
  currentSection: string = 'products';
  isMenuOpen = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.updateStickyClass();
    this.filterProducts();
    const modeElement = document.querySelector('[data-mode]');
    if (modeElement) {
      this.isDarkMode = modeElement.getAttribute('data-mode') === 'dark';
    }
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

  filterProducts(): void {
    if (this.activeTab === 'brand') {
      this.filteredProducts = [...this.products].sort((a, b) => {
        if (a.brand < b.brand) return -1;
        if (a.brand > b.brand) return 1;
        return 0;
      });
    } else {
      this.filteredProducts = this.products.filter(
        (product) => product.category === this.activeTab
      );
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.filterProducts();
  }

  setColumns(columns: number): void {
    this.columns = columns;
  }

  private detectCurrentSection(): void {
    const sections = ['products', 'new-arrivals', 'service', 'cta'];
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
