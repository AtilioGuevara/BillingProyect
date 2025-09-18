import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../reducers/product.reducer';

const selectProductState = createFeatureSelector<ProductState>('products');

// Selector for getting all products
export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);


// Selector for getting the cart items
export const selectCartItems = createSelector(
  selectProductState,
  (state: ProductState) => state.cart
);

// Selector for getting the wishlist items
export const selectWishlistItems = createSelector(
  selectProductState,
  (state: ProductState) => state.wishlist
);

// Selector for getting the cart summary (subtotal, vat, discount, shipping, total)
export const selectCartSummary = createSelector(
  selectProductState,
  (state: ProductState) => state.cartSummary
);

// Selector to check if a specific product is in the cart
export const selectIsProductInCart = (productId: string) =>
  createSelector(selectCartItems, (cart) =>
    cart.some((item) => item.pId === productId)
  );

// Selector to check if a specific product is in the wishlist
export const selectIsProductInWishlist = (productId: string) =>
  createSelector(selectWishlistItems, (wishlist) =>
    wishlist.some((item) => item.pId === productId)
  );

// Selector to get the total count of items in the cart
export const selectCartTotalItems = createSelector(
  selectCartItems,
  (cart) => cart.reduce((total, item) => total + item.qty, 0)
);

// Selector to get the total count of items in the wishlist
export const selectWishlistTotalItems = createSelector(
  selectWishlistItems,
  (wishlist) => wishlist.length
);
