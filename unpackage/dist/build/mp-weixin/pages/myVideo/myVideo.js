(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myVideo/myVideo"],{"0477":function(e,t,n){"use strict";n.r(t);var o=n("3f47"),a=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=a.a},2310:function(e,t,n){"use strict";n.r(t);var o=n("c778"),a=n("0477");for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);n("f1ae");var i,c=n("f0c5"),s=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,"9a6544a2",null,!1,o["a"],i);t["default"]=s.exports},"3f47":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("a34a")),a=n("f224"),r=n("4607");function i(e){return e&&e.__esModule?e:{default:e}}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t,n,o,a,r,i){try{var c=e[r](i),s=c.value}catch(u){return void n(u)}c.done?t(s):Promise.resolve(s).then(o,a)}function f(e){return function(){var t=this,n=arguments;return new Promise((function(o,a){var r=e.apply(t,n);function i(e){l(r,o,a,i,c,"next",e)}function c(e){l(r,o,a,i,c,"throw",e)}i(void 0)}))}}var d=function(){n.e("pages/myVideo/componets/shareModal").then(function(){return resolve(n("b01b"))}.bind(null,n)).catch(n.oe)},h={data:function(){return{videoInfo:{},mask:!1,showModal:!1,publishModal:!1,controls:!0,availableTime:0}},onLoad:function(e){this.getVideoInfo(e.videoId)},methods:{getVideoInfo:function(e){var t=this;return f(o.default.mark((function n(){var a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,(0,r.queryVideoInfo)({videoId:e});case 2:a=n.sent,t.videoInfo=t.handleVideoUrl(a);case 4:case"end":return n.stop()}}),n)})))()},handleVideoUrl:function(e){var t=function(e,t){var n=new a.JSEncrypt;return n.setPrivateKey(t),n.decrypt(e)};return e.value.url=t(e.value.url,getApp().globalData.encryptKey),e.value},timeupdate:function(t){if(!this.videoInfo.buyStatus){var n=t.detail,o=n.currentTime,a=n.duration,r=getApp().globalData.initParams.noBuyVideoLook;if(this.availableTime=Math.ceil(a*(r/100)),o>this.availableTime){var i=e.createVideoContext("video");this.controls=!1,i.stop()}}},ended:function(){var t=e.createVideoContext("video");t.seek(0),t.stop()},share:function(){this.mask=!0,this.showModal=!0},download:function(){var t=this;e.getSetting({success:function(n){if(!1===n.authSetting["scope.writePhotosAlbum"])wx.showModal({content:"检测到您没有打开存储权限，无法将视频保存到手机本地，是否去设置打开？",success:function(t){t.confirm&&e.openSetting()}});else{var o=e.downloadFile({url:t.videoInfo.url,success:function(n){200===n.statusCode?t.saveToAlbum(n.tempFilePath):e.showToast({title:"下载出错",icon:"none"})}});o.onProgressUpdate((function(t){e.showLoading({title:"下载中".concat(t.progress,"%"),mask:!0})}))}}})},saveToAlbum:function(t){e.saveVideoToPhotosAlbum({filePath:t,success:function(t){e.showToast({title:"已保存至相册",icon:"success",duration:2e3})},fail:function(t){e.showModal({content:"检测到您没有打开存储权限，无法将视频保存到手机本地，是否去设置打开？",success:function(t){t.confirm?e.openSetting():e.showToast({title:"保存失败",icon:"none"})}}),e.hideLoading()}})},cancel:function(){this.mask=!1,this.showModal=!1},changeShareStatus:function(){getApp().globalData.refreshWaterFall=!0,this.$set(this.videoInfo,"shareStatus",!0)},cancelShare:function(){var t=this;e.showModal({content:"是否取消发布",success:function(){var n=f(o.default.mark((function n(a){return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!a.confirm){n.next=14;break}return e.showLoading({title:"正在取消",mask:!0}),n.prev=2,n.next=5,(0,r.cancelShare)({videoId:t.videoInfo.id});case 5:n.sent,e.showToast({title:"取消成功"}),getApp().globalData.refreshWaterFall=!0,t.getVideoInfo(t.videoInfo.id),n.next=14;break;case 11:n.prev=11,n.t0=n["catch"](2),e.showToast({title:"取消失败",icon:"none"});case 14:case"end":return n.stop()}}),n,null,[[2,11]])})));function a(e){return n.apply(this,arguments)}return a}()})},buyTips:function(){var t=this;e.showModal({content:"购买视频后开启下载、分享功能 是否立即购买视频？",success:function(e){e.confirm&&t.buy()}})},buy:function(){var t=this;return f(o.default.mark((function n(){var a,i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.showLoading({title:"生成订单中",icon:"none",mask:!0}),n.next=3,(0,r.confirmOrder)({videoId:t.videoInfo.id});case 3:if(a=n.sent,1!==a.value.buyStatus){n.next=9;break}e.hideLoading(),e.showModal({content:"请勿重复购买",showCancel:!1}),n.next=22;break;case 9:return n.prev=9,n.next=12,(0,r.buy)({videoId:a.value.id,price:a.value.videoPrice});case 12:i=n.sent,e.requestPayment(s(s({},i.value),{},{success:function(n){t.$set(t.videoInfo,"buyStatus",1),t.controls=!0,e.showModal({content:"购买成功，快去分享吧~",showCancel:!1})}})),n.next=19;break;case 16:n.prev=16,n.t0=n["catch"](9),e.showModal({content:n.t0.toString()});case 19:return n.prev=19,e.hideLoading(),n.finish(19);case 22:case"end":return n.stop()}}),n,null,[[9,16,19,22]])})))()}},components:{shareModal:d}};t.default=h}).call(this,n("543d")["default"])},"9afa":function(e,t,n){"use strict";(function(e){n("7e8d");o(n("66fd"));var t=o(n("2310"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},c778:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o}));var a=function(){var e=this,t=e.$createElement,n=(e._self._c,Object.keys(e.videoInfo));e.$mp.data=Object.assign({},{$root:{g0:n}})},r=[]},dfa4:function(e,t,n){},f1ae:function(e,t,n){"use strict";var o=n("dfa4"),a=n.n(o);a.a}},[["9afa","common/runtime","common/vendor"]]]);