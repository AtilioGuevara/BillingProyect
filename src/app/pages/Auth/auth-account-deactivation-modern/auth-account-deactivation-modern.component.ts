import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-auth-account-deactivation-modern',
    imports: [RouterLink, LucideAngularModule],
    templateUrl: './auth-account-deactivation-modern.component.html',
    styleUrl: './auth-account-deactivation-modern.component.scss'
})
export class AuthAccountDeactivationModernComponent {}
