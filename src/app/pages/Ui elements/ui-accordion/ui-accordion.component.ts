import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { DomixAccordionModule } from '../../../module/domix accordion/domix-accordion.module';

import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-ui-accordion',
    imports: [PageTitleComponent, DomixAccordionModule, LucideAngularModule],
    templateUrl: './ui-accordion.component.html',
    styleUrl: './ui-accordion.component.scss'
})
export class UiAccordionComponent  {

}
