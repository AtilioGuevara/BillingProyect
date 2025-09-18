import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { Productdata } from '../../../Data/product-data';
import { Invoice, Product } from '../../../Data/models';
import { invoiceData } from '../../../Data/invoice-data';
import { DomixDropdownModule } from '../../../module/domix dropdown/domix-dropdown.module';

@Component({
    selector: 'app-widgets-data',
    imports: [PageTitleComponent, CommonModule, DomixDropdownModule],
    templateUrl: './widgets-data.component.html',
    styleUrl: './widgets-data.component.scss'
})
export class WidgetsDataComponent {
  products: Product[] = Productdata;
  products2: Invoice[] = invoiceData;

  sortBy: keyof Invoice | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  sort(column: keyof Invoice): void {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'asc';
    }

    this.products2.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
}
