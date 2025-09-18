import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../layouts/page-title/page-title.component';
import { ModalService } from '../../../Core/service/modal/modal.service';

@Component({
    selector: 'app-ui-modal',
    imports: [PageTitleComponent],
    templateUrl: './ui-modal.component.html',
    styleUrl: './ui-modal.component.scss'
})
export class UiModalComponent {

  constructor(private modalService: ModalService){}


  openModal(id: string) {
    // this.modalService.openModal(id);
  }
  
  closeModal(id: string) {
    // this.modalService.closeOpenModal(id);
  }

  openPositionModal(str: string) {
    
  }


}
