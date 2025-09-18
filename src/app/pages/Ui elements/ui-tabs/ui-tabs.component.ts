import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';


@Component({
    selector: 'app-ui-tabs',
    imports: [PageTitleComponent, CommonModule, LucideAngularModule],
    templateUrl: './ui-tabs.component.html',
    styleUrl: './ui-tabs.component.scss'
})
export class UiTabsComponent  {

  activeTab = 1;
  justifyTab = 1;
  pillTab = 1
  pillTabJustify = 1;
  iconWithAnimation = 2;
  iconWithText = 2;
  animateTab = 2;

  openTab(tabNumber: number): void {
    this.activeTab = tabNumber;
  }

  activeJustifyTab(tabNumber: number): void {
    this.justifyTab = tabNumber;
  }

}
