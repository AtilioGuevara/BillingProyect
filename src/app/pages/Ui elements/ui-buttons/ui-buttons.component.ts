import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';

import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-ui-buttons',
    imports: [PageTitleComponent, CommonModule, LucideAngularModule],
    templateUrl: './ui-buttons.component.html',
    styleUrl: './ui-buttons.component.scss'
})
export class UiButtonsComponent  {

  baseButtons = [
    { text: 'Primary', color: 'btn-primary' },
    { text: 'Purple', color: 'btn-purple' },
    { text: 'Green', color: 'btn-green' },
    { text: 'Red', color: 'btn-red' },
    { text: 'Yellow', color: 'btn-yellow' },
    { text: 'Sky', color: 'btn-sky' },
    { text: 'Pink', color: 'btn-pink' },
    { text: 'Indigo', color: 'btn-indigo' },
    { text: 'Orange', color: 'btn-orange' },
    { text: 'Dark', color: 'btn-gray' },
    { text: 'Light', color: 'bg-gray-200 text-gray-800 border-gray-200 hover:bg-gray-300 hover:text-gray-800 hover:border-gray-300 focus:bg-gray-300 focus:text-gray-800 focus:border-gray-300' },
  ]

  outlineButtons= [
    { text: 'Primary', color: 'btn-outline-primary' },
    { text: 'Purple', color: 'btn-outline-purple' },
    { text: 'Green', color: 'btn-outline-green' },
    { text: 'Red', color: 'btn-outline-red' },
    { text: 'Yellow', color: 'btn-outline-yellow' },
    { text: 'Sky', color: 'btn-outline-sky' },
    { text: 'Pink', color: 'btn-outline-pink' },
    { text: 'Indigo', color: 'btn-outline-indigo' },
    { text: 'Orange', color: 'btn-outline-orange' },
    { text: 'Dark', color: 'btn-outline-gray' },
    { text: 'Light', color: 'bg-transparent text-gray-500 border-gray-200 hover:bg-gray-200 hover:text-gray-500 hover:border-gray-200 focus:bg-gray-200 focus:text-gray-500 focus:border-gray-200' },
  ]

  softButtons= [
    { text: 'Primary', color: 'btn-sub-primary' },
    { text: 'Purple', color: 'btn-sub-purple' },
    { text: 'Green', color: 'btn-sub-green' },
    { text: 'Red', color: 'btn-sub-red' },
    { text: 'Yellow', color: 'btn-sub-yellow' },
    { text: 'Sky', color: 'btn-sub-sky' },
    { text: 'Pink', color: 'btn-sub-pink' },
    { text: 'Indigo', color: 'btn-sub-indigo' },
    { text: 'Orange', color: 'btn-sub-orange' },
    { text: 'Dark', color: 'btn-sub-gray' },
  ]

  DButtons= [
    { text: 'Primary', color: 'btn-3d-primary' },
    { text: 'Purple', color: 'btn-3d-purple' },
    { text: 'Green', color: 'btn-3d-green' },
    { text: 'Red', color: 'btn-3d-red' },
    { text: 'Yellow', color: 'btn-3d-yellow' },
    { text: 'Sky', color: 'btn-3d-sky' },
    { text: 'Pink', color: 'btn-3d-pink' },
    { text: 'Dark', color: 'btn-3d-gray' },
    { text: 'Indigo', color: 'btn-3d-indigo' },
    { text: 'Orange', color: 'btn-3d-orange' },
    { text: 'Light', color: 'bg-gray-200 text-gray-800 border-gray-200 hover:bg-gray-300 hover:text-gray-800 hover:border-gray-300 focus:bg-gray-300 focus:text-gray-800 focus:border-gray-300 shadow-gray-400' },
  ]

  outlineDashedButtons= [
    { text: 'Primary', color: 'btn-dashed-primary' },
    { text: 'Purple', color: 'btn-dashed-purple' },
    { text: 'Green', color: 'btn-dashed-green' },
    { text: 'Red', color: 'btn-dashed-red' },
    { text: 'Yellow', color: 'btn-dashed-yellow' },
    { text: 'Sky', color: 'btn-dashed-sky' },
    { text: 'Pink', color: 'btn-dashed-pink' },
    { text: 'Indigo', color: 'btn-dashed-indigo' },
    { text: 'Orange', color: 'btn-dashed-orange' },
    { text: 'Dark', color: 'btn-dashed-gray' },
    { text: 'Light', color: 'bg-transparent text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-500 hover:border-gray-200 focus:bg-gray-50 focus:text-gray-500 focus:border-gray-200' },
  ]

  activeStyleButtons= [
    { text: 'Primary', color: 'btn-active-primary' },
    { text: 'Purple', color: 'btn-active-purple' },
    { text: 'Green', color: 'btn-active-green' },
    { text: 'Red', color: 'btn-active-red' },
    { text: 'Yellow', color: 'btn-active-yellow' },
    { text: 'Sky', color: 'btn-active-sky' },
    { text: 'Pink', color: 'btn-active-pink' },
    { text: 'Indigo', color: 'btn-active-indigo' },
    { text: 'Orange', color: 'btn-active-orange' },
    { text: 'Dark', color: 'btn-active-gray' },
  ]

  hoverEffectButtons= [
    { text: 'Button Up', color: 'btn-primary hover:-translate-y-0.5' },
    { text: 'Button Down', color: 'btn-green hover:translate-y-0.5' },
    { text: 'Scale', color: 'btn-purple hover:scale-105' },
  ]

  loadingButtons = [false, false, false];
  isActive = [false, false, false];

  handleClick(index: number): void {
    this.loadingButtons[index] = true;
    setTimeout(() => {
      this.loadingButtons[index] = false;
      this.isActive[index] = !this.isActive[index];
    }, 2000);
  }
}
