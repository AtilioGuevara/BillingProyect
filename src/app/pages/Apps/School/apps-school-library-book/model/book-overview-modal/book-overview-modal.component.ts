import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-book-overview-modal',
    imports: [LucideAngularModule, CommonModule],
    templateUrl: './book-overview-modal.component.html',
    styleUrl: './book-overview-modal.component.scss'
})
export class BookOverviewModalComponent {
  @Input() config: any;
  inViewBook: any;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.inViewBook = this.config.data;
  }

  closeaBookOverviewModal() {
    this.modalService.close();
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
}
