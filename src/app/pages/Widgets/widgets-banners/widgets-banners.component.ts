import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-widgets-banners',
    imports: [PageTitleComponent, CommonModule, LucideAngularModule],
    templateUrl: './widgets-banners.component.html',
    styleUrl: './widgets-banners.component.scss'
})
export class WidgetsBannersComponent {
  isOpen = true;

  closeAlert() {
    this.isOpen = false;
  }
}
