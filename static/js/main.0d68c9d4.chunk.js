(window["webpackJsonpanon-feedback"]=window["webpackJsonpanon-feedback"]||[]).push([[0],{15:function(e,t,n){e.exports=n(26)},20:function(e,t,n){},21:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),c=n(4),a=n.n(c);n(20),n(21);function u(e){var t=e.counter,n=e.increaseCounter,r=e.decreaseCounter;return o.a.createElement(o.a.Fragment,null,t,o.a.createElement("button",{onClick:n},"+"),o.a.createElement("button",{onClick:r},"-"))}var i=n(5);var s=Object(i.b)((function(e){return{counter:e.appReducer.counter}}),(function(e){return{actions:{increaseCounter:function(){return e({type:"INCREMENT"})},decreaseCounter:function(){return e({type:"DECREMENT"})}}}}))((function(e){return o.a.createElement("div",{className:"App"},o.a.createElement(u,{counter:e.counter,increaseCounter:e.actions.increaseCounter,decreaseCounter:e.actions.decreaseCounter}))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var l=n(2),p=n(12);function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(n,!0).forEach((function(t){Object(p.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var E={counter:0},O=Object(l.c)({appReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INCREMENT":return d({},e,{counter:e.counter+1});case"DECREMENT":return d({},e,{counter:e.counter-1});default:return e}}}),b=n(13),w=n.n(b),m=n(14),v=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||l.d,y=Object(l.e)(O,v(Object(l.a)(w.a,m.a)));a.a.render(o.a.createElement(i.a,{store:y},o.a.createElement(s,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[15,1,2]]]);
//# sourceMappingURL=main.0d68c9d4.chunk.js.map