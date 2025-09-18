import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';

import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-ui-timeline',
    imports: [PageTitleComponent, LucideAngularModule],
    templateUrl: './ui-timeline.component.html',
    styleUrl: './ui-timeline.component.scss'
})
export class UiTimelineComponent  {

}
