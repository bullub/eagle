'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('babel-runtime/regenerator'));
var $ = _interopDefault(require('jquery'));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

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

/**
 * 应用过滤器链
 * @param filterChain {Array<Function>} 过滤器链
 * @param options {Object} 传入到过滤器中的参数
 * @returns {boolean}
 *          false 中断当前过程(如果的请求，则中断当前请求，如果是响应，则不调用回调)
 */
var applyFilterChain = function () {
  var _ref = asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(filterChain, options) {
    var execResult, i, len;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            execResult = void 0;
            i = 0, len = filterChain.length;

          case 2:
            if (!(i < len)) {
              _context.next = 13;
              break;
            }

            _context.next = 5;
            return filterChain[i].call(this, options);

          case 5:
            execResult = _context.sent;

            if (!(false === execResult)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return', false);

          case 8:
            if (!(true === execResult)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt('break', 13);

          case 10:
            i++;
            _context.next = 2;
            break;

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function applyFilterChain(_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var slice = Array.prototype.slice;

//私有方法，绑定页面上，当前Eagle管辖区域中，有ID的元素到当前的Eagle实例
function bindHasIdEl() {
  var self = this,
      hasIdEls = self.$root.find('*[id]');

  hasIdEls.each(function (idx, elem) {
    var $el = $(elem),
        id = $el.attr('id');

    self['$' + id.replace(/-(.)/g, function (str, $1) {
      return $1.toUpperCase();
    })] = $el;
  });
}

/**
 * 代码管理的根类
 * @param rootElement
 * @constructor
 */
function Eagle() {
  var rootElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

  var self = this,
      $root = void 0,
      events = self.events,
      eventHandlers = self.eventHandlers,

  //表达式中的第一个空格
  _start = void 0,

  //拿到表达式中的事件名
  _event = void 0,

  //拿到表达式中的选择器
  _selector = void 0;

  function proxy(handler) {
    return function (event) {
      try {
        if (this.tagName.toUpperCase() !== 'INPUT') {
          //不是INPUT调用关闭键盘的方法
          Eagle.hideKeyBoard();
        }
      } catch (e) {
        //ignore this
      }
      handler.call(self, event, $(this));
    };
  }

  //初始化根节点
  $root = self.$root = $(rootElement);
  //处理声明式事件绑定
  for (var expression in events) {
    //表达式中的第一个空格
    _start = expression.indexOf(' ');
    //拿到表达式中的事件名
    _event = expression.substring(0, _start);
    //拿到表达式中的选择器
    _selector = expression.slice(_start - expression.length + 1);

    $root.delegate(_selector, _event, proxy(eventHandlers[events[expression]]));
  }

  bindHasIdEl.call(this);
}

Eagle.hideKeyBoard = function () {
  document.activeElement.blur();
};

/**
 * 实现继承
 * @param subClassProto 子类的原型及构造函数
 * @returns {Function} 子类的构造函数
 */
Eagle.extend = function extend(subClassProto) {
  var ParentClass = this;
  //每个子类都必须有自己的构造函数，且子类的构造函数中都必须调用父类的构造函数
  if (!subClassProto || !subClassProto.hasOwnProperty('constructor') || typeof subClassProto.constructor !== 'function') {
    throw new Error('No constructor find in sub class, please check your code!');
  }
  //拿到子类的构造函数
  var SubClassConstructor = subClassProto.constructor;
  //从子类原型链上删掉构造器字段
  delete subClassProto.constructor;

  var innerStructs = ['events', 'eventHandlers', 'responseHandlers'];
  var localProto = '__proto__';

  for (var i = 0, len = innerStructs.length; i < len; i++) {
    if (!(innerStructs[i] in subClassProto)) {
      subClassProto[innerStructs[i]] = {};
    }
  }

  //格式化子类的原型链
  for (var key in subClassProto) {

    //如果说当前的key是一个内部结构依赖的对象，则设置当前的该对象继承原对象
    if (~innerStructs.indexOf(key)) {
      subClassProto[key][localProto] = ParentClass.prototype[key];
    }

    if (!subClassProto[key] || !subClassProto[key].value) {
      subClassProto[key] = {
        value: subClassProto[key],
        enumerable: true,
        writable: true,
        configurable: true
      };
    }
  }

  //实现原型继承
  SubClassConstructor.prototype = Object.create(ParentClass.prototype, subClassProto);

  //  _Parent主要用于子类直接调用父类构造器，实现参数继承
  // 子类不能通过任何方式去修改父类的构造器，父类的构造器在子类中也不可枚举
  SubClassConstructor._Parent = function (self, _args) {
    var args = slice.call(_args);
    ParentClass.apply(self, args);
  };

  //子类的extend方法直接使用父类的
  SubClassConstructor.extend = extend;

  Object.defineProperties(SubClassConstructor.prototype, {
    // 重写子类的原型构造器指向，方便调试查看类继承结构
    constructor: {
      value: SubClassConstructor,
      configurable: false
    },
    //_super指向父类的原型链，子类不能通过任何方式去修改父类的原型链，父类的原型链在子类中也不可枚举
    _super: {
      value: ParentClass.prototype,
      configurable: false
    }
  });

  return SubClassConstructor;
};

//定义Eagle的共有默认属性和方法
Eagle.prototype = {
  constructor: Eagle,
  events: {},
  eventHandlers: {
    //内置时间处理器，阻止冒泡
    stopPropagation: function stopPropagation(e) {
      e.stopPropagation();
    },
    //内置事件处理器，阻止默认行为
    preventDefault: function preventDefault(e) {
      e.preventDefault();
    },
    //内置事件处理器，阻止默认行为并阻止冒泡
    stopAndPrevent: function stopAndPrevent(e) {
      e.stopPropagation();
      e.preventDefault();
    }
  },
  responseHandlers: {}
};

var requestFilterChain = [];
var responseFilterChain = [];

//定义中止当前请求或响应的常量
Eagle.ABORT = false;
//定义请求和响应跳过后续过滤器的常量
Eagle.SKIP_FILTERS = true;
//定义正常继续执行后续过滤器的常量
Eagle.CONTINUE = undefined;

/**
 * 给request组件添加请求过滤器
 * @param {Function} filter 过滤器函数
 *                          入参: {Object} 格式
 *                          {
 *                              //serviceName和apiName是只读属性，修改无效
 *                              serviceName: {String} 服务名
 *                              apiName: {String} 接口名
 *                              //options中的内容可以修改(比如添加头，添加默认上送的数据，修改请求方式等等等等)
 *                              options: {Object} 请求发送时的最后的参数
 *                          }
 *                          该函数返回值可选{Boolean|undefined}
 *                          true: 中断整个过滤链;
 *                          false: 中断整个过程(不发送请求)
 *                          undefined: 继续执行下一个过滤器
 */
Eagle.addRequestFilter = function addPrevInterceptor(filter) {
  requestFilterChain.push(filter);
};

/**
 * 给request组件添加响应过滤器
 * @param {Function} filter 过滤器函数
 *                          入参: {Object} 格式
 *                          {
   *                              serviceName: {String} 服务名
   *                              apiName: {String} 接口名
   *                              options: {Object} 请求发送时的最后的参数
   *                              xhr: {jq.XHR} 请求发送代理对象
   *                              //下面这些参数是过滤器可以赋的传出参数，该参数会在请求响应处理器中使用
   *                              resp: {*} 默认值 undefined
   *                              status: {Number} 默认值 undefined
   *                              headers: {Object} 默认值 undefined
   *                          }
 *                          该函数返回值可选{Boolean|undefined}
 *                          true: 中断整个过滤链;
 *                          false: 中断整个过程(不调用回调)
 *                          undefined: 继续执行下一个过滤器
 */
Eagle.addResponseFilter = function (filter) {
  responseFilterChain.push(filter);
};

/**
 * 根据服务名和api名，以及运行时参数，获取请求的URL地址
 * @param {String} serviceName  服务名
 * @param {String} apiName  接口名
 * @param {Object} options  请求参数
 * @returns {String} 补充完参数后的URL
 */
Eagle.getURL = function getURL(serviceName, apiName, options) {

  if (!window.CONFIG || !CONFIG.SERVICES || !CONFIG.SERVICES[serviceName]) {
    throw new Error('The serviceName [' + serviceName + '] not defined in your config, please check your config!');
  }

  var url = CONFIG.SERVICES[serviceName].API[apiName];

  if (!url) {
    throw new Error('The apiName not defined in your service [' + serviceName + '], please check your config.');
  }

  var params = options.params;
  var queries = options.query;

  if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
    for (var pKey in options) {
      url = url.replace(new RegExp('\[\:\*\]' + pKey), options[pKey]);
    }
  }

  if ((typeof queries === 'undefined' ? 'undefined' : _typeof(queries)) === 'object') {
    url += decodeURIComponent($.param(queries));
  } else if (typeof queries === 'string') {
    url += queries;
  }

  return CONFIG.SERVICES[serviceName].BASE_URL + url;
};Eagle.prototype.request = function () {
  var _ref2 = asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(serviceName, apiName, options) {
    var _this = this;

    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', new Promise(function () {
              var _ref3 = asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(resolve, reject) {

                //预处理
                var handlerResp = function () {
                  var _ref4 = asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(xhr) {
                    var filterOption;
                    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            filterOption = {
                              serviceName: serviceName,
                              apiName: apiName,
                              options: options,
                              xhr: xhr,
                              response: getResponse(xhr),
                              status: getStatus(xhr),
                              headers: getHeaders(xhr)
                            };

                            //如果过滤器链返回了false, 那么直接返回空响应

                            _context2.next = 3;
                            return applyFilterChain.call(self, responseFilterChain, filterOption);

                          case 3:
                            _context2.t0 = _context2.sent;

                            if (!(false === _context2.t0)) {
                              _context2.next = 8;
                              break;
                            }

                            console.warn('响应过滤器链拦截了您的相应！');
                            resolve(null);
                            return _context2.abrupt('return');

                          case 8:

                            // 响应请求
                            resolve({
                              data: filterOption.response,
                              status: filterOption.status,
                              headers: filterOption.headers,
                              request: filterOption.options
                            });

                          case 9:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, this);
                  }));

                  return function handlerResp(_x9) {
                    return _ref4.apply(this, arguments);
                  };
                }();

                var self, _body;

                return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        self = _this;
                        _body = null;

                        if (options.body instanceof FormData) {
                          _body = options.body;
                          options.processData = false;
                          options.contentType = false;
                        }

                        //深拷贝一下参数
                        options = JSON.parse(JSON.stringify(options));

                        if (_body !== null) {
                          options.body = _body;
                        }

                        //根据服务名，接口名获取当前发送请求的地址
                        options.url = Eagle.getURL(serviceName, apiName, options);

                        //首先应用请求发送前的过滤器链，如果过滤器链执行过程中返回了false，则该请求被中断，不再发送
                        _context3.next = 8;
                        return applyFilterChain.call(self, requestFilterChain, {
                          serviceName: serviceName,
                          apiName: apiName,
                          options: options
                        });

                      case 8:
                        _context3.t0 = _context3.sent;

                        if (!(false === _context3.t0)) {
                          _context3.next = 13;
                          break;
                        }

                        console.warn('请求在请求过滤器链中被中断, 请处理您的代码！');
                        resolve(null);
                        return _context3.abrupt('return');

                      case 13:

                        if (options.body instanceof FormData) {
                          delete (options.headers || {})['Content-Type'];
                        }

                        options.success = function (resp, status, xhr) {
                          handlerResp(xhr);
                        };

                        options.error = function (xhr, error) {
                          handlerResp(xhr);
                        };

                        options.data = options.body;

                        $.ajax(options);

                      case 18:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, _this);
              }));

              return function (_x7, _x8) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  function request(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  }

  return request;
}();

function getResponse(xhr) {
  var response = xhr.responseText;
  try {
    response = JSON.parse(response);
  } catch (e) {
    //ignore this
  }

  return response;
}

function getStatus(xhr) {
  return xhr.status;
}

function getHeaders(xhr) {
  var headerTexts = xhr.getAllResponseHeaders().split('\n');
  var headers = {},
      textItem = void 0;
  for (var i = 0, len = headerTexts.length; i < len; i++) {
    textItem = headerTexts[i].match(/([^:]+):\s*(.+)/);
    if (!!textItem) {
      headers[textItem[1]] = textItem[2];
    }
  }
  return headers;
}

module.exports = Eagle;
