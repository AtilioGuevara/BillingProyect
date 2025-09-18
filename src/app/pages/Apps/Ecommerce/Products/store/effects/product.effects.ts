import { Injectable, Inject, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from '../actions/product.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';

@Injectable()
export class ProductEffects {

  constructor(private router:Router ){}
  private productService = inject(ProductService);
  actions$ = inject(Actions);

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      mergeMap(({ product }) =>
        this.productService.addProduct(product).pipe(
          map((addedProduct) =>
            ProductActions.addProductSuccess({ product: addedProduct })
          ),
          catchError((error) => of(ProductActions.addProductFailure({ error })))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap(({ product }) =>
        this.productService.updateProduct(product).pipe(
          map((updatedProduct) =>
            ProductActions.updateProductSuccess({ product: updatedProduct })
          ),
          catchError((error) =>
            of(ProductActions.updateProductFailure({ error }))
          )
        )
      )
    )
  );

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap(({ productID }) =>
        this.productService.deleteProduct(productID).pipe(
          map(() => ProductActions.deleteProductSuccess({ productID })),
          catchError((error) =>
            of(ProductActions.deleteProductFailure({ error }))
          )
        )
      )
    )
  );

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addToCart),
      tap(({ product, navigateToCartPage = false }) => {
        if (navigateToCartPage) {
          this.router.navigate(['/apps-ecommerce-shop-cart']);
        }
      })
    ),
    { dispatch: false }
  );
}
