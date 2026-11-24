const $ = (s) => document.querySelector(s);
const modal = $('#modal');
const content = $('#content');
let stopGame = () => {};
let opened = [];
try { opened = JSON.parse(localStorage.getItem('adviento-v2') || '[]'); } catch {}
const preview = CONFIG.preview === true;
const tz = 'America/Costa_Rica';

function dateParts(){
  return Object.fromEntries(
    new Intl.DateTimeFormat('en-CA',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit'})
      .formatToParts(new Date())
      .map(x=>[x.type,x.value])
  );
}
function releaseKey(){ return CONFIG.year*10000 + CONFIG.releaseMonth*100 + CONFIG.releaseDay; }
function unlocked(){
  if(preview) return 24;
  const p = dateParts();
  const key = Number(p.year)*10000 + Number(p.month)*100 + Number(p.day);
  if(key < releaseKey()) return 0;
  const end = CONFIG.year*10000 + 1224;
  if(key > end) return 24;
  return Math.max(0, Math.min(24, Number(p.day) - (CONFIG.releaseDay - 1)));
}
function nextUnlockDate(){
  const n = unlocked();
  if(n <= 0) return new Date(`${CONFIG.year}-${String(CONFIG.releaseMonth).padStart(2,'0')}-${String(CONFIG.releaseDay).padStart(2,'0')}T00:00:00-06:00`);
  if(n >= 24) return null;
  const d = CONFIG.releaseDay + n;
  return new Date(`${CONFIG.year}-12-${String(d).padStart(2,'0')}T00:00:00-06:00`);
}
const lockIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="10" width="12" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></svg>';
function render(){
  const n = unlocked();
  const seen = opened.filter(d=>d>=1&&d<=n);
  $('#days').innerHTML = DAYS.map((d,i)=>`
    <button class="day ${seen.includes(i+1)?'opened':''} ${n>0 && i+1===n&&!seen.includes(i+1)?'available':''}" data-day="${i+1}" aria-label="Día ${i+1}${i+1>n?', bloqueado':seen.includes(i+1)?', abierto':', disponible'}">
      <span class="number">${i+1}</span><span class="state">${seen.includes(i+1)?'✓':i+1>n?lockIcon:'♡'}</span>
    </button>`).join('');
  $('#bar').value = seen.length;
  $('#status').textContent = `${seen.length} de 24 abiertas`;
  document.querySelectorAll('[data-day]').forEach(b => b.onclick = () => openDay(+b.dataset.day));
  renderSide(n,seen);
}
function renderSide(n,seen){
  const art=$('#sideImage'); art.classList.remove('has-photo'); art.innerHTML='';
  if(n===0){
    $('#sideTitle').textContent='♡ Tu primera sorpresa ♡';
    $('#sideHeading').textContent='Mi precioso...';
    $('#sideBody').textContent='Preparé 24 pequeños regalos para recordarte cuánto te amo. El primero te espera el 1 de diciembre.';
    $('#today').innerHTML='Descubrí tu regalo <span>→</span>'; return;
  }
  const d=DAYS[n-1];
  $('#sideTitle').textContent=`♡ Día ${n} ♡`;
  $('#sideHeading').textContent=seen.includes(n)?d.title:'Un regalo para vos';
  $('#sideBody').textContent=seen.includes(n)?d.body.slice(0,125)+(d.body.length>125?'…':''):'Hoy te espera otro pedacito de nuestra historia. ¿Lo abrimos?';
  if(seen.includes(n)){
    const k=d.photos?.[0]|| (d.type==='gallery'?d.media?.[0]:null)||d.photo;
    if(k&&MEDIA.photos[k]){const img=new Image();img.alt=MEDIA.photos[k].title;img.onload=()=>{art.classList.add('has-photo')};img.src=MEDIA.photos[k].src;art.append(img);}
  }
  $('#today').innerHTML=(seen.includes(n)?'Volver a ver sorpresa':'Abrir sorpresa completa')+' <span>→</span>';
}
function tick(){
  const n=unlocked(), next=nextUnlockDate();
  const christmas=Date.parse(`${CONFIG.year}-12-25T00:00:00-06:00`);
  const days=Math.max(0,Math.ceil((christmas-Date.now())/86400000));
  $('#christmas').textContent=days===0?'♡ ¡Feliz Navidad! ♡':`Faltan ${days} días para Navidad`;
  if(preview){$('#countdown').textContent='Modo de prueba';$('#timerNote').textContent='Todas las sorpresas disponibles';}
  else if(n>=24){$('#countdown').textContent='¡Feliz Navidad!';$('#timerNote').textContent='Las 24 sorpresas están disponibles';}
  else if(next){
    const s=Math.max(0,Math.floor((next.getTime()-Date.now())/1000));
    $('#countdown').textContent=`${s>=86400?Math.floor(s/86400)+' d ':''}${String(Math.floor(s/3600)%24).padStart(2,'0')} h ${String(Math.floor(s/60)%60).padStart(2,'0')} min ${String(s%60).padStart(2,'0')} s`;
    $('#timerNote').textContent=`${n+1} de diciembre · 12:00 a. m. (Costa Rica)`;
  }
  if(n!==tick.last){tick.last=n;render();renderGallery();}
}

function photoCard(key){
  const item = MEDIA.photos[key];
  if(!item) return `<div class="placeholder">♡ Foto pendiente</div>`;
  return `<div class="polaroid"><img loading="lazy" src="${item.src}" alt="${item.title}" onerror="this.parentElement.outerHTML='<div class=\'placeholder\'>♡ No se pudo cargar la foto</div>'"><div class="caption">${item.title}</div></div>`;
}
function galleryCards(keys){
  return `<div class="media-grid">${keys.map(photoCard).join('')}</div>`;
}
function videoCard(key){
  const item = MEDIA.videos[key];
  if(!item) return `<div class="placeholder">♡ Video pendiente</div>`;
  return `<div class="mini-card"><video controls playsinline preload="metadata" src="${item.src}"></video><div class="caption">${item.title}</div><a class="video-link" href="${item.src}" target="_blank" rel="noopener">Abrir video original ↗</a></div>`;
}
function videoCards(keys){
  return `<div class="media-grid">${keys.map(videoCard).join('')}</div>`;
}
function spotify(id,type='track'){
  return `<iframe title="Spotify" src="https://open.spotify.com/embed/${type}/${id}" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe><p><a target="_blank" rel="noopener" href="https://open.spotify.com/${type}/${id}">Escuchar en Spotify ↗</a></p>`;
}
function showLockedMessage(n){
  const unlockDay = CONFIG.releaseDay + (n-1);
  content.innerHTML = `<h2>♡ Todavía no, ${CONFIG.nickname}</h2><p>Esta sorpresa se abre el <b>${unlockDay} de diciembre</b>. Mientras tanto, esta página ya es tuya y cada día va a revelarte algo más.</p>`;
  modal.showModal();
}
function showTeaser(){
  content.innerHTML = `<h2>♡ Ya podés ver tu regalo</h2><p>Este calendario ya es oficialmente tuyo, ${CONFIG.nickname}. Pero el primer sobre se abre hasta el <b>1 de diciembre</b>. Quería que lo tuvieras desde hoy para que la espera también se sienta especial.</p><p class="timeline">Faltan poquitos días para empezar nuestro adviento.</p>`;
  modal.showModal();
}
function markOpen(n){
  if(preview || opened.includes(n)) return;
  opened.push(n);
  try { localStorage.setItem('adviento-v2', JSON.stringify(opened)); } catch {}
  render();
}
function openDay(n){
  stopGame(); stopGame = () => {};
  const allowed = unlocked();
  if(allowed === 0){ showLockedMessage(n); return; }
  if(n > allowed){ showLockedMessage(n); return; }
  markOpen(n);
  const day = DAYS[n-1];
  content.innerHTML = `<small>❄ DÍA ${n} DE 24 ❄</small><h2>${day.title}</h2><p>${day.body}</p><div id="extra"></div>`;
  const e = $('#extra');
  switch(day.type){
    case 'gallery': e.innerHTML = galleryCards(day.media); break;
    case 'video': e.innerHTML = videoCards(day.media); break;
    case 'mixed': e.innerHTML = galleryCards(day.photos) + videoCards(day.videos); break;
    case 'song': e.innerHTML = spotify(TRACKS[day.track]); break;
    case 'playlist': e.innerHTML = spotify(TRACKS.playlist,'playlist') + spotify(TRACKS.uno) + spotify(TRACKS.dos); break;
    case 'coupon': renderCoupon(e, n, day.coupon); break;
    case 'quiz': quiz(e); break;
    case 'memory': memory(e); break;
    case 'dragon': arcade(e, 'dragon'); break;
    case 'race': arcade(e, 'race'); break;
    case 'puzzle': puzzle(e, day.photo); break;
    case 'counter': renderCounter(e); break;
    case 'adele': renderAdele(e); break;
    case 'final': e.innerHTML = galleryCards(day.photos) + videoCards(day.videos) + spotify(TRACKS.regalo); break;
    default: break;
  }
  modal.showModal();
}
function renderCoupon(e, n, label){
  e.innerHTML = `<div class="coupon"><h3>♡ Cupón de amor ♡</h3><p><b>${label}</b></p><p>Para ${CONFIG.recipient}</p><button id="redeem">Canjear</button><p id="redeemed"></p></div>`;
  const key = `coupon-${n}`;
  function update(){
    const used = localStorage.getItem(key);
    $('#redeemed').textContent = used ? '¡Canje solicitado! Mostrame este cupón cuando nos veamos.' : '';
    $('#redeem').disabled = !!used;
  }
  $('#redeem').onclick = () => { localStorage.setItem(key, '1'); update(); };
  update();
}
function renderCounter(e){
  const now = Date.now();
  const start = Date.parse(`${CONFIG.anniversary}T00:00:00-06:00`);
  const days = Math.max(0, Math.floor((now - start)/86400000));
  const nextAnniversary = Date.parse(`2027-01-17T00:00:00-06:00`);
  const remaining = Math.max(0, Math.floor((nextAnniversary - now)/86400000));
  e.innerHTML = `<div class="counter-card"><h1>${days} días ♡</h1><p>Desde el 17/01/2026</p><p>Y faltan ${remaining} días para cumplir un añito juntos el 17/01/2027.</p></div>`;
}
function renderAdele(e){
  e.innerHTML = spotify(TRACKS.adele) + `
    <p class="note">Te preparé una <b>dedicatoria original en español</b> para acompañar esta canción que tanto me hace pensar en vos.</p>
    <div class="song-controls">
      <button id="startWords">Iniciar lectura guiada</button>
      <button id="resetWords">Reiniciar</button>
    </div>
    <p class="timeline">Tip: dale play a la canción en Spotify y luego tocá “Iniciar lectura guiada”.</p>
    <div class="songline" id="words">♡ Tocá el botón para empezar ♡</div>`;
  const cues = [
    [0, 'Si la lluvia empezara a caer y el mundo se sintiera pesado, igual quisiera encontrar la forma de estar con vos.'],
    [12, 'Aunque a veces la noche parezca larga, yo quiero ser ese abrazo donde te sintás en calma.'],
    [27, 'Si alguna vez te sintieras solo, me gustaría que recordés que en mí tenés un refugio y un lugar seguro.'],
    [43, 'Hay muchas maneras de amar, pero la mía quiere cuidarte, acompañarte y hacerte sentir importante.'],
    [58, 'Quisiera que nunca dudés de lo mucho que te elegiría, incluso en los días difíciles, lentos o silenciosos.'],
    [75, 'Yo no prometo perfección; prometo cariño, presencia, ganas de escucharte y ganas de quedarme.'],
    [92, 'Cuando pienso en esta canción, pienso en la ternura de saber que el amor también se demuestra estando.'],
    [110, 'Y si alguna vez te lo preguntás: sí, vos hacés que mi amor se sienta más grande, más bonito y más valiente.'],
    [128, 'Mi precioso, esta canción me hace pensar en vos porque me recuerda cuánto deseo hacerte sentir amado.']
  ];
  let timers = [];
  function clear(){ timers.forEach(clearTimeout); timers = []; if($('#words')) $('#words').textContent = '♡ Tocá el botón para empezar ♡'; }
  $('#startWords').onclick = () => {
    clear();
    const start = Date.now();
    cues.forEach(([sec, line]) => {
      timers.push(setTimeout(() => { $('#words').textContent = line; }, sec*1000));
    });
    timers.push(setTimeout(() => { $('#words').textContent = '♡ Fin de la lectura guiada. Si querés, podés reiniciarla y volver a leerla. ♡'; }, (cues[cues.length-1][0] + 16) * 1000));
  };
  $('#resetWords').onclick = clear;
  stopGame = clear;
}
function quiz(e){
  const qs = [
    ['¿Dónde nos conocimos?',['En la escuela','En la universidad','En un concierto'],0],
    ['¿Qué día volvimos a salir?',['17 de enero','20 de diciembre de 2025','24 de diciembre'],1],
    ['¿Cuál fue nuestra escapada más aventurera?',['San Carlos','Limón','Cartago'],0],
    ['¿Cuál es nuestro chiste gamer?',['Quitayponé','Quiteypone','Game over'],1]
  ];
  let i=0, score=0;
  function draw(){
    if(i===qs.length){ e.innerHTML = `<h2>${score}/4 ♡</h2><p>Igual te ganaste un beso.</p>`; return; }
    const q = qs[i];
    e.innerHTML = `<h3>${q[0]}</h3><div class="choices">${q[1].map((a,j)=>`<button data-answer="${j}">${a}</button>`).join('')}</div>`;
    e.querySelectorAll('button').forEach(b=>b.onclick=()=>{ score += (+b.dataset.answer===q[2]) ? 1 : 0; i++; draw(); });
  }
  draw();
}
function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function memory(e){
  const icons = shuffle(['♡','🏍️','🎮','🐉','🚗','🎀','♡','🏍️','🎮','🐉','🚗','🎀']);
  const matched = new Set(); let first=-1, busy=false, timer;
  e.innerHTML = '<div class="game" style="grid-template-columns:repeat(4,1fr)"></div><p id="gameResult"></p>';
  const grid = e.querySelector('.game');
  icons.forEach((x,i)=>{
    const b = document.createElement('button'); b.textContent='?';
    b.onclick=()=>{
      if(busy || matched.has(i) || first===i) return;
      b.textContent=x;
      if(first<0){ first=i; return; }
      if(icons[first]===x){ matched.add(first); matched.add(i); first=-1; if(matched.size===12) $('#gameResult').textContent='¡Ganaste! Tu premio: un beso ♡'; }
      else { busy=true; const a=first; timer=setTimeout(()=>{ grid.children[a].textContent='?'; b.textContent='?'; first=-1; busy=false; },700); }
    };
    grid.append(b);
  });
  stopGame = ()=>clearTimeout(timer);
}
function puzzle(e,key){
  const item = MEDIA.photos[key];
  const src = item?.src;
  let a=[0,1,2,3,4,5,6,7,8], blank=8;
  const neighbors = (i)=>[i-3,i+3,i%3?i-1:-1,i%3!==2?i+1:-1].filter(x=>x>=0&&x<9);
  for(let i=0;i<70;i++){ const opts=neighbors(blank), j=opts[Math.floor(Math.random()*opts.length)]; [a[blank],a[j]]=[a[j],a[blank]]; blank=j; }
  const img = new Image(); img.onload=()=>draw(true); img.onerror=()=>draw(false); img.src=src;
  function draw(has){
    e.innerHTML = '<p>Mové una pieza junto al espacio vacío.</p><div class="game" style="grid-template-columns:repeat(3,1fr)"></div><p id="gameResult"></p>';
    const g=e.querySelector('.game');
    a.forEach((v,i)=>{
      const b=document.createElement('button'); b.style.aspectRatio='1'; b.textContent=v===8?'':(has?'':v+1);
      if(v===8) b.style.background='#e5c8c0';
      else if(has){ b.style.backgroundImage=`url('${img.src}')`; b.style.backgroundSize='300% 300%'; b.style.backgroundPosition=`${v%3*50}% ${Math.floor(v/3)*50}%`; }
      b.onclick=()=>{
        if(neighbors(blank).includes(i)){ [a[i],a[blank]]=[a[blank],a[i]]; blank=i; draw(has); if(a.every((v,j)=>v===j)) e.querySelector('#gameResult').textContent='¡Lo lograste, mi amor!'; }
      };
      g.append(b);
    });
  }
}
function arcade(e,type){
  const isDragon = type==='dragon';
  e.innerHTML = '<div class="game"><canvas width="320" height="340" aria-label="Juego"></canvas><div class="choices" style="grid-template-columns:1fr 1fr"><button id="left">←</button><button id="right">→</button></div><button id="play">Empezar</button><p id="gameResult">Usá las flechas o tocá la pantalla.</p></div>';
  const c=e.querySelector('canvas'), ctx=c.getContext('2d');
  let x=160, items=[], score=0, frames=0, raf=0, running=false;
  const move = (v)=> x=Math.max(20,Math.min(300,x+v));
  const key=(ev)=>{ if(ev.key==='ArrowLeft'||ev.key==='ArrowRight'){ ev.preventDefault(); move(ev.key==='ArrowLeft'?-32:32); } };
  document.addEventListener('keydown',key);
  e.querySelector('#left').onclick=()=>move(-32);
  e.querySelector('#right').onclick=()=>move(32);
  c.onpointerdown=(ev)=>{ const r=c.getBoundingClientRect(); x=(ev.clientX-r.left)*320/r.width; };
  function draw(){
    ctx.fillStyle=isDragon?'#e1e8ce':'#6e6c74'; ctx.fillRect(0,0,320,340);
    if(!isDragon){ ctx.strokeStyle='#fff'; ctx.setLineDash([12,12]); ctx.beginPath(); ctx.moveTo(160,0); ctx.lineTo(160,340); ctx.stroke(); ctx.setLineDash([]); }
    ctx.font='30px Arial'; ctx.fillText(isDragon?'🐉':'🚗',x-16,310);
    ctx.fillStyle=isDragon?'#80333f':'#fff'; ctx.font='16px Arial'; ctx.fillText('Puntos: '+score,12,24); ctx.font='25px Arial';
    for(const o of items) ctx.fillText(isDragon?'♥':'🚧',o.x-12,o.y);
  }
  function loop(){
    if(!running) return;
    frames++; if(frames%40===0) items.push({x:25+Math.random()*270, y:-20});
    for(const o of items){
      o.y += 3;
      if(o.y>280 && o.y<320 && Math.abs(x-o.x)<27 && !o.hit){ o.hit=true; if(isDragon) score++; else { running=false; e.querySelector('#gameResult').textContent=`¡Llegaste a ${score} puntos! Intentá otra vez.`; } }
      if(o.y>340 && !o.hit && !isDragon){ o.hit=true; score++; }
    }
    items=items.filter(o=>o.y<365 && !o.hit); draw();
    if(isDragon && score>=10){ running=false; e.querySelector('#gameResult').textContent='¡10 corazones para vos! ♡'; }
    if(running) raf=requestAnimationFrame(loop);
  }
  e.querySelector('#play').onclick=()=>{ cancelAnimationFrame(raf); score=0; frames=0; items=[]; running=true; e.querySelector('#gameResult').textContent='¡Vamos!'; loop(); };
  draw();
  stopGame=()=>{ running=false; cancelAnimationFrame(raf); document.removeEventListener('keydown',key); };
}

$('#close').onclick = () => modal.close();
modal.addEventListener('close',()=>{ stopGame(); stopGame = () => {}; content.innerHTML=''; });
$('#today').onclick = () => { const u = unlocked(); if(u===0) showTeaser(); else openDay(Math.max(1,u)); };
function renderGallery(){ const n=unlocked(); $('#gallery').innerHTML=n===0?'<div class="waiting-gallery">♡ Nuestros recuerdos empezarán a aparecer en diciembre.</div>':MEDIA.gallery.filter(k=>DAYS.slice(0,n).some(d=>[...(d.media||[]),...(d.photos||[]),d.photo].includes(k))).map(photoCard).join('')+(n===24?MEDIA.gallery.filter(k=>!DAYS.some(d=>[...(d.media||[]),...(d.photos||[]),d.photo].includes(k))).map(photoCard).join(''):''); }
renderGallery();
$('#music').onclick = () => window.open(`https://open.spotify.com/playlist/${TRACKS.playlist}`,'_blank','noopener');
render(); tick(); setInterval(tick,1000);
