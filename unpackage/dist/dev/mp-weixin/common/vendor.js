(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

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


// import navigateTo from 'uni-helpers/navigate-to'

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
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
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

function createApp(vm) {
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
var refreshAccessToken = function refreshAccessToken(data) {return (0, _request.http)('v/wxRefresh', {}, { params: data });};
// 登录
exports.refreshAccessToken = refreshAccessToken;var login = function login(data) {return _request.http.post('v/wxLogin', data);};
// 初始化参数
exports.login = login;var initParams = function initParams(data) {return _request.http.get('videoapp/init/param', data);};
// 查询消息提示
exports.initParams = initParams;var queryMsgHit = function queryMsgHit(data) {return _request.http.get('videoapp/me/getMyRead', data);};exports.queryMsgHit = queryMsgHit;

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
Object.defineProperty(exports, "__esModule", { value: true });exports.queryMoment = exports.queryHotScenery = exports.queryBannerList = void 0;var _request = __webpack_require__(/*! @/utils/request.js */ 21);

// 获取banner视频
var queryBannerList = function queryBannerList() {return _request.http.get('/videoapp/video/top');};

// 获取热门景区
exports.queryBannerList = queryBannerList;var queryHotScenery = function queryHotScenery(data) {return _request.http.post('/videoapp/scenery/hot', data);};

// 获取精彩瞬间
exports.queryHotScenery = queryHotScenery;var queryMoment = function queryMoment(data) {return _request.http.post('/videoapp/video/goodMoment', data);};exports.queryMoment = queryMoment;

/***/ }),
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */
/*!**************************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static sync ^\.\/.*\.png$ ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./arrow.png": 57,
	"./entertainment.png": 58,
	"./guide.png": 59,
	"./join.png": 60,
	"./like.png": 61,
	"./like_red.png": 62,
	"./local.png": 63,
	"./logo.png": 64,
	"./moment.png": 65,
	"./play.png": 66,
	"./play_small.png": 67,
	"./tome.png": 68
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
webpackContext.id = 56;

/***/ }),
/* 57 */
/*!*****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/arrow.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAYCAYAAAAh8HdUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM1MDU4QkE5NTU3RDExRUJCQzA4OUI3Q0U2MTc5QTU2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM1MDU4QkFBNTU3RDExRUJCQzA4OUI3Q0U2MTc5QTU2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzUwNThCQTc1NTdEMTFFQkJDMDg5QjdDRTYxNzlBNTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzUwNThCQTg1NTdEMTFFQkJDMDg5QjdDRTYxNzlBNTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4TAZ+KAAABRElEQVR42ozUyytEYRjH8XdGLGwm/gcbJSvNwko2klBKiLGZpJDCBrFhIeVSLgtl3BXRNC5JYmXjz5GiJuL71HPqXXjPc9761Pmd5nfqvU3qtlRsd86d4gUDKDtjpDGJGvTgCBVJSsf41dyHXaSs0hnGveIIVq2S069Pe+9nMG+VZGxgwcvLGLNK0Q+XvLyFIaskYxHr+iwLcoAuqxTNaUefZQsu0WqVZCUnUNBchRtk40pRUZb/XHM1HtGQNjb/BzmUNGdwZZVk1KLOy5VWSc7kE+o1v6M/rpTROTRq/kQH3kIlmfQ9mjR/oROvodWTwh2aNZf12jyH9kn24xotmr/1ujyEToQULtDmLfcgiqGzJ0flBN3exub1I/+ecrGPXq8wisO4+7SGYe/dFPasm5v38iw2k/yxbOMDc1hJcKzcnwADABBuPEsnLQy7AAAAAElFTkSuQmCC"

/***/ }),
/* 58 */
/*!*************************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/entertainment.png ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM5NEQzN0EzNjUwQTExRUE4NTQ5OUFGMEVFRDYwMjdEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM5NEQzN0E0NjUwQTExRUE4NTQ5OUFGMEVFRDYwMjdEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Qzk0RDM3QTE2NTBBMTFFQTg1NDk5QUYwRUVENjAyN0QiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Qzk0RDM3QTI2NTBBMTFFQTg1NDk5QUYwRUVENjAyN0QiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Eh7uTAAAeMUlEQVR42uyd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"

/***/ }),
/* 59 */
/*!*****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/guide.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUxMzYwNUM3NjUwOTExRUE4MjAzOUJCREY0ODUwQjhGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUxMzYwNUM4NjUwOTExRUE4MjAzOUJCREY0ODUwQjhGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTEzNjA1QzU2NTA5MTFFQTgyMDM5QkJERjQ4NTBCOEYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTEzNjA1QzY2NTA5MTFFQTgyMDM5QkJERjQ4NTBCOEYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5kYw0LAAAhFUlEQVR42uyd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"

/***/ }),
/* 60 */
/*!****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/join.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU3MzY2NkQ3NjUwQjExRUE4NjdCODNFNEZERUVENUMwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU3MzY2NkQ4NjUwQjExRUE4NjdCODNFNEZERUVENUMwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTczNjY2RDU2NTBCMTFFQTg2N0I4M0U0RkRFRUQ1QzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTczNjY2RDY2NTBCMTFFQTg2N0I4M0U0RkRFRUQ1QzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4c0NBTAAAgNElEQVR42uyd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"

/***/ }),
/* 61 */
/*!****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/like.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNGODRBRkRCNTYzODExRUI5QjE5RTU1RTA0MEI5MTY5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNGODRBRkRDNTYzODExRUI5QjE5RTU1RTA0MEI5MTY5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0Y4NEFGRDk1NjM4MTFFQjlCMTlFNTVFMDQwQjkxNjkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0Y4NEFGREE1NjM4MTFFQjlCMTlFNTVFMDQwQjkxNjkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz76R8TCAAACf0lEQVR42ryXX4gNURzH545tE6LdiPx9s0hKPG6hvPjTloQtKbK0byKrvXd3Je1eXpQtktpdXq4t7YvYFFqb5cELeZN4UVtEWNRq17/Pj+/UmOa6M7P3zq8+nTlz5pzP+d2Zc2ZuJpvNOkWiGhbADBiFL2EX5fP5f+q5XK6WYj58hre0fw/rVxVybi3YbLbCTJ37Cc+gAD0wFpDZBJthD6zwNX2g7cbf+eVf+vtkfBm70AUndGzxGsahztfnPbTAVZim4zaYpfaPlinMhoU6NwHHkF/0y/5MQAO16txldVqmDOyX2QGDMBeuKPu7cEbSAdjM4LWwEhZRX65x7bZdIPvOYMatGuArbIGHTvE4COdgjurP4TiiwWIdEDZS9Ku6i2sHTLyEyguYDtuVValYCvXwBkYYaLJUB+RHKM7r9tXZz9okaX9EqXfvr8FQFKme/m6Ke5r0bhM3qK3HqXxcV9lg4tWqjKQgfqRylasn1hb7ZAridyrnmfiH1lxVCmJvJYy5eqIt1qQgXu8tQVebgMX+FMR7Vd52tbM42plqKmVkHa/TPmGbVMHET+EmLIbuCmZ7SmUva/qTt1cf1Uz2waUKZNunbEe9CXjiV3AYfun1tq2MUkvkAHyDnZatX+xoy8zp+BZsKJO0WQk1IX0cfC16cda2VR0Pw8YySgv+djekT5s+CCzuJ5GHSPuC17hF+rZDZxJ5FOn/xBYdceVRpaXEYfJN5ZBGEQflQ2HyuNLgV2apOK1JOJIP6zi21In5Kjypr9F23z1vTCKNK/Z+9oyWnJexSQ/FkUa9x2FLrcv3D8OkvXEHSfrVYfI79mJB+iTJAFP53HkwlX38twADAMYs1HmEv31BAAAAAElFTkSuQmCC"

/***/ }),
/* 62 */
/*!********************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/like_red.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRCODg4NjZGNTYzODExRUI4NTQ0OTU1NDMwQUMwRTg1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRCODg4NjcwNTYzODExRUI4NTQ0OTU1NDMwQUMwRTg1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REI4ODg2NkQ1NjM4MTFFQjg1NDQ5NTU0MzBBQzBFODUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REI4ODg2NkU1NjM4MTFFQjg1NDQ5NTU0MzBBQzBFODUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz75B/8YAAABqklEQVR42sSWzSsEYRzHZ4ckDkqEAycHycWf4OC6B+KgFIWLUnIg78XiwM11l8u2JTcHxc1Nabmwm5eDsgcH8lYcsL6/+o2GZmeeZ2afZ771aaaZZ+bzPM/OPr8n8j7WZRRIGagHFSAHXg2xVIM68ALuwadTI9PhWjvYAY/gFmTAE0iDCVDl8Ax1cJHbPoALcMfiBGh2E9P5KjgBPaDy3z3q0Dq4BgN8vQRMgSuwAFocRj8IzsGo/UYpHyNgG/QLTGUN2AKdoAF0CDxDP9smt5+1iycFpfb0GfKZAWdgl6awkadJVzZAOYmH6ESjuAn0kjhq6E+UxG0hiFtN2wemM7Uk/gpB/EziyxDEWRIfhiDeN3nF0pk3kCTxKdjTKI5T0bGKxDj3RHVyXMV+q9MNGAF5hdIP0M0l9k9ZTIFpRdI8L83HhTYCa2BFkTTptQOh0hUrsjQhsvUxuFgvq5K6iSlzAeSuUi+xX7mnVEQsKxeSioot+VKxpDJiyrzLyKWksmJr5DEH6bCM1I/Y+qtZ8m+WxmVf4nfbQ/IDLixpPy8Ist86CrK6/AgwAJn/Wmx0n+0HAAAAAElFTkSuQmCC"

/***/ }),
/* 63 */
/*!*****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/local.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM1NDY3RTY2NTYzNzExRUJBNEI1QThDOEZEQ0U3QTk2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM1NDY3RTY3NTYzNzExRUJBNEI1QThDOEZEQ0U3QTk2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzU0NjdFNjQ1NjM3MTFFQkE0QjVBOEM4RkRDRTdBOTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzU0NjdFNjU1NjM3MTFFQkE0QjVBOEM4RkRDRTdBOTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6a7bp6AAACMUlEQVR42qyWzytEURTH37zGj8UU+bkhllbUrFixGNlJrGShlJUiM0jjx8LQNJiHZmXLYlgqFkL+BAs//gFJiJCNacT36CzQvefd98a3vk29e+75vHvnvHNvIJ1OWwYKwd1wFxyG6+Ey+AW+hs/gQ3gvGo2+uSULuEAJNgmPwuUGL/cMZ+BlCW4LCVrhc3jeEGhx3Bx84ThOm1doD3wKN1r+1EDzAe41hbbDu3CpVZhK4CzAHW7QCgYWW/8jyrMDcKUEXYBrhSS3cJwruI5/4/xcJ8q3qIPS4LAweR9ugpP8idzQL6o0yc8PhLlDWG2tCtovbCtB+uBX1SDA9LyX43TbPKCCRoQ3pS3MSX8ewDmO0ymigjZrgt/hI8PCOeZ4lVpU0BpN8AP8YULEavMcr1KlChrQBFfBRSZQFAvFVbs1IvvPilSiJtFpuL2d3BRUuldBL4VkCbeGgVUWc5xOlyroiTAhzJ0qpAGGeDws5DhRQbNwXphEh8AVHONKp4+9GcAYP+8R5uY5/7eCPwboMN6i7iFMpsN71UcP3kZlX+t6L33cj9b/6gmekRr+HTxo+l0aiPIMYpW3bucpNe5x+LNAIM0fAXDf9OaQ4YIpBDgG4KbXO9IaPOETOA5gxs/FjERXxSmPUPCiG1KAbZBkBZ42BMYAXHcLsg2TpVzOStIUgI5JMtvDttG1ZFYzNg3gimki2+P/tcSX718NBcCUlyRBH9WZ4AqlAnP4YuZJXwIMADQ9iXphWMNxAAAAAElFTkSuQmCC"

/***/ }),
/* 64 */
/*!****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/logo.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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UmVhZHlxyWU8AAADKmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRkE0MjcxNTdEQzYxMUU4QkZBOERDOEVCQ0U0NTBGMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRkE0MjcxNDdEQzYxMUU4QkZBOERDOEVCQ0U0NTBGMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkE4RkFCN0M3REM1MTFFOEJGQThEQzhFQkNFNDUwRjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkE4RkFCN0Q3REM1MTFFOEJGQThEQzhFQkNFNDUwRjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5BZZ+3AAAB1ElEQVR42mJkAALtmZb/GfAAJkIKwIoYiAA4FV1JO0Ylk0hWxILLHTgV6cyywqoIIIAYiQinb8S4iYs036E7esgEJq6ABAGAACImMBmo5m6yDcLlR5gcNnnaumhADWIhJoOTbRC+9ILPa9+o4TWAAAIlyDVAOphCc1SYqGAICNwZxumIidi8NILz2qhBdCyPaOcicgq1wRnYAAFErRKSgZo+GzSOoWpQD1sHsRCjCDnzkpp90DM+If2jUTbqoFEHjZZDpJYroyFESeNmNFHTykEqg8g9bwACCNRiVAYyLgEx1wA7Zu3V9OMhVBt1opajBlsaCh7NZaMOGnXQgFeupHZjKO1CjUbZqINGHTTqoFEHjTpo1EGjDhqMgw342kejUTaahggpoOdg1WiUjTpoODoIvL7tzSBykB5AgPbtGIdBGIYCaBR16swROEQvzT06cxjm1lRFDC0LcpXC+xJzpIdJhOW8e4z359MVWSde1C32xRYasC0mCmascDZzrQz+7NgABAgQINnRY/iUrb5D9v9l9toqCBAgQIAAAQIESAABAgQIEKCD5ZK9QPaMigoCdIJP7NdjOyoIECBAgGQBGjB8zVDjam153T0OqInJbBAWfdg8AExKZVcA71uIAAAAAElFTkSuQmCC"

/***/ }),
/* 65 */
/*!******************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/moment.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA5MzUzQzMwNjUwOTExRUFBRUI1RjczQjlFM0NFQkNDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA5MzUzQzMxNjUwOTExRUFBRUI1RjczQjlFM0NFQkNDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDkzNTNDMkU2NTA5MTFFQUFFQjVGNzNCOUUzQ0VCQ0MiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDkzNTNDMkY2NTA5MTFFQUFFQjVGNzNCOUUzQ0VCQ0MiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4SkrhNAAAkMklEQVR42uxdebAsV1n/vtM9c+99S95LHg+S8EIWyYISZROCIFqIiliBYhMENWyFYomooKK4ACpWAWL5h5So5QoSDUoAY6QwgpYaDVGDRMhSITEJyXskeS8vd53pPufz+7r7dJ9z+vQs987dqNdVc+9MT09PT//O7/dtZ0EiSuDU9nW7qVO34BTAp7ZTAJ/aTgF8ajsF8Klt9lv69frDrj+qcSOff+aZCX093Afc7WFSDMivnDStfcdWaCTgj9mDLUAvOKBotwOf7nZAXTAtiCcG5f/lDLxjV/I4yHtSpHuXGtz29oCq81EX+LsF8F3B4C5QBVAXTAvgmgbMTPl8qBuQcwNRgFMFNUj9pHzeU0jz1XNpABb00+eQLOAhw3ci2DsaYBdYAdVlqAXUgqmwd1ghXsoHPIEQz+PDzmUYHs3/Dwkughnf/b3V6Zb5kcmpeN9xfhxj+O4moLsMwS25MTev5tkDBfiIJA1AgLegW8AFbMtwF+ydBPSOAzgE1WWqCyrj9Q18+d/Dzy7jF5fxYUfquxrc3tjd7kKAmjfu5ec3MOj/zg3ouqXh8I6EgRbA9/TAxMCOMXu7wd4xAI8C9oFVUhWoFwPiD/KTl8p9bIG1TmCJJjruTk308dzQXz4yGN7GjDYh2IcX0Ow0oLcd4C4ZZqdHlWxNDwGqV/DOV/Lup7VAoAlBXD+wrX38uf9isK9azfVVgzx/SMCeT9CIjO/voRFWH9mHZifI97YCbMF1GWuBHejexWxLf5Lf+EF+a34csJ2SOytgKXrcgM/1lwNjPrjIrO4pMHMMtLDaBTpk9FaCvC0Ax1hrpZiBvYiB/UU+4GVupm3G9nWjwIavDZ/76jVt3rs8bAPtSvdWs3nLAXZZ6zpPJ4bJYcbzl/mt17rx+XYCO7HUN0/YRNOHlzP9m0OdPyBA7+2h5oc5Yw6N64xtFZu3DOAYa0WOl3NQA9N7Db/5Hn7rwBY7Tu19EwIbuz7n6SOM9LseXB38eV9BPp+CFht9aB61K9tbweYtAbiLtccHyQWI6vf4rW/fVvs6O2C913wt17Mj9ualYXbXXAICrhbZfsyC0lvF5k0H2IJ7/f1aPczALmaEDw9AEfZfxW98gN/aPymwRJvjOIX5rTEyPB58v7EuMZvfzmz+Kw6lCjaf1kfdZZtnDfKmASzAfuWRyjteFlBLJ2oxUwu9JBVgr3BvGtGOc5yibWBilgc7Oaz6i4fXsp83ZFb3pJC7tjmU7FmCPHOAazmOgLui07MUqqv46p9SADND+7qJjlN3A8PRwFLwLr/+wtIwv2I1019dYJBFsg/Mod5MkGcGsOdEOeDes2TUWi4pxt6lgPjXklKcFlgax9Zx57PA4njm4ZQy7F4XYngMxX7LfWuZ/qHFYX6zK9nWLl9yujKzBHkmAI8C9+E1UDn2LmOjK+AeHCe5JialHcCO/fUbcJwmssudDYvi52gOOMkx8w+fXM1u6DHI+/uQbRbIGwZ4FLjsMSeJ6j9bQQHu3pEeZzR7sA5bOql9xTawOOZziOMUgzqdQ8TW8SsM8o88spr9i4DM3nW+T+xyWsi1nhXIGwK4C9xbT5hE6rA59J7B4H5KwKUuBtIIKabAgnVIt0vn9QAbo63bNQA7GmBzOE1k7wlaUr68lptXnVwb3tBTmO9jJgvIh9gus3TTOfuUeeZZidkIyOsGuJO5iyzLHAZl1PvmBPHTfFWnjQI2Dip1Mpsi4K7XcRrpqLnyatFGx063BbkEjiYMn6on/JnF5Vy/dGmQfTEEWcKogxxGbQTkDQMcA3do0iOJUp/l3WdPBKwLKnU4WBG7vB77GpVhbJOSRrIVPacNI9eNOP5anPePLmb5i9ay/O65BDMr17MAOd0oe0NwVzXO9xP1Fy64ZgpgQ5kzHfaVaDpgPS/ZfStAXOx+lLxEnhjXbCWMe+gxh63bjJy5t5d+aGWgX5YBLK1Ue6XeXB1tJFFkQd50gENpFnBXOBRazEjt6fV/m3c91fOIQ2BGAEudDaGtANNmnDD8nCupFDkGG2CN8xk5xjg/rmArBQfEQoMRnjm/9aRDe/u/eWxp8FZuNJhwu1ksvhxhPi3Pbu/3NCxWs5BmC+582n8Vf/OPUARcQw1YAi1Vr40DvJVdeyyZ8kTy2jjva/e1PY/dZ8qHoeBzVH5OO/sFJFMd3zpPcY3UOgfZzzgNzXu/+pw9lpwGTPW5fdNjP8sO6csftWfuZUND6Sp7qGs5Jas5FcooKV651zEF3TQGW2kWj9lAegE7Ve/32GdCRlEt1y5DQ8l1P9dKYZLrgk2WcYomNNzzoq+haL8XA/vqkJPQP0f9hrHvk5M08Vltzx1TmVThu/f10xtXsvwrKxmSYhZzGEXzCZJkBKVgE+uvPVOAXWmW1nVySOnefvLBunBAgdPhsNYFygQyHAXbAbRVbAhuEI362dhuLE3mynjhEzoG2MTsdthY0AE29KbrFoJ+HN1d6Ni30EvfvzjMX4mGaDVHkyj3yo30DNHC4kmkWq0XXCvNA0O4kPZfw7uebSUIIgCFkmagkTwybTkt5bF8uNIZynAhu45smthD3tex77Lf4Uu1lW5jyLuOmFmwkm3PCaEUO9JdnM/4DYwiPgU3hKefvjD36pz9rFxDOsiBpRqKjoci1baL0yRSna7H/toCwrDok5w8ml37d1LgrBg3pnX21T/INCyu9xG1fjRQ6JyNTpJMkqOuPWI3PCLf+fKSG/Y1UZOREkYGnrm8Z5y8NAXxXslgKjxvN29tM13u8RwT/2w/Tf5+mOujkJdSzWpZSHXZMdHAJFKt1sPeAuQVKf2R6ifpL0LZsbxhqJt/omZfLcUmYDFBiyE18xx2Wca6bPMcJ/6j5cE7jC4ZUz8qxspDu+fRJbtdx032x17XClCx25DviJnw2o3P5prhQPW+mvGmZT5O299Pf5qPS/k3JQMNCaslm0NQkgbuClk3bIMtewXcVPUv4rO/hgK2hYkIchwnIpexUEswBJ60a8d9RgdhC02Y+K/UAbtqvbXNRI/R6NC0qzaMTXTsMLWx+xhJ2EiIK6Cik6Q2Qc6a33vFnn7vT1az7NZEg2GpNquKzMODgsVmEharaeXZ1nbFJiQKf4EijaR2jBwGhOAaB9zaLsdCHdcOGqptbsOkygZT81xbhhlq7KnLRtOcg+zr+rvt91D93FWTmL/QqEw7tHLNUE0Ch7G1WQqjivLYZD5Vb+FDUwmd2CQmKxw6LXPoJP3ZbB/yUSxOp2VvUesaijT3LuanLwHoYBkFGayAneQ4T0S+J20cxnk3Joir4+FRvKIDJsLwmA2u6FY4xnUo1CQzEB2WhnXg2l43jMawAIENw+sqUyAt0mXe+gcK8fv29XoXrmTZLTlRkhvUQi7pO35iAGPDJjWN/fXZq94sn29loUyTvIBIEqPxkB22ekkGhwUhaxzGkscm+Yzh90zN3IJN1hbrxhPWlQ12z+ddi/Zf2+f2O7Vp1MT1EVyv2QSRAEXej6md18Cb+6f6qXo9X1aasUctLB7q0v+Rjovjxj2nk8qzZa+46olKD/PTH6jBNa6bTzXbDLVDAhNkeVxHS/4842wF3/U4hCceRji0sKFB+uvepAEcXSL472MEf3OrhttOVPbbBsW1jaWS+Q6rG4+7eo5WHrC26Vj9bsRGPYzle6AGFYtf2E+S39JaH7UsXsmYxb0ygLdhUywunkqiJQYT/e8pVQ4noXgNtGVTgge4KcqqcTx6D8Dbn5HCNz1qe0B1t4Qv4bH7sXh8/+MVfOp2DR+4QcPQNIAA1rhZ96p0tyqgK6zrRAkWjaEEuZBpK8PYOHOmLer2vs7tTdOXnND69zk2zitbbBYzMCcGZEYNUFfTOFdFtYhbDl/EFRQp65ETFsWAde2uK0dn7gX4ne/aGeDGugC88MIE3vfclIEn31yEyQ5D3m9sOWJAjQPZESl4xRfTvEaFL+dzJNVD5QaKFLGYzFHO1kQ2WCRA2MuxGM6n/afwF144krXQBjkW55YJdoJ3PDOBM+ZhR2/fepaCNz8tre0vWdsaZtEMeNm3WrXsseCrmAnuoXEqMMYP5c7f3+tdKgDnQElmJLNVDqs9MWiyW+sCWFqI9Ixk/Wf7iy92Exph32YTtDyKdLMxjrP1HecouOh0hN2wvfTiRIaDOs5ZFUo5jtPTzlTwNm4IV16ewmdf0YOLDmLNdtvqvUycy2DTTlu697CXqhdI4oPZW7CYGaxkdoNRzlY6aWFfWop4z3t7cDlFIxCK130dr9kLh6qa6vPO3T1TdSV8qc89T8GHv6i9xMQ5+4FtdVLY6zP3+vdZzM4tx8nrcIBe/rO714hr78uECT6Pb9n7SCSahMWoXGfLYuY6W+kk8iwSUMpzT0bVnx/tghMwlmIsd9JyVBmdi89A2E3bJYcUA1vO7PJ09vhf9cQEnnVEiWMS3cS/oBie5EPpVZqwATboYfK4PWl67kDnt+vKDouqrmmsZTqMiSfyokUCpPA8l+J3R3syUrsTHEWAJeNnsuT5aXO7Ct8CsMsvVPDqS1O4aILGecYcNgUGl5FYesw2VDLVe17SJFJI6SfqOYMc7hCJtjK9XMTEaNYVB4u2S9aE3XPsI14GpqOCQ5EqD9n0Xdizgbwq027ansQ2Vh6Tbgfmq3KzDYlUo8YUyXLZ3HXZLLCV+0bEp/Lp/kwVABOyCUaZHkowEqwuOACTMbgYPFbJs9hfLR2FCJ5hOnpMtJwC0yHbhZNBnb0ip91ECT55q4YTawQvYifojIWdJfkLKVa2umSsIr/gYDvt2bjZ2lvCoIenTXoAPklsMPvM0gNPZRGZdpMeE0m0eGpzqneYP/HYOLDk1XvdEmGYn/byy2bjN/BDN+bwof/Mi+d/9N8afuqyFF58SdJpE7d625P6Cmdc4EyTFIlWqyjIjJXbY/pJ8iht9P1ih4uHsRO/4fRhkthfCaiTRD2ROno0ut5xmPivO6GBU0SgoL/WBrbP31f78LDILP61z2Xw2quHcNtDO0P/e4lTWXIqbLHuQxRWk2K56zJcegKV/RakMw+ra4lROHXjWIBr+2uKhvaETmBbNeAK2PB4064Tz0KivYwQP246auCVHxvAB67PYSXbboluF128/mdO7j6W3o2ZwQTxAskRCbilHQbPDk+d6BCN5wZzbutCo1LtdLshpyYcxMgGYDZOFsU9d/7B8Cc35fDiKwfwubvMNgKMXsWMOpJDNtFBgedFMZOIeKRgL+Pn2uGpMlmugwVlgvzccNB2N7DgSRHFwqcZOVlhVggCJty3SPDmvxvCW67NigrRdhQuPOmNhZEU6QFDbcfVSS4csVGVofJhk1Fh2lKNy2CJ8RYjzmc7M7QX9spGXSzEfowXLs0GZBhlOvhx3Z0aXvjRAfwps1pvMaFj3YfdXiyxtGQMWIfBh2sbXAHdOFo+hmqcgyX/dVn2POSzdTJg3V4dJnLBs7p9YTfUmDO4PCR4779m8PK/GsAXjm4Nygr9ERxu0qfrOjuBbf6fbhlM1GDkYjaxDW7mW6bTIOY4OX2u1nPBs8GYOuNyrxlUjfCWBw28mp2wd7PHvTjYXNne02sS9qOcUu+6TcSb9n/XvioLUibHKnDdubGncrJMyWCvu4Ax3a5+d6aLWo1jVvpHMKLhRN6QXhsf/WIOL/jwAG68b3PZ3JXKjRFgpHlrVCqx4bLrSU/lZEXKT/tgjPveutHU0RJpdgweqQY0/rseWCF4z+c2O5ai7pq5mQpYu3NP9RTHYTcyk2VjYID4BYzyZic5fpY6He3j3PH9YUVHqc2GN9KX2ioPQivf3MpVdw2sq+oVFmgbC7u4T/TTKgO+tB77OtGMNjMMk2hKr/TIaQjvem5vkxmMfqN2frs3hCXG1vg9XenAqLWlU9xIf9Ib7BgvNFJi/AE4hDNEGOOM6bLXkkJ87ZNT+PGn92B+E9eeGejgOlWH6oSqNnIkBehJv3+an3bSm1CFuqVwhO2YJXlbNIiOyIx82VPPVvCu7+zB4w9tfm+STFe/X0WAQkdp3YvHuKw7TtvSzAFmX+A4/zsHIrlkgu5R661GgLOMgcu7RECd9t195+CCgrd+Wwov/cYEtrLYhEFvDq96RM1rV33CnjzkTzHx8EwBTsp7eJS/5FtaNxKhYw6OuHNDnsRv/DbTmB32G150SQI/9+wUTp/f+jqiz1j0hsdE5+OKhZLecFN6IIrRtADL5NVpNbqcT3p3e4YoH1gMRuGBM7KO3DE/MMLHnxnS5Xb+6QjvZDn+1sduT+e+NR3M7mIVzI6CwOCeheBixLtGuK96YW9tWdxX5TI/EwEsveXd5d742d3QFep0OVpWPh1gqbnImVaTwm2Of9kbn5rCG56SFg7Vdm2Z62Sp6Gx3zevWgDaMqyDRvaPI4Y50mEiiFRbjuG5NcAywCPHaJjR9jQx0zCa3zi1VbT1+1jkKfuU7enDOge3v1rGWg9Mfp7LHnoeMMRvbKdtYDiK403JEOKRQZgBYh0TLZtfyGxpz80KSQFevjrovkQtsINHl7DZY9CicVYe7Z5+r4IYq1Xh4D8LPs519wYU7ZzG31dxXNOhIyLiDxrtTvVXMq83tVp5roXSwmhjgYkHG1dKALw/zhxYWkvv5DGe1FbJpZxTk0EzQEmtbjLOJl17PEnzeQYSHOPR/wYUK9s/trE53Kw6DQ3tbs7lrgrTWbD3F9jVt9IMCKjrgWifLLqI5EmDpkWeLxrJsm0zjg2UP2BvEIY3a2zBHjRAtLCDNNh8tF/m8C7aOsTSlZXlk2BjVukusE/+6YVN9/jCU9D3oLzjybKr2QbKuomDlYjgyVSk95GXBCLvEanl99PloDZj8sInQZ3c7aEdvLordtP3X/Qau+EQG191povNZh9viIMjHYONBj063YtSPtABbkBVCbX8FK8HMHd0wUewgk2LKIk9Dba7z2IrttFqYPURq2xpXsk4OdhfAx9lk/Qfb/J/4dAbPv3IIf36zliJ75/a1VaqSMWEhAT0y1KFTJInk3lNN5l8d9sp0O0awKScujTjIMMbdLmPhspWsDvM7Gdj/64xQ0AeWnHjPvucMqyre+/JDZlcB/KUHTf177nmE4D3/lsNzPjKAd/xTDjcepZbZuW+pacwugxHj6V4KnC2X3XxPv6p1fk91mHE9aBsDh4PBx3rRYrTFO5OTFDJNdC1f3Y+1nQL0elESttNdiMEF879rv2LgsrN3xwhD6ct1zR2mUSEoJ2URT/njtxm4+nZThGbffZ6CZ56NcPZ+hP/8GrWARWc6hzqx5RX5MLpMAYdHn63Ib2oW86HiYAlGoYM1sUSXjlYBsskMfaLl7VEkDRk6J/bHkDuJJ8Jn7jL18Mqdvl35JQ33LFLFSJRR9019QJWAyft/zLL9xs9ouPzjOdz5CPk1YMKGwRGvuZ7iIVIqNKQ/I+2smO2BsUjsI3CwJgJYvDDX0UoqO7w8GIqRv6NrEm8KKyH1RCPYStFhUfdCeMc/53B8bWeDfNMxA+//fO4BCxWwEDLUnaSDgnuBgbC5cuwkDCJVubtznX/JMpe/Vrv213Ww3PHBYxlc2+HKW0sUGmPoo/EeG+jmS5tWWzdzrOM+F+h72E697toc/udrOw9kuSKZaee11+QwyNuMdR3GAniF/uzB6D7Q2+fmBVqgB0pIZD5hmVvZXzPO/k6cqhRtX0jRDAwZJdPpZfqqhX76NvHMo50AXHZjkIlx5mB2kyDijLyBPdPnHFHw/PMVXFpNo5Rug3mW9OLRZWJvmeAqBvdLD5CXqHBZhw5wGIDj2VfEpkyI/mB+Qj/gjTTzAbP3U1R6zZpPpVmatZhMWX1clsiL2d+JABbKH1shmkuokOlEEQOcPzhPydV81a8Et3BApRQbZ358OydUM0quGQTbTmYhfO5eA5+9p5msopnyL273y6fdfXFbfkFsgQWMJDHcsboqAir4jPTmtgQ3Q4VNPdjxQ8KGYm9IeL1V7vnTzOATyjIXCoBNGsjz1GGSq+V8ArOQlprPMq0H2vx+3Y2HIozFxu60lnwLpMr3MtGbK8pKobV1brjRmDqsbWMtk9Wjfl2l9bEyE/acrg1VzvdURRbv/ca+Vud2wQ4ku2Qptst9FEtNYjvx0TRYo0l/pJJnXTGYwUUtWMhytbZEGNrfib1o0XaRgCLhkRQtR69l2W1k6JowV0oRN9+tlLj2CAOQlQdqBRg2N8+1e/XNVD7oYSPwbGbw8O1nu+IDdaNCUHWj8QdrQ/DdtYddJYtbKhEsC0BOVi9M91ah0T+Sye8kqMHVcv+TSp7FexZsuiZDmwhg603PsRTMsZNVeW56qM1vU9UBrNUtx4LsdgLAMGXnpyyp42Y1jME2gy0QLnDKBw6dRhA2BE8J7B/LfmxA9UimQufJv1a3c0PUWw7k2wMWvbFf2lD+BxJs8GUU4Mr/FEr2yqrisfTkVABbyksLOTjHLSYpvLbCFqxm2e2a6EoKS4ZubTO0NejbKotqJwNdxijriZeMKuQXsWaMx1gMQW1e2M95n60l3W847gj8FltVG1ikwN6iHy5CUGiIF2jKDD6z95NktGVvbgEW50oAluSGLJxl2Rubq3IqH3V/j+WAvem+tJwUcg6dWKpzWWnlpFv/dQsNLsgUrDyCQQjRYpgbXYRSir5slxg1dji0x54sBw0gKvOqHepgKMPgAAsjgA2mabAz7ripSEI/+ct/l4zJfw8rm1t5zsU9l3s/xxjIKuJdztVUANukx8Eq6SHOVlo5W7nWD+aG3gcQOFmujYlUsGNSaV8gYCSGjB3vNwDAEfY4qMGCK+1ho3JMit+osGVfnXxGC1hygcUmkYEYQInN+OqGAOZ3gT1nYW8CkNXyjJM5V+tisEiBrIppWdxX8oWglweDj3A0c0N3LRjbMh1WooKb08huIJuj2DwFsOE5445Tc0ANKsYcxjiw6HnEjRlxgaWwCFPODHiTzrOrK9ubu+xlWdaWvaOcq3UBLC1FZNqyuJ/yFzOL+ULyQZ7/rMiKVxJzPOza5oSeZdi7MuJouTvrycNcKVV+dszrpx3YTAwdJPdLnUZljW/I7payuMoVKAAFGQ9vfDVGuuSUIdSyMfrdfA7pC1IAXD0K9rKjqy17RzlXUwNsJUBkWgy7sFjWoBd70FeYZ3l+lzbmXe60De3MTnCnKLjROEKWwxALq/JWUWutgIGGbRh6WY4hb2Jt9Cd3xnhpL8xOeSrknILQHYSOfk7aBRYjxfPaSTUfYOf5q/xKQM1U+T/vI+bC3r091MLeI/tGO1frYnBxsrOSYrlT8aglfTlXsLiQ6nxlMPwYy8vHIGRQq/qE0RsWJgWgI94kL7EfiV87ZBtUWykw0phCmY02QAjsK0AL8db8JS3Pym8sfO+uMXl2DT/NHObmbHNzucey7KykJa3nPPN1k9yWIlJ9oA9G4mJhsUi1XMxyNvwVtsdf9BooRrJdFfPC5HvLcYIOxmBcHKL22CVRAGQ0MUJNxonC7wsbQnVQjK0eY7GR4fA3VbtuMTp7r0gzNmGRAJtbaZa494w533Met7zdulL5lsXicB0sliNHzTY5E6lGouVBlv84f+sx8m1LS53BBZp8tlLE3nk3OijDUZesQ9sR8lwADJzCSMOgoB9VMf0g+f5AjK0txsZYX/XsYXDfzmddwdJjLuSZHatMpJnBlQWj80PzqK1jNekCldNLtE187EXP4RKpTpPC0+PIKb83y/UbGNjFVl+tEGinsxa14p/AQ3U7+GF7+EeX4wPYbgTRDgiR4wnbzoHbeb3lEWNY3+1krP3kstH5W5HMfdgkM7JQmmOO1SSLU65rZKw98bFl8lay04awnLOUMNPZ//IFvyFNkj/mA/ZEQuF4/TXoQ0pO+QhHj5mNLwPbdTy1ky9uDh3DURzRClVkjSaK+A/QORB+lUz+00j6VrSSXDG3lxSKmO3rQXZaH/VjFpSe1LHasETHpNrzqhPMuOUNBzq7MdP6R/niVzpHrQfeKkbAsnlrcjxiqm14+eFy1taGZQQdrwPD6nvc/tCS1gD3mqEVY6HdexSC3zRiRoRV0vptoPUXCnCt18yPlO+dgMvKmFuveVpp3jDAtgUJyCLV1qsWeyw2Q2xHBfL1DPLr+AYsxgY0x/pyRdZUhpbPRdEwdnRFKXKizgHrEEp7Mz+Yd00UMQcwdg6TJWbuW8DkNzKgw8JrVjBg5g4rcHM2fbkQxnrN00rzbBhcfdHFpytjvWr+r8Ues8Tkc4giN8Ohzj4/NPqH+OD7I+X2tn0NbKhvD0M2jV71JWRgp03uamh11/2gPh9LzcLoGYcqVTpmTP4mMPqmCtzaoZIHRyUZx7s5K6E+wA6s9ZqnleYN2eBYhkts8cE5otsfNpATysQFxUwh0otYFpTKdXazMeYVvV7vg/yjnhiGDAiTzLPV3Vsj7O3Rtq/dY3ARRq0oOnpSmRH21b+W8t+XQWc/p8AcrcKhElxmbeExKyjAZTnOxe4KuNbuTivNjdIRbXhgj50XUcYzyRxNsjLmvcsmXcooWRpCL5OVMw30NEGPv3JfP+3/Ktu9l3j3gCYH1nTdUOruONd6PWY5WoIJGscYYP3X9Ldghu8Tf6QIhSTWrYBtwMV8f7/tVK1HmmcKcAjyLSdMuXDiqkkeGVKyyCAPNPUsyIYfDPKLlVK/JH36JmYsjQaWpgTWVwCaTjUmv45lkPSjzq6xrHXj3C5wxam6hE3fRsCdKcAxkGXZNVklU0BmwGXlzHRgqKcroJVKz0/T9Df4I0+bCVBTH9+xFO1sgJU9N7Ej9etgzN0S31ZJDG2BZWmuba6V5f2VUzULcGcO8DgmW5BlsWMBOS/Z3O/3+j+AqH5GMqBjQaMpJHNKGZ4E2BH21d29xKz9XdTZ1TVry8J9wdy0Ale8ZRfcWTJ30wAeB/JaDskagyx2OdMFk1ORbFTJ4TRJf4Jjm5fxR5P1yvB6gCXakOPk7tZ8sk+gyf6A/z9UsbbMTjXeci5JjF4VCom3vFngbhrAXY7X8QGpkwMqlilfzSuQDaSVXRag0yRJH69U8iYG+nuhXLtyXTI8FlhahyNFncfI3LvXodF/yOHPXRWw2mFt8SgyVEpSkJhLEkPiXBsKzcKh2lKAR4FcrtQlQJcLLVaSnRZshgpolX4DA30FA305n6K/Xvu6SY6T3Tdkpl6LpD/KwN5pgQWoe0DmVSd1keSibi5dXvdUGSpJYmwmuJsOcAzkE9Uy8db5spKdm2LJ1AJcAVrmRDbF2PPkELP6RVCGVedtv+NU7Ps/trGfZMZew/+PV4OxLbDG9oBMnHqudFR3JXm/k6HaLHC3BOAukK1dLlbPZMkeaEgsm2WN3Mo2JxZoWZ8gSXqXAqrncwz9nSDTKm6tfb2XT/bPQPofGNj/FSChXOfKhMCqBlxtWVt0tWFJlqqQtbebDe6WAeyCHEq2zG/80BozWRY7ZjaXQFOSV6tdB0DLjCFJ0eNWpeeiUs/iG/okfvlk3vfoGQP7gIQ5fH/+B8lczxJ8TwCqqbqa1SMOXGDTYgRCVahPy2K91HOl5BfLTm0GuFsK8Dg2u7ZZ1gEKga4fUIAtd0bAVlWmUTHYhwCTi/jl40GW4EM4m5/LQiIHoJwlV9KyCxWIq/wv5yeL/P9hAjrOz+/jd+RxB8ett1fSa9PNdv42C6rBhrW2M7oOgZXura6t3SrWbivAXWx2bbPI9oAZbYE21YLIIuHFwoxQgl2t/qWqleKVU2RCp9gT6fzTSWQKahfNa2dcbjH5iTcQrOzxKCMOLLDStVXkuMvWbgW42wZwjM3y35XtEGh5lIsik8h2sXauBdtZP6jY5wFLTbl25I0Ar3RUA2sBdUfWl4Ovy+kThK1JNZQkBNaVY6cosyXA7giAR7FZZNsCLcvFiI0u16wvV742dv1cKIG3CzUWIDuLRjmZZoSOae+rCX/IZbEzyZip+hcUgCqoR9YXozuqMULFQDAZK2SBjcnxVoO7IwAeBbQ8t9Ity7bJyl7CalmnT8CWpWQss+vlZaDc7ywaVa8rBN2T1NWTvYHtPGInGasArWazKQBV5aw2xeBrYasM4ZyvBoLZHo/bDeyOA7gLaCvdLqvXiqVUSZiMArYs66arNfwy0wBcedMF8A6S4UCKZsKSCki7X4C0gCZYThcooMqcGOI4CaghW10p3k5gdyzAk7LaBVuYLTJuAZdjLOjy3F00KlydxJ0pXTkTeyZVktQCKvJrmeqCupPYuusAHsVql9ny3AIuzy3o8txd7s2uARVuqWpAtlPyWjDluQVUnrtM3Wls3bUAd4EdA9wy3ILuHmsbQLiF0+C7YFqGxgDdqaDuaoDHAR6CHoLftcWGYcb6Qe10QL/uAJ4G+Gm23QZk1/b/AgwAg4lBk+xjuFsAAAAASUVORK5CYII="

/***/ }),
/* 66 */
/*!****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/play.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABFCAYAAAAcjSspAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFCRjBEMDVBNjcyRDExRUE5NTE2RTE0NDU1RjVCRDM2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFCRjBEMDVCNjcyRDExRUE5NTE2RTE0NDU1RjVCRDM2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUJGMEQwNTg2NzJEMTFFQTk1MTZFMTQ0NTVGNUJEMzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUJGMEQwNTk2NzJEMTFFQTk1MTZFMTQ0NTVGNUJEMzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7HjgIDAAAFcklEQVR42uyc228UVRzHz8y2rG25VdtqWkzlYsUQtNH2wSaAMV5INCFqffAfqBp98tEYDRF95Enj5S8w8fpiAlEeINFoQEg0SCsFutUSIxRrWykd9uL3y/5mU4ftXs/MnLPrL/lmtjvbmXM++Z3fuR/H8zwVkbVB26G7oD5RF7RO7rVAaWgJWoAuQzOiKWhc7oVuTshQCGAXdB90D5So41kZaAL6GTomoKyBshZ6FHoE2hoi8PPQEegbaNFUKBuhfdBTULuKzq5CX0FfQnOmQFkDPQs9ByVVfLYMfQJ9BnlxQnkQehHqVebYRegD6MeoodAjxqC9ylw7BH0kHhQ6FHrFa9BmZb5dgN4R76nY3CpfsgM6aAkQJek8KOkOBcowdEAaWzbZOkn3sG4og9DrUtPYaGsk/ffrgsKW6BvSDLfZmP43JT91QemVByVVY1hS8tNbK5Sk1DIbVGPZBslXshYoYxbVMrXUSmPVQhkyvGGmw/auViO5q4x7vKKaw16W/JaFws5dd5NAYT5Hy0G5VaA0kz0j+V4VyqjFDbR6GnajwQaNb+uhx3W+zXXdbuhex3E6crncbCaT+RXXOQPBMN8fQ/NBT3msWNCpeUzCcZKJROIBXNfm/3S6WlpaRqBBfG4zDEqb5P+m4qPVS5Bxel6iyPe9ALMbwAZUfQPZuu2JIJRt0CbNL3FK3EugWG1rbW19GNc7y/w2KusTDgUoI3H1ReAxO+E5uxh/DAAzshLKUJwpYdwBnGHAGZYYFJcN+bUPE7HFhEININ0A05XNZqehSdRUyxEngRw6CGXAkDJdYIOi1A9tAphzqMY5zpqJ6t3QdhaffkMbVQzGAwjGu3GNcgpliytR12RrQ7wZZBsHxaszgvf1uyFUxWHFm40A8xDEBmGY07I9jCmdyiIDkDsApgfxJoV4M4mvrmt+RSehtCv7DGHG3Qz1Ac5ZwJnGdzlNz17P4nOLzT1cgNkBz9mDa4+uGOZa6inBItWOYDwEMLdrqfVUfklVQ5j0o+q1DKFcU41jOoLukusPrDSAeQi45zQ8Z561z6wya9FNtZZDDfQbayFNfaW/COV3aKeVNHK5S/COM7jqXAj4J6HMWAhjEZ5xBroUwuNThDJtEY9leMZZFheNjbWgnSeUCXmBYzCMDEBckEAa5jACOYwTCssjF+puNbSoXASMCVyjWIJODv/48z4nTIMCCFcAYzzieaITNxqB8sd3BsG4Chgn0+n09zFMnN3g4HvKpNRCcQ44Xee4LICk8Dkbw/tnhMN/JsMOxwQDLLJT8IyjMh6bjSkdhfyvhPK1qmF1cp1F5Q/AOAYYv+CzF6OXLkv+b4Iyr9lbMiVgzAPEDwBykjHEgFB2eGUfMLgUg7sgPE1lYq5I83sJMH4CjG9xf9aUjqTku2DBtbFXVH5ryPM6PIXe4Lru3VxlAECXZdgwo8yyzyXfBSu2YYHLEt5XzbHEi32nl1Rgb2KxNW/8wbuqOew9VWSzpluiZXeowYEwf8eL3Si1uJgbiKYaFEhK8qeqhcK6+23o7wYDwvwcKNUmK7dhgTuq9kfdqAu5kbZfldkpVsnWFo63vKXsnwpJSz4myv2w0k1Qp8TlPEuBeJL+U5X8uJrtcozU3F21YBmQBUn38Ur/odqNlaehV1V+F6cNNiXpPV3NP/2/L1kjFN+4mvAFZd4O9g+lAVqT6TrrgOccxL3ZgRn5VEdPX/epGE9DTyqNa/wrMPZdeCrGF8qgUzGC5p+fQoW5B5HBnmenHNFdI0Zx0s4elT89gwt365lw40QV52V42sVRZdlJO6tZh8qfycR1u/6ZTLep/PIyiiuqODR5TcSROf9MppS0RBejSOi/AgwAlb/Oj5uIlqUAAAAASUVORK5CYII="

/***/ }),
/* 67 */
/*!**********************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/play_small.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODUyMThBMzI1NjNBMTFFQkFENjNDMzlDNjhFMzRBQTkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODUyMThBMzE1NjNBMTFFQkFENjNDMzlDNjhFMzRBQTkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTVBMzA4NjY1NjM4MTFFQjlEMzJCOTY3QjRBRjFGM0YiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTVBMzA4Njc1NjM4MTFFQjlEMzJCOTY3QjRBRjFGM0YiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4xM/XmAAAC/klEQVR42ryYT2iSYRzHX/+kZUOmW23Lw3TlIQZGI4LA2iWlDoPKCBdNDwNPgcFOA2+ednEgCdKhdli0w056CTKhdUmxWm0TybmIqG2lOzhX2dy7vk88honO9/V99Qcf0Mfnz9fnff58f69EqVQyPMIATGAA9IIOcAT8BAWwAdbAe/CRa6cSDiIUwAwsoIeH4G/gGXgJfgsRcRbcBl1M85EDT8CbehVkcrm8VjkpHAO3gIoRFqT9edAJVgDLRQR5xvfAOUbc0AMjnZHSQSLIFzc4zbQmuumijlfOSLWIsRbMQHUcA2rwrlwgrfhxCAwz7YlhOt5/Isg2HGXaG6N03H8izFy2oc1m63G73XqFQiEVQQQZ72LlmnDR069u6HQ6ZTQavWa1WgccDoc+n89vLy4ubgsUQg6/51K6WhuehBqNRi6TyaRUUGcwGLTG4/ErFoulS6CIAdLpYLM9mEymvlAoNBIOh81Go7HZQ22QiDgpZD4lCMyGMZFI3AgEAmfUarWMZxeniIgTYix13EGHxsfHh1Kp1E2Px2PEo5NwbNpHRBwVc99ptVoVRJiTyeSI3W7v5dCkQ0rvCtGjv7+/a2Zm5qrf7zc1qHpYSg1JywILtrNBlV9ExE4rBi+VSuz8/Pyy0+l81aBqgZxUX+ntJlrEYrFPExMT2DCJPIfq60REhvpGwZHJZL57vd7E3NzcBo9mq3Lqdq4LGTyXy+34fL7E9PT0GsuyfJuvyKk73uRpYv9GsVjcnZ2dXZqcnFzGXbLXhH4y7lrZ0RBXfKfBQtsvf8a/ZSORyCqe+9t0Ov1DwCRGKm/RL+DCQaZ2a2tr12AwyLLZbMHlci1MTU2lSZlAF/4I7FVafuJ07rbR1NwvpwGVHnOd2nJ9GwS8AE9reUwSj8GHFgtI03HqWn6yv17T6727BQJSwF+dFtZKfkhiEqO2XC/yI3hQKy+tlwayNC/4TGdFJXAXPKRrgBWSlV8Cl8Fxnlk5OQcWhGblzbyfIO8lluhJvM+l0z8CDAAnPtXPgBEhGAAAAABJRU5ErkJggg=="

/***/ }),
/* 68 */
/*!****************************************************************!*\
  !*** C:/Users/11632/Desktop/project/tome_vlog/static/tome.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhBRDY5MTVGNjUwQjExRUFBQjUxOTA4RDlGNzE5MUNGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhBRDY5MTYwNjUwQjExRUFBQjUxOTA4RDlGNzE5MUNGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEFENjkxNUQ2NTBCMTFFQUFCNTE5MDhEOUY3MTkxQ0YiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEFENjkxNUU2NTBCMTFFQUFCNTE5MDhEOUY3MTkxQ0YiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6a+kI/AAAlIklEQVR42uSd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"

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map