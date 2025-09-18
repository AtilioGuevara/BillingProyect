import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-complete-step',
    imports: [LucideAngularModule],
    templateUrl: './complete-step.component.html',
    styleUrl: './complete-step.component.scss'
})
export class CompleteStepComponent {

  resetForm() {
    // Logic to navigate or reset form
  }
}
