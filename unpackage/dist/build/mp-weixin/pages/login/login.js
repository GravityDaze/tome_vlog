(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"3f18":function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return r}));var a=function(){var e=this,t=e.$createElement;e._self._c},o=[]},5036:function(e,t,n){"use strict";n.r(t);var r=n("b356"),a=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);t["default"]=a.a},b356:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=c(n("a34a")),a=n("b83f"),o=n("879b");function c(e){return e&&e.__esModule?e:{default:e}}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t,n,r,a,o,c){try{var u=e[o](c),i=u.value}catch(f){return void n(f)}u.done?t(i):Promise.resolve(i).then(r,a)}function l(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function c(e){s(o,r,a,c,u,"next",e)}function u(e){s(o,r,a,c,u,"throw",e)}c(void 0)}))}}var d={data:function(){return{action:""}},onLoad:function(e){this.action=e.action},methods:{getUserInfo:function(t){t.detail.userInfo&&(e.setStorageSync("userInfo",t.detail.userInfo),this.loginFn())},loginFn:function(){var t=this;e.showLoading({title:"登录中",mask:!0}),wx.login({success:function(){var n=l(r.default.mark((function n(c){var u,f,s,l,d,p;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return u=c.code,n.prev=1,f=e.getStorageSync("userInfo"),n.next=5,(0,a.login)(i({code:u},f));case 5:return s=n.sent,e.setStorageSync("refresh_token",s.value.refresh_token),e.setStorageSync("access_token",s.value.access_token),n.next=10,(0,a.initParams)();case 10:if(l=n.sent,getApp().globalData.initParams=l.value,"shoot"!==t.action){n.next=18;break}return n.next=15,(0,o.queryFace)();case 15:if(d=n.sent,d.value.frontFace){n.next=18;break}return n.abrupt("return",e.redirectTo({url:"/pages/face/face"}));case 18:getApp().globalData.refreshWaterFall=!0,p=getApp().globalData.returnPath,p?e.redirectTo({url:p,fail:function(t){return e.switchTab({url:p})},complete:function(e){return getApp().globalData.returnPath=""}}):e.navigateBack(),n.next=27;break;case 23:n.prev=23,n.t0=n["catch"](1),console.log(n.t0),e.showToast({icon:"none",title:"登陆失败"});case 27:return n.prev=27,e.hideLoading(),n.finish(27);case 30:case"end":return n.stop()}}),n,null,[[1,23,27,30]])})));function c(e){return n.apply(this,arguments)}return c}(),fail:function(){e.showToast({icon:"none",title:"登陆失败"})}})}}};t.default=d}).call(this,n("543d")["default"])},b3e4:function(e,t,n){"use strict";var r=n("f5c7"),a=n.n(r);a.a},dbad:function(e,t,n){"use strict";n.r(t);var r=n("3f18"),a=n("5036");for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n("b3e4");var c,u=n("f0c5"),i=Object(u["a"])(a["default"],r["b"],r["c"],!1,null,"c5c3d324",null,!1,r["a"],c);t["default"]=i.exports},e262:function(e,t,n){"use strict";(function(e){n("7e8d");r(n("66fd"));var t=r(n("dbad"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},f5c7:function(e,t,n){}},[["e262","common/runtime","common/vendor"]]]);