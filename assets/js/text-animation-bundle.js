!function(t){var e={};function o(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/assets/js/",o(o.s=60)}({60:function(t,e){(t=>{class e{constructor(t,e){this.x=t,this.y=e,this.baseX=t,this.baseY=e,this.dencity=5+(10*Math.random()|0),this.radius=3,this.color="rgba(0, 0, 0, 1)",this.strokeColor="rgba(0, 0, 0, 0.5)"}}t.addEventListener("load",t=>{const e=i(),l=e.getContext("2d");let s=e.getBoundingClientRect(),a=r(l),u={x:-100,y:-100,radius:120,reset:function(){this.x=-100,this.y=-100}};e.addEventListener("mousemove",t=>{t.stopPropagation(),t.preventDefault(),u.x=e.width*t.offsetX/s.width|0,u.y=e.height*t.offsetY/s.height|0}),e.addEventListener("touchmove",t=>{t.stopPropagation(),t.preventDefault(),s=e.getBoundingClientRect(),u.x=e.width*(t.touches[0].clientX-s.left)/s.width|0,u.y=e.height*(t.touches[0].clientY-s.top)/s.height|0}),e.addEventListener("mouseout",t=>{u.reset()}),e.addEventListener("touchend",t=>{u.reset()}),l.fillStyle="black";const c=()=>{e.width=e.width,n(l,a),o(u,a),requestAnimationFrame(c)};c()});const o=(t,e)=>{const o=t.x,n=t.y,r=t.radius;for(let t of e){let e=t.x-o,i=t.y-n,l=Math.sqrt(e*e+i*i);if(l<r){let o=e/l,n=i/l,s=(r-l)/r;t.x+=o*s*t.dencity,t.y+=n*s*t.dencity}else{if(t.baseX!==t.x){let e=t.baseX-t.x;t.x+=e/30}if(t.baseY!==t.y){let e=t.baseY-t.y;t.y+=e/30}}}},n=(t,e)=>{for(let o of e)t.beginPath(),t.moveTo(o.x,o.y),t.arc(o.x,o.y,o.radius,0,2*Math.PI),t.fillStyle=o.color,t.fill(),t.closePath();for(let o=0;o<e.length-1;o++){let n=e[o];for(let r=o+1;r<e.length;r++){let i=e[r],l=n.x-i.x,s=n.y-i.y;Math.sqrt(l*l+s*s)<20&&(t.strokeStyle=e[o].strokeColor,t.moveTo(n.x,n.y),t.lineTo(i.x,i.y))}}t.stroke()},r=t=>{const o=["😀","🤪","😱","👻"],n=o[Math.random()*o.length|0];t.font="50px bold Noto Serif KR",t.fillText(n,5,45);const r=t.getImageData(0,0,100,80);t.clearRect(0,0,100,100);const i=r.data,l=[];for(let t=0;t<r.height;t++)for(let o=0;o<r.width;o++){let n=t*(4*r.width)+(4*o+3);if(i[n]>127){let r=new e(10*(o+20),10*t);r.color=`rgba(${i[n-3]}, ${i[n-2]}, ${i[n-1]}, 1)`,r.strokeColor=`rgba(${i[n-3]}, ${i[n-2]}, ${i[n-1]}, 0.1)`,l.push(r)}}return l},i=()=>{const t=document.querySelector(".text-animation"),e=t.querySelector(".text-animation__canvas"),o=t.getBoundingClientRect();return e.width=1e3,e.height=e.width*(o.height/o.width),e}})(window)}});