(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/login/login-other"],{"5ab2":function(n,t,e){},"6f26":function(n,t,e){"use strict";e.r(t);var o=e("d4f9"),u=e.n(o);for(var c in o)["default"].indexOf(c)<0&&function(n){e.d(t,n,(function(){return o[n]}))}(c);t["default"]=u.a},"89cb":function(n,t,e){"use strict";e.d(t,"b",(function(){return o})),e.d(t,"c",(function(){return u})),e.d(t,"a",(function(){}));var o=function(){var n=this.$createElement;this._self._c},u=[]},"9a42":function(n,t,e){"use strict";e.r(t);var o=e("89cb"),u=e("6f26");for(var c in u)["default"].indexOf(c)<0&&function(n){e.d(t,n,(function(){return u[n]}))}(c);e("aa87");var i=e("f0c5"),f=Object(i["a"])(u["default"],o["b"],o["c"],!1,null,"7dd2deb6",null,!1,o["a"],void 0);t["default"]=f.exports},aa87:function(n,t,e){"use strict";var o=e("5ab2"),u=e.n(o);u.a},d4f9:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={methods:{loginOther:function(t){n.login({provider:t,success:function(e){e.authResult.openid;n.getUserInfo({provider:t,success:function(n){console.log(n)}})}})}}};t.default=e}).call(this,e("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/login/login-other-create-component',
    {
        'components/login/login-other-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9a42"))
        })
    },
    [['components/login/login-other-create-component']]
]);
