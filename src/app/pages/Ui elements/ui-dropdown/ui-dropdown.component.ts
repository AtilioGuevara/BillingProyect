import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { DomixDropdownModule } from '../../../module/domix dropdown/domix-dropdown.module';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-ui-dropdown',
    imports: [
        PageTitleComponent,
        CommonModule,
        DomixDropdownModule,
        LucideAngularModule,
    ],
    templateUrl: './ui-dropdown.component.html',
    styleUrl: './ui-dropdown.component.scss'
})
export class UiDropdownComponent {}
