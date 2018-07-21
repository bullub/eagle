import $ from 'jquery';

const slice = Array.prototype.slice;

//私有方法，绑定页面上，当前Eagle管辖区域中，有ID的元素到当前的Eagle实例
function bindHasIdEl() {
  let self = this,
    hasIdEls = self.$root.find('*[id]');

  hasIdEls.each(function (idx, elem) {
    let $el = $(elem),
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
function Eagle(rootElement = document.body) {
  let self = this,
    $root,
    events = self.events,
    eventHandlers = self.eventHandlers,
    //表达式中的第一个空格
    _start,
    //拿到表达式中的事件名
    _event,
    //拿到表达式中的选择器
    _selector;

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
  for (let expression in events) {
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
  let ParentClass = this;
  //每个子类都必须有自己的构造函数，且子类的构造函数中都必须调用父类的构造函数
  if (!subClassProto || !subClassProto.hasOwnProperty('constructor') || typeof subClassProto.constructor !== 'function') {
    throw new Error('No constructor find in sub class, please check your code!');
  }
  //拿到子类的构造函数
  let SubClassConstructor = subClassProto.constructor;
  //从子类原型链上删掉构造器字段
  delete subClassProto.constructor;

  let innerStructs = ['events', 'eventHandlers', 'responseHandlers'];
  let localProto = '__proto__';

  for (let i = 0, len = innerStructs.length; i < len; i++) {
    if (!(innerStructs[i] in subClassProto)) {
      subClassProto[innerStructs[i]] = {};
    }
  }

  //格式化子类的原型链
  for (let key in subClassProto) {

    //如果说当前的key是一个内部结构依赖的对象，则设置当前的该对象继承原对象
    if (~innerStructs.indexOf(key)) {
      subClassProto[key][localProto] = ParentClass.prototype[key];
    }

    if (!subClassProto[key] || !subClassProto[key].value) {
      subClassProto[key] = {
        value: subClassProto[key],
        enumerable: true,
        writable: true,
        configurable: true,
      };


    }
  }

  //实现原型继承
  SubClassConstructor.prototype = Object.create(ParentClass.prototype, subClassProto);

  //  _Parent主要用于子类直接调用父类构造器，实现参数继承
  // 子类不能通过任何方式去修改父类的构造器，父类的构造器在子类中也不可枚举
  SubClassConstructor._Parent = function (self, _args) {
    let args = slice.call(_args);
    ParentClass.apply(self, args);
  };

  //子类的extend方法直接使用父类的
  SubClassConstructor.extend = extend;

  Object.defineProperties(SubClassConstructor.prototype, {
    // 重写子类的原型构造器指向，方便调试查看类继承结构
    constructor: {
      value: SubClassConstructor,
      configurable: false,
    },
    //_super指向父类的原型链，子类不能通过任何方式去修改父类的原型链，父类的原型链在子类中也不可枚举
    _super: {
      value: ParentClass.prototype,
      configurable: false,
    },
  });

  return SubClassConstructor;
};

//定义Eagle的共有默认属性和方法
Eagle.prototype = {
  constructor: Eagle,
  events: {

  },
  eventHandlers: {
    //内置时间处理器，阻止冒泡
    stopPropagation: function (e) {
      e.stopPropagation();
    },
    //内置事件处理器，阻止默认行为
    preventDefault: function (e) {
      e.preventDefault();
    },
    //内置事件处理器，阻止默认行为并阻止冒泡
    stopAndPrevent: function (e) {
      e.stopPropagation();
      e.preventDefault();
    }
  },
  responseHandlers: {},
};


let requestFilterChain = [];
let responseFilterChain = [];

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

  if (!global.CONFIG || !CONFIG.SERVICES || !CONFIG.SERVICES[serviceName]) {
    throw new Error('The serviceName [' + serviceName + '] not defined in your config, please check your config!');
  }


  let url = CONFIG.SERVICES[serviceName].API[apiName];

  if (!url) {
    throw new Error('The apiName not defined in your service [' + serviceName + '], please check your config.');
  }

  let params = options.params;
  let queries = options.query;

  if (typeof params === 'object') {
    for (let pKey in options) {
      url = url.replace(new RegExp('\[\:\*\]' + pKey), options[pKey]);
    }
  }

  if (typeof queries === 'object') {
    url += decodeURIComponent($.param(queries));
  } else if (typeof queries === 'string') {
    url += queries;
  }

  return CONFIG.SERVICES[serviceName].BASE_URL + url;

};

/**
 * 应用过滤器链
 * @param filterChain {Array<Function>} 过滤器链
 * @param options {Object} 传入到过滤器中的参数
 * @returns {boolean}
 *          false 中断当前过程(如果的请求，则中断当前请求，如果是响应，则不调用回调)
 */
function applyFilterChain(filterChain, options) {
  let execResult;
  for (let i = 0, len = filterChain.length; i < len; i++) {
    execResult = filterChain[i].call(this, options);
    //中断过程，并返回
    if (false === execResult) {
      return false;
    }
    //中断继续执行过滤器链
    if (true === execResult) {
      break;
    }
  }
}

/**
 * 发送请求
 * @param serviceName {String} 服务名，用于在配置中，将后台服务配置模块化，方便接口管理
 * @param apiName {String} 接口名，全局唯一，该字段对应的URL从window.CONFIG.SERVICES中获取，因此使用该框架，在全局必然会又一个CONFIG对象，否则会报错
 * @param options {Object} 请求参数，格式如下
 *      {
 *          type: {String} 请求发送的http方法，可选值 GET,POST,PUT,DELETE,OPTIONS,HEAD,TRACE等
 *          headers: {Object} http头信息
 *          params: {Object} 路径变量，填充apiName对应的url中存在的路径变量
 *          query: {Object} 对应请求路径的query string,也就是路径问好后需要带上的参数，自动序列化并加到路径后面
 *          body: {Object} 对应的http请求体，body根据请求发送时的Content-Type进行序列化，具体序列化方式，参考HTTP标准
 *          timeout: {Number} 请求超时毫秒数
 *          handler: {String} 请求完成后的回调，字符串代表Eagle实例中的requestHandlers中函数的key
 *            回调参数列表:
 *            respBody: {Object|String} 根据响应头中的Content-Type对响应体进行解析，模式尝试使用json方式
 *            status: {Number} http响应状态码，0表示请求未发送成功，往往表示客户端网络未连接
 *            headers: {Object} 所有能成功获取的响应头(某些跨域情况下，以及某些头是不能直接获取的)
 *      }
 */
Eagle.prototype.request = async function request(serviceName, apiName, options) {
  return new Promise((resolve, reject) => {
    let self = this;
    let _body = null;
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
    if (false === applyFilterChain.call(self, requestFilterChain, {
      serviceName: serviceName,
      apiName: apiName,
      options: options,
    })) {
      console.warn('请求在请求过滤器链中被中断, 请处理您的代码！');
      resolve(null);
      return;
    }

    if (options.body instanceof FormData) {
      delete (options.headers || {})['Content-Type'];
    }

    //预处理
    function handlerResp(xhr) {
      let filterOption = {
        serviceName: serviceName,
        apiName: apiName,
        options: options,
        xhr: xhr,
        response: getResponse(xhr),
        status: getStatus(xhr),
        headers: getHeaders(xhr),
      };

      //如果过滤器链返回了false, 那么直接返回空响应
      if (false === applyFilterChain.call(self, responseFilterChain, filterOption)) {
        console.warn('响应过滤器链拦截了您的相应！');
        resolve(null);
        return;
      }

      // 响应请求
      resolve({
        data: filterOption.response,
        status: filterOption.status,
        headers: filterOption.headers,
        request: filterOption.options
      });
    }

    options.success = function (resp, status, xhr) {
      handlerResp(xhr);
    };

    options.error = function (xhr, error) {
      handlerResp(xhr);
    };

    options.data = options.body;

    $.ajax(options);
  });
};

function getResponse(xhr) {
  let response = xhr.responseText;
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
  let headerTexts = xhr.getAllResponseHeaders().split('\n');
  let headers = {},
    textItem;
  for (let i = 0, len = headerTexts.length; i < len; i++) {
    textItem = headerTexts[i].match(/([^:]+):\s*(.+)/);
    if (!!textItem) {
      headers[textItem[1]] = textItem[2];
    }
  }
  return headers;
}

function defaultBody(body) {
  return function (option) {
    let defaultOptions = option.options;

    if (!defaultOptions.body) {
      defaultOptions.body = {};
    }

    for (let key in body) {
      if (!(key in defaultOptions.body)) {
        defaultOptions.body[key] = body[key];
      }
    }
  };
}

function defaultHeaders(headers) {
  return function (option) {
    let defaultOptions = option.options;

    if (!defaultOptions.headers) {
      defaultOptions.headers = {};
    }

    for (let key in headers) {
      if (!(key in defaultOptions.headers)) {
        defaultOptions.headers[key] = headers[key];
      }
    }
  };
}

function defaultQuery(query) {
  return function (option) {
    let defaultOptions = option.options;

    if (!defaultOptions.query) {
      defaultOptions.query = {};
    }

    for (let key in query) {
      if (!(key in defaultOptions.query)) {
        defaultOptions.query[key] = query[key];
      }
    }
  };
}

export default Eagle;