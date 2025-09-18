import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { EMPLOYEES } from '../../../Data/employee-data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomixTableService } from '../../../componate/domix-grid-test/service/domix-table.service';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../componate/domix-grid-test/domix-grid-test.component';
import { DomixPaginationComponent } from '../../../componate/domix-pagination/domix-pagination.component';

@Component({
    selector: 'app-table-datatables-basic',
    imports: [
        PageTitleComponent,
        CommonModule,
        FormsModule,
        DomixPaginationComponent,
    ],
    templateUrl: './table-datatables-basic.component.html',
    styleUrl: './table-datatables-basic.component.scss'
})
export class TableDatatablesBasicComponent extends DomixGridTestComponent {
  entriesOptions = [5, 10, 15, 20];
  employees = EMPLOYEES;
  searchText1: string = '';
  p1: number = 1;

  constructor(private test: DomixTableService) {
    super(test);
  }

  ngOnInit(): void {
    this.gridData = this.employees;
    // this.categories = Array.from(new Set(this.gridData.map((p) => p.category)));
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
