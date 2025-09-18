import { Action, createReducer, on } from '@ngrx/store';
import { Appointment } from '../../components/apps-hospital-appointments-book/apps-hospital-appointments-book.component';
import { addAppointmentBookSuccess, deleteAppointmentBooksuccess, loadAppointmentBooksSuccess, updateAppointmentBookSuccess } from '../actions/appointments-book.actions';

export interface AppointmentBookState {
  AppointmentBooks: Appointment[];
  error: any;
}

const initialState: AppointmentBookState = {
  AppointmentBooks: [],
  error: null,
};

export const AppointmentBooksReducer = createReducer(
  initialState,
  on(loadAppointmentBooksSuccess, (state, { AppointmentBooks }) => ({
    ...state,
    AppointmentBooks,
  })),

  on(updateAppointmentBookSuccess, (state, { AppointmentBook }) => ({
    ...state,
    AppointmentBooks: state.AppointmentBooks.map((s) =>
      s.patientName === AppointmentBook.patientName ? AppointmentBook : s
    ),
  })),
  on(addAppointmentBookSuccess, (state, { AppointmentBook }) => ({
    ...state,
    AppointmentBooks: [...state.AppointmentBooks, AppointmentBook],
  })),

  on(deleteAppointmentBooksuccess, (state, { appointmentsId }) => ({
    ...state,
    AppointmentBooks: state.AppointmentBooks.filter(
      (AppointmentBooks) => AppointmentBooks.appointmentsId !== appointmentsId
    ),
  }))
);
