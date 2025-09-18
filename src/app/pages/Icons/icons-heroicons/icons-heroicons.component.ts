import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import * as Prism from 'prismjs';

@Component({
    selector: 'app-icons-heroicons',
    imports: [PageTitleComponent],
    templateUrl: './icons-heroicons.component.html',
    styleUrl: './icons-heroicons.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IconsHeroiconsComponent {
  codeSnippet1: string = `<svg class="h-6 w-6 text-gray-500 dark:text-dark-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2>
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>`;
  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
