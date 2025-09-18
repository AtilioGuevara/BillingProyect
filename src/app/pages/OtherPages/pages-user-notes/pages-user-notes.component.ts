import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { DomixTooltipModule } from '../../../module/domix tooltip/domix-tooltip.module';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-pages-user-notes',
    imports: [LucideAngularModule, DomixTooltipModule, RouterLink],
    templateUrl: './pages-user-notes.component.html',
    styleUrl: './pages-user-notes.component.scss'
})
export class PagesUserNotesComponent {}
