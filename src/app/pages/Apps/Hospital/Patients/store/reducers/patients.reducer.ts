import { Action, createReducer, on } from '@ngrx/store';
import { Patient } from '../../components/apps-hospital-patients-create/apps-hospital-patients-create.component';
import {
  addProductSuccess,
  deleteProductSuccess,
} from '../../../../Ecommerce/Products/store/actions/product.actions';
import {
  addPatientSuccess,
  deletePatientSuccess,
  loadPatients,
  loadPatientsSuccess,
  updatePatientSuccess,
} from '../actions/patients.actions';

export interface PatientState {
  patients: Patient[];
  error: any;
}

const initialState: PatientState = {
  patients: [],
  error: null,
};

export const patientReducer = createReducer(
  initialState,
  on(loadPatientsSuccess, (state, { patients }) => ({ ...state, patients })),

  on(updatePatientSuccess, (state, { Patient }) => ({
    ...state,
    patients: state.patients.map((p) =>
      p.firstName === Patient.firstName ? Patient : p
    ),
  })),
  on(addPatientSuccess, (state, { Patient }) => ({
    ...state,
    patients: [...state.patients, Patient],
  })),

  on(deletePatientSuccess, (state, { PatientID }) => ({
    ...state,
    patients: state.patients.filter(
      (patient) => patient.patientID !== PatientID
    ),
  }))
);
