import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileStepComponent } from './profile-step/profile-step.component';
import { PasswordStepComponent } from './password-step/password-step.component';
import { CompleteStepComponent } from './complete-step/complete-step.component';
import { AdditionalInfoStepComponent } from './additional-info-step/additional-info-step.component';

import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-form-wizard-basic',
    imports: [LucideAngularModule, PageTitleComponent, CommonModule, FormsModule, ProfileStepComponent, PasswordStepComponent, CompleteStepComponent, AdditionalInfoStepComponent],
    templateUrl: './form-wizard-basic.component.html',
    styleUrl: './form-wizard-basic.component.scss'
})
export class FormWizardBasicComponent  {

  step: any | number | string = 1;
  isFormVailed = false;

  getWidthPercentage(): string {
    return Math.floor(this.step / 3 * 100) + '%';
  }

  prev() {
    if (this.step > 1) {
      this.step = this.step - 1;
    }
  }

  next() {
    if (!this.isFormVailed) {
      return
    }

    if (this.step < 3) {
      this.step = this.step + 1;
    }
  }

  complete() {
    if (!this.isFormVailed) {
      return
    }

    this.step = 'complete';
  }

  currantStepIsVaild(event: any) {
    this.isFormVailed = event
  }


}
