(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

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
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

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
  interceptors: interceptors });


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


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

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

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

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
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
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
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

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
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"途咪vlog","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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

function handleEvent(event) {var _this = this;
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
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
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
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
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

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
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

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
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

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
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
wx.createSubpackageApp = createSubpackageApp;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
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

/***/ 107:
/*!************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/api/face.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.checkFace = exports.get7nToken = exports.editFace = exports.queryFace = void 0;var _request = __webpack_require__(/*! @/utils/request.js */ 21);

// 获取用户人脸信息
var queryFace = function queryFace() {return _request.http.get('/videoapp/me/getFace');};

// 编辑用户人脸信息
exports.queryFace = queryFace;var editFace = function editFace(data) {return _request.http.post('/videoapp/me/editFace', data);};

// 获取七牛云token
exports.editFace = editFace;var get7nToken = function get7nToken() {return _request.http.get('/videoapp/upload/faceAuth');};

// 人脸检测接口
exports.get7nToken = get7nToken;var checkFace = function checkFace(data) {return _request.http.post('/videoapp/me/checkFace', data);};exports.checkFace = checkFace;

/***/ }),

/***/ 114:
/*!***************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/err.png ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgYAAAIGCAYAAAAvP0egAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAzMTIzMEQ2NjEwQTExRUJBQkQ4ODdFMzM2NjBEQTc0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAzMTIzMEQ3NjEwQTExRUJBQkQ4ODdFMzM2NjBEQTc0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDMxMjMwRDQ2MTBBMTFFQkFCRDg4N0UzMzY2MERBNzQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDMxMjMwRDU2MTBBMTFFQkFCRDg4N0UzMzY2MERBNzQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4LvRiZAABfnUlEQVR42uyd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"

/***/ }),

/***/ 115:
/*!****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/cabg.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgYAAAIGCAYAAAAvP0egAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJFNUJENkQ1NjEwOTExRUJCNjUzQTM0QTM2QzJERjI1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJFNUJENkQ2NjEwOTExRUJCNjUzQTM0QTM2QzJERjI1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkU1QkQ2RDM2MTA5MTFFQkI2NTNBMzRBMzZDMkRGMjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkU1QkQ2RDQ2MTA5MTFFQkI2NTNBMzRBMzZDMkRGMjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7FDKo7AABbvElEQVR42uzd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"

/***/ }),

/***/ 126:
/*!**************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/api/upload.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.get7nToken = exports.submit = exports.queryUpload = void 0;var _request = __webpack_require__(/*! @/utils/request.js */ 21);

// 查询用户已上传的视频
var queryUpload = function queryUpload(data) {return _request.http.get('/videoapp/madeVideo/query', { params: data });};

// 提交用户定制视频信息
exports.queryUpload = queryUpload;var submit = function submit(data) {return _request.http.post('/videoapp/madeVideo/submit', data);};

// 获取七牛云token
exports.submit = submit;var get7nToken = function get7nToken() {return _request.http.get('/videoapp/upload/madeVideoAuth');};exports.get7nToken = get7nToken;

/***/ }),

/***/ 135:
/*!***************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/api/message.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.queryLike = exports.queryComment = void 0;var _request = __webpack_require__(/*! @/utils/request.js */ 21);

// 获取回复信息
var queryComment = function queryComment(data) {return _request.http.post('/videoapp/me/queryCommentMsg', data);};

// 获取点赞信息
exports.queryComment = queryComment;var queryLike = function queryLike(data) {return _request.http.post('/videoapp/me/queryLaudMsg', data);};exports.queryLike = queryLike;

/***/ }),

/***/ 150:
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

/***/ 17:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 18);

/***/ }),

/***/ 18:
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

/***/ 19:
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

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
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
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
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
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"途咪vlog","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"途咪vlog","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"途咪vlog","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
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
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"途咪vlog","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
    'onInit',
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

/***/ 20:
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

