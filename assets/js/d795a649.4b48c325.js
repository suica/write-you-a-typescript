"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7447],{3905:(a,e,t)=>{t.d(e,{Zo:()=>N,kt:()=>h});var n=t(67294);function s(a,e,t){return e in a?Object.defineProperty(a,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):a[e]=t,a}function m(a,e){var t=Object.keys(a);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(a);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),t.push.apply(t,n)}return t}function p(a){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?m(Object(t),!0).forEach((function(e){s(a,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(t)):m(Object(t)).forEach((function(e){Object.defineProperty(a,e,Object.getOwnPropertyDescriptor(t,e))}))}return a}function r(a,e){if(null==a)return{};var t,n,s=function(a,e){if(null==a)return{};var t,n,s={},m=Object.keys(a);for(n=0;n<m.length;n++)t=m[n],e.indexOf(t)>=0||(s[t]=a[t]);return s}(a,e);if(Object.getOwnPropertySymbols){var m=Object.getOwnPropertySymbols(a);for(n=0;n<m.length;n++)t=m[n],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(a,t)&&(s[t]=a[t])}return s}var l=n.createContext({}),i=function(a){var e=n.useContext(l),t=e;return a&&(t="function"==typeof a?a(e):p(p({},e),a)),t},N=function(a){var e=i(a.components);return n.createElement(l.Provider,{value:e},a.children)},c="mdxType",o={inlineCode:"code",wrapper:function(a){var e=a.children;return n.createElement(n.Fragment,{},e)}},k=n.forwardRef((function(a,e){var t=a.components,s=a.mdxType,m=a.originalType,l=a.parentName,N=r(a,["components","mdxType","originalType","parentName"]),c=i(t),k=s,h=c["".concat(l,".").concat(k)]||c[k]||o[k]||m;return t?n.createElement(h,p(p({ref:e},N),{},{components:t})):n.createElement(h,p({ref:e},N))}));function h(a,e){var t=arguments,s=e&&e.mdxType;if("string"==typeof a||s){var m=t.length,p=new Array(m);p[0]=k;var r={};for(var l in e)hasOwnProperty.call(e,l)&&(r[l]=e[l]);r.originalType=a,r[c]="string"==typeof a?a:s,p[1]=r;for(var i=2;i<m;i++)p[i]=t[i];return n.createElement.apply(null,p)}return n.createElement.apply(null,t)}k.displayName="MDXCreateElement"},85026:(a,e,t)=>{t.r(e),t.d(e,{assets:()=>l,contentTitle:()=>p,default:()=>o,frontMatter:()=>m,metadata:()=>r,toc:()=>i});var n=t(87462),s=(t(67294),t(3905));const m={sidebar_position:5},p="\u5168\u79f0\u7c7b\u578b\u548c\u67ef\u91cc\u970d\u534e\u5fb7\u540c\u6784",r={unversionedId:"tutorial-chapter-4/universal-types-and-chi",id:"tutorial-chapter-4/universal-types-and-chi",title:"\u5168\u79f0\u7c7b\u578b\u548c\u67ef\u91cc\u970d\u534e\u5fb7\u540c\u6784",description:"\u5927\u5bb6\u53ef\u80fd\u6709\u8fd9\u6837\u7684\u7591\u60d1\uff0c\u4e3a\u4ec0\u4e48\u9700\u8981\u5c06\u591a\u6001\u7684\u51fd\u6570\u7c7b\u578b\u8bb0\u6210$\\forall X. T1\\Rightarrow T2$\u7684\u6837\u5b50\u5462\uff1f",source:"@site/docs/tutorial-chapter-4/universal-types-and-chi.md",sourceDirName:"tutorial-chapter-4",slug:"/tutorial-chapter-4/universal-types-and-chi",permalink:"/write-you-a-typescript/docs/tutorial-chapter-4/universal-types-and-chi",draft:!1,editUrl:"https://github.com/suica/write-you-a-typescript/tree/main/docs/docs/tutorial-chapter-4/universal-types-and-chi.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"\u5c06\u591a\u6001\u5f15\u5165\u7c7b\u578b\u7cfb\u7edf",permalink:"/write-you-a-typescript/docs/tutorial-chapter-4/polymorphism-in-type-system"},next:{title:"TAT-Sub-F\u7684\u5b9e\u73b0",permalink:"/write-you-a-typescript/docs/tutorial-chapter-4/implementing-tat-sub-f"}},l={},i=[],N={toc:i},c="wrapper";function o(a){let{components:e,...t}=a;return(0,s.kt)(c,(0,n.Z)({},N,t,{components:e,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"\u5168\u79f0\u7c7b\u578b\u548c\u67ef\u91cc\u970d\u534e\u5fb7\u540c\u6784"},"\u5168\u79f0\u7c7b\u578b\u548c\u67ef\u91cc\u970d\u534e\u5fb7\u540c\u6784"),(0,s.kt)("p",null,"\u5927\u5bb6\u53ef\u80fd\u6709\u8fd9\u6837\u7684\u7591\u60d1\uff0c\u4e3a\u4ec0\u4e48\u9700\u8981\u5c06\u591a\u6001\u7684\u51fd\u6570\u7c7b\u578b\u8bb0\u6210",(0,s.kt)("span",{parentName:"p",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow",mathvariant:"normal"},"\u2200"),(0,s.kt)("mi",{parentName:"mrow"},"X"),(0,s.kt)("mi",{parentName:"mrow",mathvariant:"normal"},"."),(0,s.kt)("msub",{parentName:"mrow"},(0,s.kt)("mi",{parentName:"msub"},"T"),(0,s.kt)("mn",{parentName:"msub"},"1")),(0,s.kt)("mo",{parentName:"mrow"},"\u21d2"),(0,s.kt)("msub",{parentName:"mrow"},(0,s.kt)("mi",{parentName:"msub"},"T"),(0,s.kt)("mn",{parentName:"msub"},"2"))),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\forall X. T_1\\Rightarrow T_2")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.8444em",verticalAlign:"-0.15em"}}),(0,s.kt)("span",{parentName:"span",className:"mord"},"\u2200"),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.07847em"}},"X"),(0,s.kt)("span",{parentName:"span",className:"mord"},"."),(0,s.kt)("span",{parentName:"span",className:"mord"},(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.13889em"}},"T"),(0,s.kt)("span",{parentName:"span",className:"msupsub"},(0,s.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,s.kt)("span",{parentName:"span",className:"vlist-r"},(0,s.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.3011em"}},(0,s.kt)("span",{parentName:"span",style:{top:"-2.55em",marginLeft:"-0.1389em",marginRight:"0.05em"}},(0,s.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,s.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,s.kt)("span",{parentName:"span",className:"mord mtight"},"1")))),(0,s.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,s.kt)("span",{parentName:"span",className:"vlist-r"},(0,s.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.15em"}},(0,s.kt)("span",{parentName:"span"})))))),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2778em"}}),(0,s.kt)("span",{parentName:"span",className:"mrel"},"\u21d2"),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2778em"}})),(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.8333em",verticalAlign:"-0.15em"}}),(0,s.kt)("span",{parentName:"span",className:"mord"},(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.13889em"}},"T"),(0,s.kt)("span",{parentName:"span",className:"msupsub"},(0,s.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,s.kt)("span",{parentName:"span",className:"vlist-r"},(0,s.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.3011em"}},(0,s.kt)("span",{parentName:"span",style:{top:"-2.55em",marginLeft:"-0.1389em",marginRight:"0.05em"}},(0,s.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,s.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,s.kt)("span",{parentName:"span",className:"mord mtight"},"2")))),(0,s.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,s.kt)("span",{parentName:"span",className:"vlist-r"},(0,s.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.15em"}},(0,s.kt)("span",{parentName:"span"})))))))))),"\u7684\u6837\u5b50\u5462\uff1f"),(0,s.kt)("p",null,"\u5b83\u7684\u539f\u56e0\u662f\uff0c\u7c7b\u578b\u7cfb\u7edf\u7684\u63a8\u7406\u89c4\u5219\uff0c\u5176\u5b9e\u672c\u8d28\u4e0a\u548c\u4e00\u4e2a\u903b\u8f91\u4e0a\u7684\u516c\u7406\u7cfb\u7edf\u7684\u63a8\u7406\u89c4\u5219\u662f\u4e00\u6837\u7684\u3002"),(0,s.kt)("p",null,"\u6211\u4eec\u53ef\u4ee5\u628a\u4e00\u4e2a\u547d\u9898\uff0c\u4f8b\u5982",(0,s.kt)("span",{parentName:"p",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"A"),(0,s.kt)("mo",{parentName:"mrow"},"\u2192"),(0,s.kt)("mi",{parentName:"mrow"},"B")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"A\\to B")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.6833em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"A"),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2778em"}}),(0,s.kt)("span",{parentName:"span",className:"mrel"},"\u2192"),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2778em"}})),(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.6833em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.05017em"}},"B"))))),"\u770b\u6210\u662f\u4e00\u4e2a\u7c7b\u578b",(0,s.kt)("span",{parentName:"p",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"A"),(0,s.kt)("mo",{parentName:"mrow"},"\u21d2"),(0,s.kt)("mi",{parentName:"mrow"},"B")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"A\\Rightarrow B")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.6833em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"A"),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2778em"}}),(0,s.kt)("span",{parentName:"span",className:"mrel"},"\u21d2"),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2778em"}})),(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.6833em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.05017em"}},"B"))))),"\u3002"),(0,s.kt)("p",null,"\u4ed6\u4eec\u5177\u6709\u7c7b\u4f3c\u7684\u63a8\u7406\u89c4\u5219\uff0c\u5373\u5206\u79bb\u89c4\u5219(\u6709",(0,s.kt)("span",{parentName:"p",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"A")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"A")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.6833em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"A"))))),"\u548c",(0,s.kt)("span",{parentName:"p",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"A"),(0,s.kt)("mo",{parentName:"mrow"},"\u2192"),(0,s.kt)("mi",{parentName:"mrow"},"B")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"A\\to B")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.6833em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"A"),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2778em"}}),(0,s.kt)("span",{parentName:"span",className:"mrel"},"\u2192"),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2778em"}})),(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.6833em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.05017em"}},"B"))))),",\u5219\u6709",(0,s.kt)("span",{parentName:"p",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"B")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"B")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.6833em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.05017em"}},"B"))))),")\u548c\u51fd\u6570\u5e94\u7528\u89c4\u5219(\u6709",(0,s.kt)("span",{parentName:"p",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"A")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"A")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.6833em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"A"))))),"\u7c7b\u578b\u7684\u5b9e\u4f8b\u548c",(0,s.kt)("span",{parentName:"p",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"A"),(0,s.kt)("mo",{parentName:"mrow"},"\u21d2"),(0,s.kt)("mi",{parentName:"mrow"},"B")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"A\\Rightarrow B")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.6833em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"A"),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2778em"}}),(0,s.kt)("span",{parentName:"span",className:"mrel"},"\u21d2"),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2778em"}})),(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.6833em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.05017em"}},"B")))))," \u7c7b\u578b\u7684\u51fd\u6570, \u5219\u53ef\u4ee5\u901a\u8fc7\u8c03\u7528\u51fd\u6570\u5f97\u5230",(0,s.kt)("span",{parentName:"p",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"B")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"B")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.6833em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.05017em"}},"B"))))),"\u7c7b\u578b\u7684\u5b9e\u4f8b)\u3002"),(0,s.kt)("p",null,"\u7c7b\u578b\u548c\u547d\u9898\u53ef\u4ee5\u4e00\u4e00\u5bf9\u5e94\uff0c\u56e0\u6b64\u4ed6\u4eec\u662f\u540c\u6784\u7684\uff0c\u8fd9\u79cd\u540c\u6784\u53eb\u505a\u67ef\u91cc\u970d\u534e\u5fb7\u540c\u6784(Curry-Howard Isomorphism)\u3002"),(0,s.kt)("p",null,"\u903b\u8f91\u5b66\u4e0a\u7684\u4e8c\u9636\u76f4\u89c9\u4e3b\u4e49\u903b\u8f91\u4e2d\u7684",(0,s.kt)("span",{parentName:"p",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow",mathvariant:"normal"},"\u2200")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\forall")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.6944em"}}),(0,s.kt)("span",{parentName:"span",className:"mord"},"\u2200"))))),"\u91cf\u8bcd\uff0c\u6b63\u548c\u591a\u6001\u7684\u7c7b\u578b\u540c\u6784\u3002"),(0,s.kt)("p",null,"\u56e0\u6b64\uff0c\u5e26\u6709\u7c7b\u578b\u53c2\u6570\u7684\u51fd\u6570\u7c7b\u578b\uff0c\u4e5f\u53eb\u505a\u5168\u79f0\u7c7b\u578b\u3002"))}o.isMDXComponent=!0}}]);