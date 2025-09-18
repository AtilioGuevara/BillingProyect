import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-educational-background',
    imports: [FormsModule, LucideAngularModule],
    templateUrl: './educational-background.component.html',
    styleUrl: './educational-background.component.scss'
})
export class EducationalBackgroundComponent {
  educationForm = {
    highSchoolName: '',
    graduationYear: '',
    gpa: '',
    majorFocus: '',
    instituteName: '',
    underGraduationYear: '',
    underGpa: '',
    underMajorFocus: '',
    honorsAwards: '',
    extracurricularActivities: '',
    leadershipRoles: '',
    publicationsResearch: '',
  };

  @Output() stepChange = new EventEmitter<number>();

  onSubmit() {
    // Validate and save educational background details
    this.stepChange.emit(4); // Move to the next step
  }

  previousStep() {
    this.stepChange.emit(2); // Move to the previous step
  }
}
