import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Products } from '../../interfaces/product.model';
import * as ProductSelectors from '../../store/selectors/product.selectors';
import { removeFromCart } from '../../store/actions/product.actions';
import { CommonModule } from '@angular/common';
import { CartData, CartItem } from '../apps-ecommerce-shop-cart/apps-ecommerce-shop-cart.component';

@Component({
    selector: 'app-final-order-summary',
    imports: [CommonModule],
    templateUrl: './final-order-summary.component.html',
    styleUrl: './final-order-summary.component.scss'
})
export class FinalOrderSummaryComponent {
  @Input() isFromPaymentPage: boolean = false;
  addToCartProduct: CartData[] = [];  
  store = inject(Store);

  summary: CartItem = {
    subtotal: 0,
    vat: 0,
    discount: 0,
    shippingCharge: 0,
    total: 0
  };

  constructor() {

    this.store.select(ProductSelectors.selectCartItems).subscribe((product) => {
      if (product.length) {
        this.addToCartProduct = [];
        this.addToCartProduct = product;
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

  removeProductDetail(pid: string) {
    this.store.dispatch(removeFromCart({ productId: pid }));
  }

}
