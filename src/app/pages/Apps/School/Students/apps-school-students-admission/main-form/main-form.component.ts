import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GuardianDetailsComponent } from '../guardian-details/guardian-details.component';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';
import { EducationalBackgroundComponent } from '../educational-background/educational-background.component';
import { ApplicationOverviewComponent } from '../application-overview/application-overview.component';
import { DocumentsComponent } from '../documents/documents.component';

@Component({
    selector: 'app-main-form',
    imports: [
        CommonModule,
        GuardianDetailsComponent,
        PersonalDetailsComponent,
        EducationalBackgroundComponent,
        ApplicationOverviewComponent,
        DocumentsComponent,
    ],
    templateUrl: './main-form.component.html',
    styleUrl: './main-form.component.scss'
})
export class MainFormComponent {
  currentStep = 1; // Track the current step in the multi-step form

  // Method to handle step changes
  onStepChange(step: number) {
    this.currentStep = step;
  }
}
