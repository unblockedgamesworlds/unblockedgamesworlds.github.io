function TonedJS(r){var n={giveSup:function(r,n){for(var t in n=n||{},r)n[t]=r[t];return n},giveSub:function(r,n){for(var t in n=n||{},r)n.hasOwnProperty(t)||(n[t]=r[t]);return n},proliferate:function(r,n,t){var e,o;for(o in n)t&&r.hasOwnProperty(o)||("object"==typeof(e=n[o])&&null!=e?(r.hasOwnProperty(o)||(r[o]=e instanceof Array?[]:{}),proliferate(r[o],e,t)):r[o]=e);return r},getFirst:function(r,n){for(var t in r)return n?t:r[t]},getLast:function(r,n){for(var t in r);return n?t:r[t]},followPath:function(r,n,t){return null!=n[t]&&null!=r[n[t]]?followPath(r[n[t]],n,++t):r},createElement:function(r){for(var n=document.createElement(r||"div"),t=arguments.length;--t>0;)proliferate(n,arguments[t]);return n},classAdd:function(r,n){r.className+=" "+n},classRemove:function(r,n){r.className=r.className.replace(new RegExp(" "+n,"gm"),"")},elementSetPosition:function(r,n,t){null==n&&(n=r.left),null==t&&(t=r.top),proliferate(r,{left:n,top:t,style:{marginLeft:n+"px",marginTop:t+"px"}})},elementShiftLeft:function(r,n){r.left||(r.left=Number(r.style.marginLeft.replace("px",""))),r.style.marginLeft=round(r.left+=n)+"px"},elementShiftTop:function(r,n){r.top||(r.top=Number(r.style.marginLeft.replace("px",""))),r.style.marginTop=round(r.top+=n)+"px"},removeChildSafe:function(r,n){r&&(n=n||document.body).contains(r)&&n.removeChild(r)},findParentOfType:function(r,n){var t=r.parentElement;return t&&t.nodeName!=n?findParentType(t,n):t},clearAllTimeouts:function(){for(var r=setTimeout((function(){}));r--;)clearTimeout(r)},stringTrim:function(r){return r.replace(/^\s+|\s+$/g,"")},stringOf:function(r,n){return 0==n?"":new Array(1+(n||1)).join(r)},stringHas:function(r,n){return-1!=r.indexOf(n)},stringHasI:function(r,n){return-1!=r.toLowerCase().indexOf(n.toLowerCase())},capitalizeFirst:function(r,n){return n=n||1,r.substr(0,n).toUpperCase()+r.substr(n).toLowerCase()},ArrayD:function(r){if(1==arguments.length)return new Array(r);var n,t=arrayMake(arguments),e=new Array(r);for(t.shift(),n=r-1;n>=0;--n)e[n]=ArrayD.apply(this,t);return e},arrayOf:function(r,n){n=n||1;for(var t=new Array(n);n--;)t[n]=r;return t},arrayMake:function(r){return Array.prototype.slice.call(r)},arrayRange:function(r,n){for(var t=1+n-r,e=new Array(t),o=r,a=0;a<t;)e[a++]=o++;return e},arrayShuffle:function(r,n,t){n=n||0,t=t||r.length;for(var e,o,a=n;a<=t;++a)o=randInt(a+1),e=r[a],r[a]=r[o],r[o]=e;return r},removeDuplicates:function(r){var n,t,e,o,a,i=[];for(o=0,e=r.length;o<e;++o){for(n=r[o],t=!1,a=0;a<o;++a)if(r[a]==n){t=!0;break}t||i.push(n)}return i},makeDigit:function(r,n,t){return r=String(r),stringOf(t||0,max(0,n-r.length))+r},roundDigit:function(r,n){return Number(n?~~(.5+r/n)*n:round(r))},sign:function(r){return r?r<0?-1:1:0},round:function(r){return~~(.5+r)},max:Math.max,min:Math.min,abs:Math.abs,pow:Math.pow,ceil:Math.ceil,floor:Math.floor,random:Math.random,randInt:function(r){return floor(Math.random()*(r||1))},signBool:function(r){return r>0},log:void 0,now:Date.now};return r&&n.giveSub(n,window),n}