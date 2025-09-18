import { Component } from '@angular/core';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutSettingService } from '../../../layout-setting.service';

@Component({
    selector: 'app-settings-modal',
    imports: [LucideAngularModule, FormsModule, CommonModule],
    templateUrl: './settings-modal.component.html',
    styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent {

  settings = {
    layout: 'default',
    contentWidth: 'default',
    sidebarSize: 'default',
    navigationType: 'default',
    direction: 'ltr',
    mode: 'light',
    sidervarAssetColors: 'light',
    primaryAssetColors: 'blue',
    darkModeColor: 'default',
  }

  constructor(private modalService: ModalService, private settingService: LayoutSettingService) {
    this.settingService.settings$.subscribe((settings) => {
      this.settings = settings;
    });
  }

  closeSettingsModal() {
    this.modalService.close();
  }

  layouts = [
    { text: 'Default', value: 'default' },
    { text: 'Horizontal', value: 'horizontal' },
    { text: 'Modern', value: 'modern' },
    { text: 'Boxed', value: 'boxed' },
    { text: 'Semibox', value: 'semibox' },
  ]

  navigationType = [
    { text: 'Default', value: 'default' },
    { text: 'Floating', value: 'floating' },
    { text: 'Boxed', value: 'boxed' },
    { text: 'Pattern', value: 'pattern' },
  ]

  sidebarType = [
    { text: 'Default (Large)', value: 'default' },
    { text: 'Medium', value: 'medium' },
    {
      text: 'Small', value: 'small' },
  ]

  direction = [
    { text: 'LTR', value: 'ltr' },
    { text: 'RTL', value: 'rtl' },
  ]

  modes = [
    { text: 'Light', value: 'light', class:'block w-full mb-3 overflow-hidden cursor-pointer card h-28 peer-checked:border-primary-500' },
    { text: 'Dark', value: 'dark', class:'block w-full mb-3 overflow-hidden cursor-pointer border-dark-700 bg-dark-950 card h-28 peer-checked:border-primary-500' },
    { text: 'Default System', value: 'auto', class:'relative block w-full mb-3 overflow-hidden cursor-pointer card h-28 peer-checked:border-primary-500 before:absolute before:bg-gray-950 before:w-1/2 before:inset-y-0 before:right-0' },
    { text: 'Black & White', value: 'black-white', class:'block w-full mb-3 overflow-hidden cursor-pointer card h-28 peer-checked:border-primary-500 grayscale'},
  ]

  darkModeColor = [
    {
      text: 'default', value: 'default', class: 'flex items-center justify-center border border-gray-200 rounded-full dark:border-dark-800 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400'
    },
    { text: 'zinc', value: 'zinc', class: 'rounded-full bg-zinc-950 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400' },
    { text: 'stone', value: 'stone', class: 'rounded-full bg-stone-950 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400' },
    { text: 'neutral', value: 'neutral', class: 'rounded-full bg-neutral-950 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400' },
    { text: 'gray', value: 'gray', class: 'rounded-full bg-gray-950 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400' },
  ]

  sideBarColor = [
    { text: 'light', value: 'light', class:'bg-gray-100 rounded-full input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400'},
    { text: 'dark', value: 'dark', class:'bg-gray-800 rounded-full input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400' },
    { text: 'brand', value: 'brand', class:'rounded-full bg-primary-900 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400' },
    { text: 'purple', value: 'purple', class:'rounded-full bg-purple-950 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400' },
    { text: 'sky', value: 'sky', class: 'rounded-full bg-sky-950 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400' },
  ]
  
  primaryColor = [
    { text: 'default', value: 'default', class:'rounded-full bg-[#358ffc] input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400' },
    { text: 'green', value: 'green', class: 'bg-[#1acd81] rounded-full input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400' },
    { text: 'violet', value: 'violet', class: 'rounded-full bg-violet-500 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400' },
    { text: 'orange', value: 'orange', class: 'rounded-full bg-[#f04b1f] input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400' },
    { text: 'teal', value: 'teal', class: 'bg-teal-500 rounded-full input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400' },
    { text: 'fuchsia', value: 'fuchsia', class: 'rounded-full bg-fuchsia-500 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400' },
    { text: 'lime', value: 'lime', class: 'rounded-full bg-lime-500 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400' },
    { text: 'amber', value: 'amber', class: 'rounded-full bg-amber-500 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400' },
  ]

  containerWidth = [
    { text: 'Default', value: 'Default' },
    { text: 'Fluid', value: 'fluid' },
  ]

  setLayout(mode: string) {
    this.settingService.updateSettings({ layout: mode });
  }

  setNavigation(mode: string) {
    this.settingService.updateSettings({ navigationType: mode });
  }

  setContentWidth(mode: string) {
    this.settingService.updateSettings({ contentWidth: mode });
  }

  setSidebar(mode: string) {
    console.log(mode);
    this.settingService.updateSettings({ sidebarSize: mode });
  }

  setDir(mode: string) {
    this.settingService.updateSettings({ direction: mode });
  }

  setLayoutMode(mode: string) {
    this.settingService.updateSettings({ mode: mode });
  }

  setDarkModeColors(mode: string) {
    this.settingService.updateSettings({ darkModeColor: mode });
  }

  setSidebarColors(mode: string) {
    this.settingService.updateSettings({ sidervarAssetColors: mode });
  }

  setPrimaryColors(mode: string) {
    this.settingService.updateSettings({ primaryAssetColors: mode });
  }

  resetLayout(): void {
    this.settingService.resetSettings();
  }
}
