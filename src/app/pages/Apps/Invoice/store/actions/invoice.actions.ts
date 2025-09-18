import { createAction, props } from '@ngrx/store';
import { Invoicedata } from '../../components/apps-invoice-create/apps-invoice-create.component';

// Load Invoicedatas
export const loadInvoicedatas = createAction('[Invoicedata] Load Invoicedatas');
export const loadInvoicedatasSuccess = createAction(
  '[Invoicedata] Load Invoicedatas Success',
  props<{ Invoicedatas: Invoicedata[] }>()
);
export const loadInvoicedatasFailure = createAction(
  '[Invoicedata] Load Invoicedatas Failure',
  props<{ error: any }>()
);

// Update Invoicedata
export const updateInvoicedata = createAction(
  '[Invoicedata] Update Invoicedata',
  props<{ Invoicedata: Invoicedata }>()
);
export const updateInvoicedataSuccess = createAction(
  '[Invoicedata] Update Invoicedata Success',
  props<{ Invoicedata: Invoicedata }>()
);
export const updateInvoicedataFailure = createAction(
  '[Invoicedata] Update Invoicedata Failure',
  props<{ error: any }>()
);

export const addInvoicedata = createAction(
  '[Invoicedata] Add Invoicedata',
  props<{ Invoicedata: Invoicedata }>()
);
export const addInvoicedataSuccess = createAction(
  '[Invoicedata] Add Invoicedata Success',
  props<{ Invoicedata: Invoicedata }>()
);
export const addInvoicedataFailure = createAction(
  '[Invoicedata] Add Invoicedata Failure',
  props<{ error: any }>()
);

export const deleteInvoicedata = createAction(
  '[Invoicedata] Delete Invoicedata',
  props<{ invoiceId: string }>()
);

export const deleteInvoicedatasuccess = createAction(
  '[Invoicedata] Delete Invoicedata Success',
  props<{ invoiceId: string }>()
);

export const deleteInvoicedataFailure = createAction(
  '[Invoicedata] Delete Invoicedata Failure',
  props<{ error: any }>()
);
