import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CreateFinalConsumerBillDTO, ProductBillCreate, CreateReturnBillDTO, FinalConsumerBillDetailDTO, ReturnBillResponseDTO } from '../../../dtos/final-consumer-bill.dto';
import { FinalConsumerBillService } from '../services/final-consumer-bill.service';
import { ClientSearchService, Cliente } from '../services/client-search.service';
import { FinalConsumerBillNavComponent } from '../../NavComponents/final-consumer-bill-nav.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-final-consumer-bill-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FinalConsumerBillNavComponent],
  templateUrl: './final-consumer-bill-create.component.html',
  styleUrls: ['./final-consumer-bill-create.component.scss']
})
export class FinalConsumerBillCreateComponent implements OnInit, OnDestroy {
  productsList: any[] = []; // Lista de productos cargados
  billForm: FormGroup;
  loading = false;
  successMsg = '';
  errorMsg = '';
  formSubmitted = false; // Para controlar cuándo mostrar validaciones

  // Variables para modo devolución
  isReturnMode = false;
  originalBillCode = '';
  originalBillDetails: FinalConsumerBillDetailDTO | null = null;

  // Variables para búsqueda de clientes
  clientSearchTerm = '';
  clientSearchResults: Cliente[] = [];
  showClientDropdown = false;
  loadingClients = false;
  private destroy$ = new Subject<void>();

  
  
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

