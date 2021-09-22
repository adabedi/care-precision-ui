import { Patient } from 'types/Patient';
/* --- STATE --- */
export interface SearchPatientRecord {
  loading: boolean;
  error?: any | null;
  patientsList: [] | Patient[];
}

export type ContainerState = SearchPatientRecord;
