import { Component, Input } from '@angular/core';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-book-event-modal',
    imports: [LucideAngularModule, CommonModule],
    templateUrl: './book-event-modal.component.html',
    styleUrl: './book-event-modal.component.scss'
})
export class BookEventModalComponent {
  @Input() config: any;

  constructor(private modalService: ModalService) {}

  getWeekday(dateStr: string, passOnlyDate = false) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short' };
    if (passOnlyDate) {
      return date.getDate();
    } else {
      return date.toLocaleDateString('en-GB', options);
    }
  }
  
  closeEventModal() {
    this.modalService.close();
  }
}
