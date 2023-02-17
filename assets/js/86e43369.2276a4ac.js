"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[567],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>d});var n=r(67294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},s="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),s=p(r),m=i,d=s["".concat(l,".").concat(m)]||s[m]||f[m]||o;return r?n.createElement(d,a(a({ref:t},u),{},{components:r})):n.createElement(d,a({ref:t},u))}));function d(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,a=new Array(o);a[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[s]="string"==typeof e?e:i,a[1]=c;for(var p=2;p<o;p++)a[p]=r[p];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},17756:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>f,frontMatter:()=>o,metadata:()=>c,toc:()=>p});var n=r(87462),i=(r(67294),r(3905));const o={sidebar_position:6},a="TAT-Sub-F\u7684\u5b9e\u73b0",c={unversionedId:"tutorial-chapter-4/implementing-tat-sub-f",id:"tutorial-chapter-4/implementing-tat-sub-f",title:"TAT-Sub-F\u7684\u5b9e\u73b0",description:"Live coding!",source:"@site/docs/tutorial-chapter-4/implementing-tat-sub-f.md",sourceDirName:"tutorial-chapter-4",slug:"/tutorial-chapter-4/implementing-tat-sub-f",permalink:"/write-you-a-typescript/docs/tutorial-chapter-4/implementing-tat-sub-f",draft:!1,editUrl:"https://github.com/suica/write-you-a-typescript/tree/main/docs/docs/tutorial-chapter-4/implementing-tat-sub-f.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"tutorialSidebar",previous:{title:"\u5168\u79f0\u7c7b\u578b\u548c\u67ef\u91cc\u970d\u534e\u5fb7\u540c\u6784",permalink:"/write-you-a-typescript/docs/tutorial-chapter-4/universal-types-and-chi"},next:{title:"5. TAT\u7c7b\u578b\u68c0\u67e5\u5668\u4e0eTypeScript\u7684\u7c7b\u578b\u7f16\u7a0b",permalink:"/write-you-a-typescript/docs/category/5-tat\u7c7b\u578b\u68c0\u67e5\u5668\u4e0etypescript\u7684\u7c7b\u578b\u7f16\u7a0b"}},l={},p=[{value:"\u4f5c\u4e1a",id:"\u4f5c\u4e1a",level:2}],u={toc:p},s="wrapper";function f(e){let{components:t,...r}=e;return(0,i.kt)(s,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"tat-sub-f\u7684\u5b9e\u73b0"},"TAT-Sub-F\u7684\u5b9e\u73b0"),(0,i.kt)("p",null,"Live coding!"),(0,i.kt)("p",null,"\u5b9e\u73b0\u601d\u8def\uff1a"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"\u6839\u636eBabel\u7684AST\uff0c\u63d0\u53d6\u51fa\u6cdb\u578b\u51fd\u6570\u7684\u53c2\u6570\u3002"),(0,i.kt)("li",{parentName:"ol"},"\u5b9e\u73b0\u7c7b\u578b\u7684\u9012\u5f52\u66ff\u6362\u51fd\u6570\u3002")),(0,i.kt)("hr",null),(0,i.kt)("h2",{id:"\u4f5c\u4e1a"},"\u4f5c\u4e1a"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"\u5b9e\u73b0TAT-Sub-F\uff0c\u901a\u8fc7\u6240\u6709\u6d4b\u8bd5\u7528\u4f8b\u3002")))}f.isMDXComponent=!0}}]);