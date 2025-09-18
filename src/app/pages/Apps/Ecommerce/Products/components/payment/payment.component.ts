import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../../../../../layouts/page-title/page-title.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';
import { FinalOrderSummaryComponent } from '../final-order-summary/final-order-summary.component';
import { Store } from '@ngrx/store';
import { CartItem } from '../apps-ecommerce-shop-cart/apps-ecommerce-shop-cart.component';
import * as ProductSelectors from '../../store/selectors/product.selectors';

@Component({
    selector: 'app-payment',
    imports: [PageTitleComponent, ReactiveFormsModule, LucideAngularModule, CommonModule, FinalOrderSummaryComponent],
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  activeTab: string = 'card';
  cardForm!: FormGroup;
  bankForm!: FormGroup;
  store = inject(Store);
  summary: CartItem = {
    subtotal: 0,
    vat: 0,
    discount: 0,
    shippingCharge: 0,
    total: 0
  };

  constructor(private fb: FormBuilder, private modalService: ModalService) {
    this.store.select(ProductSelectors.selectCartSummary).subscribe(data => {
      if (data) {
        this.summary.discount = data.discount;
        this.summary.shippingCharge = data.shippingCharge;
        this.summary.subtotal = data.subtotal;
        this.summary.total = data.total;
        this.summary.vat = data.vat;
      }
    });

    this.cardForm = this.fb.group({
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])-(\\d{2})$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      saveCard: [false]
    });

    this.bankForm = this.fb.group({
      bankHolderName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      // accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,18}$')]],
      confirmAccountNumber: ['', Validators.required],
      ifscCode: ['', Validators.required],
      // ifscCode: ['', [Validators.required, Validators.pattern('^[A-Za-z]{4}[a-zA-Z0-9]{7}$')]],
      bankName: ['', Validators.required]
    }, { validator: this.accountMatchValidator });
  }

  accountMatchValidator(formGroup: FormGroup) {
    return formGroup.get('accountNumber')?.value === formGroup.get('confirmAccountNumber')?.value
      ? null : { mismatch: true };
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onSubmitCard() {
    if (this.cardForm.valid) {
      this.PaymentModal();
    } 
  }

  onSubmitBank() {
    if (this.bankForm.valid) {
      this.PaymentModal();
    } 
  }
  PaymentModal() {
    this.modalService.open(PaymentModalComponent, {}, (result) => {

    });
  }
}
