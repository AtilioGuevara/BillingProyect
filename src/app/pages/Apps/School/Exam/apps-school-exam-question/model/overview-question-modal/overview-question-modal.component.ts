import { Component, Input } from '@angular/core';
import { ModalService } from '../../../../../../../Core/service/modal/modal.service';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-overview-question-modal',
    imports: [LucideAngularModule, CommonModule],
    templateUrl: './overview-question-modal.component.html',
    styleUrl: './overview-question-modal.component.scss'
})
export class OverviewQuestionModalComponent {
  @Input() config: any;

  constructor(private modalService: ModalService) {}

  closeModal(confirmAction: boolean = false) {
    this.modalService.close(confirmAction);
  }
  getOptionLabel(index: number): string {
    return String.fromCharCode(65 + index); // A = 65, B = 66, etc.
  }
}
