import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../store/actions/product.actions';
import * as ProductSelectors from '../../store/selectors/product.selectors';
import { CartData } from '../apps-ecommerce-shop-cart/apps-ecommerce-shop-cart.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../../../../../../layouts/page-title/page-title.component';
import { LucideAngularModule } from 'lucide-angular';

export interface WishListData {
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
    selector: 'app-apps-ecommerce-wishlist',
    imports: [CommonModule, PageTitleComponent, RouterModule, LucideAngularModule, PageTitleComponent],
    templateUrl: './apps-ecommerce-wishlist.component.html',
    styleUrl: './apps-ecommerce-wishlist.component.scss'
})
export class AppsEcommerceWishlistComponent {
  store = inject(Store);
  wishlistItem: WishListData[] = [];
  addToCartProduct: string[] = []

  constructor(private router: Router) {
    this.store.select(ProductSelectors.selectWishlistItems).subscribe((wishList) => {
      this.wishlistItem = wishList;
    });
    this.store.select(ProductSelectors.selectCartItems).subscribe((cartProduct) => {
      this.addToCartProduct = cartProduct.map((x) => x.pId);
    });
  }

  remove(pId: string) {
    this.store.dispatch(ProductActions.removeFromWishlist({ productId: pId }))
  }

  addToCart(data: CartData) {
    this.store.dispatch(ProductActions.addToCart({ product: data }));
  }

  goToCart() {
    this.router.navigate(['/apps-ecommerce-shop-cart']);
  }

  goToGrid() {
    this.router.navigate(['/apps-ecommerce-products-grid']);
  }

  updateToCart() {
    this.wishlistItem.forEach(element => {
      this.store.dispatch(ProductActions.addToCart({ product: element, navigateToCartPage: true }));
    });
  }
}
