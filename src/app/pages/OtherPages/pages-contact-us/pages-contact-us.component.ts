import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';


@Component({
    selector: 'app-pages-contact-us',
    imports: [LucideAngularModule, RouterLink],
    templateUrl: './pages-contact-us.component.html',
    styleUrl: './pages-contact-us.component.scss'
})
export class PagesContactUsComponent {

}
