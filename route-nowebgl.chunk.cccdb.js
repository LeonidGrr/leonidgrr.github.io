(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"ox/y":function(t,e,n){"use strict";function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==o(e)&&"function"!=typeof e?t:e}Object.defineProperty(e,"__esModule",{value:!0}),e.Link=e.Match=void 0;var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},u=n("hosL"),c=n("Y3FI"),s=e.Match=function(t){function e(){for(var e,n,o=arguments.length,i=Array(o),u=0;u<o;u++)i[u]=arguments[u];return e=n=r(this,t.call.apply(t,[this].concat(i))),n.update=function(t){n.nextUrl=t,n.setState({})},r(n,e)}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+o(e));t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.componentDidMount=function(){c.subscribers.push(this.update)},e.prototype.componentWillUnmount=function(){c.subscribers.splice(c.subscribers.indexOf(this.update)>>>0,1)},e.prototype.render=function(t){var e=this.nextUrl||(0,c.getCurrentUrl)(),n=e.replace(/\?.+$/,"");return this.nextUrl=null,t.children({url:e,path:n,matches:!1!==(0,c.exec)(n,t.path,{})})},e}(u.Component),a=function(t){var e=t.activeClassName,n=t.path,o=function(t,e){var n={};for(var o in t)e.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o]);return n}(t,["activeClassName","path"]);return(0,u.h)(s,{path:n||o.href},(function(t){return(0,u.h)(c.Link,i({},o,{class:[o.class||o.className,t.matches&&e].filter(Boolean).join(" ")}))}))};e.Link=a,e.default=s,s.Link=a},ugh2:function(t,e,n){"use strict";n.r(e),function(t){var o=n("ox/y"),r=n("QRet"),i=n("YICh");e.default=function(){var e=Object(r.b)(i.a).disable3d;return t("div",{class:"message"},t("h1",null,"Looks like your browser does not support WebGL"),t("p",null,"Check ",t("a",{href:"https://get.webgl.org"},"https://get.webgl.org")," for troubleshooting."),t(o.Link,{href:"/",onClick:e},t("h4",null,"Continue without 3d scene...")))}}.call(this,n("hosL").h)}}]);
//# sourceMappingURL=route-nowebgl.chunk.cccdb.js.map