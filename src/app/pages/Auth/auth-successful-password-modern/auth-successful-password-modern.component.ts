import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-auth-successful-password-modern',
    imports: [LucideAngularModule, RouterLink],
    templateUrl: './auth-successful-password-modern.component.html',
    styleUrl: './auth-successful-password-modern.component.scss'
})
export class AuthSuccessfulPasswordModernComponent {}
