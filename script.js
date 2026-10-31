/* Cita Rasa Desa - interaksi halaman
   Isi file ini: menu seluler, efek scroll, muncul bertahap, tombol magnetik,
   pita foto dan piring hero, jendela foto menu.
   Semua efek dimatikan otomatis bila pengguna memilih "kurangi gerakan". */
(function(){try{
var d=document,r=d.documentElement,$=function(s,c){return Array.prototype.slice.call((c||d).querySelectorAll(s))};
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
var nv=$('#nv')[0],pg=$('#pg')[0],top=$('#top')[0],bgw=$('#bgw')[0];

/* menu seluler */
var mm=d.createElement('div');mm.className='mm';
$('#mn li').forEach(function(li){var a=li.firstChild.cloneNode(true);mm.appendChild(a)});
d.body.appendChild(mm);
var bb=$('#bb')[0];
function tm(o){mm.classList.toggle('open',o);nv.classList.toggle('m',o);bb.textContent=o?'\u2715':'\u2630'}
bb.onclick=function(){tm(!mm.classList.contains('open'))};
mm.onclick=function(){tm(false)};

/* scroll: bilah, navigasi, parallax, tombol atas */
var links=$('#mn a[href^="#"]').map(function(a){return[a,d.querySelector(a.getAttribute('href'))]});
var pis=$('.pi'),last=0,tk=false;
function onS(){
 var y=scrollY,h=r.scrollHeight-innerHeight,p=h>0?y/h:0;
 pg.style.setProperty('--p',p);top.style.setProperty('--p',p);
 nv.classList.toggle('s',y>40);
 nv.classList.toggle('h',y>last&&y>500&&!mm.classList.contains('open'));
 top.classList.toggle('s',y>700);
 last=y;
 if(!reduce){
  if(y<innerHeight*1.2)bgw.style.transform='translateY('+(y*.22)+'px)';
  pis.forEach(function(el){var b=el.parentNode.getBoundingClientRect();if(b.bottom>0&&b.top<innerHeight){el.style.transform='translateY('+((b.top+b.height/2-innerHeight/2)*-.14)+'px)'}});
 }
 var m=y+innerHeight*.35,cur=null;
 links.forEach(function(q){if(q[1]&&q[1].offsetTop<=m)cur=q[0]});
 links.forEach(function(q){q[0].classList.toggle('on',q[0]===cur)});
 tk=false}
addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(onS)}},{passive:true});onS();

/* muncul bertahap */
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('v');io.unobserve(x.target)}})},{threshold:.12,rootMargin:'0px 0px -5% 0px'});
$('.rv').forEach(function(e){io.observe(e)});

/* tombol magnetik */
if(matchMedia('(hover:hover)').matches&&!reduce)$('.btn').forEach(function(b){
 b.addEventListener('pointermove',function(e){var q=b.getBoundingClientRect();b.style.setProperty('--mx',((e.clientX-q.left)/q.width-.5)*10+'px');b.style.setProperty('--my',((e.clientY-q.top)/q.height-.5)*8+'px')});
 b.addEventListener('pointerleave',function(){b.style.setProperty('--mx','0px');b.style.setProperty('--my','0px')})});

/* pita foto dan piring hero dibangun dari foto menu */
var cards=$('.bc'),rt=$('#rt')[0],disc=$('#disc')[0],pn=$('#pn')[0];
var seq=cards.map(function(c){var im=d.createElement('img');im.src=$('img',c)[0].src;im.alt='';return im});
seq.concat(seq.map(function(n){return n.cloneNode(true)})).forEach(function(n){rt.appendChild(n)});
var pl=cards.slice(0,4),pi=0,pim=[$('img',disc)[0]];
pl.slice(1).forEach(function(c){var im=d.createElement('img');im.src=$('img',c)[0].src;im.alt='';disc.appendChild(im);pim.push(im)});
function plate(k){pi=k;pim.forEach(function(im,j){im.classList.toggle('on',j===k)});pn.textContent=$('h3',pl[k])[0].textContent}
if(!reduce)setInterval(function(){plate((pi+1)%pim.length)},3800);

/* jendela foto menu */
var lb=$('#lb')[0],li=$('img',lb)[0],lh=$('h3',lb)[0],lp=$('p',lb)[0];
function op(c){li.src=$('img',c)[0].src;li.alt=$('img',c)[0].alt;lh.textContent=$('h3',c)[0].textContent;lp.textContent=$('p',c)[0].textContent;lb.classList.add('o')}
function cl(){lb.classList.remove('o')}
cards.forEach(function(c){c.addEventListener('click',function(){op(c)});c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();op(c)}})});
lb.addEventListener('click',function(e){if(e.target===lb||e.target.tagName==='BUTTON')cl()});
addEventListener('keydown',function(e){if(e.key==='Escape'){cl();tm(false)}});


}catch(e){}})();
