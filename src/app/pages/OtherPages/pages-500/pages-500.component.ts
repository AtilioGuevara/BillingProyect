import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-pages-500',
    imports: [RouterLink, LucideAngularModule, LucideAngularModule],
    templateUrl: './pages-500.component.html',
    styleUrl: './pages-500.component.scss'
})
export class Pages500Component {}