/***/ 21:
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
    return Promise.reject(res.data.resultStatus);
  }
}, function (err) {var

  resultCode =
  err.data.resultStatus.resultCode;
  if (resultCode === '0007') {
    console.log('登录失效');
    uni.clearStorageSync();
  } else {
    return Promise.reject(err.data.resultStatus);
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 22:
/*!***************************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/libs/luch-request/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Request = _interopRequireDefault(__webpack_require__(/*! ./core/Request */ 23));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
_Request.default;exports.default = _default;

/***/ }),

/***/ 23:
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

/***/ 24:
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

/***/ 25:
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

/***/ 26:
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

/***/ 27:
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

/***/ 28:
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

/***/ 29:
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

/***/ 3:
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

/***/ 30:
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

/***/ 31:
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

/***/ 32:
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

/***/ 33:
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

/***/ 34:
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

/***/ 35:
/*!*************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/api/shoot.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.queryPointList = exports.hasStartTrip = exports.startTrip = exports.querySceneryInfo = void 0;var _request = __webpack_require__(/*! @/utils/request.js */ 21);

// 查询景区详情
var querySceneryInfo = function querySceneryInfo(data) {return _request.http.get('/videoapp/scenery/get', { params: data });};

// 开启视频之旅
exports.querySceneryInfo = querySceneryInfo;var startTrip = function startTrip(data) {return _request.http.post('/videoapp/video/startTrip', data);};

// 是否开启视频之旅
exports.startTrip = startTrip;var hasStartTrip = function hasStartTrip(data) {return _request.http.post('/videoapp/video/isStartTrip', data);};

// 查询打卡点
exports.hasStartTrip = hasStartTrip;var queryPointList = function queryPointList(data) {return _request.http.post('/videomis/point/query', data);};exports.queryPointList = queryPointList;

/***/ }),

/***/ 36:
/*!*****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/utils/parseQs.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.parseQueryString = void 0;var parseQueryString = function parseQueryString(url) {
  var urlKey = url.split("?")[1];
  var objKeyValue = {};
  if (urlKey) {
    var urlObj = urlKey.split("&");
    // 以对象形式存放
    for (var i = 0; i < urlObj.length; i++) {
      objKeyValue[urlObj[i].split("=")[0]] = urlObj[i].split("=")[1];
    }
    return objKeyValue;
  }
};exports.parseQueryString = parseQueryString;

/***/ }),

/***/ 4:
/*!***********************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/pages.json ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 45:
/*!************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/api/home.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.like = exports.queryCard = exports.queryCurrentScenery = exports.queryMoment = exports.queryHotScenery = exports.queryBannerList = void 0;var _request = __webpack_require__(/*! @/utils/request.js */ 21);

// 获取banner视频
var queryBannerList = function queryBannerList() {return _request.http.get('/videoapp/video/top');};

// 获取热门景区
exports.queryBannerList = queryBannerList;var queryHotScenery = function queryHotScenery(data) {return _request.http.post('/videoapp/scenery/hot', data);};

// 获取精彩瞬间
exports.queryHotScenery = queryHotScenery;var queryMoment = function queryMoment(data) {return _request.http.post('/videoapp/video/goodMoment', data);};

// 判断当前所属景区
exports.queryMoment = queryMoment;var queryCurrentScenery = function queryCurrentScenery(data) {return _request.http.post('/videoapp/scenery/locationConfirm', data);};

// 查询热门景区 新
exports.queryCurrentScenery = queryCurrentScenery;var queryCard = function queryCard(data) {return _request.http.post('/videoapp/scenery/queryCard', data);};

// 点赞
exports.queryCard = queryCard;var like = function like(data) {return _request.http.post('/videoapp/laud/add', data);};exports.like = like;

/***/ }),

/***/ 62:
/*!************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/api/mine.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.updateNewVideoStatus = exports.updateBuyVideoStatus = exports.queryLikeCount = exports.queryCommentCount = exports.queryMySceneryCount = exports.queryBuyList = exports.queryMsg = exports.queryTravel = void 0;var _request = __webpack_require__(/*! @/utils/request.js */ 21);

