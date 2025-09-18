import { Action, createReducer, on } from '@ngrx/store';
import { Invoicedata } from '../../components/apps-invoice-create/apps-invoice-create.component';
import {
  addInvoicedataSuccess,
  deleteInvoicedatasuccess,
  loadInvoicedatasSuccess,
  updateInvoicedataSuccess,
} from '../actions/invoice.actions';
export interface InvoicedataState {
  Invoicedatas: Invoicedata[];
  error: any;
}

const initialState: InvoicedataState = {
  Invoicedatas: [],
  error: null,
};

export const InvoicedatasReducer = createReducer(
  initialState,
  on(loadInvoicedatasSuccess, (state, { Invoicedatas }) => ({
    ...state,
    Invoicedatas,
  })),

  on(updateInvoicedataSuccess, (state, { Invoicedata }) => ({
    ...state,
    Invoicedatas: state.Invoicedatas.map((s) =>
      s.clientName === Invoicedata.clientName ? Invoicedata : s
    ),
  })),
  on(addInvoicedataSuccess, (state, { Invoicedata }) => ({
    ...state,
    Invoicedatas: [...state.Invoicedatas, Invoicedata],
  })),

  on(deleteInvoicedatasuccess, (state, { invoiceId }) => ({
    ...state,
    Invoicedatas: state.Invoicedatas.filter(
      (Invoicedatas) => Invoicedatas.invoicesID !== invoiceId
    ),
  }))
);
