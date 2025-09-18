import { Component, HostListener, ElementRef } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Comment {
  text: string;
}

interface Note {
  id: number;
  visible: boolean;
  comments: Comment[];
  x?: number;
  y?: number;
}

@Component({
    selector: 'app-ui-advanced-image-annotation',
    imports: [PageTitleComponent, CommonModule, FormsModule],
    templateUrl: './ui-advanced-image-annotation.component.html',
    styleUrls: ['./ui-advanced-image-annotation.component.scss']
})
export class UiAdvancedImageAnnotationComponent {
  notes: Note[] = [
    {
      id: Date.now(),
      visible: true,
      comments: [
        { text: 'Beautiful Fabulous!' },
        { text: 'Nice Awesome Photo!' },
      ],
    }
  ];
  newComment: string = '';
  annotationsVisible: boolean = true;

  constructor(private elementRef: ElementRef) { }

  toggleAnnotations(): void {
    this.annotationsVisible = !this.annotationsVisible;
  }

  toggleNote(note: Note): void {
    note.visible = !note.visible;
  }

  addComment(note: Note): void {
    if (this.newComment.trim()) {
      note.comments.push({ text: this.newComment.trim() });
      this.newComment = '';
    }
  }

  markerStyle(note: Note): { [key: string]: string } {
    return {
      left: `${note.x}px`,
      top: `${note.y}px`
    };
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.annotationsVisible) {
      const rect = (event.target as HTMLImageElement).getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      this.notes.push({ id: Date.now(), visible: false, comments: [], x, y });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Check if the click was outside of the component's element
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.notes.forEach(note => note.visible = false);
    }
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}
