import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { FormsModule } from '@angular/forms';

import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-form-clipboard',
    imports: [PageTitleComponent, FormsModule, LucideAngularModule],
    templateUrl: './form-clipboard.component.html',
    styleUrl: './form-clipboard.component.scss'
})
export class FormClipboardComponent  {

  public inputText: string = 'https://github.com/zenorocha/clipboard.js.git';
  public textareaText: string = `Utility classes help you work within the constraints of a system instead of littering your stylesheets with arbitrary values. They make it easy to be consistent with color choices, spacing, typography, shadows, and everything else that makes up a well-engineered design system.`;

  copyInputText() {
    const inputElement = document.getElementById('basicClipboard') as HTMLInputElement;
    if (inputElement) {
      inputElement.select();
      document.execCommand('copy');
    }
  }

  copyTextareaText() {
    const textareaElement = document.getElementById('bar') as HTMLTextAreaElement;
    if (textareaElement) {
      textareaElement.select();
      document.execCommand('copy');

      this.textareaText = '';
    }
  }

}
