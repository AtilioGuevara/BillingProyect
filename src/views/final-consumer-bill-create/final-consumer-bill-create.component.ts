import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateFinalConsumerBillDTO } from '../../dtos/final-consumer-bill.dto';

@Component({
  selector: 'app-final-consumer-bill-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './final-consumer-bill-create.component.html',
  styleUrls: ['./final-consumer-bill-create.component.scss']
})
export class FinalConsumerBillCreateComponent {
  billForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.billForm = this.fb.group({
      generationCode: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
      controlNumber: ['', [Validators.pattern(/^DTE-03-\d{8}-\d{15}$/)]],
      billGenerationDate: ['', Validators.required],
      account: ['', Validators.required],
      paymentCondition: ['', Validators.required],
      companyName: ['', Validators.required],
      companyDocument: ['', Validators.required],
      companyAddress: ['', Validators.required],
      companyEmail: ['', [Validators.required, Validators.email]],
      companyPhone: ['', Validators.required],
      customerName: [''],
      customerDocument: [''],
      customerAddress: [''],
      customerEmail: ['', Validators.email],
      customerPhone: [''],
      products: this.fb.array([
        this.fb.group({
          productName: ['', Validators.required],
          quantity: [1, [Validators.required, Validators.min(1)]],
          price: [0, [Validators.required, Validators.min(0)]]
        })
      ]),
      nonTaxedSales: [0, [Validators.required, Validators.min(0)]],
      exemptSales: [0, [Validators.required, Validators.min(0)]],
      taxedSales: [0, [Validators.required, Validators.min(0)]],
      iva: [0, [Validators.required, Validators.min(0)]],
      perceivedIva: [0],
      withheldIva: [0],
      totalWithIva: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  get products(): FormArray {
    return this.billForm.get('products') as FormArray;
  }

  addProduct() {
    this.products.push(this.fb.group({
      productName: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]]
    }));
  }

  removeProduct(index: number) {
    if (this.products.length > 1) {
      this.products.removeAt(index);
    }
  }

  submit() {
    if (this.billForm.valid) {
      const bill: CreateFinalConsumerBillDTO = this.billForm.value;
      // Aquí se llamaría al servicio para enviar el bill al backend
      console.log('Factura enviada:', bill);
    }
  }
}
