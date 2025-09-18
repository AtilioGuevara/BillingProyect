import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { generateRandomId } from '../../../../../../Core/shared functions/shared-functions-varibles';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import { OrderStatusList, Payment } from '../apps-ecommerce-orders-list.component';
import { parse, format } from 'date-fns';
import { FlatpickrModule } from '../../../../../../module/flatpickr/flatpickr.module';

@Component({
    selector: 'app-add-edit-order',
    imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, FlatpickrModule],
    templateUrl: './add-edit-order.component.html',
    styleUrl: './add-edit-order.component.scss'
})
export class AddEditOrderComponent {
  @Input() config: any
  orderForm: FormGroup;

  constructor(public fb: FormBuilder, private mSer: ModalService) {
    this.orderForm = this.fb.group({
      orderID: [generateRandomId('PEO')],
      ordersDate: ['', Validators.required],
      deliveredDate: ['', Validators.required],
      customersName: ['', Validators.required],
      qty: [1, Validators.required],
      price: ['', Validators.required],
      total: [''],
      productName: ['', Validators.required],
      payment: [Payment.COD, Validators.required],
      status: [OrderStatusList.New, Validators.required],
      image: ['']
    });
  }

  paymentOptions = [
    { value: Payment.COD, label: 'Cod' },
    { value: Payment.Unpaid, label: 'Un Paid' },
    { value: Payment.Paid, label: 'Paid' },
  ];

  orderStatusOptions = [
    { value: OrderStatusList.New, label: 'New' },
    { value: OrderStatusList.Pending, label: 'Pending' },
    { value: OrderStatusList.Shipping, label: 'Shipping' },
    { value: OrderStatusList.Delivered, label: 'Delivered' },
  ];

  ngOnInit() {
    if (this.config) {
      this.orderForm.patchValue(this.config);
    } 
  }

  convertDate(inputDate:any) {
    const parsedDate = parse(inputDate, 'dd MMM, yyyy', new Date());
    return format(parsedDate, 'yyyy-MM-dd');
  }

  increaseQty() {
    const qtyControl = this.orderForm.get('qty');
    if (qtyControl) {
      qtyControl.setValue(qtyControl.value + 1);
    }
  }

  decreaseQty() {
    const qtyControl = this.orderForm.get('qty');
    if (qtyControl && qtyControl.value > 1) {
      qtyControl.setValue(qtyControl.value - 1);
    }
  }

  onSubmit() {

    if (!this.orderForm.valid) {
      this.orderForm.markAllAsTouched()
      return
    }

    const formValue = {
      ...this.orderForm.value,
      status: Number(this.orderForm.value.status),
      payment: Number(this.orderForm.value.payment)
    };

    this.mSer.close(formValue)
  }
  
  close() {
    this.mSer.close()
  }


}
