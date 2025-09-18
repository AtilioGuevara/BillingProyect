import { Action, createReducer, on } from '@ngrx/store';
import { LeaveRequest } from '../../components/apps-hospital-staff-leave-add/apps-hospital-staff-leave-add.component';
import {
  addStaffleaveSuccess,
  deleteStaffleavesuccess,
  loadStaffleavesSuccess,
  updateStaffleaveSuccess,
} from '../actions/staff-leaves.actions';

export interface StaffleaveState {
  staffleaves: LeaveRequest[];
  error: any;
}

const initialState: StaffleaveState = {
  staffleaves: [],
  error: null,
};

export const staffleaveReducer = createReducer(
  initialState,
  on(loadStaffleavesSuccess, (state, { staffleaves }) => ({
    ...state,
    staffleaves,
  })),

  on(updateStaffleaveSuccess, (state, { Staffleave }) => ({
    ...state,
    Staffleaves: state.staffleaves.map((s) =>
      s.leaveType === Staffleave.leaveType ? Staffleave : s
    ),
  })),
  on(addStaffleaveSuccess, (state, { Staffleave }) => ({
    ...state,
    Staffleaves: [...state.staffleaves, Staffleave],
  })),

  on(deleteStaffleavesuccess, (state, { staffleaveId }) => ({
    ...state,
    Staffleaves: state.staffleaves.filter(
      (Staffleave) => Staffleave.staffleaveId !== staffleaveId
    ),
  }))
);
