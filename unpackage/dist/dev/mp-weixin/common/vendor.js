(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });var


EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {var _this = this;_classCallCheck(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this.on(name, events[name]);
      });
    }
  }_createClass(EventChannel, [{ key: "emit", value: function emit(

    eventName) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {return opt.type !== 'once';});
    } }, { key: "on", value: function on(

    eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    } }, { key: "once", value: function once(

    eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    } }, { key: "off", value: function off(

    eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    } }, { key: "_clearCache", value: function _clearCache(

    eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    } }, { key: "_addListener", value: function _addListener(

    eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type });

    } }]);return EventChannel;}();


var eventChannels = {};

var eventChannelStack = [];

var id = 0;

function initEventChannel(events) {var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel;
}

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  } };


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  navigateTo: navigateTo,
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {args[_key4 - 1] = arguments[_key4];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"tome_vlog","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"tome_vlog","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"tome_vlog","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"tome_vlog","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"tome_vlog","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!***********************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/pages.json ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 18);

/***/ }),
/* 18 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 19);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 19 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 20 */
/*!*************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/api/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.queryMsgHit = exports.initParams = exports.login = exports.refreshAccessToken = void 0;var _request = __webpack_require__(/*! @/utils/request.js */ 21);

// 刷新accesstoken
var refreshAccessToken = function refreshAccessToken(data) {return _request.http.get('/v/wxRefresh', { params: data });};
// 登录
exports.refreshAccessToken = refreshAccessToken;var login = function login(data) {return _request.http.post('/v/wxLogin', data);};
// 初始化参数
exports.login = login;var initParams = function initParams(data) {return _request.http.get('/videoapp/init/param', data);};
// 查询消息提示
exports.initParams = initParams;var queryMsgHit = function queryMsgHit(data) {return _request.http.get('/videoapp/me/getMyRead', data);};exports.queryMsgHit = queryMsgHit;

/***/ }),
/* 21 */
/*!*****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/utils/request.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.http = void 0;var _index = _interopRequireDefault(__webpack_require__(/*! @/libs/luch-request/index.js */ 22));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var http = new _index.default();
// 全局配置
exports.http = http;http.setConfig(function (config) {
  config.baseURL = 'https://tome3pay.zhihuiquanyu.com',
  config.timeout = 10000;
  return config;
});

// 请求拦截器
http.interceptors.request.use(function (config, cancel) {
  var token = uni.getStorageSync('access_token');
  // 如果有token,则每次请求都带token
  if (token) {
    config.header = {
      "Authorization": "Bearer ".concat(token) };

  }

  return config;
});

// 响应拦截器
http.interceptors.response.use(function (res) {var

  resultCode =
  res.data.resultStatus.resultCode;
  // 请求成功
  if (resultCode === '0000') {
    return res.data;
  } else {
    return Promise.reject(new Error(res.data.resultStatus.resultMessage));
  }
}, function (err) {var

  resultCode =
  err.data.resultStatus.resultCode;
  if (resultCode === '0007') {
    console.log('登录失效');
    uni.clearStorageSync();
  } else {
    return Promise.reject(new Error(err.data.resultStatus.resultMessage));
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 22 */
/*!***************************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/libs/luch-request/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Request = _interopRequireDefault(__webpack_require__(/*! ./core/Request */ 23));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
_Request.default;exports.default = _default;

/***/ }),
/* 23 */
/*!**********************************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/libs/luch-request/core/Request.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;













var _dispatchRequest = _interopRequireDefault(__webpack_require__(/*! ./dispatchRequest */ 24));
var _InterceptorManager = _interopRequireDefault(__webpack_require__(/*! ./InterceptorManager */ 32));
var _mergeConfig = _interopRequireDefault(__webpack_require__(/*! ./mergeConfig */ 33));
var _defaults = _interopRequireDefault(__webpack_require__(/*! ./defaults */ 34));
var _utils = __webpack_require__(/*! ../utils */ 27);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var

Request = /*#__PURE__*/function () {
  /**
                                     * @param {Object} arg - 全局配置
                                     * @param {String} arg.baseURL - 全局根路径
                                     * @param {Object} arg.header - 全局header
                                     * @param {String} arg.method = [GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE] - 全局默认请求方式
                                     * @param {String} arg.dataType = [json] - 全局默认的dataType
                                     * @param {String} arg.responseType = [text|arraybuffer] - 全局默认的responseType。App和支付宝小程序不支持
                                     * @param {Object} arg.custom - 全局默认的自定义参数
                                     * @param {Number} arg.timeout - 全局默认的超时时间，单位 ms。默认60000。H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
                                     * @param {Boolean} arg.sslVerify - 全局默认的是否验证 ssl 证书。默认true.仅App安卓端支持（HBuilderX 2.3.3+）
                                     * @param {Boolean} arg.withCredentials - 全局默认的跨域请求时是否携带凭证（cookies）。默认false。仅H5支持（HBuilderX 2.6.15+）
                                     * @param {Boolean} arg.firstIpv4 - 全DNS解析时优先使用ipv4。默认false。仅 App-Android 支持 (HBuilderX 2.8.0+)
                                     * @param {Function(statusCode):Boolean} arg.validateStatus - 全局默认的自定义验证器。默认statusCode >= 200 && statusCode < 300
                                     */
  function Request() {var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, Request);
    if (!(0, _utils.isPlainObject)(arg)) {
      arg = {};
      console.warn('设置全局参数必须接收一个Object');
    }
    this.config = _objectSpread(_objectSpread({}, _defaults.default), arg);
    this.interceptors = {
      request: new _InterceptorManager.default(),
      response: new _InterceptorManager.default() };

  }

  /**
     * @Function
     * @param {Request~setConfigCallback} f - 设置全局默认配置
     */_createClass(Request, [{ key: "setConfig", value: function setConfig(
    f) {
      this.config = f(this.config);
    } }, { key: "middleware", value: function middleware(

    config) {
      config = (0, _mergeConfig.default)(this.config, config);
      var chain = [_dispatchRequest.default, undefined];
      var promise = Promise.resolve(config);

      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });

      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });

      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }

      return promise;
    }

    /**
       * @Function
       * @param {Object} config - 请求配置项
       * @prop {String} options.url - 请求路径
       * @prop {Object} options.data - 请求参数
       * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
       * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
       * @prop {Object} [options.header = config.header] - 请求header
       * @prop {Object} [options.method = config.method] - 请求方法
       * @returns {Promise<unknown>}
       */ }, { key: "request", value: function request()
    {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.middleware(config);
    } }, { key: "get", value: function get(

    url) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.middleware(_objectSpread({
        url: url,
        method: 'GET' },
      options));

    } }, { key: "post", value: function post(

    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'POST' },
      options));

    } }, { key: "put", value: function put(


    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'PUT' },
      options));

    } }, { key: "delete", value: function _delete(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'DELETE' },
      options));

    } }, { key: "connect", value: function connect(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'CONNECT' },
      options));

    } }, { key: "head", value: function head(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'HEAD' },
      options));

    } }, { key: "options", value: function options(




    url, data) {var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'OPTIONS' },
      _options));

    } }, { key: "trace", value: function trace(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'TRACE' },
      options));

    } }, { key: "upload", value: function upload(



    url) {var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'UPLOAD';
      return this.middleware(config);
    } }, { key: "download", value: function download(

    url) {var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'DOWNLOAD';
      return this.middleware(config);
    } }]);return Request;}();



/**
                               * setConfig回调
                               * @return {Object} - 返回操作后的config
                               * @callback Request~setConfigCallback
                               * @param {Object} config - 全局默认config
                               */exports.default = Request;

/***/ }),
/* 24 */
/*!******************************************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/libs/luch-request/core/dispatchRequest.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _index = _interopRequireDefault(__webpack_require__(/*! ../adapters/index */ 25));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =


function _default(config) {
  return (0, _index.default)(config);
};exports.default = _default;

/***/ }),
/* 25 */
/*!************************************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/libs/luch-request/adapters/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _buildURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/buildURL */ 26));
var _buildFullPath = _interopRequireDefault(__webpack_require__(/*! ../core/buildFullPath */ 28));
var _settle = _interopRequireDefault(__webpack_require__(/*! ../core/settle */ 31));
var _utils = __webpack_require__(/*! ../utils */ 27);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * 返回可选值存在的配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @param {Array} keys - 可选值数组
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @param {Object} config2 - 配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @return {{}} - 存在的配置项
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           */
var mergeKeys = function mergeKeys(keys, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (!(0, _utils.isUndefined)(config2[prop])) {
      config[prop] = config2[prop];
    }
  });
  return config;
};var _default =
function _default(config) {
  return new Promise(function (resolve, reject) {
    var fullPath = (0, _buildURL.default)((0, _buildFullPath.default)(config.baseURL, config.url), config.params);
    var _config = {
      url: fullPath,
      header: config.header,
      complete: function complete(response) {
        config.fullPath = fullPath;
        response.config = config;
        try {
          // 对可能字符串不是json 的情况容错
          if (typeof response.data === 'string') {
            response.data = JSON.parse(response.data);
          }
          // eslint-disable-next-line no-empty
        } catch (e) {
        }
        (0, _settle.default)(resolve, reject, response);
      } };

    var requestTask;
    if (config.method === 'UPLOAD') {
      delete _config.header['content-type'];
      delete _config.header['Content-Type'];
      var otherConfig = {



        filePath: config.filePath,
        name: config.name };

      var optionalKeys = [









      'formData'];

      requestTask = uni.uploadFile(_objectSpread(_objectSpread(_objectSpread({}, _config), otherConfig), mergeKeys(optionalKeys, config)));
    } else if (config.method === 'DOWNLOAD') {





      requestTask = uni.downloadFile(_config);
    } else {
      var _optionalKeys = [
      'data',
      'method',

      'timeout',

      'dataType',

      'responseType'];











      requestTask = uni.request(_objectSpread(_objectSpread({}, _config), mergeKeys(_optionalKeys, config)));
    }
    if (config.getTask) {
      config.getTask(requestTask, config);
    }
  });
};exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 26 */
/*!**************************************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/libs/luch-request/helpers/buildURL.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = buildURL;

var utils = _interopRequireWildcard(__webpack_require__(/*! ./../utils */ 27));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

function encode(val) {
  return encodeURIComponent(val).
  replace(/%40/gi, '@').
  replace(/%3A/gi, ':').
  replace(/%24/g, '$').
  replace(/%2C/gi, ',').
  replace(/%20/g, '+').
  replace(/%5B/gi, '[').
  replace(/%5D/gi, ']');
}

/**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
function buildURL(url, params) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

/***/ }),
/* 27 */
/*!***************************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/libs/luch-request/utils.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// utils is a library of generic helper functions non-specific to axios
Object.defineProperty(exports, "__esModule", { value: true });exports.isArray = isArray;exports.isObject = isObject;exports.isDate = isDate;exports.isURLSearchParams = isURLSearchParams;exports.forEach = forEach;exports.isBoolean = isBoolean;exports.isPlainObject = isPlainObject;exports.deepMerge = deepMerge;exports.isUndefined = isUndefined;
var toString = Object.prototype.toString;

/**
                                           * Determine if a value is an Array
                                           *
                                           * @param {Object} val The value to test
                                           * @returns {boolean} True if value is an Array, otherwise false
                                           */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}


/**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}


/**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
   * 是否为boolean 值
   * @param val
   * @returns {boolean}
   */
function isBoolean(val) {
  return typeof val === 'boolean';
}

/**
   * 是否为真正的对象{} new Object
   * @param {any} obj - 检测的对象
   * @returns {boolean}
   */
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}



/**
   * Function equal to merge with the difference being that no reference
   * to original objects is kept.
   *
   * @see merge
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
function deepMerge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

function isUndefined(val) {
  return typeof val === 'undefined';
}

/***/ }),
/* 28 */
/*!****************************************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/libs/luch-request/core/buildFullPath.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = buildFullPath;

var _isAbsoluteURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/isAbsoluteURL */ 29));
var _combineURLs = _interopRequireDefault(__webpack_require__(/*! ../helpers/combineURLs */ 30));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                            * Creates a new URL by combining the baseURL with the requestedURL,
                                                                                                                                                                            * only when the requestedURL is not already an absolute URL.
                                                                                                                                                                            * If the requestURL is absolute, this function returns the requestedURL untouched.
                                                                                                                                                                            *
                                                                                                                                                                            * @param {string} baseURL The base URL
                                                                                                                                                                            * @param {string} requestedURL Absolute or relative URL to combine
                                                                                                                                                                            * @returns {string} The combined full path
                                                                                                                                                                            */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !(0, _isAbsoluteURL.default)(requestedURL)) {
    return (0, _combineURLs.default)(baseURL, requestedURL);
  }
  return requestedURL;
}

/***/ }),
/* 29 */
/*!*******************************************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/libs/luch-request/helpers/isAbsoluteURL.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Determines whether the specified URL is absolute
               *
               * @param {string} url The URL to test
               * @returns {boolean} True if the specified URL is absolute, otherwise false
               */Object.defineProperty(exports, "__esModule", { value: true });exports.default = isAbsoluteURL;
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/***/ }),
/* 30 */
/*!*****************************************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/libs/luch-request/helpers/combineURLs.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Creates a new URL by combining the specified URLs
               *
               * @param {string} baseURL The base URL
               * @param {string} relativeURL The relative URL
               * @returns {string} The combined URL
               */Object.defineProperty(exports, "__esModule", { value: true });exports.default = combineURLs;
function combineURLs(baseURL, relativeURL) {
  return relativeURL ?
  baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') :
  baseURL;
}

/***/ }),
/* 31 */
/*!*********************************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/libs/luch-request/core/settle.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = settle; /**
                                                                                                      * Resolve or reject a Promise based on response status.
                                                                                                      *
                                                                                                      * @param {Function} resolve A function that resolves the promise.
                                                                                                      * @param {Function} reject A function that rejects the promise.
                                                                                                      * @param {object} response The response.
                                                                                                      */
function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  var status = response.statusCode;
  if (status && (!validateStatus || validateStatus(status))) {
    resolve(response);
  } else {
    reject(response);
  }
}

/***/ }),
/* 32 */
/*!*********************************************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/libs/luch-request/core/InterceptorManager.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


function InterceptorManager() {
  this.handlers = [];
}

/**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected });

  return this.handlers.length - 1;
};

/**
    * Remove an interceptor from the stack
    *
    * @param {Number} id The ID that was returned by `use`
    */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
    * Iterate over all the registered interceptors
    *
    * This method is particularly useful for skipping over any
    * interceptors that may have become `null` calling `eject`.
    *
    * @param {Function} fn The function to call for each interceptor
    */
InterceptorManager.prototype.forEach = function forEach(fn) {
  this.handlers.forEach(function (h) {
    if (h !== null) {
      fn(h);
    }
  });
};var _default =

InterceptorManager;exports.default = _default;

/***/ }),
/* 33 */
/*!**************************************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/libs/luch-request/core/mergeConfig.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 27);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * 合并局部配置优先的配置，如果局部有该配置项则用局部，如果全局有该配置项则用全局
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Array} keys - 配置项
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Object} globalsConfig - 当前的全局配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Object} config2 - 局部配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @return {{}}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */
var mergeKeys = function mergeKeys(keys, globalsConfig, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (!(0, _utils.isUndefined)(config2[prop])) {
      config[prop] = config2[prop];
    } else if (!(0, _utils.isUndefined)(globalsConfig[prop])) {
      config[prop] = globalsConfig[prop];
    }
  });
  return config;
};
/**
    *
    * @param globalsConfig - 当前实例的全局配置
    * @param config2 - 当前的局部配置
    * @return - 合并后的配置
    */var _default =
function _default(globalsConfig) {var config2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = config2.method || globalsConfig.method || 'GET';
  var config = {
    baseURL: globalsConfig.baseURL || '',
    method: method,
    url: config2.url || '',
    params: config2.params || {},
    custom: _objectSpread(_objectSpread({}, globalsConfig.custom || {}), config2.custom || {}),
    header: (0, _utils.deepMerge)(globalsConfig.header || {}, config2.header || {}) };

  var defaultToConfig2Keys = ['getTask', 'validateStatus'];
  config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultToConfig2Keys, globalsConfig, config2));

  // eslint-disable-next-line no-empty
  if (method === 'DOWNLOAD') {







  } else if (method === 'UPLOAD') {
    delete config.header['content-type'];
    delete config.header['Content-Type'];
    var uploadKeys = [









    'filePath',
    'name',



    'formData'];

    uploadKeys.forEach(function (prop) {
      if (!(0, _utils.isUndefined)(config2[prop])) {
        config[prop] = config2[prop];
      }
    });





  } else {
    var defaultsKeys = [
    'data',

    'timeout',

    'dataType',

    'responseType'];











    config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultsKeys, globalsConfig, config2));
  }

  return config;
};exports.default = _default;

/***/ }),
/* 34 */
/*!***********************************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/libs/luch-request/core/defaults.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 默认的全局配置
                                                                                                      */var _default =


{
  baseURL: '',
  header: {},
  method: 'GET',
  dataType: 'json',

  responseType: 'text',

  custom: {},

  timeout: 60000,










  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  } };exports.default = _default;

/***/ }),
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */
/*!************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/api/home.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.queryCurrentScenery = exports.queryMoment = exports.queryHotScenery = exports.queryBannerList = void 0;var _request = __webpack_require__(/*! @/utils/request.js */ 21);

// 获取banner视频
var queryBannerList = function queryBannerList() {return _request.http.get('/videoapp/video/top');};

// 获取热门景区
exports.queryBannerList = queryBannerList;var queryHotScenery = function queryHotScenery(data) {return _request.http.post('/videoapp/scenery/hot', data);};

// 获取精彩瞬间
exports.queryHotScenery = queryHotScenery;var queryMoment = function queryMoment(data) {return _request.http.post('/videoapp/video/goodMoment', data);};

// 判断当前所属景区
exports.queryMoment = queryMoment;var queryCurrentScenery = function queryCurrentScenery(data) {return _request.http.post('/videoapp/scenery/locationConfirm', data);};exports.queryCurrentScenery = queryCurrentScenery;

/***/ }),
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */
/*!*************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/api/shoot.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.querySceneryInfo = void 0;var _request = __webpack_require__(/*! @/utils/request.js */ 21);

// 查询景区详情
var querySceneryInfo = function querySceneryInfo(data) {return _request.http.get('/videoapp/scenery/get', { params: data });};exports.querySceneryInfo = querySceneryInfo;

/***/ }),
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */
/*!*******************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/api/sceneryList.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.queryNearby = void 0;var _request = __webpack_require__(/*! @/utils/request.js */ 21);

// 获取周边景区
var queryNearby = function queryNearby(data) {return _request.http.post('/videoapp/scenery/queryByDistance', data);};exports.queryNearby = queryNearby;

