import{s as $,f,l as u,a as b,g as h,h as d,m as v,d as l,c as y,i as c,u as g,n as x,y as E,x as S}from"../chunks/scheduler.91XGvtXY.js";import{S as q,i as C}from"../chunks/index.Gv8bGnDK.js";import{p as H}from"../chunks/stores.qo-NLqBg.js";function P(i){let a,s=i[0].status+"",r,o,n,p=i[0].error?.message+"",m;return{c(){a=f("h1"),r=u(s),o=b(),n=f("p"),m=u(p)},l(e){a=h(e,"H1",{});var t=d(a);r=v(t,s),t.forEach(l),o=y(e),n=h(e,"P",{});var _=d(n);m=v(_,p),_.forEach(l)},m(e,t){c(e,a,t),g(a,r),c(e,o,t),c(e,n,t),g(n,m)},p(e,[t]){t&1&&s!==(s=e[0].status+"")&&x(r,s),t&1&&p!==(p=e[0].error?.message+"")&&x(m,p)},i:E,o:E,d(e){e&&(l(a),l(o),l(n))}}}function j(i,a,s){let r;return S(i,H,o=>s(0,r=o)),[r]}class A extends q{constructor(a){super(),C(this,a,j,P,$,{})}}export{A as component};