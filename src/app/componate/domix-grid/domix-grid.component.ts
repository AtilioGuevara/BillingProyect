import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import {
  ColDef,
  GridApi,
  GridOptions,
  RowSelectedEvent,
} from 'ag-grid-community';
import { GridSearchService } from './service/grid-search.service';
import { GridDefs } from './interface/grid.model';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-domix-grid',
    imports: [AgGridModule],
    templateUrl: './domix-grid.component.html',
    styleUrls: ['./domix-grid.component.scss']
})
export class DomixGridComponent {
  constructor(private searchService: GridSearchService) {}

  @Input() colDefs: any[] = [];
  @Input() rowData: any;
  @Input() resetAllFilter: boolean = false;
  @Input() filters: any = {};
  @Input() filterConfig: any = {};
  @Input() exportCsv: boolean = false;

  @Output() selectionChanged = new EventEmitter<RowSelectedEvent>();
  @Output() cellDoubleClicked = new EventEmitter<RowSelectedEvent>();
  @Output() gridReady = new EventEmitter<any>();

  private gridApi!: GridApi;

  onSelectionChanged(event: any) {
    this.selectionChanged.emit(event);
  }

  onCellDoubleClicked(event: any) {
    this.cellDoubleClicked.emit(event);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  ngOnInit() {
    this.searchService.search$.subscribe((filterText) => {
      if (this.gridApi) {
        this.gridApi.setGridOption('quickFilterText', filterText);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filters']) {
      this.applyFilters();
    }

    if (changes['resetAllFilter'] && changes['resetAllFilter'].currentValue) {
      this.resetAllFilters();
    }

    if (changes['exportCsv'] && changes['exportCsv'].currentValue) {
      this.exportToCSV();
    }
  }

  resetAllFilters() {
    if (this.gridApi) {
      this.gridApi.setFilterModel(null);
      this.gridApi.onFilterChanged();
    }
  }

  applyFilters() {
    if (!this.gridApi) return;

    if (this.gridApi) {
      this.gridApi.setFilterModel(this.filters);
      this.gridApi.onFilterChanged();
    }
  }

  exportToCSV() {
    if (this.gridApi) {
      this.gridApi.exportDataAsCsv();
    }
  }
}
