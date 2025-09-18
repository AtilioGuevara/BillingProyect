import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-additional-info-step',
    imports: [FormsModule, CommonModule, ReactiveFormsModule],
    templateUrl: './additional-info-step.component.html',
    styleUrl: './additional-info-step.component.scss'
})
export class AdditionalInfoStepComponent {
  formGroup: FormGroup;
  constructor(public fb: FormBuilder) {
    this.formGroup = this.fb.group({
      gender: ['', Validators.required],
      profession: ['', Validators.required]
    })
  }
  @Output() currantStepIsVaild = new EventEmitter<any>();


  ngOnInit() {
    this.currantStepIsVaild.emit(false);
    this.formGroup.valueChanges.subscribe(data => {
      this.currantStepIsVaild.emit(this.formGroup.valid);
    });
  }
}
