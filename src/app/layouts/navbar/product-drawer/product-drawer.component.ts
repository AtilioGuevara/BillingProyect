import { Component, inject, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as ProductSelectors from '../../../pages/Apps/Ecommerce/Products/store/selectors/product.selectors';
import { Store } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { removeFromCart, updateCartItemColor, updateCartItemQuantity, updateCartItemSize } from '../../../pages/Apps/Ecommerce/Products/store/actions/product.actions';
import { DrawerService } from '../../../Core/service/Drawer/drawer.service';

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
    selector: 'app-product-drawer',
    imports: [CommonModule, LucideAngularModule, FormsModule, ReactiveFormsModule, RouterModule],
    templateUrl: './product-drawer.component.html',
    styleUrl: './product-drawer.component.scss'
})
export class ProductDrawerComponent {
  store = inject(Store);
  addToCartProduct: CartData[] = [];
  private subscription!: Subscription; // Store the subscription

  summary: CartItem = {
    subtotal: 0,
    vat: 0,
    discount: 0,
    shippingCharge: 0,
    total: 0
  };


  formArray = new FormArray<FormGroup>([]);

  constructor(public fb: FormBuilder, public router: Router, private drawerService: DrawerService) {
    this.initForm()
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
  
  @Input() config: any;

  closeDrawer() {
    this.drawerService.close();
  }

}
