'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paginationApiReducer = exports.apiReducer = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiReducer = exports.apiReducer = function apiReducer(routine) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _immutable2.default.Map();
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    var key = action.payload && (action.payload.key || action.payload.id);
    switch (action.type) {
      case routine.TRIGGER:
        return state.setIn(getPath(key, 'loading'), true).setIn(getPath(key, 'succeeded'), false).setIn(getPath(key, 'error'), null);
      case routine.SUCCESS:
        return state.setIn(getPath(key, 'data'), _immutable2.default.fromJS(action.payload.response.data)).setIn(getPath(key, 'succeeded'), true);
      case routine.FAILURE:
        return state.setIn(getPath(key, 'succeeded'), false).setIn(getPath(key, 'error'), action.error);
      case routine.FULFILL:
        return state.setIn(getPath(key, 'loading'), false);
      default:
        return state;
    }
  };
};

var paginationApiReducer = exports.paginationApiReducer = function paginationApiReducer(routine) {
  var continuous = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var initialState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _immutable2.default.Map();
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    var key = action.payload && (action.payload.key || action.payload.id);
    switch (action.type) {
      case routine.TRIGGER:
        if (!action.payload) {
          action.payload = {};
        }

        if (!(action.payload.page >= 0)) {
          throw new Error('Page parameter is missing!');
        }

        var isFirstPage = action.payload.page === 0;
        if (isFirstPage) state = state.setIn(getPath(key, 'data'), _immutable2.default.List());

        return state.setIn(getPath(key, 'loading'), true).setIn(getPath(key, 'succeeded'), false).setIn(getPath(key, 'error'), null).setIn(getPath(key, 'page'), action.payload.page);

      case routine.SUCCESS:
        var _action$payload$respo = action.payload.response.data,
            items = _action$payload$respo.items,
            total = _action$payload$respo.total;

        var immutableItems = _immutable2.default.fromJS(items);

        return state.updateIn(getPath(key, 'data'), function (oldData) {
          return continuous ? oldData.concat(immutableItems) : immutableItems;
        }).setIn(getPath(key, 'succeeded'), true).setIn(getPath(key, 'total'), total);

      case routine.FAILURE:
        return state.setIn(getPath(key, 'succeeded'), false).setIn(getPath(key, 'error'), action.error);

      case routine.FULFILL:
        return state.setIn(getPath(key, 'loading'), false);

      default:
        return state;
    }
  };
};

var getPath = function getPath(key, property) {
  return key ? [key, property] : [property];
};