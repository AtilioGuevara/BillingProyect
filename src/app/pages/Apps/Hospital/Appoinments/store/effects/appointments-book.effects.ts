import { Injectable, Inject, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppointmentBooksService } from '../../service/appointments-book.service';
import {
  addAppointmentBook,
  addAppointmentBookFailure,
  addAppointmentBookSuccess,
  deleteAppointmentBook,
  deleteAppointmentBookFailure,
  deleteAppointmentBooksuccess,
  loadAppointmentBooks,
  loadAppointmentBooksFailure,
  loadAppointmentBooksSuccess,
  updateAppointmentBook,
  updateAppointmentBookFailure,
  updateAppointmentBookSuccess,
} from '../actions/appointments-book.actions';

@Injectable()
export class AppointmentBooksEffects {
  private AppointmentBooksService = inject(AppointmentBooksService);
  actions$ = inject(Actions);

  addAppointmentBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addAppointmentBook),
      mergeMap(({ AppointmentBook }) =>
        this.AppointmentBooksService.addAppointmentBook(AppointmentBook).pipe(
          map((addp) => addAppointmentBookSuccess({ AppointmentBook: addp })),
          catchError((error) => of(addAppointmentBookFailure({ error })))
        )
      )
    )
  );

  updateAppointmentBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAppointmentBook),
      mergeMap(({ AppointmentBook }) =>
        this.AppointmentBooksService.updateAppointmentBook(
          AppointmentBook
        ).pipe(
          map((updatedAppointmentBook) =>
            updateAppointmentBookSuccess({
              AppointmentBook: updatedAppointmentBook,
            })
          ),
          catchError((error) => of(updateAppointmentBookFailure({ error })))
        )
      )
    )
  );

  loadAppointmentBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAppointmentBooks),
      mergeMap(() =>
        this.AppointmentBooksService.getAppointmentBook().pipe(
          map((AppointmentBooks) =>
            loadAppointmentBooksSuccess({ AppointmentBooks })
          ),
          catchError((error) => of(loadAppointmentBooksFailure({ error })))
        )
      )
    )
  );

  deleteAppointmentBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteAppointmentBook),
      mergeMap(({ appointmentsId }) =>
        this.AppointmentBooksService.deleteAppointmentBook(
          appointmentsId
        ).pipe(
          map(() => deleteAppointmentBooksuccess({ appointmentsId })),
          catchError((error) => of(deleteAppointmentBookFailure({ error })))
        )
      )
    )
  );
}
