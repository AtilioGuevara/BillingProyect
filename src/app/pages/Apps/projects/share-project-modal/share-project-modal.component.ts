import { Component } from '@angular/core';

import { DomixDropdownModule } from '../../../../module/domix dropdown/domix-dropdown.module';
import { LucideAngularModule } from 'lucide-angular';
import { ModalService } from '../../../../Core/service/modal/modal.service';

@Component({
    selector: 'app-share-project-modal',
    imports: [DomixDropdownModule, LucideAngularModule],
    templateUrl: './share-project-modal.component.html',
    styleUrl: './share-project-modal.component.scss'
})
export class ShareProjectModalComponent  {
  constructor(private modalService: ModalService) {
  }
  close() {
    this.modalService.close();
  }
}
