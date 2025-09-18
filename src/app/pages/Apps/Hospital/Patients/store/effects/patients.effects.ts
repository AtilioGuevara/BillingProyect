import { Injectable, Inject, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PatientService } from '../../service/patients.service';
import {
  addPatient,
  addPatientFailure,
  addPatientSuccess,
  deletePatient,
  deletePatientFailure,
  deletePatientSuccess,
  loadPatients,
  loadPatientsFailure,
  loadPatientsSuccess,
  updatePatient,
  updatePatientFailure,
  updatePatientSuccess,
} from '../actions/patients.actions';

@Injectable()
export class PatientsEffects {
  private patientService = inject(PatientService);
  actions$ = inject(Actions);

  addPatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPatient),
      switchMap(({ Patient }) => {
        return this.patientService.addPatient(Patient).pipe(
          map((addedPatient) => {
            return addPatientSuccess({ Patient: addedPatient });
          }),
          catchError((error) => {
            console.error('Error adding patient', error);
            return of(addPatientFailure({ error }));
          })
        );
      })
    )
  );


  updatePatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePatient),
      mergeMap(({ Patient }) =>
        this.patientService.updatePatient(Patient).pipe(
          map((updatedPatient) =>
            updatePatientSuccess({ Patient: updatedPatient })
          ),
          catchError((error) => of(updatePatientFailure({ error })))
        )
      )
    )
  );

  loadPatients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPatients),
      mergeMap(() =>
        this.patientService.getPatient().pipe(
          map((patients) => loadPatientsSuccess({ patients })),
          catchError((error) => of(loadPatientsFailure({ error })))
        )
      )
    )
  );

  deletePatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePatient),
      mergeMap(({ PatientID }) =>
        this.patientService.deletePatient(PatientID).pipe(
          map(() => deletePatientSuccess({ PatientID })),
          catchError((error) => of(deletePatientFailure({ error })))
        )
      )
    )
  );
}
