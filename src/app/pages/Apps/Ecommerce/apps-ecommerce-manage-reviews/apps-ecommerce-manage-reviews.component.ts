import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../layouts/page-title/page-title.component';
import { RestApiService } from '../../../../Core/service/rest-api.service';
import { DeleteModalComponent } from '../../../../componate/domix-delet-model/delete-modal/delete-modal.component';
import { ModalService } from '../../../../Core/service/modal/modal.service';
import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { CommonModule } from '@angular/common';
import { DomixPaginationComponent } from '../../../../componate/domix-pagination/domix-pagination.component';
import { AddReviewModalComponent } from './model/add-review-modal/add-review-modal.component';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { DomixGridTestComponent } from '../../../../componate/domix-grid-test/domix-grid-test.component';
import { DomixTableService } from '../../../../componate/domix-grid-test/service/domix-table.service';
export interface UserReview {
  image: string;
  userName: string;
  location: string;
  star: string;
  date: string;
  title: string;
  content: string;
}

@Component({
    selector: 'app-apps-ecommerce-manage-reviews',
    imports: [
        PageTitleComponent,
        DomixDropdownModule,
        CommonModule,
        DomixPaginationComponent,
        LucideAngularModule,
        FormsModule,
    ],
    templateUrl: './apps-ecommerce-manage-reviews.component.html',
    styleUrl: './apps-ecommerce-manage-reviews.component.scss'
})
export class AppsEcommerceManageReviewsComponent extends DomixGridTestComponent {
  averageReview: number = 0;

  constructor(
    public restApiService: RestApiService,
    private modalService: ModalService,
    private test: DomixTableService
  ) {
    super(test);
  }

  ngOnInit(): void {
    this.projectData();
  }
  review = {
    star: 4,
  };

  projectData() {
    this.restApiService.getUserReview().subscribe((data: any) => {
      this.gridData = data;
      this.proccessGridData()
    });
  }

  proccessGridData() {
    this.displayedData = [...this.gridData];
    this.updateDisplayedData();

    if (this.gridData.length > 0) {
      const totalStars = this.gridData.reduce(
        (sum, review) => sum + (parseFloat(review.star) || 0), // Ensure star is a number
        0
      );

      this.averageReview = parseFloat((totalStars / this.gridData.length).toFixed(2)); // Store average as a number
    } else {
      this.averageReview = 0;
    }
  }

  getStarClass(starRating: string | number, index: number): string {
    const roundedRating = parseFloat(starRating.toString()); // Ensure it's a number
    if (index <= roundedRating) {
      return 'ri-star-fill';
    } else if (index - 1 < roundedRating && roundedRating % 1 !== 0) {
      return 'ri-star-half-fill';
    }
    return 'ri-star-line';
  }

  deleteModal(index: number) {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {
        this.gridData.splice(index, 1);
        this.proccessGridData();
      }
    });
  }

  addReviewModal(projectData: UserReview | null, index: number | null) {
    const data = projectData;

    this.modalService.open(AddReviewModalComponent, data, (result) => {
      if (result) {
        if (index !== null && index > -1) {
          this.gridData[index] = {
            ...this.gridData[index],
            ...result,
          };
        }
        else {
          this.gridData.unshift(result);
        }
        this.proccessGridData();
      }
    });
  }
}
