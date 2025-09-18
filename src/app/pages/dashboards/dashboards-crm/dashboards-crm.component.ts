import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { ChartInfo } from '../../../componate/domix-charts/Model/Display-Chart.model';
import { DomixChartsComponent } from '../../../componate/domix-charts/domix-charts.component';

import { LucideAngularModule } from 'lucide-angular';
import { CountUpModule } from 'ngx-countup';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LEADS_DATA } from '../../../Data/leads-data';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomixDropdownModule } from '../../../module/domix dropdown/domix-dropdown.module';
import { LayoutSettingService } from '../../../layouts/layout-setting.service';
export interface Lead {
  leadName: string;
  rating: string;
  date: string;
  contact: string;
  leadSource: string;
  leadStatus: string;
  totalBalance: string;
}
export type LeadColumn = keyof Lead;

@Component({
    selector: 'app-dashboards-crm',
    imports: [
        PageTitleComponent,
        DomixChartsComponent,
        LucideAngularModule,
        CountUpModule,
        SimplebarAngularModule,
        FormsModule,
        CommonModule,
        DomixDropdownModule,
    ],
    templateUrl: './dashboards-crm.component.html',
    styleUrl: './dashboards-crm.component.scss'
})
export class DashboardsCrmComponent {
  options = { autoHide: true };
  newChart!: ChartInfo
  radialChart!: ChartInfo

  constructor(private settingService: LayoutSettingService) {
    this.settingService.settings$.subscribe((settings) => {
      this.renderChart()
    });
  }

  renderChart(): void {
    this.newChart = {
      series: [
        {
          name: 'Visitor',
          data: [154, 137, 41, 67, 43, 20, 41, 67, 20, 41, 32, 98],
        },
        {
          name: 'Add Cart',
          data: [13, 23, 20, 35, 27, 16, 8, 13, 20, 41, 44, 67],
        },
        {
          name: 'Check Out',
          data: [11, 54, 15, 21, 14, 24, 15, 21, 20, 41, 54, 35],
        },
        {
          name: 'Favorite',
          data: [21, 19, 25, 22, 8, 19, 13, 22, 20, 41, 49, 33],
        },
      ],
      chartOptions: {
        chart: {
          height: 300,
          type: 'bar',
          stacked: true,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '35%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: [],
        dataSet: ['bg-primary-500', 'bg-pink-300', 'bg-sky-300', 'bg-slate-600'],
        xaxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          axisBorder: {
            show: false,
          },
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          offsetY: -5,
        },
        grid: {
          show: true,
          borderColor: '#90A4AE',
          strokeDashArray: 2,
          position: 'back',
          padding: {
            top: 10,
            right: 0,
          },
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        fill: {
          opacity: 1,
        },
      },
    };
    this.radialChart = {
      series: [87.6],
      chartOptions: {
        chart: {
          height: 180,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '60%',
            },
            track: {
              background: '#e0e0e0', // Default fallback color
              dropShadow: {
                enabled: true,
                top: 0,
                left: 0,
                blur: 10,
                opacity: 0.02,
              },
            },
            dataLabels: {
              name: {
                fontSize: '15px',
              },
              value: {
                show: true,
                fontSize: '14px',
                fontWeight: 700,
                offsetY: 10,
                formatter: (val: number) => `$${val}k`,
              },
            },
          },
        },
        colors: [],
        dataSet: ['bg-slate-600', 'bg-slate-100'],
        labels: ['This Month'],
      },
    };
  }

  leads: Lead[] = LEADS_DATA;
  displayedLeads: Lead[] = [...this.leads];
  searchTerm = '';
  selectedItems = new Set<any>();
  sortBy = '';
  sortDirection = 'asc';
  currentPage = 1;
  itemsPerPage = 8;

  ngOnInit(): void {
    this.updateDisplayedEmails();
  }

  filteredLeads() {
    this.displayedLeads = this.leads.filter((lead) =>
      lead.leadName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.updateDisplayedEmails();
  }

  updateDisplayedEmails(): void {
    this.displayedLeads = this.leads
      .filter((leads) => this.filterEmail(leads))
      .sort((a, b) => this.sortEmails(a, b));
  }

  filterEmail(email: any): boolean {
    return Object.values(email).some((value) => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(this.searchTerm.toLowerCase());
      }
      return false;
    });
  }

  sortEmails(a: any, b: any): number {
    if (this.sortBy) {
      const modifier = this.sortDirection === 'asc' ? 1 : -1;
      if (a[this.sortBy] < b[this.sortBy]) return -1 * modifier;
      if (a[this.sortBy] > b[this.sortBy]) return 1 * modifier;
    }
    return 0;
  }

  sort(column: LeadColumn): void {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'asc';
    }
    this.updateDisplayedEmails();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedEmails();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedEmails();
    }
  }

  gotoPage(page: number): void {
    this.currentPage = page;
    this.updateDisplayedEmails();
  }

  get totalPages(): number {
    return Math.ceil(this.leads.length / this.itemsPerPage);
  }

  get showingStart(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get showingEnd(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.leads.length);
  }
}
