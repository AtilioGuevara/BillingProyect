import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PatientState } from '../reducers/patients.reducer';

// Create a feature selector for the 'patients' feature state
const getPatientsState = createFeatureSelector<PatientState>('patients');

// Create a selector to get the patients array from the state
export const selectPatients = createSelector(
  getPatientsState,
  (state: PatientState) => state.patients
);
