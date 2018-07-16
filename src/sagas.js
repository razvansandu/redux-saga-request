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
      let response = yield call(requestFunction, requestMapper(action.payload));

      response.data = responseMapper(response.data);

      yield put(routine.success({key, response}));
    } catch (error) {
      yield put(routine.failure({key, error}));
    } finally {
      yield put(routine.fulfill({key}));
    }
  }
}