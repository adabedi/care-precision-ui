import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import { fake } from 'utils/fake';
import { patientParser, keysToCamel, keysToSnake } from 'utils/formatters';
import { serializeAssessmentJSON } from 'utils/formatters/serialize';
import { PatientErrorType } from './types';
import { actions } from './slice';

export function* getRecord(action) {
  yield delay(500);
  const requestURL = `${
    (window as any)._env_.REACT_APP_API
  }/meta/demographics/patient_list?search_key=id&search_value=${
    action.payload
  }`;

  if ((window as any)._env_.REACT_APP_STATIC) {
    return yield put(
      actions.recordLoaded(
        patientParser(
          keysToCamel(
            fake.PATIENT_LIST.find(element => element.id === action.payload),
          ),
        ),
      ),
    );
  }
  try {
    const patient = yield call(request, requestURL);
    if (Object.keys(patient[0]).length > 0) {
      yield put(actions.recordLoaded(patientParser(keysToCamel(patient[0]))));
    } else {
      yield put(actions.recordError(PatientErrorType.USER_HAS_NO_RECORDS));
    }
  } catch (err) {
    yield put(actions.recordError(PatientErrorType.RESPONSE_ERROR));
  }
}

export function* makeCalculations(action) {
  yield delay(500);
  const requestURL = `${(window as any)._env_.REACT_APP_API}/cdr/draft`;
  const { obsType, assessmentForm } = action.payload;
  const now = new Date();
  if ((window as any)._env_.REACT_APP_STATIC) {
    const result = keysToCamel(fake.ASSESSMENTS_RESULT[`${obsType}`]);
    result[`${obsType}`].lastUpdate = now.toISOString();
    return yield put(
      actions.calculatedResult({
        ...result,
      }),
    );
  }
  try {
    const result = yield call(request, requestURL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify([
        {},
        { [`${obsType}`]: keysToSnake(assessmentForm) },
      ]),
    });

    if (Object.keys(result).length > 0) {
      result[`${obsType}`].lastUpdate = now;

      yield put(
        actions.calculatedResult({
          ...keysToCamel(result),
        }),
      );
    } else {
      yield put(actions.calculationError(PatientErrorType.USER_HAS_NO_RECORDS));
    }
  } catch (err) {
    yield put(actions.calculationError(PatientErrorType.RESPONSE_ERROR));
  }
}

function download(content, fileName, contentType) {
  var a = document.createElement('a');
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

export function* submitAssessment(action) {
  yield delay(500);
  // const requestURL = `${(window as any)._env_.REACT_APP_API}/cdr/`;
  const formatedAssessment = serializeAssessmentJSON(action.payload);

  if ((window as any)._env_.REACT_APP_STATIC) {
    download(JSON.stringify(formatedAssessment), 'json.txt', 'text/plain');
    return yield put(actions.successAssesment());
  }
  return yield put(actions.successAssesment());

  // try {
  //   yield call(request, requestURL, {
  //     method: 'POST',
  //     mode: 'cors',
  //     cache: 'no-cache',
  //     // credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     body: JSON.stringify(formatedAssessment),
  //   });
  //   yield put(actions.successAssesment());
  // } catch (err) {
  //   yield put(actions.calculationError(PatientErrorType.RESPONSE_ERROR));
  // }
}
/**
 * Root saga manages watcher lifecycle
 */
export function* assessmentEventSaga() {
  yield takeLatest(actions.loadRecord.type, getRecord);
  yield takeLatest(actions.calculateResult.type, makeCalculations);
  yield takeLatest(actions.pendingAssessment.type, submitAssessment);
}