// 获取游记
var queryTravel = function queryTravel(data) {return _request.http.get('/videoapp/me/queryMyVideos', { params: data });};

// 查询消息提示
exports.queryTravel = queryTravel;var queryMsg = function queryMsg() {return _request.http.get('/videoapp/me/getMyVideoNoReadNum');};

//  查询已购视频
exports.queryMsg = queryMsg;var queryBuyList = function queryBuyList() {return _request.http.post('/videoapp/video/queryBuyVideos', {});};

//  查询打卡景区
exports.queryBuyList = queryBuyList;var queryMySceneryCount = function queryMySceneryCount() {return _request.http.get('/videoapp/me/queryMySceneryCount');};

//  查询回复数量
exports.queryMySceneryCount = queryMySceneryCount;var queryCommentCount = function queryCommentCount() {return _request.http.get('/videoapp/me/queryCommentMsgCount');};

//  查询点赞数量
exports.queryCommentCount = queryCommentCount;var queryLikeCount = function queryLikeCount() {return _request.http.get('/videoapp/me/queryLaudMsgCount');};

// 修改购买视频的阅读状态为已读
exports.queryLikeCount = queryLikeCount;var updateBuyVideoStatus = function updateBuyVideoStatus(data) {return _request.http.post('/videoapp/me/updateVideoBuyReadStatus', data);};

// 修改新视频的阅读状态为已读
exports.updateBuyVideoStatus = updateBuyVideoStatus;var updateNewVideoStatus = function updateNewVideoStatus(data) {return _request.http.post('/videoapp/me/updateVideoNewReadStatus', data);};exports.updateNewVideoStatus = updateNewVideoStatus;

/***/ }),

/***/ 71:
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

/***/ 80:
/*!************************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/libs/jsencrypt/index.js ***!
  \************************************************************************/
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

/***/ 81:
/*!*************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/api/video.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.buy = exports.confirmOrder = exports.getQrCode = exports.cancelShare = exports.share = exports.queryVideoInfo = exports.queryShareVideoInfo = void 0;var _request = __webpack_require__(/*! @/utils/request.js */ 21);

// 获取分享视频详细信息
var queryShareVideoInfo = function queryShareVideoInfo(data) {return _request.http.get('/videoapp/video/shareDetail', { params: data });};

// 获取视频详细信息
exports.queryShareVideoInfo = queryShareVideoInfo;var queryVideoInfo = function queryVideoInfo(data) {return _request.http.get('/videoapp/video/detail', { params: data });};

// 用户发布视频
exports.queryVideoInfo = queryVideoInfo;var share = function share(data) {return _request.http.post('/videoapp/video/share', data);};

// 用户取消发布
exports.share = share;var cancelShare = function cancelShare(data) {return _request.http.get('/videoapp/video/shareCancel', { params: data });};

// 获取小程序页面分享码
exports.cancelShare = cancelShare;var getQrCode = function getQrCode(data) {return _request.http.post('/videoapp/qr/shareQr', data);};

// 获取视频购买信息
exports.getQrCode = getQrCode;var confirmOrder = function confirmOrder(data) {return _request.http.post('/videoapp/order/confirm', data);};

// 购买
exports.confirmOrder = confirmOrder;var buy = function buy(data) {return _request.http.post('/videoapp/order/create', data);};exports.buy = buy;

/***/ }),

/***/ 98:
/*!*********************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/libs/gcoord/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* @preserve
 * gcoord 0.3.1, geographic coordinate library
 * Copyright (c) 2021 Jiulong Hu <me@hujiulong.com>
 */
