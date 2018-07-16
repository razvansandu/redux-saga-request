import {createAction} from 'redux-actions';

export const TRIGGER = 'TRIGGER';
export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const FULFILL = 'FULFILL';

const routineStages = [TRIGGER, REQUEST, SUCCESS, FAILURE, FULFILL];

export function createRoutine(typePrefix, storeKey, ...params) {
  const createActionCreator = (type) => createAction(`${typePrefix}/${type}`, ...params);

  let routine = routineStages.reduce(
    (result, stage) => {
      const actionCreator = createActionCreator(stage);
      return Object.assign(result, {
        [stage.toLowerCase()]: actionCreator,
        [stage.toUpperCase()]: actionCreator.toString(),
      });
    },
    createActionCreator(routineStages[0])
  );

  routine.toString = () => storeKey || typePrefix;

  return routine;
}

