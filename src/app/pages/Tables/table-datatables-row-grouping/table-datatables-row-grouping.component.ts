import { Component, OnInit } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { EMPLOYEES } from '../../../Data/employee-data';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-table-datatables-row-grouping',
    imports: [PageTitleComponent, CommonModule, NgxPaginationModule, FormsModule],
    templateUrl: './table-datatables-row-grouping.component.html',
    styleUrl: './table-datatables-row-grouping.component.scss'
})
export class TableDatatablesRowGroupingComponent implements OnInit {
  employees = EMPLOYEES;
  searchText1: string = '';
  itemsPerPage1: number = 10;
  p1: number = 1; // Current page
  entriesOptions: number[] = [10, 20, 30, 40];
  groupedData: { [office: string]: any[] } = {};

  ngOnInit(): void {
    this.updateGroupedData();
  }

  get filteredEmployees() {
    return this.employees.filter(employee =>
      employee.Name.toLowerCase().includes(this.searchText1.toLowerCase()) ||
      employee.Position.toLowerCase().includes(this.searchText1.toLowerCase()) ||
      employee.Office.toLowerCase().includes(this.searchText1.toLowerCase()) ||
      employee.Age.toString().includes(this.searchText1) ||
      employee['Start date'].toLowerCase().includes(this.searchText1.toLowerCase()) ||
      employee.Salary.toLowerCase().includes(this.searchText1.toLowerCase())
    );
  }

  get startEntry(): number {
    return (this.p1 - 1) * this.itemsPerPage1 + 1;
  }

  get endEntry(): number {
    return Math.min(this.p1 * this.itemsPerPage1, this.filteredEmployees.length);
  }

  onPageChange(newPage: number): void {
    this.p1 = newPage;
    this.updateGroupedData();
  }

  updateGroupedData(): void {
    const filtered = this.filteredEmployees;
    this.groupedData = filtered.reduce((acc, employee) => {
      const office = employee.Office;
      if (!acc[office]) {
        acc[office] = [];
      }
      acc[office].push(employee);
      return acc;
    }, {} as { [office: string]: any[] });
  }
}
