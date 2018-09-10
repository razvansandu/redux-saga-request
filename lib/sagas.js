'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.watchRequest = watchRequest;

var _effects = require('redux-saga/effects');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultMapper = function defaultMapper(data) {
  return data;
};

function watchRequest(routine, requestFunction) {
  var mapper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return (0, _effects.takeEvery)(routine.TRIGGER, requestSaga(requestFunction, routine, mapper.request, mapper.response));
}

function requestSaga(requestFunction, routine, requestMapper, responseMapper) {
  return (/*#__PURE__*/_regenerator2.default.mark(function _callee(action) {
      var key, requestData, response;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:

              if (!requestMapper) requestMapper = defaultMapper;
              if (!responseMapper) responseMapper = defaultMapper;

              key = action.payload && (action.payload.key || action.payload.id);
              _context.prev = 3;
              requestData = action.payload;
              _context.next = 7;
              return (0, _effects.call)(requestFunction, requestMapper(requestData));

            case 7:
              response = _context.sent;


              response = responseMapper(response);
              _context.next = 11;
              return (0, _effects.put)(routine.success({ key: key, response: response, requestData: requestData }));

            case 11:
              _context.next = 17;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context['catch'](3);
              _context.next = 17;
              return (0, _effects.put)(routine.failure({ key: key, error: _context.t0 }));

            case 17:
              _context.prev = 17;
              _context.next = 20;
              return (0, _effects.put)(routine.fulfill({ key: key }));

            case 20:
              return _context.finish(17);

            case 21:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 13, 17, 21]]);
    })
  );
}