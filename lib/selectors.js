import Immutable from 'immutable';

export var requestSelector = function requestSelector(state, routine, key) {
  var path = ['api', routine.toString()];
  if (key) {
    path.push(key);
  }
  return state.getIn(path, Immutable.Map());
};