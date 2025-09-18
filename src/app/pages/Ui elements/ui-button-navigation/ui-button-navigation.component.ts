import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';

import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-ui-button-navigation',
    imports: [PageTitleComponent, LucideAngularModule],
    templateUrl: './ui-button-navigation.component.html',
    styleUrl: './ui-button-navigation.component.scss'
})
export class UiButtonNavigationComponent  {

}
