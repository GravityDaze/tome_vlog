(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myVideo/componets/share"],{"08bb":function(e,n,t){"use strict";t.r(n);var o=t("561f"),u=t("caea");for(var r in u)"default"!==r&&function(e){t.d(n,e,(function(){return u[e]}))}(r);t("3a94");var s,i=t("f0c5"),a=Object(i["a"])(u["default"],o["b"],o["c"],!1,null,"2bc64450",null,!1,o["a"],s);n["default"]=a.exports},"3a94":function(e,n,t){"use strict";var o=t("aa24"),u=t.n(o);u.a},"561f":function(e,n,t){"use strict";t.d(n,"b",(function(){return u})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return o}));var o={uniPopup:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-popup/components/uni-popup/uni-popup")]).then(t.bind(null,"9f96"))}},u=function(){var e=this,n=e.$createElement;e._self._c;e._isMounted||(e.e0=function(n){return!n.show&&e.$emit("close")},e.e1=function(n){return e.$refs.toTome.open()},e.e2=function(n){return e.$refs.popup.close()},e.e3=function(n){return e.$refs.toTome.close()},e.e4=function(n){return e.$refs.moment.close()})},r=[]},"811e":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=r(t("a34a")),u=t("4607");function r(e){return e&&e.__esModule?e:{default:e}}function s(e,n,t,o,u,r,s){try{var i=e[r](s),a=i.value}catch(c){return void t(c)}i.done?n(a):Promise.resolve(a).then(o,u)}function i(e){return function(){var n=this,t=arguments;return new Promise((function(o,u){var r=e.apply(n,t);function i(e){s(r,o,u,i,a,"next",e)}function a(e){s(r,o,u,i,a,"throw",e)}i(void 0)}))}}var a={props:{videoInfo:{default:{},type:Object},shareModalVisual:{default:!1}},data:function(){return{describe:"",qr:"",showQrShare:!1}},watch:{shareModalVisual:function(e){e&&this.$refs.popup.open()}},methods:{shareToTome:function(){var n=this;return i(o.default.mark((function t(){var r;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r=/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi,""!==n.describe){t.next=5;break}return t.abrupt("return",e.showToast({title:"请输入说明",icon:"none",mask:!0}));case 5:if(!r.test(n.describe)){t.next=7;break}return t.abrupt("return",e.showToast({title:"暂不支持emoji",icon:"none",mask:!0}));case 7:return e.showLoading({title:"发布中",mask:!0}),t.prev=8,t.next=11,(0,u.share)({id:n.videoInfo.id,describe:n.describe});case 11:t.sent,e.showModal({title:"发布成功",content:"快去首页看看吧",success:function(n){n.confirm&&e.switchTab({url:"/pages/home/home"})}}),n.describe="",n.popup.close(),n.$refs.toTome.close(),n.$emit("publish-success"),t.next=22;break;case 19:t.prev=19,t.t0=t["catch"](8),e.showModal({content:t.t0.toString()});case 22:return t.prev=22,e.hideLoading(),t.finish(22);case 25:case"end":return t.stop()}}),t,null,[[8,19,22,25]])})))()},shareToMoments:function(){var n=this;return i(o.default.mark((function t(){var r,s,i;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(n.videoInfo),n.$refs.moment.open(),0===n.videoInfo.shareStatus?(s="pages/myVideo/myVideo",r=n.videoInfo.id):(s="pages/shareVideo/shareVideo",r=n.videoInfo.videoShareId),t.prev=3,t.next=6,(0,u.getQrCode)({pagePath:s,scene:r});case 6:i=t.sent,n.qr=i.value,t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](3),e.showModal({content:"朋友圈分享功能暂未开放"});case 13:case"end":return t.stop()}}),t,null,[[3,10]])})))()},saveImg:function(){var n=this;e.getSetting({success:function(t){if(!1===t.authSetting["scope.writePhotosAlbum"])wx.showModal({content:"检测到您没有打开存储权限，无法将视频保存到手机本地，是否去设置打开？",success:function(n){n.confirm&&e.openSetting()}});else e.downloadFile({url:n.qr,success:function(t){200===t.statusCode?n.saveToAlbum(t.tempFilePath):e.showToast({title:"下载出错",icon:"none"})}})}})},saveToAlbum:function(n){e.saveImageToPhotosAlbum({filePath:n,success:function(n){e.showToast({title:"已保存至相册",icon:"success",duration:2e3})},fail:function(n){e.showModal({content:"检测到您没有打开存储权限，无法将视频保存到手机本地，是否去设置打开？",success:function(n){n.confirm?e.openSetting():e.showToast({title:"保存失败",icon:"none"})}}),e.hideLoading()}})}}};n.default=a}).call(this,t("543d")["default"])},aa24:function(e,n,t){},caea:function(e,n,t){"use strict";t.r(n);var o=t("811e"),u=t.n(o);for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/myVideo/componets/share-create-component',
    {
        'pages/myVideo/componets/share-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("08bb"))
        })
    },
    [['pages/myVideo/componets/share-create-component']]
]);