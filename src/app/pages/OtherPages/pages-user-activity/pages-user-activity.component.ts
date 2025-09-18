import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-pages-user-activity',
    imports: [LucideAngularModule, RouterLink],
    templateUrl: './pages-user-activity.component.html',
    styleUrl: './pages-user-activity.component.scss'
})
export class PagesUserActivityComponent  {}
