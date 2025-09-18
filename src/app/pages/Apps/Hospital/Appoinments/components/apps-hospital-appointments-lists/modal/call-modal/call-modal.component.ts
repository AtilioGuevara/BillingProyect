import { Component, Input } from '@angular/core';
import { ModalService } from '../../../../../../../../Core/service/modal/modal.service';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-call-modal',
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './call-modal.component.html',
    styleUrl: './call-modal.component.scss'
})
export class CallModalComponent {
  @Input() config?: any;

  constructor(private modalService: ModalService) {}

  onOverlayClick() {
    this.close();
  }

  isMuted: boolean = false;

  toggleMute(): void {
    this.isMuted = !this.isMuted;
  }

  close(isOPen: boolean = false) {
    this.modalService.close(isOPen);
  }
}
