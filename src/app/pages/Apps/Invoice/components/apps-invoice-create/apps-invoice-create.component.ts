import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../../../../layouts/page-title/page-title.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { generateRandomId } from '../../../../../Core/shared functions/shared-functions-varibles';
import { ImageUplodingService } from '../../../../../service/image-uploding.service';
import {
  addInvoicedata,
  loadInvoicedatas,
  updateInvoicedata,
} from '../../store/actions/invoice.actions';
import { selectInvoicedatas } from '../../store/selectors/invoice.selectors';
export interface Invoicedata {
  invoicesID: string;
  image: string;
  clientName: string;
  content: string;
  country: string;
  invoiceDate: string;
  dueDate: string;
  amount: string;
  email: string;
  compnanyName: string;
  phoneNumber: string;
  status: string;
  productDetails: ProductDetail[];
}

export interface ProductDetail {
  productName: string;
  category: string;
  qty: number;
  unitPrice: number;
  discount: number;
  totalAmount: number;
}

@Component({
    selector: 'app-apps-invoice-create',
    imports: [
        PageTitleComponent,
        ReactiveFormsModule,
        CommonModule,
        ReactiveFormsModule,
        LucideAngularModule,
    ],
    templateUrl: './apps-invoice-create.component.html',
    styleUrl: './apps-invoice-create.component.scss'
})
export class AppsInvoiceCreateComponent {
  invoiceId: string;
  invoiceForm!: FormGroup;
  subtotal: number = 0;
  vatAmount: number = 0;
  additionalDiscount: number = 10; // Default 10%
  shippingCharge: number = 0;
  grandTotal: number = 0;

  store = inject(Store);
  incoice: Invoicedata[] = [];
  incoice$!: Observable<Invoicedata[]>;
  productDetailsFA = new FormArray<FormGroup>([]);

  invoice$!: Observable<Invoicedata[]>;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public imgUploading: ImageUplodingService
  ) {
    this.invoiceId = this.activatedRoute.snapshot.params['id'];

    this.invoiceForm = this.fb.group({
      invoicesID: [generateRandomId('INV-'), Validators.required],
      image: ['', Validators.required],
      clientName: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      amount: ['', Validators.required],
      status: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      additionalDiscount: ['', Validators.required],
      shippingCharge: ['', Validators.required],
      vatamount: ['', Validators.required],
      subtotal: ['', Validators.required],
      country: ['India'],
      productDetails: this.productDetailsFA,
    });
  }

  ngOnInit() {
    this.addProductDetail();

    this.store.dispatch(loadInvoicedatas());
    this.invoice$ = this.store.select(selectInvoicedatas);

    this.invoice$.subscribe(data => {
      const editedData = data.find(invoices => invoices.invoicesID === this.invoiceId);
      if (editedData) {
        this.invoiceForm.patchValue(editedData);
      }
    });


  }

  createProductDetail() {
    return this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      qty: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, Validators.required],
      discount: [0, Validators.required],
      totalAmount: [0, Validators.required],
    });
  }

  increaseQty(index: number) {
    const qtyControl = this.productDetailsFA.at(index).get('qty');
    if (qtyControl) {
      qtyControl.setValue(qtyControl.value + 1);
      this.updateTotalAmount(index);
    }
  }

  onFileChange(event: any) {
    this.imgUploading.uploadFile(event).subscribe({
      next: (result) => {
        this.invoiceForm.get('image')?.setValue(result);
      },
    });
  }

  decreaseQty(index: number) {
    const qtyControl = this.productDetailsFA.at(index).get('qty');
    if (qtyControl && qtyControl.value > 1) {
      qtyControl.setValue(qtyControl.value - 1);
      this.updateTotalAmount(index);
    }
  }

  updateTotalAmount(index: number) {
    const product = this.productDetailsFA.at(index);
    const qty = product.get('qty')?.value || 0;
    const unitPrice = product.get('unitPrice')?.value || 0;
    const discount = product.get('discount')?.value || 0;

    const total = qty * unitPrice * (1 - discount / 100);
    product.get('totalAmount')?.setValue(total.toFixed(2));

    this.calculateTotals();
  }

  calculateTotals() {
    let subtotal = 0;
    this.productDetailsFA.controls.forEach((product) => {
      const totalAmount = parseFloat(product.get('totalAmount')?.value || '0');
      subtotal += totalAmount;
    });

    // subtotal = subtotal;
    this.vatAmount = subtotal * 0.06; // 6% VAT
    const grandTotal =
      this.subtotal +
      this.vatAmount -
      this.additionalDiscount +
      this.shippingCharge;

    this.invoiceForm.get('amount')?.setValue(grandTotal || 0);
    this.invoiceForm.get('subtotal')?.setValue(subtotal || 0);
    this.invoiceForm.get('vatamount')?.setValue(this.vatAmount || 0);
  }

  addProductDetail() {
    this.productDetailsFA.push(this.createProductDetail());
  }

  removeProductDetail(index: number) {
    this.productDetailsFA.removeAt(index);
  }

  onAdditionalDiscountChange() {
    this.additionalDiscount =
      this.invoiceForm.get('additionalDiscount')?.value || 0;
    this.calculateTotals();
  }

  onShippingChargeChange() {
    this.shippingCharge = this.invoiceForm.get('shippingCharge')?.value || 0;
    this.calculateTotals();
  }
  setProductDetails(data: any[]) {
    data.forEach((item) => {
      this.productDetailsFA.push(
        this.fb.group({
          productName: [item.productName, Validators.required],
          category: [item.category, Validators.required],
          qty: [item.qty, [Validators.required, Validators.min(1)]],
          unitPrice: [item.unitPrice, Validators.required],
          discount: [item.discount, Validators.required],
          totalAmount: [item.totalAmount, Validators.required],
        })
      );
    });
  }

  onReset() {
    this.invoiceForm.reset();
  }
  save() {
    this.store.dispatch(
      addInvoicedata({ Invoicedata: this.invoiceForm.value })
    );
    this.router.navigate([`/apps-invoice-list/`]);
  }
  addOrEdit() {

    if (!this.invoiceForm.valid) {
      return;
    }

    if (this.invoiceId) {
      this.edit();
    } else {
      this.save();
    }
  }

  edit() {
    this.store.dispatch(
      updateInvoicedata({ Invoicedata: this.invoiceForm.getRawValue() })
    );
    this.router.navigate([`/apps-invoice-list/`]);
  }
}
