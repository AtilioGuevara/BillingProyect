import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-pages-account-notification',
    imports: [LucideAngularModule, RouterLink],
    templateUrl: './pages-account-notification.component.html',
    styleUrl: './pages-account-notification.component.scss'
})
export class PagesAccountNotificationComponent {}
