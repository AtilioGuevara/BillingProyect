import { Injectable, Inject, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { StaffLeaveService } from '../../service/staff-leaves.service';
import {
  addStaffleave,
  addStaffleaveFailure,
  addStaffleaveSuccess,
  deleteStaffleave,
  deleteStaffleaveFailure,
  deleteStaffleavesuccess,
  loadStaffleaves,
  loadStaffleavesFailure,
  loadStaffleavesSuccess,
  updateStaffleave,
  updateStaffleaveFailure,
  updateStaffleaveSuccess,
} from '../actions/staff-leaves.actions';

@Injectable()
export class StaffleavesEffects {
  private staffleaveService = inject(StaffLeaveService);
  actions$ = inject(Actions);

  addStaffleave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addStaffleave),
      mergeMap(({ Staffleave }) =>
        this.staffleaveService.addStaffleave(Staffleave).pipe(
          map((addp) => addStaffleaveSuccess({ Staffleave: addp })),
          catchError((error) => of(addStaffleaveFailure({ error })))
        )
      )
    )
  );

  updateStaffleave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateStaffleave),
      mergeMap(({ Staffleave }) =>
        this.staffleaveService.updateStaffleave(Staffleave).pipe(
          map((updatedStaffleave) =>
            updateStaffleaveSuccess({ Staffleave: updatedStaffleave })
          ),
          catchError((error) => of(updateStaffleaveFailure({ error })))
        )
      )
    )
  );

  loadStaffleaves$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStaffleaves),
      mergeMap(() =>
        this.staffleaveService.getStaffleave().pipe(
          map((staffleaves) => loadStaffleavesSuccess({ staffleaves })),
          catchError((error) => of(loadStaffleavesFailure({ error })))
        )
      )
    )
  );

  deleteStaffleave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteStaffleave),
      mergeMap(({ staffleaveId }) =>
        this.staffleaveService.deleteStaffleave(staffleaveId).pipe(
          map(() => deleteStaffleavesuccess({ staffleaveId })),
          catchError((error) => of(deleteStaffleaveFailure({ error })))
        )
      )
    )
  );
}
