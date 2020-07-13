(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{61:function(t,e,n){"use strict";n.r(e);var r=n(62),i=n(63);Object(r.j)();const o=new class{constructor(){this.fps=document.getElementById("fps"),this.frames=[],this.lastFrameTimeStamp=performance.now()}render(){const t=performance.now(),e=t-this.lastFrameTimeStamp;this.lastFrameTimeStamp=t;const n=1/e*1e3;this.frames.push(n),this.frames.length>100&&this.frames.shift();let r=1/0,i=-1/0,o=0;for(let t=0;t<this.frames.length;t++)o+=this.frames[t],r=Math.min(this.frames[t],r),i=Math.max(this.frames[t],i);let l=o/this.frames.length;this.fps.textContent=`\nFrames per Second:\nlatest = ${Math.round(n)}\navg of last 100 = ${Math.round(l)}        \nmin of last 100 = ${Math.round(r)}\nmax of last 100 = ${Math.round(i)}\n        `.trim()}},l=r.b.new(256,256),c=l instanceof r.b,s=l.width(),f=l.height(),a=document.getElementById("game-of-life-canvas");a.width=6*s+1,a.height=6*f+1;const u=a.getContext("2d");let d=(new Date).getTime();let h=!1,m=!1;window.addEventListener("keydown",t=>{h=t.altKey,m=t.shiftKey}),window.addEventListener("keyup",t=>{h=t.altKey,m=t.shiftKey});document.getElementById("random").addEventListener("click",t=>{l.random_cells(10*Math.random()+1|0,10*Math.random()+1|0)});document.getElementById("reset").addEventListener("click",t=>{l.reset_cells()});const p=document.getElementById("tick_per_frame"),g=document.getElementById("tick_per_frame_value");p.value=p.min;let w=p.valueAsNumber;g.textContent=w,p.addEventListener("change",t=>{w=p.valueAsNumber,g.textContent=w});const y=document.getElementById("play-pause");let b=null;const v=()=>{y.textContent="⏸",_()};y.addEventListener("click",t=>{null==b?v():(y.textContent="▶",cancelAnimationFrame(b),b=null)}),a.addEventListener("click",t=>{const e=a.getBoundingClientRect(),n=a.width/e.width,r=a.height/e.height,i=(t.clientX-e.left)*n,o=(t.clientY-e.top)*r,c=Math.min(Math.floor(o/6),f-1),u=Math.min(Math.floor(i/6),s-1);h?l.glider_on(c,u):m?l.pulsar_on(c,u):l.toggle_cell(c,u),E(),x()});const _=()=>{o.render();const t=(new Date).getTime()-d;if(t>66){d=(new Date).getTime()-t%66,E(),x();for(let t=0;t<w;t++)l.tick()}b=requestAnimationFrame(_)},E=()=>{u.beginPath(),u.strokeStyle="#cccccc";for(let t=0;t<=s;t++)u.moveTo(6*t+1,0),u.lineTo(6*t+1,6*f+1);for(let t=0;t<=f;t++)u.moveTo(0,6*t+1),u.lineTo(6*s+1,6*t+1);u.stroke()},k=(t,e)=>t*s+e,x=()=>{let t;if(c){const e=l.cells();t=new Uint8Array(i.f.buffer,e,s*f)}else t=l.cells();u.beginPath(),u.fillStyle="#ffffff";for(let e=0;e<f;e++)for(let n=0;n<s;n++){t[k(e,n)]!==r.a.Alive&&u.fillRect(6*n+1,6*e+1,5,5)}u.fillStyle="#000000";for(let e=0;e<f;e++)for(let n=0;n<s;n++){const i=k(e,n);t[i]!==r.a.Dead&&(u.fillStyle=0===t[i]?"#ffffff":"#000000",u.fillRect(6*n+1,6*e+1,5,5))}};v()},62:function(t,e,n){"use strict";(function(t){n.d(e,"j",(function(){return d})),n.d(e,"a",(function(){return y})),n.d(e,"b",(function(){return b})),n.d(e,"d",(function(){return v})),n.d(e,"e",(function(){return _})),n.d(e,"c",(function(){return E})),n.d(e,"h",(function(){return k})),n.d(e,"g",(function(){return x})),n.d(e,"f",(function(){return T})),n.d(e,"i",(function(){return M}));var r=n(63);const i=new Array(32).fill(void 0);function o(t){return i[t]}i.push(void 0,null,!0,!1);let l=i.length;function c(t){const e=o(t);return function(t){t<36||(i[t]=l,l=t)}(t),e}let s=new("undefined"==typeof TextDecoder?(0,t.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});s.decode();let f=null;function a(){return null!==f&&f.buffer===r.f.buffer||(f=new Uint8Array(r.f.buffer)),f}function u(t,e){return s.decode(a().subarray(t,t+e))}function d(){r.e()}let h=null;function m(){return null!==h&&h.buffer===r.f.buffer||(h=new Int32Array(r.f.buffer)),h}let p=0;let g=new("undefined"==typeof TextEncoder?(0,t.require)("util").TextEncoder:TextEncoder)("utf-8");const w="function"==typeof g.encodeInto?function(t,e){return g.encodeInto(t,e)}:function(t,e){const n=g.encode(t);return e.set(n),{read:t.length,written:n.length}};const y=Object.freeze({Dead:0,Alive:1});class b{static __wrap(t){const e=Object.create(b.prototype);return e.ptr=t,e}free(){const t=this.ptr;this.ptr=0,r.a(t)}static new(t,e){var n=r.j(t,e);return b.__wrap(n)}render(){try{r.m(8,this.ptr);var t=m()[2],e=m()[3];return u(t,e)}finally{r.b(t,e)}}width(){return r.s(this.ptr)>>>0}height(){return r.i(this.ptr)>>>0}cells(){return r.g(this.ptr)}set_width(t){r.p(this.ptr,t)}set_height(t){r.o(this.ptr,t)}toggle_cell(t,e){r.r(this.ptr,t,e)}glider_on(t,e){r.h(this.ptr,t,e)}pulsar_on(t,e){r.k(this.ptr,t,e)}reset_cells(){r.n(this.ptr)}random_cells(t,e){r.l(this.ptr,t,e)}tick(){r.q(this.ptr)}}const v=function(){return function(t){l===i.length&&i.push(i.length+1);const e=l;return l=i[e],i[e]=t,e}(new Error)},_=function(t,e){var n=function(t,e,n){if(void 0===n){const n=g.encode(t),r=e(n.length);return a().subarray(r,r+n.length).set(n),p=n.length,r}let r=t.length,i=e(r);const o=a();let l=0;for(;l<r;l++){const e=t.charCodeAt(l);if(e>127)break;o[i+l]=e}if(l!==r){0!==l&&(t=t.slice(l)),i=n(i,r,r=l+3*t.length);const e=a().subarray(i+l,i+r);l+=w(t,e).written}return p=l,i}(o(e).stack,r.c,r.d),i=p;m()[t/4+1]=i,m()[t/4+0]=n},E=function(t,e){try{console.error(u(t,e))}finally{r.b(t,e)}},k=function(t){c(t)},x=function(t,e){console.time(u(t,e))},T=function(t,e){console.timeEnd(u(t,e))},M=function(t,e){throw new Error(u(t,e))}}).call(this,n(64)(t))},63:function(t,e,n){"use strict";var r=n.w[t.i];t.exports=r;n(62);r.t()},64:function(t,e){t.exports=function(t){if(!t.webpackPolyfill){var e=Object.create(t);e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),Object.defineProperty(e,"exports",{enumerable:!0}),e.webpackPolyfill=1}return e}}}]);