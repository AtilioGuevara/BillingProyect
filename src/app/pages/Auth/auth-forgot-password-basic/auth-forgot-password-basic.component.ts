import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-auth-forgot-password-basic',
    imports: [RouterLink, LucideAngularModule],
    templateUrl: './auth-forgot-password-basic.component.html',
    styleUrl: './auth-forgot-password-basic.component.scss'
})
export class AuthForgotPasswordBasicComponent {}
