import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-form-file-input',
    imports: [PageTitleComponent, CommonModule, LucideAngularModule],
    templateUrl: './form-file-input.component.html',
    styleUrl: './form-file-input.component.scss'
})
export class FormFileInputComponent {
  imageUrl: string | ArrayBuffer | null = null;

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imageUrl = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }
}
