import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import * as Prism from 'prismjs';

@Component({
    selector: 'app-icons-boxicon',
    imports: [PageTitleComponent],
    templateUrl: './icons-boxicon.component.html',
    styleUrl: './icons-boxicon.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IconsBoxiconComponent {

  codeSnippet1: string = `npm install boxicons --save`;
  codeSnippet2: string = `@import 'boxicons';';`;
  codeSnippet3: string = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">

<!-- or -->

<link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css">`;
  codeSnippet4: string = `<i class="bx bx-hot"></i>
<i class="bx bxs-hot"></i>
<i class="bx bxl-facebook-square"></i>`;

  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
