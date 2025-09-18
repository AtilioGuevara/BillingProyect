import { createAction, props } from '@ngrx/store';
import { Products } from '../../interfaces/product.model';
import { ProductState } from '../reducers/product.reducer';
import { CartData } from '../../components/apps-ecommerce-shop-cart/apps-ecommerce-shop-cart.component';

// Load Products
export const loadProducts = createAction('[Product] Load Patients');
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Products[] }>()
);
export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: any }>()
);

// Update Product
export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ product: Products }>()
);
export const updateProductSuccess = createAction(
  '[Product] Update Product Success',
  props<{ product: Products }>()
);
export const updateProductFailure = createAction(
  '[Product] Update Product Failure',
  props<{ error: any }>()
);

export const addProduct = createAction(
  '[Product] Add Product',
  props<{ product: Products }>()
);
export const addProductSuccess = createAction(
  '[Product] Add Product Success',
  props<{ product: Products }>()
);
export const addProductFailure = createAction(
  '[Product] Add Product Failure',
  props<{ error: any }>()
);

export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ productID: string }>()
);

export const deleteProductSuccess = createAction(
  '[Product] Delete Product Success',
  props<{ productID: string }>()
);

export const deleteProductFailure = createAction(
  '[Product] Delete Product Failure',
  props<{ error: any }>()
);

export const selectProduct = createAction(
  '[Product] Select Product',
  props<{ product: Products }>()
);

export const addToCart = createAction(
  '[Cart] Add to Cart',
  props<{ product: CartData; navigateToCartPage?: boolean }>()
);

// Update cart item size
export const updateCartItemSize = createAction(
  '[Cart] Update Item Size',
  props<{ pId: string; selectedSize: string }>()
);

// Update cart item color
export const updateCartItemColor = createAction(
  '[Cart] Update Item Color',
  props<{ pId: string; selectedColor: string }>()
);

export const updateCartItemQuantity = createAction(
  '[Cart] Update Item Quantity',
  props<{ pId: string; qty: number }>()
);

export const addToWishlist = createAction(
  '[Wishlist] Add to Wishlist',
  props<{ product: CartData }>()
);

export const removeFromWishlist = createAction(
  '[Wishlist] Remove from Wishlist',
  props<{ productId: string }>()
);
export const removeFromCart = createAction(
  '[Cart] Remove from Cart',
  props<{ productId: string }>()
);