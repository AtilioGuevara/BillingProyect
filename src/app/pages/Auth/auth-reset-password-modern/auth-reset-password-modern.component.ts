import { Component } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-auth-reset-password-modern',
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        LucideAngularModule,
        RouterLink,
    ],
    templateUrl: './auth-reset-password-modern.component.html',
    styleUrl: './auth-reset-password-modern.component.scss'
})
export class AuthResetPasswordModernComponent  {
  passwordForm: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      // Handle password setting logic here (e.g., API call)
      // On success, navigate to the desired route
      this.router
        .navigate(['/auth-successful-password-modern'])
        .catch((err) => console.error('Navigation error:', err));
    }
  }
}
