!function(t){var e={};function o(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/assets/js/",o(o.s=60)}({60:function(t,e){(t=>{class e{constructor(t,e){this.x=t,this.y=e,this.baseX=t,this.baseY=e,this.dencity=5+(10*Math.random()|0),this.radius=3,this.color="rgba(0, 0, 0, 1)",this.strokeColor="rgba(0, 0, 0, 0.5)"}}t.addEventListener("load",t=>{const e=i(),a=e.getContext("2d");let l=e.getBoundingClientRect(),s=r(a),u={x:-100,y:-100,radius:120,reset:function(){this.x=-100,this.y=-100}};e.addEventListener("mousemove",t=>{t.stopPropagation(),t.preventDefault(),u.x=e.width*t.offsetX/l.width|0,u.y=e.height*t.offsetY/l.height|0}),e.addEventListener("touchmove",t=>{t.stopPropagation(),t.preventDefault(),l=e.getBoundingClientRect(),u.x=e.width*(t.touches[0].clientX-l.left)/l.width|0,u.y=e.height*(t.touches[0].clientY-l.top)/l.height|0}),e.addEventListener("mouseout",t=>{u.reset()}),e.addEventListener("touchend",t=>{u.reset()}),a.fillStyle="black";const d=()=>{e.width=e.width,n(a,s),o(u,s),requestAnimationFrame(d)};d()});const o=(t,e)=>{const o=t.x,n=t.y,r=t.radius;for(let t of e){let e=t.x-o,i=t.y-n,a=Math.sqrt(e*e+i*i);if(a<r){let o=e/a,n=i/a,l=(r-a)/r;t.x+=o*l*t.dencity,t.y+=n*l*t.dencity}else{if(t.baseX!==t.x){let e=t.baseX-t.x;t.x+=e/30}if(t.baseY!==t.y){let e=t.baseY-t.y;t.y+=e/30}}}},n=(t,e)=>{for(let o of e)t.beginPath(),t.arc(o.x,o.y,o.radius,0,2*Math.PI),t.fillStyle=o.color,t.fill();t.beginPath();for(let o=0;o<e.length-1;o++){let n=e[o];for(let r=o+1;r<e.length;r++){let i=e[r],a=n.x-i.x,l=n.y-i.y;Math.sqrt(a*a+l*l)<20&&(t.strokeStyle=e[o].strokeColor,t.moveTo(n.x,n.y),t.lineTo(i.x,i.y))}}t.stroke()},r=t=>{const o=10*(5*Math.random()|0),n=16*Math.random()|0,r=String.fromCodePoint(parseInt("1F600",16)+o+n);t.font="50px bold Noto Serif KR",t.fillText(r,5,45);const i=t.getImageData(0,0,100,80);t.clearRect(0,0,100,100);const a=i.data,l=[];for(let t=0;t<i.height;t++)for(let o=0;o<i.width;o++){let n=t*(4*i.width)+(4*o+3);if(a[n]>50){let r=new e(10*(o+20),10*t);r.color=`rgba(${a[n-3]}, ${a[n-2]}, ${a[n-1]}, 1)`,r.strokeColor=`rgba(${a[n-3]}, ${a[n-2]}, ${a[n-1]}, 0.1)`,l.push(r)}}return l},i=()=>{const t=document.querySelector(".text-animation"),e=t.querySelector(".text-animation__canvas"),o=t.getBoundingClientRect();return e.width=1e3,e.height=e.width*(o.height/o.width),e}})(window)}});