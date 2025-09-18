import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-page-title',
    imports: [CommonModule],
    templateUrl: './page-title.component.html',
    styleUrl: './page-title.component.scss'
})
export class PageTitleComponent {
  @Input() Title: string | undefined;
  @Input() pageTitle: string | undefined;
}
