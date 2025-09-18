import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { DrawerConfig, DrawerService } from '../../../Core/service/Drawer/drawer.service';
import { DrawerContentComponent } from './drawer-content/drawer-content.component';
import { pointInsideRect } from '@fullcalendar/core/internal';
import { SmallDrawerComponent } from './small-drawer/small-drawer.component';
import { HalfScreenDrawerComponent } from './half-screen-drawer/half-screen-drawer.component';
import { LargeDrawerComponent } from './large-drawer/large-drawer.component';

@Component({
    selector: 'app-ui-drawer',
    imports: [PageTitleComponent],
    templateUrl: './ui-drawer.component.html',
    styleUrl: './ui-drawer.component.scss'
})
export class UiDrawerComponent {

  constructor(public drawerService: DrawerService) { }

  openDrawer(po: 'end' | 'start' | 'top' | 'bottom' = 'bottom') {
    const config: DrawerConfig = {
      title: 'My Drawer',
      content: 'This is the content of the drawer.',
      position: po,
      footer: true
    };

    this.drawerService.open(DrawerContentComponent, config);
  }
  openDrawersmallDrawer() {
    const config: DrawerConfig = {

    };

    this.drawerService.open(SmallDrawerComponent, config);
  }
  openDrawerlargeDrawer() {
    const config: DrawerConfig = {
    };

    this.drawerService.open(LargeDrawerComponent, config);
  }
  openDrawerhalfScreenDrawer() {
    const config: DrawerConfig = {

    };

    this.drawerService.open(HalfScreenDrawerComponent, config);
  }
}
