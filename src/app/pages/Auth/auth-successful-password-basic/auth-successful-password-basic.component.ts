import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-auth-successful-password-basic',
    imports: [LucideAngularModule, RouterLink],
    templateUrl: './auth-successful-password-basic.component.html',
    styleUrl: './auth-successful-password-basic.component.scss'
})
export class AuthSuccessfulPasswordBasicComponent {}
