(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{CmqI:function(e,t){"use strict";t.a={explore:"explore__sC0To",opacity_animation:"opacity_animation__cfcuz","explore-separator":"explore-separator__YKfQ6",width_animation:"width_animation__HFgqT",content:"content__riTMf",description:"description__rbxxy",scenes:"scenes__zIShF",contentShow:"contentShow__ddXxi",descriptionShow:"descriptionShow__28FTC",closeButton:"closeButton__nPq+M"}},FDtd:function(e,t,a){"use strict";a.r(t),function(e,n){var o=a("QRet"),r=a("YICh"),i=a("yzrN"),s=a("Gb8u");const c={name:"My dev lair",header:"my dev lair",desc:"Hello! My name is Leonid. I am just humble programmer trying to learn something in a spare time.\n This is little demo page. Feel free to tap and click around.",sub:{screen:"For now this is just an example of THREEJS render target...",windows:'I like rain.\nTo program this raindrops I used <a href="https://www.shadertoy.com/view/ltffzl">beautiful shadertoys from Heartfelt</a> as a reference\n and then ported them into ThreeJS ShaderMaterial.'}};t.default=()=>{const{currentCamera:t,changeCamera:a,loader:l}=Object(o.b)(r.a);return e(n,null,e(s.a,{header:c.header}),e(i.a,{currentCamera:t,onChangeCamera:a,titleMap:c}),l)}}.call(this,a("hosL").h,a("hosL").Fragment)},Gb8u:function(e,t,a){"use strict";(function(e){var n=a("JXcY");t.a=t=>{const{header:a}=t;return e("header",{className:n.a.header},e("h1",null,a))}}).call(this,a("hosL").h)},JXcY:function(e,t){"use strict";t.a={header:"header__pBWgD",opacity_animation:"opacity_animation__piEyb",width_animation:"width_animation__rwi1z"}},yzrN:function(e,t,a){"use strict";(function(e,n){var o=a("QRet"),r=a("8Jek"),i=a.n(r),s=a("CmqI");t.a=t=>{const{onChangeCamera:a,currentCamera:r,titleMap:c}=t,[l,u]=Object(o.g)(!1),[h,d]=Object(o.g)(null),p=Object(o.f)(null),m=e=>{e.stopPropagation();const{key:t}=e.currentTarget.dataset;t&&r!==t&&(a(t),p.current&&p.current.offsetWidth>=document.body.clientWidth/2&&u(!1))};Object(o.c)((()=>{d(c.sub[r]||c.desc)}),[r]);const _=Object(o.a)((()=>{d(null)}),[]);return e(n,null,e("div",{"aria-label":"Explore more",className:s.a.explore},e("div",{className:s.a["explore-separator"]}),e("button",{type:"button",onClick:e=>{e.stopPropagation(),u((e=>!e))}},"Explore more")),e("div",{"aria-label":"Table of content",ref:p,className:i()(s.a.content,l&&s.a.contentShow)},e("ul",{className:s.a.scenes},Object.keys(c.sub).map((t=>e("li",{key:t},e("button",{"data-key":t,type:"button",onPointerDown:m},t)))),e("li",{className:s.a.links},e("a",{href:"https://github.com/LeonidGrr/leonidgrr.github.io"},"GitHub")))),e("div",{className:i()(s.a.description,h&&s.a.descriptionShow)},e("span",{"aria-label":"Description",dangerouslySetInnerHTML:{__html:h||""}}),e("button",{title:"Close",className:s.a.closeButton,onClick:_},"⨯")))}}).call(this,a("hosL").h,a("hosL").Fragment)}}]);
//# sourceMappingURL=route-home.chunk.57c9a.esm.js.map