'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestSelector = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestSelector = exports.requestSelector = function requestSelector(state, routine, key) {
  var path = ['api', routine.toString()];
  if (key) {
    path.push(key);
  }
  return state.getIn(path, _immutable2.default.Map());
};