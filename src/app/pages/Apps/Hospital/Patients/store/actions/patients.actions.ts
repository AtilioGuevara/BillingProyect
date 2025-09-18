import { createAction, props } from '@ngrx/store';
import { Patient } from '../../components/apps-hospital-patients-create/apps-hospital-patients-create.component';

// Load Patients
export const loadPatients = createAction('[Patient] Load Patients');
export const loadPatientsSuccess = createAction(
  '[Patient] Load Patients Success',
  props<{ patients: Patient[] }>()
);
export const loadPatientsFailure = createAction(
  '[Patient] Load Patients Failure',
  props<{ error: any }>()
);

// Update Patient
export const updatePatient = createAction(
  '[Patient] Update Patient',
  props<{ Patient: Patient }>()
);
export const updatePatientSuccess = createAction(
  '[Patient] Update Patient Success',
  props<{ Patient: Patient }>()
);
export const updatePatientFailure = createAction(
  '[Patient] Update Patient Failure',
  props<{ error: any }>()
);

export const addPatient = createAction(
  '[Patient] Add Patient',
  props<{ Patient: Patient }>()
);
export const addPatientSuccess = createAction(
  '[Patient] Add Patient Success',
  props<{ Patient: Patient }>()
);
export const addPatientFailure = createAction(
  '[Patient] Add Patient Failure',
  props<{ error: any }>()
);

export const deletePatient = createAction(
  '[Patient] Delete Patient',
  props<{ PatientID: string }>()
);

export const deletePatientSuccess = createAction(
  '[Patient] Delete Patient Success',
  props<{ PatientID: string }>()
);

export const deletePatientFailure = createAction(
  '[Patient] Delete Patient Failure',
  props<{ error: any }>()
);
