import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ILayoutSettings {
  layout: string;
  contentWidth: string;
  sidebarSize: string;
  direction: string;
  mode: string;
  sidervarAssetColors: string;
  primaryAssetColors: string;
  navigationType: string;
  darkModeColor: string;
  // layout: 'default' | 'horizontal' | 'modern' | 'boxed' | 'compact' | 'semibox';
  // contentWidth: 'default' | 'fluid';
  // sidebarSize: 'default' | 'medium' | 'small';
  // direction: 'ltr' | 'rtl';
  // mode: 'light' | 'dark' | 'auto' | 'black-white';
  // sidervarAssetColors: 'light' | 'dark' | 'brand' | 'purple' | 'sky';
  // primaryAssetColors: 'blue' | 'dark' | 'brand' | 'purple' | 'sky';
}

@Injectable({
  providedIn: 'root'
})
export class LayoutSettingService {

  private defaultSettings: ILayoutSettings = {
    layout: 'default',
    contentWidth: 'default',
    sidebarSize: 'default',
    direction: 'ltr',
    mode: 'light',
    sidervarAssetColors: 'light',
    primaryAssetColors: 'blue',
    navigationType: 'default',
    darkModeColor: 'default',
  };

  private settingsSubject = new BehaviorSubject<ILayoutSettings>(
    this.getStoredSettings() || { ...this.defaultSettings }
  );
  settings$ = this.settingsSubject.asObservable();

  public toggleSideBarSubject = new BehaviorSubject<boolean>(false);
  toggleSideBarSubject$ = this.toggleSideBarSubject.asObservable();

  documentElement = document.documentElement;
  constructor() {
    window.addEventListener('resize', this.checkScreenSize.bind(this));
    this.checkScreenSize();
    // Apply current settings to the document on service initialization so
    // dark/light mode and other attributes are present on first render.
    this.handleSettingsChange(this.settingsSubject.value);
  }

  getSettings(): ILayoutSettings {
    return this.settingsSubject.value;
  }

  updateSettings(newSettings: Partial<ILayoutSettings>): void {
    const updatedSettings = { ...this.settingsSubject.value, ...newSettings };

    if (newSettings.layout && newSettings.layout !== 'modern') {
      updatedSettings.navigationType = 'default';
    }

    this.settingsSubject.next(updatedSettings);
    this.saveSettingsToLocalStorage(updatedSettings);
    this.handleSettingsChange(updatedSettings);
  }


  resetSettings(): void {
    this.settingsSubject.next({ ...this.defaultSettings });
    this.saveSettingsToLocalStorage(this.defaultSettings);
    this.handleSettingsChange(this.defaultSettings);
  }

  isDark(): boolean {
    return this.settingsSubject.value.mode === 'dark' ? true : false
  }

  handleSettingsChange(newSettings: Partial<ILayoutSettings>): void {
    Object.entries(newSettings).forEach(([key, value]) => {
      if (value !== undefined) {
        this.handleSettingChange(key as keyof ILayoutSettings, value);
      }
    });
  }
  private sidebarState = new BehaviorSubject<boolean>(false);
  sidebarState$ = this.sidebarState.asObservable();

  toggleSidebar() {
    this.sidebarState.next(!this.sidebarState.value);
  }
  private handleSettingChange(key: keyof ILayoutSettings, value: any): void {
    switch (key) {
      case 'layout':
        this.setBodyAttribute('data-layout', value);
        this.setSidebarAttributes(value);
        break;
      case 'sidebarSize':
        if (this.settingsSubject.value.layout !== 'horizontal') {
          this.setBodyAttribute('data-sidebar', value);
        }
        break;
      case 'direction':
        this.setBodyAttribute(
          'dir',
          value
        );
        break;
      case 'navigationType':
        this.setBodyAttribute(
          'data-nav-type',
          value
        );
        break;
      case 'contentWidth':
        this.setBodyAttribute(
          'data-content-width',
          value
        );
        break;
      case 'mode':
        this.setBodyAttribute('data-mode', value);
        const data = value === 'dark' ? true : false;
        this.documentElement.classList.toggle('default', data)
        break;
      case 'darkModeColor':
        const currentClasses = 'scroll-smooth group default';

        const updatedClasses = currentClasses.replace('default', value);

        this.documentElement.className = updatedClasses;
        break;
      case 'sidervarAssetColors':
        if (this.settingsSubject.value.layout !== 'horizontal') {
          this.setBodyAttribute('data-sidebar-colors', value);
        }
        break;
      case 'primaryAssetColors':
        this.setBodyAttribute('data-colors', value);
        break;
    }
    const settings = this.settingsSubject.value;
    if (settings.layout === 'modern' && settings.mode === 'dark') {
      this.setBodyAttribute('data-sidebar-colors', 'light');
    }
  }

  private setSidebarAttributes(layout: string): void {
    if (layout === 'horizontal') {
      this.documentElement.removeAttribute('data-sidebar');
      this.documentElement.removeAttribute('data-sidebar-colors'); // Remove sidebar color
    } else {
      this.setBodyAttribute('data-sidebar', this.settingsSubject.value.sidebarSize);
      this.setBodyAttribute('data-sidebar-colors', this.settingsSubject.value.sidervarAssetColors);
    }
  }


  private setBodyAttribute(attribute: string, value: string): void {
    if (this.documentElement) {
      this.documentElement.setAttribute(attribute, value);
    }
  }

  // Save settings to local storage
  private saveSettingsToLocalStorage(settings: ILayoutSettings): void {
    localStorage.setItem('layoutSettings', JSON.stringify(settings));
  }

  // Load settings from local storage
  private getStoredSettings(): ILayoutSettings | null {
    const storedSettings = localStorage.getItem('layoutSettings');
    return storedSettings ? JSON.parse(storedSettings) : null;
  }


  //change screen size
  private checkScreenSize(): void {
    const isMobile = window.innerWidth < 1024;
    const currentSettings = this.settingsSubject.value;

    if (isMobile && currentSettings.layout === 'semibox') {
      this.updateSettings({ layout: 'default' });
    }
  }

}
