import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ui-badge',
    imports: [PageTitleComponent, CommonModule],
    templateUrl: './ui-badge.component.html',
    styleUrl: './ui-badge.component.scss'
})
export class UiBadgeComponent {

  baseBadges = [
    { text: 'Primary', color: 'badge-primary' },
    { text: 'Purple', color: 'badge-purple' },
    { text: 'Green', color: 'badge-green' },
    { text: 'Red', color: 'badge-red' },
    { text: 'Yellow', color: 'badge-yellow' },
    { text: 'Sky', color: 'badge-sky' },
    { text: 'Pink', color: 'badge-pink' },
    { text: 'Indigo', color: 'badge-indigo' },
    { text: 'Orange', color: 'badge-orange' },
    { text: 'Light', color: 'badge-gray' },
  ];

  outlineBadges = [
    { text: 'Primary', color: 'badge-outline-primary' },
    { text: 'Purple', color: 'badge-outline-purple' },
    { text: 'Green', color: 'badge-outline-green' },
    { text: 'Red', color: 'badge-outline-red' },
    { text: 'Yellow', color: 'badge-outline-yellow' },
    { text: 'Sky', color: 'badge-outline-sky' },
    { text: 'Pink', color: 'badge-outline-pink' },
    { text: 'Indigo', color: 'badge-outline-indigo' },
    { text: 'Orange', color: 'badge-outline-orange' },
    { text: 'Dark', color: 'badge-outline-gray' },
    { text: 'Light', color: 'bg-transparent text-gray-500 border-gray-200 dark:border-dark-800 dark:text-dark-500' },
  ];

  softBadges = [
    { text: 'Primary', color: 'badge-sub-primary' },
    { text: 'Purple', color: 'badge-sub-purple' },
    { text: 'Green', color: 'badge-sub-green' },
    { text: 'Red', color: 'badge-sub-red' },
    { text: 'Yellow', color: 'badge-sub-yellow' },
    { text: 'Sky', color: 'badge-sub-sky' },
    { text: 'Pink', color: 'badge-sub-pink' },
    { text: 'Indigo', color: 'badge-sub-indigo' },
    { text: 'Orange', color: 'badge-sub-orange' },
    { text: 'Dark', color: 'bg-gray-200 text-gray-800 border-gray-200 dark:border-dark-800 dark:text-dark-50 dark:bg-dark-850' },
    { text: 'Light', color: 'badge-sub-gray' },
  ];

  solidBadges = [
    { text: 'Primary', color: 'badge-solid-primary' },
    { text: 'Purple', color: 'badge-solid-purple' },
    { text: 'Green', color: 'badge-solid-green' },
    { text: 'Red', color: 'badge-solid-red' },
    { text: 'Yellow', color: 'badge-solid-yellow' },
    { text: 'Sky', color: 'badge-solid-sky' },
    { text: 'Pink', color: 'badge-solid-pink' },
    { text: 'Indigo', color: 'badge-solid-indigo' },
    { text: 'Orange', color: 'badge-solid-orange' },
    { text: 'Dark', color: 'badge-solid-gray' },
    { text: 'Light', color: 'bg-gray-200 text-gray-500 border-gray-200 dark:bg-dark-850 dark:border-dark-800 dark:text-dark-500' },
  ];

  closeBadges = [
    { text: 'Primary', color: 'btn-sub-primary' },
    { text: 'Purple', color: 'btn-sub-purple' },
    { text: 'Green', color: 'btn-sub-green' },
    { text: 'Red', color: 'btn-sub-red' },
    { text: 'Yellow', color: 'btn-sub-yellow' },
    { text: 'Sky', color: 'btn-sub-sky' },
    { text: 'Pink', color: 'btn-sub-pink' },
    { text: 'Indigo', color: 'btn-sub-indigo' },
    { text: 'Orange', color: 'btn-sub-orange' },
    { text: 'Light', color: 'btn-sub-gray' },
  ];

  squareBadges = [
    { text: 'Primary', color: 'badge-sub-primary' },
    { text: 'Purple', color: 'badge-sub-purple' },
    { text: 'Green', color: 'badge-sub-green' },
    { text: 'Red', color: 'badge-sub-red' },
    { text: 'Yellow', color: 'badge-sub-yellow' },
    { text: 'Sky', color: 'badge-sub-sky' },
    { text: 'Pink', color: 'badge-sub-pink' },
    { text: 'Indigo', color: 'badge-sub-indigo' },
    { text: 'Orange', color: 'badge-sub-orange' },
    { text: 'Light', color: 'badge-sub-gray' },
  ];

  roundedBadges = [
    { text: 'Primary', color: 'badge-solid-primary' },
    { text: 'Purple', color: 'badge-solid-purple' },
    { text: 'Green', color: 'badge-solid-green' },
    { text: 'Red', color: 'badge-solid-red' },
  ];

  removeBadge(index: number) {
    this.closeBadges.splice(index, 1);
  }

}
