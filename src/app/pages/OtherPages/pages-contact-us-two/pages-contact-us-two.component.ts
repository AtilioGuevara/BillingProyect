import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-pages-contact-us-two',
    imports: [LucideAngularModule, RouterLink],
    templateUrl: './pages-contact-us-two.component.html',
    styleUrl: './pages-contact-us-two.component.scss'
})
export class PagesContactUsTwoComponent  {}
