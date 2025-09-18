import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';

import { LucideAngularModule } from 'lucide-angular';

interface Alert {
  text: string;
  color: string;
  closeBtn?: string;
}

@Component({
    selector: 'app-ui-alerts',
    imports: [PageTitleComponent, CommonModule, LucideAngularModule],
    templateUrl: './ui-alerts.component.html',
    styleUrl: './ui-alerts.component.scss'
})
export class UiAlertsComponent  {
  isOpen1 = true;
  isOpen2 = true;
  isOpen3 = true;
  isOpen4 = true;

  isLiveAlart = false;
  alerts = [
    { isOpen: true, text: 'Primary Gradient Alerts', bgGradient: 'from-primary-500 to-primary-700', closeClass: 'text-primary-400 hover:text-primary-200 btn-close' },
    { isOpen: true, text: 'Purple Gradient Alerts', bgGradient: 'from-purple-500 to-purple-700', closeClass: 'text-purple-400 hover:text-purple-200 btn-close' },
    { isOpen: true, text: 'Gradient Alerts', bgGradient: 'from-primary-500 to-green-500', closeClass: 'text-green-300 hover:text-green-100 btn-close' },
    { isOpen: true, text: 'Gradient Alerts', bgGradient: 'from-primary-950 to-red-950', closeClass: 'text-red-400 hover:text-red-200 btn-close' }
  ];

  showAlert(): void {
    this.isLiveAlart = true;
    setTimeout(() => {
      this.isLiveAlart = false;
    }, 7000);
  }

  closeAlertLiveAlert(): void {
    this.isLiveAlart = false;
  }

  closeAlertGradiant(index: number) {
    this.alerts[index].isOpen = false;
  }

  basicAlerts: Alert[] = [
    { text: 'Primary Alerts', color: 'alert-primary', closeBtn: 'text-primary-400 hover:text-primary-500' },
    { text: 'Purple Alerts', color: 'alert-purple', closeBtn: 'text-purple-400 hover:text-purple-500' },
    { text: 'Green Alerts', color: 'alert-green', closeBtn: 'text-green-400 hover:text-green-500' },
    { text: 'Red Alerts', color: 'alert-red', closeBtn: 'text-red-400 hover:text-red-500' },
    { text: 'Yellow Alerts', color: 'alert-yellow', closeBtn: 'text-yellow-400 hover:text-yellow-500' },
    { text: 'Sky Alerts', color: 'alert-sky', closeBtn: 'text-sky-400 hover:text-sky-500' },
    { text: 'Pink Alerts', color: 'alert-pink', closeBtn: 'text-pink-400 hover:text-pink-500' },
    { text: 'Indigo Alerts', color: 'alert-indigo', closeBtn: 'text-indigo-400 hover:text-indigo-500' },
    { text: 'Orange Alerts', color: 'alert-orange', closeBtn: 'text-orange-400 hover:text-orange-500' },
    { text: 'Dark Alerts', color: 'alert-gray', closeBtn: 'text-gray-400 hover:text-gray-500' },
  ];

  softAlerts: Alert[] = [
    { text: 'Primary Alerts', color: 'alert-sub-primary', closeBtn: 'text-primary-400 hover:text-primary-500' },
    { text: 'Purple Alerts', color: 'alert-sub-purple', closeBtn: 'text-purple-400 hover:text-purple-500' },
    { text: 'Green Alerts', color: 'alert-sub-green', closeBtn: 'text-green-400 hover:text-green-500' },
    { text: 'Red Alerts', color: 'alert-sub-red', closeBtn: 'text-red-400 hover:text-red-500' },
    { text: 'Yellow Alerts', color: 'alert-sub-yellow', closeBtn: 'text-yellow-400 hover:text-yellow-500' },
    { text: 'Sky Alerts', color: 'alert-sub-sky', closeBtn: 'text-sky-400 hover:text-sky-500' },
    { text: 'Pink Alerts', color: 'alert-sub-pink', closeBtn: 'text-pink-400 hover:text-pink-500' },
    { text: 'Indigo Alerts', color: 'alert-sub-indigo', closeBtn: 'text-indigo-400 hover:text-indigo-500' },
    { text: 'Orange Alerts', color: 'alert-sub-orange', closeBtn: 'text-orange-400 hover:text-orange-500' },
    { text: 'Dark Alerts', color: 'alert-sub-gray', closeBtn: 'text-gray-400 hover:text-gray-500' },
  ];

  outlineAlerts: Alert[] = [
    { text: 'Primary Alerts', color: 'alert-outline-primary', closeBtn: 'text-primary-400 hover:text-primary-500' },
    { text: 'Purple Alerts', color: 'alert-outline-purple', closeBtn: 'text-purple-400 hover:text-purple-500' },
    { text: 'Green Alerts', color: 'alert-outline-green', closeBtn: 'text-green-400 hover:text-green-500' },
    { text: 'Red Alerts', color: 'alert-outline-red', closeBtn: 'text-red-400 hover:text-red-500' },
    { text: 'Yellow Alerts', color: 'alert-outline-yellow', closeBtn: 'text-yellow-400 hover:text-yellow-500' },
    { text: 'Sky Alerts', color: 'alert-outline-sky', closeBtn: 'text-sky-400 hover:text-sky-500' },
    { text: 'Pink Alerts', color: 'alert-outline-pink', closeBtn: 'text-pink-400 hover:text-pink-500' },
    { text: 'Indigo Alerts', color: 'alert-outline-indigo', closeBtn: 'text-indigo-400 hover:text-indigo-500' },
    { text: 'Orange Alerts', color: 'alert-outline-orange', closeBtn: 'text-orange-400 hover:text-orange-500' },
    { text: 'Dark Alerts', color: 'alert-outline-gray', closeBtn: 'text-gray-400 hover:text-gray-500' },
  ];

