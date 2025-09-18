import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../../../../../layouts/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as ProductSelectors from '../../store/selectors/product.selectors';
import { Store } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import { removeFromCart, updateCartItemColor, updateCartItemQuantity, updateCartItemSize } from '../../store/actions/product.actions';
import { interval, map, Observable, Subscription } from 'rxjs';



export interface CartItem {
  subtotal: number;         // Total of all product prices
  vat: number;              // VAT amount (6%)
  discount: number;         // Discount amount (e.g., 10%)
  shippingCharge: number;   // Shipping charge
  total: number;            // Final total
}

export interface CartData {
  productName: string;
  category: string;
  qty: number;
  discount: number;
  price: number;
  displayedPrice?: number;
  image: string;
  selectedSize: string;
  selectedColor: string;
  color: string[];
  size: string[];
  pId: string;
}

@Component({
    selector: 'app-apps-ecommerce-shop-cart',
    imports: [PageTitleComponent, LucideAngularModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    templateUrl: './apps-ecommerce-shop-cart.component.html',
    styleUrl: './apps-ecommerce-shop-cart.component.scss'
})
export class AppsEcommerceShopCartComponent {
  store = inject(Store);
  addToCartProduct: CartData[] = [];
  private _endTime!: number;
  private _diff!: number;
  _minutes?: number;
  _seconds?: number;
  private subscription!: Subscription; // Store the subscription

  summary: CartItem = {
    subtotal: 0,
    vat: 0,
    discount: 0,
    shippingCharge: 0,
    total: 0
  };


  formArray = new FormArray<FormGroup>([]);

  constructor(public fb: FormBuilder, public router: Router) {
    this.initForm()
  }

  ngOnInit() {
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + 5);
    this._endTime = currentDate.getTime();

    this.subscription = interval(1000).pipe(
      map(() => {
        const now = new Date().getTime();
        this._diff = this._endTime - now;

        if (this._diff <= 0) {
          this._diff = 0;
          this.router.navigate(['/apps-ecommerce-products-grid'])
        }
      })
    ).subscribe(() => {
      this._minutes = this.getMinutes(this._diff);
      this._seconds = this.getSeconds(this._diff);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getMinutes(diff: number): number {
    return Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  }

  getSeconds(diff: number): number {
    return Math.floor((diff % (1000 * 60)) / 1000);
  }

  initForm() {
    this.store.select(ProductSelectors.selectCartItems).subscribe((product) => {
      if (product.length) {
        this.addToCartProduct = [];
        this.formArray.clear();
        this.addToCartProduct = product;

        console.log(this.addToCartProduct, 'this.addToCartProduct');

        this.addToCartProduct.forEach((element, index) => {
          this.formArray.push(this.createProductDetail(element, index));
        });


      } else {
        this.router.navigate(['/apps-ecommerce-products-grid'])
      }
    });

    this.store.select(ProductSelectors.selectCartSummary).subscribe(data => {
      if (data) {
        this.summary.discount = data.discount;
        this.summary.shippingCharge = data.shippingCharge;
        this.summary.subtotal = data.subtotal;
        this.summary.total = data.total;
        this.summary.vat = data.vat;
      }
    });

  }

  createProductDetail(data: CartData, index: number) {
    return this.fb.group({
      productName: [data.productName],
      category: [data.category],
      qty: [data.qty, Validators.min(5)],
      discount: [data.discount],
      price: [data.price],
      displayedPrice: [data.displayedPrice],
      colores: [data.color],
      size: [data.size],
      image: [data.image],
      pId: [data.pId],
      selectedColor: [data.selectedColor],
      selectedSize: [data.selectedSize],
    });
  }

  incrementCount(index: number) {
    const control = this.formArray.at(index).get('qty');
    if (control) {
      control.setValue(control.value + 1);
      this.updateQuantity(this.formArray.at(index).value)
    }
  }

  decrementCount(index: number) {
    const control = this.formArray.at(index).get('qty');
    if (control && control.value > 1) {
      control.setValue(control.value - 1);
      this.updateQuantity(this.formArray.at(index).value)
    }
  }

  removeProductDetail(pid: string, index: number) {
    this.store.dispatch(removeFromCart({ productId: pid }));
  }

  updateSize(pId: string, size: string) {
    this.store.dispatch(updateCartItemSize({ pId: pId, selectedSize: size }));
  }

  updateColor(pId: string, color: string) {
    this.store.dispatch(updateCartItemColor({ pId: pId, selectedColor: color }));
  }

  updateQuantity(cartItem: CartData) {
    this.store.dispatch(updateCartItemQuantity({ pId: cartItem.pId, qty: cartItem.qty }));
  }

}
