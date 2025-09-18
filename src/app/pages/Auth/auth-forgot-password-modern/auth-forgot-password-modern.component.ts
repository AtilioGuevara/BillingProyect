import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-auth-forgot-password-modern',
    imports: [RouterLink, LucideAngularModule],
    templateUrl: './auth-forgot-password-modern.component.html',
    styleUrl: './auth-forgot-password-modern.component.scss'
})
export class AuthForgotPasswordModernComponent {}
