import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LucideAngularModule } from 'lucide-angular';
import { DomixDropdownModule } from '../../../module/domix dropdown/domix-dropdown.module';

@Component({
    selector: 'app-pages-user-documents',
    imports: [LucideAngularModule, RouterLink, DomixDropdownModule],
    templateUrl: './pages-user-documents.component.html',
    styleUrl: './pages-user-documents.component.scss'
})
export class PagesUserDocumentsComponent {}