/***/ }),
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */
/*!*******************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/utils/jsencrypt.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? factory(exports) :
  undefined;
})(this, function (exports) {'use strict';
  var navigator = {
    appName: 'Netscape',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46     (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1' };

  var window = {
    ASN1: null,
    Base64: null,
    Hex: null,
    crypto: null,
    href: null };



  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  function int2char(n) {
    return BI_RM.charAt(n);
  }
  //#region BIT_OPERATIONS
  // (public) this & a
  function op_and(x, y) {
    return x & y;
  }
  // (public) this | a
  function op_or(x, y) {
    return x | y;
  }
  // (public) this ^ a
  function op_xor(x, y) {
    return x ^ y;
  }
  // (public) this & ~a
  function op_andnot(x, y) {
    return x & ~y;
  }
  // return index of lowest 1-bit in x, x < 2^31
  function lbit(x) {
    if (x == 0) {
      return -1;
    }
    var r = 0;
    if ((x & 0xffff) == 0) {
      x >>= 16;
      r += 16;
    }
    if ((x & 0xff) == 0) {
      x >>= 8;
      r += 8;
    }
    if ((x & 0xf) == 0) {
      x >>= 4;
      r += 4;
    }
    if ((x & 3) == 0) {
      x >>= 2;
      r += 2;
    }
    if ((x & 1) == 0) {
      ++r;
    }
    return r;
  }
  // return number of 1 bits in x
  function cbit(x) {
    var r = 0;
    while (x != 0) {
      x &= x - 1;
      ++r;
    }
    return r;
  }
  //#endregion BIT_OPERATIONS

  var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var b64pad = "=";
  function hex2b64(h) {
    var i;
    var c;
    var ret = "";
    for (i = 0; i + 3 <= h.length; i += 3) {
      c = parseInt(h.substring(i, i + 3), 16);
      ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
    }
    if (i + 1 == h.length) {
      c = parseInt(h.substring(i, i + 1), 16);
      ret += b64map.charAt(c << 2);
    } else
    if (i + 2 == h.length) {
      c = parseInt(h.substring(i, i + 2), 16);
      ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
    }
    while ((ret.length & 3) > 0) {
      ret += b64pad;
    }
    return ret;
  }
  // convert a base64 string to hex
  function b64tohex(s) {
    var ret = "";
    var i;
    var k = 0; // b64 state, 0-3
    var slop = 0;
    for (i = 0; i < s.length; ++i) {
      if (s.charAt(i) == b64pad) {
        break;
      }
      var v = b64map.indexOf(s.charAt(i));
      if (v < 0) {
        continue;
      }
      if (k == 0) {
        ret += int2char(v >> 2);
        slop = v & 3;
        k = 1;
      } else
      if (k == 1) {
        ret += int2char(slop << 2 | v >> 4);
        slop = v & 0xf;
        k = 2;
      } else
      if (k == 2) {
        ret += int2char(slop);
        ret += int2char(v >> 2);
        slop = v & 3;
        k = 3;
      } else
      {
        ret += int2char(slop << 2 | v >> 4);
        ret += int2char(v & 0xf);
        k = 0;
      }
    }
    if (k == 1) {
      ret += int2char(slop << 2);
    }
    return ret;
  }

  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0
    
    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.
    
    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
  /* global Reflect, Promise */

  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf ||
    { __proto__: [] } instanceof Array && function (d, b) {d.__proto__ = b;} ||
    function (d, b) {for (var p in b) {if (b.hasOwnProperty(p)) d[p] = b[p];}};
    return _extendStatics(d, b);
  };

  function __extends(d, b) {
    _extendStatics(d, b);
    function __() {this.constructor = d;}
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  // Hex JavaScript decoder
  // Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>
  // Permission to use, copy, modify, and/or distribute this software for any
  // purpose with or without fee is hereby granted, provided that the above
  // copyright notice and this permission notice appear in all copies.
  //
  // THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
  // WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
  // MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
  // ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
  // WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
  // ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
  // OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
  /*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
  var decoder;
  var Hex = {
    decode: function decode(a) {
      var i;
      if (decoder === undefined) {
        var hex = "0123456789ABCDEF";
        var ignore = " \f\n\r\t\xA0\u2028\u2029";
        decoder = {};
        for (i = 0; i < 16; ++i) {
          decoder[hex.charAt(i)] = i;
        }
        hex = hex.toLowerCase();
        for (i = 10; i < 16; ++i) {
          decoder[hex.charAt(i)] = i;
        }
        for (i = 0; i < ignore.length; ++i) {
          decoder[ignore.charAt(i)] = -1;
        }
      }
      var out = [];
      var bits = 0;
      var char_count = 0;
      for (i = 0; i < a.length; ++i) {
        var c = a.charAt(i);
        if (c == "=") {
          break;
        }
        c = decoder[c];
        if (c == -1) {
          continue;
        }
        if (c === undefined) {
          throw new Error("Illegal character at offset " + i);
        }
        bits |= c;
        if (++char_count >= 2) {
          out[out.length] = bits;
          bits = 0;
          char_count = 0;
        } else
        {
          bits <<= 4;
        }
      }
      if (char_count) {
        throw new Error("Hex encoding incomplete: 4 bits missing");
      }
      return out;
    } };


  // Base64 JavaScript decoder
  // Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>
  // Permission to use, copy, modify, and/or distribute this software for any
  // purpose with or without fee is hereby granted, provided that the above
  // copyright notice and this permission notice appear in all copies.
  //
  // THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
  // WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
  // MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
  // ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
  // WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
  // ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
  // OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
  /*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
  var decoder$1;
  var Base64 = {
    decode: function decode(a) {
      var i;
      if (decoder$1 === undefined) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var ignore = "= \f\n\r\t\xA0\u2028\u2029";
        decoder$1 = Object.create(null);
        for (i = 0; i < 64; ++i) {
          decoder$1[b64.charAt(i)] = i;
        }
        for (i = 0; i < ignore.length; ++i) {
          decoder$1[ignore.charAt(i)] = -1;
        }
      }
      var out = [];
      var bits = 0;
      var char_count = 0;
      for (i = 0; i < a.length; ++i) {
        var c = a.charAt(i);
        if (c == "=") {
          break;
        }
        c = decoder$1[c];
        if (c == -1) {
          continue;
        }
        if (c === undefined) {
          throw new Error("Illegal character at offset " + i);
        }
        bits |= c;
        if (++char_count >= 4) {
          out[out.length] = bits >> 16;
          out[out.length] = bits >> 8 & 0xFF;
          out[out.length] = bits & 0xFF;
          bits = 0;
          char_count = 0;
        } else
        {
          bits <<= 6;
        }
      }
      switch (char_count) {
        case 1:
          throw new Error("Base64 encoding incomplete: at least 2 bits missing");
        case 2:
          out[out.length] = bits >> 10;
          break;
        case 3:
          out[out.length] = bits >> 16;
          out[out.length] = bits >> 8 & 0xFF;
          break;}

      return out;
    },
    re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
    unarmor: function unarmor(a) {
      var m = Base64.re.exec(a);
      if (m) {
        if (m[1]) {
          a = m[1];
        } else
        if (m[2]) {
          a = m[2];
        } else
        {
          throw new Error("RegExp out of sync");
        }
      }
      return Base64.decode(a);
    } };


  // Big integer base-10 printing library
  // Copyright (c) 2014 Lapo Luchini <lapo@lapo.it>
  // Permission to use, copy, modify, and/or distribute this software for any
  // purpose with or without fee is hereby granted, provided that the above
  // copyright notice and this permission notice appear in all copies.
  //
  // THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
  // WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
  // MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
  // ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
  // WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
  // ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
  // OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
  /*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
  var max = 10000000000000; // biggest integer that can still fit 2^53 when multiplied by 256
  var Int10 = /** @class */function () {
    function Int10(value) {
      this.buf = [+value || 0];
    }
    Int10.prototype.mulAdd = function (m, c) {
      // assert(m <= 256)
      var b = this.buf;
      var l = b.length;
      var i;
      var t;
      for (i = 0; i < l; ++i) {
        t = b[i] * m + c;
        if (t < max) {
          c = 0;
        } else
        {
          c = 0 | t / max;
          t -= c * max;
        }
        b[i] = t;
      }
      if (c > 0) {
        b[i] = c;
      }
    };
    Int10.prototype.sub = function (c) {
      // assert(m <= 256)
      var b = this.buf;
      var l = b.length;
      var i;
      var t;
      for (i = 0; i < l; ++i) {
        t = b[i] - c;
        if (t < 0) {
          t += max;
          c = 1;
        } else
        {
          c = 0;
        }
        b[i] = t;
      }
      while (b[b.length - 1] === 0) {
        b.pop();
      }
    };
    Int10.prototype.toString = function (base) {
      if ((base || 10) != 10) {
        throw new Error("only base 10 is supported");
      }
      var b = this.buf;
      var s = b[b.length - 1].toString();
      for (var i = b.length - 2; i >= 0; --i) {
        s += (max + b[i]).toString().substring(1);
      }
      return s;
    };
    Int10.prototype.valueOf = function () {
      var b = this.buf;
      var v = 0;
      for (var i = b.length - 1; i >= 0; --i) {
        v = v * max + b[i];
      }
      return v;
    };
    Int10.prototype.simplify = function () {
      var b = this.buf;
      return b.length == 1 ? b[0] : this;
    };
    return Int10;
  }();

  // ASN.1 JavaScript decoder
  var ellipsis = "\u2026";
  var reTimeS = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
  var reTimeL = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
  function stringCut(str, len) {
    if (str.length > len) {
      str = str.substring(0, len) + ellipsis;
    }
    return str;
  }
  var Stream = /** @class */function () {
    function Stream(enc, pos) {
      this.hexDigits = "0123456789ABCDEF";
      if (enc instanceof Stream) {
        this.enc = enc.enc;
        this.pos = enc.pos;
      } else
      {
        // enc should be an array or a binary string
        this.enc = enc;
        this.pos = pos;
      }
    }
    Stream.prototype.get = function (pos) {
      if (pos === undefined) {
        pos = this.pos++;
      }
      if (pos >= this.enc.length) {
        throw new Error("Requesting byte offset " + pos + " on a stream of length " + this.enc.length);
      }
      return "string" === typeof this.enc ? this.enc.charCodeAt(pos) : this.enc[pos];
    };
    Stream.prototype.hexByte = function (b) {
      return this.hexDigits.charAt(b >> 4 & 0xF) + this.hexDigits.charAt(b & 0xF);
    };
    Stream.prototype.hexDump = function (start, end, raw) {
      var s = "";
      for (var i = start; i < end; ++i) {
        s += this.hexByte(this.get(i));
        if (raw !== true) {
          switch (i & 0xF) {
            case 0x7:
              s += "  ";
              break;
            case 0xF:
              s += "\n";
              break;
            default:
              s += " ";}

        }
      }
      return s;
    };
    Stream.prototype.isASCII = function (start, end) {
      for (var i = start; i < end; ++i) {
        var c = this.get(i);
        if (c < 32 || c > 176) {
          return false;
        }
      }
      return true;
    };
    Stream.prototype.parseStringISO = function (start, end) {
      var s = "";
      for (var i = start; i < end; ++i) {
        s += String.fromCharCode(this.get(i));
      }
      return s;
    };
    Stream.prototype.parseStringUTF = function (start, end) {
      var s = "";
      for (var i = start; i < end;) {
        var c = this.get(i++);
        if (c < 128) {
          s += String.fromCharCode(c);
        } else
        if (c > 191 && c < 224) {
          s += String.fromCharCode((c & 0x1F) << 6 | this.get(i++) & 0x3F);
        } else
        {
          s += String.fromCharCode((c & 0x0F) << 12 | (this.get(i++) & 0x3F) << 6 | this.get(i++) & 0x3F);
        }
      }
      return s;
    };
    Stream.prototype.parseStringBMP = function (start, end) {
      var str = "";
      var hi;
      var lo;
      for (var i = start; i < end;) {
        hi = this.get(i++);
        lo = this.get(i++);
        str += String.fromCharCode(hi << 8 | lo);
      }
      return str;
    };
    Stream.prototype.parseTime = function (start, end, shortYear) {
      var s = this.parseStringISO(start, end);
      var m = (shortYear ? reTimeS : reTimeL).exec(s);
      if (!m) {
        return "Unrecognized time: " + s;
      }
      if (shortYear) {
        // to avoid querying the timer, use the fixed range [1970, 2069]
        // it will conform with ITU X.400 [-10, +40] sliding window until 2030
        m[1] = +m[1];
        m[1] += +m[1] < 70 ? 2000 : 1900;
      }
      s = m[1] + "-" + m[2] + "-" + m[3] + " " + m[4];
      if (m[5]) {
        s += ":" + m[5];
        if (m[6]) {
          s += ":" + m[6];
          if (m[7]) {
            s += "." + m[7];
          }
        }
      }
      if (m[8]) {
        s += " UTC";
        if (m[8] != "Z") {
          s += m[8];
          if (m[9]) {
            s += ":" + m[9];
          }
        }
      }
      return s;
    };
    Stream.prototype.parseInteger = function (start, end) {
      var v = this.get(start);
      var neg = v > 127;
      var pad = neg ? 255 : 0;
      var len;
      var s = "";
      // skip unuseful bits (not allowed in DER)
      while (v == pad && ++start < end) {
        v = this.get(start);
      }
      len = end - start;
      if (len === 0) {
        return neg ? -1 : 0;
      }
      // show bit length of huge integers
      if (len > 4) {
        s = v;
        len <<= 3;
        while (((+s ^ pad) & 0x80) == 0) {
          s = +s << 1;
          --len;
        }
        s = "(" + len + " bit)\n";
      }
      // decode the integer
      if (neg) {
        v = v - 256;
      }
      var n = new Int10(v);
      for (var i = start + 1; i < end; ++i) {
        n.mulAdd(256, this.get(i));
      }
      return s + n.toString();
    };
    Stream.prototype.parseBitString = function (start, end, maxLength) {
      var unusedBit = this.get(start);
      var lenBit = (end - start - 1 << 3) - unusedBit;
      var intro = "(" + lenBit + " bit)\n";
      var s = "";
      for (var i = start + 1; i < end; ++i) {
        var b = this.get(i);
        var skip = i == end - 1 ? unusedBit : 0;
        for (var j = 7; j >= skip; --j) {
          s += b >> j & 1 ? "1" : "0";
        }
        if (s.length > maxLength) {
          return intro + stringCut(s, maxLength);
        }
      }
      return intro + s;
    };
    Stream.prototype.parseOctetString = function (start, end, maxLength) {
      if (this.isASCII(start, end)) {
        return stringCut(this.parseStringISO(start, end), maxLength);
      }
      var len = end - start;
      var s = "(" + len + " byte)\n";
      maxLength /= 2; // we work in bytes
      if (len > maxLength) {
        end = start + maxLength;
      }
      for (var i = start; i < end; ++i) {
        s += this.hexByte(this.get(i));
      }
      if (len > maxLength) {
        s += ellipsis;
      }
      return s;
    };
    Stream.prototype.parseOID = function (start, end, maxLength) {
      var s = "";
      var n = new Int10();
      var bits = 0;
      for (var i = start; i < end; ++i) {
        var v = this.get(i);
        n.mulAdd(128, v & 0x7F);
        bits += 7;
        if (!(v & 0x80)) {// finished
          if (s === "") {
            n = n.simplify();
            if (n instanceof Int10) {
              n.sub(80);
              s = "2." + n.toString();
            } else
            {
              var m = n < 80 ? n < 40 ? 0 : 1 : 2;
              s = m + "." + (n - m * 40);
            }
          } else
          {
            s += "." + n.toString();
          }
          if (s.length > maxLength) {
            return stringCut(s, maxLength);
          }
          n = new Int10();
          bits = 0;
        }
      }
      if (bits > 0) {
        s += ".incomplete";
      }
      return s;
    };
    return Stream;
  }();
  var ASN1 = /** @class */function () {
    function ASN1(stream, header, length, tag, sub) {
      if (!(tag instanceof ASN1Tag)) {
        throw new Error("Invalid tag value.");
      }
      this.stream = stream;
      this.header = header;
      this.length = length;
      this.tag = tag;
      this.sub = sub;
    }
    ASN1.prototype.typeName = function () {
      switch (this.tag.tagClass) {
        case 0: // universal
          switch (this.tag.tagNumber) {
            case 0x00:
              return "EOC";
            case 0x01:
              return "BOOLEAN";
            case 0x02:
              return "INTEGER";
            case 0x03:
              return "BIT_STRING";
            case 0x04:
              return "OCTET_STRING";
            case 0x05:
              return "NULL";
            case 0x06:
              return "OBJECT_IDENTIFIER";
            case 0x07:
              return "ObjectDescriptor";
            case 0x08:
              return "EXTERNAL";
            case 0x09:
              return "REAL";
            case 0x0A:
              return "ENUMERATED";
            case 0x0B:
              return "EMBEDDED_PDV";
            case 0x0C:
              return "UTF8String";
            case 0x10:
              return "SEQUENCE";
            case 0x11:
              return "SET";
            case 0x12:
              return "NumericString";
            case 0x13:
              return "PrintableString"; // ASCII subset
            case 0x14:
              return "TeletexString"; // aka T61String
            case 0x15:
              return "VideotexString";
            case 0x16:
              return "IA5String"; // ASCII
            case 0x17:
              return "UTCTime";
            case 0x18:
              return "GeneralizedTime";
            case 0x19:
              return "GraphicString";
            case 0x1A:
              return "VisibleString"; // ASCII subset
            case 0x1B:
              return "GeneralString";
            case 0x1C:
              return "UniversalString";
            case 0x1E:
              return "BMPString";}

          return "Universal_" + this.tag.tagNumber.toString();
        case 1:
          return "Application_" + this.tag.tagNumber.toString();
        case 2:
          return "[" + this.tag.tagNumber.toString() + "]"; // Context
        case 3:
          return "Private_" + this.tag.tagNumber.toString();}

    };
    ASN1.prototype.content = function (maxLength) {
      if (this.tag === undefined) {
        return null;
      }
      if (maxLength === undefined) {
        maxLength = Infinity;
      }
      var content = this.posContent();
      var len = Math.abs(this.length);
      if (!this.tag.isUniversal()) {
        if (this.sub !== null) {
          return "(" + this.sub.length + " elem)";
        }
        return this.stream.parseOctetString(content, content + len, maxLength);
      }
      switch (this.tag.tagNumber) {
        case 0x01: // BOOLEAN
          return this.stream.get(content) === 0 ? "false" : "true";
        case 0x02: // INTEGER
          return this.stream.parseInteger(content, content + len);
        case 0x03: // BIT_STRING
          return this.sub ? "(" + this.sub.length + " elem)" :
          this.stream.parseBitString(content, content + len, maxLength);
        case 0x04: // OCTET_STRING
          return this.sub ? "(" + this.sub.length + " elem)" :
          this.stream.parseOctetString(content, content + len, maxLength);
        // case 0x05: // NULL
        case 0x06: // OBJECT_IDENTIFIER
          return this.stream.parseOID(content, content + len, maxLength);
        // case 0x07: // ObjectDescriptor
        // case 0x08: // EXTERNAL
        // case 0x09: // REAL
        // case 0x0A: // ENUMERATED
        // case 0x0B: // EMBEDDED_PDV
        case 0x10: // SEQUENCE
        case 0x11: // SET
          if (this.sub !== null) {
            return "(" + this.sub.length + " elem)";
          } else
          {
            return "(no elem)";
          }
        case 0x0C: // UTF8String
          return stringCut(this.stream.parseStringUTF(content, content + len), maxLength);
        case 0x12: // NumericString
        case 0x13: // PrintableString
        case 0x14: // TeletexString
        case 0x15: // VideotexString
        case 0x16: // IA5String
        // case 0x19: // GraphicString
        case 0x1A: // VisibleString
          // case 0x1B: // GeneralString
          // case 0x1C: // UniversalString
          return stringCut(this.stream.parseStringISO(content, content + len), maxLength);
        case 0x1E: // BMPString
          return stringCut(this.stream.parseStringBMP(content, content + len), maxLength);
        case 0x17: // UTCTime
        case 0x18: // GeneralizedTime
          return this.stream.parseTime(content, content + len, this.tag.tagNumber == 0x17);}

      return null;
    };
    ASN1.prototype.toString = function () {
      return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (this.sub === null ? "null" : this.sub.length) + "]";
    };
    ASN1.prototype.toPrettyString = function (indent) {
      if (indent === undefined) {
        indent = "";
      }
      var s = indent + this.typeName() + " @" + this.stream.pos;
      if (this.length >= 0) {
        s += "+";
      }
      s += this.length;
      if (this.tag.tagConstructed) {
        s += " (constructed)";
      } else
      if (this.tag.isUniversal() && (this.tag.tagNumber == 0x03 || this.tag.tagNumber == 0x04) && this.sub !== null) {
        s += " (encapsulates)";
      }
      s += "\n";
      if (this.sub !== null) {
        indent += "  ";
        for (var i = 0, max = this.sub.length; i < max; ++i) {
          s += this.sub[i].toPrettyString(indent);
        }
      }
      return s;
    };
    ASN1.prototype.posStart = function () {
      return this.stream.pos;
    };
    ASN1.prototype.posContent = function () {
      return this.stream.pos + this.header;
    };
    ASN1.prototype.posEnd = function () {
      return this.stream.pos + this.header + Math.abs(this.length);
    };
    ASN1.prototype.toHexString = function () {
      return this.stream.hexDump(this.posStart(), this.posEnd(), true);
    };
    ASN1.decodeLength = function (stream) {
      var buf = stream.get();
      var len = buf & 0x7F;
      if (len == buf) {
        return len;
      }
      // no reason to use Int10, as it would be a huge buffer anyways
      if (len > 6) {
        throw new Error("Length over 48 bits not supported at position " + (stream.pos - 1));
      }
      if (len === 0) {
        return null;
      } // undefined
      buf = 0;
      for (var i = 0; i < len; ++i) {
        buf = buf * 256 + stream.get();
      }
      return buf;
    };
    /**
        * Retrieve the hexadecimal value (as a string) of the current ASN.1 element
        * @returns {string}
        * @public
        */
    ASN1.prototype.getHexStringValue = function () {
      var hexString = this.toHexString();
      var offset = this.header * 2;
      var length = this.length * 2;
      return hexString.substr(offset, length);
    };
    ASN1.decode = function (str) {
      var stream;
      if (!(str instanceof Stream)) {
        stream = new Stream(str, 0);
      } else
      {
        stream = str;
      }
      var streamStart = new Stream(stream);
      var tag = new ASN1Tag(stream);
      var len = ASN1.decodeLength(stream);
      var start = stream.pos;
      var header = start - streamStart.pos;
      var sub = null;
      var getSub = function getSub() {
        var ret = [];
        if (len !== null) {
          // definite length
          var end = start + len;
          while (stream.pos < end) {
            ret[ret.length] = ASN1.decode(stream);
          }
          if (stream.pos != end) {
            throw new Error("Content size is not correct for container starting at offset " + start);
          }
        } else
        {
          // undefined length
          try {
            for (;;) {
              var s = ASN1.decode(stream);
              if (s.tag.isEOC()) {
                break;
              }
              ret[ret.length] = s;
            }
            len = start - stream.pos; // undefined lengths are represented as negative values
          }
          catch (e) {
            throw new Error("Exception while decoding undefined length content: " + e);
          }
        }
        return ret;
      };
      if (tag.tagConstructed) {
        // must have valid content
        sub = getSub();
      } else
      if (tag.isUniversal() && (tag.tagNumber == 0x03 || tag.tagNumber == 0x04)) {
        // sometimes BitString and OctetString are used to encapsulate ASN.1
        try {
          if (tag.tagNumber == 0x03) {
            if (stream.get() != 0) {
              throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
            }
          }
          sub = getSub();
          for (var i = 0; i < sub.length; ++i) {
            if (sub[i].tag.isEOC()) {
              throw new Error("EOC is not supposed to be actual content.");
            }
          }
        }
        catch (e) {
          // but silently ignore when they don't
          sub = null;
        }
      }
      if (sub === null) {
        if (len === null) {
          throw new Error("We can't skip over an invalid tag with undefined length at offset " + start);
        }
        stream.pos = start + Math.abs(len);
      }
      return new ASN1(streamStart, header, len, tag, sub);
    };
    return ASN1;
  }();
  var ASN1Tag = /** @class */function () {
    function ASN1Tag(stream) {
      var buf = stream.get();
      this.tagClass = buf >> 6;
      this.tagConstructed = (buf & 0x20) !== 0;
      this.tagNumber = buf & 0x1F;
      if (this.tagNumber == 0x1F) {// long tag
        var n = new Int10();
        do {
          buf = stream.get();
          n.mulAdd(128, buf & 0x7F);
        } while (buf & 0x80);
        this.tagNumber = n.simplify();
      }
    }
    ASN1Tag.prototype.isUniversal = function () {
      return this.tagClass === 0x00;
    };
    ASN1Tag.prototype.isEOC = function () {
      return this.tagClass === 0x00 && this.tagNumber === 0x00;
    };
    return ASN1Tag;
  }();

  // Copyright (c) 2005  Tom Wu
  // Bits per digit
  var dbits;
  // JavaScript engine analysis
  var canary = 0xdeadbeefcafe;
  var j_lm = (canary & 0xffffff) == 0xefcafe;
  //#region
  var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
  var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
  //#endregion
  // (public) Constructor
  var BigInteger = /** @class */function () {
    function BigInteger(a, b, c) {
      if (a != null) {
        if ("number" == typeof a) {
          this.fromNumber(a, b, c);
        } else
        if (b == null && "string" != typeof a) {
          this.fromString(a, 256);
        } else
        {
          this.fromString(a, b);
        }
      }
    }
    //#region PUBLIC
    // BigInteger.prototype.toString = bnToString;
    // (public) return string representation in given radix
    BigInteger.prototype.toString = function (b) {
      if (this.s < 0) {
        return "-" + this.negate().toString(b);
      }
      var k;
      if (b == 16) {
        k = 4;
      } else
      if (b == 8) {
        k = 3;
      } else
      if (b == 2) {
        k = 1;
      } else
      if (b == 32) {
        k = 5;
      } else
      if (b == 4) {
        k = 2;
      } else
      {
        return this.toRadix(b);
      }
      var km = (1 << k) - 1;
      var d;
      var m = false;
      var r = "";
      var i = this.t;
      var p = this.DB - i * this.DB % k;
      if (i-- > 0) {
        if (p < this.DB && (d = this[i] >> p) > 0) {
          m = true;
          r = int2char(d);
        }
        while (i >= 0) {
          if (p < k) {
            d = (this[i] & (1 << p) - 1) << k - p;
            d |= this[--i] >> (p += this.DB - k);
          } else
          {
            d = this[i] >> (p -= k) & km;
            if (p <= 0) {
              p += this.DB;
              --i;
            }
          }
          if (d > 0) {
            m = true;
          }
          if (m) {
            r += int2char(d);
          }
        }
      }
      return m ? r : "0";
    };
    // BigInteger.prototype.negate = bnNegate;
    // (public) -this
    BigInteger.prototype.negate = function () {
      var r = nbi();
      BigInteger.ZERO.subTo(this, r);
      return r;
    };
    // BigInteger.prototype.abs = bnAbs;
    // (public) |this|
    BigInteger.prototype.abs = function () {
      return this.s < 0 ? this.negate() : this;
    };
    // BigInteger.prototype.compareTo = bnCompareTo;
    // (public) return + if this > a, - if this < a, 0 if equal
    BigInteger.prototype.compareTo = function (a) {
      var r = this.s - a.s;
      if (r != 0) {
        return r;
      }
      var i = this.t;
      r = i - a.t;
      if (r != 0) {
        return this.s < 0 ? -r : r;
      }
      while (--i >= 0) {
        if ((r = this[i] - a[i]) != 0) {
          return r;
        }
      }
      return 0;
    };
    // BigInteger.prototype.bitLength = bnBitLength;
    // (public) return the number of bits in "this"
    BigInteger.prototype.bitLength = function () {
      if (this.t <= 0) {
        return 0;
      }
      return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
    };
    // BigInteger.prototype.mod = bnMod;
    // (public) this mod a
    BigInteger.prototype.mod = function (a) {
      var r = nbi();
      this.abs().divRemTo(a, null, r);
      if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
        a.subTo(r, r);
      }
      return r;
    };
    // BigInteger.prototype.modPowInt = bnModPowInt;
    // (public) this^e % m, 0 <= e < 2^32
    BigInteger.prototype.modPowInt = function (e, m) {
      var z;
      if (e < 256 || m.isEven()) {
        z = new Classic(m);
      } else
      {
        z = new Montgomery(m);
      }
      return this.exp(e, z);
    };
    // BigInteger.prototype.clone = bnClone;
    // (public)
    BigInteger.prototype.clone = function () {
      var r = nbi();
      this.copyTo(r);
      return r;
    };
    // BigInteger.prototype.intValue = bnIntValue;
    // (public) return value as integer
    BigInteger.prototype.intValue = function () {
      if (this.s < 0) {
        if (this.t == 1) {
          return this[0] - this.DV;
        } else
        if (this.t == 0) {
          return -1;
        }
      } else
      if (this.t == 1) {
        return this[0];
      } else
      if (this.t == 0) {
        return 0;
      }
      // assumes 16 < DB < 32
      return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
    };
    // BigInteger.prototype.byteValue = bnByteValue;
    // (public) return value as byte
    BigInteger.prototype.byteValue = function () {
      return this.t == 0 ? this.s : this[0] << 24 >> 24;
    };
    // BigInteger.prototype.shortValue = bnShortValue;
    // (public) return value as short (assumes DB>=16)
    BigInteger.prototype.shortValue = function () {
      return this.t == 0 ? this.s : this[0] << 16 >> 16;
    };
    // BigInteger.prototype.signum = bnSigNum;
    // (public) 0 if this == 0, 1 if this > 0
    BigInteger.prototype.signum = function () {
      if (this.s < 0) {
        return -1;
      } else
      if (this.t <= 0 || this.t == 1 && this[0] <= 0) {
        return 0;
      } else
      {
        return 1;
      }
    };
    // BigInteger.prototype.toByteArray = bnToByteArray;
    // (public) convert to bigendian byte array
    BigInteger.prototype.toByteArray = function () {
      var i = this.t;
      var r = [];
      r[0] = this.s;
      var p = this.DB - i * this.DB % 8;
      var d;
      var k = 0;
      if (i-- > 0) {
        if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p) {
          r[k++] = d | this.s << this.DB - p;
        }
        while (i >= 0) {
          if (p < 8) {
            d = (this[i] & (1 << p) - 1) << 8 - p;
            d |= this[--i] >> (p += this.DB - 8);
          } else
          {
            d = this[i] >> (p -= 8) & 0xff;
            if (p <= 0) {
              p += this.DB;
              --i;
            }
          }
          if ((d & 0x80) != 0) {
            d |= -256;
          }
          if (k == 0 && (this.s & 0x80) != (d & 0x80)) {
            ++k;
          }
          if (k > 0 || d != this.s) {
            r[k++] = d;
          }
        }
      }
      return r;
    };
    // BigInteger.prototype.equals = bnEquals;
    BigInteger.prototype.equals = function (a) {
      return this.compareTo(a) == 0;
    };
    // BigInteger.prototype.min = bnMin;
    BigInteger.prototype.min = function (a) {
      return this.compareTo(a) < 0 ? this : a;
    };
    // BigInteger.prototype.max = bnMax;
    BigInteger.prototype.max = function (a) {
      return this.compareTo(a) > 0 ? this : a;
    };
    // BigInteger.prototype.and = bnAnd;
    BigInteger.prototype.and = function (a) {
      var r = nbi();
      this.bitwiseTo(a, op_and, r);
      return r;
    };
    // BigInteger.prototype.or = bnOr;
    BigInteger.prototype.or = function (a) {
      var r = nbi();
      this.bitwiseTo(a, op_or, r);
      return r;
    };
    // BigInteger.prototype.xor = bnXor;
    BigInteger.prototype.xor = function (a) {
      var r = nbi();
      this.bitwiseTo(a, op_xor, r);
      return r;
    };
    // BigInteger.prototype.andNot = bnAndNot;
    BigInteger.prototype.andNot = function (a) {
      var r = nbi();
      this.bitwiseTo(a, op_andnot, r);
      return r;
    };
    // BigInteger.prototype.not = bnNot;
    // (public) ~this
    BigInteger.prototype.not = function () {
      var r = nbi();
      for (var i = 0; i < this.t; ++i) {
        r[i] = this.DM & ~this[i];
      }
      r.t = this.t;
      r.s = ~this.s;
      return r;
    };
    // BigInteger.prototype.shiftLeft = bnShiftLeft;
    // (public) this << n
    BigInteger.prototype.shiftLeft = function (n) {
      var r = nbi();
      if (n < 0) {
        this.rShiftTo(-n, r);
      } else
      {
        this.lShiftTo(n, r);
      }
      return r;
    };
    // BigInteger.prototype.shiftRight = bnShiftRight;
    // (public) this >> n
    BigInteger.prototype.shiftRight = function (n) {
      var r = nbi();
      if (n < 0) {
        this.lShiftTo(-n, r);
      } else
      {
        this.rShiftTo(n, r);
      }
      return r;
    };
    // BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
    // (public) returns index of lowest 1-bit (or -1 if none)
    BigInteger.prototype.getLowestSetBit = function () {
      for (var i = 0; i < this.t; ++i) {
        if (this[i] != 0) {
          return i * this.DB + lbit(this[i]);
        }
      }
      if (this.s < 0) {
        return this.t * this.DB;
      }
      return -1;
    };
    // BigInteger.prototype.bitCount = bnBitCount;
    // (public) return number of set bits
    BigInteger.prototype.bitCount = function () {
      var r = 0;
      var x = this.s & this.DM;
      for (var i = 0; i < this.t; ++i) {
        r += cbit(this[i] ^ x);
      }
      return r;
    };
    // BigInteger.prototype.testBit = bnTestBit;
    // (public) true iff nth bit is set
    BigInteger.prototype.testBit = function (n) {
      var j = Math.floor(n / this.DB);
      if (j >= this.t) {
        return this.s != 0;
      }
      return (this[j] & 1 << n % this.DB) != 0;
    };
    // BigInteger.prototype.setBit = bnSetBit;
    // (public) this | (1<<n)
    BigInteger.prototype.setBit = function (n) {
      return this.changeBit(n, op_or);
    };
    // BigInteger.prototype.clearBit = bnClearBit;
    // (public) this & ~(1<<n)
    BigInteger.prototype.clearBit = function (n) {
      return this.changeBit(n, op_andnot);
    };
    // BigInteger.prototype.flipBit = bnFlipBit;
    // (public) this ^ (1<<n)
    BigInteger.prototype.flipBit = function (n) {
      return this.changeBit(n, op_xor);
    };
    // BigInteger.prototype.add = bnAdd;
    // (public) this + a
    BigInteger.prototype.add = function (a) {
      var r = nbi();
      this.addTo(a, r);
      return r;
    };
    // BigInteger.prototype.subtract = bnSubtract;
    // (public) this - a
    BigInteger.prototype.subtract = function (a) {
      var r = nbi();
      this.subTo(a, r);
      return r;
    };
    // BigInteger.prototype.multiply = bnMultiply;
    // (public) this * a
    BigInteger.prototype.multiply = function (a) {
      var r = nbi();
      this.multiplyTo(a, r);
      return r;
    };
    // BigInteger.prototype.divide = bnDivide;
    // (public) this / a
    BigInteger.prototype.divide = function (a) {
      var r = nbi();
      this.divRemTo(a, r, null);
      return r;
    };
    // BigInteger.prototype.remainder = bnRemainder;
    // (public) this % a
    BigInteger.prototype.remainder = function (a) {
      var r = nbi();
      this.divRemTo(a, null, r);
      return r;
    };
    // BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
    // (public) [this/a,this%a]
    BigInteger.prototype.divideAndRemainder = function (a) {
      var q = nbi();
      var r = nbi();
      this.divRemTo(a, q, r);
      return [q, r];
    };
    // BigInteger.prototype.modPow = bnModPow;
    // (public) this^e % m (HAC 14.85)
    BigInteger.prototype.modPow = function (e, m) {
      var i = e.bitLength();
      var k;
      var r = nbv(1);
      var z;
      if (i <= 0) {
        return r;
      } else
      if (i < 18) {
        k = 1;
      } else
      if (i < 48) {
        k = 3;
      } else
      if (i < 144) {
        k = 4;
      } else
      if (i < 768) {
        k = 5;
      } else
      {
        k = 6;
      }
      if (i < 8) {
        z = new Classic(m);
      } else
      if (m.isEven()) {
        z = new Barrett(m);
      } else
      {
        z = new Montgomery(m);
      }
      // precomputation
      var g = [];
      var n = 3;
      var k1 = k - 1;
      var km = (1 << k) - 1;
      g[1] = z.convert(this);
      if (k > 1) {
        var g2 = nbi();
        z.sqrTo(g[1], g2);
        while (n <= km) {
          g[n] = nbi();
          z.mulTo(g2, g[n - 2], g[n]);
          n += 2;
        }
      }
      var j = e.t - 1;
      var w;
      var is1 = true;
      var r2 = nbi();
      var t;
      i = nbits(e[j]) - 1;
      while (j >= 0) {
        if (i >= k1) {
          w = e[j] >> i - k1 & km;
        } else
        {
          w = (e[j] & (1 << i + 1) - 1) << k1 - i;
          if (j > 0) {
            w |= e[j - 1] >> this.DB + i - k1;
          }
        }
        n = k;
        while ((w & 1) == 0) {
          w >>= 1;
          --n;
        }
        if ((i -= n) < 0) {
          i += this.DB;
          --j;
        }
        if (is1) {// ret == 1, don't bother squaring or multiplying it
          g[w].copyTo(r);
          is1 = false;
        } else
        {
          while (n > 1) {
            z.sqrTo(r, r2);
            z.sqrTo(r2, r);
            n -= 2;
          }
          if (n > 0) {
            z.sqrTo(r, r2);
          } else
          {
            t = r;
            r = r2;
            r2 = t;
          }
          z.mulTo(r2, g[w], r);
        }
        while (j >= 0 && (e[j] & 1 << i) == 0) {
          z.sqrTo(r, r2);
          t = r;
          r = r2;
          r2 = t;
          if (--i < 0) {
            i = this.DB - 1;
            --j;
          }
        }
      }
      return z.revert(r);
    };
    // BigInteger.prototype.modInverse = bnModInverse;
    // (public) 1/this % m (HAC 14.61)
    BigInteger.prototype.modInverse = function (m) {
      var ac = m.isEven();
      if (this.isEven() && ac || m.signum() == 0) {
        return BigInteger.ZERO;
      }
      var u = m.clone();
      var v = this.clone();
      var a = nbv(1);
      var b = nbv(0);
      var c = nbv(0);
      var d = nbv(1);
      while (u.signum() != 0) {
        while (u.isEven()) {
          u.rShiftTo(1, u);
          if (ac) {
            if (!a.isEven() || !b.isEven()) {
              a.addTo(this, a);
              b.subTo(m, b);
            }
            a.rShiftTo(1, a);
          } else
          if (!b.isEven()) {
            b.subTo(m, b);
          }
          b.rShiftTo(1, b);
        }
        while (v.isEven()) {
          v.rShiftTo(1, v);
          if (ac) {
            if (!c.isEven() || !d.isEven()) {
              c.addTo(this, c);
              d.subTo(m, d);
            }
            c.rShiftTo(1, c);
          } else
          if (!d.isEven()) {
            d.subTo(m, d);
          }
          d.rShiftTo(1, d);
        }
        if (u.compareTo(v) >= 0) {
          u.subTo(v, u);
          if (ac) {
            a.subTo(c, a);
          }
          b.subTo(d, b);
        } else
        {
          v.subTo(u, v);
          if (ac) {
            c.subTo(a, c);
          }
          d.subTo(b, d);
        }
      }
      if (v.compareTo(BigInteger.ONE) != 0) {
        return BigInteger.ZERO;
      }
      if (d.compareTo(m) >= 0) {
        return d.subtract(m);
      }
      if (d.signum() < 0) {
        d.addTo(m, d);
      } else
      {
        return d;
      }
      if (d.signum() < 0) {
        return d.add(m);
      } else
      {
        return d;
      }
    };
    // BigInteger.prototype.pow = bnPow;
    // (public) this^e
    BigInteger.prototype.pow = function (e) {
      return this.exp(e, new NullExp());
    };
    // BigInteger.prototype.gcd = bnGCD;
    // (public) gcd(this,a) (HAC 14.54)
    BigInteger.prototype.gcd = function (a) {
      var x = this.s < 0 ? this.negate() : this.clone();
      var y = a.s < 0 ? a.negate() : a.clone();
      if (x.compareTo(y) < 0) {
        var t = x;
        x = y;
        y = t;
      }
      var i = x.getLowestSetBit();
      var g = y.getLowestSetBit();
      if (g < 0) {
        return x;
      }
      if (i < g) {
        g = i;
      }
      if (g > 0) {
        x.rShiftTo(g, x);
        y.rShiftTo(g, y);
      }
      while (x.signum() > 0) {
        if ((i = x.getLowestSetBit()) > 0) {
          x.rShiftTo(i, x);
        }
        if ((i = y.getLowestSetBit()) > 0) {
          y.rShiftTo(i, y);
        }
        if (x.compareTo(y) >= 0) {
          x.subTo(y, x);
          x.rShiftTo(1, x);
        } else
        {
          y.subTo(x, y);
          y.rShiftTo(1, y);
        }
      }
      if (g > 0) {
        y.lShiftTo(g, y);
      }
      return y;
    };
    // BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
    // (public) test primality with certainty >= 1-.5^t
    BigInteger.prototype.isProbablePrime = function (t) {
      var i;
      var x = this.abs();
      if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
        for (i = 0; i < lowprimes.length; ++i) {
          if (x[0] == lowprimes[i]) {
            return true;
          }
        }
        return false;
      }
      if (x.isEven()) {
        return false;
      }
      i = 1;
      while (i < lowprimes.length) {
        var m = lowprimes[i];
        var j = i + 1;
        while (j < lowprimes.length && m < lplim) {
          m *= lowprimes[j++];
        }
        m = x.modInt(m);
        while (i < j) {
          if (m % lowprimes[i++] == 0) {
            return false;
          }
        }
      }
      return x.millerRabin(t);
    };
    //#endregion PUBLIC
    //#region PROTECTED
    // BigInteger.prototype.copyTo = bnpCopyTo;
    // (protected) copy this to r
    BigInteger.prototype.copyTo = function (r) {
      for (var i = this.t - 1; i >= 0; --i) {
        r[i] = this[i];
      }
      r.t = this.t;
      r.s = this.s;
    };
    // BigInteger.prototype.fromInt = bnpFromInt;
    // (protected) set from integer value x, -DV <= x < DV
    BigInteger.prototype.fromInt = function (x) {
      this.t = 1;
      this.s = x < 0 ? -1 : 0;
      if (x > 0) {
        this[0] = x;
      } else
      if (x < -1) {
        this[0] = x + this.DV;
      } else
      {
        this.t = 0;
      }
    };
    // BigInteger.prototype.fromString = bnpFromString;
    // (protected) set from string and radix
    BigInteger.prototype.fromString = function (s, b) {
      var k;
      if (b == 16) {
        k = 4;
      } else
      if (b == 8) {
        k = 3;
      } else
      if (b == 256) {
        k = 8;
        /* byte array */
      } else
      if (b == 2) {
        k = 1;
      } else
      if (b == 32) {
        k = 5;
      } else
      if (b == 4) {
        k = 2;
      } else
      {
        this.fromRadix(s, b);
        return;
      }
      this.t = 0;
      this.s = 0;
      var i = s.length;
      var mi = false;
      var sh = 0;
      while (--i >= 0) {
        var x = k == 8 ? +s[i] & 0xff : intAt(s, i);
        if (x < 0) {
          if (s.charAt(i) == "-") {
            mi = true;
          }
          continue;
        }
        mi = false;
        if (sh == 0) {
          this[this.t++] = x;
        } else
        if (sh + k > this.DB) {
          this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
          this[this.t++] = x >> this.DB - sh;
        } else
        {
          this[this.t - 1] |= x << sh;
        }
        sh += k;
        if (sh >= this.DB) {
          sh -= this.DB;
        }
      }
      if (k == 8 && (+s[0] & 0x80) != 0) {
        this.s = -1;
        if (sh > 0) {
          this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
        }
      }
      this.clamp();
      if (mi) {
        BigInteger.ZERO.subTo(this, this);
      }
    };
    // BigInteger.prototype.clamp = bnpClamp;
    // (protected) clamp off excess high words
    BigInteger.prototype.clamp = function () {
      var c = this.s & this.DM;
      while (this.t > 0 && this[this.t - 1] == c) {
        --this.t;
      }
    };
    // BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
    // (protected) r = this << n*DB
    BigInteger.prototype.dlShiftTo = function (n, r) {
      var i;
      for (i = this.t - 1; i >= 0; --i) {
        r[i + n] = this[i];
      }
      for (i = n - 1; i >= 0; --i) {
        r[i] = 0;
      }
      r.t = this.t + n;
      r.s = this.s;
    };
    // BigInteger.prototype.drShiftTo = bnpDRShiftTo;
    // (protected) r = this >> n*DB
    BigInteger.prototype.drShiftTo = function (n, r) {
      for (var i = n; i < this.t; ++i) {
        r[i - n] = this[i];
      }
      r.t = Math.max(this.t - n, 0);
      r.s = this.s;
    };
    // BigInteger.prototype.lShiftTo = bnpLShiftTo;
    // (protected) r = this << n
    BigInteger.prototype.lShiftTo = function (n, r) {
      var bs = n % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << cbs) - 1;
      var ds = Math.floor(n / this.DB);
      var c = this.s << bs & this.DM;
      for (var i = this.t - 1; i >= 0; --i) {
        r[i + ds + 1] = this[i] >> cbs | c;
        c = (this[i] & bm) << bs;
      }
      for (var i = ds - 1; i >= 0; --i) {
        r[i] = 0;
      }
      r[ds] = c;
      r.t = this.t + ds + 1;
      r.s = this.s;
      r.clamp();
    };
    // BigInteger.prototype.rShiftTo = bnpRShiftTo;
    // (protected) r = this >> n
    BigInteger.prototype.rShiftTo = function (n, r) {
      r.s = this.s;
      var ds = Math.floor(n / this.DB);
      if (ds >= this.t) {
        r.t = 0;
        return;
      }
      var bs = n % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << bs) - 1;
      r[0] = this[ds] >> bs;
      for (var i = ds + 1; i < this.t; ++i) {
        r[i - ds - 1] |= (this[i] & bm) << cbs;
        r[i - ds] = this[i] >> bs;
      }
      if (bs > 0) {
        r[this.t - ds - 1] |= (this.s & bm) << cbs;
      }
      r.t = this.t - ds;
      r.clamp();
    };
    // BigInteger.prototype.subTo = bnpSubTo;
    // (protected) r = this - a
    BigInteger.prototype.subTo = function (a, r) {
      var i = 0;
      var c = 0;
      var m = Math.min(a.t, this.t);
      while (i < m) {
        c += this[i] - a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      if (a.t < this.t) {
        c -= a.s;
        while (i < this.t) {
          c += this[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }
        c += this.s;
      } else
      {
        c += this.s;
        while (i < a.t) {
          c -= a[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }
        c -= a.s;
      }
      r.s = c < 0 ? -1 : 0;
      if (c < -1) {
        r[i++] = this.DV + c;
      } else
      if (c > 0) {
        r[i++] = c;
      }
      r.t = i;
      r.clamp();
    };
    // BigInteger.prototype.multiplyTo = bnpMultiplyTo;
    // (protected) r = this * a, r != this,a (HAC 14.12)
    // "this" should be the larger one if appropriate.
    BigInteger.prototype.multiplyTo = function (a, r) {
      var x = this.abs();
      var y = a.abs();
      var i = x.t;
      r.t = i + y.t;
      while (--i >= 0) {
        r[i] = 0;
      }
      for (i = 0; i < y.t; ++i) {
        r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
      }
      r.s = 0;
      r.clamp();
      if (this.s != a.s) {
        BigInteger.ZERO.subTo(r, r);
      }
    };
    // BigInteger.prototype.squareTo = bnpSquareTo;
    // (protected) r = this^2, r != this (HAC 14.16)
    BigInteger.prototype.squareTo = function (r) {
      var x = this.abs();
      var i = r.t = 2 * x.t;
      while (--i >= 0) {
        r[i] = 0;
      }
      for (i = 0; i < x.t - 1; ++i) {
        var c = x.am(i, x[i], r, 2 * i, 0, 1);
        if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
          r[i + x.t] -= x.DV;
          r[i + x.t + 1] = 1;
        }
      }
      if (r.t > 0) {
        r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
      }
      r.s = 0;
      r.clamp();
    };
    // BigInteger.prototype.divRemTo = bnpDivRemTo;
    // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
    // r != q, this != m.  q or r may be null.
    BigInteger.prototype.divRemTo = function (m, q, r) {
      var pm = m.abs();
      if (pm.t <= 0) {
        return;
      }
      var pt = this.abs();
      if (pt.t < pm.t) {
        if (q != null) {
          q.fromInt(0);
        }
        if (r != null) {
          this.copyTo(r);
        }
        return;
      }
      if (r == null) {
        r = nbi();
      }
      var y = nbi();
      var ts = this.s;
      var ms = m.s;
      var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus
      if (nsh > 0) {
        pm.lShiftTo(nsh, y);
        pt.lShiftTo(nsh, r);
      } else
      {
        pm.copyTo(y);
        pt.copyTo(r);
      }
      var ys = y.t;
      var y0 = y[ys - 1];
      if (y0 == 0) {
        return;
      }
      var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
      var d1 = this.FV / yt;
      var d2 = (1 << this.F1) / yt;
      var e = 1 << this.F2;
      var i = r.t;
      var j = i - ys;
      var t = q == null ? nbi() : q;
      y.dlShiftTo(j, t);
      if (r.compareTo(t) >= 0) {
        r[r.t++] = 1;
        r.subTo(t, r);
      }
      BigInteger.ONE.dlShiftTo(ys, t);
      t.subTo(y, y); // "negative" y so we can replace sub with am later
      while (y.t < ys) {
        y[y.t++] = 0;
      }
      while (--j >= 0) {
        // Estimate quotient digit
        var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
        if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {// Try it out
          y.dlShiftTo(j, t);
          r.subTo(t, r);
          while (r[i] < --qd) {
            r.subTo(t, r);
          }
        }
      }
      if (q != null) {
        r.drShiftTo(ys, q);
        if (ts != ms) {
          BigInteger.ZERO.subTo(q, q);
        }
      }
      r.t = ys;
      r.clamp();
      if (nsh > 0) {
        r.rShiftTo(nsh, r);
      } // Denormalize remainder
      if (ts < 0) {
        BigInteger.ZERO.subTo(r, r);
      }
    };
    // BigInteger.prototype.invDigit = bnpInvDigit;
    // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
    // justification:
    //         xy == 1 (mod m)
    //         xy =  1+km
    //   xy(2-xy) = (1+km)(1-km)
    // x[y(2-xy)] = 1-k^2m^2
    // x[y(2-xy)] == 1 (mod m^2)
    // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
    // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
    // JS multiply "overflows" differently from C/C++, so care is needed here.
    BigInteger.prototype.invDigit = function () {
      if (this.t < 1) {
        return 0;
      }
      var x = this[0];
      if ((x & 1) == 0) {
        return 0;
      }
      var y = x & 3; // y == 1/x mod 2^2
      y = y * (2 - (x & 0xf) * y) & 0xf; // y == 1/x mod 2^4
      y = y * (2 - (x & 0xff) * y) & 0xff; // y == 1/x mod 2^8
      y = y * (2 - ((x & 0xffff) * y & 0xffff)) & 0xffff; // y == 1/x mod 2^16
      // last step - calculate inverse mod DV directly;
      // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
      y = y * (2 - x * y % this.DV) % this.DV; // y == 1/x mod 2^dbits
      // we really want the negative inverse, and -DV < y < DV
      return y > 0 ? this.DV - y : -y;
    };
    // BigInteger.prototype.isEven = bnpIsEven;
    // (protected) true iff this is even
    BigInteger.prototype.isEven = function () {
      return (this.t > 0 ? this[0] & 1 : this.s) == 0;
    };
    // BigInteger.prototype.exp = bnpExp;
    // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
    BigInteger.prototype.exp = function (e, z) {
      if (e > 0xffffffff || e < 1) {
        return BigInteger.ONE;
      }
      var r = nbi();
      var r2 = nbi();
      var g = z.convert(this);
      var i = nbits(e) - 1;
      g.copyTo(r);
      while (--i >= 0) {
        z.sqrTo(r, r2);
        if ((e & 1 << i) > 0) {
          z.mulTo(r2, g, r);
        } else
        {
          var t = r;
          r = r2;
          r2 = t;
        }
      }
      return z.revert(r);
    };
    // BigInteger.prototype.chunkSize = bnpChunkSize;
    // (protected) return x s.t. r^x < DV
    BigInteger.prototype.chunkSize = function (r) {
      return Math.floor(Math.LN2 * this.DB / Math.log(r));
    };
    // BigInteger.prototype.toRadix = bnpToRadix;
    // (protected) convert to radix string
    BigInteger.prototype.toRadix = function (b) {
      if (b == null) {
        b = 10;
      }
      if (this.signum() == 0 || b < 2 || b > 36) {
        return "0";
      }
      var cs = this.chunkSize(b);
      var a = Math.pow(b, cs);
      var d = nbv(a);
      var y = nbi();
      var z = nbi();
      var r = "";
      this.divRemTo(d, y, z);
      while (y.signum() > 0) {
        r = (a + z.intValue()).toString(b).substr(1) + r;
        y.divRemTo(d, y, z);
      }
      return z.intValue().toString(b) + r;
    };
    // BigInteger.prototype.fromRadix = bnpFromRadix;
    // (protected) convert from radix string
    BigInteger.prototype.fromRadix = function (s, b) {
      this.fromInt(0);
      if (b == null) {
        b = 10;
      }
      var cs = this.chunkSize(b);
      var d = Math.pow(b, cs);
      var mi = false;
      var j = 0;
      var w = 0;
      for (var i = 0; i < s.length; ++i) {
        var x = intAt(s, i);
        if (x < 0) {
          if (s.charAt(i) == "-" && this.signum() == 0) {
            mi = true;
          }
          continue;
        }
        w = b * w + x;
        if (++j >= cs) {
          this.dMultiply(d);
          this.dAddOffset(w, 0);
          j = 0;
          w = 0;
        }
      }
      if (j > 0) {
        this.dMultiply(Math.pow(b, j));
        this.dAddOffset(w, 0);
      }
      if (mi) {
        BigInteger.ZERO.subTo(this, this);
      }
    };
    // BigInteger.prototype.fromNumber = bnpFromNumber;
    // (protected) alternate constructor
    BigInteger.prototype.fromNumber = function (a, b, c) {
      if ("number" == typeof b) {
        // new BigInteger(int,int,RNG)
        if (a < 2) {
          this.fromInt(1);
        } else
        {
          this.fromNumber(a, c);
          if (!this.testBit(a - 1)) {
            // force MSB set
            this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
          }
          if (this.isEven()) {
            this.dAddOffset(1, 0);
          } // force odd
          while (!this.isProbablePrime(b)) {
            this.dAddOffset(2, 0);
            if (this.bitLength() > a) {
              this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
            }
          }
        }
      } else
      {
        // new BigInteger(int,RNG)
        var x = [];
        var t = a & 7;
        x.length = (a >> 3) + 1;
        b.nextBytes(x);
        if (t > 0) {
          x[0] &= (1 << t) - 1;
        } else
        {
          x[0] = 0;
        }
        this.fromString(x, 256);
      }
    };
    // BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
    // (protected) r = this op a (bitwise)
    BigInteger.prototype.bitwiseTo = function (a, op, r) {
      var i;
      var f;
      var m = Math.min(a.t, this.t);
      for (i = 0; i < m; ++i) {
        r[i] = op(this[i], a[i]);
      }
      if (a.t < this.t) {
        f = a.s & this.DM;
        for (i = m; i < this.t; ++i) {
          r[i] = op(this[i], f);
        }
        r.t = this.t;
      } else
      {
        f = this.s & this.DM;
        for (i = m; i < a.t; ++i) {
          r[i] = op(f, a[i]);
        }
        r.t = a.t;
      }
      r.s = op(this.s, a.s);
      r.clamp();
    };
    // BigInteger.prototype.changeBit = bnpChangeBit;
    // (protected) this op (1<<n)
    BigInteger.prototype.changeBit = function (n, op) {
      var r = BigInteger.ONE.shiftLeft(n);
      this.bitwiseTo(r, op, r);
      return r;
    };
    // BigInteger.prototype.addTo = bnpAddTo;
    // (protected) r = this + a
    BigInteger.prototype.addTo = function (a, r) {
      var i = 0;
      var c = 0;
      var m = Math.min(a.t, this.t);
      while (i < m) {
        c += this[i] + a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      if (a.t < this.t) {
        c += a.s;
        while (i < this.t) {
          c += this[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }
        c += this.s;
      } else
      {
        c += this.s;
        while (i < a.t) {
          c += a[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }
        c += a.s;
      }
      r.s = c < 0 ? -1 : 0;
      if (c > 0) {
        r[i++] = c;
      } else
      if (c < -1) {
        r[i++] = this.DV + c;
      }
      r.t = i;
      r.clamp();
    };
    // BigInteger.prototype.dMultiply = bnpDMultiply;
    // (protected) this *= n, this >= 0, 1 < n < DV
    BigInteger.prototype.dMultiply = function (n) {
      this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
      ++this.t;
      this.clamp();
    };
    // BigInteger.prototype.dAddOffset = bnpDAddOffset;
    // (protected) this += n << w words, this >= 0
    BigInteger.prototype.dAddOffset = function (n, w) {
      if (n == 0) {
        return;
      }
      while (this.t <= w) {
        this[this.t++] = 0;
      }
      this[w] += n;
      while (this[w] >= this.DV) {
        this[w] -= this.DV;
        if (++w >= this.t) {
          this[this.t++] = 0;
        }
        ++this[w];
      }
    };
    // BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
    // (protected) r = lower n words of "this * a", a.t <= n
    // "this" should be the larger one if appropriate.
    BigInteger.prototype.multiplyLowerTo = function (a, n, r) {
      var i = Math.min(this.t + a.t, n);
      r.s = 0; // assumes a,this >= 0
      r.t = i;
      while (i > 0) {
        r[--i] = 0;
      }
      for (var j = r.t - this.t; i < j; ++i) {
        r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
      }
      for (var j = Math.min(a.t, n); i < j; ++i) {
        this.am(0, a[i], r, i, 0, n - i);
      }
      r.clamp();
    };
    // BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
    // (protected) r = "this * a" without lower n words, n > 0
    // "this" should be the larger one if appropriate.
    BigInteger.prototype.multiplyUpperTo = function (a, n, r) {
      --n;
      var i = r.t = this.t + a.t - n;
      r.s = 0; // assumes a,this >= 0
      while (--i >= 0) {
        r[i] = 0;
      }
      for (i = Math.max(n - this.t, 0); i < a.t; ++i) {
        r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
      }
      r.clamp();
      r.drShiftTo(1, r);
    };
    // BigInteger.prototype.modInt = bnpModInt;
    // (protected) this % n, n < 2^26
    BigInteger.prototype.modInt = function (n) {
      if (n <= 0) {
        return 0;
      }
      var d = this.DV % n;
      var r = this.s < 0 ? n - 1 : 0;
      if (this.t > 0) {
        if (d == 0) {
          r = this[0] % n;
        } else
        {
          for (var i = this.t - 1; i >= 0; --i) {
            r = (d * r + this[i]) % n;
          }
        }
      }
      return r;
    };
    // BigInteger.prototype.millerRabin = bnpMillerRabin;
    // (protected) true if probably prime (HAC 4.24, Miller-Rabin)
    BigInteger.prototype.millerRabin = function (t) {
      var n1 = this.subtract(BigInteger.ONE);
      var k = n1.getLowestSetBit();
      if (k <= 0) {
        return false;
      }
      var r = n1.shiftRight(k);
      t = t + 1 >> 1;
      if (t > lowprimes.length) {
        t = lowprimes.length;
      }
      var a = nbi();
      for (var i = 0; i < t; ++i) {
        // Pick bases at random, instead of starting at 2
        a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var y = a.modPow(r, this);
        if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
          var j = 1;
          while (j++ < k && y.compareTo(n1) != 0) {
            y = y.modPowInt(2, this);
            if (y.compareTo(BigInteger.ONE) == 0) {
              return false;
            }
          }
          if (y.compareTo(n1) != 0) {
            return false;
          }
        }
      }
      return true;
    };
    // BigInteger.prototype.square = bnSquare;
    // (public) this^2
    BigInteger.prototype.square = function () {
      var r = nbi();
      this.squareTo(r);
      return r;
    };
    //#region ASYNC
    // Public API method
    BigInteger.prototype.gcda = function (a, callback) {
      var x = this.s < 0 ? this.negate() : this.clone();
      var y = a.s < 0 ? a.negate() : a.clone();
      if (x.compareTo(y) < 0) {
        var t = x;
        x = y;
        y = t;
      }
      var i = x.getLowestSetBit();
      var g = y.getLowestSetBit();
      if (g < 0) {
        callback(x);
        return;
      }
      if (i < g) {
        g = i;
      }
      if (g > 0) {
        x.rShiftTo(g, x);
        y.rShiftTo(g, y);
      }
      // Workhorse of the algorithm, gets called 200 - 800 times per 512 bit keygen.
      var gcda1 = function gcda1() {
        if ((i = x.getLowestSetBit()) > 0) {
          x.rShiftTo(i, x);
        }
        if ((i = y.getLowestSetBit()) > 0) {
          y.rShiftTo(i, y);
        }
        if (x.compareTo(y) >= 0) {
          x.subTo(y, x);
          x.rShiftTo(1, x);
        } else
        {
          y.subTo(x, y);
          y.rShiftTo(1, y);
        }
        if (!(x.signum() > 0)) {
          if (g > 0) {
            y.lShiftTo(g, y);
          }
          setTimeout(function () {callback(y);}, 0); // escape
        } else
        {
          setTimeout(gcda1, 0);
        }
      };
      setTimeout(gcda1, 10);
    };
    // (protected) alternate constructor
    BigInteger.prototype.fromNumberAsync = function (a, b, c, callback) {
      if ("number" == typeof b) {
        if (a < 2) {
          this.fromInt(1);
        } else
        {
          this.fromNumber(a, c);
          if (!this.testBit(a - 1)) {
            this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
          }
          if (this.isEven()) {
            this.dAddOffset(1, 0);
          }
          var bnp_1 = this;
          var bnpfn1_1 = function bnpfn1_1() {
            bnp_1.dAddOffset(2, 0);
            if (bnp_1.bitLength() > a) {
              bnp_1.subTo(BigInteger.ONE.shiftLeft(a - 1), bnp_1);
            }
            if (bnp_1.isProbablePrime(b)) {
              setTimeout(function () {callback();}, 0); // escape
            } else
            {
              setTimeout(bnpfn1_1, 0);
            }
          };
          setTimeout(bnpfn1_1, 0);
        }
      } else
      {
        var x = [];
        var t = a & 7;
        x.length = (a >> 3) + 1;
        b.nextBytes(x);
        if (t > 0) {
          x[0] &= (1 << t) - 1;
        } else
        {
          x[0] = 0;
        }
        this.fromString(x, 256);
      }
    };
    return BigInteger;
  }();
  //#region REDUCERS
  //#region NullExp
  var NullExp = /** @class */function () {
    function NullExp() {
    }
    // NullExp.prototype.convert = nNop;
    NullExp.prototype.convert = function (x) {
      return x;
    };
    // NullExp.prototype.revert = nNop;
    NullExp.prototype.revert = function (x) {
      return x;
    };
    // NullExp.prototype.mulTo = nMulTo;
    NullExp.prototype.mulTo = function (x, y, r) {
      x.multiplyTo(y, r);
    };
    // NullExp.prototype.sqrTo = nSqrTo;
    NullExp.prototype.sqrTo = function (x, r) {
      x.squareTo(r);
    };
    return NullExp;
  }();
  // Modular reduction using "classic" algorithm
  var Classic = /** @class */function () {
    function Classic(m) {
      this.m = m;
    }
    // Classic.prototype.convert = cConvert;
    Classic.prototype.convert = function (x) {
      if (x.s < 0 || x.compareTo(this.m) >= 0) {
        return x.mod(this.m);
      } else
      {
        return x;
      }
    };
    // Classic.prototype.revert = cRevert;
    Classic.prototype.revert = function (x) {
      return x;
    };
    // Classic.prototype.reduce = cReduce;
    Classic.prototype.reduce = function (x) {
      x.divRemTo(this.m, null, x);
    };
    // Classic.prototype.mulTo = cMulTo;
    Classic.prototype.mulTo = function (x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    };
    // Classic.prototype.sqrTo = cSqrTo;
    Classic.prototype.sqrTo = function (x, r) {
      x.squareTo(r);
      this.reduce(r);
    };
    return Classic;
  }();
  //#endregion
  //#region Montgomery
  // Montgomery reduction
  var Montgomery = /** @class */function () {
    function Montgomery(m) {
      this.m = m;
      this.mp = m.invDigit();
      this.mpl = this.mp & 0x7fff;
      this.mph = this.mp >> 15;
      this.um = (1 << m.DB - 15) - 1;
      this.mt2 = 2 * m.t;
    }
    // Montgomery.prototype.convert = montConvert;
    // xR mod m
    Montgomery.prototype.convert = function (x) {
      var r = nbi();
      x.abs().dlShiftTo(this.m.t, r);
      r.divRemTo(this.m, null, r);
      if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
        this.m.subTo(r, r);
      }
      return r;
    };
    // Montgomery.prototype.revert = montRevert;
    // x/R mod m
    Montgomery.prototype.revert = function (x) {
      var r = nbi();
      x.copyTo(r);
      this.reduce(r);
      return r;
    };
    // Montgomery.prototype.reduce = montReduce;
    // x = x/R mod m (HAC 14.32)
    Montgomery.prototype.reduce = function (x) {
      while (x.t <= this.mt2) {
        // pad x so am has enough room later
        x[x.t++] = 0;
      }
      for (var i = 0; i < this.m.t; ++i) {
        // faster way of calculating u0 = x[i]*mp mod DV
        var j = x[i] & 0x7fff;
        var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM;
        // use am to combine the multiply-shift-add into one call
        j = i + this.m.t;
        x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
        // propagate carry
        while (x[j] >= x.DV) {
          x[j] -= x.DV;
          x[++j]++;
        }
      }
      x.clamp();
      x.drShiftTo(this.m.t, x);
      if (x.compareTo(this.m) >= 0) {
        x.subTo(this.m, x);
      }
    };
    // Montgomery.prototype.mulTo = montMulTo;
    // r = "xy/R mod m"; x,y != r
    Montgomery.prototype.mulTo = function (x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    };
    // Montgomery.prototype.sqrTo = montSqrTo;
    // r = "x^2/R mod m"; x != r
    Montgomery.prototype.sqrTo = function (x, r) {
      x.squareTo(r);
      this.reduce(r);
    };
    return Montgomery;
  }();
  //#endregion Montgomery
  //#region Barrett
  // Barrett modular reduction
  var Barrett = /** @class */function () {
    function Barrett(m) {
      this.m = m;
      // setup Barrett
      this.r2 = nbi();
      this.q3 = nbi();
      BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
      this.mu = this.r2.divide(m);
    }
    // Barrett.prototype.convert = barrettConvert;
    Barrett.prototype.convert = function (x) {
      if (x.s < 0 || x.t > 2 * this.m.t) {
        return x.mod(this.m);
      } else
      if (x.compareTo(this.m) < 0) {
        return x;
      } else
      {
        var r = nbi();
        x.copyTo(r);
        this.reduce(r);
        return r;
      }
    };
    // Barrett.prototype.revert = barrettRevert;
    Barrett.prototype.revert = function (x) {
      return x;
    };
    // Barrett.prototype.reduce = barrettReduce;
    // x = x mod m (HAC 14.42)
    Barrett.prototype.reduce = function (x) {
      x.drShiftTo(this.m.t - 1, this.r2);
      if (x.t > this.m.t + 1) {
        x.t = this.m.t + 1;
        x.clamp();
      }
      this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
      this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
      while (x.compareTo(this.r2) < 0) {
        x.dAddOffset(1, this.m.t + 1);
      }
      x.subTo(this.r2, x);
      while (x.compareTo(this.m) >= 0) {
        x.subTo(this.m, x);
      }
    };
    // Barrett.prototype.mulTo = barrettMulTo;
    // r = x*y mod m; x,y != r
    Barrett.prototype.mulTo = function (x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    };
    // Barrett.prototype.sqrTo = barrettSqrTo;
    // r = x^2 mod m; x != r
    Barrett.prototype.sqrTo = function (x, r) {
      x.squareTo(r);
      this.reduce(r);
    };
    return Barrett;
  }();
  //#endregion
  //#endregion REDUCERS
  // return new, unset BigInteger
  function nbi() {return new BigInteger(null);}
  function parseBigInt(str, r) {
    return new BigInteger(str, r);
  }
  // am: Compute w_j += (x*this_i), propagate carries,
  // c is initial carry, returns final carry.
  // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
  // We need to select the fastest one that works in this environment.
  // am1: use a single mult and divide to get the high bits,
  // max digit bits should be 26 because
  // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
  function am1(i, x, w, j, c, n) {
    while (--n >= 0) {
      var v = x * this[i++] + w[j] + c;
      c = Math.floor(v / 0x4000000);
      w[j++] = v & 0x3ffffff;
    }
    return c;
  }
  // am2 avoids a big mult-and-extract completely.
  // Max digit bits should be <= 30 because we do bitwise ops
  // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
  function am2(i, x, w, j, c, n) {
    var xl = x & 0x7fff;
    var xh = x >> 15;
    while (--n >= 0) {
      var l = this[i] & 0x7fff;
      var h = this[i++] >> 15;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
      c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
      w[j++] = l & 0x3fffffff;
    }
    return c;
  }
  // Alternately, set max digit bits to 28 since some
  // browsers slow down when dealing with 32-bit numbers.
  function am3(i, x, w, j, c, n) {
    var xl = x & 0x3fff;
    var xh = x >> 14;
    while (--n >= 0) {
      var l = this[i] & 0x3fff;
      var h = this[i++] >> 14;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
      c = (l >> 28) + (m >> 14) + xh * h;
      w[j++] = l & 0xfffffff;
    }
    return c;
  }
  if (j_lm && navigator.appName == "Microsoft Internet Explorer") {
    BigInteger.prototype.am = am2;
    dbits = 30;
  } else
  if (j_lm && navigator.appName != "Netscape") {
    BigInteger.prototype.am = am1;
    dbits = 26;
  } else
  {// Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
  }
  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = (1 << dbits) - 1;
  BigInteger.prototype.DV = 1 << dbits;
  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2, BI_FP);
  BigInteger.prototype.F1 = BI_FP - dbits;
  BigInteger.prototype.F2 = 2 * dbits - BI_FP;
  // Digit conversions
  var BI_RC = [];
  var rr;
  var vv;
  rr = "0".charCodeAt(0);
  for (vv = 0; vv <= 9; ++vv) {
    BI_RC[rr++] = vv;
  }
  rr = "a".charCodeAt(0);
  for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
  }
  rr = "A".charCodeAt(0);
  for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
  }
  function intAt(s, i) {
    var c = BI_RC[s.charCodeAt(i)];
    return c == null ? -1 : c;
  }
  // return bigint initialized to value
  function nbv(i) {
    var r = nbi();
    r.fromInt(i);
    return r;
  }
  // returns bit length of the integer x
  function nbits(x) {
    var r = 1;
    var t;
    if ((t = x >>> 16) != 0) {
      x = t;
      r += 16;
    }
    if ((t = x >> 8) != 0) {
      x = t;
      r += 8;
    }
    if ((t = x >> 4) != 0) {
      x = t;
      r += 4;
    }
    if ((t = x >> 2) != 0) {
      x = t;
      r += 2;
    }
    if ((t = x >> 1) != 0) {
      x = t;
      r += 1;
    }
    return r;
  }
  // "constants"
  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1);

  // prng4.js - uses Arcfour as a PRNG
  var Arcfour = /** @class */function () {
    function Arcfour() {
      this.i = 0;
      this.j = 0;
      this.S = [];
    }
    // Arcfour.prototype.init = ARC4init;
    // Initialize arcfour context from key, an array of ints, each from [0..255]
    Arcfour.prototype.init = function (key) {
      var i;
      var j;
      var t;
      for (i = 0; i < 256; ++i) {
        this.S[i] = i;
      }
      j = 0;
      for (i = 0; i < 256; ++i) {
        j = j + this.S[i] + key[i % key.length] & 255;
        t = this.S[i];
        this.S[i] = this.S[j];
        this.S[j] = t;
      }
      this.i = 0;
      this.j = 0;
    };
    // Arcfour.prototype.next = ARC4next;
    Arcfour.prototype.next = function () {
      var t;
      this.i = this.i + 1 & 255;
      this.j = this.j + this.S[this.i] & 255;
      t = this.S[this.i];
      this.S[this.i] = this.S[this.j];
      this.S[this.j] = t;
      return this.S[t + this.S[this.i] & 255];
    };
    return Arcfour;
  }();
  // Plug in your RNG constructor here
  function prng_newstate() {
    return new Arcfour();
  }
  // Pool size must be a multiple of 4 and greater than 32.
  // An array of bytes the size of the pool will be passed to init()
  var rng_psize = 256;

  // Random number generator - requires a PRNG backend, e.g. prng4.js
  var rng_state;
  var rng_pool = null;
  var rng_pptr;
  // Initialize the pool with junk if needed.
  if (rng_pool == null) {
    rng_pool = [];
    rng_pptr = 0;
    var t = void 0;
    if (window.crypto && window.crypto.getRandomValues) {
      // Extract entropy (2048 bits) from RNG if available
      var z = new Uint32Array(256);
      window.crypto.getRandomValues(z);
      for (t = 0; t < z.length; ++t) {
        rng_pool[rng_pptr++] = z[t] & 255;
      }
    }
    // Use mouse events for entropy, if we do not have enough entropy by the time
    // we need it, entropy will be generated by Math.random.
    var onMouseMoveListener_1 = function onMouseMoveListener_1(ev) {
      this.count = this.count || 0;
      if (this.count >= 256 || rng_pptr >= rng_psize) {
        if (window.removeEventListener) {
          window.removeEventListener("mousemove", onMouseMoveListener_1, false);
        } else
        if (window.detachEvent) {
          window.detachEvent("onmousemove", onMouseMoveListener_1);
        }
        return;
      }
      try {
        var mouseCoordinates = ev.x + ev.y;
        rng_pool[rng_pptr++] = mouseCoordinates & 255;
        this.count += 1;
      }
      catch (e) {
        // Sometimes Firefox will deny permission to access event properties for some reason. Ignore.
      }
    };
    if (window.addEventListener) {
      window.addEventListener("mousemove", onMouseMoveListener_1, false);
    } else
    if (window.attachEvent) {
      window.attachEvent("onmousemove", onMouseMoveListener_1);
    }
  }
  function rng_get_byte() {
    if (rng_state == null) {
      rng_state = prng_newstate();
      // At this point, we may not have collected enough entropy.  If not, fall back to Math.random
      while (rng_pptr < rng_psize) {
        var random = Math.floor(65536 * Math.random());
        rng_pool[rng_pptr++] = random & 255;
      }
      rng_state.init(rng_pool);
      for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
        rng_pool[rng_pptr] = 0;
      }
      rng_pptr = 0;
    }
    // TODO: allow reseeding after first request
    return rng_state.next();
  }
  var SecureRandom = /** @class */function () {
    function SecureRandom() {
    }
    SecureRandom.prototype.nextBytes = function (ba) {
      for (var i = 0; i < ba.length; ++i) {
        ba[i] = rng_get_byte();
      }
    };
    return SecureRandom;
  }();

  // Depends on jsbn.js and rng.js
  // function linebrk(s,n) {
  //   var ret = "";
  //   var i = 0;
  //   while(i + n < s.length) {
  //     ret += s.substring(i,i+n) + "\n";
  //     i += n;
  //   }
  //   return ret + s.substring(i,s.length);
  // }
  // function byte2Hex(b) {
  //   if(b < 0x10)
  //     return "0" + b.toString(16);
  //   else
  //     return b.toString(16);
  // }
  function pkcs1pad1(s, n) {
    if (n < s.length + 22) {
      console.error("Message too long for RSA");
      return null;
    }
    var len = n - s.length - 6;
    var filler = "";
    for (var f = 0; f < len; f += 2) {
      filler += "ff";
    }
    var m = "0001" + filler + "00" + s;
    return parseBigInt(m, 16);
  }
  // PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
  function pkcs1pad2(s, n) {
    if (n < s.length + 11) {// TODO: fix for utf-8
      console.error("Message too long for RSA");
      return null;
    }
    var ba = [];
    var i = s.length - 1;
    while (i >= 0 && n > 0) {
      var c = s.charCodeAt(i--);
      if (c < 128) {// encode using utf-8
        ba[--n] = c;
      } else
      if (c > 127 && c < 2048) {
        ba[--n] = c & 63 | 128;
        ba[--n] = c >> 6 | 192;
      } else
      {
        ba[--n] = c & 63 | 128;
        ba[--n] = c >> 6 & 63 | 128;
        ba[--n] = c >> 12 | 224;
      }
    }
    ba[--n] = 0;
    var rng = new SecureRandom();
    var x = [];
    while (n > 2) {// random non-zero pad
      x[0] = 0;
      while (x[0] == 0) {
        rng.nextBytes(x);
      }
      ba[--n] = x[0];
    }
    ba[--n] = 2;
    ba[--n] = 0;
    return new BigInteger(ba);
  }
  // "empty" RSA key constructor
  var RSAKey = /** @class */function () {
    function RSAKey() {
      this.n = null;
      this.e = 0;
      this.d = null;
      this.p = null;
      this.q = null;
      this.dmp1 = null;
      this.dmq1 = null;
      this.coeff = null;
    }
    //#region PROTECTED
    // protected
    // RSAKey.prototype.doPublic = RSADoPublic;
    // Perform raw public operation on "x": return x^e (mod n)
    RSAKey.prototype.doPublic = function (x) {
      return x.modPowInt(this.e, this.n);
    };
    // RSAKey.prototype.doPrivate = RSADoPrivate;
    // Perform raw private operation on "x": return x^d (mod n)
    RSAKey.prototype.doPrivate = function (x) {
      if (this.p == null || this.q == null) {
        return x.modPow(this.d, this.n);
      }
      // TODO: re-calculate any missing CRT params
      var xp = x.mod(this.p).modPow(this.dmp1, this.p);
      var xq = x.mod(this.q).modPow(this.dmq1, this.q);
      while (xp.compareTo(xq) < 0) {
        xp = xp.add(this.p);
      }
      return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
    };
    //#endregion PROTECTED
    //#region PUBLIC
    // RSAKey.prototype.setPublic = RSASetPublic;
    // Set the public key fields N and e from hex strings
    RSAKey.prototype.setPublic = function (N, E) {
      if (N != null && E != null && N.length > 0 && E.length > 0) {
        this.n = parseBigInt(N, 16);
        this.e = parseInt(E, 16);
      } else
      {
        console.error("Invalid RSA public key");
      }
    };
    // RSAKey.prototype.encrypt = RSAEncrypt;
    // Return the PKCS#1 RSA encryption of "text" as an even-length hex string
    RSAKey.prototype.encrypt = function (text) {
      var m = pkcs1pad2(text, this.n.bitLength() + 7 >> 3);
      if (m == null) {
        return null;
      }
      var c = this.doPublic(m);
      if (c == null) {
        return null;
      }
      var h = c.toString(16);
      if ((h.length & 1) == 0) {
        return h;
      } else
      {
        return "0" + h;
      }
    };
    // RSAKey.prototype.setPrivate = RSASetPrivate;
    // Set the private key fields N, e, and d from hex strings
    RSAKey.prototype.setPrivate = function (N, E, D) {
      if (N != null && E != null && N.length > 0 && E.length > 0) {
        this.n = parseBigInt(N, 16);
        this.e = parseInt(E, 16);
        this.d = parseBigInt(D, 16);
      } else
      {
        console.error("Invalid RSA private key");
      }
    };
    // RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
    // Set the private key fields N, e, d and CRT params from hex strings
    RSAKey.prototype.setPrivateEx = function (N, E, D, P, Q, DP, DQ, C) {
      if (N != null && E != null && N.length > 0 && E.length > 0) {
        this.n = parseBigInt(N, 16);
        this.e = parseInt(E, 16);
        this.d = parseBigInt(D, 16);
        this.p = parseBigInt(P, 16);
        this.q = parseBigInt(Q, 16);
        this.dmp1 = parseBigInt(DP, 16);
        this.dmq1 = parseBigInt(DQ, 16);
        this.coeff = parseBigInt(C, 16);
      } else
      {
        console.error("Invalid RSA private key");
      }
    };
    // RSAKey.prototype.generate = RSAGenerate;
    // Generate a new random private key B bits long, using public expt E
    RSAKey.prototype.generate = function (B, E) {
      var rng = new SecureRandom();
      var qs = B >> 1;
      this.e = parseInt(E, 16);
      var ee = new BigInteger(E, 16);
      for (;;) {
        for (;;) {
          this.p = new BigInteger(B - qs, 1, rng);
          if (this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
            break;
          }
        }
        for (;;) {
          this.q = new BigInteger(qs, 1, rng);
          if (this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
            break;
          }
        }
        if (this.p.compareTo(this.q) <= 0) {
          var t = this.p;
          this.p = this.q;
          this.q = t;
        }
        var p1 = this.p.subtract(BigInteger.ONE);
        var q1 = this.q.subtract(BigInteger.ONE);
        var phi = p1.multiply(q1);
        if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
          this.n = this.p.multiply(this.q);
          this.d = ee.modInverse(phi);
          this.dmp1 = this.d.mod(p1);
          this.dmq1 = this.d.mod(q1);
          this.coeff = this.q.modInverse(this.p);
          break;
        }
      }
    };
    // RSAKey.prototype.decrypt = RSADecrypt;
    // Return the PKCS#1 RSA decryption of "ctext".
    // "ctext" is an even-length hex string and the output is a plain string.
    RSAKey.prototype.decrypt = function (ctext) {
      var c = parseBigInt(ctext, 16);
      var m = this.doPrivate(c);
      if (m == null) {
        return null;
      }
      return pkcs1unpad2(m, this.n.bitLength() + 7 >> 3);
    };
    // Generate a new random private key B bits long, using public expt E
    RSAKey.prototype.generateAsync = function (B, E, callback) {
      var rng = new SecureRandom();
      var qs = B >> 1;
      this.e = parseInt(E, 16);
      var ee = new BigInteger(E, 16);
      var rsa = this;
      // These functions have non-descript names because they were originally for(;;) loops.
      // I don't know about cryptography to give them better names than loop1-4.
      var loop1 = function loop1() {
        var loop4 = function loop4() {
          if (rsa.p.compareTo(rsa.q) <= 0) {
            var t = rsa.p;
            rsa.p = rsa.q;
            rsa.q = t;
          }
          var p1 = rsa.p.subtract(BigInteger.ONE);
          var q1 = rsa.q.subtract(BigInteger.ONE);
          var phi = p1.multiply(q1);
          if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
            rsa.n = rsa.p.multiply(rsa.q);
            rsa.d = ee.modInverse(phi);
            rsa.dmp1 = rsa.d.mod(p1);
            rsa.dmq1 = rsa.d.mod(q1);
            rsa.coeff = rsa.q.modInverse(rsa.p);
            setTimeout(function () {callback();}, 0); // escape
          } else
          {
            setTimeout(loop1, 0);
          }
        };
        var loop3 = function loop3() {
          rsa.q = nbi();
          rsa.q.fromNumberAsync(qs, 1, rng, function () {
            rsa.q.subtract(BigInteger.ONE).gcda(ee, function (r) {
              if (r.compareTo(BigInteger.ONE) == 0 && rsa.q.isProbablePrime(10)) {
                setTimeout(loop4, 0);
              } else
              {
                setTimeout(loop3, 0);
              }
            });
          });
        };
        var loop2 = function loop2() {
          rsa.p = nbi();
          rsa.p.fromNumberAsync(B - qs, 1, rng, function () {
            rsa.p.subtract(BigInteger.ONE).gcda(ee, function (r) {
              if (r.compareTo(BigInteger.ONE) == 0 && rsa.p.isProbablePrime(10)) {
                setTimeout(loop3, 0);
              } else
              {
                setTimeout(loop2, 0);
              }
            });
          });
        };
        setTimeout(loop2, 0);
      };
      setTimeout(loop1, 0);
    };
    RSAKey.prototype.sign = function (text, digestMethod, digestName) {
      var header = getDigestHeader(digestName);
      var digest = header + digestMethod(text).toString();
      var m = pkcs1pad1(digest, this.n.bitLength() / 4);
      if (m == null) {
        return null;
      }
      var c = this.doPrivate(m);
      if (c == null) {
        return null;
      }
      var h = c.toString(16);
      if ((h.length & 1) == 0) {
        return h;
      } else
      {
        return "0" + h;
      }
    };
    RSAKey.prototype.verify = function (text, signature, digestMethod) {
      var c = parseBigInt(signature, 16);
      var m = this.doPublic(c);
      if (m == null) {
        return null;
      }
      var unpadded = m.toString(16).replace(/^1f+00/, "");
      var digest = removeDigestHeader(unpadded);
      return digest == digestMethod(text).toString();
    };
    return RSAKey;
  }();
  // Undo PKCS#1 (type 2, random) padding and, if valid, return the plaintext
  function pkcs1unpad2(d, n) {
    var b = d.toByteArray();
    var i = 0;
    while (i < b.length && b[i] == 0) {
      ++i;
    }
    if (b.length - i != n - 1 || b[i] != 2) {
      return null;
    }
    ++i;
    while (b[i] != 0) {
      if (++i >= b.length) {
        return null;
      }
    }
    var ret = "";
    while (++i < b.length) {
      var c = b[i] & 255;
      if (c < 128) {// utf-8 decode
        ret += String.fromCharCode(c);
      } else
      if (c > 191 && c < 224) {
        ret += String.fromCharCode((c & 31) << 6 | b[i + 1] & 63);
        ++i;
      } else
      {
        ret += String.fromCharCode((c & 15) << 12 | (b[i + 1] & 63) << 6 | b[i + 2] & 63);
        i += 2;
      }
    }
    return ret;
  }
  // https://tools.ietf.org/html/rfc3447#page-43
  var DIGEST_HEADERS = {
    md2: "3020300c06082a864886f70d020205000410",
    md5: "3020300c06082a864886f70d020505000410",
    sha1: "3021300906052b0e03021a05000414",
    sha224: "302d300d06096086480165030402040500041c",
    sha256: "3031300d060960864801650304020105000420",
    sha384: "3041300d060960864801650304020205000430",
    sha512: "3051300d060960864801650304020305000440",
    ripemd160: "3021300906052b2403020105000414" };

  function getDigestHeader(name) {
    return DIGEST_HEADERS[name] || "";
  }
  function removeDigestHeader(str) {
    for (var name_1 in DIGEST_HEADERS) {
      if (DIGEST_HEADERS.hasOwnProperty(name_1)) {
        var header = DIGEST_HEADERS[name_1];
        var len = header.length;
        if (str.substr(0, len) == header) {
          return str.substr(len);
        }
      }
    }
    return str;
  }
  // Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
  // function RSAEncryptB64(text) {
  //  var h = this.encrypt(text);
  //  if(h) return hex2b64(h); else return null;
  // }
  // public
  // RSAKey.prototype.encrypt_b64 = RSAEncryptB64;

  /*!
  Copyright (c) 2011, Yahoo! Inc. All rights reserved.
  Code licensed under the BSD License:
  http://developer.yahoo.com/yui/license.html
  version: 2.9.0
  */
  var YAHOO = {};
  YAHOO.lang = {
    /**
                  * Utility to set up the prototype, constructor and superclass properties to
                  * support an inheritance strategy that can chain constructors and methods.
                  * Static members will not be inherited.
                  *
                  * @method extend
                  * @static
                  * @param {Function} subc   the object to modify
                  * @param {Function} superc the object to inherit
                  * @param {Object} overrides  additional properties/methods to add to the
                  *                              subclass prototype.  These will override the
                  *                              matching items obtained from the superclass
                  *                              if present.
                  */
    extend: function extend(subc, superc, overrides) {
      if (!superc || !subc) {
        throw new Error("YAHOO.lang.extend failed, please check that " +
        "all dependencies are included.");
      }

      var F = function F() {};
      F.prototype = superc.prototype;
      subc.prototype = new F();
      subc.prototype.constructor = subc;
      subc.superclass = superc.prototype;

      if (superc.prototype.constructor == Object.prototype.constructor) {
        superc.prototype.constructor = superc;
      }

      if (overrides) {
        var i;
        for (i in overrides) {
          subc.prototype[i] = overrides[i];
        }

        /*
           * IE will not enumerate native functions in a derived object even if the
           * function was overridden.  This is a workaround for specific functions
           * we care about on the Object prototype.
           * @property _IEEnumFix
           * @param {Function} r  the object to receive the augmentation
           * @param {Function} s  the object that supplies the properties to augment
           * @static
           * @private
           */
        var _IEEnumFix = function _IEEnumFix() {},
        ADD = ["toString", "valueOf"];
        try {
          if (/MSIE/.test(navigator.userAgent)) {
            _IEEnumFix = function _IEEnumFix(r, s) {
              for (i = 0; i < ADD.length; i = i + 1) {
                var fname = ADD[i],f = s[fname];
                if (typeof f === 'function' && f != Object.prototype[fname]) {
                  r[fname] = f;
                }
              }
            };
          }
        } catch (ex) {}_IEEnumFix(subc.prototype, overrides);
      }
    } };


  /* asn1-1.0.13.js (c) 2013-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
          */

  /**
              * @fileOverview
              * @name asn1-1.0.js
              * @author Kenji Urushima kenji.urushima@gmail.com
              * @version asn1 1.0.13 (2017-Jun-02)
              * @since jsrsasign 2.1
              * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
              */

  /**
                  * kjur's class library name space
                  * <p>
                  * This name space provides following name spaces:
                  * <ul>
                  * <li>{@link KJUR.asn1} - ASN.1 primitive hexadecimal encoder</li>
                  * <li>{@link KJUR.asn1.x509} - ASN.1 structure for X.509 certificate and CRL</li>
                  * <li>{@link KJUR.crypto} - Java Cryptographic Extension(JCE) style MessageDigest/Signature
                  * class and utilities</li>
                  * </ul>
                  * </p>
                  * NOTE: Please ignore method summary and document of this namespace. This caused by a bug of jsdoc2.
                  * @name KJUR
                  * @namespace kjur's class library name space
                  */
  var KJUR = {};

  /**
                  * kjur's ASN.1 class library name space
                  * <p>
                  * This is ITU-T X.690 ASN.1 DER encoder class library and
                  * class structure and methods is very similar to
                  * org.bouncycastle.asn1 package of
                  * well known BouncyCaslte Cryptography Library.
                  * <h4>PROVIDING ASN.1 PRIMITIVES</h4>
                  * Here are ASN.1 DER primitive classes.
                  * <ul>
                  * <li>0x01 {@link KJUR.asn1.DERBoolean}</li>
                  * <li>0x02 {@link KJUR.asn1.DERInteger}</li>
                  * <li>0x03 {@link KJUR.asn1.DERBitString}</li>
                  * <li>0x04 {@link KJUR.asn1.DEROctetString}</li>
                  * <li>0x05 {@link KJUR.asn1.DERNull}</li>
                  * <li>0x06 {@link KJUR.asn1.DERObjectIdentifier}</li>
                  * <li>0x0a {@link KJUR.asn1.DEREnumerated}</li>
                  * <li>0x0c {@link KJUR.asn1.DERUTF8String}</li>
                  * <li>0x12 {@link KJUR.asn1.DERNumericString}</li>
                  * <li>0x13 {@link KJUR.asn1.DERPrintableString}</li>
                  * <li>0x14 {@link KJUR.asn1.DERTeletexString}</li>
                  * <li>0x16 {@link KJUR.asn1.DERIA5String}</li>
                  * <li>0x17 {@link KJUR.asn1.DERUTCTime}</li>
                  * <li>0x18 {@link KJUR.asn1.DERGeneralizedTime}</li>
                  * <li>0x30 {@link KJUR.asn1.DERSequence}</li>
                  * <li>0x31 {@link KJUR.asn1.DERSet}</li>
                  * </ul>
                  * <h4>OTHER ASN.1 CLASSES</h4>
                  * <ul>
                  * <li>{@link KJUR.asn1.ASN1Object}</li>
                  * <li>{@link KJUR.asn1.DERAbstractString}</li>
                  * <li>{@link KJUR.asn1.DERAbstractTime}</li>
                  * <li>{@link KJUR.asn1.DERAbstractStructured}</li>
                  * <li>{@link KJUR.asn1.DERTaggedObject}</li>
                  * </ul>
                  * <h4>SUB NAME SPACES</h4>
                  * <ul>
                  * <li>{@link KJUR.asn1.cades} - CAdES long term signature format</li>
                  * <li>{@link KJUR.asn1.cms} - Cryptographic Message Syntax</li>
                  * <li>{@link KJUR.asn1.csr} - Certificate Signing Request (CSR/PKCS#10)</li>
                  * <li>{@link KJUR.asn1.tsp} - RFC 3161 Timestamping Protocol Format</li>
                  * <li>{@link KJUR.asn1.x509} - RFC 5280 X.509 certificate and CRL</li>
                  * </ul>
                  * </p>
                  * NOTE: Please ignore method summary and document of this namespace.
                  * This caused by a bug of jsdoc2.
                  * @name KJUR.asn1
                  * @namespace
                  */
  if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) KJUR.asn1 = {};

  /**
                                                                      * ASN1 utilities class
                                                                      * @name KJUR.asn1.ASN1Util
                                                                      * @class ASN1 utilities class
                                                                      * @since asn1 1.0.2
                                                                      */
  KJUR.asn1.ASN1Util = new function () {
    this.integerToByteHex = function (i) {
      var h = i.toString(16);
      if (h.length % 2 == 1) h = '0' + h;
      return h;
    };
    this.bigIntToMinTwosComplementsHex = function (bigIntegerValue) {
      var h = bigIntegerValue.toString(16);
      if (h.substr(0, 1) != '-') {
        if (h.length % 2 == 1) {
          h = '0' + h;
        } else {
          if (!h.match(/^[0-7]/)) {
            h = '00' + h;
          }
        }
      } else {
        var hPos = h.substr(1);
        var xorLen = hPos.length;
        if (xorLen % 2 == 1) {
          xorLen += 1;
        } else {
          if (!h.match(/^[0-7]/)) {
            xorLen += 2;
          }
        }
        var hMask = '';
        for (var i = 0; i < xorLen; i++) {
          hMask += 'f';
        }
        var biMask = new BigInteger(hMask, 16);
        var biNeg = biMask.xor(bigIntegerValue).add(BigInteger.ONE);
        h = biNeg.toString(16).replace(/^-/, '');
      }
      return h;
    };
    /**
        * get PEM string from hexadecimal data and header string
        * @name getPEMStringFromHex
        * @memberOf KJUR.asn1.ASN1Util
        * @function
        * @param {String} dataHex hexadecimal string of PEM body
        * @param {String} pemHeader PEM header string (ex. 'RSA PRIVATE KEY')
        * @return {String} PEM formatted string of input data
        * @description
        * This method converts a hexadecimal string to a PEM string with
        * a specified header. Its line break will be CRLF("\r\n").
        * @example
        * var pem  = KJUR.asn1.ASN1Util.getPEMStringFromHex('616161', 'RSA PRIVATE KEY');
        * // value of pem will be:
        * -----BEGIN PRIVATE KEY-----
        * YWFh
        * -----END PRIVATE KEY-----
        */
    this.getPEMStringFromHex = function (dataHex, pemHeader) {
      return hextopem(dataHex, pemHeader);
    };

    /**
        * generate ASN1Object specifed by JSON parameters
        * @name newObject
        * @memberOf KJUR.asn1.ASN1Util
        * @function
        * @param {Array} param JSON parameter to generate ASN1Object
        * @return {KJUR.asn1.ASN1Object} generated object
        * @since asn1 1.0.3
        * @description
        * generate any ASN1Object specified by JSON param
        * including ASN.1 primitive or structured.
        * Generally 'param' can be described as follows:
        * <blockquote>
        * {TYPE-OF-ASNOBJ: ASN1OBJ-PARAMETER}
        * </blockquote>
        * 'TYPE-OF-ASN1OBJ' can be one of following symbols:
        * <ul>
        * <li>'bool' - DERBoolean</li>
        * <li>'int' - DERInteger</li>
        * <li>'bitstr' - DERBitString</li>
        * <li>'octstr' - DEROctetString</li>
        * <li>'null' - DERNull</li>
        * <li>'oid' - DERObjectIdentifier</li>
        * <li>'enum' - DEREnumerated</li>
        * <li>'utf8str' - DERUTF8String</li>
        * <li>'numstr' - DERNumericString</li>
        * <li>'prnstr' - DERPrintableString</li>
        * <li>'telstr' - DERTeletexString</li>
        * <li>'ia5str' - DERIA5String</li>
        * <li>'utctime' - DERUTCTime</li>
        * <li>'gentime' - DERGeneralizedTime</li>
        * <li>'seq' - DERSequence</li>
        * <li>'set' - DERSet</li>
        * <li>'tag' - DERTaggedObject</li>
        * </ul>
        * @example
        * newObject({'prnstr': 'aaa'});
        * newObject({'seq': [{'int': 3}, {'prnstr': 'aaa'}]})
        * // ASN.1 Tagged Object
        * newObject({'tag': {'tag': 'a1',
        *                    'explicit': true,
        *                    'obj': {'seq': [{'int': 3}, {'prnstr': 'aaa'}]}}});
        * // more simple representation of ASN.1 Tagged Object
        * newObject({'tag': ['a1',
        *                    true,
        *                    {'seq': [
        *                      {'int': 3},
        *                      {'prnstr': 'aaa'}]}
        *                   ]});
        */
    this.newObject = function (param) {
      var _KJUR = KJUR,
      _KJUR_asn1 = _KJUR.asn1,
      _DERBoolean = _KJUR_asn1.DERBoolean,
      _DERInteger = _KJUR_asn1.DERInteger,
      _DERBitString = _KJUR_asn1.DERBitString,
      _DEROctetString = _KJUR_asn1.DEROctetString,
      _DERNull = _KJUR_asn1.DERNull,
      _DERObjectIdentifier = _KJUR_asn1.DERObjectIdentifier,
      _DEREnumerated = _KJUR_asn1.DEREnumerated,
      _DERUTF8String = _KJUR_asn1.DERUTF8String,
      _DERNumericString = _KJUR_asn1.DERNumericString,
      _DERPrintableString = _KJUR_asn1.DERPrintableString,
      _DERTeletexString = _KJUR_asn1.DERTeletexString,
      _DERIA5String = _KJUR_asn1.DERIA5String,
      _DERUTCTime = _KJUR_asn1.DERUTCTime,
      _DERGeneralizedTime = _KJUR_asn1.DERGeneralizedTime,
      _DERSequence = _KJUR_asn1.DERSequence,
      _DERSet = _KJUR_asn1.DERSet,
      _DERTaggedObject = _KJUR_asn1.DERTaggedObject,
      _newObject = _KJUR_asn1.ASN1Util.newObject;

      var keys = Object.keys(param);
      if (keys.length != 1)
      throw "key of param shall be only one.";
      var key = keys[0];

      if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + key + ":") == -1)
      throw "undefined key: " + key;

      if (key == "bool") return new _DERBoolean(param[key]);
      if (key == "int") return new _DERInteger(param[key]);
      if (key == "bitstr") return new _DERBitString(param[key]);
      if (key == "octstr") return new _DEROctetString(param[key]);
      if (key == "null") return new _DERNull(param[key]);
      if (key == "oid") return new _DERObjectIdentifier(param[key]);
      if (key == "enum") return new _DEREnumerated(param[key]);
      if (key == "utf8str") return new _DERUTF8String(param[key]);
      if (key == "numstr") return new _DERNumericString(param[key]);
      if (key == "prnstr") return new _DERPrintableString(param[key]);
      if (key == "telstr") return new _DERTeletexString(param[key]);
      if (key == "ia5str") return new _DERIA5String(param[key]);
      if (key == "utctime") return new _DERUTCTime(param[key]);
      if (key == "gentime") return new _DERGeneralizedTime(param[key]);

      if (key == "seq") {
        var paramList = param[key];
        var a = [];
        for (var i = 0; i < paramList.length; i++) {
          var asn1Obj = _newObject(paramList[i]);
          a.push(asn1Obj);
        }
        return new _DERSequence({ 'array': a });
      }

      if (key == "set") {
        var paramList = param[key];
        var a = [];
        for (var i = 0; i < paramList.length; i++) {
          var asn1Obj = _newObject(paramList[i]);
          a.push(asn1Obj);
        }
        return new _DERSet({ 'array': a });
      }

      if (key == "tag") {
        var tagParam = param[key];
        if (Object.prototype.toString.call(tagParam) === '[object Array]' &&
        tagParam.length == 3) {
          var obj = _newObject(tagParam[2]);
          return new _DERTaggedObject({ tag: tagParam[0],
            explicit: tagParam[1],
            obj: obj });
        } else {
          var newParam = {};
          if (tagParam.explicit !== undefined)
          newParam.explicit = tagParam.explicit;
          if (tagParam.tag !== undefined)
          newParam.tag = tagParam.tag;
          if (tagParam.obj === undefined)
          throw "obj shall be specified for 'tag'.";
          newParam.obj = _newObject(tagParam.obj);
          return new _DERTaggedObject(newParam);
        }
      }
    };

    /**
        * get encoded hexadecimal string of ASN1Object specifed by JSON parameters
        * @name jsonToASN1HEX
        * @memberOf KJUR.asn1.ASN1Util
        * @function
        * @param {Array} param JSON parameter to generate ASN1Object
        * @return hexadecimal string of ASN1Object
        * @since asn1 1.0.4
        * @description
        * As for ASN.1 object representation of JSON object,
        * please see {@link newObject}.
        * @example
        * jsonToASN1HEX({'prnstr': 'aaa'});
        */
    this.jsonToASN1HEX = function (param) {
      var asn1Obj = this.newObject(param);
      return asn1Obj.getEncodedHex();
    };
  }();

  /**
        * get dot noted oid number string from hexadecimal value of OID
        * @name oidHexToInt
        * @memberOf KJUR.asn1.ASN1Util
        * @function
        * @param {String} hex hexadecimal value of object identifier
        * @return {String} dot noted string of object identifier
        * @since jsrsasign 4.8.3 asn1 1.0.7
        * @description
        * This static method converts from hexadecimal string representation of
        * ASN.1 value of object identifier to oid number string.
        * @example
        * KJUR.asn1.ASN1Util.oidHexToInt('550406') &rarr; "2.5.4.6"
        */
  KJUR.asn1.ASN1Util.oidHexToInt = function (hex) {
    var s = "";
    var i01 = parseInt(hex.substr(0, 2), 16);
    var i0 = Math.floor(i01 / 40);
    var i1 = i01 % 40;
    var s = i0 + "." + i1;

    var binbuf = "";
    for (var i = 2; i < hex.length; i += 2) {
      var value = parseInt(hex.substr(i, 2), 16);
      var bin = ("00000000" + value.toString(2)).slice(-8);
      binbuf = binbuf + bin.substr(1, 7);
      if (bin.substr(0, 1) == "0") {
        var bi = new BigInteger(binbuf, 2);
        s = s + "." + bi.toString(10);
        binbuf = "";
      }
    }
    return s;
  };

  /**
      * get hexadecimal value of object identifier from dot noted oid value
      * @name oidIntToHex
      * @memberOf KJUR.asn1.ASN1Util
      * @function
      * @param {String} oidString dot noted string of object identifier
      * @return {String} hexadecimal value of object identifier
      * @since jsrsasign 4.8.3 asn1 1.0.7
      * @description
      * This static method converts from object identifier value string.
      * to hexadecimal string representation of it.
      * @example
      * KJUR.asn1.ASN1Util.oidIntToHex("2.5.4.6") &rarr; "550406"
      */
  KJUR.asn1.ASN1Util.oidIntToHex = function (oidString) {
    var itox = function itox(i) {
      var h = i.toString(16);
      if (h.length == 1) h = '0' + h;
      return h;
    };

    var roidtox = function roidtox(roid) {
      var h = '';
      var bi = new BigInteger(roid, 10);
      var b = bi.toString(2);
      var padLen = 7 - b.length % 7;
      if (padLen == 7) padLen = 0;
      var bPad = '';
      for (var i = 0; i < padLen; i++) {bPad += '0';}
      b = bPad + b;
      for (var i = 0; i < b.length - 1; i += 7) {
        var b8 = b.substr(i, 7);
        if (i != b.length - 7) b8 = '1' + b8;
        h += itox(parseInt(b8, 2));
      }
      return h;
    };

    if (!oidString.match(/^[0-9.]+$/)) {
      throw "malformed oid string: " + oidString;
    }
    var h = '';
    var a = oidString.split('.');
    var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
    h += itox(i0);
    a.splice(0, 2);
    for (var i = 0; i < a.length; i++) {
      h += roidtox(a[i]);
    }
    return h;
  };


  // ********************************************************************
  //  Abstract ASN.1 Classes
  // ********************************************************************

  // ********************************************************************

  /**
   * base class for ASN.1 DER encoder object
   * @name KJUR.asn1.ASN1Object
   * @class base class for ASN.1 DER encoder object
   * @property {Boolean} isModified flag whether internal data was changed
   * @property {String} hTLV hexadecimal string of ASN.1 TLV
   * @property {String} hT hexadecimal string of ASN.1 TLV tag(T)
   * @property {String} hL hexadecimal string of ASN.1 TLV length(L)
   * @property {String} hV hexadecimal string of ASN.1 TLV value(V)
   * @description
   */
  KJUR.asn1.ASN1Object = function () {
    var hV = '';

    /**
                  * get hexadecimal ASN.1 TLV length(L) bytes from TLV value(V)
                  * @name getLengthHexFromValue
                  * @memberOf KJUR.asn1.ASN1Object#
                  * @function
                  * @return {String} hexadecimal string of ASN.1 TLV length(L)
                  */
    this.getLengthHexFromValue = function () {
      if (typeof this.hV == "undefined" || this.hV == null) {
        throw "this.hV is null or undefined.";
      }
      if (this.hV.length % 2 == 1) {
        throw "value hex must be even length: n=" + hV.length + ",v=" + this.hV;
      }
      var n = this.hV.length / 2;
      var hN = n.toString(16);
      if (hN.length % 2 == 1) {
        hN = "0" + hN;
      }
      if (n < 128) {
        return hN;
      } else {
        var hNlen = hN.length / 2;
        if (hNlen > 15) {
          throw "ASN.1 length too long to represent by 8x: n = " + n.toString(16);
        }
        var head = 128 + hNlen;
        return head.toString(16) + hN;
      }
    };

    /**
        * get hexadecimal string of ASN.1 TLV bytes
        * @name getEncodedHex
        * @memberOf KJUR.asn1.ASN1Object#
        * @function
        * @return {String} hexadecimal string of ASN.1 TLV
        */
    this.getEncodedHex = function () {
      if (this.hTLV == null || this.isModified) {
        this.hV = this.getFreshValueHex();
        this.hL = this.getLengthHexFromValue();
        this.hTLV = this.hT + this.hL + this.hV;
        this.isModified = false;
        //alert("first time: " + this.hTLV);
      }
      return this.hTLV;
    };

    /**
        * get hexadecimal string of ASN.1 TLV value(V) bytes
        * @name getValueHex
        * @memberOf KJUR.asn1.ASN1Object#
        * @function
        * @return {String} hexadecimal string of ASN.1 TLV value(V) bytes
        */
    this.getValueHex = function () {
      this.getEncodedHex();
      return this.hV;
    };

    this.getFreshValueHex = function () {
      return '';
    };
  };

  // == BEGIN DERAbstractString ================================================
  /**
   * base class for ASN.1 DER string classes
   * @name KJUR.asn1.DERAbstractString
   * @class base class for ASN.1 DER string classes
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @property {String} s internal string of value
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>str - specify initial ASN.1 value(V) by a string</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */
  KJUR.asn1.DERAbstractString = function (params) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);

    /**
                                                                    * get string value of this string object
                                                                    * @name getString
                                                                    * @memberOf KJUR.asn1.DERAbstractString#
                                                                    * @function
                                                                    * @return {String} string value of this string object
                                                                    */
    this.getString = function () {
      return this.s;
    };

    /**
        * set value by a string
        * @name setString
        * @memberOf KJUR.asn1.DERAbstractString#
        * @function
        * @param {String} newS value by a string to set
        */
    this.setString = function (newS) {
      this.hTLV = null;
      this.isModified = true;
      this.s = newS;
      this.hV = stohex(this.s);
    };

    /**
        * set value by a hexadecimal string
        * @name setStringHex
        * @memberOf KJUR.asn1.DERAbstractString#
        * @function
        * @param {String} newHexString value by a hexadecimal string to set
        */
    this.setStringHex = function (newHexString) {
      this.hTLV = null;
      this.isModified = true;
      this.s = null;
      this.hV = newHexString;
    };

    this.getFreshValueHex = function () {
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params == "string") {
        this.setString(params);
      } else if (typeof params['str'] != "undefined") {
        this.setString(params['str']);
      } else if (typeof params['hex'] != "undefined") {
        this.setStringHex(params['hex']);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);
  // == END   DERAbstractString ================================================

  // == BEGIN DERAbstractTime ==================================================
  /**
   * base class for ASN.1 DER Generalized/UTCTime class
   * @name KJUR.asn1.DERAbstractTime
   * @class base class for ASN.1 DER Generalized/UTCTime class
   * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
   * @extends KJUR.asn1.ASN1Object
   * @description
   * @see KJUR.asn1.ASN1Object - superclass
   */
  KJUR.asn1.DERAbstractTime = function (params) {
    KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);

    // --- PRIVATE METHODS --------------------
    this.localDateToUTC = function (d) {
      utc = d.getTime() + d.getTimezoneOffset() * 60000;
      var utcDate = new Date(utc);
      return utcDate;
    };

    /*
        * format date string by Data object
        * @name formatDate
        * @memberOf KJUR.asn1.AbstractTime;
        * @param {Date} dateObject
        * @param {string} type 'utc' or 'gen'
        * @param {boolean} withMillis flag for with millisections or not
        * @description
        * 'withMillis' flag is supported from asn1 1.0.6.
        */
    this.formatDate = function (dateObject, type, withMillis) {
      var pad = this.zeroPadding;
      var d = this.localDateToUTC(dateObject);
      var year = String(d.getFullYear());
      if (type == 'utc') year = year.substr(2, 2);
      var month = pad(String(d.getMonth() + 1), 2);
      var day = pad(String(d.getDate()), 2);
      var hour = pad(String(d.getHours()), 2);
      var min = pad(String(d.getMinutes()), 2);
      var sec = pad(String(d.getSeconds()), 2);
      var s = year + month + day + hour + min + sec;
      if (withMillis === true) {
        var millis = d.getMilliseconds();
        if (millis != 0) {
          var sMillis = pad(String(millis), 3);
          sMillis = sMillis.replace(/[0]+$/, "");
          s = s + "." + sMillis;
        }
      }
      return s + "Z";
    };

    this.zeroPadding = function (s, len) {
      if (s.length >= len) return s;
      return new Array(len - s.length + 1).join('0') + s;
    };

    // --- PUBLIC METHODS --------------------
    /**
     * get string value of this string object
     * @name getString
     * @memberOf KJUR.asn1.DERAbstractTime#
     * @function
     * @return {String} string value of this time object
     */
    this.getString = function () {
      return this.s;
    };

    /**
        * set value by a string
        * @name setString
        * @memberOf KJUR.asn1.DERAbstractTime#
        * @function
        * @param {String} newS value by a string to set such like "130430235959Z"
        */
    this.setString = function (newS) {
      this.hTLV = null;
      this.isModified = true;
      this.s = newS;
      this.hV = stohex(newS);
    };

    /**
        * set value by a Date object
        * @name setByDateValue
        * @memberOf KJUR.asn1.DERAbstractTime#
        * @function
        * @param {Integer} year year of date (ex. 2013)
        * @param {Integer} month month of date between 1 and 12 (ex. 12)
        * @param {Integer} day day of month
        * @param {Integer} hour hours of date
        * @param {Integer} min minutes of date
        * @param {Integer} sec seconds of date
        */
    this.setByDateValue = function (year, month, day, hour, min, sec) {
      var dateObject = new Date(Date.UTC(year, month - 1, day, hour, min, sec, 0));
      this.setByDate(dateObject);
    };

    this.getFreshValueHex = function () {
      return this.hV;
    };
  };
  YAHOO.lang.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);
  // == END   DERAbstractTime ==================================================

  // == BEGIN DERAbstractStructured ============================================
  /**
   * base class for ASN.1 DER structured class
   * @name KJUR.asn1.DERAbstractStructured
   * @class base class for ASN.1 DER structured class
   * @property {Array} asn1Array internal array of ASN1Object
   * @extends KJUR.asn1.ASN1Object
   * @description
   * @see KJUR.asn1.ASN1Object - superclass
   */
  KJUR.asn1.DERAbstractStructured = function (params) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);

    /**
                                                                    * set value by array of ASN1Object
                                                                    * @name setByASN1ObjectArray
                                                                    * @memberOf KJUR.asn1.DERAbstractStructured#
                                                                    * @function
                                                                    * @param {array} asn1ObjectArray array of ASN1Object to set
                                                                    */
    this.setByASN1ObjectArray = function (asn1ObjectArray) {
      this.hTLV = null;
      this.isModified = true;
      this.asn1Array = asn1ObjectArray;
    };

    /**
        * append an ASN1Object to internal array
        * @name appendASN1Object
        * @memberOf KJUR.asn1.DERAbstractStructured#
        * @function
        * @param {ASN1Object} asn1Object to add
        */
    this.appendASN1Object = function (asn1Object) {
      this.hTLV = null;
      this.isModified = true;
      this.asn1Array.push(asn1Object);
    };

    this.asn1Array = new Array();
    if (typeof params != "undefined") {
      if (typeof params['array'] != "undefined") {
        this.asn1Array = params['array'];
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);


  // ********************************************************************
  //  ASN.1 Object Classes
  // ********************************************************************

  // ********************************************************************
  /**
   * class for ASN.1 DER Boolean
   * @name KJUR.asn1.DERBoolean
   * @class class for ASN.1 DER Boolean
   * @extends KJUR.asn1.ASN1Object
   * @description
   * @see KJUR.asn1.ASN1Object - superclass
   */
  KJUR.asn1.DERBoolean = function () {
    KJUR.asn1.DERBoolean.superclass.constructor.call(this);
    this.hT = "01";
    this.hTLV = "0101ff";
  };
  YAHOO.lang.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);

  // ********************************************************************
  /**
   * class for ASN.1 DER Integer
   * @name KJUR.asn1.DERInteger
   * @class class for ASN.1 DER Integer
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>int - specify initial ASN.1 value(V) by integer value</li>
   * <li>bigint - specify initial ASN.1 value(V) by BigInteger object</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */
  KJUR.asn1.DERInteger = function (params) {
    KJUR.asn1.DERInteger.superclass.constructor.call(this);
    this.hT = "02";

    /**
                     * set value by Tom Wu's BigInteger object
                     * @name setByBigInteger
                     * @memberOf KJUR.asn1.DERInteger#
                     * @function
                     * @param {BigInteger} bigIntegerValue to set
                     */
    this.setByBigInteger = function (bigIntegerValue) {
      this.hTLV = null;
      this.isModified = true;
      this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
    };

    /**
        * set value by integer value
        * @name setByInteger
        * @memberOf KJUR.asn1.DERInteger
        * @function
        * @param {Integer} integer value to set
        */
    this.setByInteger = function (intValue) {
      var bi = new BigInteger(String(intValue), 10);
      this.setByBigInteger(bi);
    };

    /**
        * set value by integer value
        * @name setValueHex
        * @memberOf KJUR.asn1.DERInteger#
        * @function
        * @param {String} hexadecimal string of integer value
        * @description
        * <br/>
        * NOTE: Value shall be represented by minimum octet length of
        * two's complement representation.
        * @example
        * new KJUR.asn1.DERInteger(123);
        * new KJUR.asn1.DERInteger({'int': 123});
        * new KJUR.asn1.DERInteger({'hex': '1fad'});
        */
    this.setValueHex = function (newHexString) {
      this.hV = newHexString;
    };

    this.getFreshValueHex = function () {
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params['bigint'] != "undefined") {
        this.setByBigInteger(params['bigint']);
      } else if (typeof params['int'] != "undefined") {
        this.setByInteger(params['int']);
      } else if (typeof params == "number") {
        this.setByInteger(params);
      } else if (typeof params['hex'] != "undefined") {
        this.setValueHex(params['hex']);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);

  // ********************************************************************
  /**
   * class for ASN.1 DER encoded BitString primitive
   * @name KJUR.asn1.DERBitString
   * @class class for ASN.1 DER encoded BitString primitive
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>bin - specify binary string (ex. '10111')</li>
   * <li>array - specify array of boolean (ex. [true,false,true,true])</li>
   * <li>hex - specify hexadecimal string of ASN.1 value(V) including unused bits</li>
   * <li>obj - specify {@link KJUR.asn1.ASN1Util.newObject}
   * argument for "BitString encapsulates" structure.</li>
   * </ul>
   * NOTE1: 'params' can be omitted.<br/>
   * NOTE2: 'obj' parameter have been supported since
   * asn1 1.0.11, jsrsasign 6.1.1 (2016-Sep-25).<br/>
   * @example
   * // default constructor
   * o = new KJUR.asn1.DERBitString();
   * // initialize with binary string
   * o = new KJUR.asn1.DERBitString({bin: "1011"});
   * // initialize with boolean array
   * o = new KJUR.asn1.DERBitString({array: [true,false,true,true]});
   * // initialize with hexadecimal string (04 is unused bits)
   * o = new KJUR.asn1.DEROctetString({hex: "04bac0"});
   * // initialize with ASN1Util.newObject argument for encapsulated
   * o = new KJUR.asn1.DERBitString({obj: {seq: [{int: 3}, {prnstr: 'aaa'}]}});
   * // above generates a ASN.1 data like this:
   * // BIT STRING, encapsulates {
   * //   SEQUENCE {
   * //     INTEGER 3
   * //     PrintableString 'aaa'
   * //     }
   * //   }
   */
  KJUR.asn1.DERBitString = function (params) {
    if (params !== undefined && typeof params.obj !== "undefined") {
      var o = KJUR.asn1.ASN1Util.newObject(params.obj);
      params.hex = "00" + o.getEncodedHex();
    }
    KJUR.asn1.DERBitString.superclass.constructor.call(this);
    this.hT = "03";

    /**
                     * set ASN.1 value(V) by a hexadecimal string including unused bits
                     * @name setHexValueIncludingUnusedBits
                     * @memberOf KJUR.asn1.DERBitString#
                     * @function
                     * @param {String} newHexStringIncludingUnusedBits
                     */
    this.setHexValueIncludingUnusedBits = function (newHexStringIncludingUnusedBits) {
      this.hTLV = null;
      this.isModified = true;
      this.hV = newHexStringIncludingUnusedBits;
    };

    /**
        * set ASN.1 value(V) by unused bit and hexadecimal string of value
        * @name setUnusedBitsAndHexValue
        * @memberOf KJUR.asn1.DERBitString#
        * @function
        * @param {Integer} unusedBits
        * @param {String} hValue
        */
    this.setUnusedBitsAndHexValue = function (unusedBits, hValue) {
      if (unusedBits < 0 || 7 < unusedBits) {
        throw "unused bits shall be from 0 to 7: u = " + unusedBits;
      }
      var hUnusedBits = "0" + unusedBits;
      this.hTLV = null;
      this.isModified = true;
      this.hV = hUnusedBits + hValue;
    };

    /**
        * set ASN.1 DER BitString by binary string<br/>
        * @name setByBinaryString
        * @memberOf KJUR.asn1.DERBitString#
        * @function
        * @param {String} binaryString binary value string (i.e. '10111')
        * @description
        * Its unused bits will be calculated automatically by length of
        * 'binaryValue'. <br/>
        * NOTE: Trailing zeros '0' will be ignored.
        * @example
        * o = new KJUR.asn1.DERBitString();
        * o.setByBooleanArray("01011");
        */
    this.setByBinaryString = function (binaryString) {
      binaryString = binaryString.replace(/0+$/, '');
      var unusedBits = 8 - binaryString.length % 8;
      if (unusedBits == 8) unusedBits = 0;
      for (var i = 0; i <= unusedBits; i++) {
        binaryString += '0';
      }
      var h = '';
      for (var i = 0; i < binaryString.length - 1; i += 8) {
        var b = binaryString.substr(i, 8);
        var x = parseInt(b, 2).toString(16);
        if (x.length == 1) x = '0' + x;
        h += x;
      }
      this.hTLV = null;
      this.isModified = true;
      this.hV = '0' + unusedBits + h;
    };

    /**
        * set ASN.1 TLV value(V) by an array of boolean<br/>
        * @name setByBooleanArray
        * @memberOf KJUR.asn1.DERBitString#
        * @function
        * @param {array} booleanArray array of boolean (ex. [true, false, true])
        * @description
        * NOTE: Trailing falses will be ignored in the ASN.1 DER Object.
        * @example
        * o = new KJUR.asn1.DERBitString();
        * o.setByBooleanArray([false, true, false, true, true]);
        */
    this.setByBooleanArray = function (booleanArray) {
      var s = '';
      for (var i = 0; i < booleanArray.length; i++) {
        if (booleanArray[i] == true) {
          s += '1';
        } else {
          s += '0';
        }
      }
      this.setByBinaryString(s);
    };

    /**
        * generate an array of falses with specified length<br/>
        * @name newFalseArray
        * @memberOf KJUR.asn1.DERBitString
        * @function
        * @param {Integer} nLength length of array to generate
        * @return {array} array of boolean falses
        * @description
        * This static method may be useful to initialize boolean array.
        * @example
        * o = new KJUR.asn1.DERBitString();
        * o.newFalseArray(3) &rarr; [false, false, false]
        */
    this.newFalseArray = function (nLength) {
      var a = new Array(nLength);
      for (var i = 0; i < nLength; i++) {
        a[i] = false;
      }
      return a;
    };

    this.getFreshValueHex = function () {
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params == "string" && params.toLowerCase().match(/^[0-9a-f]+$/)) {
        this.setHexValueIncludingUnusedBits(params);
      } else if (typeof params['hex'] != "undefined") {
        this.setHexValueIncludingUnusedBits(params['hex']);
      } else if (typeof params['bin'] != "undefined") {
        this.setByBinaryString(params['bin']);
      } else if (typeof params['array'] != "undefined") {
        this.setByBooleanArray(params['array']);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);

  // ********************************************************************
  /**
   * class for ASN.1 DER OctetString<br/>
   * @name KJUR.asn1.DEROctetString
   * @class class for ASN.1 DER OctetString
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * This class provides ASN.1 OctetString simple type.<br/>
   * Supported "params" attributes are:
   * <ul>
   * <li>str - to set a string as a value</li>
   * <li>hex - to set a hexadecimal string as a value</li>
   * <li>obj - to set a encapsulated ASN.1 value by JSON object
   * which is defined in {@link KJUR.asn1.ASN1Util.newObject}</li>
   * </ul>
   * NOTE: A parameter 'obj' have been supported
   * for "OCTET STRING, encapsulates" structure.
   * since asn1 1.0.11, jsrsasign 6.1.1 (2016-Sep-25).
   * @see KJUR.asn1.DERAbstractString - superclass
   * @example
   * // default constructor
   * o = new KJUR.asn1.DEROctetString();
   * // initialize with string
   * o = new KJUR.asn1.DEROctetString({str: "aaa"});
   * // initialize with hexadecimal string
   * o = new KJUR.asn1.DEROctetString({hex: "616161"});
   * // initialize with ASN1Util.newObject argument
   * o = new KJUR.asn1.DEROctetString({obj: {seq: [{int: 3}, {prnstr: 'aaa'}]}});
   * // above generates a ASN.1 data like this:
   * // OCTET STRING, encapsulates {
   * //   SEQUENCE {
   * //     INTEGER 3
   * //     PrintableString 'aaa'
   * //     }
   * //   }
   */
  KJUR.asn1.DEROctetString = function (params) {
    if (params !== undefined && typeof params.obj !== "undefined") {
      var o = KJUR.asn1.ASN1Util.newObject(params.obj);
      params.hex = o.getEncodedHex();
    }
    KJUR.asn1.DEROctetString.superclass.constructor.call(this, params);
    this.hT = "04";
  };
  YAHOO.lang.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);

  // ********************************************************************
  /**
   * class for ASN.1 DER Null
   * @name KJUR.asn1.DERNull
   * @class class for ASN.1 DER Null
   * @extends KJUR.asn1.ASN1Object
   * @description
   * @see KJUR.asn1.ASN1Object - superclass
   */
  KJUR.asn1.DERNull = function () {
    KJUR.asn1.DERNull.superclass.constructor.call(this);
    this.hT = "05";
    this.hTLV = "0500";
  };
  YAHOO.lang.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);

  // ********************************************************************
  /**
   * class for ASN.1 DER ObjectIdentifier
   * @name KJUR.asn1.DERObjectIdentifier
   * @class class for ASN.1 DER ObjectIdentifier
   * @param {Array} params associative array of parameters (ex. {'oid': '2.5.4.5'})
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>oid - specify initial ASN.1 value(V) by a oid string (ex. 2.5.4.13)</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */
  KJUR.asn1.DERObjectIdentifier = function (params) {
    var itox = function itox(i) {
      var h = i.toString(16);
      if (h.length == 1) h = '0' + h;
      return h;
    };
    var roidtox = function roidtox(roid) {
      var h = '';
      var bi = new BigInteger(roid, 10);
      var b = bi.toString(2);
      var padLen = 7 - b.length % 7;
      if (padLen == 7) padLen = 0;
      var bPad = '';
      for (var i = 0; i < padLen; i++) {bPad += '0';}
      b = bPad + b;
      for (var i = 0; i < b.length - 1; i += 7) {
        var b8 = b.substr(i, 7);
        if (i != b.length - 7) b8 = '1' + b8;
        h += itox(parseInt(b8, 2));
      }
      return h;
    };

    KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
    this.hT = "06";

    /**
                     * set value by a hexadecimal string
                     * @name setValueHex
                     * @memberOf KJUR.asn1.DERObjectIdentifier#
                     * @function
                     * @param {String} newHexString hexadecimal value of OID bytes
                     */
    this.setValueHex = function (newHexString) {
      this.hTLV = null;
      this.isModified = true;
      this.s = null;
      this.hV = newHexString;
    };

    /**
        * set value by a OID string<br/>
        * @name setValueOidString
        * @memberOf KJUR.asn1.DERObjectIdentifier#
        * @function
        * @param {String} oidString OID string (ex. 2.5.4.13)
        * @example
        * o = new KJUR.asn1.DERObjectIdentifier();
        * o.setValueOidString("2.5.4.13");
        */
    this.setValueOidString = function (oidString) {
      if (!oidString.match(/^[0-9.]+$/)) {
        throw "malformed oid string: " + oidString;
      }
      var h = '';
      var a = oidString.split('.');
      var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
      h += itox(i0);
      a.splice(0, 2);
      for (var i = 0; i < a.length; i++) {
        h += roidtox(a[i]);
      }
      this.hTLV = null;
      this.isModified = true;
      this.s = null;
      this.hV = h;
    };

    /**
        * set value by a OID name
        * @name setValueName
        * @memberOf KJUR.asn1.DERObjectIdentifier#
        * @function
        * @param {String} oidName OID name (ex. 'serverAuth')
        * @since 1.0.1
        * @description
        * OID name shall be defined in 'KJUR.asn1.x509.OID.name2oidList'.
        * Otherwise raise error.
        * @example
        * o = new KJUR.asn1.DERObjectIdentifier();
        * o.setValueName("serverAuth");
        */
    this.setValueName = function (oidName) {
      var oid = KJUR.asn1.x509.OID.name2oid(oidName);
      if (oid !== '') {
        this.setValueOidString(oid);
      } else {
        throw "DERObjectIdentifier oidName undefined: " + oidName;
      }
    };

    this.getFreshValueHex = function () {
      return this.hV;
    };

    if (params !== undefined) {
      if (typeof params === "string") {
        if (params.match(/^[0-2].[0-9.]+$/)) {
          this.setValueOidString(params);
        } else {
          this.setValueName(params);
        }
      } else if (params.oid !== undefined) {
        this.setValueOidString(params.oid);
      } else if (params.hex !== undefined) {
        this.setValueHex(params.hex);
      } else if (params.name !== undefined) {
        this.setValueName(params.name);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);

  // ********************************************************************
  /**
   * class for ASN.1 DER Enumerated
   * @name KJUR.asn1.DEREnumerated
   * @class class for ASN.1 DER Enumerated
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>int - specify initial ASN.1 value(V) by integer value</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   * @example
   * new KJUR.asn1.DEREnumerated(123);
   * new KJUR.asn1.DEREnumerated({int: 123});
   * new KJUR.asn1.DEREnumerated({hex: '1fad'});
   */
  KJUR.asn1.DEREnumerated = function (params) {
    KJUR.asn1.DEREnumerated.superclass.constructor.call(this);
    this.hT = "0a";

    /**
                     * set value by Tom Wu's BigInteger object
                     * @name setByBigInteger
                     * @memberOf KJUR.asn1.DEREnumerated#
                     * @function
                     * @param {BigInteger} bigIntegerValue to set
                     */
    this.setByBigInteger = function (bigIntegerValue) {
      this.hTLV = null;
      this.isModified = true;
      this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
    };

    /**
        * set value by integer value
        * @name setByInteger
        * @memberOf KJUR.asn1.DEREnumerated#
        * @function
        * @param {Integer} integer value to set
        */
    this.setByInteger = function (intValue) {
      var bi = new BigInteger(String(intValue), 10);
      this.setByBigInteger(bi);
    };

    /**
        * set value by integer value
        * @name setValueHex
        * @memberOf KJUR.asn1.DEREnumerated#
        * @function
        * @param {String} hexadecimal string of integer value
        * @description
        * <br/>
        * NOTE: Value shall be represented by minimum octet length of
        * two's complement representation.
        */
    this.setValueHex = function (newHexString) {
      this.hV = newHexString;
    };

    this.getFreshValueHex = function () {
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params['int'] != "undefined") {
        this.setByInteger(params['int']);
      } else if (typeof params == "number") {
        this.setByInteger(params);
      } else if (typeof params['hex'] != "undefined") {
        this.setValueHex(params['hex']);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DEREnumerated, KJUR.asn1.ASN1Object);

  // ********************************************************************
  /**
   * class for ASN.1 DER UTF8String
   * @name KJUR.asn1.DERUTF8String
   * @class class for ASN.1 DER UTF8String
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */
  KJUR.asn1.DERUTF8String = function (params) {
    KJUR.asn1.DERUTF8String.superclass.constructor.call(this, params);
    this.hT = "0c";
  };
  YAHOO.lang.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);

  // ********************************************************************
  /**
   * class for ASN.1 DER NumericString
   * @name KJUR.asn1.DERNumericString
   * @class class for ASN.1 DER NumericString
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */
  KJUR.asn1.DERNumericString = function (params) {
    KJUR.asn1.DERNumericString.superclass.constructor.call(this, params);
    this.hT = "12";
  };
  YAHOO.lang.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);

  // ********************************************************************
  /**
   * class for ASN.1 DER PrintableString
   * @name KJUR.asn1.DERPrintableString
   * @class class for ASN.1 DER PrintableString
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */
  KJUR.asn1.DERPrintableString = function (params) {
    KJUR.asn1.DERPrintableString.superclass.constructor.call(this, params);
    this.hT = "13";
  };
  YAHOO.lang.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);

  // ********************************************************************
  /**
   * class for ASN.1 DER TeletexString
   * @name KJUR.asn1.DERTeletexString
   * @class class for ASN.1 DER TeletexString
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */
  KJUR.asn1.DERTeletexString = function (params) {
    KJUR.asn1.DERTeletexString.superclass.constructor.call(this, params);
    this.hT = "14";
  };
  YAHOO.lang.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);

  // ********************************************************************
  /**
   * class for ASN.1 DER IA5String
   * @name KJUR.asn1.DERIA5String
   * @class class for ASN.1 DER IA5String
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */
  KJUR.asn1.DERIA5String = function (params) {
    KJUR.asn1.DERIA5String.superclass.constructor.call(this, params);
    this.hT = "16";
  };
  YAHOO.lang.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);

  // ********************************************************************
  /**
   * class for ASN.1 DER UTCTime
   * @name KJUR.asn1.DERUTCTime
   * @class class for ASN.1 DER UTCTime
   * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
   * @extends KJUR.asn1.DERAbstractTime
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>str - specify initial ASN.1 value(V) by a string (ex.'130430235959Z')</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * <li>date - specify Date object.</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   * <h4>EXAMPLES</h4>
   * @example
   * d1 = new KJUR.asn1.DERUTCTime();
   * d1.setString('130430125959Z');
   *
   * d2 = new KJUR.asn1.DERUTCTime({'str': '130430125959Z'});
   * d3 = new KJUR.asn1.DERUTCTime({'date': new Date(Date.UTC(2015, 0, 31, 0, 0, 0, 0))});
   * d4 = new KJUR.asn1.DERUTCTime('130430125959Z');
   */
  KJUR.asn1.DERUTCTime = function (params) {
    KJUR.asn1.DERUTCTime.superclass.constructor.call(this, params);
    this.hT = "17";

    /**
                     * set value by a Date object<br/>
                     * @name setByDate
                     * @memberOf KJUR.asn1.DERUTCTime#
                     * @function
                     * @param {Date} dateObject Date object to set ASN.1 value(V)
                     * @example
                     * o = new KJUR.asn1.DERUTCTime();
                     * o.setByDate(new Date("2016/12/31"));
                     */
    this.setByDate = function (dateObject) {
      this.hTLV = null;
      this.isModified = true;
      this.date = dateObject;
      this.s = this.formatDate(this.date, 'utc');
      this.hV = stohex(this.s);
    };

    this.getFreshValueHex = function () {
      if (typeof this.date == "undefined" && typeof this.s == "undefined") {
        this.date = new Date();
        this.s = this.formatDate(this.date, 'utc');
        this.hV = stohex(this.s);
      }
      return this.hV;
    };

    if (params !== undefined) {
      if (params.str !== undefined) {
        this.setString(params.str);
      } else if (typeof params == "string" && params.match(/^[0-9]{12}Z$/)) {
        this.setString(params);
      } else if (params.hex !== undefined) {
        this.setStringHex(params.hex);
      } else if (params.date !== undefined) {
        this.setByDate(params.date);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);

  // ********************************************************************
  /**
   * class for ASN.1 DER GeneralizedTime
   * @name KJUR.asn1.DERGeneralizedTime
   * @class class for ASN.1 DER GeneralizedTime
   * @param {Array} params associative array of parameters (ex. {'str': '20130430235959Z'})
   * @property {Boolean} withMillis flag to show milliseconds or not
   * @extends KJUR.asn1.DERAbstractTime
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>str - specify initial ASN.1 value(V) by a string (ex.'20130430235959Z')</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * <li>date - specify Date object.</li>
   * <li>millis - specify flag to show milliseconds (from 1.0.6)</li>
   * </ul>
   * NOTE1: 'params' can be omitted.
   * NOTE2: 'withMillis' property is supported from asn1 1.0.6.
   */
  KJUR.asn1.DERGeneralizedTime = function (params) {
    KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, params);
    this.hT = "18";
    this.withMillis = false;

    /**
                              * set value by a Date object
                              * @name setByDate
                              * @memberOf KJUR.asn1.DERGeneralizedTime#
                              * @function
                              * @param {Date} dateObject Date object to set ASN.1 value(V)
                              * @example
                              * When you specify UTC time, use 'Date.UTC' method like this:<br/>
                              * o1 = new DERUTCTime();
                              * o1.setByDate(date);
                              *
                              * date = new Date(Date.UTC(2015, 0, 31, 23, 59, 59, 0)); #2015JAN31 23:59:59
                              */
    this.setByDate = function (dateObject) {
      this.hTLV = null;
      this.isModified = true;
      this.date = dateObject;
      this.s = this.formatDate(this.date, 'gen', this.withMillis);
      this.hV = stohex(this.s);
    };

    this.getFreshValueHex = function () {
      if (this.date === undefined && this.s === undefined) {
        this.date = new Date();
        this.s = this.formatDate(this.date, 'gen', this.withMillis);
        this.hV = stohex(this.s);
      }
      return this.hV;
    };

    if (params !== undefined) {
      if (params.str !== undefined) {
        this.setString(params.str);
      } else if (typeof params == "string" && params.match(/^[0-9]{14}Z$/)) {
        this.setString(params);
      } else if (params.hex !== undefined) {
        this.setStringHex(params.hex);
      } else if (params.date !== undefined) {
        this.setByDate(params.date);
      }
      if (params.millis === true) {
        this.withMillis = true;
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);

  // ********************************************************************
  /**
   * class for ASN.1 DER Sequence
   * @name KJUR.asn1.DERSequence
   * @class class for ASN.1 DER Sequence
   * @extends KJUR.asn1.DERAbstractStructured
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>array - specify array of ASN1Object to set elements of content</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */
  KJUR.asn1.DERSequence = function (params) {
    KJUR.asn1.DERSequence.superclass.constructor.call(this, params);
    this.hT = "30";
    this.getFreshValueHex = function () {
      var h = '';
      for (var i = 0; i < this.asn1Array.length; i++) {
        var asn1Obj = this.asn1Array[i];
        h += asn1Obj.getEncodedHex();
      }
      this.hV = h;
      return this.hV;
    };
  };
  YAHOO.lang.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);

  // ********************************************************************
  /**
   * class for ASN.1 DER Set
   * @name KJUR.asn1.DERSet
   * @class class for ASN.1 DER Set
   * @extends KJUR.asn1.DERAbstractStructured
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>array - specify array of ASN1Object to set elements of content</li>
   * <li>sortflag - flag for sort (default: true). ASN.1 BER is not sorted in 'SET OF'.</li>
   * </ul>
   * NOTE1: 'params' can be omitted.<br/>
   * NOTE2: sortflag is supported since 1.0.5.
   */
  KJUR.asn1.DERSet = function (params) {
    KJUR.asn1.DERSet.superclass.constructor.call(this, params);
    this.hT = "31";
    this.sortFlag = true; // item shall be sorted only in ASN.1 DER
    this.getFreshValueHex = function () {
      var a = new Array();
      for (var i = 0; i < this.asn1Array.length; i++) {
        var asn1Obj = this.asn1Array[i];
        a.push(asn1Obj.getEncodedHex());
      }
      if (this.sortFlag == true) a.sort();
      this.hV = a.join('');
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params.sortflag != "undefined" &&
      params.sortflag == false)
      this.sortFlag = false;
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);

  // ********************************************************************
  /**
   * class for ASN.1 DER TaggedObject
   * @name KJUR.asn1.DERTaggedObject
   * @class class for ASN.1 DER TaggedObject
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * Parameter 'tagNoNex' is ASN.1 tag(T) value for this object.
   * For example, if you find '[1]' tag in a ASN.1 dump,
   * 'tagNoHex' will be 'a1'.
   * <br/>
   * As for optional argument 'params' for constructor, you can specify *ANY* of
   * following properties:
   * <ul>
   * <li>explicit - specify true if this is explicit tag otherwise false
   *     (default is 'true').</li>
   * <li>tag - specify tag (default is 'a0' which means [0])</li>
   * <li>obj - specify ASN1Object which is tagged</li>
   * </ul>
   * @example
   * d1 = new KJUR.asn1.DERUTF8String({'str':'a'});
   * d2 = new KJUR.asn1.DERTaggedObject({'obj': d1});
   * hex = d2.getEncodedHex();
   */
  KJUR.asn1.DERTaggedObject = function (params) {
    KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
    this.hT = "a0";
    this.hV = '';
    this.isExplicit = true;
    this.asn1Object = null;

    /**
                             * set value by an ASN1Object
                             * @name setString
                             * @memberOf KJUR.asn1.DERTaggedObject#
                             * @function
                             * @param {Boolean} isExplicitFlag flag for explicit/implicit tag
                             * @param {Integer} tagNoHex hexadecimal string of ASN.1 tag
                             * @param {ASN1Object} asn1Object ASN.1 to encapsulate
                             */
    this.setASN1Object = function (isExplicitFlag, tagNoHex, asn1Object) {
      this.hT = tagNoHex;
      this.isExplicit = isExplicitFlag;
      this.asn1Object = asn1Object;
      if (this.isExplicit) {
        this.hV = this.asn1Object.getEncodedHex();
        this.hTLV = null;
        this.isModified = true;
      } else {
        this.hV = null;
        this.hTLV = asn1Object.getEncodedHex();
        this.hTLV = this.hTLV.replace(/^../, tagNoHex);
        this.isModified = false;
      }
    };

    this.getFreshValueHex = function () {
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params['tag'] != "undefined") {
        this.hT = params['tag'];
      }
      if (typeof params['explicit'] != "undefined") {
        this.isExplicit = params['explicit'];
      }
      if (typeof params['obj'] != "undefined") {
        this.asn1Object = params['obj'];
        this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);

  /**
                                                                       * Create a new JSEncryptRSAKey that extends Tom Wu's RSA key object.
                                                                       * This object is just a decorator for parsing the key parameter
                                                                       * @param {string|Object} key - The key in string format, or an object containing
                                                                       * the parameters needed to build a RSAKey object.
                                                                       * @constructor
                                                                       */
  var JSEncryptRSAKey = /** @class */function (_super) {
    __extends(JSEncryptRSAKey, _super);
    function JSEncryptRSAKey(key) {
      var _this = _super.call(this) || this;
      // Call the super constructor.
      //  RSAKey.call(this);
      // If a key key was provided.
      if (key) {
        // If this is a string...
        if (typeof key === "string") {
          _this.parseKey(key);
        } else
        if (JSEncryptRSAKey.hasPrivateKeyProperty(key) ||
        JSEncryptRSAKey.hasPublicKeyProperty(key)) {
          // Set the values for the key.
          _this.parsePropertiesFrom(key);
        }
      }
      return _this;
    }
    /**
       * Method to parse a pem encoded string containing both a public or private key.
       * The method will translate the pem encoded string in a der encoded string and
       * will parse private key and public key parameters. This method accepts public key
       * in the rsaencryption pkcs #1 format (oid: 1.2.840.113549.1.1.1).
       *
       * @todo Check how many rsa formats use the same format of pkcs #1.
       *
       * The format is defined as:
       * PublicKeyInfo ::= SEQUENCE {
       *   algorithm       AlgorithmIdentifier,
       *   PublicKey       BIT STRING
       * }
       * Where AlgorithmIdentifier is:
       * AlgorithmIdentifier ::= SEQUENCE {
       *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
       *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
       * }
       * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
       * RSAPublicKey ::= SEQUENCE {
       *   modulus           INTEGER,  -- n
       *   publicExponent    INTEGER   -- e
       * }
       * it's possible to examine the structure of the keys obtained from openssl using
       * an asn.1 dumper as the one used here to parse the components: http://lapo.it/asn1js/
       * @argument {string} pem the pem encoded string, can include the BEGIN/END header/footer
       * @private
       */
    JSEncryptRSAKey.prototype.parseKey = function (pem) {
      try {
        var modulus = 0;
        var public_exponent = 0;
        var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
        var der = reHex.test(pem) ? Hex.decode(pem) : Base64.unarmor(pem);
        var asn1 = ASN1.decode(der);
        // Fixes a bug with OpenSSL 1.0+ private keys
        if (asn1.sub.length === 3) {
          asn1 = asn1.sub[2].sub[0];
        }
        if (asn1.sub.length === 9) {
          // Parse the private key.
          modulus = asn1.sub[1].getHexStringValue(); // bigint
          this.n = parseBigInt(modulus, 16);
          public_exponent = asn1.sub[2].getHexStringValue(); // int
          this.e = parseInt(public_exponent, 16);
          var private_exponent = asn1.sub[3].getHexStringValue(); // bigint
          this.d = parseBigInt(private_exponent, 16);
          var prime1 = asn1.sub[4].getHexStringValue(); // bigint
          this.p = parseBigInt(prime1, 16);
          var prime2 = asn1.sub[5].getHexStringValue(); // bigint
          this.q = parseBigInt(prime2, 16);
          var exponent1 = asn1.sub[6].getHexStringValue(); // bigint
          this.dmp1 = parseBigInt(exponent1, 16);
          var exponent2 = asn1.sub[7].getHexStringValue(); // bigint
          this.dmq1 = parseBigInt(exponent2, 16);
          var coefficient = asn1.sub[8].getHexStringValue(); // bigint
          this.coeff = parseBigInt(coefficient, 16);
        } else
        if (asn1.sub.length === 2) {
          // Parse the public key.
          var bit_string = asn1.sub[1];
          var sequence = bit_string.sub[0];
          modulus = sequence.sub[0].getHexStringValue();
          this.n = parseBigInt(modulus, 16);
          public_exponent = sequence.sub[1].getHexStringValue();
          this.e = parseInt(public_exponent, 16);
        } else
        {
          return false;
        }
        return true;
      }
      catch (ex) {
        return false;
      }
    };
    /**
        * Translate rsa parameters in a hex encoded string representing the rsa key.
        *
        * The translation follow the ASN.1 notation :
        * RSAPrivateKey ::= SEQUENCE {
        *   version           Version,
        *   modulus           INTEGER,  -- n
        *   publicExponent    INTEGER,  -- e
        *   privateExponent   INTEGER,  -- d
        *   prime1            INTEGER,  -- p
        *   prime2            INTEGER,  -- q
        *   exponent1         INTEGER,  -- d mod (p1)
        *   exponent2         INTEGER,  -- d mod (q-1)
        *   coefficient       INTEGER,  -- (inverse of q) mod p
        * }
        * @returns {string}  DER Encoded String representing the rsa private key
        * @private
        */
    JSEncryptRSAKey.prototype.getPrivateBaseKey = function () {
      var options = {
        array: [
        new KJUR.asn1.DERInteger({ int: 0 }),
        new KJUR.asn1.DERInteger({ bigint: this.n }),
        new KJUR.asn1.DERInteger({ int: this.e }),
        new KJUR.asn1.DERInteger({ bigint: this.d }),
        new KJUR.asn1.DERInteger({ bigint: this.p }),
        new KJUR.asn1.DERInteger({ bigint: this.q }),
        new KJUR.asn1.DERInteger({ bigint: this.dmp1 }),
        new KJUR.asn1.DERInteger({ bigint: this.dmq1 }),
        new KJUR.asn1.DERInteger({ bigint: this.coeff })] };


      var seq = new KJUR.asn1.DERSequence(options);
      return seq.getEncodedHex();
    };
    /**
        * base64 (pem) encoded version of the DER encoded representation
        * @returns {string} pem encoded representation without header and footer
        * @public
        */
    JSEncryptRSAKey.prototype.getPrivateBaseKeyB64 = function () {
      return hex2b64(this.getPrivateBaseKey());
    };
    /**
        * Translate rsa parameters in a hex encoded string representing the rsa public key.
        * The representation follow the ASN.1 notation :
        * PublicKeyInfo ::= SEQUENCE {
        *   algorithm       AlgorithmIdentifier,
        *   PublicKey       BIT STRING
        * }
        * Where AlgorithmIdentifier is:
        * AlgorithmIdentifier ::= SEQUENCE {
        *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
        *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
        * }
        * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
        * RSAPublicKey ::= SEQUENCE {
        *   modulus           INTEGER,  -- n
        *   publicExponent    INTEGER   -- e
        * }
        * @returns {string} DER Encoded String representing the rsa public key
        * @private
        */
    JSEncryptRSAKey.prototype.getPublicBaseKey = function () {
      var first_sequence = new KJUR.asn1.DERSequence({
        array: [
        new KJUR.asn1.DERObjectIdentifier({ oid: "1.2.840.113549.1.1.1" }),
        new KJUR.asn1.DERNull()] });


      var second_sequence = new KJUR.asn1.DERSequence({
        array: [
        new KJUR.asn1.DERInteger({ bigint: this.n }),
        new KJUR.asn1.DERInteger({ int: this.e })] });


      var bit_string = new KJUR.asn1.DERBitString({
        hex: "00" + second_sequence.getEncodedHex() });

      var seq = new KJUR.asn1.DERSequence({
        array: [
        first_sequence,
        bit_string] });


      return seq.getEncodedHex();
    };
    /**
        * base64 (pem) encoded version of the DER encoded representation
        * @returns {string} pem encoded representation without header and footer
        * @public
        */
    JSEncryptRSAKey.prototype.getPublicBaseKeyB64 = function () {
      return hex2b64(this.getPublicBaseKey());
    };
    /**
        * wrap the string in block of width chars. The default value for rsa keys is 64
        * characters.
        * @param {string} str the pem encoded string without header and footer
        * @param {Number} [width=64] - the length the string has to be wrapped at
        * @returns {string}
        * @private
        */
    JSEncryptRSAKey.wordwrap = function (str, width) {
      width = width || 64;
      if (!str) {
        return str;
      }
      var regex = "(.{1," + width + "})( +|$\n?)|(.{1," + width + "})";
      return str.match(RegExp(regex, "g")).join("\n");
    };
    /**
        * Retrieve the pem encoded private key
        * @returns {string} the pem encoded private key with header/footer
        * @public
        */
    JSEncryptRSAKey.prototype.getPrivateKey = function () {
      var key = "-----BEGIN RSA PRIVATE KEY-----\n";
      key += JSEncryptRSAKey.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
      key += "-----END RSA PRIVATE KEY-----";
      return key;
    };
    /**
        * Retrieve the pem encoded public key
        * @returns {string} the pem encoded public key with header/footer
        * @public
        */
    JSEncryptRSAKey.prototype.getPublicKey = function () {
      var key = "-----BEGIN PUBLIC KEY-----\n";
      key += JSEncryptRSAKey.wordwrap(this.getPublicBaseKeyB64()) + "\n";
      key += "-----END PUBLIC KEY-----";
      return key;
    };
    /**
        * Check if the object contains the necessary parameters to populate the rsa modulus
        * and public exponent parameters.
        * @param {Object} [obj={}] - An object that may contain the two public key
        * parameters
        * @returns {boolean} true if the object contains both the modulus and the public exponent
        * properties (n and e)
        * @todo check for types of n and e. N should be a parseable bigInt object, E should
        * be a parseable integer number
        * @private
        */
    JSEncryptRSAKey.hasPublicKeyProperty = function (obj) {
      obj = obj || {};
      return obj.hasOwnProperty("n") &&
      obj.hasOwnProperty("e");
    };
    /**
        * Check if the object contains ALL the parameters of an RSA key.
        * @param {Object} [obj={}] - An object that may contain nine rsa key
        * parameters
        * @returns {boolean} true if the object contains all the parameters needed
        * @todo check for types of the parameters all the parameters but the public exponent
        * should be parseable bigint objects, the public exponent should be a parseable integer number
        * @private
        */
    JSEncryptRSAKey.hasPrivateKeyProperty = function (obj) {
      obj = obj || {};
      return obj.hasOwnProperty("n") &&
      obj.hasOwnProperty("e") &&
      obj.hasOwnProperty("d") &&
      obj.hasOwnProperty("p") &&
      obj.hasOwnProperty("q") &&
      obj.hasOwnProperty("dmp1") &&
      obj.hasOwnProperty("dmq1") &&
      obj.hasOwnProperty("coeff");
    };
    /**
        * Parse the properties of obj in the current rsa object. Obj should AT LEAST
        * include the modulus and public exponent (n, e) parameters.
        * @param {Object} obj - the object containing rsa parameters
        * @private
        */
    JSEncryptRSAKey.prototype.parsePropertiesFrom = function (obj) {
      this.n = obj.n;
      this.e = obj.e;
      if (obj.hasOwnProperty("d")) {
        this.d = obj.d;
        this.p = obj.p;
        this.q = obj.q;
        this.dmp1 = obj.dmp1;
        this.dmq1 = obj.dmq1;
        this.coeff = obj.coeff;
      }
    };
    return JSEncryptRSAKey;
  }(RSAKey);

  /**
              *
              * @param {Object} [options = {}] - An object to customize JSEncrypt behaviour
              * possible parameters are:
              * - default_key_size        {number}  default: 1024 the key size in bit
              * - default_public_exponent {string}  default: '010001' the hexadecimal representation of the public exponent
              * - log                     {boolean} default: false whether log warn/error or not
              * @constructor
              */
  var JSEncrypt = /** @class */function () {
    function JSEncrypt(options) {
      options = options || {};
      this.default_key_size = parseInt(options.default_key_size, 10) || 1024;
      this.default_public_exponent = options.default_public_exponent || "010001"; // 65537 default openssl public exponent for rsa key type
      this.log = options.log || false;
      // The private and public key.
      this.key = null;
    }
    /**
       * Method to set the rsa key parameter (one method is enough to set both the public
       * and the private key, since the private key contains the public key paramenters)
       * Log a warning if logs are enabled
       * @param {Object|string} key the pem encoded string or an object (with or without header/footer)
       * @public
       */
    JSEncrypt.prototype.setKey = function (key) {
      if (this.log && this.key) {
        console.warn("A key was already set, overriding existing.");
      }
      this.key = new JSEncryptRSAKey(key);
    };
    /**
        * Proxy method for setKey, for api compatibility
        * @see setKey
        * @public
        */
    JSEncrypt.prototype.setPrivateKey = function (privkey) {
      // Create the key.
      this.setKey(privkey);
    };
    /**
        * Proxy method for setKey, for api compatibility
        * @see setKey
        * @public
        */
    JSEncrypt.prototype.setPublicKey = function (pubkey) {
      // Sets the public key.
      this.setKey(pubkey);
    };
    /**
        * Proxy method for RSAKey object's decrypt, decrypt the string using the private
        * components of the rsa key object. Note that if the object was not set will be created
        * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
        * @param {string} str base64 encoded crypted string to decrypt
        * @return {string} the decrypted string
        * @public
        */
    JSEncrypt.prototype.decrypt = function (str) {
      // Return the decrypted string.
      try {
        return this.getKey().decrypt(b64tohex(str));
      }
      catch (ex) {
        return false;
      }
    };
    /**
        * Proxy method for RSAKey object's encrypt, encrypt the string using the public
        * components of the rsa key object. Note that if the object was not set will be created
        * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
        * @param {string} str the string to encrypt
        * @return {string} the encrypted string encoded in base64
        * @public
        */
    JSEncrypt.prototype.encrypt = function (str) {
      // Return the encrypted string.
      try {
        return hex2b64(this.getKey().encrypt(str));
      }
      catch (ex) {
        return false;
      }
    };
    /**
        * Proxy method for RSAKey object's sign.
        * @param {string} str the string to sign
        * @param {function} digestMethod hash method
        * @param {string} digestName the name of the hash algorithm
        * @return {string} the signature encoded in base64
        * @public
        */
    JSEncrypt.prototype.sign = function (str, digestMethod, digestName) {
      // return the RSA signature of 'str' in 'hex' format.
      try {
        return hex2b64(this.getKey().sign(str, digestMethod, digestName));
      }
      catch (ex) {
        return false;
      }
    };
    /**
        * Proxy method for RSAKey object's verify.
        * @param {string} str the string to verify
        * @param {string} signature the signature encoded in base64 to compare the string to
        * @param {function} digestMethod hash method
        * @return {boolean} whether the data and signature match
        * @public
        */
    JSEncrypt.prototype.verify = function (str, signature, digestMethod) {
      // Return the decrypted 'digest' of the signature.
      try {
        return this.getKey().verify(str, b64tohex(signature), digestMethod);
      }
      catch (ex) {
        return false;
      }
    };
    /**
        * Getter for the current JSEncryptRSAKey object. If it doesn't exists a new object
        * will be created and returned
        * @param {callback} [cb] the callback to be called if we want the key to be generated
        * in an async fashion
        * @returns {JSEncryptRSAKey} the JSEncryptRSAKey object
        * @public
        */
    JSEncrypt.prototype.getKey = function (cb) {
      // Only create new if it does not exist.
      if (!this.key) {
        // Get a new private key.
        this.key = new JSEncryptRSAKey();
        if (cb && {}.toString.call(cb) === "[object Function]") {
          this.key.generateAsync(this.default_key_size, this.default_public_exponent, cb);
          return;
        }
        // Generate the key.
        this.key.generate(this.default_key_size, this.default_public_exponent);
      }
      return this.key;
    };
    /**
        * Returns the pem encoded representation of the private key
        * If the key doesn't exists a new key will be created
        * @returns {string} pem encoded representation of the private key WITH header and footer
        * @public
        */
    JSEncrypt.prototype.getPrivateKey = function () {
      // Return the private representation of this key.
      return this.getKey().getPrivateKey();
    };
    /**
        * Returns the pem encoded representation of the private key
        * If the key doesn't exists a new key will be created
        * @returns {string} pem encoded representation of the private key WITHOUT header and footer
        * @public
        */
    JSEncrypt.prototype.getPrivateKeyB64 = function () {
      // Return the private representation of this key.
      return this.getKey().getPrivateBaseKeyB64();
    };
    /**
        * Returns the pem encoded representation of the public key
        * If the key doesn't exists a new key will be created
        * @returns {string} pem encoded representation of the public key WITH header and footer
        * @public
        */
    JSEncrypt.prototype.getPublicKey = function () {
      // Return the private representation of this key.
      return this.getKey().getPublicKey();
    };
    /**
        * Returns the pem encoded representation of the public key
        * If the key doesn't exists a new key will be created
        * @returns {string} pem encoded representation of the public key WITHOUT header and footer
        * @public
        */
    JSEncrypt.prototype.getPublicKeyB64 = function () {
      // Return the private representation of this key.
      return this.getKey().getPublicBaseKeyB64();
    };
    JSEncrypt.version = "3.0.0-rc.1";
    return JSEncrypt;
  }();

  window.JSEncrypt = JSEncrypt;

  exports.JSEncrypt = JSEncrypt;
  exports.default = JSEncrypt;

  Object.defineProperty(exports, '__esModule', { value: true });

});

/***/ }),
/* 79 */
/*!*************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/api/video.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.queryVideoInfo = void 0;var _request = __webpack_require__(/*! @/utils/request.js */ 21);

