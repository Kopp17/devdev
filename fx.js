(()=>{const R=(a,b)=>a+Math.random()*(b-a),C=(v,a,b)=>Math.max(a,Math.min(b,v)),$=s=>[...document.querySelectorAll(s)];
if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
const sc=s=>{s.style.transform=`translate(${R(-300,300)}px,${R(-250,250)}px) rotate(${R(-360,360)}deg) scale(${R(.2,2.5)})`;s.style.opacity=0;s.style.filter='blur(8px)'},ga=s=>{s.style.transform='none';s.style.opacity=1;s.style.filter='none'};
const io=new IntersectionObserver(es=>es.forEach(e=>e.target.querySelectorAll('.ch').forEach(e.isIntersecting?ga:sc)),{threshold:.3});
$('[data-shatter]').forEach(el=>{const t=el.textContent;el.textContent='';el.setAttribute('aria-label',t);
let n=0;t.split(' ').forEach((w,wi,A)=>{const W=document.createElement('span');W.style.cssText='display:inline-block;white-space:nowrap';[...w].forEach(c=>{const i=n++;const s=document.createElement('i');s.className='ch';s.textContent=c==' '?'\u00a0':c;s.setAttribute('aria-hidden','true');const d=i*.03+'s';s.style.cssText=`display:inline-block;font-style:normal;transition:transform 1.1s cubic-bezier(.2,.9,.2,1.1) ${d},opacity .8s ${d},filter 1s ${d}`;sc(s);W.appendChild(s)});el.appendChild(W);if(wi<A.length-1)el.appendChild(document.createTextNode(' '))});
io.observe(el);const boom=()=>{el.querySelectorAll('.ch').forEach(sc);setTimeout(()=>el.querySelectorAll('.ch').forEach(ga),900)};el.addEventListener('click',boom);el.addEventListener('mouseenter',boom)});
const P=$('.pc').map(el=>{const o={el,x:R(-1,1),y:R(-1,1),r:R(-1,1),b:0};el.addEventListener('click',()=>o.b=1);return o});
(function t(){const vh=innerHeight;P.forEach(o=>{const b=o.el.getBoundingClientRect(),k=C(Math.abs(b.top+b.height/2-vh/2)/(vh*.55)-.15,0,1),e=Math.max(k*k,o.b);o.b*=.94;o.el.style.transform=`translate(${o.x*e*260}px,${o.y*e*200}px) rotate(${o.r*e*80}deg) scale(${1-e*.4})`;o.el.style.opacity=1-e*.85});requestAnimationFrame(t)})();
$('canvas[data-word]').forEach(cv=>{const x=cv.getContext('2d'),W=cv.width=cv.offsetWidth,H=cv.height=cv.offsetHeight,m={x:-999,y:-999},w=cv.dataset.word,o=document.createElement('canvas');o.width=W;o.height=H;const q=o.getContext('2d');
q.font='900 '+Math.min(W/(w.length*.68),H*.45)+'px Arial Black,Impact,sans-serif';q.textAlign='center';q.textBaseline='middle';q.fillText(w,W/2,H*.4);
const d=q.getImageData(0,0,W,H).data,g=Math.max(4,Math.round(W/200)),pts=[],cols=(cv.dataset.c||'#fff').split(',');
for(let j=0;j<H;j+=g)for(let i=0;i<W;i+=g)if(d[(j*W+i)*4+3]>128)pts.push({hx:i,hy:j,x:R(0,W),y:R(0,H),vx:0,vy:0});
const p=cv.parentElement,boom=()=>pts.forEach(a=>{a.vx+=R(-45,45);a.vy+=R(-45,45)});
p.addEventListener('pointermove',e=>{const b=cv.getBoundingClientRect();m.x=e.clientX-b.left;m.y=e.clientY-b.top});p.addEventListener('pointerleave',()=>m.x=-999);p.addEventListener('click',boom);setInterval(boom,7000);
(function f(){x.clearRect(0,0,W,H);pts.forEach((a,i)=>{const dx=a.x-m.x,dy=a.y-m.y,d2=dx*dx+dy*dy;if(d2<14000){const s=(14000-d2)/14000*6,n=Math.atan2(dy,dx);a.vx+=Math.cos(n)*s;a.vy+=Math.sin(n)*s}
a.vx+=(a.hx-a.x)*.03;a.vy+=(a.hy-a.y)*.03;a.vx*=.88;a.vy*=.88;a.x+=a.vx;a.y+=a.vy;x.fillStyle=cols[i%cols.length];x.fillRect(a.x,a.y,g*.8,g*.8)});requestAnimationFrame(f)})()})})();
