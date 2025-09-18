import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-auth-forgot-password-creative',
    imports: [RouterLink, LucideAngularModule],
    templateUrl: './auth-forgot-password-creative.component.html',
    styleUrl: './auth-forgot-password-creative.component.scss'
})
export class AuthForgotPasswordCreativeComponent {}
