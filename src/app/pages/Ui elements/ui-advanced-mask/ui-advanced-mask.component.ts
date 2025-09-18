import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-ui-advanced-mask',
  imports: [PageTitleComponent, NgxMaskDirective],
  templateUrl: './ui-advanced-mask.component.html',
  styleUrl: './ui-advanced-mask.component.scss'
})
export class UiAdvancedMaskComponent {
  getDynamicMask(input: string): string {
    return input.startsWith('34') || input.startsWith('37') ? '0000 000000 00000' : '0000 0000 0000 0000';
  }

  moneyMask = 'separator.2';
  moneyMaskComma = 'separator.2,';
  moneyMaskWithSpace = 'separator.2. ';
  moneyMaskPrecision = 'separator.4';
}