  constructor(
    private fb: FormBuilder, 
    private billService: FinalConsumerBillService,
    private clientSearchService: ClientSearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {
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
    // Verificar si estamos en modo devolución
    const mode = this.route.snapshot.queryParams['mode'];
    const returnFrom = this.route.snapshot.queryParams['returnFrom'];
    
    if (mode === 'return' && returnFrom) {
      this.isReturnMode = true;
      this.originalBillCode = returnFrom;
      this.loadOriginalBillData(returnFrom);
      console.log('🔄 Modo DEVOLUCIÓN activado para factura:', returnFrom);
    }

    // Suscribirse a los resultados de búsqueda de clientes
    this.clientSearchService.getSearchResults()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (clients) => {
          this.clientSearchResults = clients;
          this.showClientDropdown = clients.length > 0 && this.clientSearchTerm.length >= 2;
          this.loadingClients = false;
        },
        error: (error) => {
          console.error('Error searching clients:', error);
          this.clientSearchResults = [];
          this.showClientDropdown = false;
          this.loadingClients = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clientSearchService.clearSearch();
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

  /**
   * Cargar datos de la factura original para devolución
   */
  private loadOriginalBillData(generationCode: string): void {
    this.billService.getFinalConsumerBillByGenerationCode(generationCode).subscribe({
      next: (billDetails) => {
        this.originalBillDetails = billDetails;
        this.preFilLFormWithOriginalData(billDetails);
        console.log('✅ Datos de factura original cargados:', billDetails);
      },
      error: (error) => {
        console.error('❌ Error al cargar datos de factura original:', error);
        this.errorMsg = 'Error al cargar los datos de la factura original';
      }
    });
  }

  /**
   * Pre-llenar formulario con datos de la factura original
   */
  private preFilLFormWithOriginalData(billDetails: FinalConsumerBillDetailDTO): void {
    // Pre-llenar datos del cliente
    this.billForm.patchValue({
      customerName: billDetails.receiver.customerName,
      customerLastname: billDetails.receiver.customerLastname,
      customerDocument: billDetails.receiver.customerDocument,
      customerAddress: billDetails.receiver.customerAddress,
      customerEmail: billDetails.receiver.customerEmail,
      customerPhone: billDetails.receiver.customerPhone,
      paymentCondition: billDetails.paymentCondition
    });

    // Limpiar productos existentes
    while (this.products.length > 0) {
      this.products.removeAt(0);
    }

    // Agregar productos de la factura original
    billDetails.products.forEach((product) => {
      const productGroup = this.fb.group({
        productId: [product.productId, Validators.required],
        requestedQuantity: [product.requestedQuantity, Validators.required],
        precio: [{ value: product.price, disabled: true }]
      });
      this.products.push(productGroup);
    });

    console.log('📝 Formulario pre-llenado con datos de la factura original');
  }

  /**
   * Obtener token de autorización
   */
  private getAuthToken(): string | null {
    console.log('🔍 Buscando token de autorización...');
    
    // Buscar en localStorage
    const possibleKeys = ['authToken', 'accessToken', 'token', 'Authorization', 'jwt'];
    console.log('📋 Keys en localStorage:', Object.keys(localStorage));
    
    for (const key of possibleKeys) {
      const value = localStorage.getItem(key);
      if (value && value !== 'null' && value !== 'undefined') {
        console.log(`🔑 Token encontrado en localStorage[${key}]:`, value.substring(0, 20) + '...');
        return value;
      }
    }

    // Buscar en cookies
    console.log('🍪 Cookies disponibles:', document.cookie);
    try {
      const cookieNames = ['authToken', 'accessToken', 'token', 'Authorization', 'jwt'];
      for (const cookieName of cookieNames) {
        const match = document.cookie.match(new RegExp(`(?:^|; )${cookieName}=([^;]+)`));
        if (match && match[1]) {
          console.log(`🔑 Token encontrado en cookie[${cookieName}]:`, match[1].substring(0, 20) + '...');
          return decodeURIComponent(match[1]);
        }
      }
    } catch (e) {
      console.warn('Error leyendo cookies:', e);
    }

    console.warn('⚠️ No se encontró token de autorización en ninguna ubicación');
    return null;
  }



  /**
   * Crear devolución usando el servicio existente (que ya funcionaba antes)
   */
  private createReturnInvoice(): void {
    if (!this.originalBillCode) {
      this.errorMsg = 'Código de factura original no disponible';
      return;
    }

    console.log('🔍 DEBUG: Iniciando creación de devolución con servicio');
    console.log('📋 Código original:', this.originalBillCode);
    console.log('📝 Datos de factura original:', this.originalBillDetails);

    const formData = this.billForm.value;
    console.log('📄 Datos del formulario:', formData);

    // Verificar que tenemos productos
    if (!formData.products || formData.products.length === 0) {
      this.errorMsg = 'No hay productos seleccionados para la devolución';
      return;
    }

    // Crear DTO según la documentación exacta de la API
    const returnData: CreateReturnBillDTO = {
      paymentCondition: formData.paymentCondition || "EFECTIVO",
      receiver: {
        customerId: this.originalBillDetails?.receiver?.customerId || 1
      },
      products: formData.products
        ?.filter((product: any) => product.requestedQuantity > 0)
        ?.map((product: any) => ({
          productId: product.productId,
          requestedQuantity: product.requestedQuantity
        })) || [],
      withheldIva: parseFloat(formData.withheldIva || '0'),
      payment: formData.paymentCondition === 'EFECTIVO' ? undefined : {
        cardType: formData.payment?.cardType || "VISA",
        maskedCardNumber: formData.payment?.maskedCardNumber || "****",
        cardHolder: formData.payment?.cardHolder || "CLIENTE"
      }
    };

    // Limpiar campos undefined
    const cleanReturnData = JSON.parse(JSON.stringify(returnData));

    console.log('🔍 CustomerId usado:', cleanReturnData.receiver.customerId);
    console.log('📦 Productos a devolver:', cleanReturnData.products);
    console.log('💰 Condición de pago:', cleanReturnData.paymentCondition);
    console.log('🔄 Usando servicio para crear devolución...');

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    // Usar el servicio existente que ya funcionaba antes
    this.billService.createReturnBill(this.originalBillCode, cleanReturnData).subscribe({
      next: (response) => {
        console.log('✅ Devolución creada exitosamente:', response);
        
        this.successMsg = `🎉 ¡Devolución creada exitosamente! Código: ${response.generationCode || 'N/A'}`;
        this.errorMsg = '';
        this.loading = false;

        // Redirigir después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/final-consumer-bill/list']);
        }, 2000);
      },
      error: (error) => {
        console.error('❌ Error al crear devolución:', error);
        
        // Mensaje más amigable para el usuario
        let userMessage = '❌ No se pudo crear la devolución.';
        
        if (error.message?.includes('validation service') || error.status === 500) {
          userMessage = '⚠️ El sistema está experimentando problemas temporales. Por favor, intente más tarde.';
        } else if (error.status === 400) {
          userMessage = '❌ Los datos enviados no son válidos. Verifique la información.';
        } else if (error.status === 401 || error.status === 403) {
          userMessage = '🔑 Error de autenticación. Por favor, inicie sesión nuevamente.';
        } else if (error.status === 404) {
          userMessage = '❌ La factura original no fue encontrada.';
        } else if (error.message?.includes('Network')) {
          userMessage = '📡 Error de conexión a internet. Verifique su conexión.';
        }
        
        this.errorMsg = userMessage;
        this.successMsg = '';
        this.loading = false;
      }
    });
  }

  async submit(): Promise<void> {
    this.formSubmitted = true;

    if (this.billForm.invalid) {
      this.errorMsg = '❌ Por favor complete todos los campos requeridos correctamente.';
      return;
    }

    // Si estamos en modo devolución, usar endpoint específico
    if (this.isReturnMode) {
      this.createReturnInvoice();
      return;
    }

    // Flujo normal de creación de factura
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

  // ============================================
  // MÉTODOS PARA BÚSQUEDA DE CLIENTES
  // ============================================

  /**
   * Maneja el cambio en el campo de búsqueda de clientes
   */
  onClientSearchChange(searchTerm: string): void {
    this.clientSearchTerm = searchTerm;
    
    if (searchTerm.length >= 2) {
      this.loadingClients = true;
      this.clientSearchService.updateSearchTerm(searchTerm);
    } else {
      this.showClientDropdown = false;
      this.clientSearchResults = [];
      this.clientSearchService.clearSearch();
    }
  }

  /**
   * Selecciona un cliente de la lista y rellena los campos del formulario
   */
  selectClient(client: Cliente): void {
    // Rellenar los campos del formulario con los datos del cliente
    this.billForm.patchValue({
      customerName: client.nombre,
      customerLastname: client.apellido || '',
      customerDocument: client.dui,
      customerEmail: client.correo,
      customerPhone: client.telefono,
      // La dirección no está en la respuesta del API, mantener vacía
      customerAddress: ''
    });

    // Actualizar el término de búsqueda para mostrar el nombre completo
    this.clientSearchTerm = `${client.nombre} ${client.apellido || ''}`.trim();
    
    // Ocultar el dropdown
    this.showClientDropdown = false;
    this.clientSearchResults = [];
    
    console.log('Cliente seleccionado:', client);
  }

  /**
   * Cierra el dropdown de clientes
   */
  closeClientDropdown(): void {
    // Delay para permitir que el click en un cliente se procese primero
    setTimeout(() => {
      this.showClientDropdown = false;
    }, 200);
  }

  /**
   * Limpia la búsqueda de clientes
   */
  clearClientSearch(): void {
    this.clientSearchTerm = '';
    this.showClientDropdown = false;
    this.clientSearchResults = [];
    this.clientSearchService.clearSearch();
  }

  /**
   * TrackBy function para mejorar el rendimiento del ngFor
   */
  trackByClientId(index: number, client: Cliente): number {
    return client.id;
  }
}