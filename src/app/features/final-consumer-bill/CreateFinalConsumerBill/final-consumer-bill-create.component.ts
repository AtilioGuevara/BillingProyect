import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateFinalConsumerBillDTO, ProductBillCreate } from '../../../dtos/final-consumer-bill.dto';
import { FinalConsumerBillService } from '../services/final-consumer-bill.service';
import { FinalConsumerBillNavComponent } from '../../NavComponents/final-consumer-bill-nav.component';

@Component({
  selector: 'app-final-consumer-bill-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FinalConsumerBillNavComponent],
  templateUrl: './final-consumer-bill-create.component.html',
  styleUrls: ['./final-consumer-bill-create.component.scss']
})
export class FinalConsumerBillCreateComponent {
  productsList: any[] = []; // Lista de productos cargados
  billForm: FormGroup;
  loading = false;
  successMsg = '';
  errorMsg = '';
  formSubmitted = false; // Para controlar cuándo mostrar validaciones

  
  
  // Placeholders para los campos con formatos específicos
  placeholders = {
    paymentCondition: 'Seleccione método de pago: EFECTIVO, TARJETA, TRANSFERENCIA, etc.',
    
    // Cliente con formatos específicos
    customerName: 'Ej: José Antonio López (máx. 50 caracteres)',
    customerDocument: '12345678-9 (DUI de El Salvador)',
    customerAddress: 'Ej: Col. Escalón, Calle Principal #45, San Salvador (máx. 200 caracteres)',
    customerEmail: 'ejemplo@correo.com',
    customerPhone: '7777-8888 (sin código de país)',
    
    // Productos
    productId: 'Ej: 1',
    requestedQuantity: 'Ej: 2'
  };

  selectedPrice: number | null = null; // Precio del producto seleccionado
  selectedPaymentMethod: string = '';

  // Configuración de métodos de pago
  paymentMethods = {
    // Efectivo
    'EFECTIVO': {
      name: 'Efectivo',
      icon: 'ri-money-dollar-circle-line',
      description: 'Pago en efectivo al momento de la entrega. No requiere procesamiento adicional.',
      requiresProcessing: false
    },
    
    // Tarjetas
    'TARJETA_DEBITO': {
      name: 'Tarjeta de Débito',
      icon: 'ri-bank-card-line',
      description: 'Pago con tarjeta de débito. El monto se descontará inmediatamente de su cuenta.',
      requiresProcessing: true
    },
    'TARJETA_CREDITO': {
      name: 'Tarjeta de Crédito',
      icon: 'ri-bank-card-2-line',
      description: 'Pago con tarjeta de crédito. Procesamiento seguro a través de nuestra pasarela de pagos.',
      requiresProcessing: true
    },
  };

  constructor(private fb: FormBuilder, private billService: FinalConsumerBillService) {
    this.billForm = this.fb.group({
      // Campos principales
      paymentCondition: ['', Validators.required],

      // Datos del cliente
      customerName: ['', [Validators.required, Validators.maxLength(50)]],
      customerLastname: ['', [Validators.maxLength(50)]],
      customerDocument: ['', [Validators.required, Validators.pattern(/^\d{8}-?\d$/)]],
      customerAddress: ['', [Validators.required, Validators.maxLength(200)]],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhone: ['', [Validators.required, Validators.pattern(/^\d{4}-?\d{4}$/)]],

      // Productos
      products: this.fb.array([
        this.fb.group({
          productId: ['', [Validators.required]],
          requestedQuantity: ['', [Validators.required, Validators.min(1)]],
          precio: [{ value: '', disabled: true }]
        })
      ]),
      
      // Campos para el pago con tarjeta
      payment: this.fb.group({
        paymentType: [''], // EFECTIVO | TARJETA
        cardType: [''], // VISA | MASTERCARD | AMEX | DISCOVER
        maskedCardNumber: ['', [Validators.pattern(/^\d{4}(\d{8}|\d{12})\d{4}$/)]], // Validar formato de tarjeta
        cardHolder: ['', [Validators.maxLength(50)]], // Nombre del titular
        authorizationCode: [''] // Código de autorización (opcional)
      })
    });
    this.loadActiveProducts(); // Cargar productos al inicializar
    
    console.log('🏗️ Formulario CREATE inicializado - Nueva estructura simplificada');
    console.log('🔔 Sistema de mensajes de éxito configurado - Duración: 20 segundos');
  }

  ngOnInit(): void {
  }

  get products(): FormArray {
    return this.billForm.get('products') as FormArray;
  }

  addProduct(): void {
    this.products.push(this.fb.group({
      productId: ['', Validators.required],
      requestedQuantity: ['', Validators.required],
      precio: [{ value: '', disabled: true }] // Campo para almacenar el precio del producto seleccionado
    }));
  }

