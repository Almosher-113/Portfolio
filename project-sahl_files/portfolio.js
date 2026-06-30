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

// ── UNIVERSAL FIT PANEL ──
function attachFitPanel(img, wrap) {
  const panel = document.createElement('div');
  panel.className = 'fit-panel';

  const fits=[['cover','Cover'],['contain','Contain'],['fill','Fill']];
  const poss=[['center center','Center'],['center top','Top'],['center bottom','Bottom'],['left center','Left'],['right center','Right']];

  function grp(items, getCur, apply) {
    const btns=[];
    items.forEach(([val,lbl])=>{
      const b=document.createElement('button');
      b.className='fit-btn'+(val===getCur()?' active':'');
      b.textContent=lbl;
      b.onclick=e=>{e.stopPropagation();btns.forEach(x=>x.classList.remove('active'));b.classList.add('active');apply(val);};
      btns.push(b);panel.appendChild(b);
    });
  }

  const l1=document.createElement('span');l1.className='fit-label';l1.textContent='FIT';panel.appendChild(l1);
  grp(fits,()=>img.style.objectFit||'cover',v=>img.style.objectFit=v);
  const d=document.createElement('span');d.className='fit-divider';panel.appendChild(d);
  const l2=document.createElement('span');l2.className='fit-label';l2.textContent='POS';panel.appendChild(l2);
  grp(poss,()=>img.style.objectPosition||'center center',v=>img.style.objectPosition=v);

  wrap.appendChild(panel);
}

// CARD image upload
function triggerImgUpload(placeholder) {
  _pick(src=>{
    const wrap=document.createElement('div');
    wrap.className='card-img-wrap img-wrap';
    const img=document.createElement('img');
    img.className='card-img';
    img.style.cssText='width:100%;height:100%;object-fit:cover;object-position:center center;display:block;transition:transform 0.5s,filter 0.3s;filter:brightness(0.88);';
    img.src=src;
    wrap.appendChild(img);
    attachFitPanel(img,wrap);
    placeholder.replaceWith(wrap);
  });
}

// GALLERY image upload
function addGalleryImage(placeholder) {
  _pick(src=>{
    const item=document.createElement('div');
    item.className='gallery-item img-wrap';
    item.style.position='relative';
    const img=document.createElement('img');
    img.className='gallery-img';
    img.style.cssText='width:100%;height:230px;object-fit:cover;object-position:center center;display:block;transition:transform 0.4s;';
    img.src=src;
    item.appendChild(img);
    attachFitPanel(img,item);
    placeholder.replaceWith(item);
  });
}

// ABOUT photo upload
function loadPhoto(input) {
  if(!input.files[0])return;
  const r=new FileReader();
  r.onload=e=>{
    const wrap=input.closest('.about-photo-wrap');
    const ph=wrap.querySelector('.about-photo-placeholder');
    const imgWrap=document.createElement('div');
    imgWrap.className='img-wrap';imgWrap.style.cssText='position:relative;width:100%;';
    const img=document.createElement('img');
    img.style.cssText='width:100%;aspect-ratio:3/4;object-fit:cover;object-position:center center;display:block;';
    img.src=e.target.result;
    imgWrap.appendChild(img);
    attachFitPanel(img,imgWrap);
    ph.replaceWith(imgWrap);
  };
  r.readAsDataURL(input.files[0]);
}

// CERT upload
function loadCert(placeholder) {
  _pick(src=>{
    const wrap=document.createElement('div');
    wrap.className='img-wrap';wrap.style.cssText='position:relative;max-width:500px;width:100%;display:inline-block;';
    const img=document.createElement('img');
    img.className='cert-img';img.style.cssText='width:100%;display:block;object-fit:contain;object-position:center center;';
    img.src=src;
    wrap.appendChild(img);
    attachFitPanel(img,wrap);
    placeholder.replaceWith(wrap);
  });
}

// Add gallery slot
function addNewSlot(){
  const g=document.getElementById('gallery');if(!g)return;
  const p=document.createElement('div');p.className='gallery-placeholder';
  p.onclick=function(){addGalleryImage(this);};
  p.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>Add Image`;
  g.appendChild(p);
}

function _pick(cb){
  const i=document.createElement('input');i.type='file';i.accept='image/*';
  i.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>cb(ev.target.result);r.readAsDataURL(f);};
  i.click();
}
