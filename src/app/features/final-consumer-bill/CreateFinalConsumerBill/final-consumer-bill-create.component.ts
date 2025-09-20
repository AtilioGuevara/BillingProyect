import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateFinalConsumerBillDTO } from '../dtos/final-consumer-bill.dto';
import { FinalConsumerBillService } from '../services/final-consumer-bill.service';
import { FinalConsumerBillNavComponent } from './final-consumer-bill-nav.component';

@Component({
  selector: 'app-final-consumer-bill-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FinalConsumerBillNavComponent],
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
      // Campos principales (generationCode y controlNumber los genera el backend)
      billGenerationDate: [new Date().toISOString().slice(0, 16), Validators.required], // Para datetime-local
      account: ['', Validators.required],
      paymentCondition: ['', Validators.required],
      
      // Los datos de la empresa (transmitter) se manejan en el backend automáticamente
      // companyName, companyDocument, companyAddress, companyEmail, companyPhone
      
      // Datos del cliente (receiver) - opcionales
      customerName: [''],
      customerDocument: [''],
      customerAddress: [''],
      customerEmail: ['', Validators.email],
      customerPhone: [''],
      
      // Productos - debe tener al menos uno (@NotEmpty en backend)
      products: this.fb.array([
        this.fb.group({
          name: ['', Validators.required],
          quantity: [1, [Validators.required, Validators.min(1)]],
          price: [0, [Validators.required, Validators.min(0)]]
        })
      ], [Validators.minLength(1)]), // Validación @NotEmpty del backend
      
      // Observaciones adicionales
      observations: ['']
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
      
      // Preparar los datos agregando los campos que el backend generará automáticamente
      const formData = { ...this.billForm.value };
      
      // Convertir la fecha a ISO string para el backend
      if (formData.billGenerationDate) {
        formData.billGenerationDate = new Date(formData.billGenerationDate).toISOString();
      }
      
      const bill: CreateFinalConsumerBillDTO = {
        generationCode: '', 
        controlNumber: '',  
        ...formData 
      };
      
      this.billService.createFinalConsumerBill(bill).subscribe({
        next: (res: string) => {
          this.successMsg = 'Factura creada correctamente';
          this.billForm.reset();
          // Restablecer fecha por defecto
          this.billForm.patchValue({
            billGenerationDate: new Date().toISOString().slice(0, 16)
          });
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
