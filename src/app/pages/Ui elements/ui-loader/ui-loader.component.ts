import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-ui-loader',
    imports: [PageTitleComponent, LucideAngularModule],
    templateUrl: './ui-loader.component.html',
    styleUrl: './ui-loader.component.scss'
})
export class UiLoaderComponent {}
