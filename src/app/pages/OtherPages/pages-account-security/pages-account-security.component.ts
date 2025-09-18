import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-pages-account-security',
    imports: [LucideAngularModule, RouterLink, CommonModule],
    templateUrl: './pages-account-security.component.html',
    styleUrl: './pages-account-security.component.scss'
})
export class PagesAccountSecurityComponent {
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  toggleCurrentPasswordVisibility() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
