'use strict';
(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  $('#year').textContent = new Date().getFullYear();
  const menuBtn = $('.menu-button'), menu = $('#main-menu');
  function closeMenu() { menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.setAttribute('aria-label', 'Abrir menú'); }
  menuBtn.addEventListener('click', () => { const opened = menu.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', String(opened)); menuBtn.setAttribute('aria-label', opened ? 'Cerrar menú' : 'Abrir menú'); });
  $$('.nav-links a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  // Tabs accesibles y con navegación por flechas.
  const tabs = $$('.career-tab');
  function activateTab(tab) {
    tabs.forEach(t => { const selected = t === tab; t.classList.toggle('active', selected); t.setAttribute('aria-selected', String(selected)); t.tabIndex = selected ? 0 : -1; $('#' + t.getAttribute('aria-controls')).hidden = !selected; });
  }
  tabs.forEach((tab, i) => { tab.tabIndex = i === 0 ? 0 : -1; tab.addEventListener('click', () => activateTab(tab)); tab.addEventListener('keydown', e => { if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(e.key)) { e.preventDefault(); const next = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (i + ((e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : -1) + tabs.length) % tabs.length; activateTab(tabs[next]); tabs[next].focus(); } }); });

  const filters = $$('.filter');
  filters.forEach(btn => btn.addEventListener('click', () => {
    const value = btn.dataset.filter;
    filters.forEach(f => { f.classList.toggle('active', f === btn); f.setAttribute('aria-pressed', String(f === btn)); });
    $$('.project-card').forEach(card => { card.hidden = value !== 'all' && !card.dataset.category.split(' ').includes(value); });
  }));

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); }, { threshold: .09, rootMargin: '0px 0px 35px 0px' });
    $$('.reveal').forEach(el => observer.observe(el));
  } else $$('.reveal').forEach(el => el.classList.add('visible'));

  const toast = $('.toast'); let toastTimer;
  function showToast(message) { toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2700); }
  $('.copy-email').addEventListener('click', async e => {
    const email = e.currentTarget.dataset.email;
    try { if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable'); await navigator.clipboard.writeText(email); showToast('Correo copiado al portapapeles'); }
    catch { showToast('Copia este correo: ' + email); }
  });

  if (!reducedMotion && window.matchMedia('(pointer:fine)').matches) {
    const glow = $('.cursor-glow');
    document.addEventListener('pointermove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; glow.style.opacity = '1'; }, { passive: true });
  }

  // Red neuronal de fondo, canvas ligero y adaptado a alta densidad de píxeles.
  const canvas = $('#network');
  if (canvas && !reducedMotion) {
    const ctx = canvas.getContext('2d'); let points = [], w = 0, h = 0, rafId = 0; const maxDist = 125;
    const resize = () => { const bounds = canvas.getBoundingClientRect(); w = bounds.width; h = bounds.height; const ratio = Math.min(window.devicePixelRatio || 1, 2); canvas.width = Math.round(w * ratio); canvas.height = Math.round(h * ratio); ctx.setTransform(ratio, 0, 0, ratio, 0, 0); const count = Math.min(75, Math.floor((w * h) / 14000)); points = Array.from({length: count}, () => ({x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .32, vy: (Math.random() - .5) * .32, r: .8 + Math.random() * 1.2 })); };
    resize(); window.addEventListener('resize', resize, { passive: true });
    function draw() { if (document.hidden) { rafId = 0; return; } ctx.clearRect(0, 0, w, h); points.forEach((p, i) => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1; ctx.fillStyle = 'rgba(151,255,188,.68)'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); for (let j = i + 1; j < points.length; j++) { const q = points[j], dist = Math.hypot(p.x - q.x, p.y - q.y); if (dist < maxDist) { ctx.strokeStyle = `rgba(130,248,164,${(1 - dist/maxDist) * .23})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); } } }); rafId = requestAnimationFrame(draw); }
    draw(); document.addEventListener('visibilitychange', () => { if (!document.hidden && !rafId) draw(); });
  }
})();
