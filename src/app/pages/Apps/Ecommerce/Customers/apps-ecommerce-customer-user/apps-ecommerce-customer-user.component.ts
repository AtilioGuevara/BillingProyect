import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../../layouts/page-title/page-title.component';
import { NavbarComponent } from '../../../../../layouts/navbar/navbar.component';
import { FooterComponent } from '../../../../../layouts/footer/footer.component';
import { SidebarComponent } from '../../../../../layouts/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { DomixTooltipModule } from '../../../../../module/domix tooltip/domix-tooltip.module';

@Component({
    selector: 'app-apps-ecommerce-customer-user',
    imports: [
        NavbarComponent,
        FooterComponent,
        SidebarComponent,
        CommonModule,
        LucideAngularModule,
        RouterLink,
        DomixTooltipModule,
    ],
    templateUrl: './apps-ecommerce-customer-user.component.html',
    styleUrl: './apps-ecommerce-customer-user.component.scss'
})
export class AppsEcommerceCustomerUserComponent {
  loadingButton: boolean = false;
  isActive: boolean = false;

  toggleFollow(): void {
    this.loadingButton = true;
    setTimeout(() => {
      this.loadingButton = false;
      this.isActive = !this.isActive;
    }, 1000);
  }
}
