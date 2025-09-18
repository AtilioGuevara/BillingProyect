import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ModalService } from '../../../Core/service/modal/modal.service';

@Component({
    selector: 'app-delete-modal',
    imports: [LucideAngularModule],
    templateUrl: './delete-modal.component.html',
    styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {
  constructor(private modalService: ModalService) {}

  closeaDeletModal(confirmDeletion: boolean = false) {
    this.modalService.close(confirmDeletion);
  }
}
