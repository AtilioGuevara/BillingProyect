import { Injectable, Inject, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { InvoicedatasService } from '../../service/invoice.service';
import {
  addInvoicedata,
  addInvoicedataFailure,
  addInvoicedataSuccess,
  deleteInvoicedata,
  deleteInvoicedataFailure,
  deleteInvoicedatasuccess,
  loadInvoicedatas,
  loadInvoicedatasFailure,
  loadInvoicedatasSuccess,
  updateInvoicedata,
  updateInvoicedataFailure,
  updateInvoicedataSuccess,
} from '../actions/invoice.actions';

@Injectable()
export class InvoicedatasEffects {
  private InvoicedatasService = inject(InvoicedatasService);
  actions$ = inject(Actions);

  addInvoicedata$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addInvoicedata),
      mergeMap(({ Invoicedata }) =>
        this.InvoicedatasService.addInvoicedata(Invoicedata).pipe(
          map((addp) => addInvoicedataSuccess({ Invoicedata: addp })),
          catchError((error) => of(addInvoicedataFailure({ error })))
        )
      )
    )
  );

  updateInvoicedata$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateInvoicedata),
      mergeMap(({ Invoicedata }) =>
        this.InvoicedatasService.updateInvoicedata(Invoicedata).pipe(
          map((updatedInvoicedata) =>
            updateInvoicedataSuccess({
              Invoicedata: updatedInvoicedata,
            })
          ),
          catchError((error) => of(updateInvoicedataFailure({ error })))
        )
      )
    )
  );

  loadInvoicedatas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadInvoicedatas),
      mergeMap(() =>
        this.InvoicedatasService.getInvoicedata().pipe(
          map((Invoicedatas) => loadInvoicedatasSuccess({ Invoicedatas })),
          catchError((error) => of(loadInvoicedatasFailure({ error })))
        )
      )
    )
  );

  deleteInvoicedata$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteInvoicedata),
      mergeMap(({ invoiceId }) =>
        this.InvoicedatasService.deleteInvoicedata(invoiceId).pipe(
          map(() => deleteInvoicedatasuccess({ invoiceId })),
          catchError((error) => of(deleteInvoicedataFailure({ error })))
        )
      )
    )
  );
}
