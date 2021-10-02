import { Patient } from 'types/Patient';

/* --- STATE --- */
export interface PatientState {
  loading: boolean;
  error?: PatientErrorType | null;
  patient: Patient | null;
}

export enum PatientErrorType {
  RESPONSE_ERROR = 1,
  NO_PATIENT = 2,
}

export type ContainerState = PatientState;
