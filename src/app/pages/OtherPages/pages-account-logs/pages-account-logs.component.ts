import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { DomixDropdownModule } from '../../../module/domix dropdown/domix-dropdown.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-pages-account-logs',
    imports: [
        LucideAngularModule,
        DomixDropdownModule,
        FormsModule,
        CommonModule,
        RouterLink,
    ],
    templateUrl: './pages-account-logs.component.html',
    styleUrl: './pages-account-logs.component.scss'
})
export class PagesAccountLogsComponent {}
