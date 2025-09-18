import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-auth-two-step-verification-basic',
    imports: [ReactiveFormsModule, LucideAngularModule],
    templateUrl: './auth-two-step-verification-basic.component.html',
    styleUrl: './auth-two-step-verification-basic.component.scss'
})
export class AuthTwoStepVerificationBasicComponent  implements OnInit {
  otpForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.otpForm = this.fb.group({
      otp1: ['', [Validators.required, Validators.pattern('\\d')]],
      otp2: ['', [Validators.required, Validators.pattern('\\d')]],
      otp3: ['', [Validators.required, Validators.pattern('\\d')]],
      otp4: ['', [Validators.required, Validators.pattern('\\d')]],
      otp5: ['', [Validators.required, Validators.pattern('\\d')]],
      otp6: ['', [Validators.required, Validators.pattern('\\d')]],
    });
  }

  moveFocus(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && index < 6) {
      (document.querySelectorAll('input')[index] as HTMLInputElement).focus();
    }
  }

  onSubmit(): void {
    if (this.otpForm.valid) {
      // Navigate to the reset password page
      this.router.navigate(['/auth-reset-password-basic']);
    }
  }
}
