import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';

import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-ui-pagination',
    imports: [PageTitleComponent, LucideAngularModule],
    templateUrl: './ui-pagination.component.html',
    styleUrl: './ui-pagination.component.scss'
})
export class UiPaginationComponent  {

}
