import { createAction, props } from '@ngrx/store';
import { Appointment } from '../../components/apps-hospital-appointments-book/apps-hospital-appointments-book.component';

// Load AppointmentBooks
export const loadAppointmentBooks = createAction('[AppointmentBook] Load AppointmentBooks');
export const loadAppointmentBooksSuccess = createAction(
  '[AppointmentBook] Load AppointmentBooks Success',
  props<{ AppointmentBooks: Appointment[] }>()
);
export const loadAppointmentBooksFailure = createAction(
  '[AppointmentBook] Load AppointmentBooks Failure',
  props<{ error: any }>()
);

// Update AppointmentBook
export const updateAppointmentBook = createAction(
  '[AppointmentBook] Update AppointmentBook',
  props<{ AppointmentBook: Appointment }>()
);
export const updateAppointmentBookSuccess = createAction(
  '[AppointmentBook] Update AppointmentBook Success',
  props<{ AppointmentBook: Appointment }>()
);
export const updateAppointmentBookFailure = createAction(
  '[AppointmentBook] Update AppointmentBook Failure',
  props<{ error: any }>()
);

export const addAppointmentBook = createAction(
  '[AppointmentBook] Add AppointmentBook',
  props<{ AppointmentBook: Appointment }>()
);
export const addAppointmentBookSuccess = createAction(
  '[AppointmentBook] Add AppointmentBook Success',
  props<{ AppointmentBook: Appointment }>()
);
export const addAppointmentBookFailure = createAction(
  '[AppointmentBook] Add AppointmentBook Failure',
  props<{ error: any }>()
);

export const deleteAppointmentBook = createAction(
  '[AppointmentBook] Delete AppointmentBook',
  props<{ appointmentsId: string }>()
);

export const deleteAppointmentBooksuccess = createAction(
  '[AppointmentBook] Delete AppointmentBook Success',
  props<{ appointmentsId: string }>()
);

export const deleteAppointmentBookFailure = createAction(
  '[AppointmentBook] Delete AppointmentBook Failure',
  props<{ error: any }>()
);
