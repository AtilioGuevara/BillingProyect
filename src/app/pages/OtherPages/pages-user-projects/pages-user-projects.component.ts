import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { DomixDropdownModule } from '../../../module/domix dropdown/domix-dropdown.module';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-pages-user-projects',
    imports: [LucideAngularModule, DomixDropdownModule, RouterLink],
    templateUrl: './pages-user-projects.component.html',
    styleUrl: './pages-user-projects.component.scss'
})
export class PagesUserProjectsComponent {}