!function (e, t) { true ? module.exports = t() : undefined;}(this, function () {"use strict";
  /*! *****************************************************************************
                                                                                                                                                                                                                                                                                  Copyright (c) Microsoft Corporation.
                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                  Permission to use, copy, modify, and/or distribute this software for any
                                                                                                                                                                                                                                                                                  purpose with or without fee is hereby granted.
                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
                                                                                                                                                                                                                                                                                  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
                                                                                                                                                                                                                                                                                  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
                                                                                                                                                                                                                                                                                  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
                                                                                                                                                                                                                                                                                  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
                                                                                                                                                                                                                                                                                  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
                                                                                                                                                                                                                                                                                  PERFORMANCE OF THIS SOFTWARE.
                                                                                                                                                                                                                                                                                  ***************************************************************************** */var _e = function e() {return (_e = Object.assign || function (e) {for (var t, r = 1, n = arguments.length; r < n; r++) {for (var o in t = arguments[r]) {Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);}}return e;}).apply(this, arguments);},t = Math.sin,r = Math.cos,n = Math.sqrt,o = Math.abs,a = Math.PI,i = 6378245,u = .006693421622965823;function f(e, t) {return e >= 72.004 && e <= 137.8347 && t >= .8293 && t <= 55.8271;}function c(e, f) {var c,l,s,h = (s = 300 + (c = e - 105) + 2 * (l = f - 35) + .1 * c * c + .1 * c * l + .1 * n(o(c)), s += 2 * (20 * t(6 * c * a) + 20 * t(2 * c * a)) / 3, (s += 2 * (20 * t(c * a) + 40 * t(c / 3 * a)) / 3) + 2 * (150 * t(c / 12 * a) + 300 * t(c / 30 * a)) / 3),g = function (e, r) {var i = 2 * e - 100 + 3 * r + .2 * r * r + .1 * e * r + .2 * n(o(e));return i += 2 * (20 * t(6 * e * a) + 20 * t(2 * e * a)) / 3, i += 2 * (20 * t(r * a) + 40 * t(r / 3 * a)) / 3, i + 2 * (160 * t(r / 12 * a) + 320 * t(r * a / 30)) / 3;}(e - 105, f - 35),M = f / 180 * a,d = t(M),v = n(d = 1 - u * d * d);return [h = 180 * h / (i / v * r(M) * a), g = 180 * g / (i * (1 - u) / (d * v) * a)];}function l(e) {var t = e[0],r = e[1];if (!f(t, r)) return [t, r];var n = c(t, r);return [t + n[0], r + n[1]];}function s(e) {var t = e[0],r = e[1];if (!f(t, r)) return [t, r];for (var n = [t, r], a = n[0], i = n[1], u = l([a, i]), c = u[0] - t, s = u[1] - r; o(c) > 1e-6 || o(s) > 1e-6;) {c = (u = l([a -= c, i -= s]))[0] - t, s = u[1] - r;}return [a, i];}var h = Math.sin,g = Math.cos,M = Math.atan2,d = Math.sqrt,v = 3e3 * Math.PI / 180;function p(e) {var t = e[0] - .0065,r = e[1] - .006,n = d(t * t + r * r) - 2e-5 * h(r * v),o = M(r, t) - 3e-6 * g(t * v);return [n * g(o), n * h(o)];}function G(e) {var t = e[0],r = e[1],n = d(t * t + r * r) + 2e-5 * h(r * v),o = M(r, t) + 3e-6 * g(t * v);return [n * g(o) + .0065, n * h(o) + .006];}var y = 180 / Math.PI,S = Math.PI / 180,P = 6378137,b = 20037508.342789244;function B(e) {return [e[0] * y / P, (.5 * Math.PI - 2 * Math.atan(Math.exp(-e[1] / P))) * y];}function m(e) {var t = Math.abs(e[0]) <= 180 ? e[0] : e[0] - 360 * (e[0] < 0 ? -1 : 1),r = [P * t * S, P * Math.log(Math.tan(.25 * Math.PI + .5 * e[1] * S))];return r[0] > b && (r[0] = b), r[0] < -b && (r[0] = -b), r[1] > b && (r[1] = b), r[1] < -b && (r[1] = -b), r;}var C,D,E,w,I,W,x = Math.abs,k = [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],J = [75, 60, 45, 30, 15, 0],T = [[1.410526172116255e-8, 898305509648872e-20, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -.03801003308653, 17337981.2], [-7.435856389565537e-9, 8983055097726239e-21, -.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86], [-3.030883460898826e-8, 898305509983578e-20, .30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, .32710905363475, 6856817.37], [-1.981981304930552e-8, 8983055099779535e-21, .03278182852591, 40.31678527705744, .65659298677277, -4.44255534477492, .85341911805263, .12923347998204, -.04625736007561, 4482777.06], [3.09191371068437e-9, 8983055096812155e-21, 6995724062e-14, 23.10934304144901, -.00023663490511, -.6321817810242, -.00663494467273, .03430082397953, -.00466043876332, 2555164.4], [2.890871144776878e-9, 8983055095805407e-21, -3.068298e-8, 7.47137025468032, -353937994e-14, -.02145144861037, -1234426596e-14, .00010322952773, -323890364e-14, 826088.5]],j = [[-.0015702102444, 111320.7020616939, 0x60e374c3105a3, -0x24bb4115e2e164, 0x5cc55543bb0ae8, -0x7ce070193f3784, 0x5e7ca61ddf8150, -0x261a578d8b24d0, 0x665d60f3742ca, 82.5], [.0008277824516172526, 111320.7020463578, 647795574.6671607, -4082003173.641316, 10774905663.51142, -15171875531.51559, 12053065338.62167, -5124939663.577472, 913311935.9512032, 67.5], [.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.47186455, -115964993.2797253, 97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5], [.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5], [-.0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5], [-.0003218135878613132, 111320.7020701615, .00369383431289, 823725.6402795718, .46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, .37238884252424, 7.45]];function L(e, t, r) {var n = x(t) / r[9],o = r[0] + r[1] * x(e),a = r[2] + r[3] * n + r[4] * Math.pow(n, 2) + r[5] * Math.pow(n, 3) + r[6] * Math.pow(n, 4) + r[7] * Math.pow(n, 5) + r[8] * Math.pow(n, 6);return [o *= e < 0 ? -1 : 1, a *= t < 0 ? -1 : 1];}function N(e) {for (var t = e[0], r = e[1], n = [], o = 0; o < J.length; o++) {if (x(r) > J[o]) {n = j[o];break;}}return L(t, r, n);}function q(e) {for (var t = e[0], r = e[1], n = [], o = 0; o < k.length; o++) {if (r >= k[o]) {n = T[o];break;}}return L(t, r, n);}function O(e, t) {if (!e) throw new Error(t);}function A(e) {return !!e && "[object Array]" === Object.prototype.toString.call(e);}function F(e) {return !Number.isNaN(Number(e)) && null !== e && !A(e);}function R() {for (var e = [], t = 0; t < arguments.length; t++) {e[t] = arguments[t];}var r = e.length - 1;return function () {for (var t = [], n = 0; n < arguments.length; n++) {t[n] = arguments[n];}for (var o = r, a = e[r].apply(null, t); o--;) {a = e[o].call(null, a);}return a;};}function U(e, t, r) {if (void 0 === r && (r = !1), null !== e) for (var n, o, a, i, u, f, c, l, s = 0, h = 0, g = e.type, M = "FeatureCollection" === g, d = "Feature" === g, v = M ? e.features.length : 1, p = 0; p < v; p++) {u = (l = !!(c = M ? e.features[p].geometry : d ? e.geometry : e) && "GeometryCollection" === c.type) ? c.geometries.length : 1;for (var G = 0; G < u; G++) {var y = 0,S = 0;if (null !== (i = l ? c.geometries[G] : c)) {var P = i.type;switch (s = !r || "Polygon" !== P && "MultiPolygon" !== P ? 0 : 1, P) {case null:break;case "Point":if (!1 === t(f = i.coordinates, h, p, y, S)) return !1;h++, y++;break;case "LineString":case "MultiPoint":for (f = i.coordinates, n = 0; n < f.length; n++) {if (!1 === t(f[n], h, p, y, S)) return !1;h++, "MultiPoint" === P && y++;}"LineString" === P && y++;break;case "Polygon":case "MultiLineString":for (f = i.coordinates, n = 0; n < f.length; n++) {for (o = 0; o < f[n].length - s; o++) {if (!1 === t(f[n][o], h, p, y, S)) return !1;h++;}"MultiLineString" === P && y++, "Polygon" === P && S++;}"Polygon" === P && y++;break;case "MultiPolygon":for (f = i.coordinates, n = 0; n < f.length; n++) {for (S = 0, o = 0; o < f[n].length; o++) {for (a = 0; a < f[n][o].length - s; a++) {if (!1 === t(f[n][o][a], h, p, y, S)) return !1;h++;}S++;}y++;}break;case "GeometryCollection":for (n = 0; n < i.geometries.length; n++) {if (!1 === U(i.geometries[n], t, r)) return !1;}break;default:throw new Error("Unknown Geometry Type");}}}}}!function (e) {e.WGS84 = "WGS84", e.WGS1984 = "WGS84", e.EPSG4326 = "WGS84", e.GCJ02 = "GCJ02", e.AMap = "GCJ02", e.BD09 = "BD09", e.BD09LL = "BD09", e.Baidu = "BD09", e.BMap = "BD09", e.BD09MC = "BD09MC", e.BD09Meter = "BD09MC", e.EPSG3857 = "EPSG3857", e.EPSG900913 = "EPSG3857", e.EPSG102100 = "EPSG3857", e.WebMercator = "EPSG3857", e.WM = "EPSG3857";}(W || (W = {}));var z = { WGS84: { to: (C = {}, C[W.GCJ02] = l, C[W.BD09] = R(G, l), C[W.BD09MC] = R(N, G, l), C[W.EPSG3857] = m, C) }, GCJ02: { to: (D = {}, D[W.WGS84] = s, D[W.BD09] = G, D[W.BD09MC] = R(N, G), D[W.EPSG3857] = R(m, s), D) }, BD09: { to: (E = {}, E[W.WGS84] = R(s, p), E[W.GCJ02] = p, E[W.EPSG3857] = R(m, s, p), E[W.BD09MC] = N, E) }, EPSG3857: { to: (w = {}, w[W.WGS84] = B, w[W.GCJ02] = R(l, B), w[W.BD09] = R(G, l, B), w[W.BD09MC] = R(N, G, l, B), w) }, BD09MC: { to: (I = {}, I[W.WGS84] = R(s, p, q), I[W.GCJ02] = R(p, q), I[W.EPSG3857] = R(m, s, p, q), I[W.BD09] = q, I) } };return _e(_e({}, W), { CRSTypes: W, transform: function transform(e, t, r) {if (O(!!e, "The args[0] input coordinate is required"), O(!!t, "The args[1] original coordinate system is required"), O(!!r, "The args[2] target coordinate system is required"), t === r) return e;var n = z[t];O(!!n, "Invalid original coordinate system: " + t);var o = n.to[r];O(!!o, "Invalid target coordinate system: " + r);var a = typeof e;if (O("string" === a || "object" === a, "Invalid input coordinate type: " + a), "string" === a) try {e = JSON.parse(e);} catch (t) {throw new Error("Invalid input coordinate: " + e);}var i = !1;A(e) && (O(e.length >= 2, "Invalid input coordinate: " + e), O(F(e[0]) && F(e[1]), "Invalid input coordinate: " + e), e = e.map(Number), i = !0);var u = o;return i ? u(e) : (U(e, function (e) {var t;t = u(e), e[0] = t[0], e[1] = t[1];}), e);} });});

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map