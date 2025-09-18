import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../../layouts/page-title/page-title.component';
import { RestApiService } from '../../../../../Core/service/rest-api.service';

import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { DomixDropdownModule } from '../../../../../module/domix dropdown/domix-dropdown.module';
import { FormsModule } from '@angular/forms';
import { ChartInfo } from '../../../../../componate/domix-charts/Model/Display-Chart.model';
import { DomixChartsComponent } from '../../../../../componate/domix-charts/domix-charts.component';
import { RouterLink } from '@angular/router';
import { DomixTableService } from '../../../../../componate/domix-grid-test/service/domix-table.service';
import { DomixGridTestComponent } from '../../../../../componate/domix-grid-test/domix-grid-test.component';
import { DomixPaginationComponent } from '../../../../../componate/domix-pagination/domix-pagination.component';
import { LayoutSettingService } from '../../../../../layouts/layout-setting.service';
import { NgSelectModule } from '@ng-select/ng-select';

export interface Invoice {
  invoicesID: string;
  image: string;
  clientName: string;
  content: string;
  country: string;
  invoiceDate: string;
  dueDate: string;
  amount: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  status: string;
  productDetails: ProductDetail[];
}

export interface ProductDetail {
  productName: string;
  category: string;
  qty: number;
  unitPrice: number;
  discount: number;
  totalAmount: number;
}

@Component({
    selector: 'app-apps-invoice-grid',
    imports: [
        PageTitleComponent,
        LucideAngularModule,
        CommonModule,
        DomixDropdownModule,
        FormsModule,
        DomixChartsComponent,
        DomixPaginationComponent,
        RouterLink,
        NgSelectModule
    ],
    templateUrl: './apps-invoice-grid.component.html',
    styleUrls: ['./apps-invoice-grid.component.scss']
})
export class AppsInvoiceGridComponent extends DomixGridTestComponent {
  invoiceData: Invoice[] = [];
  avatarImages: any = {};
  paidCount: number = 0;
  unpaidCount: number = 0;
  pendingCount: number = 0;
  overdueCount: number = 0;
  donutChart!: ChartInfo;
  selectedCategory!:string;
  categories = [
    { label: 'Paid', value: 'Paid' },
    { label: 'Unpaid', value: 'Unpaid' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Overdue', value: 'Overdue' },
  ];

  renderChart(): void {
    this.donutChart = {
      series: [16, 8, 12, 9],
      chartOptions: {
        chart: {
          height: 110,
          type: 'donut',
        },
        labels: ['Paid', 'Unpaid', 'Pending', 'Overdue'],
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            expandOnClick: true,
            donut: {
              size: '60%',
            },
          },
        },
        legend: {
          offsetY: -10,
        },
        colors: [],
        dataSet: [
          'bg-green-500',
          'bg-sky-500',
          'bg-yellow-500',
          'bg-red-500',
          'bg-purple-500',
        ],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    };
  }



  constructor(
    public restApiService: RestApiService,
    public domiex: DomixTableService,
    private settingService: LayoutSettingService
  ) {
    super(domiex);
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }

  ngOnInit(): void {
    this.pageSize = 8;
    this.invoiceListData();
  }

  invoiceListData(): void {
    this.restApiService.getInvoiceListData().subscribe((response: any) => {
      // Update the invoice data and set invoice ID and image as needed
      this.invoiceData = response.map((invoice: Invoice, index: number) => ({
        ...invoice,
        invoicesID: `PEI-${15475 + index}`, // Dynamically setting invoicesID
        image:
          this.avatarImages?.[`/${invoice.image}`]?.default || invoice.image,
      }));
      this.gridData = this.invoiceData;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();

      // Reset counts before calculating
      this.paidCount = 0;
      this.unpaidCount = 0;
      this.pendingCount = 0;
      this.overdueCount = 0;

      // Calculate counts based on invoice status
      this.invoiceData.forEach((invoice) => {
        switch (invoice.status) {
          case 'Paid':
            this.paidCount++;
            break;
          case 'Unpaid':
            this.unpaidCount++;
            break;
          case 'Pending':
            this.pendingCount++;
            break;
          case 'Overdue':
            this.overdueCount++;
            break;
        }
      });
    });
  }

  catgoryChange() {
    if (this.selectedCategory) {
      const filterModel: any = {};
      filterModel.status = {
        type: 'equals',
        filterType: 'text',
        filter: this.selectedCategory,
      };

      this.appliedFilters = filterModel;
      this.updateDisplayedData();
    }
  }
  get paidPercentage(): number {
    return (this.paidCount / this.invoiceData.length) * 100 || 0;
  }

  get unpaidPercentage(): number {
    return (this.unpaidCount / this.invoiceData.length) * 100 || 0;
  }

  get pendingPercentage(): number {
    return (this.pendingCount / this.invoiceData.length) * 100 || 0;
  }

  get overduePercentage(): number {
    return (this.overdueCount / this.invoiceData.length) * 100 || 0;
  }
}
