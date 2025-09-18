import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-personal-details',
    imports: [FormsModule, ReactiveFormsModule, LucideAngularModule],
    templateUrl: './personal-details.component.html',
    styleUrl: './personal-details.component.scss'
})
export class PersonalDetailsComponent {
  personalDetailsForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  @Output() stepChange = new EventEmitter<number>();

  ngOnInit(): void {
    this.personalDetailsForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      dateOfBirth: [''],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      alternativeMobileNumber: [''],
      emailID: ['', [Validators.required, Validators.email]],
      nationality: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      pinCode: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.personalDetailsForm.valid) {
      // console.log(this.personalDetailsForm.value);
      // Handle form submission
    } else {
      // console.log('Form is invalid');
    }
  }

  onPrevious() {
    this.stepChange.emit(2); // Move to the previous step
  }
}
