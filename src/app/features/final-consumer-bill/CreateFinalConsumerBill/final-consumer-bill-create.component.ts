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

  productsList: any[] = [];
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
    
    // Transferencias
    'TRANSFERENCIA_BANCARIA': {
      name: 'Transferencia Bancaria',
      icon: 'ri-exchange-funds-line',
      description: 'Transferencia directa entre cuentas bancarias. Requiere confirmación del banco.',
      requiresProcessing: true
    },
    'ACH': {
      name: 'ACH (Transferencia Automática)',
      icon: 'ri-secure-payment-line',
      description: 'Transferencia automática ACH. Procesamiento de 1-3 días hábiles.',
      requiresProcessing: true
    },
    
    // Pagos móviles
    'TIGO_MONEY': {
      name: 'Tigo Money',
      icon: 'ri-smartphone-line',
      description: 'Pago a través de Tigo Money. Disponible las 24 horas.',
      requiresProcessing: true
    },
    'CLARO_PAY': {
      name: 'Claro Pay',
      icon: 'ri-phone-line',
      description: 'Pago móvil con Claro Pay. Rápido y seguro.',
      requiresProcessing: true
    },
    
    // Pagos digitales
    'PAYPAL': {
      name: 'PayPal',
      icon: 'ri-paypal-line',
      description: 'Pago seguro a través de PayPal. Acepta tarjetas y saldo PayPal.',
      requiresProcessing: true
    },
    'STRIPE': {
      name: 'Stripe (Tarjeta Online)',
      icon: 'ri-secure-payment-line',
      description: 'Procesamiento seguro de tarjetas online. Encriptación de nivel bancario.',
      requiresProcessing: true
    },
    
    // Otros
    'CHEQUE': {
      name: 'Cheque',
      icon: 'ri-file-paper-line',
      description: 'Pago con cheque. Requiere verificación y puede tomar varios días hábiles.',
      requiresProcessing: true
    },
    'CREDITO_EMPRESA': {
      name: 'Crédito Empresarial',
      icon: 'ri-building-line',
      description: 'Línea de crédito empresarial. Solo para clientes corporativos aprobados.',
      requiresProcessing: false
    }
  };

  constructor(private fb: FormBuilder, private billService: FinalConsumerBillService) {
    this.billForm = this.fb.group({
      // Campos principales
      paymentCondition: ['', Validators.required],
      
      // Datos del cliente
      customerName: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      customerLastname: ['', [
        Validators.maxLength(50)
      ]],
      customerDocument: ['', [
        Validators.required, 
        Validators.pattern(/^\d{8}-?\d$/) // Formato: 06873291-2 con o sin guion
      ]],
      customerAddress: ['', [
        Validators.required,
        Validators.maxLength(200) // Máximo 200 caracteres para direcciones
      ]],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhone: ['', [
        Validators.required,
        Validators.pattern(/^\d{4}-?\d{4}$/) // Formato: 7777-8888 con o sin guion
      ]],
      
      // Productos con ID y cantidad solicitada
      products: this.fb.array([
        this.fb.group({
          productId: ['', [Validators.required]], // ID del producto seleccionado
          requestedQuantity: ['', [Validators.required, Validators.min(1)]]
        })
      ])
    });
    
    this.loadActiveProducts();
    
    console.log('🏗️ Formulario CREATE inicializado - Nueva estructura simplificada');
    console.log('🔔 Sistema de mensajes de éxito configurado - Duración: 20 segundos');
  }

  get products(): FormArray {
    return this.billForm.get('products') as FormArray;
  }

  addProduct(): void {
    this.products.push(this.fb.group({
      productId: ['', [Validators.required, Validators.min(1)]],
      requestedQuantity: ['', [Validators.required, Validators.min(1)]]
    }));
  }

  removeProduct(index: number): void {
    if (this.products.length > 1) {
      this.products.removeAt(index);
    }
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
    
    if (this.selectedPaymentMethod && this.paymentMethods[this.selectedPaymentMethod as keyof typeof this.paymentMethods]) {
      const method = this.paymentMethods[this.selectedPaymentMethod as keyof typeof this.paymentMethods];
      console.log('📋 Detalles del método:', method);
    }
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

  /**
   * Simula el procesamiento de pago (a implementar con pasarela real)
   */
  async processPayment(billData: any): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    console.log('💰 Procesando pago para método:', this.selectedPaymentMethod);
    console.log('💵 Datos de facturación:', billData);

    // Si es efectivo, no requiere procesamiento
    if (this.selectedPaymentMethod === 'EFECTIVO' || this.selectedPaymentMethod === 'CREDITO_EMPRESA') {
      return {
        success: true,
        transactionId: `CASH_${Date.now()}`
      };
    }

    // Para otros métodos, simular procesamiento (aquí iría la integración real)
    try {
      // Simular delay de procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular éxito (90% de éxito)
      if (Math.random() > 0.1) {
        return {
          success: true,
          transactionId: `PAY_${Date.now()}_${this.selectedPaymentMethod}`
        };
      } else {
        throw new Error('Pago rechazado por el proveedor');
      }
    } catch (error) {
      console.error('❌ Error procesando pago:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido en el pago'
      };
    }
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
    console.log('🔄 Submit iniciado - Con procesamiento de pagos');
    
    this.formSubmitted = true; // Marcar que se intentó enviar
    
    // Validar formulario
    if (this.billForm.invalid) {
      this.errorMsg = '❌ Por favor complete todos los campos requeridos correctamente.';
      this.loading = false;
      setTimeout(() => this.errorMsg = '', 5000);
      return;
    }
    
    this.successMsg = '';
    this.errorMsg = '';
    this.loading = true;

    // Actualizar método de pago seleccionado
    this.onPaymentMethodChange();
    
    const formData = this.billForm.value;

    formData.customerDocument = this.formatDocument(formData.customerDocument);
    formData.customerPhone = this.formatPhone(formData.customerPhone);
    
    const bill: CreateFinalConsumerBillDTO = {
      paymentCondition: formData.paymentCondition,
      receiver: {
        customerName: formData.customerName,
        customerLastname: formData.customerLastname || '',
        customerDocument: formData.customerDocument,
        customerAddress: formData.customerAddress,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone
      },
      products: formData.products as ProductBillCreate[],
      withheldIva: 0.0
    };
    
    console.log('📤 Enviando factura con nueva estructura:', bill);
    
    // PROCESAR PAGO ANTES DE CREAR LA FACTURA
    if (this.requiresPaymentProcessing()) {
      console.log('� Procesando pago para método:', this.selectedPaymentMethod);
      
      try {
        const paymentResult = await this.processPayment(bill);
        
        if (!paymentResult.success) {
          this.errorMsg = `❌ Error en el pago: ${paymentResult.error}`;
          this.loading = false;
          setTimeout(() => this.errorMsg = '', 10000);
          return;
        }
        
        console.log('✅ Pago procesado exitosamente. ID:', paymentResult.transactionId);
        // Agregar ID de transacción a la factura
        (bill as any).transactionId = paymentResult.transactionId;
      } catch (error) {
        console.error('❌ Error crítico procesando pago:', error);
        this.errorMsg = '❌ Error crítico en el procesamiento del pago. Intente nuevamente.';
        this.loading = false;
        setTimeout(() => this.errorMsg = '', 10000);
        return;
      }
    } else {
      console.log('💵 Método de pago no requiere procesamiento:', this.selectedPaymentMethod);
    }
    
    console.log('🚀 Creando factura con método seleccionado:', this.selectedPaymentMethod);
    this.billService.createFinalConsumerBillWithFetch(bill).subscribe({
      next: (response: string) => {
        console.log('🎉🎉🎉 ===== FACTURA CREADA EXITOSAMENTE ===== 🎉🎉🎉');
        console.log('✅ Respuesta del servidor:', response);
        console.log('✅ Estableciendo mensaje de éxito...');
        
        const paymentMethodName = this.getPaymentMethodName(this.selectedPaymentMethod);
        const transactionInfo = (bill as any).transactionId ? `\n🔖 ID de transacción: ${(bill as any).transactionId}` : '';
        
        this.successMsg = `🎉 ¡Factura creada exitosamente! 
💳 Método de pago: ${paymentMethodName}${transactionInfo}
📄 La factura ha sido procesada correctamente.`;
        this.formSubmitted = false;
        
        console.log('✅ Mensaje de éxito establecido:', this.successMsg);
        
        // Limpiar SOLO el formulario, mantener los mensajes
        this.clearFormOnly();
        
        console.log('✅ Iniciando timer de 20 segundos para ocultar mensaje...');
        // El mensaje se mantiene por 20 segundos para ser bien visible
        setTimeout(() => {
          this.successMsg = '';
          console.log('⏰ Mensaje de éxito ocultado después de 20 segundos');
        }, 20000);
      },
      error: (error: any) => {
        console.error('❌ Error al crear factura:', error);
        
        if (error.status === 400) {
          this.errorMsg = '❌ Error 400: Datos inválidos. Verifique los datos enviados.';
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
  onProductSelected(event: Event, index: number): void {
    const target = event.target as HTMLSelectElement;
    const productId = target.value;
    
    if (productId) {
      // Encontrar el producto seleccionado en la lista
      const selectedProduct = this.productsList.find(p => p.id.toString() === productId);
      
      if (selectedProduct) {
        console.log('🎯 PRODUCTO SELECCIONADO:', selectedProduct);
        console.log('✅ ID del producto seleccionado:', selectedProduct.id);
        console.log('✅ Nombre del producto:', selectedProduct.name);
        console.log('✅ Precio del producto:', selectedProduct.price || 'No especificado');
      }
    } else {
      console.log('❌ No se seleccionó ningún producto');
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