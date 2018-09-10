import {call, put, takeEvery} from 'redux-saga/effects';

const defaultMapper = data => data;

export function watchRequest(routine, requestFunction, mapper = {}) {
  return takeEvery(routine.TRIGGER, requestSaga(requestFunction, routine, mapper.request, mapper.response));
}

function requestSaga(requestFunction, routine, requestMapper, responseMapper) {
  return function* (action) {

    if (!requestMapper) requestMapper = defaultMapper;
    if (!responseMapper) responseMapper = defaultMapper;

    const key = action.payload && (action.payload.key || action.payload.id);
    try {
      const requestData = action.payload;
      let response = yield call(requestFunction, requestMapper(requestData));

      response = responseMapper(response);
      yield put(routine.success({key, response, requestData}));
    } catch (error) {
      yield put(routine.failure({key, error}));
    } finally {
      yield put(routine.fulfill({key}));
    }
  }
}