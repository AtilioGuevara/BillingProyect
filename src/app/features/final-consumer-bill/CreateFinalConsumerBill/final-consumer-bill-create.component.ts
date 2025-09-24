import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateFinalConsumerBillDTO, ProductBillCreate } from '../dtos/final-consumer-bill.dto';
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
  formSubmitted = false; // Para controlar cuándo mostrar validaciones
  
  // Placeholders para los campos
  placeholders = {
    account: 'Ej: ACC-001',
    paymentCondition: 'Ej: efectivo, crédito, transferencia',
    
    // Empresa
    companyName: 'Ej: INNOVATECH S.A.',
    companyDocument: 'Ej: 0614-240116-102-3',
    companyAddress: 'Ej: Boulevard de los Héroes #789, San Salvador',
    companyEmail: 'Ej: facturacion@empresa.com.sv',
    companyPhone: 'Ej: +503 2234-5678',
    
    // Cliente
    customerName: 'Ej: José Antonio López',
    customerDocument: 'Ej: 12345678-9',
    customerAddress: 'Ej: Residencial Santa Elena, Calle Principal #123',
    customerEmail: 'Ej: cliente@email.com',
    customerPhone: 'Ej: +503 7890-1234',
    
    // Totales
    taxedSales: 'Ej: 2078.98',
    totalWithIva: 'Ej: 2349.25',
    productId: 'Ej: 1',
    
    // Observaciones
    observations: 'Ej: Factura procesada con descuento especial'
  };

  constructor(private fb: FormBuilder, private billService: FinalConsumerBillService) {
    this.billForm = this.fb.group({
      // Campos principales
      account: ['', Validators.required],
      paymentCondition: ['', Validators.required],
      
      // Datos de la empresa
      companyName: ['', Validators.required],
      companyDocument: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{6}-\d{3}-\d$/)]],
      companyAddress: ['', Validators.required],
      companyEmail: ['', [Validators.required, Validators.email]],
      companyPhone: ['', [Validators.required, Validators.pattern(/^\+503\s\d{4}-\d{4}$/)]],
      
      // Datos del cliente
      customerName: ['', Validators.required],
      customerDocument: ['', [Validators.required, Validators.pattern(/^\d{8}-\d$/)]],
      customerAddress: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhone: ['', [Validators.required, Validators.pattern(/^\+503\s\d{4}-\d{4}$/)]],
      
      // Productos - solo IDs
      products: this.fb.array([
        this.fb.group({
          id: ['', [Validators.required, Validators.min(1)]]
        })
      ]),
      
      // Totales
      nonTaxedSales: [0.00, [Validators.required, Validators.min(0)]],
      exemptSales: [0.00, [Validators.required, Validators.min(0)]],
      taxedSales: ['', [Validators.required, Validators.min(0)]],
      iva: [''],
      perceivedIva: [0.00, [Validators.required, Validators.min(0)]],
      withheldIva: [0.00, [Validators.required, Validators.min(0)]],
      totalWithIva: ['', [Validators.required, Validators.min(0)]],
      
      // Observaciones
      observations: ['']
    });
    
    console.log('🏗️ Formulario CREATE inicializado - Campos vacíos con validaciones');
  }

  get products(): FormArray {
    return this.billForm.get('products') as FormArray;
  }

  addProduct(): void {
    this.products.push(this.fb.group({
      id: ['', [Validators.required, Validators.min(1)]] // ID del producto vacío
    }));
  }

  removeProduct(index: number): void {
    if (this.products.length > 1) {
      this.products.removeAt(index);
    }
  }

  // Método para limpiar el formulario completamente
  clearForm(): void {
    this.successMsg = '';
    this.errorMsg = '';
    this.formSubmitted = false; // Resetear estado de envío
    
    // Resetear formulario
    this.billForm.reset();
    
    // Limpiar productos y agregar uno por defecto
    while (this.products.length > 0) {
      this.products.removeAt(0);
    }
    this.addProduct();
    
    console.log('🧹 Formulario limpiado');
  }

  // Método simple para verificar si un campo de producto está vacío
  isProductFieldEmpty(productIndex: number, fieldName: string): boolean {
    const product = this.products.at(productIndex);
    const field = product?.get(fieldName);
    const value = field?.value;
    
    // Solo mostrar error si se ha intentado enviar Y el campo está vacío
    return this.formSubmitted && (!value || value === '' || value === null || value === undefined);
  }

  // Método simple para verificar si un campo normal está vacío
  isFieldEmpty(fieldName: string): boolean {
    const field = this.billForm.get(fieldName);
    const value = field?.value;
    
    // Solo mostrar error si se ha intentado enviar Y el campo está vacío
    return this.formSubmitted && (!value || value === '' || value === null || value === undefined);
  }

  // Método helper para obtener el mensaje de error
  getFieldErrorMessage(fieldName: string): string {
    const field = this.billForm.get(fieldName);
    if (!field || !field.errors) return '';
    
    if (field.errors['required']) {
      return 'Este campo es requerido';
    }
    if (field.errors['email']) {
      return 'Ingrese un email válido (ejemplo@dominio.com)';
    }
    if (field.errors['pattern']) {
      switch (fieldName) {
        case 'companyDocument':
          return 'Formato: 0614-240116-102-3';
        case 'customerDocument':
          return 'Formato DUI: 12345678-9';
        case 'companyPhone':
        case 'customerPhone':
          return 'Formato: +503 1234-5678';
        default:
          return 'Formato inválido';
      }
    }
    if (field.errors['min']) {
      return `El valor mínimo es ${field.errors['min'].min}`;
    }
    
    return 'Campo inválido';
  }

  submit(): void {
    console.log('🔄 Submit iniciado - estructura LIMPIA sin campos auto-generados');
    
    this.successMsg = '';
    this.errorMsg = '';
    this.loading = true;
    
    const formData = this.billForm.value;
    
    // DTO LIMPIO - SIN campos que genera el backend automáticamente
    const bill: CreateFinalConsumerBillDTO = {
      // Solo los campos que realmente necesita el backend
      account: formData.account,
      paymentCondition: formData.paymentCondition,
      
      // Datos empresa
      companyName: formData.companyName,
      companyDocument: formData.companyDocument,
      companyAddress: formData.companyAddress,
      companyEmail: formData.companyEmail,
      companyPhone: formData.companyPhone,
      
      // Datos cliente
      customerName: formData.customerName,
      customerDocument: formData.customerDocument,
      customerAddress: formData.customerAddress,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      
      // Productos - solo IDs
      products: formData.products as ProductBillCreate[],
      
      // Totales
      nonTaxedSales: formData.nonTaxedSales,
      exemptSales: formData.exemptSales,
      taxedSales: formData.taxedSales,
      iva: formData.iva,
      perceivedIva: formData.perceivedIva,
      withheldIva: formData.withheldIva,
      totalWithIva: formData.totalWithIva
    };
    
    console.log('📤 Enviando factura LIMPIA (sin generationCode, controlNumber, etc):', bill);
    
    this.billService.createFinalConsumerBill(bill).subscribe({
      next: (response: string) => {
        console.log('✅ Factura creada exitosamente:', response);
        this.successMsg = `✅ Factura creada exitosamente. Código de generación: ${response}`;
        this.formSubmitted = false;
        
        setTimeout(() => this.successMsg = '', 5000);
      },
      error: (error: any) => {
        console.error('❌ Error al crear factura:', error);
        
        if (error.status === 400) {
          this.errorMsg = '❌ Error 400: Datos inválidos. Verifique el token JWT y los datos enviados.';
        } else if (error.status === 401) {
          this.errorMsg = '❌ Error 401: No autorizado. El token JWT puede haber expirado.';
        } else if (error.status === 500) {
          this.errorMsg = '❌ Error 500: Error interno del servidor.';
        } else if (error.status === 0) {
          this.errorMsg = '❌ Sin conexión al servidor.';
        } else {
          this.errorMsg = `❌ Error: ${error.message || 'Error desconocido'}`;
        }
        
        setTimeout(() => this.errorMsg = '', 10000);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
