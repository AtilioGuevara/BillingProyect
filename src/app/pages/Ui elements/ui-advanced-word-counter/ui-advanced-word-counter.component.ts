import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-ui-advanced-word-counter',
    imports: [PageTitleComponent, FormsModule],
    templateUrl: './ui-advanced-word-counter.component.html',
    styleUrl: './ui-advanced-word-counter.component.scss'
})
export class UiAdvancedWordCounterComponent {
  search: string = "let's try this";
  wordCount: number = 0;
  charCount: number = 0;

  constructor() {
    this.countWords();
    this.countChars();
  }

  countWords(): void {
    this.wordCount = this.search.trim().split(/\s+/).length;
  }

  countChars(): void {
    this.charCount = this.search.replace(/\s+/g, '').length;
  }

  onInputChange(): void {
    this.countWords();
    this.countChars();
  }
}