  removeProduct(index: number): void {
    this.products.removeAt(index);
  }

  // Método para limpiar el formulario completamente (incluyendo mensajes)
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

  // Método para limpiar solo el formulario SIN tocar los mensajes
  clearFormOnly(): void {
    this.formSubmitted = false; // Resetear estado de envío
    
    // Resetear formulario
    this.billForm.reset();
    
    // Limpiar productos y agregar uno por defecto
    while (this.products.length > 0) {
      this.products.removeAt(0);
    }
    this.addProduct();
    
    console.log('🧹 Solo formulario limpiado - mensajes conservados');
  }

  // Método para verificar si un campo tiene errores específicos
  hasFieldError(fieldName: string, errorType: string): boolean {
    const field = this.billForm.get(fieldName);
    return !!(field && field.errors && field.errors[errorType] && (field.touched || this.formSubmitted));
  }



  // Método para verificar si un campo tiene cualquier error
  hasFieldErrors(fieldName: string): boolean {
  const control = this.billForm.get(fieldName);
  if (!control || !control.errors) {
    return false;
  }

  // Validar si el documento tiene un formato incorrecto
  if (fieldName === 'customerDocument') {
    const value = control.value || '';
    const regex = /^\d{8}-?\d$/; // Acepta con o sin guion
    return !regex.test(value);
  }

  // Validar si el documento tiene un formato incorrecto
  if (fieldName === 'customerPhone') {
    const value = control.value || '';
    const regex = /^\d{4}-?\d{4}$/; // Acepta con o sin guion
    return !regex.test(value);
  }

  return control.invalid && (control.dirty || control.touched);
}

  // Método para verificar si un campo es válido
  isFieldValid(fieldName: string): boolean {
    const field = this.billForm.get(fieldName);
    return !!(field && field.valid && (field.touched || this.formSubmitted));
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

  // Método para cerrar mensajes manualmente
  closeSuccessMessage(): void {
    this.successMsg = '';
    console.log('💫 Mensaje de éxito cerrado manualmente');
  }

  closeErrorMessage(): void {
    this.errorMsg = '';
    console.log('💫 Mensaje de error cerrado manualmente');
  }

  // Método para obtener la longitud actual de un campo
  getFieldLength(fieldName: string): number {
    const field = this.billForm.get(fieldName);
    const value = field?.value;
    return value ? value.length : 0;
  }

  // ============ MÉTODOS DE PAGO ============

  /**
   * Maneja el cambio de método de pago
   */
  onPaymentMethodChange(): void {
    this.selectedPaymentMethod = this.billForm.get('paymentCondition')?.value || '';
    console.log('💳 Método de pago seleccionado:', this.selectedPaymentMethod);

    const paymentGroup = this.billForm.get('payment') as FormGroup;

    if (this.selectedPaymentMethod === 'TARJETA_DEBITO' || this.selectedPaymentMethod === 'TARJETA_CREDITO') {
      // Hacer que los campos de tarjeta sean requeridos
      paymentGroup.get('cardType')?.setValidators([Validators.required]);
      paymentGroup.get('maskedCardNumber')?.setValidators([Validators.required, Validators.pattern(/^\d{4}(\d{8}|\d{12})\d{4}$/)]);
      paymentGroup.get('cardHolder')?.setValidators([Validators.required, Validators.maxLength(50)]);
      paymentGroup.get('authorizationCode')?.setValidators([Validators.required]);
    } else {
      // Quitar validaciones de los campos de tarjeta
      paymentGroup.get('cardType')?.clearValidators();
      paymentGroup.get('maskedCardNumber')?.clearValidators();
      paymentGroup.get('cardHolder')?.clearValidators();
      paymentGroup.get('authorizationCode')?.clearValidators();
    }

    // Actualizar el estado de los controles
    paymentGroup.get('cardType')?.updateValueAndValidity();
    paymentGroup.get('maskedCardNumber')?.updateValueAndValidity();
    paymentGroup.get('cardHolder')?.updateValueAndValidity();
    paymentGroup.get('authorizationCode')?.updateValueAndValidity();
  }

  /**
   * Obtiene el ícono del método de pago
   */
  getPaymentMethodIcon(paymentMethod: string): string {
    const method = this.paymentMethods[paymentMethod as keyof typeof this.paymentMethods];
    return method?.icon || 'ri-question-line';
  }

  /**
   * Obtiene el nombre legible del método de pago
   */
  getPaymentMethodName(paymentMethod: string): string {
    const method = this.paymentMethods[paymentMethod as keyof typeof this.paymentMethods];
    return method?.name || paymentMethod;
  }

  /**
   * Obtiene la descripción del método de pago
   */
  getPaymentMethodDescription(paymentMethod: string): string {
    const method = this.paymentMethods[paymentMethod as keyof typeof this.paymentMethods];
    return method?.description || 'Método de pago seleccionado';
  }

  /**
   * Verifica si el método de pago requiere procesamiento adicional
   */
  requiresPaymentProcessing(): boolean {
    if (!this.selectedPaymentMethod) return false;
    const method = this.paymentMethods[this.selectedPaymentMethod as keyof typeof this.paymentMethods];
    return method?.requiresProcessing || false;
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
          return 'Formato: 24011612-3';
        case 'companyPhone':
          return 'Formato: 22223333 o 2222-3333';
        case 'customerDocument':
          return 'Formato: 123456789 0 12345678-9';
        case 'customerPhone':
          return 'Formato: 1234-5678';
        default:
          return 'Formato inválido';
      }
    }
    if (field.errors['maxlength']) {
      const maxLength = field.errors['maxlength'].requiredLength;
      switch (fieldName) {
        case 'customerName':
          return `El nombre no puede exceder ${maxLength} caracteres`;
        case 'customerAddress':
          return `La dirección no puede exceder ${maxLength} caracteres`;
        default:
          return `Máximo ${maxLength} caracteres permitidos`;
      }
    }
    if (field.errors['min']) {
      return `El valor mínimo es ${field.errors['min'].min}`;
    }
    
