import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';

import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-ui-cookie',
    imports: [PageTitleComponent, CommonModule, LucideAngularModule],
    templateUrl: './ui-cookie.component.html',
    styleUrl: './ui-cookie.component.scss'
})
export class UiCookieComponent  {

  isOpen=true
  isOpen1=true
  isOpen2=true
  isOpen3=true

}
