import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateFinalConsumerBillDTO } from '../dtos/final-consumer-bill.dto';
import { FinalConsumerBillService } from '../services/final-consumer-bill.service';

@Component({
  selector: 'app-final-consumer-bill-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './final-consumer-bill-create.component.html',
  styleUrls: ['./final-consumer-bill-create.component.scss']
})
export class FinalConsumerBillCreateComponent {
  billForm: FormGroup;
  loading = false;
  successMsg = '';
  errorMsg = '';

  constructor(private fb: FormBuilder, private billService: FinalConsumerBillService) {
    this.billForm = this.fb.group({
      generationCode: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
      controlNumber: ['', [Validators.pattern(/^DTE-03-\d{8}-\d{15}$/)]],
      products: this.fb.array([
        this.fb.group({
          name: ['', Validators.required],
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

  addProduct(): void {
    this.products.push(this.fb.group({
      name: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]]
    }));
  }

  removeProduct(index: number): void {
    if (this.products.length > 1) {
      this.products.removeAt(index);
    }
  }

  submit(): void {
    if (this.billForm && this.billForm.valid) {
      this.loading = true;
      this.successMsg = '';
      this.errorMsg = '';
      const bill: CreateFinalConsumerBillDTO = this.billForm.value;
      this.billService.createFinalConsumerBill(bill).subscribe({
        next: (res: string) => {
          this.successMsg = 'Factura creada correctamente';
          this.billForm.reset();
        },
        error: (err: any) => {
          this.errorMsg = 'Error al crear la factura';
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }
}
