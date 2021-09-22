import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import { fake, searchByNameOrNhs } from 'utils/fake';
import { patientListParser, keysToCamel } from 'utils/formatters';
import { actions } from './slice';
import { getConfigValue } from 'utils/getConfigValue';
import { getEnvTruthly } from 'utils/mockRequest';

export function* searchRecord(action) {
  yield delay(500);

  const base = `${getConfigValue('REACT_APP_API')}/patients`;

  if (getEnvTruthly('REACT_APP_STATIC')) {
    const result = searchByNameOrNhs(fake.PATIENT_LIST, action.payload.search);
    return yield put(actions.searchRecordsLoaded(result));
  }

  const requestURL = `${base}/patient${action?.payload?.search}`;
  try {
    const patientsList = yield call(request, requestURL);
    const formatedPatientList = patientListParser(keysToCamel(patientsList));
    if (formatedPatientList?.length > 0) {
      yield put(actions.searchRecordsLoaded(formatedPatientList));
    } else {
      yield put(actions.searchRecordsError('NO RESULTS'));
    }
  } catch (err) {
    yield put(actions.searchRecordsError('Response Error'));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* searchRecordsSaga() {
  yield takeLatest(actions.searchRecord.type, searchRecord);
}
