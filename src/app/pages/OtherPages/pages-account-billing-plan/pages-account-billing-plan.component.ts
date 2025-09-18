import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-pages-account-billing-plan',
    imports: [FormsModule, CommonModule, LucideAngularModule, RouterLink],
    templateUrl: './pages-account-billing-plan.component.html',
    styleUrl: './pages-account-billing-plan.component.scss'
})
export class PagesAccountBillingPlanComponent {
  defaultCard: number | null = null;

  setDefaultCard(cardNumber: number): void {
    this.defaultCard = this.defaultCard === cardNumber ? null : cardNumber;
  }
}
