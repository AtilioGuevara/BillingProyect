import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-form-basic-input',
    imports: [PageTitleComponent, CommonModule, LucideAngularModule],
    templateUrl: './form-basic-input.component.html',
    styleUrl: './form-basic-input.component.scss'
})
export class FormBasicInputComponent {
  show: boolean = false;

  toggleVisibility() {
    this.show = !this.show;
  }
}
