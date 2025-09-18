import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';


@Component({
    selector: 'app-ui-advanced-swiper',
    imports: [PageTitleComponent],
    templateUrl: './ui-advanced-swiper.component.html',
    styleUrl: './ui-advanced-swiper.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UiAdvancedSwiperComponent {
  @ViewChild('basic') swiperContainer!: ElementRef;
  @ViewChild('paginationDynamicSlider') paginationDynamicSliderContainer!: ElementRef;
  @ViewChild('pagination') paginationContainer!: ElementRef;
  @ViewChild('paginationVertical') paginationVerticalContainer!: ElementRef;
  @ViewChild('grabCursor') grabCursorContainer!: ElementRef;
  @ViewChild('sildesPerView') sildesPerViewContainer!: ElementRef;

  ngOnInit() {
    register();
  }

  ngAfterViewInit() {
    new Swiper(this.swiperContainer.nativeElement, {})
    
    new Swiper(this.paginationDynamicSliderContainer.nativeElement, {
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
      },
    });

    new Swiper(this.paginationContainer.nativeElement, {
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
      },
    });

    new Swiper(this.paginationVerticalContainer.nativeElement, {
      direction:'vertical',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

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

    new Swiper(this.sildesPerViewContainer.nativeElement, {
      slidesPerView: 1,
      spaceBetween: 30,
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
        }
      }
    });
  }

  changeSlide(swiperRef: any, prevOrNext: number): void {
    if (prevOrNext === -1) {
      swiperRef.nativeElement.swiper.slidePrev();
    } else {
      swiperRef.nativeElement.swiper.slideNext();
    }
  }
}
