import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { PagePricingListComponent } from './page-pricing-list/page-pricing-list.component';
import { LucideAngularModule } from 'lucide-angular';

import { DomixDropdownModule } from '../../../module/domix dropdown/domix-dropdown.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pages-pricing-admin',
    imports: [
        PageTitleComponent,
        PagePricingListComponent,
        LucideAngularModule,
        DomixDropdownModule,
        CommonModule,
    ],
    templateUrl: './pages-pricing-admin.component.html',
    styleUrl: './pages-pricing-admin.component.scss'
})
export class PagesPricingAdminComponent  {
  users = [
    {
      userId: '#01',
      name: 'Barbara Freeman',
      startDate: '03 Dec, 2023',
      endDate: '03 Feb, 2024',
      planType: 'Professional',
      totalPayment: '$39.99',
      status: 'Successfully',
      id: 1,
    },
    {
      userId: '#02',
      name: 'Paula Dennis',
      startDate: '25 Jan, 2024',
      endDate: '25 April, 2024',
      planType: 'Enterprise',
      totalPayment: '$59.99',
      status: 'Failed',
      id: 2,
    },
    {
      userId: '#03',
      name: 'Martin Wexler',
      startDate: '10 Jan, 2024',
      endDate: '10 Jan, 2025',
      planType: 'Enterprise',
      totalPayment: '$499.99',
      status: 'Successfully',
      id: 3,
    },
    {
      userId: '#04',
      name: 'Jasmine Moore',
      startDate: '16 Feb, 2024',
      endDate: '16 Jun, 2024',
      planType: 'Basic',
      totalPayment: '$29.99',
      status: 'Pending',
      id: 4,
    },
    {
      userId: '#05',
      name: 'Josh Davison',
      startDate: '18 Feb, 2024',
      endDate: '18 Jun, 2024',
      planType: 'Enterprise',
      totalPayment: '$59.99',
      status: 'Successfully',
      id: 5,
    },
    {
      userId: '#06',
      name: 'Grace Gibbons',
      startDate: '03 April, 2024',
      endDate: '03 Sep, 2024',
      planType: 'Professional',
      totalPayment: '$49.99',
      status: 'Successfully',
      id: 6,
    },
    {
      userId: '#07',
      name: 'Anthony Dennis',
      startDate: '16 Jun, 2024',
      endDate: '16 Jun, 2025',
      planType: 'Professional',
      totalPayment: '$399.99',
      status: 'Pending',
      id: 7,
    },
    {
      userId: '#08',
      name: 'Olivia Stephens',
      startDate: '03 Dec, 2023',
      endDate: '03 Feb, 2024',
      planType: 'Professional',
      totalPayment: '$39.99',
      status: 'Successfully',
      id: 8,
    },
    {
      userId: '#09',
      name: 'David Brown',
      startDate: '25 Jan, 2024',
      endDate: '25 April, 2024',
      planType: 'Enterprise',
      totalPayment: '$59.99',
      status: 'Failed',
      id: 9,
    },
    {
      userId: '#10',
      name: 'Jennifer Bolton',
      startDate: '03 Jan, 2024',
      endDate: '03 Jun, 2024',
      planType: 'Professional',
      totalPayment: '$39.99',
      status: 'Successfully',
      id: 10,
    },
  ];

  dropdownOpen: number | null = null;

  toggleDropdown(userId: number): void {
    this.dropdownOpen = this.dropdownOpen === userId ? null : userId;
  }

  isDropdownOpen(userId: number): boolean {
    return this.dropdownOpen === userId;
  }
}
