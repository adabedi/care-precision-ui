import { LocationEnum, Patient } from 'types/Patient';
/* --- STATE --- */
export interface PatientsList {
  loading: boolean;
  error?: PatientsErrorType | null;
  patientsList: [] | Patient[];
  filters: {
    sort: {
      sortKey: null | SortKey;
      sortDir: null | SortDir;
    };
    location?: LocationEnum;
    filter?: { filterKey: string; filterDir: string };
  };
  search?: {
    location?: LocationEnum;
    name?: string;
    birthDate?: string;
  };
}

export enum SortKey {
  UUID = 'uuid',
  NAME = 'name',
  BIRTH_DATE = 'birth_date',
}
export enum SortDir {
  ASC = 'asc',
  DESC = 'desc',
}

export enum PatientsErrorType {
  RESPONSE_ERROR = 1,
  USER_HAS_NO_RECORDS = 'There are no results',
}

export type ContainerState = PatientsList;
