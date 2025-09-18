import { Component, ElementRef, ViewChild } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';

@Component({
    selector: 'app-form-autosize',
    imports: [PageTitleComponent],
    templateUrl: './form-autosize.component.html',
    styleUrl: './form-autosize.component.scss'
})
export class FormAutosizeComponent {

  @ViewChild('container') container!: ElementRef;
  @ViewChild('textarea') textarea!: ElementRef;
  charCount: number = 0;

  ngAfterViewInit(): void {
    this.resizeObserver();
    this.updateCharCount(this.textarea.nativeElement);
  }

  updateTextarea(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.resizeTextarea(textarea);
    this.updateCharCount(textarea);
  }

  resizeTextarea(el: HTMLTextAreaElement): void {
    el.style.height = 'auto';
    el.style.height = (el.scrollHeight + 4) + 'px';
  }

  updateCharCount(el: HTMLTextAreaElement): void {
    this.charCount = el.value.length;
  }

  resizeObserver(): void {
    const observer = new ResizeObserver(() => {
      this.resizeTextarea(this.textarea.nativeElement);
    });
    observer.observe(this.container.nativeElement);
  }

}
