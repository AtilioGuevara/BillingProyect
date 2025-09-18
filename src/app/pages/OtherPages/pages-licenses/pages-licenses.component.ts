import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';


@Component({
    selector: 'app-pages-licenses',
    imports: [PageTitleComponent, LucideAngularModule],
    templateUrl: './pages-licenses.component.html',
    styleUrl: './pages-licenses.component.scss'
})
export class PagesLicensesComponent  {}
