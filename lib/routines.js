'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FULFILL = exports.FAILURE = exports.SUCCESS = exports.REQUEST = exports.TRIGGER = undefined;
exports.createRoutine = createRoutine;

var _reduxActions = require('redux-actions');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TRIGGER = exports.TRIGGER = 'TRIGGER';
var REQUEST = exports.REQUEST = 'REQUEST';
var SUCCESS = exports.SUCCESS = 'SUCCESS';
var FAILURE = exports.FAILURE = 'FAILURE';
var FULFILL = exports.FULFILL = 'FULFILL';

var routineStages = [TRIGGER, REQUEST, SUCCESS, FAILURE, FULFILL];

function createRoutine(typePrefix, storeKey) {
  for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    params[_key - 2] = arguments[_key];
  }

  var createActionCreator = function createActionCreator(type) {
    return _reduxActions.createAction.apply(undefined, [typePrefix + '/' + type].concat(params));
  };

  var routine = routineStages.reduce(function (result, stage) {
    var _Object$assign;

    var actionCreator = createActionCreator(stage);
    return Object.assign(result, (_Object$assign = {}, _defineProperty(_Object$assign, stage.toLowerCase(), actionCreator), _defineProperty(_Object$assign, stage.toUpperCase(), actionCreator.toString()), _Object$assign));
  }, createActionCreator(routineStages[0]));

  routine.toString = function () {
    return storeKey || typePrefix;
  };

  return routine;
}