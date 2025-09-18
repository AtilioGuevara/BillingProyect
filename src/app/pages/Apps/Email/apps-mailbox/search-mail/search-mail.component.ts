import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-search-mail',
    imports: [FormsModule, CommonModule, LucideAngularModule],
    templateUrl: './search-mail.component.html',
    styleUrl: './search-mail.component.scss'
})
export class SearchMailComponent {
  searchTerms: string = '';

  badges = [
    { label: 'Chat Management', isVisible: true },
    { label: 'Projects Discuss', isVisible: true },
    { label: 'Subscriber', isVisible: true },
    { label: 'Reports', isVisible: true }
  ];

  removeBadge(badge: any) {
    badge.isVisible = false;
  }
}
