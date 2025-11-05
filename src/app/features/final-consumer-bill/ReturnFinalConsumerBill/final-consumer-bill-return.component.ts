import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FinalConsumerBillService } from '../services/final-consumer-bill.service';
import { FinalConsumerBillNavComponent } from '../../NavComponents/final-consumer-bill-nav.component';
import { 
  CreateReturnBillDTO, 
  ReturnBillInfo, 
  ReturnAvailableProduct,
  ReturnBillResponseDTO,
  ReturnProductRequest
} from '../../../dtos/final-consumer-bill.return.dto';

@Component({
  selector: 'app-final-consumer-bill-return',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FinalConsumerBillNavComponent],
  templateUrl: './final-consumer-bill-return.component.html',
  styleUrls: ['./final-consumer-bill-return.component.scss']
})
export class FinalConsumerBillReturnComponent implements OnInit {
  returnForm!: FormGroup;
  originalGenerationCode: string = '';
  returnInfo: ReturnBillInfo | null = null;
  loading = false;
  submitting = false;
  successMessage = '';
  errorMessage = '';
  formSubmitted = false;

  // Configuración de métodos de pago (igual que create)
  paymentMethods = {
    'EFECTIVO': {
      name: 'Efectivo',
      icon: 'ri-money-dollar-circle-line',
      description: 'Devolución en efectivo. Se procesará el reembolso inmediatamente.',
      requiresProcessing: false
    },
    'TARJETA_DEBITO': {
      name: 'Tarjeta de Débito',
      icon: 'ri-bank-card-line',
      description: 'Devolución a tarjeta de débito. El reembolso se procesará en 1-3 días hábiles.',
      requiresProcessing: true
    },
    'TARJETA_CREDITO': {
      name: 'Tarjeta de Crédito',
      icon: 'ri-bank-card-2-line',
      description: 'Devolución a tarjeta de crédito. El reembolso aparecerá en su próximo estado de cuenta.',
      requiresProcessing: true
    }
  };

