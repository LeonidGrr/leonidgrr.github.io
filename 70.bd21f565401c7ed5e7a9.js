(self.webpackChunkleonidgrr_github_io=self.webpackChunkleonidgrr_github_io||[]).push([[70],{3645:e=>{"use strict";e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t=function(e,n){var t=e[1]||"",_=e[3];if(!_)return t;if(n&&"function"==typeof btoa){var r=(i=_,l=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),u="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(l),"/*# ".concat(u," */")),o=_.sources.map((function(e){return"/*# sourceURL=".concat(_.sourceRoot||"").concat(e," */")}));return[t].concat(o).concat([r]).join("\n")}var i,l,u;return[t].join("\n")}(n,e);return n[2]?"@media ".concat(n[2]," {").concat(t,"}"):t})).join("")},n.i=function(e,t,_){"string"==typeof e&&(e=[[null,e,""]]);var r={};if(_)for(var o=0;o<this.length;o++){var i=this[o][0];null!=i&&(r[i]=!0)}for(var l=0;l<e.length;l++){var u=[].concat(e[l]);_&&r[u[0]]||(t&&(u[2]?u[2]="".concat(t," and ").concat(u[2]):u[2]=t),n.push(u))}},n}},1667:e=>{"use strict";e.exports=function(e,n){return n||(n={}),"string"!=typeof(e=e&&e.__esModule?e.default:e)?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),n.hash&&(e+=n.hash),/["'() \t\n]/.test(e)||n.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e)}},6400:(e,n,t)=>{"use strict";t.d(n,{HY:()=>h,YM:()=>r,sY:()=>R});var _,r,o,i,l,u,c={},a=[],f=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s(e,n){for(var t in n)e[t]=n[t];return e}function p(e){var n=e.parentNode;n&&n.removeChild(e)}function d(e,n,t,_,i){var l={type:e,props:n,key:t,ref:_,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==i?++o:i};return null==i&&null!=r.vnode&&r.vnode(l),l}function h(e){return e.children}function v(e,n){this.props=e,this.context=n}function m(e,n){if(null==n)return e.__?m(e.__,e.__.__k.indexOf(e)+1):null;for(var t;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e)return t.__e;return"function"==typeof e.type?m(e):null}function y(e){var n,t;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,n=0;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e){e.__e=e.__c.base=t.__e;break}return y(e)}}function g(e){(!e.__d&&(e.__d=!0)&&i.push(e)&&!b.__r++||u!==r.debounceRendering)&&((u=r.debounceRendering)||l)(b)}function b(){for(var e;b.__r=i.length;)e=i.sort((function(e,n){return e.__v.__b-n.__v.__b})),i=[],e.some((function(e){var n,t,_,r,o,i;e.__d&&(o=(r=(n=e).__v).__e,(i=n.__P)&&(t=[],(_=s({},r)).__v=r.__v+1,H(i,r,_,n.__n,void 0!==i.ownerSVGElement,null!=r.__h?[o]:null,t,null==o?m(r):o,r.__h),P(t,r),r.__e!=o&&y(r)))}))}function k(e,n,t,_,r,o,i,l,u,f){var s,p,v,y,g,b,k,S=_&&_.__k||a,w=S.length;for(t.__k=[],s=0;s<n.length;s++)if(null!=(y=t.__k[s]=null==(y=n[s])||"boolean"==typeof y?null:"string"==typeof y||"number"==typeof y||"bigint"==typeof y?d(null,y,null,null,y):Array.isArray(y)?d(h,{children:y},null,null,null):y.__b>0?d(y.type,y.props,y.key,null,y.__v):y)){if(y.__=t,y.__b=t.__b+1,null===(v=S[s])||v&&y.key==v.key&&y.type===v.type)S[s]=void 0;else for(p=0;p<w;p++){if((v=S[p])&&y.key==v.key&&y.type===v.type){S[p]=void 0;break}v=null}H(e,y,v=v||c,r,o,i,l,u,f),g=y.__e,(p=y.ref)&&v.ref!=p&&(k||(k=[]),v.ref&&k.push(v.ref,null,y),k.push(p,y.__c||g,y)),null!=g?(null==b&&(b=g),"function"==typeof y.type&&y.__k===v.__k?y.__d=u=M(y,u,e):u=x(e,y,v,S,g,u),"function"==typeof t.type&&(t.__d=u)):u&&v.__e==u&&u.parentNode!=e&&(u=m(v))}for(t.__e=b,s=w;s--;)null!=S[s]&&("function"==typeof t.type&&null!=S[s].__e&&S[s].__e==t.__d&&(t.__d=m(_,s+1)),A(S[s],S[s]));if(k)for(s=0;s<k.length;s++)Y(k[s],k[++s],k[++s])}function M(e,n,t){for(var _,r=e.__k,o=0;r&&o<r.length;o++)(_=r[o])&&(_.__=e,n="function"==typeof _.type?M(_,n,t):x(t,_,_,r,_.__e,n));return n}function x(e,n,t,_,r,o){var i,l,u;if(void 0!==n.__d)i=n.__d,n.__d=void 0;else if(null==t||r!=o||null==r.parentNode)e:if(null==o||o.parentNode!==e)e.appendChild(r),i=null;else{for(l=o,u=0;(l=l.nextSibling)&&u<_.length;u+=2)if(l==r)break e;e.insertBefore(r,o),i=o}return void 0!==i?i:r.nextSibling}function S(e,n,t){"-"===n[0]?e.setProperty(n,t):e[n]=null==t?"":"number"!=typeof t||f.test(n)?t:t+"px"}function w(e,n,t,_,r){var o;e:if("style"===n)if("string"==typeof t)e.style.cssText=t;else{if("string"==typeof _&&(e.style.cssText=_=""),_)for(n in _)t&&n in t||S(e.style,n,"");if(t)for(n in t)_&&t[n]===_[n]||S(e.style,n,t[n])}else if("o"===n[0]&&"n"===n[1])o=n!==(n=n.replace(/Capture$/,"")),n=n.toLowerCase()in e?n.toLowerCase().slice(2):n.slice(2),e.l||(e.l={}),e.l[n+o]=t,t?_||e.addEventListener(n,o?E:C,o):e.removeEventListener(n,o?E:C,o);else if("dangerouslySetInnerHTML"!==n){if(r)n=n.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("href"!==n&&"list"!==n&&"form"!==n&&"tabIndex"!==n&&"download"!==n&&n in e)try{e[n]=null==t?"":t;break e}catch(e){}"function"==typeof t||(null!=t&&(!1!==t||"a"===n[0]&&"r"===n[1])?e.setAttribute(n,t):e.removeAttribute(n))}}function C(e){this.l[e.type+!1](r.event?r.event(e):e)}function E(e){this.l[e.type+!0](r.event?r.event(e):e)}function H(e,n,t,_,o,i,l,u,c){var a,f,p,d,m,y,g,b,M,x,S,w,C,E=n.type;if(void 0!==n.constructor)return null;null!=t.__h&&(c=t.__h,u=n.__e=t.__e,n.__h=null,i=[u]),(a=r.__b)&&a(n);try{e:if("function"==typeof E){if(b=n.props,M=(a=E.contextType)&&_[a.__c],x=a?M?M.props.value:a.__:_,t.__c?g=(f=n.__c=t.__c).__=f.__E:("prototype"in E&&E.prototype.render?n.__c=f=new E(b,x):(n.__c=f=new v(b,x),f.constructor=E,f.render=N),M&&M.sub(f),f.props=b,f.state||(f.state={}),f.context=x,f.__n=_,p=f.__d=!0,f.__h=[]),null==f.__s&&(f.__s=f.state),null!=E.getDerivedStateFromProps&&(f.__s==f.state&&(f.__s=s({},f.__s)),s(f.__s,E.getDerivedStateFromProps(b,f.__s))),d=f.props,m=f.state,p)null==E.getDerivedStateFromProps&&null!=f.componentWillMount&&f.componentWillMount(),null!=f.componentDidMount&&f.__h.push(f.componentDidMount);else{if(null==E.getDerivedStateFromProps&&b!==d&&null!=f.componentWillReceiveProps&&f.componentWillReceiveProps(b,x),!f.__e&&null!=f.shouldComponentUpdate&&!1===f.shouldComponentUpdate(b,f.__s,x)||n.__v===t.__v){f.props=b,f.state=f.__s,n.__v!==t.__v&&(f.__d=!1),f.__v=n,n.__e=t.__e,n.__k=t.__k,n.__k.forEach((function(e){e&&(e.__=n)})),f.__h.length&&l.push(f);break e}null!=f.componentWillUpdate&&f.componentWillUpdate(b,f.__s,x),null!=f.componentDidUpdate&&f.__h.push((function(){f.componentDidUpdate(d,m,y)}))}if(f.context=x,f.props=b,f.__v=n,f.__P=e,S=r.__r,w=0,"prototype"in E&&E.prototype.render)f.state=f.__s,f.__d=!1,S&&S(n),a=f.render(f.props,f.state,f.context);else do{f.__d=!1,S&&S(n),a=f.render(f.props,f.state,f.context),f.state=f.__s}while(f.__d&&++w<25);f.state=f.__s,null!=f.getChildContext&&(_=s(s({},_),f.getChildContext())),p||null==f.getSnapshotBeforeUpdate||(y=f.getSnapshotBeforeUpdate(d,m)),C=null!=a&&a.type===h&&null==a.key?a.props.children:a,k(e,Array.isArray(C)?C:[C],n,t,_,o,i,l,u,c),f.base=n.__e,n.__h=null,f.__h.length&&l.push(f),g&&(f.__E=f.__=null),f.__e=!1}else null==i&&n.__v===t.__v?(n.__k=t.__k,n.__e=t.__e):n.__e=T(t.__e,n,t,_,o,i,l,c);(a=r.diffed)&&a(n)}catch(e){n.__v=null,(c||null!=i)&&(n.__e=u,n.__h=!!c,i[i.indexOf(u)]=null),r.__e(e,n,t)}}function P(e,n){r.__c&&r.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){r.__e(e,n.__v)}}))}function T(e,n,t,r,o,i,l,u){var a,f,s,d=t.props,h=n.props,v=n.type,y=0;if("svg"===v&&(o=!0),null!=i)for(;y<i.length;y++)if((a=i[y])&&"setAttribute"in a==!!v&&(v?a.localName===v:3===a.nodeType)){e=a,i[y]=null;break}if(null==e){if(null===v)return document.createTextNode(h);e=o?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,h.is&&h),i=null,u=!1}if(null===v)d===h||u&&e.data===h||(e.data=h);else{if(i=i&&_.call(e.childNodes),f=(d=t.props||c).dangerouslySetInnerHTML,s=h.dangerouslySetInnerHTML,!u){if(null!=i)for(d={},y=0;y<e.attributes.length;y++)d[e.attributes[y].name]=e.attributes[y].value;(s||f)&&(s&&(f&&s.__html==f.__html||s.__html===e.innerHTML)||(e.innerHTML=s&&s.__html||""))}if(function(e,n,t,_,r){var o;for(o in t)"children"===o||"key"===o||o in n||w(e,o,null,t[o],_);for(o in n)r&&"function"!=typeof n[o]||"children"===o||"key"===o||"value"===o||"checked"===o||t[o]===n[o]||w(e,o,n[o],t[o],_)}(e,h,d,o,u),s)n.__k=[];else if(y=n.props.children,k(e,Array.isArray(y)?y:[y],n,t,r,o&&"foreignObject"!==v,i,l,i?i[0]:t.__k&&m(t,0),u),null!=i)for(y=i.length;y--;)null!=i[y]&&p(i[y]);u||("value"in h&&void 0!==(y=h.value)&&(y!==e.value||"progress"===v&&!y||"option"===v&&y!==d.value)&&w(e,"value",y,d.value,!1),"checked"in h&&void 0!==(y=h.checked)&&y!==e.checked&&w(e,"checked",y,d.checked,!1))}return e}function Y(e,n,t){try{"function"==typeof e?e(n):e.current=n}catch(e){r.__e(e,t)}}function A(e,n,t){var _,o;if(r.unmount&&r.unmount(e),(_=e.ref)&&(_.current&&_.current!==e.__e||Y(_,null,n)),null!=(_=e.__c)){if(_.componentWillUnmount)try{_.componentWillUnmount()}catch(e){r.__e(e,n)}_.base=_.__P=null}if(_=e.__k)for(o=0;o<_.length;o++)_[o]&&A(_[o],n,"function"!=typeof e.type);t||null==e.__e||p(e.__e),e.__e=e.__d=void 0}function N(e,n,t){return this.constructor(e,t)}function R(e,n,t){var o,i,l;r.__&&r.__(e,n),i=(o="function"==typeof t)?null:t&&t.__k||n.__k,l=[],H(n,e=(!o&&t||n).__k=function(e,n,t){var r,o,i,l={};for(i in n)"key"==i?r=n[i]:"ref"==i?o=n[i]:l[i]=n[i];if(arguments.length>2&&(l.children=arguments.length>3?_.call(arguments,2):t),"function"==typeof e&&null!=e.defaultProps)for(i in e.defaultProps)void 0===l[i]&&(l[i]=e.defaultProps[i]);return d(e,l,r,o,null)}(h,null,[e]),i||c,c,void 0!==n.ownerSVGElement,!o&&t?[t]:i?null:n.firstChild?_.call(n.childNodes):null,l,!o&&t?t:i?i.__e:n.firstChild,o),P(l,e)}_=a.slice,r={__e:function(e,n,t,_){for(var r,o,i;n=n.__;)if((r=n.__c)&&!r.__)try{if((o=r.constructor)&&null!=o.getDerivedStateFromError&&(r.setState(o.getDerivedStateFromError(e)),i=r.__d),null!=r.componentDidCatch&&(r.componentDidCatch(e,_||{}),i=r.__d),i)return r.__E=r}catch(n){e=n}throw e}},o=0,v.prototype.setState=function(e,n){var t;t=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=s({},this.state),"function"==typeof e&&(e=e(s({},t),this.props)),e&&s(t,e),null!=e&&this.__v&&(n&&this.__h.push(n),g(this))},v.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),g(this))},v.prototype.render=h,i=[],l="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,b.__r=0},396:(e,n,t)=>{"use strict";t.d(n,{d4:()=>y,eJ:()=>m,sO:()=>g});var _,r,o,i,l=t(6400),u=0,c=[],a=[],f=l.YM.__b,s=l.YM.__r,p=l.YM.diffed,d=l.YM.__c,h=l.YM.unmount;function v(e,n){l.YM.__h&&l.YM.__h(r,e,u||n),u=0;var t=r.__H||(r.__H={__:[],__h:[]});return e>=t.__.length&&t.__.push({__V:a}),t.__[e]}function m(e){return u=1,function(e,n,t){var o=v(_++,2);return o.t=e,o.__c||(o.__=[t?t(n):C(void 0,n),function(e){var n=o.t(o.__[0],e);o.__[0]!==n&&(o.__=[n,o.__[1]],o.__c.setState({}))}],o.__c=r),o.__}(C,e)}function y(e,n){var t=v(_++,3);!l.YM.__s&&w(t.__H,n)&&(t.__=e,t.u=n,r.__H.__h.push(t))}function g(e){return u=5,b((function(){return{current:e}}),[])}function b(e,n){var t=v(_++,7);return w(t.__H,n)?(t.__V=e(),t.u=n,t.__h=e,t.__V):t.__}function k(){for(var e;e=c.shift();)if(e.__P)try{e.__H.__h.forEach(x),e.__H.__h.forEach(S),e.__H.__h=[]}catch(n){e.__H.__h=[],l.YM.__e(n,e.__v)}}l.YM.__b=function(e){r=null,f&&f(e)},l.YM.__r=function(e){s&&s(e),_=0;var n=(r=e.__c).__H;n&&(o===r?(n.__h=[],r.__h=[],n.__.forEach((function(e){e.__V=a,e.u=void 0}))):(n.__h.forEach(x),n.__h.forEach(S),n.__h=[])),o=r},l.YM.diffed=function(e){p&&p(e);var n=e.__c;n&&n.__H&&(n.__H.__h.length&&(1!==c.push(n)&&i===l.YM.requestAnimationFrame||((i=l.YM.requestAnimationFrame)||function(e){var n,t=function(){clearTimeout(_),M&&cancelAnimationFrame(n),setTimeout(e)},_=setTimeout(t,100);M&&(n=requestAnimationFrame(t))})(k)),n.__H.__.forEach((function(e){e.u&&(e.__H=e.u),e.__V!==a&&(e.__=e.__V),e.u=void 0,e.__V=a}))),o=r=null},l.YM.__c=function(e,n){n.some((function(e){try{e.__h.forEach(x),e.__h=e.__h.filter((function(e){return!e.__||S(e)}))}catch(t){n.some((function(e){e.__h&&(e.__h=[])})),n=[],l.YM.__e(t,e.__v)}})),d&&d(e,n)},l.YM.unmount=function(e){h&&h(e);var n,t=e.__c;t&&t.__H&&(t.__H.__.forEach((function(e){try{x(e)}catch(e){n=e}})),n&&l.YM.__e(n,t.__v))};var M="function"==typeof requestAnimationFrame;function x(e){var n=r,t=e.__c;"function"==typeof t&&(e.__c=void 0,t()),r=n}function S(e){var n=r;e.__c=e.__(),r=n}function w(e,n){return!e||e.length!==n.length||n.some((function(n,t){return n!==e[t]}))}function C(e,n){return"function"==typeof n?n(e):n}},6584:(e,n,t)=>{"use strict";t.d(n,{BX:()=>o,HY:()=>_.HY,tZ:()=>o});var _=t(6400),r=0;function o(e,n,t,o,i){var l,u,c={};for(u in n)"ref"==u?l=n[u]:c[u]=n[u];var a={type:e,props:c,key:t,ref:l,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:--r,__source:i,__self:o};if("function"==typeof e&&(l=e.defaultProps))for(u in l)void 0===c[u]&&(c[u]=l[u]);return _.YM.vnode&&_.YM.vnode(a),a}},2792:function(e){e.exports=function(){"use strict";var e=function(){var n=0,t=document.createElement("div");function _(e){return t.appendChild(e.dom),e}function r(e){for(var _=0;_<t.children.length;_++)t.children[_].style.display=_===e?"block":"none";n=e}t.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",t.addEventListener("click",(function(e){e.preventDefault(),r(++n%t.children.length)}),!1);var o=(performance||Date).now(),i=o,l=0,u=_(new e.Panel("FPS","#0ff","#002")),c=_(new e.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var a=_(new e.Panel("MB","#f08","#201"));return r(0),{REVISION:16,dom:t,addPanel:_,showPanel:r,begin:function(){o=(performance||Date).now()},end:function(){l++;var e=(performance||Date).now();if(c.update(e-o,200),i+1e3<=e&&(u.update(1e3*l/(e-i),100),i=e,l=0,a)){var n=performance.memory;a.update(n.usedJSHeapSize/1048576,n.jsHeapSizeLimit/1048576)}return e},update:function(){o=this.end()},domElement:t,setMode:r}};return e.Panel=function(e,n,t){var _=1/0,r=0,o=Math.round,i=o(window.devicePixelRatio||1),l=80*i,u=48*i,c=3*i,a=2*i,f=3*i,s=15*i,p=74*i,d=30*i,h=document.createElement("canvas");h.width=l,h.height=u,h.style.cssText="width:80px;height:48px";var v=h.getContext("2d");return v.font="bold "+9*i+"px Helvetica,Arial,sans-serif",v.textBaseline="top",v.fillStyle=t,v.fillRect(0,0,l,u),v.fillStyle=n,v.fillText(e,c,a),v.fillRect(f,s,p,d),v.fillStyle=t,v.globalAlpha=.9,v.fillRect(f,s,p,d),{dom:h,update:function(u,m){_=Math.min(_,u),r=Math.max(r,u),v.fillStyle=t,v.globalAlpha=1,v.fillRect(0,0,l,s),v.fillStyle=n,v.fillText(o(u)+" "+e+" ("+o(_)+"-"+o(r)+")",c,a),v.drawImage(h,f+i,s,p-i,d,f,s,p-i,d),v.fillRect(f+p-i,s,i,d),v.fillStyle=t,v.globalAlpha=.9,v.fillRect(f+p-i,s,i,o((1-u/m)*d))}}},e}()},3379:(e,n,t)=>{"use strict";var _,r=function(){return void 0===_&&(_=Boolean(window&&document&&document.all&&!window.atob)),_},o=function(){var e={};return function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}e[n]=t}return e[n]}}(),i=[];function l(e){for(var n=-1,t=0;t<i.length;t++)if(i[t].identifier===e){n=t;break}return n}function u(e,n){for(var t={},_=[],r=0;r<e.length;r++){var o=e[r],u=n.base?o[0]+n.base:o[0],c=t[u]||0,a="".concat(u," ").concat(c);t[u]=c+1;var f=l(a),s={css:o[1],media:o[2],sourceMap:o[3]};-1!==f?(i[f].references++,i[f].updater(s)):i.push({identifier:a,updater:v(s,n),references:1}),_.push(a)}return _}function c(e){var n=document.createElement("style"),_=e.attributes||{};if(void 0===_.nonce){var r=t.nc;r&&(_.nonce=r)}if(Object.keys(_).forEach((function(e){n.setAttribute(e,_[e])})),"function"==typeof e.insert)e.insert(n);else{var i=o(e.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}return n}var a,f=(a=[],function(e,n){return a[e]=n,a.filter(Boolean).join("\n")});function s(e,n,t,_){var r=t?"":_.media?"@media ".concat(_.media," {").concat(_.css,"}"):_.css;if(e.styleSheet)e.styleSheet.cssText=f(n,r);else{var o=document.createTextNode(r),i=e.childNodes;i[n]&&e.removeChild(i[n]),i.length?e.insertBefore(o,i[n]):e.appendChild(o)}}function p(e,n,t){var _=t.css,r=t.media,o=t.sourceMap;if(r?e.setAttribute("media",r):e.removeAttribute("media"),o&&"undefined"!=typeof btoa&&(_+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),e.styleSheet)e.styleSheet.cssText=_;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(_))}}var d=null,h=0;function v(e,n){var t,_,r;if(n.singleton){var o=h++;t=d||(d=c(n)),_=s.bind(null,t,o,!1),r=s.bind(null,t,o,!0)}else t=c(n),_=p.bind(null,t,n),r=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)};return _(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;_(e=n)}else r()}}e.exports=function(e,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=r());var t=u(e=e||[],n);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var _=0;_<t.length;_++){var r=l(t[_]);i[r].references--}for(var o=u(e,n),c=0;c<t.length;c++){var a=l(t[c]);0===i[a].references&&(i[a].updater(),i.splice(a,1))}t=o}}}}}]);
//# sourceMappingURL=70.bd21f565401c7ed5e7a9.js.map