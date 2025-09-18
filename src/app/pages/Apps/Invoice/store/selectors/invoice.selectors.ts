import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoicedataState } from '../reducers/invoice.reducer';

const getaInvoicedatastate =
  createFeatureSelector<InvoicedataState>('Invoicedatas');

export const selectInvoicedatas = createSelector(
  getaInvoicedatastate,
  (state: InvoicedataState) => state.Invoicedatas
);
