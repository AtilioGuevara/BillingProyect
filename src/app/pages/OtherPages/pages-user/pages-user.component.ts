import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LucideAngularModule } from 'lucide-angular';
import { DomixTooltipModule } from '../../../module/domix tooltip/domix-tooltip.module';

@Component({
    selector: 'app-pages-user',
    imports: [CommonModule, LucideAngularModule, RouterLink, DomixTooltipModule],
    templateUrl: './pages-user.component.html',
    styleUrl: './pages-user.component.scss'
})
export class PagesUserComponent {
  loadingButton = false;
  isActive = false;

  toggleFollow() {
    this.loadingButton = true;
    setTimeout(() => {
      this.loadingButton = false;
      this.isActive = !this.isActive;
    }, 200);
  }
}
