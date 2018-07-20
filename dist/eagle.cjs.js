'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('babel-runtime/regenerator'));
require('jquery');

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var Eagle = function () {
  function Eagle() {
    var rootElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    classCallCheck(this, Eagle);
    Object.defineProperty(this, 'events', {
      enumerable: true,
      writable: true,
      value: {
        'click div': 'aa'
      }
    });
    Object.defineProperty(this, 'eventHandlers', {
      enumerable: true,
      writable: true,
      value: {
        aa: function aa(e, $el) {
          e.preventDefault();
        }
      }
    });

    var events = this._events;
    var eventHandlers = this._eventHandlers;

    debugger;
  }

  createClass(Eagle, [{
    key: 'request',
    value: function (_request) {
      function request(_x, _x2, _x3) {
        return _request.apply(this, arguments);
      }

      request.toString = function () {
        return _request.toString();
      };

      return request;
    }(function () {
      var _ref = asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(serviceName, apiName, options) {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', request.send(options));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x5, _x6, _x7) {
        return _ref.apply(this, arguments);
      };
    }())
  }, {
    key: '_events',
    get: function get$$1() {
      debugger;
      var events = this.events;
      var events1 = get(Eagle.prototype.__proto__ || Object.getPrototypeOf(Eagle.prototype), 'events', this);
      debugger;
    }
  }, {
    key: '_eventHandlers',
    get: function get$$1() {
      debugger;
      var events = this.eventHandlers;
      var events1 = get(Eagle.prototype.__proto__ || Object.getPrototypeOf(Eagle.prototype), 'eventHandlers', this);

      debugger;
    }
  }]);
  return Eagle;
}();

module.exports = Eagle;
