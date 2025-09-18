import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ModalService } from '../../../../../../../Core/service/modal/modal.service';
@Component({
    selector: 'app-patient-overview-modal',
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './patient-overview-modal.component.html',
    styleUrl: './patient-overview-modal.component.scss'
})
export class PatientOverviewModalComponent  {
  @Input() config?: any;

  constructor(private modalService: ModalService) {

  }
  onOverlayClick() {
    this.close();
  }

  close() {
    this.modalService.close();
  }

}
