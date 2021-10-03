import { PayloadAction } from '@reduxjs/toolkit';
import { LocationEnum, Patient } from 'types/Patient';
import { createSlice } from '../../../utils/@reduxjs/toolkit';
import { ContainerState, PatientsErrorType, SortDir, SortKey } from './types';
// The initial state of the PatientList container
export const initialState: ContainerState = {
  loading: false,
  error: null,
  patientsList: [],
  filters: {
    sort: { sortKey: SortKey.BIRTH_DATE, sortDir: SortDir.DESC },
    location: LocationEnum.BEDROOM,
    filter: { filterKey: '', filterDir: '' },
  },
};

const patientsListFromSlice = createSlice({
  name: 'patientsList',
  initialState,
  reducers: {
    loadRecords(state, action) {
      state.loading = true;
      state.error = null;
      state.patientsList = [];
    },
    recordsLoaded(state, action: PayloadAction<Patient[]>) {
      state.loading = false;
      state.error = null;
      state.patientsList = action.payload;
    },
    recordsError(state, action: PayloadAction<PatientsErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
    addFilters(state, action) {
      const { sort = null, filter = null } = action.payload;
      if (sort) {
        state.filters.sort = sort;
      }
      state.filters.filter = filter;
    },
  },
});

export const { actions, reducer, name: sliceKey } = patientsListFromSlice;
