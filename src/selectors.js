import Immutable from 'immutable';

export const requestSelector = (state, routine, key) => {
  let path = ['api', routine.toString()];
  if (key) {
    path.push(key);
  }
  return state.getIn(path, Immutable.Map());
};
