import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-form-checkbox-radio',
    imports: [PageTitleComponent, LucideAngularModule],
    templateUrl: './form-checkbox-radio.component.html',
    styleUrl: './form-checkbox-radio.component.scss'
})
export class FormCheckboxRadioComponent {}
