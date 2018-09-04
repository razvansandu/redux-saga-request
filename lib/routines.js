import { createAction } from 'redux-actions';

export var TRIGGER = 'TRIGGER';
export var REQUEST = 'REQUEST';
export var SUCCESS = 'SUCCESS';
export var FAILURE = 'FAILURE';
export var FULFILL = 'FULFILL';

var routineStages = [TRIGGER, REQUEST, SUCCESS, FAILURE, FULFILL];

export function createRoutine(typePrefix, storeKey) {
  for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    params[_key - 2] = arguments[_key];
  }

  var createActionCreator = function createActionCreator(type) {
    return createAction.apply(undefined, [typePrefix + '/' + type].concat(params));
  };

  var routine = routineStages.reduce(function (result, stage) {
    var _Object$assign;

    var actionCreator = createActionCreator(stage);
    return Object.assign(result, (_Object$assign = {}, _Object$assign[stage.toLowerCase()] = actionCreator, _Object$assign[stage.toUpperCase()] = actionCreator.toString(), _Object$assign));
  }, createActionCreator(routineStages[0]));

  routine.toString = function () {
    return storeKey || typePrefix;
  };

  return routine;
}