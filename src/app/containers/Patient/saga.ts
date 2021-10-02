import { put, takeLatest, delay, call } from 'redux-saga/effects';
import { actions } from './slice';
import { fake } from 'utils/fake';
import { getConfigValue } from 'utils/getConfigValue';
import { getEnvTruthly } from 'utils/mockRequest';
import { request } from 'utils/request';
import { PatientErrorType } from './types';

function getRequestURL(id) {
  return `${getConfigValue('REACT_APP_API')}/patients/${id}`;
}
export function* getPatient(action) {
  const { payload } = action;
  yield delay(500);
  yield delay(500);
  const requestURL = getRequestURL(payload);

  if (getEnvTruthly('REACT_APP_STATIC')) {
    return yield put(
      actions.patientLoaded(
        fake.PATIENT_LIST.find(({ identifier: { id } }) => id === payload),
      ),
    );
  }
  try {
    const patient = yield call(request, requestURL);
    if (patient) {
      yield put(actions.patientLoaded(patient));
    } else {
      yield put(actions.patientError(PatientErrorType.NO_PATIENT));
    }
  } catch (err) {
    yield put(actions.patientError(PatientErrorType.RESPONSE_ERROR));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* patientSaga() {
  yield takeLatest(actions.loadPatient.type, getPatient);
}
