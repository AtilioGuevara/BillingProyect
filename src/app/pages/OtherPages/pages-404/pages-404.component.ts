import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-pages-404',
    imports: [RouterLink, LucideAngularModule, LucideAngularModule],
    templateUrl: './pages-404.component.html',
    styleUrl: './pages-404.component.scss'
})
export class Pages404Component {}
