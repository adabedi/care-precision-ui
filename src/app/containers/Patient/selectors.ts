import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const pateintDomain = (state: RootState) => state?.patient || initialState;

export const selectLoading = createSelector(
  [pateintDomain],
  patient => patient.loading,
);

export const selectPatient = createSelector(
  [pateintDomain],
  patient => patient.patient,
);

export const selectName = createSelector(
  [pateintDomain],
  patient => patient.patient?.name,
);

export const selectNHS = createSelector(
  [pateintDomain],
  patient => patient.patient?.identifier.nhsNumber,
);
export const selectDOB = createSelector(
  [pateintDomain],
  patient => patient.patient?.birthDate,
);

export const selectNews2 = createSelector(
  [pateintDomain],
  patient => patient.patient?.news2,
);

export const selectSepsis = createSelector(
  [pateintDomain],
  patient => patient.patient?.sepsis,
);

export const selectDenwis = createSelector(
  [pateintDomain],
  patient => patient.patient?.denwis,
);

export const selectCovid = createSelector(
  [pateintDomain],
  patient => patient.patient?.covid,
);

export const selectFrailty = createSelector(
  [pateintDomain],
  patient => patient.patient?.measurements.frailty,
);

export const selectHeight = createSelector(
  [pateintDomain],
  patient => patient?.patient?.measurements.height,
);

export const selectWeight = createSelector(
  [pateintDomain],
  patient => patient?.patient?.measurements.weight,
);