  selectedPaymentMethod: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private billService: FinalConsumerBillService
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.originalGenerationCode = params['generationCode'];
      if (this.originalGenerationCode) {
        this.loadReturnInfo();
      } else {
        this.errorMessage = 'Código de generación no proporcionado';
      }
    });
  }

  private initForm() {
    this.returnForm = this.fb.group({
      paymentCondition: ['', Validators.required],
      customerId: ['', [Validators.required, Validators.min(1)]],
      selectedProducts: this.fb.array([]),
      withheldIva: [0, [Validators.min(0)]],
      // Campos para pago con tarjeta
      payment: this.fb.group({
        cardType: [''],
        maskedCardNumber: [''],
        cardHolder: ['']
      })
    });

    console.log('🏗️ Formulario RETURN inicializado');
  }

  get selectedProductsArray() {
    return this.returnForm.get('selectedProducts') as FormArray;
  }

  private loadReturnInfo() {
    this.loading = true;
    this.errorMessage = '';

    console.log('🔍 Cargando información de devolución para:', this.originalGenerationCode);

    this.billService.getReturnInfo(this.originalGenerationCode).subscribe({
      next: (info) => {
        console.log('✅ Información de devolución cargada:', info);
        this.returnInfo = info;
        this.setupProductsForm();
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Error al cargar información de devolución:', error);
        this.errorMessage = 'Error al cargar información de devolución: ' + (error.message || error);
        this.loading = false;
      }
    });
  }

  private setupProductsForm() {
    if (this.returnInfo?.availableProducts) {
      const productsArray = this.fb.array(
        this.returnInfo.availableProducts.map((product) => 
          this.fb.group({
            productId: [product.productId],
            productName: [{ value: product.productName, disabled: true }],
            originalQuantity: [{ value: product.originalQuantity, disabled: true }],
            availableForReturn: [{ value: product.availableForReturn, disabled: true }],
            unitPrice: [{ value: product.unitPrice, disabled: true }],
            requestedQuantity: [0, [Validators.min(0), Validators.max(product.availableForReturn)]],
            selected: [false]
          })
        )
      );
      this.returnForm.setControl('selectedProducts', productsArray);
    }
  }

  onPaymentMethodChange(): void {
    this.selectedPaymentMethod = this.returnForm.get('paymentCondition')?.value || '';
    console.log('💳 Método de pago seleccionado:', this.selectedPaymentMethod);

    const paymentGroup = this.returnForm.get('payment') as FormGroup;

    if (this.selectedPaymentMethod === 'TARJETA_DEBITO' || this.selectedPaymentMethod === 'TARJETA_CREDITO') {
      // Hacer que los campos de tarjeta sean requeridos
      paymentGroup.get('cardType')?.setValidators([Validators.required]);
      paymentGroup.get('maskedCardNumber')?.setValidators([
        Validators.required, 
        Validators.pattern(/^\d{4}(\d{8}|\d{12})\d{4}$/)
      ]);
      paymentGroup.get('cardHolder')?.setValidators([Validators.required, Validators.maxLength(50)]);
    } else {
      // Quitar validaciones de los campos de tarjeta
      paymentGroup.get('cardType')?.clearValidators();
      paymentGroup.get('maskedCardNumber')?.clearValidators();
      paymentGroup.get('cardHolder')?.clearValidators();
    }

    // Actualizar el estado de los controles
    Object.keys(paymentGroup.controls).forEach(key => {
      paymentGroup.get(key)?.updateValueAndValidity();
    });
  }

  getPaymentMethodIcon(paymentMethod: string): string {
    const method = this.paymentMethods[paymentMethod as keyof typeof this.paymentMethods];
    return method?.icon || 'ri-question-line';
  }

  getPaymentMethodName(paymentMethod: string): string {
    const method = this.paymentMethods[paymentMethod as keyof typeof this.paymentMethods];
    return method?.name || paymentMethod;
  }

  getPaymentMethodDescription(paymentMethod: string): string {
    const method = this.paymentMethods[paymentMethod as keyof typeof this.paymentMethods];
    return method?.description || 'Método de devolución seleccionado';
  }

  toggleProductSelection(index: number, product: ReturnAvailableProduct) {
    const productGroup = this.selectedProductsArray.at(index) as FormGroup;
    const selectedControl = productGroup.get('selected');
    const quantityControl = productGroup.get('requestedQuantity');
    
    const isSelected = selectedControl?.value;
    
    if (!isSelected) {
      // Si se selecciona, poner cantidad mínima de 1
      quantityControl?.setValue(1);
      quantityControl?.setValidators([
        Validators.required, 
        Validators.min(1), 
        Validators.max(product.availableForReturn)
      ]);
    } else {
      // Si se deselecciona, limpiar cantidad
      quantityControl?.setValue(0);
      quantityControl?.setValidators([Validators.min(0)]);
    }
    
    quantityControl?.updateValueAndValidity();
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.returnForm.invalid) {
      this.errorMessage = '❌ Por favor complete todos los campos requeridos correctamente.';
      return;
    }

    const selectedProducts = this.getSelectedProducts();
    
    if (selectedProducts.length === 0) {
      this.errorMessage = '❌ Debe seleccionar al menos un producto para la devolución.';
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const formData = this.returnForm.value;
    
    const returnData: CreateReturnBillDTO = {
      paymentCondition: formData.paymentCondition,
      receiver: {
        customerId: formData.customerId
      },
      products: selectedProducts,
      withheldIva: formData.withheldIva,
      payment: formData.paymentCondition === 'EFECTIVO' ? {} : formData.payment
    };

    console.log('📤 Enviando devolución:', returnData);

    this.billService.createReturnBill(this.originalGenerationCode, returnData).subscribe({
      next: (response: ReturnBillResponseDTO) => {
        console.log('✅ Devolución creada exitosamente:', response);
        this.successMessage = `🎉 ¡Devolución creada exitosamente!\n\nCódigo: ${response.generationCode}\nTotal: $${response.totalWithIva}`;
        this.submitting = false;
        
        // Auto-hide mensaje después de 20 segundos
        setTimeout(() => {
          this.successMessage = '';
        }, 20000);
        
        // Limpiar formulario
        this.clearForm();
      },
      error: (error) => {
        console.error('❌ Error al crear devolución:', error);
        this.errorMessage = '❌ Error al crear la devolución: ' + (error.message || error);
        this.submitting = false;
      }
    });
  }

  public getSelectedProducts(): ReturnProductRequest[] {
    const products: ReturnProductRequest[] = [];
    const productsArray = this.selectedProductsArray;
    
    for (let i = 0; i < productsArray.length; i++) {
      const productGroup = productsArray.at(i) as FormGroup;
      const selected = productGroup.get('selected')?.value;
      const quantity = productGroup.get('requestedQuantity')?.value;
      
      if (selected && quantity > 0) {
        products.push({
          productId: productGroup.get('productId')?.value,
          requestedQuantity: quantity
        });
      }
    }
    
    return products;
  }

  clearForm(): void {
    this.formSubmitted = false;
    this.returnForm.reset();
    this.selectedPaymentMethod = '';
    
    if (this.returnInfo?.availableProducts) {
      this.setupProductsForm();
    }
    
    console.log('🧹 Formulario de devolución limpiado');
  }

  closeSuccessMessage(): void {
    this.successMessage = '';
  }

  closeErrorMessage(): void {
    this.errorMessage = '';
  }

  goBack(): void {
    this.router.navigate(['/final-consumer-bill/list']);
  }

  // Métodos de validación (similares a create component)
  hasFieldError(fieldName: string, errorType: string): boolean {
    const field = this.returnForm.get(fieldName);
    return !!(field && field.errors && field.errors[errorType] && (field.touched || this.formSubmitted));
  }

  hasFieldErrors(fieldName: string): boolean {
    const control = this.returnForm.get(fieldName);
    return !!(control && control.errors && control.invalid && (control.dirty || control.touched || this.formSubmitted));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.returnForm.get(fieldName);
    return !!(field && field.valid && (field.touched || this.formSubmitted));
  }

  isFieldEmpty(fieldName: string): boolean {
    const field = this.returnForm.get(fieldName);
    const value = field?.value;
    return this.formSubmitted && (!value || value === '' || value === null || value === undefined);
  }
}