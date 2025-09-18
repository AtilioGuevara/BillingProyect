import { Component, ElementRef, ViewChild } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';

import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-pages-maintenance',
    imports: [LucideAngularModule],
    templateUrl: './pages-maintenance.component.html',
    styleUrl: './pages-maintenance.component.scss'
})
export class PagesMaintenanceComponent  {
  @ViewChild('tiltElement') tiltElement!: ElementRef;

  ngAfterViewInit() {
    VanillaTilt.init(this.tiltElement.nativeElement, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    });
  }

  refreshPage() {
    window.location.reload();
  }
}
