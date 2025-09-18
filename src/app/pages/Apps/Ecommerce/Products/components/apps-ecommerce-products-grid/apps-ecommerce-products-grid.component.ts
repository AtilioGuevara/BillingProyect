import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../../../../../layouts/page-title/page-title.component';
import { DomixGridTestComponent } from '../../../../../../componate/domix-grid-test/domix-grid-test.component';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../store/actions/product.actions';
import * as ProductSelectors from '../../store/selectors/product.selectors';
import { Products } from '../../interfaces/product.model';
import { Observable } from 'rxjs';
import { DomixDropdownModule } from '../../../../../../module/domix dropdown/domix-dropdown.module';
import { CommonModule } from '@angular/common';
import { DomixPaginationComponent } from '../../../../../../componate/domix-pagination/domix-pagination.component';
import { DomixTableService } from '../../../../../../componate/domix-grid-test/service/domix-table.service';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CartData } from '../apps-ecommerce-shop-cart/apps-ecommerce-shop-cart.component';
import { DomixTooltipModule } from '../../../../../../module/domix tooltip/domix-tooltip.module';
import { WishListData } from '../apps-ecommerce-wishlist/apps-ecommerce-wishlist.component';

@Component({
    selector: 'app-apps-ecommerce-products-grid',
    imports: [
        PageTitleComponent,
        DomixDropdownModule,
        CommonModule,
        DomixPaginationComponent,
        LucideAngularModule,
        DomixTooltipModule,
        RouterLink
    ],
    templateUrl: './apps-ecommerce-products-grid.component.html',
    styleUrl: './apps-ecommerce-products-grid.component.scss'
})
export class AppsEcommerceProductsGridComponent extends DomixGridTestComponent {
  cartLength!: number;
  store = inject(Store);
  products$!: Observable<Products[]>;
  addCartProductIds: string[] = [];
  wishlistProductIds: string[] = [];
  wishListItemCount: number = 0;

  constructor(private router: Router, public domiex: DomixTableService) {
    super(domiex);

    this.store.select(ProductSelectors.selectCartItems).subscribe((product) => {
      this.addCartProductIds = product.map((x) => x.pId);
    });
    this.store
      .select(ProductSelectors.selectWishlistTotalItems)
      .subscribe((wishListCount) => {
        this.wishListItemCount = wishListCount;
      });
    this.store
      .select(ProductSelectors.selectWishlistItems)
      .subscribe((wishListItem) => {
        this.wishlistProductIds = wishListItem.map((x) => x.pId);
      });
  }

  goToOverview(product: Products) {
    this.store.dispatch(ProductActions.selectProduct({ product }));
    this.router.navigate([
      `/apps-ecommerce-product-overview/${product.productID}`,
    ]);
  }

  removeFromCart(pid: string) {
    this.store.dispatch(ProductActions.removeFromCart({ productId: pid }));
  }

  addToCart(product: Products) {
    const cartData: CartData = {
      productName: product.productName,
      category: product.category,
      qty: 1,
      discount: product.discount,
      price: product.price,
      image: product.image,
      selectedSize: product.size[0],
      selectedColor: product.colores[0],
      color: product.colores,
      size: product.size,
      pId: product.productID,
    };   

    this.store.dispatch(ProductActions.addToCart({ product: cartData }));
  }

  removeFromWishlist(pId: string) {
    this.store.dispatch(ProductActions.removeFromWishlist({ productId: pId }));
  }

  addToWishList(product: Products) {
    const wishListData: WishListData = {
      productName: product.productName,
      category: product.category,
      qty: 1,
      discount: product.discount,
      price: product.price,
      image: product.image,
      selectedSize: product.size[0],
      selectedColor: product.colores[0],
      color: product.colores,
      size: product.size,
      pId: product.productID,
    };

    this.store.dispatch(
      ProductActions.addToWishlist({ product: wishListData })
    );
  }

  goToCart() {
    this.router.navigate(['/apps-ecommerce-shop-cart']);
  }

  goToWishlist() {
    this.router.navigate(['/apps-ecommerce-wishlist']);
  }

  ngOnInit(): void {
    this.pageSize = 12;
    this.store.dispatch(ProductActions.loadProducts());

    this.products$ = this.store.select(ProductSelectors.selectAllProducts);

    this.products$.subscribe((products) => {
      this.gridData = products;
      this.displayedData = [...this.gridData];
      this.updateDisplayedData();
    });
  }
}
