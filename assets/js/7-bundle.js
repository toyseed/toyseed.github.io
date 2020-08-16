(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{276:function(t,e,s){"use strict";s.r(e);var i=s(277),n=s(278);class l{constructor(t,e){this._width=t,this._height=e,this._cells=new Uint8Array(this._width*this._height).map((t,e)=>e%2==0||e%7==0?1:0)}width(){return this._width}height(){return this._height}cells(){return this._cells}set_width(t){this._width=t}set_height(t){this._height=t}toggle_cell(t,e){let s=this.getIndex(t,e);this._cells[s]=1===this._cells[s]?0:1}glider_on(t,e){}pulsar_on(t,e){}reset_cells(){this._cells=new Uint8Array(this._width*this._height)}random_cells(t,e){this._cells=this._cells.map((s,i)=>i%t==0||i%e==0?1:0)}tick(){let t=[];for(let e=0;e<this._height;e++)for(let s=0;s<this._width;s++){let i=this.getIndex(e,s),n=this.getLiveNeighborCount(e,s),l=this._cells[i];1===l&&n<2?t.push(0):1===l&&n>=2&&n<=3?t.push(1):1===l&&n>3?t.push(0):0===l&&3===n?t.push(1):t.push(l)}this._cells=t}getIndex(t,e){return t*this._width+e}getLiveNeighborCount(t,e){let s=0,i=0===t?this._height-1:t-1,n=t===this._height-1?0:t+1,l=0===e?this._width-1:e-1,h=e===this._width-1?0:e+1;return s=this._cells[this.getIndex(i,l)]+this._cells[this.getIndex(i,e)]+this._cells[this.getIndex(i,h)]+this._cells[this.getIndex(t,l)]+this._cells[this.getIndex(t,h)]+this._cells[this.getIndex(n,l)]+this._cells[this.getIndex(n,e)]+this._cells[this.getIndex(n,h)],s}_getLiveNeighborCount(t,e){let s=0;for(let i of[this._height-1,0,1])for(let n of[this._width-1,0,1]){if(0===i&&0===n)continue;let l=(t+i)%this._height,h=(e+n)%this._width,a=this.getIndex(l,h);s+=this._cells[a]}return s}}Object(i.h)();const h=new class{constructor(){this.fps=document.getElementById("fps"),this.frames=[],this.lastFrameTimeStamp=performance.now()}render(){const t=performance.now(),e=t-this.lastFrameTimeStamp;this.lastFrameTimeStamp=t;const s=1/e*1e3;this.frames.push(s),this.frames.length>100&&this.frames.shift();let i=1/0,n=-1/0,l=0;for(let t=0;t<this.frames.length;t++)l+=this.frames[t],i=Math.min(this.frames[t],i),n=Math.max(this.frames[t],n);let h=l/this.frames.length;this.fps.innerHTML=`\n<span>Frames per Second:</span>\n<span>latest = ${Math.round(s)}</span>\n<span>avg of last 100 = ${Math.round(h)}</span>        \n<span>min of last 100 = ${Math.round(i)}</span>\n<span>max of last 100 = ${Math.round(n)}</span>\n        `.trim()}};let a=i.b.new(128,128),r=a instanceof i.b;document.getElementsByName("lang").forEach(t=>{t.addEventListener("change",t=>{t.target.checked&&(I(),"wasm"===t.target.value?(a=i.b.new(128,128),r=!0):(a=new l(128,128),r=!1),x())})});const o=a.width(),c=a.height(),d=document.getElementById("game-of-life-canvas");d.width=6*o+1,d.height=6*c+1;const m=d.getContext("2d");let f=(new Date).getTime();let g=!1,_=!1;window.addEventListener("keydown",t=>{g=t.altKey,_=t.shiftKey}),window.addEventListener("keyup",t=>{g=t.altKey,_=t.shiftKey});document.getElementById("random").addEventListener("click",t=>{a.random_cells(10*Math.random()+1|0,10*Math.random()+1|0)});document.getElementById("reset").addEventListener("click",t=>{a.reset_cells()});const u=document.getElementById("tick_per_frame"),w=document.getElementById("tick_per_frame_value");u.value=u.min;let p=u.valueAsNumber;w.textContent=p,u.addEventListener("change",t=>{p=u.valueAsNumber,w.textContent=p});const v=document.getElementById("play-pause");let y=null;const x=()=>{v.textContent="⏸",E()},I=()=>{v.textContent="▶",cancelAnimationFrame(y),y=null};v.addEventListener("click",t=>{null==y?x():I()}),d.addEventListener("click",t=>{const e=d.getBoundingClientRect(),s=d.width/e.width,i=d.height/e.height,n=(t.clientX-e.left)*s,l=(t.clientY-e.top)*i,h=Math.min(Math.floor(l/6),c-1),r=Math.min(Math.floor(n/6),o-1);g?a.glider_on(h,r):_?a.pulsar_on(h,r):a.toggle_cell(h,r),k(),M()});const E=()=>{h.render();const t=(new Date).getTime()-f;if(t>16){f=(new Date).getTime()-t%16,k(),M();for(let t=0;t<p;t++)a.tick()}y=requestAnimationFrame(E)},k=()=>{m.beginPath(),m.strokeStyle="#cccccc";for(let t=0;t<=o;t++)m.moveTo(6*t+1,0),m.lineTo(6*t+1,6*c+1);for(let t=0;t<=c;t++)m.moveTo(0,6*t+1),m.lineTo(6*o+1,6*t+1);m.stroke()},b=(t,e)=>t*o+e,M=()=>{let t;if(r){const e=a.cells();t=new Uint8Array(n.f.buffer,e,o*c)}else t=a.cells();m.beginPath(),m.fillStyle="#ffffff";for(let e=0;e<c;e++)for(let s=0;s<o;s++){t[b(e,s)]!==i.a.Alive&&m.fillRect(6*s+1,6*e+1,5,5)}m.fillStyle="#000000";for(let e=0;e<c;e++)for(let s=0;s<o;s++){const n=b(e,s);t[n]!==i.a.Dead&&(m.fillStyle=0===t[n]?"#ffffff":"#000000",m.fillRect(6*s+1,6*e+1,5,5))}};x()}}]);