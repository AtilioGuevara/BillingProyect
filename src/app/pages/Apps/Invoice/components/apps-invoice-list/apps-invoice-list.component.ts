import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';

import { DomixDropdownModule } from '../../../../../module/domix dropdown/domix-dropdown.module';
import { ChartInfo } from '../../../../../componate/domix-charts/Model/Display-Chart.model';
import { DomixChartsComponent } from '../../../../../componate/domix-charts/domix-charts.component';
import { CommonModule } from '@angular/common';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../../../componate/domix-grid-test/domix-grid-test.component';
import { RestApiService } from '../../../../../Core/service/rest-api.service';
import { DomixTableService } from '../../../../../componate/domix-grid-test/service/domix-table.service';
import { ModalService } from '../../../../../Core/service/modal/modal.service';
import { FormsModule } from '@angular/forms';
import { DomixPaginationComponent } from '../../../../../componate/domix-pagination/domix-pagination.component';
import { Invoice } from '../apps-invoice-grid/apps-invoice-grid.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import {
  deleteInvoicedata,
  loadInvoicedatas,
} from '../../store/actions/invoice.actions';
import { selectInvoicedatas } from '../../store/selectors/invoice.selectors';
import { Invoicedata } from '../apps-invoice-create/apps-invoice-create.component';
import { DeleteModalComponent } from '../../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import { LayoutSettingService } from '../../../../../layouts/layout-setting.service';

@Component({
    selector: 'app-apps-invoice-list',
    imports: [
        PageTitleComponent,
        LucideAngularModule,
        DomixDropdownModule,
        DomixChartsComponent,
        CommonModule,
        FormsModule,
        DomixPaginationComponent,
        RouterLink,
    ],
    templateUrl: './apps-invoice-list.component.html',
    styleUrl: './apps-invoice-list.component.scss'
})
export class AppsInvoiceListComponent extends DomixGridTestComponent {
  donutChart!: ChartInfo
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

  allInvoiceList: Invoice[] = [];
  hasHeaderCheckbox = false;

  store = inject(Store);
  invoice: Invoicedata[] = [];
  invoice$!: Observable<Invoicedata[]>;

  constructor(
    public restApiService: RestApiService,
    public domiex: DomixTableService,
    private modalService: ModalService,
    private router: Router,
    private settingService: LayoutSettingService
  ) {
    super(domiex);
    this.hasHeaderCheckbox = this.columnDefs.some((col) => col.headerCheckbox);
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }

  ngOnInit(): void {
    this.projectData();
  }

  projectData() {
    this.store.dispatch(loadInvoicedatas());

    this.invoice$ = this.store.select(selectInvoicedatas);

    this.invoice$.subscribe((invoices) => {
      this.gridData = invoices;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }
  columnDefs: ColDefs[] = [
    {
      field: 'invoicesID',
      headerName: 'ID',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'clientName',
      headerName: 'Client',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'country',
      headerName: 'Country',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'invoiceDate',
      headerName: 'Invoice Date',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'amount',
      headerName: 'Amount',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      headerName: 'Action',
      sortable: false,
    },
  ];

  deleteModal(invoiceId: string) {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {
        this.store.dispatch(deleteInvoicedata({ invoiceId }));
      }
    });
  }

  editinvoice(pId: string) {
    this.router.navigate([`/apps-invoice-create/${pId}`]);
  }
}
