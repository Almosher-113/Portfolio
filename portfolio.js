/* ═══ Mohamed Farid Portfolio — Shared JS ═══ */

// CURSOR
(function(){
  const c=document.getElementById('cursor'),r=document.getElementById('cursor-ring');
  if(!c)return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  function a(){c.style.transform=`translate(${mx-4}px,${my-4}px)`;rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;r.style.transform=`translate(${rx-16}px,${ry-16}px)`;requestAnimationFrame(a);}
  a();
})();

// SCROLL REVEAL
(function(){
  const els=document.querySelectorAll('.reveal');
  if(!els.length)return;
  const o=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');o.unobserve(e.target);}});},{threshold:0.08});
  els.forEach(el=>o.observe(el));
})();

// HAMBURGER
function toggleMenu(){document.getElementById('mobileMenu')?.classList.toggle('open');document.getElementById('hamburger')?.classList.toggle('open');}
function closeMenu(){document.getElementById('mobileMenu')?.classList.remove('open');document.getElementById('hamburger')?.classList.remove('open');}


