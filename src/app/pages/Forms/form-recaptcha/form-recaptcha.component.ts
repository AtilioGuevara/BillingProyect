import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

declare var grecaptcha: any; // Add this line to declare 'grecaptcha' globally


@Component({
    selector: 'app-form-recaptcha',
    imports: [PageTitleComponent, CommonModule, ReactiveFormsModule],
    templateUrl: './form-recaptcha.component.html',
    styleUrl: './form-recaptcha.component.scss'
})
export class FormRecaptchaComponent {

  contactForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.emailValidator]],
      message: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.loadReCaptcha();
  }

  loadReCaptcha(): void {
    if (typeof grecaptcha === 'undefined') {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=explicit`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      // Handle form submission
      this.submitted = true;
      // Add further logic here (e.g., sending form data to the server)
    }
  }

  emailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const email = control.value;
    if (email && !email.includes('@')) {
      return { 'emailNotValid': true };
    }
    return null;
  }

}
