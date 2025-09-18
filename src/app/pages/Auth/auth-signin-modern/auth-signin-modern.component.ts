import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-auth-signin-modern',
    imports: [ReactiveFormsModule, CommonModule, LucideAngularModule, RouterLink],
    templateUrl: './auth-signin-modern.component.html',
    styleUrl: './auth-signin-modern.component.scss'
})
export class AuthSigninModernComponent {
  signInForm: FormGroup;
  showPassword = false;
  alert = {
    isVisible: false,
    type: '',
    message: '',
  };

  private predefinedEmail = 'admin@SRBThemes.com';
  private predefinedPassword = 'admin@123';

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize the form with pre-filled values
    this.signInForm = this.fb.group({
      emailOrUsername: [this.predefinedEmail, Validators.required],
      password: [this.predefinedPassword, Validators.required],
      rememberMe: [false],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    const emailOrUsername = this.signInForm.get('emailOrUsername')?.value;
    const password = this.signInForm.get('password')?.value;

    if (this.signInForm.valid) {
      if (
        emailOrUsername === this.predefinedEmail &&
        password === this.predefinedPassword
      ) {
        // Successful login
        this.alert.isVisible = true;
        this.alert.type =
          'relative py-3 text-sm rounded-md ltr:pl-5 rtl:pr-5 ltr:pr-7 rtl:pl-7 bg-green-100 text-green-500';
        this.alert.message = 'Login successful! Redirecting...';

        // Redirect to another page after a short delay
        setTimeout(() => {
          this.router.navigate(['/']); // Change this to the desired route
        }, 1000);
      } else {
        // Show an error alert
        this.alert.isVisible = true;
        this.alert.type =
          'relative py-3 text-sm rounded-md ltr:pl-5 rtl:pr-5 ltr:pr-7 rtl:pl-7 bg-red-100 text-red-500';
        this.alert.message = 'Invalid email or password. Please try again.';
      }
    } else {
      // Show an error alert if form is not valid
      this.alert.isVisible = true;
      this.alert.type =
        'relative py-3 text-sm rounded-md ltr:pl-5 rtl:pr-5 ltr:pr-7 rtl:pl-7 bg-red-100 text-red-500';
      this.alert.message = 'Please fill in all required fields.';
    }
  }
}
