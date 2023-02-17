"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8370],{3905:(a,e,t)=>{t.d(e,{Zo:()=>k,kt:()=>y});var s=t(67294);function m(a,e,t){return e in a?Object.defineProperty(a,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):a[e]=t,a}function p(a,e){var t=Object.keys(a);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(a);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),t.push.apply(t,s)}return t}function n(a){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?p(Object(t),!0).forEach((function(e){m(a,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(e){Object.defineProperty(a,e,Object.getOwnPropertyDescriptor(t,e))}))}return a}function r(a,e){if(null==a)return{};var t,s,m=function(a,e){if(null==a)return{};var t,s,m={},p=Object.keys(a);for(s=0;s<p.length;s++)t=p[s],e.indexOf(t)>=0||(m[t]=a[t]);return m}(a,e);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(a);for(s=0;s<p.length;s++)t=p[s],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(a,t)&&(m[t]=a[t])}return m}var l=s.createContext({}),N=function(a){var e=s.useContext(l),t=e;return a&&(t="function"==typeof a?a(e):n(n({},e),a)),t},k=function(a){var e=N(a.components);return s.createElement(l.Provider,{value:e},a.children)},c="mdxType",i={inlineCode:"code",wrapper:function(a){var e=a.children;return s.createElement(s.Fragment,{},e)}},o=s.forwardRef((function(a,e){var t=a.components,m=a.mdxType,p=a.originalType,l=a.parentName,k=r(a,["components","mdxType","originalType","parentName"]),c=N(t),o=m,y=c["".concat(l,".").concat(o)]||c[o]||i[o]||p;return t?s.createElement(y,n(n({ref:e},k),{},{components:t})):s.createElement(y,n({ref:e},k))}));function y(a,e){var t=arguments,m=e&&e.mdxType;if("string"==typeof a||m){var p=t.length,n=new Array(p);n[0]=o;var r={};for(var l in e)hasOwnProperty.call(e,l)&&(r[l]=e[l]);r.originalType=a,r[c]="string"==typeof a?a:m,n[1]=r;for(var N=2;N<p;N++)n[N]=t[N];return s.createElement.apply(null,n)}return s.createElement.apply(null,t)}o.displayName="MDXCreateElement"},33630:(a,e,t)=>{t.r(e),t.d(e,{assets:()=>l,contentTitle:()=>n,default:()=>i,frontMatter:()=>p,metadata:()=>r,toc:()=>N});var s=t(87462),m=(t(67294),t(3905));const p={sidebar_position:7},n="TAT-STLC \u7684\u5b9e\u73b0",r={unversionedId:"tutorial-chapter-2/implementing-tat-stlc",id:"tutorial-chapter-2/implementing-tat-stlc",title:"TAT-STLC \u7684\u5b9e\u73b0",description:"TAT \u7684\u7c7b\u578b\u68c0\u67e5\u548c\u8f6c\u8bd1",source:"@site/docs/tutorial-chapter-2/implementing-tat-stlc.md",sourceDirName:"tutorial-chapter-2",slug:"/tutorial-chapter-2/implementing-tat-stlc",permalink:"/write-you-a-typescript/docs/tutorial-chapter-2/implementing-tat-stlc",draft:!1,editUrl:"https://github.com/suica/write-you-a-typescript/tree/main/docs/docs/tutorial-chapter-2/implementing-tat-stlc.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"tutorialSidebar",previous:{title:"TAT-STLC\u7684\u7c7b\u578b\u7cfb\u7edf\u8bbe\u8ba1",permalink:"/write-you-a-typescript/docs/tutorial-chapter-2/designing-the-type-system-of-tat-stlc"},next:{title:"\u4fef\u77b0\u7f16\u7a0b\u8bed\u8a00\uff1a\u5b87\u5b99\u7684\u5c42\u7ea7",permalink:"/write-you-a-typescript/docs/tutorial-chapter-2/rethinking-the-heirachy-of-programming-language-universes"}},l={},N=[{value:"TAT \u7684\u7c7b\u578b\u68c0\u67e5\u548c\u8f6c\u8bd1",id:"tat-\u7684\u7c7b\u578b\u68c0\u67e5\u548c\u8f6c\u8bd1",level:2},{value:"\u7ecf\u5178\u7f16\u8bd1\u6d41\u7a0b",id:"\u7ecf\u5178\u7f16\u8bd1\u6d41\u7a0b",level:3},{value:"TAT \u7684\u7c7b\u578b\u68c0\u67e5\u548c\u8f6c\u8bd1\uff08\u7eed\uff09",id:"tat-\u7684\u7c7b\u578b\u68c0\u67e5\u548c\u8f6c\u8bd1\u7eed",level:2},{value:"TAT \u7684\u7f16\u8bd1\u6d41\u7a0b",id:"tat-\u7684\u7f16\u8bd1\u6d41\u7a0b",level:3},{value:"TAT\u4ee3\u7801\u7684\u6267\u884c",id:"tat\u4ee3\u7801\u7684\u6267\u884c",level:3},{value:"\u4f5c\u4e1a",id:"\u4f5c\u4e1a",level:2}],k={toc:N},c="wrapper";function i(a){let{components:e,...t}=a;return(0,m.kt)(c,(0,s.Z)({},k,t,{components:e,mdxType:"MDXLayout"}),(0,m.kt)("h1",{id:"tat-stlc-\u7684\u5b9e\u73b0"},"TAT-STLC \u7684\u5b9e\u73b0"),(0,m.kt)("h2",{id:"tat-\u7684\u7c7b\u578b\u68c0\u67e5\u548c\u8f6c\u8bd1"},"TAT \u7684\u7c7b\u578b\u68c0\u67e5\u548c\u8f6c\u8bd1"),(0,m.kt)("h3",{id:"\u7ecf\u5178\u7f16\u8bd1\u6d41\u7a0b"},"\u7ecf\u5178\u7f16\u8bd1\u6d41\u7a0b"),(0,m.kt)("div",{className:"math math-display"},(0,m.kt)("span",{parentName:"div",className:"katex-display"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mtable",{parentName:"semantics",rowspacing:"0.25em",columnalign:"right left right",columnspacing:"0em 1em"},(0,m.kt)("mtr",{parentName:"mtable"},(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"}))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"},(0,m.kt)("mrow",{parentName:"mrow"}),(0,m.kt)("mtext",{parentName:"mrow"},"\u6e90\u4ee3\u7801")))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"})))),(0,m.kt)("mtr",{parentName:"mtable"},(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"}))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"},(0,m.kt)("mrow",{parentName:"mrow"}),(0,m.kt)("mspace",{parentName:"mrow",width:"1em"}),(0,m.kt)("mo",{parentName:"mrow"},"\u21d3")))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"},(0,m.kt)("mo",{parentName:"mrow"},"\u22ef"),(0,m.kt)("mstyle",{parentName:"mrow",mathsize:"0.9em"},(0,m.kt)("mtext",{parentName:"mstyle"},"\u5206\u8bcd\u5668(Tokenizer)")))))),(0,m.kt)("mtr",{parentName:"mtable"},(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"}))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"},(0,m.kt)("mrow",{parentName:"mrow"}),(0,m.kt)("mtext",{parentName:"mrow"},"\u7b26\u53f7\u6d41")))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"})))),(0,m.kt)("mtr",{parentName:"mtable"},(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"}))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"},(0,m.kt)("mrow",{parentName:"mrow"}),(0,m.kt)("mspace",{parentName:"mrow",width:"1em"}),(0,m.kt)("mo",{parentName:"mrow"},"\u21d3")))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"},(0,m.kt)("mo",{parentName:"mrow"},"\u22ef"),(0,m.kt)("mstyle",{parentName:"mrow",mathsize:"0.9em"},(0,m.kt)("mtext",{parentName:"mstyle"},"\u89e3\u6790\u5668(Parser)")))))),(0,m.kt)("mtr",{parentName:"mtable"},(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"}))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"},(0,m.kt)("mrow",{parentName:"mrow"}),(0,m.kt)("mspace",{parentName:"mrow",width:"-0.9em"}),(0,m.kt)("mtext",{parentName:"mrow"},"\u62bd\u8c61\u8bed\u6cd5\u6811")))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"})))),(0,m.kt)("mtr",{parentName:"mtable"},(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"}))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"},(0,m.kt)("mrow",{parentName:"mrow"}),(0,m.kt)("mspace",{parentName:"mrow",width:"1em"}),(0,m.kt)("mo",{parentName:"mrow"},"\u21d3")))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"},(0,m.kt)("mo",{parentName:"mrow"},"\u22ef"),(0,m.kt)("mstyle",{parentName:"mrow",mathsize:"0.9em"},(0,m.kt)("mstyle",{parentName:"mstyle",mathcolor:"magenta"},(0,m.kt)("mtext",{parentName:"mstyle"},"\u8bed\u4e49\u5206\u6790(Semantic\xa0Analysis)"))))))),(0,m.kt)("mtr",{parentName:"mtable"},(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"}))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"},(0,m.kt)("mrow",{parentName:"mrow"}),(0,m.kt)("mspace",{parentName:"mrow",width:"1.5em"}),(0,m.kt)("mi",{parentName:"mrow"},(0,m.kt)("mi",{parentName:"mi",mathvariant:"normal"},"\u22ee"),(0,m.kt)("mpadded",{parentName:"mi",height:"0em",voffset:"0em"},(0,m.kt)("mspace",{parentName:"mpadded",mathbackground:"black",width:"0em",height:"1.5em"})))))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"}))))),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\begin{aligned} & \u6e90\u4ee3\u7801 & \\\\ & \\quad \\Downarrow & {\\cdots \\small \\text{\u5206\u8bcd\u5668(Tokenizer)}} \\\\ & \u7b26\u53f7\u6d41 & \\\\ & \\quad \\Downarrow & {\\cdots \\small \\text{\u89e3\u6790\u5668(Parser)}} \\\\ & \\hspace{-0.9em} \u62bd\u8c61\u8bed\u6cd5\u6811 & \\\\ & \\quad \\Downarrow & {\\cdots \\small \\text{\\color{magenta}\u8bed\u4e49\u5206\u6790(Semantic Analysis)}} \\\\ & \\hspace{1.5em} \\vdots & \\end{aligned}")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"11.16em",verticalAlign:"-5.33em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mtable"},(0,m.kt)("span",{parentName:"span",className:"col-align-r"},(0,m.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"5.83em"}},(0,m.kt)("span",{parentName:"span",style:{top:"-8.49em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.5em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"})),(0,m.kt)("span",{parentName:"span",style:{top:"-6.99em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.5em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"})),(0,m.kt)("span",{parentName:"span",style:{top:"-5.49em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.5em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"})),(0,m.kt)("span",{parentName:"span",style:{top:"-3.99em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.5em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"})),(0,m.kt)("span",{parentName:"span",style:{top:"-2.49em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.5em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"})),(0,m.kt)("span",{parentName:"span",style:{top:"-0.99em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.5em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"})),(0,m.kt)("span",{parentName:"span",style:{top:"1.17em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.5em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"}))),(0,m.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"5.33em"}},(0,m.kt)("span",{parentName:"span"}))))),(0,m.kt)("span",{parentName:"span",className:"col-align-l"},(0,m.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"5.83em"}},(0,m.kt)("span",{parentName:"span",style:{top:"-8.6775em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.6875em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord"}),(0,m.kt)("span",{parentName:"span",className:"mord cjk_fallback"},"\u6e90\u4ee3\u7801"))),(0,m.kt)("span",{parentName:"span",style:{top:"-7.1775em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.6875em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord"}),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"1em"}}),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2778em"}}),(0,m.kt)("span",{parentName:"span",className:"mrel"},"\u21d3"))),(0,m.kt)("span",{parentName:"span",style:{top:"-5.6775em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.6875em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord"}),(0,m.kt)("span",{parentName:"span",className:"mord cjk_fallback"},"\u7b26\u53f7\u6d41"))),(0,m.kt)("span",{parentName:"span",style:{top:"-4.1775em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.6875em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord"}),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"1em"}}),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2778em"}}),(0,m.kt)("span",{parentName:"span",className:"mrel"},"\u21d3"))),(0,m.kt)("span",{parentName:"span",style:{top:"-2.6775em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.6875em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord"}),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"-0.9em"}}),(0,m.kt)("span",{parentName:"span",className:"mord cjk_fallback"},"\u62bd\u8c61\u8bed\u6cd5\u6811"))),(0,m.kt)("span",{parentName:"span",style:{top:"-1.1775em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.6875em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord"}),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"1em"}}),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2778em"}}),(0,m.kt)("span",{parentName:"span",className:"mrel"},"\u21d3"))),(0,m.kt)("span",{parentName:"span",style:{top:"0.9825em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.6875em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord"}),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"1.5em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord"},"\u22ee"),(0,m.kt)("span",{parentName:"span",className:"mord rule",style:{borderRightWidth:"0em",borderTopWidth:"1.5em",bottom:"0em"}}))))),(0,m.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"5.33em"}},(0,m.kt)("span",{parentName:"span"}))))),(0,m.kt)("span",{parentName:"span",className:"arraycolsep",style:{width:"1em"}}),(0,m.kt)("span",{parentName:"span",className:"col-align-r"},(0,m.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"5.83em"}},(0,m.kt)("span",{parentName:"span",style:{top:"-8.49em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.5em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"})),(0,m.kt)("span",{parentName:"span",style:{top:"-6.99em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.5em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"minner"},"\u22ef"),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,m.kt)("span",{parentName:"span",className:"mord text sizing reset-size6 size5"},(0,m.kt)("span",{parentName:"span",className:"mord cjk_fallback"},"\u5206\u8bcd\u5668"),(0,m.kt)("span",{parentName:"span",className:"mord"},"(Tokenizer)"))))),(0,m.kt)("span",{parentName:"span",style:{top:"-5.49em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.5em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"})),(0,m.kt)("span",{parentName:"span",style:{top:"-3.99em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.5em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"minner"},"\u22ef"),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,m.kt)("span",{parentName:"span",className:"mord text sizing reset-size6 size5"},(0,m.kt)("span",{parentName:"span",className:"mord cjk_fallback"},"\u89e3\u6790\u5668"),(0,m.kt)("span",{parentName:"span",className:"mord"},"(Parser)"))))),(0,m.kt)("span",{parentName:"span",style:{top:"-2.49em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.5em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"})),(0,m.kt)("span",{parentName:"span",style:{top:"-0.99em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.5em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"minner"},"\u22ef"),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,m.kt)("span",{parentName:"span",className:"mord text sizing reset-size6 size5"},(0,m.kt)("span",{parentName:"span",className:"mord cjk_fallback",style:{color:"magenta"}},"\u8bed\u4e49\u5206\u6790"),(0,m.kt)("span",{parentName:"span",className:"mord",style:{color:"magenta"}},"(Semantic\xa0Analysis)"))))),(0,m.kt)("span",{parentName:"span",style:{top:"1.17em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3.5em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"}))),(0,m.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"5.33em"}},(0,m.kt)("span",{parentName:"span"})))))))))))),(0,m.kt)("p",null,"\u800c\u7c7b\u578b\u68c0\u67e5(Type Checking)\u5728\u7ecf\u5178\u7684\u7f16\u8bd1\u6d41\u7a0b\u4e2d\uff0c\u5c5e\u4e8e\u8bed\u4e49\u5206\u6790\u7684\u4e00\u90e8\u5206\u3002"),(0,m.kt)("hr",null),(0,m.kt)("h2",{id:"tat-\u7684\u7c7b\u578b\u68c0\u67e5\u548c\u8f6c\u8bd1\u7eed"},"TAT \u7684\u7c7b\u578b\u68c0\u67e5\u548c\u8f6c\u8bd1\uff08\u7eed\uff09"),(0,m.kt)("p",null,"\u5728\u672c\u8bfe\u7a0b\u4e2d\u7684TAT\u5b9e\u73b0\u91cc\uff0cTAT\u662f\u4f9d\u9644\u4e8eJavaScript\u7684\u4e00\u95e8\u8bed\u8a00\u3002\u5b83\u548cTypeScript\u7c7b\u4f3c\uff0c\u540c\u6837\u9700\u8981\u5728\u7c7b\u578b\u64e6\u9664\u540e\u751f\u6210\u4e3aJavaScript\u4ee3\u7801\uff0c\u624d\u80fd\u501f\u52a9JavaScript\u89e3\u91ca\u5668\u8fdb\u884c\u6267\u884c\u3002\u56e0\u6b64\uff0c\u5b83\u7684\u7f16\u8bd1\u6d41\u7a0b\u548c\u7ecf\u5178\u6d41\u7a0b\u6709\u4e9b\u5fae\u4e0d\u540c\u3002"),(0,m.kt)("h3",{id:"tat-\u7684\u7f16\u8bd1\u6d41\u7a0b"},"TAT \u7684\u7f16\u8bd1\u6d41\u7a0b"),(0,m.kt)("div",{className:"math math-display"},(0,m.kt)("span",{parentName:"div",className:"katex-display"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mtable",{parentName:"semantics",rowspacing:"0.25em",columnalign:"right left right",columnspacing:"0em 1em"},(0,m.kt)("mtr",{parentName:"mtable"},(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"}))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"},(0,m.kt)("mrow",{parentName:"mrow"}),(0,m.kt)("mspace",{parentName:"mrow",width:"-1em"}),(0,m.kt)("mtext",{parentName:"mrow"},"TAT\u6e90\u4ee3\u7801")))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"})))),(0,m.kt)("mtr",{parentName:"mtable"},(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"}))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"},(0,m.kt)("mrow",{parentName:"mrow"}),(0,m.kt)("mspace",{parentName:"mrow",width:"1em"}),(0,m.kt)("mo",{parentName:"mrow"},"\u21d3")))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"},(0,m.kt)("mo",{parentName:"mrow"},"\u22ef"),(0,m.kt)("mstyle",{parentName:"mrow",mathsize:"0.9em"},(0,m.kt)("mtext",{parentName:"mstyle"},"Babel\xa0TypeScript\u89e3\u6790\u5668(Babel\xa0TypeScript\xa0Parser)")))))),(0,m.kt)("mtr",{parentName:"mtable"},(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"}))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"},(0,m.kt)("mrow",{parentName:"mrow"}),(0,m.kt)("mspace",{parentName:"mrow",width:"-0.9em"}),(0,m.kt)("mtext",{parentName:"mrow"},"\u62bd\u8c61\u8bed\u6cd5\u6811")))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"})))),(0,m.kt)("mtr",{parentName:"mtable"},(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"}))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"},(0,m.kt)("mrow",{parentName:"mrow"}),(0,m.kt)("mspace",{parentName:"mrow",width:"1em"}),(0,m.kt)("mo",{parentName:"mrow"},"\u21d3")))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"},(0,m.kt)("mo",{parentName:"mrow"},"\u22ef"),(0,m.kt)("mstyle",{parentName:"mrow",mathsize:"0.9em"},(0,m.kt)("mtext",{parentName:"mstyle"},"\u7c7b\u578b\u68c0\u67e5(Type\xa0Checking)")))))),(0,m.kt)("mtr",{parentName:"mtable"},(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"}))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"},(0,m.kt)("mrow",{parentName:"mrow"}),(0,m.kt)("mspace",{parentName:"mrow",width:"-2.4em"}),(0,m.kt)("mtext",{parentName:"mrow"},"\u6709\u7c7b\u578b\u4fe1\u606f\u7684\u8bed\u6cd5\u6811")))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"})))),(0,m.kt)("mtr",{parentName:"mtable"},(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"}))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"},(0,m.kt)("mrow",{parentName:"mrow"}),(0,m.kt)("mspace",{parentName:"mrow",width:"1em"}),(0,m.kt)("mo",{parentName:"mrow"},"\u21d3")))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"},(0,m.kt)("mo",{parentName:"mrow"},"\u22ef"),(0,m.kt)("mstyle",{parentName:"mrow",mathsize:"0.9em"},(0,m.kt)("mtext",{parentName:"mstyle"},"\u7c7b\u578b\u64e6\u9664(Type\xa0Erasing)")))))),(0,m.kt)("mtr",{parentName:"mtable"},(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"}))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"},(0,m.kt)("mrow",{parentName:"mrow"}),(0,m.kt)("mspace",{parentName:"mrow",width:"-1.5em"}),(0,m.kt)("mtext",{parentName:"mrow"},"JavaScript\u4ee3\u7801")))),(0,m.kt)("mtd",{parentName:"mtr"},(0,m.kt)("mstyle",{parentName:"mtd",scriptlevel:"0",displaystyle:"true"},(0,m.kt)("mrow",{parentName:"mstyle"}))))),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\begin{aligned} & \\hspace{-1em} \\text{TAT\u6e90\u4ee3\u7801} & \\\\ & \\quad \\Downarrow & {\\cdots \\small \\text{Babel TypeScript\u89e3\u6790\u5668(Babel TypeScript Parser)}} \\\\ & \\hspace{-0.9em} \u62bd\u8c61\u8bed\u6cd5\u6811 & \\\\ & \\quad \\Downarrow & {\\cdots \\small \\text{\u7c7b\u578b\u68c0\u67e5(Type Checking)}} \\\\ & \\hspace{-2.4em} \u6709\u7c7b\u578b\u4fe1\u606f\u7684\u8bed\u6cd5\u6811 & \\\\ & \\quad \\Downarrow & {\\cdots \\small \\text{\u7c7b\u578b\u64e6\u9664(Type Erasing)}} \\\\ & \\hspace{-1.5em} \\text{JavaScript\u4ee3\u7801} & \\\\ \\end{aligned}")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"10.5em",verticalAlign:"-5em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mtable"},(0,m.kt)("span",{parentName:"span",className:"col-align-r"},(0,m.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"5.5em"}},(0,m.kt)("span",{parentName:"span",style:{top:"-7.5em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.84em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"})),(0,m.kt)("span",{parentName:"span",style:{top:"-6em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.84em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"})),(0,m.kt)("span",{parentName:"span",style:{top:"-4.5em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.84em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"})),(0,m.kt)("span",{parentName:"span",style:{top:"-3em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.84em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"})),(0,m.kt)("span",{parentName:"span",style:{top:"-1.5em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.84em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"})),(0,m.kt)("span",{parentName:"span",style:{top:"0em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.84em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"})),(0,m.kt)("span",{parentName:"span",style:{top:"1.5em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.84em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"}))),(0,m.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"5em"}},(0,m.kt)("span",{parentName:"span"}))))),(0,m.kt)("span",{parentName:"span",className:"col-align-l"},(0,m.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"5.5em"}},(0,m.kt)("span",{parentName:"span",style:{top:"-7.66em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord"}),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"-1em"}}),(0,m.kt)("span",{parentName:"span",className:"mord text"},(0,m.kt)("span",{parentName:"span",className:"mord"},"TAT"),(0,m.kt)("span",{parentName:"span",className:"mord cjk_fallback"},"\u6e90\u4ee3\u7801")))),(0,m.kt)("span",{parentName:"span",style:{top:"-6.16em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord"}),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"1em"}}),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2778em"}}),(0,m.kt)("span",{parentName:"span",className:"mrel"},"\u21d3"))),(0,m.kt)("span",{parentName:"span",style:{top:"-4.66em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord"}),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"-0.9em"}}),(0,m.kt)("span",{parentName:"span",className:"mord cjk_fallback"},"\u62bd\u8c61\u8bed\u6cd5\u6811"))),(0,m.kt)("span",{parentName:"span",style:{top:"-3.16em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord"}),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"1em"}}),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2778em"}}),(0,m.kt)("span",{parentName:"span",className:"mrel"},"\u21d3"))),(0,m.kt)("span",{parentName:"span",style:{top:"-1.66em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord"}),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"-2.4em"}}),(0,m.kt)("span",{parentName:"span",className:"mord cjk_fallback"},"\u6709\u7c7b\u578b\u4fe1\u606f\u7684\u8bed\u6cd5\u6811"))),(0,m.kt)("span",{parentName:"span",style:{top:"-0.16em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord"}),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"1em"}}),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2778em"}}),(0,m.kt)("span",{parentName:"span",className:"mrel"},"\u21d3"))),(0,m.kt)("span",{parentName:"span",style:{top:"1.34em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord"}),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"-1.5em"}}),(0,m.kt)("span",{parentName:"span",className:"mord text"},(0,m.kt)("span",{parentName:"span",className:"mord"},"JavaScript"),(0,m.kt)("span",{parentName:"span",className:"mord cjk_fallback"},"\u4ee3\u7801"))))),(0,m.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"5em"}},(0,m.kt)("span",{parentName:"span"}))))),(0,m.kt)("span",{parentName:"span",className:"arraycolsep",style:{width:"1em"}}),(0,m.kt)("span",{parentName:"span",className:"col-align-r"},(0,m.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"5.5em"}},(0,m.kt)("span",{parentName:"span",style:{top:"-7.66em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"})),(0,m.kt)("span",{parentName:"span",style:{top:"-6.16em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"minner"},"\u22ef"),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,m.kt)("span",{parentName:"span",className:"mord text sizing reset-size6 size5"},(0,m.kt)("span",{parentName:"span",className:"mord"},"Babel\xa0TypeScript"),(0,m.kt)("span",{parentName:"span",className:"mord cjk_fallback"},"\u89e3\u6790\u5668"),(0,m.kt)("span",{parentName:"span",className:"mord"},"(Babel\xa0TypeScript\xa0Parser)"))))),(0,m.kt)("span",{parentName:"span",style:{top:"-4.66em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"})),(0,m.kt)("span",{parentName:"span",style:{top:"-3.16em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"minner"},"\u22ef"),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,m.kt)("span",{parentName:"span",className:"mord text sizing reset-size6 size5"},(0,m.kt)("span",{parentName:"span",className:"mord cjk_fallback"},"\u7c7b\u578b\u68c0\u67e5"),(0,m.kt)("span",{parentName:"span",className:"mord"},"(Type\xa0Checking)"))))),(0,m.kt)("span",{parentName:"span",style:{top:"-1.66em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"})),(0,m.kt)("span",{parentName:"span",style:{top:"-0.16em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"minner"},"\u22ef"),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,m.kt)("span",{parentName:"span",className:"mord text sizing reset-size6 size5"},(0,m.kt)("span",{parentName:"span",className:"mord cjk_fallback"},"\u7c7b\u578b\u64e6\u9664"),(0,m.kt)("span",{parentName:"span",className:"mord"},"(Type\xa0Erasing)"))))),(0,m.kt)("span",{parentName:"span",style:{top:"1.34em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"}))),(0,m.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"5em"}},(0,m.kt)("span",{parentName:"span"})))))))))))),(0,m.kt)("hr",null),(0,m.kt)("h3",{id:"tat\u4ee3\u7801\u7684\u6267\u884c"},"TAT\u4ee3\u7801\u7684\u6267\u884c"),(0,m.kt)("p",null,"TAT\u6e90\u4ee3\u7801\uff0c\u7ecf\u8fc7\u8f6c\u8bd1\u4e3aJavaScript\u4e4b\u540e\uff0c\u5728node\u73af\u5883\u6216\u8005\u6d4f\u89c8\u5668\u73af\u5883\u89e3\u91ca\u6267\u884c\u3002"),(0,m.kt)("blockquote",null,(0,m.kt)("p",{parentName:"blockquote"},"\u6ce8\u610f\uff1a\u5728\u539f\u5219\u4e0a\uff0c\u6211\u4eec\u53ef\u4ee5\u5b9e\u73b0\u81ea\u5df1\u7684TAT\u89e3\u6790\u5668\u548c\u89e3\u91ca\u5668\u3002\u4f46\u662f\u672c\u8bfe\u7a0b\u4e2d\u4e3b\u8981\u5173\u6ce8\u7684\u662f\u7c7b\u578b\u7cfb\u7edf\u7684\u90e8\u5206\uff0c\u56e0\u6b64\u89e3\u6790\u548c\u6c42\u503c\u7684\u5de5\u4f5c\u5c31\u5168\u90e8\u4ea4\u7ed9\u73b0\u6210\u7684\u5de5\u5177\u6765\u505a\u4e86\uff0c\u800c\u4e0d\u5728\u8bfe\u7a0b\u5185\u8fdb\u884c\u8be6\u7ec6\u4ecb\u7ecd\u3002\u5982\u679c\u4f60\u5bf9\u5b9e\u73b0\u4e00\u4e2a\u81ea\u5df1\u7684\u89e3\u6790\u5668\u548c\u89e3\u91ca\u5668\u6709\u5174\u8da3\uff0c\u53ef\u4ee5\u8054\u7cfb\u6211\u4eec\u63a2\u8ba8\u66f4\u591a\u7ec6\u8282\u3002")),(0,m.kt)("p",null,"\u8f6c\u8bd1\u7684\u8fc7\u7a0b\uff0c\u5c31\u662f\u7c7b\u578b\u64e6\u9664\u7684\u8fc7\u7a0b\u3002\u6211\u4eec\u628aTAT\u4ee3\u7801\u4e0a\u7684\u7c7b\u578b\u6807\u6ce8\u5168\u90e8\u9012\u5f52\u5730\u64e6\u53bb\uff0c\u5c31\u5f97\u5230\u4e86\u53ef\u6267\u884c\u7684JavaScript\u4ee3\u7801\u3002"),(0,m.kt)("h2",{id:"\u4f5c\u4e1a"},"\u4f5c\u4e1a"),(0,m.kt)("p",null,"\u8bfe\u7a0b\u4ed3\u5e93\uff1a",(0,m.kt)("a",{parentName:"p",href:"https://github.com/suica/write-you-a-typescript"},"https://github.com/suica/write-you-a-typescript")),(0,m.kt)("ol",null,(0,m.kt)("li",{parentName:"ol"},"\u6839\u636e\u8bfe\u7a0b\u4ed3\u5e93\u4e2d\u63d0\u4f9b\u7684TAT-STLC\u7684\u6d4b\u8bd5\u7528\u4f8b\uff0c\u5b9a\u4e49\u5bf9\u8c61\u5b57\u9762\u91cf\u7c7b\u578b\u7684\u5b9a\u578b\u89c4\u5219\u3002"),(0,m.kt)("li",{parentName:"ol"},"\u5b9e\u73b0TAT-STLC\u7684\u7c7b\u578b\u68c0\u67e5\uff0c\u901a\u8fc7\u6240\u6709\u6d4b\u8bd5\u7528\u4f8b\u3002")))}i.isMDXComponent=!0}}]);