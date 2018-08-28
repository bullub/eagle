!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):t.Eagle=e(t.$)}(this,function(l){"use strict";l=l&&l.hasOwnProperty("default")?l.default:l;var t,e=(function(j){!function(t){var u,e=Object.prototype,s=e.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},o=r.iterator||"@@iterator",n=r.asyncIterator||"@@asyncIterator",i=r.toStringTag||"@@toStringTag",a=t.regeneratorRuntime;if(a)j.exports=a;else{(a=t.regeneratorRuntime=j.exports).wrap=m;var l="suspendedStart",p="suspendedYield",h="executing",d="completed",y={},c={};c[o]=function(){return this};var f=Object.getPrototypeOf,v=f&&f(f(k([])));v&&v!==e&&s.call(v,o)&&(c=v);var g=E.prototype=b.prototype=Object.create(c);x.prototype=g.constructor=E,E.constructor=x,E[i]=x.displayName="GeneratorFunction",a.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===x||"GeneratorFunction"===(e.displayName||e.name))},a.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,E):(t.__proto__=E,i in t||(t[i]="GeneratorFunction")),t.prototype=Object.create(g),t},a.awrap=function(t){return{__await:t}},L(O.prototype),O.prototype[n]=function(){return this},a.AsyncIterator=O,a.async=function(t,e,r,n){var o=new O(m(t,e,r,n));return a.isGeneratorFunction(e)?o:o.next().then(function(t){return t.done?t.value:o.next()})},L(g),g[i]="Generator",g[o]=function(){return this},g.toString=function(){return"[object Generator]"},a.keys=function(r){var n=[];for(var t in r)n.push(t);return n.reverse(),function t(){for(;n.length;){var e=n.pop();if(e in r)return t.value=e,t.done=!1,t}return t.done=!0,t}},a.values=k,_.prototype={constructor:_,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=u,this.done=!1,this.delegate=null,this.method="next",this.arg=u,this.tryEntries.forEach(R),!t)for(var e in this)"t"===e.charAt(0)&&s.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=u)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var n=this;function t(t,e){return i.type="throw",i.arg=r,n.next=t,e&&(n.method="next",n.arg=u),!!e}for(var e=this.tryEntries.length-1;0<=e;--e){var o=this.tryEntries[e],i=o.completion;if("root"===o.tryLoc)return t("end");if(o.tryLoc<=this.prev){var a=s.call(o,"catchLoc"),c=s.call(o,"finallyLoc");if(a&&c){if(this.prev<o.catchLoc)return t(o.catchLoc,!0);if(this.prev<o.finallyLoc)return t(o.finallyLoc)}else if(a){if(this.prev<o.catchLoc)return t(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return t(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;0<=r;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&s.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,y):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;0<=e;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),R(r),y}},catch:function(t){for(var e=this.tryEntries.length-1;0<=e;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;R(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:k(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=u),y}}}function m(t,e,r,n){var i,a,c,u,o=e&&e.prototype instanceof b?e:b,s=Object.create(o.prototype),f=new _(n||[]);return s._invoke=(i=t,a=r,c=f,u=l,function(t,e){if(u===h)throw new Error("Generator is already running");if(u===d){if("throw"===t)throw e;return P()}for(c.method=t,c.arg=e;;){var r=c.delegate;if(r){var n=N(r,c);if(n){if(n===y)continue;return n}}if("next"===c.method)c.sent=c._sent=c.arg;else if("throw"===c.method){if(u===l)throw u=d,c.arg;c.dispatchException(c.arg)}else"return"===c.method&&c.abrupt("return",c.arg);u=h;var o=w(i,a,c);if("normal"===o.type){if(u=c.done?d:p,o.arg===y)continue;return{value:o.arg,done:c.done}}"throw"===o.type&&(u=d,c.method="throw",c.arg=o.arg)}}),s}function w(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}function b(){}function x(){}function E(){}function L(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function O(u){var e;this._invoke=function(r,n){function t(){return new Promise(function(t,e){!function e(t,r,n,o){var i=w(u[t],u,r);if("throw"!==i.type){var a=i.arg,c=a.value;return c&&"object"==typeof c&&s.call(c,"__await")?Promise.resolve(c.__await).then(function(t){e("next",t,n,o)},function(t){e("throw",t,n,o)}):Promise.resolve(c).then(function(t){a.value=t,n(a)},o)}o(i.arg)}(r,n,t,e)})}return e=e?e.then(t,t):t()}}function N(t,e){var r=t.iterator[e.method];if(r===u){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=u,N(t,e),"throw"===e.method))return y;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return y}var n=w(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,y;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=u),e.delegate=null,y):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,y)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function R(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function _(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function k(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,n=function t(){for(;++r<e.length;)if(s.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=u,t.done=!0,t};return n.next=n}}return{next:P}}function P(){return{value:u,done:!0}}}(function(){return this}()||Function("return this")())}(t={exports:{}},t.exports),t.exports),r=function(){return this}()||Function("return this")(),n=r.regeneratorRuntime&&0<=Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime"),o=n&&r.regeneratorRuntime;r.regeneratorRuntime=void 0;var i=e;if(n)r.regeneratorRuntime=o;else try{delete r.regeneratorRuntime}catch(t){r.regeneratorRuntime=void 0}var a,p=i,c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h=function(t){return function(){var c=t.apply(this,arguments);return new Promise(function(i,a){return function e(t,r){try{var n=c[t](r),o=n.value}catch(t){return void a(t)}if(!n.done)return Promise.resolve(o).then(function(t){e("next",t)},function(t){e("throw",t)});i(o)}("next")})}},d=(a=h(p.mark(function t(e,r){var n,o,i;return p.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:n=void 0,o=0,i=e.length;case 2:if(!(o<i)){t.next=13;break}return t.next=5,e[o].call(this,r);case 5:if(!1!==(n=t.sent)){t.next=8;break}return t.abrupt("return",!1);case 8:if(!0!==n){t.next=10;break}return t.abrupt("break",13);case 10:o++,t.next=2;break;case 13:case"end":return t.stop()}},t,this)})),function(t,e){return a.apply(this,arguments)}),u=Array.prototype.slice;function y(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:document.body,r=this,e=void 0,n=r.events,o=r.eventHandlers,i=void 0,a=void 0,c=void 0;function u(e){return function(t){try{"INPUT"!==this.tagName.toUpperCase()&&y.hideKeyBoard()}catch(t){}e.call(r,t,l(this))}}for(var s in e=r.$root=l(t),n)i=s.indexOf(" "),a=s.substring(0,i),c=s.slice(i-s.length+1),e.delegate(c,a,u(o[n[s]]));(function(){var o=this;o.$root.find("*[id]").each(function(t,e){var r=l(e),n=r.attr("id");o["$"+n.replace(/-(.)/g,function(t,e){return e.toUpperCase()})]=r})}).call(this)}y.hideKeyBoard=function(){document.activeElement.blur()},y.extend=function t(e){var n=this;if(!e||!e.hasOwnProperty("constructor")||"function"!=typeof e.constructor)throw new Error("No constructor find in sub class, please check your code!");var r=e.constructor;delete e.constructor;for(var o=["events","eventHandlers","responseHandlers"],i=0,a=o.length;i<a;i++)o[i]in e||(e[o[i]]={});for(var c in e)~o.indexOf(c)&&(e[c].__proto__=n.prototype[c]),e[c]&&e[c].value||(e[c]={value:e[c],enumerable:!0,writable:!0,configurable:!0});return r.prototype=Object.create(n.prototype,e),r._Parent=function(t,e){var r=u.call(e);n.apply(t,r)},r.extend=t,Object.defineProperties(r.prototype,{constructor:{value:r,configurable:!1},_super:{value:n.prototype,configurable:!1}}),r},y.prototype={constructor:y,events:{},eventHandlers:{stopPropagation:function(t){t.stopPropagation()},preventDefault:function(t){t.preventDefault()},stopAndPrevent:function(t){t.stopPropagation(),t.preventDefault()}},responseHandlers:{}};var s,v=[],g=[];function m(t){var e=t.responseText;try{e=JSON.parse(e)}catch(t){}return e}function w(t){for(var e=t.getAllResponseHeaders().split("\n"),r={},n=void 0,o=0,i=e.length;o<i;o++)(n=e[o].match(/([^:]+):\s*(.+)/))&&(r[n[1]]=n[2]);return r}return y.ABORT=!1,y.SKIP_FILTERS=!0,y.CONTINUE=void 0,y.addRequestFilter=function(t){v.push(t)},y.addResponseFilter=function(t){g.push(t)},y.getURL=function(t,e,r){if(!window.CONFIG||!CONFIG.SERVICES||!CONFIG.SERVICES[t])throw new Error("The serviceName ["+t+"] not defined in your config, please check your config!");var n=CONFIG.SERVICES[t].API[e];if(!n)throw new Error("The apiName not defined in your service ["+t+"], please check your config.");var o=r.params,i=r.query;if("object"===(void 0===o?"undefined":c(o)))for(var a in r)n=n.replace(new RegExp("[:*]"+a),r[a]);return"object"===(void 0===i?"undefined":c(i))?n+=decodeURIComponent(l.param(i)):"string"==typeof i&&(n+=i),CONFIG.SERVICES[t].BASE_URL+n},y.prototype.request=(s=h(p.mark(function t(c,u,s){var f=this;return p.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise(function(){var r=h(p.mark(function t(o,e){var r,i,n,a=(r=h(p.mark(function t(r){var n;return p.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={serviceName:c,apiName:u,options:s,xhr:r,response:m(r),status:(e=r,e.status),headers:w(r)},t.next=3,d.call(i,g,n);case 3:if(t.t0=t.sent,!1!==t.t0){t.next=8;break}return console.warn("响应过滤器链拦截了您的相应！"),o(null),t.abrupt("return");case 8:o({data:n.response,status:n.status,headers:n.headers,request:n.options});case 9:case"end":return t.stop()}var e},t,this)})),function(t){return r.apply(this,arguments)});return p.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return i=f,n=null,s.body instanceof FormData&&(n=s.body,s.processData=!1,s.contentType=!1),s=JSON.parse(JSON.stringify(s)),null!==n&&(s.body=n),s.url=y.getURL(c,u,s),t.next=8,d.call(i,v,{serviceName:c,apiName:u,options:s});case 8:if(t.t0=t.sent,!1!==t.t0){t.next=13;break}return console.warn("请求在请求过滤器链中被中断, 请处理您的代码！"),o(null),t.abrupt("return");case 13:s.body instanceof FormData&&delete(s.headers||{})["Content-Type"],s.success=function(t,e,r){a(r)},s.error=function(t,e){a(t)},s.data=s.body,l.ajax(s);case 18:case"end":return t.stop()}},t,f)}));return function(t,e){return r.apply(this,arguments)}}()));case 1:case"end":return t.stop()}},t,this)})),function(t,e,r){return s.apply(this,arguments)}),y});
//# sourceMappingURL=eagle.umd.js.map
