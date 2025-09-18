import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import AOS from 'aos';

@Component({
    selector: 'app-ui-advanced-animation',
    imports: [PageTitleComponent, CommonModule],
    templateUrl: './ui-advanced-animation.component.html',
    styleUrl: './ui-advanced-animation.component.scss'
})
export class UiAdvancedAnimationComponent {
  ngOnInit() {
    AOS.init();
  }
  fadeAnimations: string[] = [
    'fade-up',
    'fade-down',
    'fade-right',
    'fade-left',
    'fade-up-right',
    'fade-up-left',
    'fade-down-right',
    'fade-down-left',
  ];

  flipAnimations: string[] = [
    'flip-left',
    'flip-right',
    'flip-up',
    'flip-down',
  ];
  zoomAnimations = [
    'zoom-in',
    'zoom-in-up',
    'zoom-in-down',
    'zoom-in-left',
    'zoom-in-right',
    'zoom-out',
    'zoom-out-up',
    'zoom-out-down',
    'zoom-out-left',
    'zoom-out-right',
  ];

  differentSettings = [
    { animation: 'fade-up', duration: '3000' },
    { animation: 'fade-down', duration: '1500', easing: 'linear' },
    { animation: 'fade-right', offset: '300', easing: 'ease-in-sine' },
    {
      animation: 'fade-left',
      anchor: '#example-anchor',
      offset: '500',
      duration: '500',
    },
    {
      animation: 'fade-zoom-in',
      easing: 'ease-in-back',
      delay: '300',
      offset: '0',
    },
    { animation: 'flip-left', easing: 'ease-out-cubic', duration: '2000' },
  ];

  anchors = [
    { animation: 'fade-up', placement: 'top-bottom' },
    { animation: 'fade-up', placement: 'center-bottom' },
    { animation: 'fade-up', placement: 'center-center' },
    { animation: 'fade-up', placement: 'bottom-bottom' },
    { animation: 'fade-up', placement: 'top-center' },
  ];
}
