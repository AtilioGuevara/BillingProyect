import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-auth-account-deactivation-basic',
    imports: [RouterLink, LucideAngularModule],
    templateUrl: './auth-account-deactivation-basic.component.html',
    styleUrl: './auth-account-deactivation-basic.component.scss'
})
export class AuthAccountDeactivationBasicComponent {}
