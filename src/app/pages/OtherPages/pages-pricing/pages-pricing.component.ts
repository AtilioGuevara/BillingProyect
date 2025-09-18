import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';


@Component({
    selector: 'app-pages-pricing',
    imports: [PageTitleComponent, LucideAngularModule],
    templateUrl: './pages-pricing.component.html',
    styleUrl: './pages-pricing.component.scss'
})
export class PagesPricingComponent  {}
