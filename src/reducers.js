import Immutable from 'immutable';

export const apiReducer = (routine, initialState = Immutable.Map()) => (state = initialState, action) => {
  const key = action.payload && (action.payload.key || action.payload.id);
  switch (action.type) {
    case routine.TRIGGER:
      return state
        .setIn(getPath(key, 'loading'), true)
        .setIn(getPath(key, 'succeeded'), false)
        .setIn(getPath(key, 'error'), null);
    case routine.SUCCESS:
      return state
        .setIn(getPath(key, 'data'), Immutable.fromJS(action.payload.response.data))
        .setIn(getPath(key, 'succeeded'), true);
    case routine.FAILURE:
      return state
        .setIn(getPath(key, 'succeeded'), false)
        .setIn(getPath(key, 'error'), action.error);
    case routine.FULFILL:
      return state
        .setIn(getPath(key, 'loading'), false);
    default:
      return state;
  }
};

export const paginationApiReducer = (routine, continuous = false, initialState = Immutable.Map()) => (state = initialState, action) => {
  const key = action.payload && (action.payload.key || action.payload.id);
  switch (action.type) {
    case routine.TRIGGER:
      if (!action.payload) {
        action.payload = {};
      }

      if (!(action.payload.page >= 0)) {
        throw new Error('Page parameter is missing!');
      }

      const isFirstPage = action.payload.page === 0;
      if (isFirstPage)
        state = state.setIn(getPath(key, 'data'), Immutable.List());

      return state
        .setIn(getPath(key, 'loading'), true)
        .setIn(getPath(key, 'succeeded'), false)
        .setIn(getPath(key, 'error'), null)
        .setIn(getPath(key, 'page'), action.payload.page);

    case routine.SUCCESS:
      const {items, total} = action.payload.response.data;
      const immutableItems = Immutable.fromJS(items);

      return state
        .updateIn(getPath(key, 'data'), oldData => continuous ? oldData.concat(immutableItems) : immutableItems)
        .setIn(getPath(key, 'succeeded'), true)
        .setIn(getPath(key, 'total'), total);

    case routine.FAILURE:
      return state
        .setIn(getPath(key, 'succeeded'), false)
        .setIn(getPath(key, 'error'), action.error);

    case routine.FULFILL:
      return state
        .setIn(getPath(key, 'loading'), false);

    default:
      return state;
  }
};

const getPath = (key, property) => key ? [key, property] : [property];