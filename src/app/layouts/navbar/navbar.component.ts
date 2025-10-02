import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { DomixDropdownModule } from '../../module/domix dropdown/domix-dropdown.module';
import { ToolsAppsModalComponent } from './modal/tools-apps-modal/tools-apps-modal.component';
import { ModalService } from '../../Core/service/modal/modal.service';
import { SettingsModalComponent } from './modal/settings-modal/settings-modal.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { SearchService } from '../../service/search.service';
import { LayoutSettingService } from '../layout-setting.service';
import { LanguageService } from '../../Core/service/language.service';
import { ProductDrawerComponent } from './product-drawer/product-drawer.component';
import { DrawerConfig, DrawerService } from '../../Core/service/Drawer/drawer.service';

interface Language {
  id: string;
  flag: string;
  name: string;
}

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    LucideAngularModule,
    DomixDropdownModule,
    SimplebarAngularModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  scrolled: boolean = false;
  
  // El DevBadge de Colibrihub maneja toda la autenticación

  languageData: any = {};
  currantLayout!: string;
  settings!: {
    mode: string;
    sidebarSize: string;
  }

  constructor(
    private modalService: ModalService,
    private searchService: SearchService,
    private settingService: LayoutSettingService,
    public languageService: LanguageService,
    public drawerService: DrawerService
  ) {
    this.settingService.settings$.subscribe((settings) => {
      this.settings = settings;
    });
  }

  ngOnInit(): void { }

  setSidebar() {
    if (this.isMobile) {
      // On mobile always set sidebar size to large
      this.settingService.updateSettings({ sidebarSize: 'large' });
    } else {
      // On desktop toggle between small and large
      this.settingService.updateSettings({ sidebarSize: this.settings.sidebarSize === 'small' ? 'large' : 'small' });
    }

    this.settingService.toggleSidebar();
  }

  isMobile: boolean = window.innerWidth < 1024;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 1024;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.scrolled = scrollTop > 50;
  }

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchService.setSearchQuery(input.value);
  }

  openToolsModal() {
    this.modalService.open(ToolsAppsModalComponent);
  }
  openSettingsModal() {
    this.modalService.open(SettingsModalComponent);
  }
  toggleDarkMode() {
    const mode = this.settings.mode === 'dark' ? 'light' : 'dark'

    this.settingService.updateSettings({ mode: mode });
  }

  setLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }

  openDrawer(po: 'end' | 'start' | 'top' | 'bottom' = 'bottom') {
    const config: DrawerConfig = {
      title: 'My Cart',
      content: '',
      position: po,
    };

    this.drawerService.open(ProductDrawerComponent, config);
  }

  /**
   * 🚪 Cerrar sesión del usuario
   * El DevBadge de Colibrihub maneja el logout automáticamente
   */
  logout(): void {
    console.log('🚪 Logout manejado por DevBadge de Colibrihub');
    // El DevBadge maneja todo el proceso de logout
  }

  /**
   * 🔍 Verificar si el usuario está autenticado
   * El DevBadge de Colibrihub maneja el estado de autenticación
   */
  isLoggedIn(): boolean {
    // El DevBadge maneja el estado de autenticación
    return true; // El DevBadge se encarga de mostrar/ocultar elementos según autenticación
  }
}
