import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { EMPLOYEES } from '../../../Data/employee-data';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { DomixTableService } from '../../../componate/domix-grid-test/service/domix-table.service';
import { ColDefs, DomixGridTestComponent } from '../../../componate/domix-grid-test/domix-grid-test.component';
import { DomixPaginationComponent } from '../../../componate/domix-pagination/domix-pagination.component';

@Component({
    selector: 'app-table-datatables-stripe',
    imports: [PageTitleComponent, DomixPaginationComponent, FormsModule, CommonModule],
    templateUrl: './table-datatables-stripe.component.html',
    styleUrl: './table-datatables-stripe.component.scss'
})
export class TableDatatablesStripeComponent extends DomixGridTestComponent{
  employees = EMPLOYEES;
  searchText1: string = '';
  itemsPerPage1: number = 10;
  p1: number = 1;
  entriesOptions: number[] = [10, 20, 30, 40];
  totalEntries: number = this.employees.length;

  constructor(private test: DomixTableService) {
    super(test);
  }

  ngOnInit(): void {
    this.gridData = this.employees;
    this.displayedData = [...this.gridData];
    this.updateDisplayedData();
  }

  onSearch(event: Event) {
    const searchText = (event.target as HTMLInputElement).value;
    this.onSearchChange(searchText);
  }
  columnDefs: ColDefs[] = [
    {
      field: 'Name',
      headerName: 'Name',
      sortable: true,
      sortDiraction: 'desc',
      headerCheckbox: true,
    },
    {
      field: 'Position',
      headerName: 'Position',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'Office',
      headerName: 'Office',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'Age',
      headerName: 'Age',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'StartDate',
      headerName: 'Start Date',
      sortable: true,
      sortDiraction: 'asc',
    },
    {
      field: 'Salary',
      headerName: 'Salary',
      sortable: true,
      sortDiraction: 'asc',
    },
  ];

  
}
