(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"1dnL":function(t,e,r){"use strict";(function(t){function n(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==r)return;var n,o,a=[],i=!0,l=!1;try{for(r=r.call(t);!(i=(n=r.next()).done)&&(a.push(n.value),!e||a.length!==e);i=!0);}catch(t){l=!0,o=t}finally{try{i||null==r.return||r.return()}finally{if(l)throw o}}return a}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var a=r("8Jek"),i=r.n(a),l=r("QRet"),u=r("YmrP"),c=r("qZ0v");e.a=function(){var e=n(Object(l.f)(!1),2),r=e[0],o=e[1],a=n(Object(l.f)(0),2),s=a[0],f=a[1];return Object(l.b)((function(){u.q.onLoad=function(){setTimeout((function(){return o(!0)}))},u.q.onProgress=function(t,e,r){f(e/r*100)}}),[]),t("div",{className:i()(c.a["loader-wrapper"],r&&c.a["fade-out"])},t("div",{className:c.a["loader-progress"]},t("label",{for:"loader"},"Loading assets"),t("progress",{id:"loader",max:"100",value:s})))}}).call(this,r("hosL").h)},"8Jek":function(t,e,r){function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}var o;!function(){"use strict";function a(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var o=n(r);if("string"===o||"number"===o)t.push(r);else if(Array.isArray(r)){if(r.length){var l=a.apply(null,r);l&&t.push(l)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var u in r)i.call(r,u)&&r[u]&&t.push(u);else t.push(r.toString())}}return t.join(" ")}var i={}.hasOwnProperty;t.exports?(a.default=a,t.exports=a):"object"===n(r("K2jg"))&&r("K2jg")?void 0===(o=function(){return a}.apply(e,[]))||(t.exports=o):window.classNames=a}()},CmqI:function(t,e){"use strict";e.a={explore:"explore__sC0To",opacity_animation:"opacity_animation__cfcuz","explore-separator":"explore-separator__YKfQ6",width_animation:"width_animation__HFgqT",content:"content__riTMf",description:"description__rbxxy",scenes:"scenes__zIShF","content--show":"content--show__9TFrw","description--show":"description--show__b0qzU"}},FDtd:function(t,e,r){"use strict";r.r(e),function(t,n){var o=r("Y3FI"),a=r("QRet"),i=r("YICh"),l=r("yzrN"),u=r("Gb8u"),c=r("1dnL"),s={name:"My dev lair",header:"my dev lair",desc:"Hello! My name is Leonid. I am just humble programmer trying to learn something in a spare time.\n This is little demo page. Feel free to tap and click around. ",sub:{screen:{name:"Screen",desc:"For now this is just an example of THREEJS render target..."}}};e.default=function(){var e=Object(a.a)(i.a),r=e.currentCamera,f=e.changeCamera,p=e.webGLAvailable,d=e.isEnabled;return Object(a.b)((function(){!p&&d&&Object(o.route)("/nowebgl",!0)}),[p,d]),t(n,null,t(u.a,{header:s.header}),t(l.a,{currentCamera:r,onChangeCamera:f,titleMap:s}),p&&d&&t(n,null,t(c.a,null),t("canvas",{className:"webgl",tabIndex:1})))}}.call(this,r("hosL").h,r("hosL").Fragment)},Gb8u:function(t,e,r){"use strict";(function(t){var n=r("JXcY");e.a=function(e){return t("header",{className:n.a.header},t("h1",null,e.header))}}).call(this,r("hosL").h)},JXcY:function(t,e){"use strict";e.a={header:"header__pBWgD",opacity_animation:"opacity_animation__piEyb",width_animation:"width_animation__rwi1z"}},K2jg:function(t){(function(e){t.exports=e}).call(this,{})},qZ0v:function(t,e){"use strict";e.a={"loader-wrapper":"loader-wrapper__gLPZi","fade-out":"fade-out__SuLAa","loader-progress":"loader-progress__kID0V"}},yzrN:function(t,e,r){"use strict";(function(t,n){function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==r)return;var n,o,a=[],i=!0,l=!1;try{for(r=r.call(t);!(i=(n=r.next()).done)&&(a.push(n.value),!e||a.length!==e);i=!0);}catch(t){l=!0,o=t}finally{try{i||null==r.return||r.return()}finally{if(l)throw o}}return a}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return a(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return a(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var i=r("QRet"),l=r("8Jek"),u=r.n(l),c=r("CmqI");e.a=function(e){var r=e.currentCamera,a=e.titleMap,l=o(Object(i.f)(!1),2),s=l[1],f=o(Object(i.f)(null),2),p=f[0],d=f[1];Object(i.e)(null);return Object(i.b)((function(){var t;d((null==a||null===(t=a.sub[r])||void 0===t?void 0:t.desc)||(null==a?void 0:a.desc))}),[r]),t(n,null,t("div",{"aria-label":"Explore more",className:c.a.explore},t("div",{className:c.a["explore-separator"]}),t("button",{type:"button",onClick:function(t){t.stopPropagation(),s((function(t){return!t}))}},"Explore more")),t("div",{className:u()(c.a.description,p&&c.a["description--show"])},t("span",{"aria-label":"Description"},p)))}}).call(this,r("hosL").h,r("hosL").Fragment)}}]);
//# sourceMappingURL=route-home.chunk.8075c.js.map