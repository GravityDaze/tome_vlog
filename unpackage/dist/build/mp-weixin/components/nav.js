(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/nav"],{2827:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{statusBarHeight:0,navHeight:0,capsuleLeft:0,capsuleHeight:0,capsuleTop:0}},props:{immersive:{default:!0,type:Boolean},showBack:{default:!1,type:Boolean}},watch:{immersive:function(e){e?t.setNavigationBarColor({frontColor:"#ffffff",backgroundColor:"#000000"}):t.setNavigationBarColor({frontColor:"#000000",backgroundColor:"#000000"})}},created:function(){this.getSysInfo()},methods:{getSysInfo:function(){var e=t.getSystemInfoSync(),n=t.getMenuButtonBoundingClientRect();this.statusBarHeight=e.statusBarHeight,this.navHeight=2*(n.top-this.statusBarHeight)+n.height,this.capsuleLeft=e.screenWidth-n.right,this.capsuleTop=n.top-this.statusBarHeight,this.capsuleHeight=n.height},back:function(){t.navigateBack()}}};e.default=n}).call(this,n("543d")["default"])},"927c":function(t,e,n){"use strict";n.r(e);var a=n("b736"),o=n("e9a6");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("dc68");var u,r=n("f0c5"),c=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,"0e687c9e",null,!1,a["a"],u);e["default"]=c.exports},"94f9":function(t,e,n){},b736:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var o=function(){var t=this,e=t.$createElement;t._self._c},i=[]},dc68:function(t,e,n){"use strict";var a=n("94f9"),o=n.n(a);o.a},e9a6:function(t,e,n){"use strict";n.r(e);var a=n("2827"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/nav-create-component',
    {
        'components/nav-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("927c"))
        })
    },
    [['components/nav-create-component']]
]);
