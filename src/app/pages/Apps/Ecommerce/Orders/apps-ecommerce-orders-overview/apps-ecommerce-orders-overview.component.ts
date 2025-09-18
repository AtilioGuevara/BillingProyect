import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-apps-ecommerce-orders-overview',
    imports: [PageTitleComponent, LucideAngularModule, RouterLink],
    templateUrl: './apps-ecommerce-orders-overview.component.html',
    styleUrl: './apps-ecommerce-orders-overview.component.scss'
})
export class AppsEcommerceOrdersOverviewComponent {}
