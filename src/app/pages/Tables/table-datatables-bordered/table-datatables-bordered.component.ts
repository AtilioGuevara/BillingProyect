import { Component } from '@angular/core';
import { EMPLOYEES } from '../../../Data/employee-data';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../componate/domix-grid-test/domix-grid-test.component';
import { DomixTableService } from '../../../componate/domix-grid-test/service/domix-table.service';
import { FormsModule } from '@angular/forms';
import { DomixPaginationComponent } from '../../../componate/domix-pagination/domix-pagination.component';

@Component({
    selector: 'app-table-datatables-bordered',
    imports: [
        DomixPaginationComponent,
        CommonModule,
        PageTitleComponent,
        FormsModule,
    ],
    templateUrl: './table-datatables-bordered.component.html',
    styleUrls: ['./table-datatables-bordered.component.scss']
})
export class TableDatatablesBorderedComponent extends DomixGridTestComponent {
  entriesOptions = [10 ,20];
  employees = EMPLOYEES;
  searchText1: string = '';
  p1: number = 1;

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
