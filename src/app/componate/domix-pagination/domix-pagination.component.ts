import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-domix-pagination',
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './domix-pagination.component.html',
    styleUrl: './domix-pagination.component.scss'
})
export class DomixPaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() showingStart: number|null = 1;
  @Input() showingEnd: number | null = 1;
  @Input() totalResults: number = 0;

  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalResults']) {
      const totalResultsChange = changes['totalResults'];

      if (totalResultsChange.currentValue !== totalResultsChange.previousValue) {
        setTimeout(() => {
          this.currentPage = 1;
          this.pageChanged.emit(this.currentPage);
        });
      }
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.pageChanged.emit(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChanged.emit(this.currentPage + 1);
    }
  }

  gotoPage(page: number) {
    this.pageChanged.emit(page);
  }

}
