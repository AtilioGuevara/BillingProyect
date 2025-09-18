import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-application-overview',
    imports: [LucideAngularModule, FormsModule],
    templateUrl: './application-overview.component.html',
    styleUrl: './application-overview.component.scss'
})
export class ApplicationOverviewComponent {
  @Input() personalDetails: any;
  @Input() guardianDetails: any;
  @Input() educationalBackground: any;
  @Input() documents: any;
  referenceNumber: string | null = null;

  @Output() previousStep = new EventEmitter<void>();

  onSubmit() {
    // Final submission logic
    // console.log('Application submitted');
  }

  onPreviousStep() {
    this.previousStep.emit();
  }
}
