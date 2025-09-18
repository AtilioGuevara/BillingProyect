import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-ui-links',
    imports: [PageTitleComponent, LucideAngularModule],
    templateUrl: './ui-links.component.html',
    styleUrl: './ui-links.component.scss'
})
export class UiLinksComponent {}