// 获取周边景区
var queryVideoInfo = function queryVideoInfo(data) {return _request.http.get('/videoapp/video/shareDetail', { params: data });};exports.queryVideoInfo = queryVideoInfo;

/***/ }),
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */
/*!**************************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static sync ^\.\/.*\.png$ ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./area.png": 93,
	"./arrow.png": 94,
	"./back_black.png": 95,
	"./back_white.png": 96,
	"./bad.png": 97,
	"./close.png": 98,
	"./entertainment.png": 99,
	"./guide.png": 100,
	"./icon_homexuan2s.png": 101,
	"./join.png": 102,
	"./like.png": 103,
	"./like_red.png": 104,
	"./load.png": 105,
	"./local.png": 106,
	"./location.png": 107,
	"./location@2x.png": 108,
	"./locationy.png": 109,
	"./logo.png": 110,
	"./mine01.png": 111,
	"./mine02.png": 112,
	"./mine03_.png": 113,
	"./minebg.png": 114,
	"./moment.png": 115,
	"./play.png": 116,
	"./play_guide.png": 117,
	"./play_small.png": 118,
	"./tome.png": 119
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 92;

/***/ }),
/* 93 */
/*!****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/area.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAY8AAADCCAYAAACxK07hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkEwREEyNkI5NjUwNDExRUFBOUUyQjU4QjRFNzg1MEIyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkEwREEyNkJBNjUwNDExRUFBOUUyQjU4QjRFNzg1MEIyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTBEQTI2Qjc2NTA0MTFFQUE5RTJCNThCNEU3ODUwQjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTBEQTI2Qjg2NTA0MTFFQUE5RTJCNThCNEU3ODUwQjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz64J3CkAAB2EklEQVR42uy9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"

/***/ }),
/* 94 */
/*!*****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/arrow.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAYCAYAAAAh8HdUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM1MDU4QkE5NTU3RDExRUJCQzA4OUI3Q0U2MTc5QTU2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM1MDU4QkFBNTU3RDExRUJCQzA4OUI3Q0U2MTc5QTU2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzUwNThCQTc1NTdEMTFFQkJDMDg5QjdDRTYxNzlBNTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzUwNThCQTg1NTdEMTFFQkJDMDg5QjdDRTYxNzlBNTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4TAZ+KAAABRElEQVR42ozUyytEYRjH8XdGLGwm/gcbJSvNwko2klBKiLGZpJDCBrFhIeVSLgtl3BXRNC5JYmXjz5GiJuL71HPqXXjPc9761Pmd5nfqvU3qtlRsd86d4gUDKDtjpDGJGvTgCBVJSsf41dyHXaSs0hnGveIIVq2S069Pe+9nMG+VZGxgwcvLGLNK0Q+XvLyFIaskYxHr+iwLcoAuqxTNaUefZQsu0WqVZCUnUNBchRtk40pRUZb/XHM1HtGQNjb/BzmUNGdwZZVk1KLOy5VWSc7kE+o1v6M/rpTROTRq/kQH3kIlmfQ9mjR/oROvodWTwh2aNZf12jyH9kn24xotmr/1ujyEToQULtDmLfcgiqGzJ0flBN3exub1I/+ecrGPXq8wisO4+7SGYe/dFPasm5v38iw2k/yxbOMDc1hJcKzcnwADABBuPEsnLQy7AAAAAElFTkSuQmCC"

/***/ }),
/* 95 */
/*!**********************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/back_black.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABHElEQVRYR8XXzY3CMBCG4Zl0lBlx4UQHQAULXexpBae90gFQAVvHSo5cynLiZBtFCpcVIv75HFKA3ycTaawwvfnhN/epCkBEDkS09N6vrbX21UvCAap6IqKPIXo2xmwmA/yLX51zi8kmkBPvJwP5BLlxCKAkXgwojRcBEPFsACqeBUDGkwHoeBKgRjwaICK/zDwbVmrUhou95EYXkYhcmHk1HHhzzs3H1mtsPGoCqvpNRJ+PQ0MI267r+gsH8oxOoK+0bfvVNM2+BiIK0IdFZMPMRzQiGlALkQSogUgGoBFZACQiG4BCFAEQiGJAKQICKEHAAM8QRLQ2xvy82tlQwBPEtD8mjzdV1VUIYeG931lr/yadQOoVCf8EqYA77mjmITu+5wEAAAAASUVORK5CYII="

/***/ }),
/* 96 */
/*!**********************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/back_white.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACGUlEQVRYR8XXP0hWURzG8eeZqqWxltyqoaAlg2jqH9FYRFqbJuGkFLQkRRGEQRAETpKlYkvSUFM0VEsE0WSDLpFDY0G1FcQTP3gu3CG9595zfDubOHw/95z3nHMvsYFD0j4AqyR/rpXhRvQlbQUwB+AUgDckj/QMIKkPwCyAo45OkxztCUDSXj/5fgfnSA6tN8vFlkDSIcd3OjhFcqxpiYsAJJ10fJuDd0hebYrH/7MBkgYd3+TgNZK3U+LZAEkXAUzXYpdI3k+NZwEkXQFwtxYbIfmwTbwzQNItANcd+wPgPMnFtvFOAEkxxeOO/QBwjuSLLvHWAEmPAFT7+ovjb7vGkwGStgB4DOC0YysABkku5cSTAJK2O37MsQ8ABkh+zo03AiTtdrzfsdeOfy0RTwFE8LBjzx3/VSqeAngC4KyDzwz43UvALi/BAUdfGfGtFKLxLvCPcAHAcUffeweslkA0AiIiaTOAQJxxdNmIj7mIJEAVkTQD4IL/joMotuO7HEQrgGfjHoDLjn73TLzsimgNMOIGgJuOxmUUp+LTLohOACNiFmI2qjFMMl5GW43OACNGADyoFcdITrURZAGMiINqHkDslBgTJCdTEdkAI04YERdXjEmSEymIIgAjDvrlNC6wGL17La+eVNIeI6rbc5bk8HozUWwGaogdRlSfZoskB9ZCFAd4Of7fx2n9SSXFN+InknFi/nP8BZ9criFM0VCaAAAAAElFTkSuQmCC"

/***/ }),
/* 97 */
/*!***************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/bad.png ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 98 */
/*!*****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/close.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ4MjdGMTYwMUJDNzExRUFCMzMxODVDODhDQUJEMTE3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ4MjdGMTYxMUJDNzExRUFCMzMxODVDODhDQUJEMTE3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDgyN0YxNUUxQkM3MTFFQUIzMzE4NUM4OENBQkQxMTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDgyN0YxNUYxQkM3MTFFQUIzMzE4NUM4OENBQkQxMTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7oVeuyAAAHfElEQVR42uyc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"

/***/ }),
/* 99 */
/*!*************************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/entertainment.png ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM5NEQzN0EzNjUwQTExRUE4NTQ5OUFGMEVFRDYwMjdEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM5NEQzN0E0NjUwQTExRUE4NTQ5OUFGMEVFRDYwMjdEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Qzk0RDM3QTE2NTBBMTFFQTg1NDk5QUYwRUVENjAyN0QiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Qzk0RDM3QTI2NTBBMTFFQTg1NDk5QUYwRUVENjAyN0QiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Eh7uTAAAeMUlEQVR42uydC5gcVZXHT1V3z/s9kycBAsGASBAFAgjCqhgRQTBgwnN9oKKLu7Lq+qnL7rffp6uIiOLuui4EE1ACboK66Lr4+NRdkPBIgCTkNXlnMu+eZ/fM9KOq7t5z696q2zXV1VXd1ZOekIJOVfdUV1fdX/3POffcRymEkAicWI7bRT1RBCcAn1hOAD6xnAB8YjkB+MRyAvCJJeASPR4vavtLCaUcx122vJHMtrJQZns92C/MnkPpQNAXLq4mxwP0WQnYC2ohkMMDWc+/t82NkWLBVyLsWQM4H1QBNNVfM4foyjJClLMJgdPpR6fS1zz66gBCWmnJx+h2A/9akr7PAoERuj1EX330/WEC5CD9bCeoxna9emLQD/x8wCsFdsUDdgOLUFN9tUuIoaygMN8B+AI4Gf82rVTpDs7PiGNH4vgjf99FX8/Tb28yDON3iezYfvywsSVK8gF3g32sQVck4LxQe2vPpFBvoW9X0dcST1ClwZUPIZb9BIyNBiHrk9mxPU7YTuCVAruiALuBPbRZaTcy6k20oBHscl+gwofLdiD25su03J7I6NqTaZIcFh8L4JUEuiIAu4E9+IKKar2bFuZttDRqfIMqP1x5laL7rTeI/uDQ+Ghnbb1K8pnxYwX6mAN2wqVgl1Kw99DN1bQU1UCgZhauvL9BP9ugado3RifGOvEzhO0HdLkhHzPATrCHXlbmGFn1H+nmJ1gCxq3gKxOuvGjUR/8onc5+LZlOxAVoN/M9U6CPCWAZbve+rJoerPkoLblv0bcteQs+TLi+YAWGK//emG6Qrw4MDa+LVYPhVHQ+H10OyDMKeJpqX1QXG7qyhm5e4amq2QXX2peun82kM3fGR8cO1dSaSnYDXU41zxhgGS5WedK9dbfQQvo+fdt0PMIVW3TfhGGQu48cHXyyqkYlCFo22+VW84wAluEe2Upq9Inog/TsP+5VaMcJXOl7ZN3wSPLzaS2dwvcCtJeaw4BcdsAy3EMvKQuIpv6MnvUFJcHlXwgPLim8fwHr4gVX2nfL5GR69eDQWK+XmsOEXFbAOXBfUM+h1Z+nCU8pvgHhiqUrndFu6Osf3iEgy745bMhlAyzDpXXbi8GE21oqXLcrnUVwxeZoNquv7OqKvxSNKURWs2yyw4CszgDcyync/zke4JJw4OLSEotGfrloUcdlWpYomZShpKYMZWrCUBKjGis7bNaUmz6L7cQQuoIdcC+icJ8hdjPdrIYLYcDN/X4yk9E+2N09VDYlhwrY4XOXUZ/7R3o2zbMFLiHecBVwgUtKiwfo9nhqKvu+o11Dr9fUqUbYkEMDnAP3RXUh0ZXn6VmcVBa4bmopAi4x7KoRkWyw4TgfRREb1soCHgRu/n1JTzKZfk9f7+hRVHJdY8QIC3IogHPquduMaj0Z+wORmvYqDS7h/xALprltvkiOv1VyKFsrE64iYCvs8yLhsvf0PDb3dI9elZpKp8OErIYJF4MCCvf7lQrXYEDpsemGQV86Wxug63RbM0DDl25AVjNf+D6b5Z9ruJ/5MnBtmMdhNwUQftzi4PL754IFC5q/q2lEwcBrMqGrYQReJSk4T/pxXaXBFRDY2hDKNSELMLqARez98X+qTVOp/KWCKVtFVUBVUbmmehWuYgAlx1n7gStv0OrTnQf2Dz4RjSrETclB68mh9ItGuJn+2lN5brmi4VrKRcC6+dJl0AywTYZI8NDcIVgBN8K3EbLKoSuKdGMEhIuraCxy/8KFLZt6ekYP4WdYhbKPoIEw1Vjmfrr2Fq1goV78IaKpSnqg5rcgtQpVKlzN4FB1NMfmWphbne8jfLTBfa2lUA6WwY2ooEYQrAlape8ZaNXcFxTbN/uFK+Wtn9uzo/9aNQo6KtktunYqOZ+Ko6WaZlzSA9UfrzS4Ij7OgSuB1bKmv8X3uPfJZ8Rg8ZurYcEpVVQhUaCFygCmpwwYjWsw0JOFw3vScGBnmn2mRgyIUpoImkQV1vUkElGY5BVVqN4M04LA5bq7bMmZcz+yr7N/LdNtFu2I5OAlJctM3CAXpWBZvZnBmnYjq+7A36u0gIoB1m3likAqkzXBIpXzLq2D5Vc2QH2jv2KgQRDs2jIFz/8mAaODOgMciaoQxXXEVHJE8s/A1e8XrnTdo0ODyfMHBxNxelxUr4E+uak1agRRcWDAMlxcp3rq0O9+elbApe8zGZ1BPnt5DVz2gUZoaCouxqTBN2z+YwL+978T9HcUE7AAHVUt/6xK1augTZHUZTyy5/XeL6jUTFdXm4ALBV1OyIEAO6PmqZ6apfQSXkNTX3lwzUjZrNoQq8oDqgErbm6CpW+tDSV7F+/LwoYfDsHYEIEoBRuLqWzNfLSCZh5YAEaEPw7SzkwNRnIsfUnX4aG9MQTs4Y/zRdVF1YOFeinceyoVLkbCOg+cdF63RZ97zsW1ocHFpWN+DD7yxbnQsSBi1ZeZr9cwMjdM/09y60zE/3VH6xqqvkytkJJNG6qoI4vGCTcmRSc6nIEVVe+ZdLWqstKPhMUiAq7B1ZvlSQos/E2/H4dXnk2G2npW16DCzX/dAU2tinkjoY83dJZEMaRqFyGB4JoJEFX50Cmnty9FyPRaGGAz6KIMeBLEOaBOZqUWo148IFXv3fTk1EpKPxJDVi6HK2WiWNRMlfXLx4Zgy/8lQoVc36jCDXe2s7PRdd3MjvEYwDyvAN1/cvYlal191V30kIqBCnaoGCG7ZbkCAXaqt0Zv6OBDSSqm4UDklkXSQlbuIloFeveNTTTYMiyf/Iu1cdgcMuR5J8XgnVc3WDeTwevchJjnlIMtQN8uGo2vmrewqcNSsQQZ/y5SmW7M1GLUC4Z6G31bWwpcEipcs5Yo6r0sW8UDKzSVV1zXCG+7rB5W3NhiFjr3zT//0SBseTZcyBe/txEa21TrRjK4RbEbM4rquFfT2l53k1CxMNWsFiPlq91UrAZVL8/PfLxUuBAmXKmZT6hXNAwsPa+GBkAxtuvydzfC+1a3mX4RzBvhqTUD8Oqfw4OMdeF3rGhkrkCGTPhvEgddvz1EaFR+OyqYvbTpKs7HTg2q3pps09vp2zMrBS6R0pIg8stcwaicZZfU5RzrHSua4Oqb2y2niPXZDQ8NwNYXwgu8zr2oHmJVip3jFso1ioPLVfWmJWfOOY+p2HBXsZsvDhxkUfXeWFlw7Q8MHswIM1xD2Z68pHraNVx2VTNctard+j5+76f/3g/bXgwHMsI9/S1V1nmIVCkpEq54W10TvR7hsnPW/PliNUjWii/XVxpcwiGJYEZE0ovOqLaS/c7limtaqE9uy8lMPfGDAXrN4UA+dWmN1XBhweVKNkhwuLihquo1NCJXCqlYZuZbwSj9qnTDEig0sn7GlcurR2AHMAL23JNintf07uta4coPtUnHIbCeQn5980TJgOcvipk3nGH7XqNI5Uqdwk475fS209xULHZ11osDmWh6B62oOLjOY7NzMOue9U2FL+/Kla0MtDg2+vDH/7UfdrxSGmRskTIMW7XEugOLg0uspErVe4SKWb5az5/d8gQsm2e8I0z7rlx6TOCS/HDtnpCoEJLzw7X1/u5fNNVXfNDutk2VAT95sB92vzZZNODqWtVussx7zcHgsmg6ql5kuhQzorZauVyyW8guWJBF4JJi4ZJS4AbL31orJUBX8fevaoPLr26xbiSMwh/9bh/s2VocZFUtBCs4XJ70uIhwsHJ2C9+7VZl8A26pae6gq0XFwoUAcEkIcNFh0bs5EJQP0OrTZVe18G+bkNdRyJ3bgkNOTYqzUEKDy/dfOH9RczuaaaFkZ7BVELBb9BwB9dww4BIfcCEgXJInKk2O6YHBXHMrhbyi2ToOLTgKuRc6tweDPBLXpnWxDQEuWxqba5YRh4l2mmnfChb+ly5nhwEXQoRrWL0feWZK3EA8mOnrygYGjFCuvb0DLrmymf8egWyGwNoHemHfjinfx+nvzvDOeHavDqt/Vglwmdhi6lKx7TTTzmjat4kmirI4TLgkBLh28yCva7I6sGEFqwd2pWB0SCsK8vUf6YCL39Voq4NCfuT+HnpMf5APd6ZtuArvn6XYxy8WLvfDi3n1ULFBu6cugwRZp4UJF0KAi1UhQ+oNydpfNWLBnkoasPbbfTA2XBzklXfMhQuvaMqBvOa+Xji4xxsy+u7ObWnWlcPsZmtChhKVKwWPpxqSD3aaatkPq165ZyF1tOn0zYKKhEtE26/Z1qtZsM2s1vCgBmvu7YXxkeIgf/iTc+GCdzZZ55bJGLDmWwg5lfd7u16ZgnSK8C620nAXSbrFwsU/0MPM5YmZXB+sTe8MoHq1HuX0FCCkvSLhMrB8mAlfLzmnGtrmRdk+aMKH+rPw0Dd76M2qFwf5U3Ph7Zfa5jqVppC/3QOH9qZcY4rnfpNgne4ivN+06X/tIWulwOXH6JCyeIrww67VNf9VYD6H1TGCa7UaiV4bMtwsdoXVcdgHnPymGFz3sVa4/fNzoGN+1GrNifdqDPLEeHDIqMLVn54H513cwAekYX9p01x3HUjn7Pva8xMw2KMzuBExtEVVrKEvzjGoweGyYzTaHn36IvthX4C5TY8cS7iE2HA1w4aLXXIyms7W806Owg2faodIVGH9nD/2d/OZksXhBmhk+8N/7oFkkZBvuWs+vHV5g6XsTAoh98HRgybkeJ8Gv904RuGyjJM9EkIxQZeuXOs7Ud5AkuOH3erDQYKshkqDi8rNcrht81RY/dkO1lRnnXBzBD71lYXQgZB5/IDVl4epkieTxUG+9bPz4Nzl9WYViKpUo2wfe2AQjuxLw4aHhul50dKPRjBvTxWs8g7wYA1lCXTd7nBxqZcaSDzzdQUBy5XmSoMrlNvYosAtn5uDc09NO//Glgh88qsLoX2e3bLU25WB//hmL0xNGoEho+m99a55cM6F9dbQlWyGQv7uEIzGdYhRuPhZNGLeAIqq2GOLIWhmjnhmA/2wU70iaMcxkzMPN7enpDVoTIJbS+3KrX87x3PoSXNrFO78ewp5bsw6Nr1GquRuSBUDmbqAW/9qLpx1Xr05miEWoapVrA7vDC6qV7GHl4pUVhhw6f8TbsoVgZbcfOip4JweArRsZxyu1Hhv9rPSTbOsm743VkPg5r+ZA81thcfQ4T4Iua0jZg7vpFd29GAGHvl2L/qroiAvu7COwjWBsiErXNE4PklV7eCKDUhTQoPLqtrT696mgXBmtFSvFKXjo9EZg2sI0yyPTjAVy0bf02g5EiNw011zYM6CmG8oLe0U8j0LoXVO1AqUuvanYd39fZBJ+7N7eL4Hd6fg0Qfi8KvHxxjcCFduRAxAKy9c3GWcf6Q4M1rOJcjw0SFiPsmk/HBBDMYWXWDtei7CBYWwaHnh4qrAymvtiMJnqJIxmh4b0dmI/SP7M7DuO/1w+dVNcNJp1dDYHHG0DBmsOtS1LwM7tkzB6JDBQMaiJlwzoLLHDoNSPrj8gyG/1+sbMC3nXkUpP1wAe6S9ITJUWTuJgWpe+ck2OO2sGih2aZ0Tgztp4PXwvX3UDRkMSs+hDDz5gyGmiVjMrGahz5+cNFhkjHVfARAHmIl6LvO1PKExM3DZrv2+I3//iQ5yeEbgWvNnGA7lmlWiD9zeAmeGMHisjQZcn/jyfKZoDI6wahOjwVIVfalKBKaSWJekEOl2dSwK1VX07+IljSBkPpdXhzzhknDg8nrvkdAVTH/poCuskOGKhgMRLZsz3phjelesamF9jsNa0CefekYNaxjAAMkczwtizgbTTxP7vajxMP8KuZOwFIRbKDsVIL6hluVw6IBpge9WopHw04/EDa5umeVs1gyucLD2BVc0hAY3nTJg40PDcLgzYw3adgITUYzFWLEbDKzZdRR5Vp3yw8WFlsne0AFPTmW3N0l1zbDgEiKZZd4yhNMkZHV7VOD5f1EH77y6KTS4iTEd1v9LHIZ6dTMC5iPzVWnWnNz5C816lZLTCCHDVJyJqrLBNauvqZ2h++Cu7hF8ikh3uHB5V1UxZxU3y5pIQ1L1nr28Ft57Y2tocAd7s/DIvQOs8YGBjUoj8i2fyluCImZzX4TPu6EodqBl5pa54gOBKg0u/Xpv/9HxwZIBuz2IkaptU3hm2dzAvsOsVc+wZ71h+WVs9ltWDdfc1haod6TXcnhvCn503wBMjBtUsRETLk9QIMyINC2SwttyMYBSeDJZUeyXNVMSmTm4PMB6yW5UMv+qqPmTl54Kdj6bj/rITWHBJURMDITVIsMaMK1x04xjelfe0W51Py112bFlEn78vThoGTDhxsTMOLyaoyp2vynJvypSN5vpc17NLFyzO6/xknuO3Nwb5/EoCNhtBjWc4SWd0n4XjnLtZIY93NOe5qhtfgRWfaaDpQPDWDb9PgFPrRmiF2tWh7zgEsccsgEm+S47XFySY6k/oHegFmYaI5XDRVa+fbB4aAQu+w7EaVWJHCwdrmVwrP5T1kBp+unKT7TnNPsVu+B5/GbDCPxu45hlkmPC50bd4SpK5cKlhzp09MDIIb/Xj+wCG0AK4ekw4BJ5uCex54x88/k1bFxPqQtG4hsfjsNLf5jgiYkIb/WxI+bZBJeVfdb4tfM63ZQcOIoWTwZB6Wcy+lMlwxVtvMBnfxWpSQp56bk1JcPF3PFPHhyE3a+mWPusmaWyo2VFVIlyfG5lw8U3U5OZX+bA48EVvRaCL5wRT5hnwcy3gnHyLVzv2j2AE591Fm+WSc5oO2tMLx+Z3z4/VhJc7CL7yH39cHR/lqUerapQhCuXTVAGVlttzuxkFQyXltP+Q7vjW50RtBcrV8DyLGluVSVm/nTjsVLgig4pIpIWXVyFPy526T+agTX39sPIgGHnl6N2QCX3kZpWz6lguDx79TibutoRYGEVCSNoNepuqvMqWETSWFUSgRbKH8PwkZGp9WgJi4Nrf2aAPUG3CZuwWV2LWQ7sTsHa+wdYI4Hlc3kwZZpl4XNh1sGlJZQa7p/4z0L+V0wiLgIsZOfbRAubzhIGR0aHqNp+WgxcK37mg4lEzw2Dp7X2bJ0KDHfbixPw+PfjNAhRWGuQgCvMsmL1T56VcLHu+9RgT2LYy//mYxUoikbbjncIOvNkMvNvIE1i7Beu7X+n74s9xJYuC9YU+Nwz4/CLtcMsG2X53Ig9va+Y8XW2wsUyTo6mH5L7y7tlsESAJftfX4DRDzszWmgK9u6L76Eq/nlQ5Trz0BZcetZXrW6Ft1xQ5wss+utfPzECf/yvcQY2xpMXtlm2Gw5mMVysWTzdtW94Ly+jaQkO4X+jLj4Y2bkCFoGWnNGS/bDVqpFI30tw+nH54VI+4E5TLv3vkhWNcP7l9VbB//5no9C5zd1c9x7JwNpvDcCrz01yuBGeyIjw3PLMw502g0EIcDGeTYymvjMtcFJN0E7T7PS/7LMg5hBtOw6LwANpGlVxZ3zv295+0qP0h+5w3seFClCUuaip1DbYcx488+QIvPynCWZ+O+bFYPFZ1VBXr0ImA3D0QIaN+42wrjMRq6VHtAKZz04AC649oqC8cKFQdi84XPS9j1P17vcyz/nqvxb0oAEN2ngtqytoEnRdIYMDyW/Mnd94A1hjl/wrF0mo/GEXz/5qggEZHtBg2/MpZnLRg4yPENi+KWUPoqYfV2O3GkmpYgRB/t6Msw8uXcYHuxP3SUVlmWexdppnp//1BIxmGkca5jY8aGzMC1Mw71x99OjYUGt73T9RNX3PL1z7GUQ4WS4FxDyFwSAbulnNyfHPIEZ+iMFcYGWicsEeN3Ahk9a/Fu9NjjifzpMvenaaZzELfOBcNJoAOZrGz17f1veYYRh/9gvXttFcgRHF6sBGj2v51Sr+Yj6Wd3ZjLxweokoN9ccZXBpAbtq3rX+9U72yeRbNg3L07DTPgUy0yGpNTWQUK+mRNc20ljHI6Ejqrta22mcxN+KnAEXkjCbawF4TqEbFYEl/IktXHjUpuskQP32iZidcjF1HBifvNjAx4KJeObgS5lkOfOUHdRSsJuWLpuXGB7yD8AcP7B86TM3Kl/wVoARHFX2KweqCaqlZ2raqPopiDQ0xu6qKOPy4gEtdoHZP76HRrkLqdQuu5KZdwSywiRbhtzDTeAeJPOhrr/b+VNfJTwoVoPyMP9W8My0/GuFdZyLyI+SkwdQq79qav0/U7IWracYT1DRv4NbLt3pFcOXMVwQCjHeEkH4+FeOd1bkn/iVCyCsFC3DaAx2lPk/Se+sBU259oqY9pmb2wqUmeeuRPUNfySmiItTrfMROQcBeT7Z0qhh/ODGeTsUHJz9Kv9STrwCdj3oD6emeiuN9XliQBy6ZjXChd6hv4o7JJNb0TfXKcGX1speLevOxC1QPdlaZWDgvJT5YVEeDgwP7h7urqiI3NbXU/IpeT5MXXB/jcILBhdkFl/5UIjE6dVt/11iPm2kW9V65WdBNvW4PyPJtot1U7OaLhanG1+5dgzuomlfjYOUTcKfD5f0dJpLj6Vu69g7vymeaTfUCyem14cP3CmaBgyw3X+w01cJP7Nw+8PJEMnMz4Ij0Nyhckgcu/WdiIpH+y8O741ukuCSvaZazVnK9N5/vDRxkOVUsWplyOgM4Ai6883Zs638+kUjfSC9o7I0IF9zhjlPl3nRoV3yTE64zanYLrNyyVvlYFdWt3HmnOFWMD1IUJgVPcBdV8tjI1AdpGXYf93CJN1xiQPf4yNSHnMrN8bdgwxXlKB5OmS9rle9p4IEAe6nYzVTHYoohIO/ZObizrzdxFa1CveY1g/ushwtecMlr8d7EtTk+l8PN53dZGeYxzYXUW5SCndktJ+QcUy35Yzz5roOjfZ074tfqurH+DQUXh8ZqxhMHdw2tHDg63lcYbq7flU1z0Me8lzTyx80sCBXjE6vZiVXhmvqRqGLgiY+PpVKbN3XfnU5pd2He9Q0AN0Gv9XM7N/d+cSqZTvmBi2WFZWaWnf30b7c6bz7TXBLgIKZaDroEZLyQrZt7N8QHJ9+j62TT8QrXoNc2PDDxvs6t/RtVuX7rA65blSiIabZ+Kugj3uXFOfW/mB0eZ1jDdmP2qJdJ88HG+IBjcz5FUHSNqOaU9PQaI4q67G3zb6uujv4DPcPm4wTueHpK+/re7QPr2QzluSlaK1r2glvoid+FTHMoJtppJryULCJrp5KJTgyq5h93HR67hPqpdfTStVkMV6PX8GjP4bFL92ztfzwHrtk2Egiul3ILmeZQFCyrWChZTKAmK3kyoavsydUeShaTei1Z2n5GU2vtF+jFXs9uwNkB18Dej7Qq+EDXvpH9qjPd6DDJPN1eEG5dY8SQ4bolNLzUGwrgUiHjGmdqk0Hj9hlntS9paq75jBpVP0wPVV2hcNNUsRsSo6mHj+wb2ecF1k21oipULrihAS4GMpvbOGOo+SCDWW9UFixq6pi7oOHD0Zh6Ky2pMyoBrkHIPi2rr4/3TWwc7EkM5QPrpVoZroiWw4YbKmC/kOXACyHjDKnZLFGdkHl5KmJWVezAsvQtc95a11B1HS2M90POU2CCw3V9xI8HXHoeh+j5PjOZzDx9kI/yKwRWVq0z/SgnMQRct4CqFLihAw4CGZVMt1UB2ctkCzUL0Lhe/Ka20xqbq98ViUQupIV2ES3QBWHCpV/vo+fygqYZLyfHUn/q2m+OrFddmvPygfVSrWjXddZzw4RbFsBBIRfyy7xBPC9osVBTPqe5rfbN0arIWRTCKYqinEILtIPu1kYLHftsx2jR1/HSwceYZekxRumBRgwCg/S4R+jN1pXN6LvHR6Z29Xcn4q4wXaB6gZXbc/P523LBLRvgYiF7qTkfaDfYQEApxzXlgxoErGySyw23rIDdIDuTIfi+WNDCRzthuwIPCj6PchUnYAmq8LHFgHVr+gsDbtkBF4KM237UjPvJoGWoTthuwD2h5yuYPF1n7HtgOlRzbYM1/15YtbhfOeDOCGAvyE6Tje/9gjZB2qqWYTuB54PuWTCOkXvynBiq6mi/zRkIVhisaEN3muSw4c4Y4HyQvdTM8n4uoE2QxHrEuQzbCdJwmere64FSTpD5gAqlCpC4FqaYfeYCVrS05VNtOeDOKGAnZC81y77ZDTSD51C1G+xilOtpll2gymo1P8sPVva1+VQbJtwZB+xHzX5As20HbBmwE3iuqS6gYNVNwdOBCqXKUHE7CNhyqfaYA/arZmG2BWjZRwvgTthuwMUiwBdaBEgnYHmqIidUsZZ9rAArzPFMqbYiAPsF7aZoAToHsgTbBjodut/FCVNsu0EVanWClfsrzzTYigHsBtkLtJuq3YA7t53wvRbnhCby8EwnUC+1eoGdCbi4/L8AAwAMbKghZGpyCQAAAABJRU5ErkJggg=="

/***/ }),
/* 100 */
/*!*****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/guide.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUxMzYwNUM3NjUwOTExRUE4MjAzOUJCREY0ODUwQjhGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUxMzYwNUM4NjUwOTExRUE4MjAzOUJCREY0ODUwQjhGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTEzNjA1QzU2NTA5MTFFQTgyMDM5QkJERjQ4NTBCOEYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTEzNjA1QzY2NTA5MTFFQTgyMDM5QkJERjQ4NTBCOEYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5kYw0LAAAhFUlEQVR42uyd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"

/***/ }),
/* 101 */
/*!***************************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/icon_homexuan2s.png ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAyCAYAAAAJHRh4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRCMDQ0QjIxNUQyNjExRUFCOTBFRDhCNzE3NEI1ODYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRCMDQ0QjIyNUQyNjExRUFCOTBFRDhCNzE3NEI1ODYzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEIwNDRCMUY1RDI2MTFFQUI5MEVEOEI3MTc0QjU4NjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEIwNDRCMjA1RDI2MTFFQUI5MEVEOEI3MTc0QjU4NjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz76cE5DAAAI30lEQVR42sxa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"

/***/ }),
/* 102 */
/*!****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/join.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU3MzY2NkQ3NjUwQjExRUE4NjdCODNFNEZERUVENUMwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU3MzY2NkQ4NjUwQjExRUE4NjdCODNFNEZERUVENUMwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTczNjY2RDU2NTBCMTFFQTg2N0I4M0U0RkRFRUQ1QzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTczNjY2RDY2NTBCMTFFQTg2N0I4M0U0RkRFRUQ1QzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4c0NBTAAAgNElEQVR42uyd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"

/***/ }),
/* 103 */
/*!****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/like.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNGODRBRkRCNTYzODExRUI5QjE5RTU1RTA0MEI5MTY5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNGODRBRkRDNTYzODExRUI5QjE5RTU1RTA0MEI5MTY5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0Y4NEFGRDk1NjM4MTFFQjlCMTlFNTVFMDQwQjkxNjkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0Y4NEFGREE1NjM4MTFFQjlCMTlFNTVFMDQwQjkxNjkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz76R8TCAAACf0lEQVR42ryXX4gNURzH545tE6LdiPx9s0hKPG6hvPjTloQtKbK0byKrvXd3Je1eXpQtktpdXq4t7YvYFFqb5cELeZN4UVtEWNRq17/Pj+/UmOa6M7P3zq8+nTlz5pzP+d2Zc2ZuJpvNOkWiGhbADBiFL2EX5fP5f+q5XK6WYj58hre0fw/rVxVybi3YbLbCTJ37Cc+gAD0wFpDZBJthD6zwNX2g7cbf+eVf+vtkfBm70AUndGzxGsahztfnPbTAVZim4zaYpfaPlinMhoU6NwHHkF/0y/5MQAO16txldVqmDOyX2QGDMBeuKPu7cEbSAdjM4LWwEhZRX65x7bZdIPvOYMatGuArbIGHTvE4COdgjurP4TiiwWIdEDZS9Ku6i2sHTLyEyguYDtuVValYCvXwBkYYaLJUB+RHKM7r9tXZz9okaX9EqXfvr8FQFKme/m6Ke5r0bhM3qK3HqXxcV9lg4tWqjKQgfqRylasn1hb7ZAridyrnmfiH1lxVCmJvJYy5eqIt1qQgXu8tQVebgMX+FMR7Vd52tbM42plqKmVkHa/TPmGbVMHET+EmLIbuCmZ7SmUva/qTt1cf1Uz2waUKZNunbEe9CXjiV3AYfun1tq2MUkvkAHyDnZatX+xoy8zp+BZsKJO0WQk1IX0cfC16cda2VR0Pw8YySgv+djekT5s+CCzuJ5GHSPuC17hF+rZDZxJ5FOn/xBYdceVRpaXEYfJN5ZBGEQflQ2HyuNLgV2apOK1JOJIP6zi21In5Kjypr9F23z1vTCKNK/Z+9oyWnJexSQ/FkUa9x2FLrcv3D8OkvXEHSfrVYfI79mJB+iTJAFP53HkwlX38twADAMYs1HmEv31BAAAAAElFTkSuQmCC"

/***/ }),
/* 104 */
/*!********************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/like_red.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRCODg4NjZGNTYzODExRUI4NTQ0OTU1NDMwQUMwRTg1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRCODg4NjcwNTYzODExRUI4NTQ0OTU1NDMwQUMwRTg1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REI4ODg2NkQ1NjM4MTFFQjg1NDQ5NTU0MzBBQzBFODUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REI4ODg2NkU1NjM4MTFFQjg1NDQ5NTU0MzBBQzBFODUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz75B/8YAAABqklEQVR42sSWzSsEYRzHZ4ckDkqEAycHycWf4OC6B+KgFIWLUnIg78XiwM11l8u2JTcHxc1Nabmwm5eDsgcH8lYcsL6/+o2GZmeeZ2afZ771aaaZZ+bzPM/OPr8n8j7WZRRIGagHFSAHXg2xVIM68ALuwadTI9PhWjvYAY/gFmTAE0iDCVDl8Ax1cJHbPoALcMfiBGh2E9P5KjgBPaDy3z3q0Dq4BgN8vQRMgSuwAFocRj8IzsGo/UYpHyNgG/QLTGUN2AKdoAF0CDxDP9smt5+1iycFpfb0GfKZAWdgl6awkadJVzZAOYmH6ESjuAn0kjhq6E+UxG0hiFtN2wemM7Uk/gpB/EziyxDEWRIfhiDeN3nF0pk3kCTxKdjTKI5T0bGKxDj3RHVyXMV+q9MNGAF5hdIP0M0l9k9ZTIFpRdI8L83HhTYCa2BFkTTptQOh0hUrsjQhsvUxuFgvq5K6iSlzAeSuUi+xX7mnVEQsKxeSioot+VKxpDJiyrzLyKWksmJr5DEH6bCM1I/Y+qtZ8m+WxmVf4nfbQ/IDLixpPy8Ist86CrK6/AgwAJn/Wmx0n+0HAAAAAElFTkSuQmCC"

/***/ }),
/* 105 */
/*!****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/load.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABR0lEQVRYR+3UMUvEMBgG4Pcr/RXirrgpJy5uOojDDf6FliRFcBVuP4SbBB3yBX+BiziIIMoNcougu+Dq6uJy030SaaEcKie06ZJsJaXv05fkI3S8qON8NAJwzo1FZAnAjYiM0zSd5Hn+scjPNQJg5icAm7XAKYC72Ww2Kopi8hekEYC1dg3AVpIkPRHxkDpmpLU+/g3RCGD+49baPQCnRLTi90Tk1Riz+hOiFUAVxMzXAPrl87PWujePaBXgw5xzfRHxEBDRkVLqrI5oHeDDmHkAYFgi9pVStxUiCKBE3APYAfCWpulGlmWf36BF7moT7zDzNoDH8lDuGmMeggJ8mLX2hYjWRWRgjDkJDnDOXYhIRkRXSqmD4ABmPgRwDuBda70cHOAnZpIklyIyrWZCsEMYdBT/59bEBmIDsYHYQGwgNhAb6LyBL2d4ZCF46cgCAAAAAElFTkSuQmCC"

/***/ }),
/* 106 */
/*!*****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/local.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM1NDY3RTY2NTYzNzExRUJBNEI1QThDOEZEQ0U3QTk2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM1NDY3RTY3NTYzNzExRUJBNEI1QThDOEZEQ0U3QTk2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzU0NjdFNjQ1NjM3MTFFQkE0QjVBOEM4RkRDRTdBOTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzU0NjdFNjU1NjM3MTFFQkE0QjVBOEM4RkRDRTdBOTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6a7bp6AAACMUlEQVR42qyWzytEURTH37zGj8UU+bkhllbUrFixGNlJrGShlJUiM0jjx8LQNJiHZmXLYlgqFkL+BAs//gFJiJCNacT36CzQvefd98a3vk29e+75vHvnvHNvIJ1OWwYKwd1wFxyG6+Ey+AW+hs/gQ3gvGo2+uSULuEAJNgmPwuUGL/cMZ+BlCW4LCVrhc3jeEGhx3Bx84ThOm1doD3wKN1r+1EDzAe41hbbDu3CpVZhK4CzAHW7QCgYWW/8jyrMDcKUEXYBrhSS3cJwruI5/4/xcJ8q3qIPS4LAweR9ugpP8idzQL6o0yc8PhLlDWG2tCtovbCtB+uBX1SDA9LyX43TbPKCCRoQ3pS3MSX8ewDmO0ymigjZrgt/hI8PCOeZ4lVpU0BpN8AP8YULEavMcr1KlChrQBFfBRSZQFAvFVbs1IvvPilSiJtFpuL2d3BRUuldBL4VkCbeGgVUWc5xOlyroiTAhzJ0qpAGGeDws5DhRQbNwXphEh8AVHONKp4+9GcAYP+8R5uY5/7eCPwboMN6i7iFMpsN71UcP3kZlX+t6L33cj9b/6gmekRr+HTxo+l0aiPIMYpW3bucpNe5x+LNAIM0fAXDf9OaQ4YIpBDgG4KbXO9IaPOETOA5gxs/FjERXxSmPUPCiG1KAbZBkBZ42BMYAXHcLsg2TpVzOStIUgI5JMtvDttG1ZFYzNg3gimki2+P/tcSX718NBcCUlyRBH9WZ4AqlAnP4YuZJXwIMADQ9iXphWMNxAAAAAElFTkSuQmCC"

/***/ }),
/* 107 */
/*!********************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/location.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAsCAYAAAAJpsrIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU0QThFRDYxNUQyNjExRUFBNDhGODMzRjE5RjY3RjREIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU0QThFRDYyNUQyNjExRUFBNDhGODMzRjE5RjY3RjREIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTRBOEVENUY1RDI2MTFFQUE0OEY4MzNGMTlGNjdGNEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTRBOEVENjA1RDI2MTFFQUE0OEY4MzNGMTlGNjdGNEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5lQ1UjAAACyElEQVR42sSYy2sUQRCHZwdfkbhRkAQfN6MIYlQEkxg1j82aEG8G/Rf0IDmKHnygkFyUwPoniEcPuXkSL5qIR59RwUeioChx3Ywxgra/ghoZ4upUdc+j4Dtkp7rm20xv13QXjDGeMgpgL+gF+8A2sBk08vUAzIIX4D64Ax4A3Y1ITEgzuAheGX28Bpe5huh+kqRGMAa+GfdYAFe4ppNYD5gxyccs6LcVOw1+mvSCap/Tio2b7KIiFbtkso+xOLFh8CsHMbrnsahLIbKObQBPwFovn6iCHeAd/bEscuGqhdQcuAnugRmwAmwE7WAYrFPUagLj4Hh0gW1TPsIfvNiu+c+vmq5d4FzNI90dnWPXFYM/gi5Fx+jiMdK4EYoVQSActAg6FFIhHTxWEtRhmnw8zX6wWjgPKmDKYmJP8VhJNIAyifUJByyCUYdf3SjXkEQfibUJk2/zr9A25riGJHaSWKsw+VECa9VDYd4WEisKkz8lIPZZuqb5PNkkUUxATFpjFYnVhMntCYhJa9T8sDcJoge0OEg1g25h7nsSey5Mpr563kGMxi4X5k6T2KSi+AlQspCiMScV+ZPULnYp352qYEjRjoZ4jCb2hIMfW7yv0ytxS8x2r2Kxb3gafVE8Ba5ZPKIFcAvcBW/BSn7h7ASDiqUoGiPkEoo18M55k5dv0Aqxlb6wH/nmZ7z84yy7/LUZmTD5xcS/NiMU63n5aM34P/WS5+Wfflyoc9qznU9pihlJVblVTUc/9OskPgNHFD3UVWpgqVTcMdQBUEtxTn0BnbanPQfBfApS1An2u56PHVLsoqRSsds/ab/rTkjuq3RPqtkb9jrK1XjeekmLESVLuXmer15aYh4fUWrkAp6nXtpiRFkoF/D89LISIw7HnGQHPC+9rMWIAT4irydVcqntKkYMgu9LpMqudZMQCx/rG/ABHE2i5m8BBgBghEolb30eOQAAAABJRU5ErkJggg=="

/***/ }),
/* 108 */
/*!***********************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/location@2x.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc4ODIzQ0I2NjcyRTExRUFCRUZEQzVCQkRCM0FDMjVBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc4ODIzQ0I3NjcyRTExRUFCRUZEQzVCQkRCM0FDMjVBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Nzg4MjNDQjQ2NzJFMTFFQUJFRkRDNUJCREIzQUMyNUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Nzg4MjNDQjU2NzJFMTFFQUJFRkRDNUJCREIzQUMyNUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz43q2s5AAABQElEQVR42mI8e/YsA5WAHhCnAnEEEB9iodAwfiCOAuJkIDZGErcjx2BGILYF4jQgDgJiTixqVpBisBQQx0Ndp0xA7VxCBrMCsRc07DyAmJkIB4Ai7QIugzWAOBGIE4BYjMSgmgsikA3mAeIQqOusyIzM70C8HGawDhDnAXEk1HBKwFog/gAzeCc0YqgB5sIYTEB8mEqG3gXig8gGg3KKJhB3APEjCl37H9lgELgBxJVArAjErkC8AIi/kGDoHyBehCzAhKbgHxDvgSY1SSCOg/L/EzAYFE9P8RmMDEAuXgz1wV4CBs9BF2Ai0quL8Mi9BOKt5Bq8Dk+Ygyz9Ta7BX6GGYwPzsAkykRDz2ILjCDRFUWTwfiB+TIxrSTX4HzSVwMBnIF5NDYMZ0AxegS8TkWowKDyXAPFrIJ6ITyFAgAEATG08Vk3FqyAAAAAASUVORK5CYII="

/***/ }),
/* 109 */
/*!*********************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/locationy.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAaCAYAAACzdqxAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZGMzIxOTdBNjcyQzExRUE4ODc1QTZFQjczNEQxQjYxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZGMzIxOTdCNjcyQzExRUE4ODc1QTZFQjczNEQxQjYxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkYzMjE5Nzg2NzJDMTFFQTg4NzVBNkVCNzM0RDFCNjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkYzMjE5Nzk2NzJDMTFFQTg4NzVBNkVCNzM0RDFCNjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6b/UPNAAAB20lEQVR42qSWOUsDURSFJ2MKF7QyChaCJiBo0lraGBdEEBHEQguXys4FBS0UC3+AhX9BiyAuiCsIBiQYQSQoWGiRyhBQoxg1KPFcuIHh8e5kEg98JHOXE+bOvPfiykbbDEEeMAS6QQDUcjwBYuAIbICkrtmlMa4Ay2ASlBv2+gTrYAl8WBOmUugFETDrwJRUBma4xysZ+8EFfxYqP5sHVONKsA1qjOJVzR5VdOHm4IJ6Kxb9gBMQ5etWELT0WtUIFsE8Pbw6fHkApZrCOzAIbpV4C9gUxvYFfDSKEcGUXqt2janBsSDXqCKvYTLuEEawCp5sZprgGp06Tb4tnfYdPDCpptnkFabTqwNjqcZDxhkh6XNgLNVkyDguJMccGI8K8TgZXwrJcdBnY0q5CSEXJuMtIVkCQmBFeQ4ejoW4Rqc9WiC0gu551Uj6tYys3saQ9AiaTF6y03lmSUYNjJ1pFkyRZ24T2uF99b9aA7vqtkm/dPgPU1osc7r9mN7nAXBahOkx92akEyTNr9F5AaZnoB982x1NOfNePk3yKcy1aTVhCg3voMeyuesUkUztjEkp0AWuNbkr/lvwJjWbeW71hc1jltgNx1J2jW4Hc0zyaXHApwMdDM/5mv4EGACpMGH4hnbOlQAAAABJRU5ErkJggg=="

/***/ }),
/* 110 */
/*!****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/logo.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOsAAAA8CAYAAACHMU1CAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdDMTEzRkMyNUEyRjExRUJBQUVDRDJENUZERjkxREY2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdDMTEzRkMzNUEyRjExRUJBQUVDRDJENUZERjkxREY2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0MxMTNGQzA1QTJGMTFFQkFBRUNEMkQ1RkRGOTFERjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0MxMTNGQzE1QTJGMTFFQkFBRUNEMkQ1RkRGOTFERjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7aavTWAAAVcElEQVR42uxd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"

/***/ }),
/* 111 */
/*!******************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/mine01.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVENzBBMjI2NUExRTExRUI5RUM5ODE1OUNDNTJERTkxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVENzBBMjI3NUExRTExRUI5RUM5ODE1OUNDNTJERTkxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUQ3MEEyMjQ1QTFFMTFFQjlFQzk4MTU5Q0M1MkRFOTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUQ3MEEyMjU1QTFFMTFFQjlFQzk4MTU5Q0M1MkRFOTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz54xHC9AAAJsUlEQVR42txc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"

/***/ }),
/* 112 */
/*!******************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/mine02.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYwREQwODdGNUExRTExRUJBMEY2Qjc5NUU0QjkzMEQ2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYwREQwODgwNUExRTExRUJBMEY2Qjc5NUU0QjkzMEQ2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjBERDA4N0Q1QTFFMTFFQkEwRjZCNzk1RTRCOTMwRDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjBERDA4N0U1QTFFMTFFQkEwRjZCNzk1RTRCOTMwRDYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6QFi/aAAAK90lEQVR42tRb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"

/***/ }),
/* 113 */
/*!*******************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/mine03_.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYzRjcwNzBGNUExRTExRUI5NDNGOUFGNTZFRTA5REY0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYzRjcwNzEwNUExRTExRUI5NDNGOUFGNTZFRTA5REY0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjNGNzA3MEQ1QTFFMTFFQjk0M0Y5QUY1NkVFMDlERjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjNGNzA3MEU1QTFFMTFFQjk0M0Y5QUY1NkVFMDlERjQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7FB3yTAAAJLUlEQVR42uxb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"

/***/ }),
/* 114 */
/*!******************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/minebg.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAFTCAIAAADpwx6rAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ5RTdDRjkxNjk4ODExRUE4RjVDRkI0MTQxQjA3RTc5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ5RTdDRjkyNjk4ODExRUE4RjVDRkI0MTQxQjA3RTc5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDlFN0NGOEY2OTg4MTFFQThGNUNGQjQxNDFCMDdFNzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDlFN0NGOTA2OTg4MTFFQThGNUNGQjQxNDFCMDdFNzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4FkotOAAAOKUlEQVR42uzd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"

/***/ }),
/* 115 */
/*!******************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/moment.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA5MzUzQzMwNjUwOTExRUFBRUI1RjczQjlFM0NFQkNDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA5MzUzQzMxNjUwOTExRUFBRUI1RjczQjlFM0NFQkNDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDkzNTNDMkU2NTA5MTFFQUFFQjVGNzNCOUUzQ0VCQ0MiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDkzNTNDMkY2NTA5MTFFQUFFQjVGNzNCOUUzQ0VCQ0MiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4SkrhNAAAkMklEQVR42uxd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"

/***/ }),
/* 116 */
/*!****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/play.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABFCAYAAAAcjSspAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFCRjBEMDVBNjcyRDExRUE5NTE2RTE0NDU1RjVCRDM2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFCRjBEMDVCNjcyRDExRUE5NTE2RTE0NDU1RjVCRDM2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUJGMEQwNTg2NzJEMTFFQTk1MTZFMTQ0NTVGNUJEMzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUJGMEQwNTk2NzJEMTFFQTk1MTZFMTQ0NTVGNUJEMzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7HjgIDAAAFcklEQVR42uyc228UVRzHz8y2rG25VdtqWkzlYsUQtNH2wSaAMV5INCFqffAfqBp98tEYDRF95Enj5S8w8fpiAlEeINFoQEg0SCsFutUSIxRrWykd9uL3y/5mU4ftXs/MnLPrL/lmtjvbmXM++Z3fuR/H8zwVkbVB26G7oD5RF7RO7rVAaWgJWoAuQzOiKWhc7oVuTshQCGAXdB90D5So41kZaAL6GTomoKyBshZ6FHoE2hoi8PPQEegbaNFUKBuhfdBTULuKzq5CX0FfQnOmQFkDPQs9ByVVfLYMfQJ9BnlxQnkQehHqVebYRegD6MeoodAjxqC9ylw7BH0kHhQ6FHrFa9BmZb5dgN4R76nY3CpfsgM6aAkQJek8KOkOBcowdEAaWzbZOkn3sG4og9DrUtPYaGsk/ffrgsKW6BvSDLfZmP43JT91QemVByVVY1hS8tNbK5Sk1DIbVGPZBslXshYoYxbVMrXUSmPVQhkyvGGmw/auViO5q4x7vKKaw16W/JaFws5dd5NAYT5Hy0G5VaA0kz0j+V4VyqjFDbR6GnajwQaNb+uhx3W+zXXdbuhex3E6crncbCaT+RXXOQPBMN8fQ/NBT3msWNCpeUzCcZKJROIBXNfm/3S6WlpaRqBBfG4zDEqb5P+m4qPVS5Bxel6iyPe9ALMbwAZUfQPZuu2JIJRt0CbNL3FK3EugWG1rbW19GNc7y/w2KusTDgUoI3H1ReAxO+E5uxh/DAAzshLKUJwpYdwBnGHAGZYYFJcN+bUPE7HFhEININ0A05XNZqehSdRUyxEngRw6CGXAkDJdYIOi1A9tAphzqMY5zpqJ6t3QdhaffkMbVQzGAwjGu3GNcgpliytR12RrQ7wZZBsHxaszgvf1uyFUxWHFm40A8xDEBmGY07I9jCmdyiIDkDsApgfxJoV4M4mvrmt+RSehtCv7DGHG3Qz1Ac5ZwJnGdzlNz17P4nOLzT1cgNkBz9mDa4+uGOZa6inBItWOYDwEMLdrqfVUfklVQ5j0o+q1DKFcU41jOoLukusPrDSAeQi45zQ8Z561z6wya9FNtZZDDfQbayFNfaW/COV3aKeVNHK5S/COM7jqXAj4J6HMWAhjEZ5xBroUwuNThDJtEY9leMZZFheNjbWgnSeUCXmBYzCMDEBckEAa5jACOYwTCssjF+puNbSoXASMCVyjWIJODv/48z4nTIMCCFcAYzzieaITNxqB8sd3BsG4Chgn0+n09zFMnN3g4HvKpNRCcQ44Xee4LICk8Dkbw/tnhMN/JsMOxwQDLLJT8IyjMh6bjSkdhfyvhPK1qmF1cp1F5Q/AOAYYv+CzF6OXLkv+b4Iyr9lbMiVgzAPEDwBykjHEgFB2eGUfMLgUg7sgPE1lYq5I83sJMH4CjG9xf9aUjqTku2DBtbFXVH5ryPM6PIXe4Lru3VxlAECXZdgwo8yyzyXfBSu2YYHLEt5XzbHEi32nl1Rgb2KxNW/8wbuqOew9VWSzpluiZXeowYEwf8eL3Si1uJgbiKYaFEhK8qeqhcK6+23o7wYDwvwcKNUmK7dhgTuq9kfdqAu5kbZfldkpVsnWFo63vKXsnwpJSz4myv2w0k1Qp8TlPEuBeJL+U5X8uJrtcozU3F21YBmQBUn38Ur/odqNlaehV1V+F6cNNiXpPV3NP/2/L1kjFN+4mvAFZd4O9g+lAVqT6TrrgOccxL3ZgRn5VEdPX/epGE9DTyqNa/wrMPZdeCrGF8qgUzGC5p+fQoW5B5HBnmenHNFdI0Zx0s4elT89gwt365lw40QV52V42sVRZdlJO6tZh8qfycR1u/6ZTLep/PIyiiuqODR5TcSROf9MppS0RBejSOi/AgwAlb/Oj5uIlqUAAAAASUVORK5CYII="

/***/ }),
/* 117 */
/*!**********************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/play_guide.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQzQkE1RjJCNTk2QzExRUJCODZEQ0RDRkJFMkM1RjAxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQzQkE1RjJDNTk2QzExRUJCODZEQ0RDRkJFMkM1RjAxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDNCQTVGMjk1OTZDMTFFQkI4NkRDRENGQkUyQzVGMDEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDNCQTVGMkE1OTZDMTFFQkI4NkRDRENGQkUyQzVGMDEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7H4U2nAAAFVklEQVR42uRbX0hbZxS/uZqYmESJNUNYuqQVmW4zT+uwbD5s+DKfBsJAGT4MLJ1IfBMHQxhYhQlWpBNUCjKDL4sS6RAmTjfoZlAT0W4DZW20dUsgayXaaExisvNt58rdbVz+3n/uwE/ExHvP73znO//udxWJRIL6P0kh+WEymfi6vg5gAJTg78UAFUAJUACItaOACOAI8BxwANjH3/khnGchBIkFKwDqFN9VoAFUaJCXWJ+FAX7AHhpAUoQLAK8ArgC0ebomMZYFEQJ4AY8Bp2ISppFkJaCIx61HjPgGoArwEMnHhSZcDqhFVxRKiFFfQ296APhTCMI03vSKiMGWGPk6rvSvmax2poRJlH0TUCqRLEOMXgZw4z5Pa7XSFZJa3pEQWUaIPm+jfnkjfAkvWkRJU4pQv0v5IEwsd42nnJ3vmuJaqpVORViLwUEpk8pRifpqsyFcgAFKJbNyWYV6F2RK+PV0A4EEpQT1T5uwEWCWeWNkRh4pCZO/WS9IN2jlcqTPSebFF4RwMbcipJMEqsoL1vNXsgMYncTvcyouNBoNPTc39/H29vaY2+3+3GazvSqBouQsHinIiIc18Xgv1352YmLi/YaGhk9Yf0rs7u7eHxgYsDudTp9IpEmdvchdYUM+mncwnoU71TCbzfXDw8NfkpWvqanRikBYi/z+RdjE5x1pmi60Wq0fAOlR8IJGnU5XIDBpE5dwhSC1n1JZAi5/c3V1dbivr+8tAQlXsAmThlotpLn1ev3l1tbWz9bX12+1tbVdFeCWhJ+OIVwmVgg1Go21PT09t5eWlmz19fUGnm9XRrNqT9FEAVJVVdUwOTk56nA4PrRYLHx5m57t0uI3tIWF6rq6uo8WFhZGx8bGGlQqlYIvwhoplUZqtdrQ2Nhog/19u7u7uzaPl9bQrB5SclJaWnq1o6Pjlsvl+rSpqenlfDgRzRqPSFagmLk+NDR0B1z9Zo6FyxlhmpK4QFwrqK6ubpyZmfnCYDAU5ko4TslESP5uaWnJNm/HGMIxuRA+PT09WV5e9mdLmHGNCCWDYd3x8XHAbrff8Xg8B7kSPpZKLk6qZSwWWllZcXR2dt7z+XyRXGzGECZP241SIwq9+unW1ta3XV1dUzmsKlsOGcIHUiPr9/s9g4ODd6empp7k8bJnhJ9JhWgwGHw0PT39FTQUHh4u/4zt0mGhW0S2hMPh/cXFxUmorL6LRCJ8HC0i/J6zEzgJ9RYR0kxkY2PDabPZHDs7O2E+dwm3pNwTkjAEpITX6/2+t7fXPj8/HxDglntcwuRoEJnu8T5kCwQCD0ZGRu6Oj48/Esi+IeT3QtOwS/1zfoOfu4ZCvtnZ2QlIM8sC75xd6pwuiZyDIkeDsn4eDNXQC2ctotHoIbR4X7e3t3+zv78vdBkbRV5JuyTy4W+5XL2/v/8erOQff3ck8Xhsc3PTCc38jebmZqcIZCnkEz3rujhPHhgjvEvl8ECtvLxcCQ272e12B9bW1oIipnVyfnOJ3Q0mI0xhmVlHyV9cJEZyVzNpIAXsyJzsDpdsqknHL6TSkynZIOpPZUKY+L0be2U5SQT1jmdKmEnYLnaUk7hEUd9zjyHSabrHqgzGQDHU8z+3YbrTyqeAnwAnEiV7gvo9TfVFOsNA8KMEhwUHqFdaATbTeTTZG/fZpZrI8hj1CaX7D9kMtMk7BxuA3ynhT8RTrIHFz8nyLB+EGSHH73+ghHnngb1XRXvngcnVD7GqyfdbLdytJIm3Wthu7kWQp/iXsR7P5UTfEbrsE0qC7y1RnMkJoyAhTE6p63Gva/GeDGIshHBvHmJ6OeJjT/wlwABjWZpSKdkrYAAAAABJRU5ErkJggg=="

/***/ }),
/* 118 */
/*!**********************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/play_small.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODUyMThBMzI1NjNBMTFFQkFENjNDMzlDNjhFMzRBQTkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODUyMThBMzE1NjNBMTFFQkFENjNDMzlDNjhFMzRBQTkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTVBMzA4NjY1NjM4MTFFQjlEMzJCOTY3QjRBRjFGM0YiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTVBMzA4Njc1NjM4MTFFQjlEMzJCOTY3QjRBRjFGM0YiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4xM/XmAAAC/klEQVR42ryYT2iSYRzHX/+kZUOmW23Lw3TlIQZGI4LA2iWlDoPKCBdNDwNPgcFOA2+ednEgCdKhdli0w056CTKhdUmxWm0TybmIqG2lOzhX2dy7vk88honO9/V99Qcf0Mfnz9fnff58f69EqVQyPMIATGAA9IIOcAT8BAWwAdbAe/CRa6cSDiIUwAwsoIeH4G/gGXgJfgsRcRbcBl1M85EDT8CbehVkcrm8VjkpHAO3gIoRFqT9edAJVgDLRQR5xvfAOUbc0AMjnZHSQSLIFzc4zbQmuumijlfOSLWIsRbMQHUcA2rwrlwgrfhxCAwz7YlhOt5/Isg2HGXaG6N03H8izFy2oc1m63G73XqFQiEVQQQZ72LlmnDR069u6HQ6ZTQavWa1WgccDoc+n89vLy4ubgsUQg6/51K6WhuehBqNRi6TyaRUUGcwGLTG4/ErFoulS6CIAdLpYLM9mEymvlAoNBIOh81Go7HZQ22QiDgpZD4lCMyGMZFI3AgEAmfUarWMZxeniIgTYix13EGHxsfHh1Kp1E2Px2PEo5NwbNpHRBwVc99ptVoVRJiTyeSI3W7v5dCkQ0rvCtGjv7+/a2Zm5qrf7zc1qHpYSg1JywILtrNBlV9ExE4rBi+VSuz8/Pyy0+l81aBqgZxUX+ntJlrEYrFPExMT2DCJPIfq60REhvpGwZHJZL57vd7E3NzcBo9mq3Lqdq4LGTyXy+34fL7E9PT0GsuyfJuvyKk73uRpYv9GsVjcnZ2dXZqcnFzGXbLXhH4y7lrZ0RBXfKfBQtsvf8a/ZSORyCqe+9t0Ov1DwCRGKm/RL+DCQaZ2a2tr12AwyLLZbMHlci1MTU2lSZlAF/4I7FVafuJ07rbR1NwvpwGVHnOd2nJ9GwS8AE9reUwSj8GHFgtI03HqWn6yv17T6727BQJSwF+dFtZKfkhiEqO2XC/yI3hQKy+tlwayNC/4TGdFJXAXPKRrgBWSlV8Cl8Fxnlk5OQcWhGblzbyfIO8lluhJvM+l0z8CDAAnPtXPgBEhGAAAAABJRU5ErkJggg=="

/***/ }),
/* 119 */
/*!****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/tome.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhBRDY5MTVGNjUwQjExRUFBQjUxOTA4RDlGNzE5MUNGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhBRDY5MTYwNjUwQjExRUFBQjUxOTA4RDlGNzE5MUNGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEFENjkxNUQ2NTBCMTFFQUFCNTE5MDhEOUY3MTkxQ0YiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEFENjkxNUU2NTBCMTFFQUFCNTE5MDhEOUY3MTkxQ0YiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6a+kI/AAAlIklEQVR42uSd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"

/***/ }),
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */
/*!********************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/utils/handleText.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.handleText = void 0; // 处理文字
var handleText = function handleText(text, clipLength) {var multiple = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
  // 判断text是中文还是英语
  var pattern = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
  if (pattern.exec(text)) {
    // 如果text小于clipLenth不进行切割	
    if (text.length <= clipLength) {
      return text;
    } else {
      return text.substr(0, clipLength) + '...';
    }

  } else {
    if (text.length <= clipLength * multiple) {
      return text;
    } else {
      return text.substr(0, clipLength * multiple) + '...';
    }
  }
};exports.handleText = handleText;

/***/ }),
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */
/*!************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/api/mine.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.queryTravel = void 0;var _request = __webpack_require__(/*! @/utils/request.js */ 21);

// 获取游记
var queryTravel = function queryTravel(data) {return _request.http.get('/videoapp/me/queryMyVideos', { params: data });};exports.queryTravel = queryTravel;

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map