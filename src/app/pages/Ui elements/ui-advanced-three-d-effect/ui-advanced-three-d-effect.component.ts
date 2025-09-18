import { Component, ElementRef } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import VanillaTilt from 'vanilla-tilt';


@Component({
    selector: 'app-ui-advanced-three-d-effect',
    imports: [PageTitleComponent],
    templateUrl: './ui-advanced-three-d-effect.component.html',
    styleUrl: './ui-advanced-three-d-effect.component.scss'
})
export class UiAdvancedThreeDEffectComponent {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    VanillaTilt.init(
      this.el.nativeElement.querySelectorAll("#basic"),
      {
        max: 20,                    // Maximum tilt rotation, degrees.
        speed: 100,                 // Speed of the tilt effect.
        scale: 1.05,                // Scale of the element on hover.
        reverse: false,             // Normal tilt direction.
        reset: true,                // Reset tilt when mouse leaves.
        startX: 0,                  // Initial tilt position on X-axis.
        startY: 0,                  // Initial tilt position on Y-axis.
        axis: null,                 // No axis restriction.
      }
    );

    VanillaTilt.init(
      this.el.nativeElement.querySelectorAll("#glareffect"),
      {
        max: 20,                    // Maximum tilt rotation, degrees.
        speed: 300,                 // Speed of the tilt effect.
        scale: 1.05,                // Scale of the element on hover.
        reverse: false,             // Normal tilt direction.
        reset: false,               // Disable reset when mouse leaves.
        startX: 0,                  // Initial tilt position on X-axis.
        startY: 0,                  // Initial tilt position on Y-axis.
        axis: null,                 // No axis restriction.
        glare: true,                // Enable glare effect.
        'max-glare': 0.8,           // Maximum glare opacity.
      }
    );

    VanillaTilt.init(
      this.el.nativeElement.querySelectorAll("#reverseTilt"),
      {
        max: 20,                    // Maximum tilt rotation, degrees.
        speed: 300,                 // Speed of the tilt effect.
        scale: 1.05,                // Scale of the element on hover.
        reverse: true,              // Reverse tilt direction.
        reset: false,               // Disable reset when mouse leaves.
        startX: 0,                  // Initial tilt position on X-axis.
        startY: 0,                  // Initial tilt position on Y-axis.
        axis: null,                 // No axis restriction.
        glare: false,               // Disable glare effect.
        'max-glare': 0,             // Maximum glare opacity.
      }
    );

    VanillaTilt.init(
      this.el.nativeElement.querySelectorAll("#keepFloating"),
      {
        max: 20,                    // Maximum tilt rotation, degrees.
        speed: 300,                 // Speed of the tilt effect.
        scale: 1.05,                // Scale of the element on hover.
        reverse: false,             // Normal tilt direction.
        reset: false,               // Disable reset when mouse leaves.
        startX: 0,                  // Initial tilt position on X-axis.
        startY: 0,                  // Initial tilt position on Y-axis.
        axis: null,                 // No axis restriction.
        glare: false,               // Disable glare effect.
        'max-glare': 0,             // Maximum glare opacity.
      }
    );

    VanillaTilt.init(
      this.el.nativeElement.querySelectorAll("#fullPageListening"),
      {
        max: 20,                    // Maximum tilt rotation, degrees.
        speed: 300,                 // Speed of the tilt effect.
        scale: 1.05,                // Scale of the element on hover.
        reverse: false,             // Normal tilt direction.
        reset: false,               // Disable reset when mouse leaves.
        startX: 0,                  // Initial tilt position on X-axis.
        startY: 0,                  // Initial tilt position on Y-axis.
        axis: null,                 // No axis restriction.
        glare: false,               // Disable glare effect.
        'max-glare': 0,             // Maximum glare opacity.
      }
    );

    VanillaTilt.init(
      this.el.nativeElement.querySelectorAll("#scaleOnHover"),
      {
        max: 20,                    // Maximum tilt rotation, degrees.
        speed: 300,                 // Speed of the tilt effect.
        scale: 1.1,                 // Scale of the element on hover.
        reverse: false,             // Normal tilt direction.
        reset: false,               // Disable reset when mouse leaves.
        startX: 0,                  // Initial tilt position on X-axis.
        startY: 0,                  // Initial tilt position on Y-axis.
        axis: null,                 // No axis restriction.
        glare: false,               // Disable glare effect.
        'max-glare': 0,             // Maximum glare opacity.
      }
    );

    VanillaTilt.init(
      this.el.nativeElement.querySelectorAll("#startTiltPosition"),
      {
        max: 20,                    // Maximum tilt rotation, degrees.
        speed: 300,                 // Speed of the tilt effect.
        scale: 1.05,                // Scale of the element on hover.
        reverse: false,             // Normal tilt direction.
        reset: true,                // Reset tilt when mouse leaves.
        startX: 20,                 // Initial tilt position on X-axis.
        startY: -20,                // Initial tilt position on Y-axis.
        axis: null,                 // No axis restriction.
        glare: false,               // Disable glare effect.
        'max-glare': 0,             // Maximum glare opacity.
      }
    );

    VanillaTilt.init(
      this.el.nativeElement.querySelectorAll("#disableXAxis"),
      {
        max: 20,                    // Maximum tilt rotation, degrees.
        speed: 300,                 // Speed of the tilt effect.
        scale: 1.05,                // Scale of the element on hover.
        reverse: false,             // Normal tilt direction.
        reset: false,               // Disable reset when mouse leaves.
        startX: 0,                  // Initial tilt position on X-axis.
        startY: 0,                  // Initial tilt position on Y-axis.
        axis: 'y',                  // Disable X-axis tilt.
        glare: false,               // Disable glare effect.
        'max-glare': 0,             // Maximum glare opacity.
      }
    );

    VanillaTilt.init(
      this.el.nativeElement.querySelectorAll("#disableYAxis"),
      {
        max: 20,                    // Maximum tilt rotation, degrees.
        speed: 300,                 // Speed of the tilt effect.
        scale: 1.05,                // Scale of the element on hover.
        reverse: false,             // Normal tilt direction.
        reset: false,               // Disable reset when mouse leaves.
        startX: 0,                  // Initial tilt position on X-axis.
        startY: 0,                  // Initial tilt position on Y-axis.
        axis: 'x',                  // Disable Y-axis tilt.
        glare: false,               // Disable glare effect.
        'max-glare': 0,             // Maximum glare opacity.
      }
    );
  }

}
