import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-auth-signup-basic',
    imports: [ReactiveFormsModule, CommonModule, LucideAngularModule, RouterLink],
    templateUrl: './auth-signup-basic.component.html',
    styleUrl: './auth-signup-basic.component.scss'
})
export class AuthSignupBasicComponent implements OnInit {
  signUpForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(private fb: FormBuilder) {
    this.signUpForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        terms: [false, Validators.requiredTrue],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  ngOnInit(): void {}

  // Custom validator for matching passwords
  passwordsMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { mismatch: true };
    }
    return null;
  };

  validateField(fieldName: string): boolean {
    const field = this.signUpForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.signUpForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'This field is required';
    }
    if (field?.hasError('email')) {
      return 'Enter a valid email';
    }
    if (field?.hasError('minlength')) {
      return 'Password must be at least 6 characters long';
    }
    if (fieldName === 'confirmPassword' && field?.hasError('mismatch')) {
      return 'Passwords do not match';
    }
    return '';
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      // Handle form submission logic here
      // console.log('Form Submitted', this.signUpForm.value);
    } else {
      // Mark all fields as touched to trigger validation
      this.signUpForm.markAllAsTouched();
    }
  }
}
