import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomixTableService } from './service/domix-table.service';
import { number } from 'echarts';
export interface ColDefs {
  field?: string;
  headerName: string;
  sortable: boolean;
  sortDiraction?: string;
  headerCheckbox?: boolean;
  valueGetter?: (params: any) => any;
  }

@Component({
  selector: 'app-domix-grid-test',
  imports: [CommonModule],
  templateUrl: './domix-grid-test.component.html',
  styleUrl: './domix-grid-test.component.scss'
})
export class DomixGridTestComponent {
  searchText: string = '';
  sortBy: any = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  gridData: any[] = [];
  displayedData: any[] = [];
  appliedFilters: any = {};
  headerCheckBox: boolean = false;
  endIndex!: number | null
  startIndex!: number | null
  showingEnd!: number | null
  showingStart!: number | null
  checkedRows: any[] = []; // Array to hold all checked rows

  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(private tableService: DomixTableService) {
  }

  getCheckData() {

  }

  onSearchChange(searchText: string): void {
    this.searchText = searchText;
    this.updateDisplayedData();
  }

  onSortChange(defs: ColDefs) {
    this.sortBy = defs.field;
    this.sortDirection = defs.sortDiraction === 'asc' ? 'desc' : 'asc';
    defs.sortDiraction = this.sortDirection;
    this.updateDisplayedData();
  }

  updateDisplayedData(): void {
    let filteredData = this.tableService.filterData(this.gridData, this.searchText, this.appliedFilters);
    let sortedData = this.tableService.sortData(filteredData, this.sortBy, this.sortDirection);

    // Pagination logic
    this.totalPages = Math.ceil(sortedData.length / this.pageSize);
    this.startIndex = (this.currentPage - 1) * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
    this.displayedData = sortedData.slice(this.startIndex, this.endIndex);

    this.showingStart = (this.currentPage - 1) * this.pageSize + 1;
    this.showingEnd = Math.min(this.currentPage * this.pageSize, this.gridData.length);
  }

  onRowCheckboxChange(index: number) {
    this.gridData = this.gridData.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    );

    const allChecked = this.gridData.every(item => item.checked);
    this.headerCheckBox = allChecked;

    this.updateCheckedRows();

    this.updateDisplayedData();
  }

  headerCheckBoxChange() {
    this.gridData = this.gridData.map(item => ({ ...item, checked: this.headerCheckBox }));
    this.updateCheckedRows();
    this.updateDisplayedData();
  }

  updateCheckedRows(): void {
    this.checkedRows = this.gridData.filter(item => item.checked);
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.updateDisplayedData()
  }

  // Pagination controls
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedData();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedData();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedData();
    }
  }

  deleteSelectedItem() {
    this.gridData = this.gridData.filter(item => !item.checked);
    this.updateDisplayedData();
    this.checkedRows = [];
    this.headerCheckBox = false;
  }

  resetFilters(): void {
    this.searchText = '';
    this.appliedFilters = {}; // Clear all filters
    this.updateDisplayedData();
  }
}
