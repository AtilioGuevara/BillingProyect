import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StaffleaveState } from '../reducers/staff-leaves.reducer';

const getStaffleavesState =
  createFeatureSelector<StaffleaveState>('staffleaves');

export const selectStaffleaves = createSelector(
  getStaffleavesState,
  (state: StaffleaveState) => state.staffleaves
);
