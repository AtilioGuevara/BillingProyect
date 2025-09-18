import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-documents',
    imports: [FormsModule, LucideAngularModule, CommonModule],
    templateUrl: './documents.component.html',
    styleUrl: './documents.component.scss'
})
export class DocumentsComponent {
  passportImageUrl: string | null = null;
  transcriptImageUrl: string | null = null;
  passportError: string | null = null;
  transcriptError: string | null = null;

  @Output() stepChange = new EventEmitter<number>();

  handleFileChosen(type: string, event: any) {
    const file = event.target.files[0];
    if (type === 'passportPhoto') {
      this.passportImageUrl = URL.createObjectURL(file);
    } else if (type === 'transcript') {
      this.transcriptImageUrl = URL.createObjectURL(file);
    }
  }

  onSubmit() {
    // Validate and save document details
    this.stepChange.emit(5); // Move to the next step
  }

  onPrevious() {
    this.stepChange.emit(3); // Move to the previous step
  }
}
