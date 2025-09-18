import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import * as Prism from 'prismjs';

@Component({
    selector: 'app-icons-remix',
    imports: [PageTitleComponent],
    templateUrl: './icons-remix.component.html',
    styleUrl: './icons-remix.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IconsRemixComponent {
  codeSnippet1: string = `npm install remixicon --save`;
  codeSnippet2: string = `@import 'remixicon/fonts/remixicon.css';`;
  codeSnippet3: string = `<link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />`;
  codeSnippet4: string = `<i class="ri-admin-line"></i>\n<i class="ri-admin-fill"></i>`;

  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
