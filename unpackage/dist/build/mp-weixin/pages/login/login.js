(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"2a69":function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r}));var o=function(){var e=this,t=e.$createElement;e._self._c},a=[]},5036:function(e,t,n){"use strict";n.r(t);var r=n("b356"),o=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=o.a},"69a4":function(e,t,n){},9282:function(e,t,n){"use strict";var r=n("69a4"),o=n.n(r);o.a},b356:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=c(n("a34a")),o=n("b83f"),a=n("879b");function c(e){return e&&e.__esModule?e:{default:e}}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(e,t){return b(e)||p(e,t)||d(e,t)||l()}function l(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function d(e,t){if(e){if("string"===typeof e)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function p(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,a=void 0;try{for(var c,u=e[Symbol.iterator]();!(r=(c=u.next()).done);r=!0)if(n.push(c.value),t&&n.length===t)break}catch(i){o=!0,a=i}finally{try{r||null==u["return"]||u["return"]()}finally{if(o)throw a}}return n}}function b(e){if(Array.isArray(e))return e}function h(e,t,n,r,o,a,c){try{var u=e[a](c),i=u.value}catch(s){return void n(s)}u.done?t(i):Promise.resolve(i).then(r,o)}function g(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var a=e.apply(t,n);function c(e){h(a,r,o,c,u,"next",e)}function u(e){h(a,r,o,c,u,"throw",e)}c(void 0)}))}}var y={data:function(){return{action:""}},onLoad:function(e){this.action=e.action},methods:{getUserInfo:function(){var t=this;return g(r.default.mark((function n(){var o,a,c;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.getUserProfile({desc:"用于完善用户资料"});case 2:o=n.sent,a=f(o,2),a[0],c=a[1],(null===c||void 0===c?void 0:c.userInfo)&&(e.setStorageSync("userInfo",c.userInfo),t.loginFn());case 7:case"end":return n.stop()}}),n)})))()},loginFn:function(){var t=this;e.showLoading({title:"登录中",mask:!0}),wx.login({success:function(){var n=g(r.default.mark((function n(c){var u,s,f,l,d,v,p;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return u=c.code,n.prev=1,s=e.getStorageSync("userInfo"),n.next=5,(0,o.login)(i({code:u},s));case 5:return f=n.sent,e.setStorageSync("refresh_token",f.value.refresh_token),e.setStorageSync("access_token",f.value.access_token),n.next=10,(0,o.initParams)();case 10:if(l=n.sent,getApp().globalData.initParams=l.value,e.$emit("refreshWaterfall"),"shoot"!==t.action){n.next=24;break}return n.next=16,(0,a.queryFace)();case 16:if(d=n.sent,d.value.frontFace){n.next=21;break}return n.abrupt("return",e.redirectTo({url:"/pages/face/face?actions=shoot"}));case 21:v=getCurrentPages(),p=v[v.length-2],p.$vm.start();case 24:e.navigateBack(),n.next=31;break;case 27:n.prev=27,n.t0=n["catch"](1),console.log(n.t0),e.showToast({icon:"none",title:"登陆失败"});case 31:return n.prev=31,e.hideLoading(),n.finish(31);case 34:case"end":return n.stop()}}),n,null,[[1,27,31,34]])})));function c(e){return n.apply(this,arguments)}return c}(),fail:function(){e.showToast({icon:"none",title:"登陆失败"})}})}}};t.default=y}).call(this,n("543d")["default"])},dbad:function(e,t,n){"use strict";n.r(t);var r=n("2a69"),o=n("5036");for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("9282");var c,u=n("f0c5"),i=Object(u["a"])(o["default"],r["b"],r["c"],!1,null,"6777526c",null,!1,r["a"],c);t["default"]=i.exports},e262:function(e,t,n){"use strict";(function(e){n("7e8d");r(n("66fd"));var t=r(n("dbad"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["e262","common/runtime","common/vendor"]]]);