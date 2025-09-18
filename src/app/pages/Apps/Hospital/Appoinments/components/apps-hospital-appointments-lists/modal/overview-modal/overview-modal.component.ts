import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ModalService } from '../../../../../../../../Core/service/modal/modal.service';
import { CallModalComponent } from '../call-modal/call-modal.component';

@Component({
    selector: 'app-overview-modal',
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './overview-modal.component.html',
    styleUrl: './overview-modal.component.scss'
})
export class OverviewModalComponent {
  @Input() config?: any;

  constructor(private modalService: ModalService) {}

  onOverlayClick() {
    this.close();
  }

  close(isOPen: boolean = false) {
    this.modalService.close(isOPen);
  }

}
