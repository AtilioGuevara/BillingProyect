import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ModalService } from '../../../../../../../Core/service/modal/modal.service';

@Component({
    selector: 'app-payment-modal',
    imports: [LucideAngularModule, RouterLink],
    templateUrl: './payment-modal.component.html',
    styleUrl: './payment-modal.component.scss'
})
export class PaymentModalComponent {
  constructor(private modalService: ModalService) { }

  closeaPaymentModal() {
    this.modalService.close();
  }
}
