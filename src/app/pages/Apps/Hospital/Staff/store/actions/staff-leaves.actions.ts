import { createAction, props } from '@ngrx/store';
import { LeaveRequest } from '../../components/apps-hospital-staff-leave-add/apps-hospital-staff-leave-add.component';

// Load Staffleaves
export const loadStaffleaves = createAction('[Staffleave] Load Staffleaves');
export const loadStaffleavesSuccess = createAction(
  '[Staffleave] Load Staffleaves Success',
  props<{ staffleaves: LeaveRequest[] }>()
);
export const loadStaffleavesFailure = createAction(
  '[Staffleave] Load Staffleaves Failure',
  props<{ error: any }>()
);

// Update Staffleave
export const updateStaffleave = createAction(
  '[Staffleave] Update Staffleave',
  props<{ Staffleave: LeaveRequest }>()
);
export const updateStaffleaveSuccess = createAction(
  '[Staffleave] Update Staffleave Success',
  props<{ Staffleave: LeaveRequest }>()
);
export const updateStaffleaveFailure = createAction(
  '[Staffleave] Update Staffleave Failure',
  props<{ error: any }>()
);

export const addStaffleave = createAction(
  '[Staffleave] Add Staffleave',
  props<{ Staffleave: LeaveRequest }>()
);
export const addStaffleaveSuccess = createAction(
  '[Staffleave] Add Staffleave Success',
  props<{ Staffleave: LeaveRequest }>()
);
export const addStaffleaveFailure = createAction(
  '[Staffleave] Add Staffleave Failure',
  props<{ error: any }>()
);

export const deleteStaffleave = createAction(
  '[Staffleave] Delete Staffleave',
  props<{ staffleaveId: string }>()
);

export const deleteStaffleavesuccess = createAction(
  '[Staffleave] Delete Staffleave Success',
  props<{ staffleaveId: string }>()
);

export const deleteStaffleaveFailure = createAction(
  '[Staffleave] Delete Staffleave Failure',
  props<{ error: any }>()
);
