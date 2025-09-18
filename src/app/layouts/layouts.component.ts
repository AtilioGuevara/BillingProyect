import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { LayoutSettingService } from './layout-setting.service';

@Component({
    selector: 'app-layouts',
    imports: [
        NavbarComponent,
        SidebarComponent,
        RouterOutlet,
        FooterComponent,
    ],
    templateUrl: './layouts.component.html',
    styleUrl: './layouts.component.scss'
})
export class LayoutsComponent {

  userData = {}

  ngOnInit(){
  }
}
