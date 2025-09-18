import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CountUpModule } from 'ngx-countup';
import { LucideAngularModule } from 'lucide-angular';
import { DomixDropdownModule } from '../../../module/domix dropdown/domix-dropdown.module';
import { SimplebarAngularModule } from 'simplebar-angular';

@Component({
    selector: 'app-widgets-cards',
    imports: [
        PageTitleComponent,
        CountUpModule,
        LucideAngularModule,
        DomixDropdownModule,
        SimplebarAngularModule,
    ],
    templateUrl: './widgets-cards.component.html',
    styleUrl: './widgets-cards.component.scss'
})
export class WidgetsCardsComponent {
  options = { autoHide: true };
}
