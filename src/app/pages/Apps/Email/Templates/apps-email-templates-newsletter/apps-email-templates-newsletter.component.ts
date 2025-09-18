import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../../layouts/page-title/page-title.component';
import { FooterComponent } from '../../../../../layouts/footer/footer.component';
import { NavbarComponent } from '../../../../../layouts/navbar/navbar.component';
import { SidebarComponent } from '../../../../../layouts/sidebar/sidebar.component';

@Component({
    selector: 'app-apps-email-templates-newsletter',
    imports: [PageTitleComponent, FooterComponent, NavbarComponent, SidebarComponent],
    templateUrl: './apps-email-templates-newsletter.component.html',
    styleUrl: './apps-email-templates-newsletter.component.scss'
})
export class AppsEmailTemplatesNewsletterComponent {

}
