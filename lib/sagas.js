'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchRequest = watchRequest;

var _effects = require('redux-saga/effects');

var defaultMapper = function defaultMapper(data) {
  return data;
};

function watchRequest(routine, requestFunction) {
  var mapper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return (0, _effects.takeEvery)(routine.TRIGGER, requestSaga(requestFunction, routine, mapper.request, mapper.response));
}

function requestSaga(requestFunction, routine, requestMapper, responseMapper) {
  return (/*#__PURE__*/regeneratorRuntime.mark(function _callee(action) {
      var key, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:

              if (!requestMapper) requestMapper = defaultMapper;
              if (!responseMapper) responseMapper = defaultMapper;

              key = action.payload && (action.payload.key || action.payload.id);
              _context.prev = 3;
              _context.next = 6;
              return (0, _effects.call)(requestFunction, requestMapper(action.payload));

            case 6:
              response = _context.sent;


              response.data = responseMapper(response.data);

              _context.next = 10;
              return (0, _effects.put)(routine.success({ key: key, response: response }));

            case 10:
              _context.next = 16;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](3);
              _context.next = 16;
              return (0, _effects.put)(routine.failure({ key: key, error: _context.t0 }));

            case 16:
              _context.prev = 16;
              _context.next = 19;
              return (0, _effects.put)(routine.fulfill({ key: key }));

            case 19:
              return _context.finish(16);

            case 20:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 12, 16, 20]]);
    })
  );
}