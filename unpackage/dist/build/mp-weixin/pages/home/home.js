(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/home/home"],{"4e73":function(e,t,n){"use strict";(function(e){n("7e8d");r(n("66fd"));var t=r(n("e115"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},ac85:function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return r}));var a=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.done=!0})},o=[]},b928:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n("a34a")),a=n("0866");function o(e){return e&&e.__esModule?e:{default:e}}function c(e){return s(e)||u(e)||p(e)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function s(e){if(Array.isArray(e))return d(e)}function l(e,t){return m(e)||g(e,t)||p(e,t)||f()}function f(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function p(e,t){if(e){if("string"===typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function g(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(r=(c=i.next()).done);r=!0)if(n.push(c.value),t&&n.length===t)break}catch(u){a=!0,o=u}finally{try{r||null==i["return"]||i["return"]()}finally{if(a)throw o}}return n}}function m(e){if(Array.isArray(e))return e}function b(e,t,n,r,a,o,c){try{var i=e[o](c),u=i.value}catch(s){return void n(s)}i.done?t(u):Promise.resolve(u).then(r,a)}function h(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function c(e){b(o,r,a,c,i,"next",e)}function i(e){b(o,r,a,c,i,"throw",e)}c(void 0)}))}}var y=function(){n.e("components/nav").then(function(){return resolve(n("927c"))}.bind(null,n)).catch(n.oe)},v=function(){Promise.all([n.e("common/vendor"),n.e("pages/home/components/nearby")]).then(function(){return resolve(n("84f1"))}.bind(null,n)).catch(n.oe)},w=function(){n.e("pages/home/components/moment").then(function(){return resolve(n("ddb6"))}.bind(null,n)).catch(n.oe)},A=function(){n.e("pages/home/components/promote").then(function(){return resolve(n("ec7d"))}.bind(null,n)).catch(n.oe)},L={data:function(){return{bannerList:[],nearbyList:[],immersive:!0,done:!1,sceneryName:"",scrollTop:0}},onLoad:function(){var t=this;this.getBannerList(),e.$on("refreshWaterfall",(function(e){t.done=!1,t.$refs.moment.refresh()}))},onShow:function(){this.setTabBarIndex(0),this.getLocation(),this.sceneryName=getApp().globalData.sceneryName},methods:{getLocation:function(){var t=this;return h(r.default.mark((function n(){var a,o,c,i,u,s,f,p,d,g,m;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.getLocation({type:"gcj02"});case 2:if(a=n.sent,o=l(a,2),c=o[0],i=o[1],!c){n.next=19;break}return u=getApp().globalData,s=u.lon,f=u.lat,p=u.sceneryId,t.getNearbyList(s,f),p||(t.sceneryName="未定位到景区",getApp().globalData.sceneryName="未定位到景区"),n.next=12,e.getSetting();case 12:d=n.sent,g=l(d,2),g[0],m=g[1],!1===m.authSetting["scope.userLocation"]&&e.showModal({title:"提示",content:"检测到您拒绝了地理位置授权，这将无法为您提供VLOG服务，请打开设置界面手动开启权限。 ",success:function(t){t.confirm?e.openSetting():e.showToast({title:"授权失败",icon:"none"})}}),n.next=23;break;case 19:console.log("授权地理位置成功"),getApp().globalData.lat=i.latitude,getApp().globalData.lon=i.longitude,t.getCurrentScenery();case 23:case"end":return n.stop()}}),n)})))()},getCurrentScenery:function(){var t=this;return h(r.default.mark((function n(){var o,c,i,u,s,l,f,p,d,g;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return o=getApp().globalData,c=o.lon,i=o.lat,n.prev=1,n.next=4,(0,a.queryCurrentScenery)({lon:c,lat:i});case 4:u=n.sent,s=u.value,l=s.name,f=s.id,p=getApp().globalData.manual.lon,d=getApp().globalData.manual.lat,f?(g=getApp().globalData.sceneryName,p?g!==l?e.showModal({title:"定位到您在".concat(l),content:"是否切换至".concat(l,"？"),confirmText:"切换",success:function(e){var n=e.confirm;n?(getApp().globalData.manual={},t.sceneryName=l,getApp().globalData.sceneryName=l,getApp().globalData.sceneryId=f,t.getNearbyList(c,i)):t.getNearbyList(p,d)}}):t.getNearbyList(p,d):(t.sceneryName=l,getApp().globalData.sceneryName=l,getApp().globalData.sceneryId=f,t.getNearbyList(c,i))):p?t.getNearbyList(p,d):(t.sceneryName="未定位到景区",getApp().globalData.sceneryName="未定位到景区",getApp().globalData.sceneryId="",t.getNearbyList(c,i)),n.next=14;break;case 11:n.prev=11,n.t0=n["catch"](1),console.log(n.t0);case 14:case"end":return n.stop()}}),n,null,[[1,11]])})))()},getNearbyList:function(e,t){var n=this;return h(r.default.mark((function o(){var i,u,s,l,f;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,(0,a.queryCard)({lon:e,lat:t});case 2:for(i=r.sent,u=i.value,s=0,l=0;l<u.length;l++)1===u[l].isOpen&&(f=u.splice(l,1),u.splice.apply(u,[s++,0].concat(c(f))));n.nearbyList=u;case 7:case"end":return r.stop()}}),o)})))()},getBannerList:function(){var e=this;return h(r.default.mark((function t(){var n;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,a.queryBannerList)();case 2:n=t.sent,e.bannerList=n.value;case 4:case"end":return t.stop()}}),t)})))()},queryScenery:function(){e.navigateTo({url:"/pages/sceneryList/sceneryList"})},navigate:function(t){e.navigateTo({url:"/pages/shareVideo/shareVideo?videoShareId=".concat(t.videoShareId)})}},onReachBottom:function(){this.done||this.$refs.moment.loadNextPage()},onPageScroll:function(e){this.scrollTop=e.scrollTop},onShareAppMessage:function(){return{path:"/pages/index/index",title:"快来跟我一起体验途咪vlog吧"}},onShareTimeline:function(){return{}},components:{navbar:y,nearby:v,moment:w,promote:A}};t.default=L}).call(this,n("543d")["default"])},c3b2:function(e,t,n){"use strict";n.r(t);var r=n("b928"),a=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);t["default"]=a.a},d58b:function(e,t,n){},e115:function(e,t,n){"use strict";n.r(t);var r=n("ac85"),a=n("c3b2");for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n("e7ac");var c,i=n("f0c5"),u=Object(i["a"])(a["default"],r["b"],r["c"],!1,null,"352b9e07",null,!1,r["a"],c);t["default"]=u.exports},e7ac:function(e,t,n){"use strict";var r=n("d58b"),a=n.n(r);a.a}},[["4e73","common/runtime","common/vendor"]]]);