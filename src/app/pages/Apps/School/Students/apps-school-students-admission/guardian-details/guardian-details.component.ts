import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-guardian-details',
    imports: [FormsModule, LucideAngularModule],
    templateUrl: './guardian-details.component.html',
    styleUrl: './guardian-details.component.scss'
})
export class GuardianDetailsComponent {
  guardianForm = {
    fatherName: '',
    motherName: '',
    otherRelativeName: '',
    mobileNumber: '',
    alternativeMobileNumber: '',
  };

  @Output() stepChange = new EventEmitter<number>();

  onSubmit() {
    // Validate and save guardian details
    this.stepChange.emit(3); // Move to the next step
  }

  previousStep() {
    this.stepChange.emit(1); // Move to the previous step
  }
}
