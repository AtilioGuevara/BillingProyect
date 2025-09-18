import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';
import * as Prism from 'prismjs';

@Component({
    selector: 'app-icons-line-awesome',
    imports: [PageTitleComponent, LucideAngularModule],
    templateUrl: './icons-line-awesome.component.html',
    styleUrl: './icons-line-awesome.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IconsLineAwesomeComponent {
  codeSnippet1: string = `npm install line-awesome`;
  codeSnippet2: string = `@import '../libs/line-awesome/line-awesome/css/line-awesome.css';`;
  codeSnippet3: string = `<link href="https://maxst.icons8.com/vue-static/landings/line-awesome/font-awesome-line-awesome/css/all.min.css" rel="stylesheet" />`;
  codeSnippet4: string = `<i class="las la-battery-three-quarters"></i>`;

  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
