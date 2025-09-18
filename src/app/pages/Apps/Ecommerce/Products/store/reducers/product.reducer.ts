import { Action, createReducer, on } from '@ngrx/store';
import { Products } from '../../interfaces/product.model';
import * as ProductActions from '../actions/product.actions';
import { CartData, CartItem } from '../../components/apps-ecommerce-shop-cart/apps-ecommerce-shop-cart.component';
import { WishListData } from '../../components/apps-ecommerce-wishlist/apps-ecommerce-wishlist.component';

export interface ProductState {
  products: Products[];
  cart: CartData[];
  cartSummary: CartItem;
  wishlist: WishListData[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  cart: [],
  wishlist: [],
  cartSummary: {
    subtotal: 0,
    vat: 0,
    discount: 0,
    shippingCharge: 0,
    total: 0,
  },
  loading: false,
  error: null,
};

export const productReducer = createReducer(
  initialState,

  // Select a product
  on(ProductActions.selectProduct, (state, { product }) => ({
    ...state,
    selectedProduct: product,
  })),

  // Load products success
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
  })),

  // Update a product in the products array
  on(ProductActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    products: state.products.map((p) =>
      p.productName === product.productName ? product : p
    ),
  })),

  // Add a product to the products array
  on(ProductActions.addProductSuccess, (state, { product }) => ({
    ...state,
    products: [...state.products, product],
  })),

  // Remove a product from the products array
  on(ProductActions.deleteProductSuccess, (state, { productID }) => ({
    ...state,
    products: state.products.filter(
      (product) => product.productID !== productID
    ),
  })),

  // Add a product to the cart
  on(ProductActions.addToCart, (state, { product }) => {
    const existingProduct = state.cart.find((p) => p.pId === product.pId);

    const updatedCart = existingProduct
      ? state.cart.map((item) =>
        item.pId === product.pId
          ? { ...item, qty: item.qty + product.qty }
          : item
      )
      : [...state.cart, { ...product, qty: product.qty, displayedPrice: product.price * product.qty }];

    const cartSummary = calculateCartSummary(updatedCart);

    return {
      ...state,
      cart: updatedCart,
      cartSummary,
    };
  }),

  // Add a product to the wishlist
  on(ProductActions.addToWishlist, (state, { product }) => {
    const existingProduct = state.wishlist.find((p) => p.pId === product.pId);

    return existingProduct
      ? state
      : {
        ...state,
        wishlist: [...state.wishlist, product],
      };
  }),

  // Remove a product from the wishlist
  on(ProductActions.removeFromWishlist, (state, { productId }) => ({
    ...state,
    wishlist: state.wishlist.filter((p) => p.pId !== productId), // Only remove from wishlist
  })),

  // Remove a product from the cart
  on(ProductActions.removeFromCart, (state, { productId }) => {
    const updatedCart = state.cart.filter((item) => item.pId !== productId);
    const cartSummary = calculateCartSummary(updatedCart); // Update cart summary after removal

    return {
      ...state,
      cart: updatedCart,
      cartSummary,
    };
  }),

  // Update the size of an item in the cart
  on(ProductActions.updateCartItemSize, (state, { pId, selectedSize }) => {
    const updatedCart = state.cart.map((item) =>
      item.pId === pId ? { ...item, selectedSize } : item
    );

    const cartSummary = calculateCartSummary(updatedCart);

    return { ...state, cart: updatedCart, cartSummary };
  }),

  // Update the color of an item in the cart
  on(ProductActions.updateCartItemColor, (state, { pId, selectedColor }) => {
    const updatedCart = state.cart.map((item) =>
      item.pId === pId ? { ...item, selectedColor } : item
    );

    const cartSummary = calculateCartSummary(updatedCart);

    return { ...state, cart: updatedCart, cartSummary };
  }),

  on(ProductActions.updateCartItemQuantity, (state, { pId, qty }) => {
    const updatedCart = state.cart.map((item) =>
      item.pId === pId ? { ...item, qty, displayedPrice: item.price * qty } : item
    );

    const cartSummary = calculateCartSummary(updatedCart);

    return { ...state, cart: updatedCart, cartSummary };
  })
);

// Helper function to calculate cart summary
function calculateCartSummary(cart: CartData[]): CartItem {
  const vatRate = 0.06;
  const discountPercentage = 0; // Discount percentage (if any)
  const shippingCharge = 35;     // Flat shipping charge

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discount = subtotal * (discountPercentage / 100);
  const vat = subtotal * vatRate;
  const total = subtotal - discount + vat + shippingCharge;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    vat: parseFloat(vat.toFixed(2)),
    discount: parseFloat(discount.toFixed(2)),
    shippingCharge: parseFloat(shippingCharge.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
  };
}
