import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';


@Component({
    selector: 'app-pages-account-settings',
    imports: [LucideAngularModule, RouterLink],
    templateUrl: './pages-account-settings.component.html',
    styleUrl: './pages-account-settings.component.scss'
})
export class PagesAccountSettingsComponent  {

}
