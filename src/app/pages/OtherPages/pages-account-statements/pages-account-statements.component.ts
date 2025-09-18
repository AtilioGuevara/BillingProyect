import { Component } from '@angular/core';

import { LucideAngularModule } from 'lucide-angular';
import { DomixDropdownModule } from '../../../module/domix dropdown/domix-dropdown.module';
import { BillingRecord, BILLS } from '../../../Data/billing-data';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-pages-account-statements',
    imports: [LucideAngularModule, DomixDropdownModule, CommonModule, RouterLink],
    templateUrl: './pages-account-statements.component.html',
    styleUrls: ['./pages-account-statements.component.scss']
})
export class PagesAccountStatementsComponent {
  billingData: BillingRecord[] = [];
  displayedProducts: BillingRecord[] = [];
  sortBy: keyof BillingRecord | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  itemsPerPage = 10;

  ngOnInit(): void {
    this.billingData = BILLS;
    this.updateDisplayedProducts();
  }

  sort(column: keyof BillingRecord): void {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'asc';
    }

    this.displayedProducts.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.billingData.length / this.itemsPerPage);
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  gotoPage(page: number): void {
    this.currentPage = page;
    this.updateDisplayedProducts();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.gotoPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.gotoPage(this.currentPage + 1);
    }
  }

  get showingStart(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get showingEnd(): number {
    return Math.min(
      this.currentPage * this.itemsPerPage,
      this.billingData.length
    );
  }

  private updateDisplayedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedProducts = this.billingData.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }
}
