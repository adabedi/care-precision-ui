import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import { getEnvTruthly } from 'utils/mockRequest';
import { getConfigValue } from 'utils/getConfigValue';
import { fake, sort } from 'utils/fake';
import { PatientsErrorType } from './types';
import { actions } from './slice';

const { PATIENT_LIST } = fake;

// function getRequestURL(params) {
//   const base = `${
//     (window as any)[
//       `${process.env.NODE_ENV === 'production' ? 'injectedEnv' : '_env_'}`
//     ]['REACT_APP_API']
//   }/meta/demographics/patient_list`;

//   const filter = params?.filter ? params.filter : null;
//   const sort = params?.sort ? params.sort : null;

//   const filterURL = filter?.sepsis
//     ? `filter_key=${filter.sepsis.key}&filter_value=${filter.sepsis.value}`
//     : '';
//   const filterURLdenwis = filter?.denwis
//     ? '&filter_key=denwis&filter_gte=4'
//     : '';
//   const filterURLcovid = filter?.covid
//     ? `filter_key=${filter.covid.key}&filter_value=${filter.covid.value}`
//     : '';
//   const order = sort?.key
//     ? `&sort_key=${sort.key}&sort_value=${sort.value}`
//     : '';

//   return `${base}?${filterURL}${filterURLdenwis}${filterURLcovid}${order}`;
// }

function getRequestURL(params) {
  const { sort } = params;
  const base = `${getConfigValue('REACT_APP_API')}/patients`;
  const order = sort?.sortKey
    ? `&sort_key=${sort.sortKey}&sort_dir=${sort.sortDir}`
    : '';
  return `${base}?${order}`;
}
export function* getRecords(action) {
  const { payload } = action;
  yield delay(500);
  const requestURL = getRequestURL(payload);

  if (getEnvTruthly('REACT_APP_STATIC')) {
    const sorted = sort(PATIENT_LIST, payload.sort);
    return yield put(actions.recordsLoaded(sorted));
  }

  try {
    const patientsList = yield call(request, requestURL);
    if (patientsList?.length > 0) {
      yield put(actions.recordsLoaded(patientsList));
    } else {
      yield put(actions.recordsError(PatientsErrorType.USER_HAS_NO_RECORDS));
    }
  } catch (err) {
    yield put(actions.recordsError(PatientsErrorType.RESPONSE_ERROR));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* patientListFromSaga() {
  yield takeLatest(actions.loadRecords.type, getRecords);
}
