import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';

@Component({
    selector: 'app-book-event-modal',
    imports: [LucideAngularModule],
    templateUrl: './book-event-modal.component.html',
    styleUrl: './book-event-modal.component.scss'
})
export class BookEventModalComponent {
  constructor(private modalService: ModalService) {}

  closeEventModal() {
    this.modalService.close();
  }
}
