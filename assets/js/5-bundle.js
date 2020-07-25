(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{64:function(t,e,n){"use strict";n.r(e);var i=n(65),r=n(66);class s{constructor(t,e){this._width=t,this._height=e,this._cells=new Uint8Array(this._width*this._height).map((t,e)=>e%2==0||e%7==0?1:0)}width(){return this._width}height(){return this._height}cells(){return this._cells}set_width(t){this._width=t}set_height(t){this._height=t}toggle_cell(t,e){let n=this.getIndex(t,e);this._cells[n]=1===this._cells[n]?0:1}glider_on(t,e){}pulsar_on(t,e){}reset_cells(){this._cells=new Uint8Array(this._width*this._height)}random_cells(t,e){this._cells=this._cells.map((n,i)=>i%t==0||i%e==0?1:0)}tick(){let t=[];for(let e=0;e<this._height;e++)for(let n=0;n<this._width;n++){let i=this.getIndex(e,n),r=this.getLiveNeighborCount(e,n),s=this._cells[i];1===s&&r<2?t.push(0):1===s&&r>=2&&r<=3?t.push(1):1===s&&r>3?t.push(0):0===s&&3===r?t.push(1):t.push(s)}this._cells=t}getIndex(t,e){return t*this._width+e}getLiveNeighborCount(t,e){let n=0,i=0===t?this._height-1:t-1,r=t===this._height-1?0:t+1,s=0===e?this._width-1:e-1,l=e===this._width-1?0:e+1;return n=this._cells[this.getIndex(i,s)]+this._cells[this.getIndex(i,e)]+this._cells[this.getIndex(i,l)]+this._cells[this.getIndex(t,s)]+this._cells[this.getIndex(t,l)]+this._cells[this.getIndex(r,s)]+this._cells[this.getIndex(r,e)]+this._cells[this.getIndex(r,l)],n}_getLiveNeighborCount(t,e){let n=0;for(let i of[this._height-1,0,1])for(let r of[this._width-1,0,1]){if(0===i&&0===r)continue;let s=(t+i)%this._height,l=(e+r)%this._width,o=this.getIndex(s,l);n+=this._cells[o]}return n}}Object(i.h)();const l=new class{constructor(){this.fps=document.getElementById("fps"),this.frames=[],this.lastFrameTimeStamp=performance.now()}render(){const t=performance.now(),e=t-this.lastFrameTimeStamp;this.lastFrameTimeStamp=t;const n=1/e*1e3;this.frames.push(n),this.frames.length>100&&this.frames.shift();let i=1/0,r=-1/0,s=0;for(let t=0;t<this.frames.length;t++)s+=this.frames[t],i=Math.min(this.frames[t],i),r=Math.max(this.frames[t],r);let l=s/this.frames.length;this.fps.innerHTML=`\n<span>Frames per Second:</span>\n<span>latest = ${Math.round(n)}</span>\n<span>avg of last 100 = ${Math.round(l)}</span>        \n<span>min of last 100 = ${Math.round(i)}</span>\n<span>max of last 100 = ${Math.round(r)}</span>\n        `.trim()}};let o=i.b.new(128,128),h=o instanceof i.b;document.getElementsByName("lang").forEach(t=>{t.addEventListener("change",t=>{t.target.checked&&(x(),"wasm"===t.target.value?(o=i.b.new(128,128),h=!0):(o=new s(128,128),h=!1),v())})});const c=o.width(),a=o.height(),u=document.getElementById("game-of-life-canvas");u.width=6*c+1,u.height=6*a+1;const f=u.getContext("2d");let d=(new Date).getTime();let g=!1,p=!1;window.addEventListener("keydown",t=>{g=t.altKey,p=t.shiftKey}),window.addEventListener("keyup",t=>{g=t.altKey,p=t.shiftKey});document.getElementById("random").addEventListener("click",t=>{o.random_cells(10*Math.random()+1|0,10*Math.random()+1|0)});document.getElementById("reset").addEventListener("click",t=>{o.reset_cells()});const m=document.getElementById("tick_per_frame"),_=document.getElementById("tick_per_frame_value");m.value=m.min;let w=m.valueAsNumber;_.textContent=w,m.addEventListener("change",t=>{w=m.valueAsNumber,_.textContent=w});const y=document.getElementById("play-pause");let b=null;const v=()=>{y.textContent="⏸",E()},x=()=>{y.textContent="▶",cancelAnimationFrame(b),b=null};y.addEventListener("click",t=>{null==b?v():x()}),u.addEventListener("click",t=>{const e=u.getBoundingClientRect(),n=u.width/e.width,i=u.height/e.height,r=(t.clientX-e.left)*n,s=(t.clientY-e.top)*i,l=Math.min(Math.floor(s/6),a-1),h=Math.min(Math.floor(r/6),c-1);g?o.glider_on(l,h):p?o.pulsar_on(l,h):o.toggle_cell(l,h),I(),T()});const E=()=>{l.render();const t=(new Date).getTime()-d;if(t>16){d=(new Date).getTime()-t%16,I(),T();for(let t=0;t<w;t++)o.tick()}b=requestAnimationFrame(E)},I=()=>{f.beginPath(),f.strokeStyle="#cccccc";for(let t=0;t<=c;t++)f.moveTo(6*t+1,0),f.lineTo(6*t+1,6*a+1);for(let t=0;t<=a;t++)f.moveTo(0,6*t+1),f.lineTo(6*c+1,6*t+1);f.stroke()},k=(t,e)=>t*c+e,T=()=>{let t;if(h){const e=o.cells();t=new Uint8Array(r.f.buffer,e,c*a)}else t=o.cells();f.beginPath(),f.fillStyle="#ffffff";for(let e=0;e<a;e++)for(let n=0;n<c;n++){t[k(e,n)]!==i.a.Alive&&f.fillRect(6*n+1,6*e+1,5,5)}f.fillStyle="#000000";for(let e=0;e<a;e++)for(let n=0;n<c;n++){const r=k(e,n);t[r]!==i.a.Dead&&(f.fillStyle=0===t[r]?"#ffffff":"#000000",f.fillRect(6*n+1,6*e+1,5,5))}};v()},65:function(t,e,n){"use strict";(function(t){n.d(e,"h",(function(){return f})),n.d(e,"a",(function(){return w})),n.d(e,"b",(function(){return y})),n.d(e,"d",(function(){return b})),n.d(e,"e",(function(){return v})),n.d(e,"c",(function(){return x})),n.d(e,"f",(function(){return E})),n.d(e,"g",(function(){return I}));var i=n(66);const r=new Array(32).fill(void 0);function s(t){return r[t]}r.push(void 0,null,!0,!1);let l=r.length;function o(t){const e=s(t);return function(t){t<36||(r[t]=l,l=t)}(t),e}let h=new("undefined"==typeof TextDecoder?(0,t.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});h.decode();let c=null;function a(){return null!==c&&c.buffer===i.f.buffer||(c=new Uint8Array(i.f.buffer)),c}function u(t,e){return h.decode(a().subarray(t,t+e))}function f(){i.e()}let d=null;function g(){return null!==d&&d.buffer===i.f.buffer||(d=new Int32Array(i.f.buffer)),d}let p=0;let m=new("undefined"==typeof TextEncoder?(0,t.require)("util").TextEncoder:TextEncoder)("utf-8");const _="function"==typeof m.encodeInto?function(t,e){return m.encodeInto(t,e)}:function(t,e){const n=m.encode(t);return e.set(n),{read:t.length,written:n.length}};const w=Object.freeze({Dead:0,Alive:1});class y{static __wrap(t){const e=Object.create(y.prototype);return e.ptr=t,e}free(){const t=this.ptr;this.ptr=0,i.a(t)}static new(t,e){var n=i.j(t,e);return y.__wrap(n)}render(){try{i.m(8,this.ptr);var t=g()[2],e=g()[3];return u(t,e)}finally{i.b(t,e)}}width(){return i.s(this.ptr)>>>0}height(){return i.i(this.ptr)>>>0}cells(){return i.g(this.ptr)}set_width(t){i.p(this.ptr,t)}set_height(t){i.o(this.ptr,t)}toggle_cell(t,e){i.r(this.ptr,t,e)}glider_on(t,e){i.h(this.ptr,t,e)}pulsar_on(t,e){i.k(this.ptr,t,e)}reset_cells(){i.n(this.ptr)}random_cells(t,e){i.l(this.ptr,t,e)}tick(){i.q(this.ptr)}}const b=function(){return function(t){l===r.length&&r.push(r.length+1);const e=l;return l=r[e],r[e]=t,e}(new Error)},v=function(t,e){var n=function(t,e,n){if(void 0===n){const n=m.encode(t),i=e(n.length);return a().subarray(i,i+n.length).set(n),p=n.length,i}let i=t.length,r=e(i);const s=a();let l=0;for(;l<i;l++){const e=t.charCodeAt(l);if(e>127)break;s[r+l]=e}if(l!==i){0!==l&&(t=t.slice(l)),r=n(r,i,i=l+3*t.length);const e=a().subarray(r+l,r+i);l+=_(t,e).written}return p=l,r}(s(e).stack,i.c,i.d),r=p;g()[t/4+1]=r,g()[t/4+0]=n},x=function(t,e){try{console.error(u(t,e))}finally{i.b(t,e)}},E=function(t){o(t)},I=function(t,e){throw new Error(u(t,e))}}).call(this,n(67)(t))},66:function(t,e,n){"use strict";var i=n.w[t.i];t.exports=i;n(65);i.t()},67:function(t,e){t.exports=function(t){if(!t.webpackPolyfill){var e=Object.create(t);e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),Object.defineProperty(e,"exports",{enumerable:!0}),e.webpackPolyfill=1}return e}}}]);