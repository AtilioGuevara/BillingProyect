import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { RestApiService } from '../../../../Core/service/rest-api.service';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { AddBookModalComponent } from './model/add-book-modal/add-book-modal.component';
import { BookOverviewModalComponent } from './model/book-overview-modal/book-overview-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  ColDefs,
  DomixGridTestComponent,
} from '../../../../componate/domix-grid-test/domix-grid-test.component';
import { DomixTableService } from '../../../../componate/domix-grid-test/service/domix-table.service';
import { DomixPaginationComponent } from '../../../../componate/domix-pagination/domix-pagination.component';
export interface Book {
  title: string;
  author: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  type: string;
}

@Component({
    selector: 'app-apps-school-library-book',
    imports: [
        PageTitleComponent,
        CommonModule,
        LucideAngularModule,
        DomixPaginationComponent,
        FormsModule,
        NgSelectModule,
    ],
    templateUrl: './apps-school-library-book.component.html',
    styleUrl: './apps-school-library-book.component.scss'
})
export class AppsSchoolLibraryBookComponent extends DomixGridTestComponent {
  allBook: Book[] = [];
  searchTerm: string = '';
  hasHeaderCheckbox = false;
  categories = [
    { label: 'All', value: 'All' },
    { label: 'Newest', value: 'Newest' },
    { label: 'Oldest', value: 'Oldest' },
    { label: 'Popular Book', value: 'Popular Book' },
    { label: 'Best Sales', value: 'Best Sales' },
  ];

  selectedCategory!: string;
  constructor(
    public restApiService: RestApiService,
    private modalService: ModalService,
    private test: DomixTableService
  ) {
    super(test);
    this.pageSize = 12
  }

  ngOnInit(): void {
    this.projectData();
  }

  projectData() {
    this.restApiService.getBookData().subscribe((data: any) => {
      this.allBook = data;
      this.gridData = data;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }

  getFullStars(rating: number): number[] {
    const validRating = Math.max(0, Math.min(5, rating || 0));
    return Array(Math.floor(validRating)).fill(0);
  }

  hasHalfStar(rating: number): boolean {
    return rating % 1 !== 0;
  }

  getEmptyStars(rating: number): number[] {
    const validRating = Math.max(0, Math.min(5, rating || 0));
    return Array(5 - Math.ceil(validRating)).fill(0);
  }

  get filteredBooks(): Book[] {
    return this.allBook.filter(
      (book) =>
        book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  catgoryChange() {
    if (this.selectedCategory !== 'All') {
      const filterModel: any = {};
      filterModel.type = {
        type: 'equals',
        filterType: 'text',
        filter: this.selectedCategory,
      };

      this.appliedFilters = filterModel;
      this.updateDisplayedData();
    } else {
      this.resetFilters();
    }
  }

  openAddBookModal() {
    this.modalService.open(AddBookModalComponent, {}, (result) => {
      if (result) {
        this.allBook.unshift(result);
      }
    });
  }
  openBookOverviewModal(index: number) {
    const selectedBook = this.allBook[index];
    this.modalService.open(
      BookOverviewModalComponent,
      { data: selectedBook },
      (result) => {
        if (result) {
        }
      }
    );
  }
}