    return 'Campo inválido';
    
  }

  async submit(): Promise<void> {
    this.formSubmitted = true;

    if (this.billForm.invalid) {
      this.errorMsg = '❌ Por favor complete todos los campos requeridos correctamente.';
      return;
    }

    const formData = this.billForm.value;

    const bill: CreateFinalConsumerBillDTO = {
      paymentCondition: formData.paymentCondition,
      receiver: {
        customerName: formData.customerName,
        customerLastname: formData.customerLastname || '',
        customerDocument: this.formatDocument(formData.customerDocument),
        customerAddress: formData.customerAddress,
        customerEmail: formData.customerEmail,
        customerPhone: this.formatPhone(formData.customerPhone)
      },
      products: formData.products as ProductBillCreate[],
      withheldIva: 0.0,
      payment: formData.paymentCondition === 'EFECTIVO' ? undefined : formData.payment // Solo incluir si no es EFECTIVO
    };

    console.log('📤 Enviando factura:', bill);

    this.billService.createFinalConsumerBillWithFetch(bill).subscribe({
      next: (response: string) => {
        this.successMsg = '🎉 ¡Factura creada exitosamente!';
        this.clearFormOnly();
      },
      error: (error: any) => {
        this.errorMsg = '❌ Error al crear la factura.';
      }
    });
  }

  // Función para formatear el documento
  private formatDocument(document: string): string {
    if (!document.includes('-')) {
      return document.slice(0, 8) + '-' + document.slice(8);
    }
    return document;
  }

  // Función para formatear el contacto
  private formatPhone(phone: string): string {
    if (!phone.includes('-')) {
      return phone.slice(0, 4) + '-' + phone.slice(4);
    }
    return phone;
  }

  // Método para manejar la selección de producto desde el dropdown
  onProductSelected(event: any, index: number): void {
    const productId = +event.target.value; // Convertir el valor a número

    // Buscar el producto seleccionado en la lista de productos
    const selectedProduct = this.productsList.find(product => product.productoId === productId);

    console.log('Producto seleccionado:', selectedProduct); // Verificar el producto seleccionado

    if (selectedProduct) {
      // Actualizar el precio del producto en el formulario
      const productGroup = this.products.at(index);
      productGroup.patchValue({
        precio: selectedProduct.precio // Asignar el precio del producto
      });

      console.log('Precio actualizado en el formulario:', productGroup.get('precio')?.value); // Verificar el precio actualizado
    } else {
      // Si no hay producto seleccionado, limpiar el precio
      this.products.at(index).patchValue({
        precio: '' // Cambiar "price" a "precio"
      });
    }
  }

  handleInputEvent(event: Event): string {
    const inputElement = event.target as HTMLInputElement;
    return inputElement?.value || '';
  }


  // Cargar todos los productos activos al inicializar
  loadActiveProducts(): void {
    this.billService.getAllActiveProducts().subscribe(
      (products: any[]) => {
        this.productsList = products;
        console.log(`✅ ${products.length} productos activos cargados`);
        console.log('Productos cargados desde el backend:', products); // Verificar la respuesta
      },
      (error: any) => {
        console.error('Error al cargar productos activos:', error);
      }
    );
  }
}