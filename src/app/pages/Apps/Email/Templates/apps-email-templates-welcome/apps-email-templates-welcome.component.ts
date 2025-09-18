import { Component } from '@angular/core';
import { SidebarComponent } from '../../../../../layouts/sidebar/sidebar.component';
import { NavbarComponent } from '../../../../../layouts/navbar/navbar.component';
import { FooterComponent } from '../../../../../layouts/footer/footer.component';
import { PageTitleComponent } from '../../../../../layouts/page-title/page-title.component';

@Component({
    selector: 'app-apps-email-templates-welcome',
    imports: [PageTitleComponent, FooterComponent, NavbarComponent, SidebarComponent],
    templateUrl: './apps-email-templates-welcome.component.html',
    styleUrl: './apps-email-templates-welcome.component.scss'
})
export class AppsEmailTemplatesWelcomeComponent {

}