  solidAlerts: Alert[] = [
    { text: 'Primary Alerts', color: 'alert-solid-primary' },
    { text: 'Purple Alerts', color: 'alert-solid-purple' },
    { text: 'Green Alerts', color: 'alert-solid-green' },
    { text: 'Red Alerts', color: 'alert-solid-red' },
    { text: 'Yellow Alerts', color: 'alert-solid-yellow' },
    { text: 'Sky Alerts', color: 'alert-solid-sky' },
    { text: 'Pink Alerts', color: 'alert-solid-pink' },
    { text: 'Indigo Alerts', color: 'alert-solid-indigo' },
    { text: 'Orange Alerts', color: 'alert-solid-orange' },
    { text: 'Dark Alerts', color: 'alert-solid-gray' },
  ];

  closeAlert(alerts: Alert[], index: number) {
    alerts.splice(index, 1);
  }

  isOpen: boolean = true;

  closeIconAlert() {
    this.isOpen = false;
  }


  basicAlertsCard: any[] = [
    {
      type: 'info',
      message: 'The pdf is getting ready for you, just sit back and relax.',
      icon: 'ri-spam-2-line',
      buttonText: 'Great',
      buttonColor: 'sky'
    },
    {
      type: 'danger',
      message: 'You are about to delete 40 Posts. Are you sure?',
      icon: 'ri-spam-2-line',
      buttonText: 'Delete Now',
      buttonColor: 'red'
    },
    {
      type: 'success',
      message: 'The action that you done was a success! Great success.',
      icon: 'ri-alert-line',
      buttonText: 'Successful Login',
      buttonColor: 'green'
    },
    {
      type: 'warning',
      message: 'The action you are doing will change the process in some ways.',
      icon: 'ri-alert-line',
      buttonText: 'Warning',
      buttonColor: 'yellow'
    }
  ];


  iconWithAlertsCard: any[] = [
    {
      isOpen: true,
      type: 'sky',
      title: 'New update available!',
      message: 'Some new updates are available. Refresh this page to get the new updates now. It is recommended to always have the latest version available.',
      primaryButtonText: 'Refresh',
      secondaryButtonText: 'Close',
      primaryButtonAction: () => { /* Refresh logic */ },
      secondaryButtonAction: () => { this.toggleAlertVisibility(0, false); },
      iconClass: 'text-sky-500 fill-sky-100 dark:fill-sky-900',
      borderColorClass: 'border-t-sky-500',
      borderColorDarkClass: 'dark:border-t-sky-500',
      textColorClass: 'text-gray-500 dark:text-dark-500',
      fillColorClass: 'border-sky-500',
      fillColorDarkClass: 'dark:border-sky-500',
    },
    {
      isOpen: true,
      type: 'green',
      title: 'Ready to publish?',
      message: 'Publishing this project will make it publicly visible. You can reverse this action anytime here.',
      primaryButtonText: 'Publish Now',
      secondaryButtonText: 'Close',
      primaryButtonAction: () => { /* Publish logic */ },
      secondaryButtonAction: () => { this.toggleAlertVisibility(1, false); },
      iconClass: 'text-green-500 fill-green-100 dark:fill-green-900',
      borderColorClass: 'border-t-green-500',
      borderColorDarkClass: 'dark:border-t-green-500',
      textColorClass: 'text-gray-500 dark:text-dark-500',
      fillColorClass: 'border-green-500',
      fillColorDarkClass: 'dark:border-green-500',
    },
    {
      isOpen: true,
      type: 'yellow',
      title: 'Are you sure?',
      message: 'This will bulk update all the names of the tasks selected. You can reverse this action in the activity log.',
      primaryButtonText: 'Yes, Update',
      secondaryButtonText: 'Close',
      primaryButtonAction: () => { /* Update logic */ },
      secondaryButtonAction: () => { this.toggleAlertVisibility(2, false); },
      iconClass: 'text-yellow-500 fill-yellow-100 dark:fill-yellow-900',
      borderColorClass: 'border-t-yellow-500',
      borderColorDarkClass: 'dark:border-t-yellow-500',
      textColorClass: 'text-gray-500 dark:text-dark-500',
      fillColorClass: 'border-yellow-500',
      fillColorDarkClass: 'dark:border-yellow-500',
    },
    {
      isOpen: true,
      type: 'red',
      title: 'Are you Sure?',
      message: 'This will delete all your latest tasks and other important information. If you don\'t want this, you can always archive this.',
      primaryButtonText: 'Yes, Delete',
      secondaryButtonText: 'Close',
      primaryButtonAction: () => { /* Delete logic */ },
      secondaryButtonAction: () => { this.toggleAlertVisibility(3, false); },
      iconClass: 'text-red-500 fill-red-100 dark:fill-red-950',
      borderColorClass: 'border-t-red-500',
      borderColorDarkClass: 'dark:border-t-red-500',
      textColorClass: 'text-gray-500 dark:text-dark-500',
      fillColorClass: 'border-red-500',
      fillColorDarkClass: 'dark:border-red-500',
    }
  ];

  // Toggle alert visibility
  toggleAlertVisibility(index: number, isVisible: boolean) {
    this.alerts[index].isOpen = isVisible;
  }

}
