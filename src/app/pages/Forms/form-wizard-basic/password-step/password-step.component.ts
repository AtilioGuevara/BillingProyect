import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
    selector: 'app-password-step',
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './password-step.component.html',
    styleUrl: './password-step.component.scss'
})
export class PasswordStepComponent {
  
  @Output() currantStepIsVaild = new EventEmitter<any>();

  passwordForm: FormGroup;
  togglePassword: boolean = false;
  passwordStrengthText: string = '';

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      passwords: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    this.currantStepIsVaild.emit(false);
    this.passwordForm.get('passwords')?.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.passwordStrengthText = this.getPasswordStrength(value);
      this.currantStepIsVaild.emit(this.passwordStrengthText === 'Strong password' ? true : false);
    });
  }

  getPasswordStrength(password: string): string {
    if (password.length < 8) {
      return 'Too weak';
    } else if (password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*/)) {
      return 'Strong password';
    } else {
      return 'Could be stronger';
    }
  }
}
