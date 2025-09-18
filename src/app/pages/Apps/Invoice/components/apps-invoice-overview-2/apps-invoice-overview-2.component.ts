import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../../layouts/page-title/page-title.component';

import { RestApiService } from '../../../../../Core/service/rest-api.service';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Invoice } from '../apps-invoice-grid/apps-invoice-grid.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-apps-invoice-overview-2',
    imports: [PageTitleComponent, LucideAngularModule, CommonModule, RouterLink],
    templateUrl: './apps-invoice-overview-2.component.html',
    styleUrl: './apps-invoice-overview-2.component.scss'
})
export class AppsInvoiceOverview2Component {
  invoice: any;

  constructor(public restApiService: RestApiService) {}

  ngOnInit(): void {
    this.projectData();
  }

  projectData() {
    this.restApiService.getInvoiceData().subscribe((data: any) => {
      this.invoice = data;
    });
  }
  printInvoice() {
    window.print();
  }
}
