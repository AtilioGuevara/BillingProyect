import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import * as Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';

import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-icons-lucide',
    imports: [PageTitleComponent, LucideAngularModule],
    templateUrl: './icons-lucide.component.html',
    styleUrl: './icons-lucide.component.scss'
})
export class IconsLucideComponent {
  codeSnippet1: string = `npm i lucide-angular`;
  codeSnippet2: string = `<!-- Import This module -->
import LucideAngularModule;

<!-- Extend this component -->
import LucideIconsComponent  from lucide/angular;
export class CustomIconComponent
Call super on constructor

<!-- Usage -->
<lucide-angular name="'eye'" class="inline-block ltr:mr-1 rtl:ml-1 size-4"></lucide-angular>
                                      `;

  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
