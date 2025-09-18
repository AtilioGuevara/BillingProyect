import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Appointment } from '../../components/apps-hospital-appointments-book/apps-hospital-appointments-book.component';
import { AppointmentBookState } from '../reducers/appointments-book.reducer';

const getaAppointmentBookState =
  createFeatureSelector<AppointmentBookState>('AppointmentBooks');

export const selectAppointmentBooks = createSelector(
  getaAppointmentBookState,
  (state: AppointmentBookState) => state.AppointmentBooks
);
