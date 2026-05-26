/* ─── Theme ──────────────────────────────────────────────────── */
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('dakhly-theme') || 'light';
body.className = saved;

themeToggle?.addEventListener('click', () => {
  const isDark = body.classList.contains('dark');
  body.className = isDark ? 'light' : 'dark';
  localStorage.setItem('dakhly-theme', isDark ? 'light' : 'dark');
});

/* ─── Language ───────────────────────────────────────────────── */
const savedLang = localStorage.getItem('dakhly-lang') || 'ar';
applyLang(savedLang);

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.langTarget;
    applyLang(lang);
    localStorage.setItem('dakhly-lang', lang);
  });
});

function applyLang(lang) {
  body.setAttribute('data-lang', lang);
  body.style.direction = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-ar]').forEach(el => {
    const txt = el.getAttribute('data-' + lang);
    if (txt) el.textContent = txt;
  });

  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.langTarget === lang);
  });
}

/* ─── Navbar scroll ──────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ─── Mobile menu ────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('open');
});
mobileMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ─── Scroll animations ──────────────────────────────────────── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

/* ─── Screens carousel ───────────────────────────────────────── */
const track   = document.getElementById('screensTrack');
const dotsWrap = document.getElementById('screensDots');
const prevBtn  = document.getElementById('trackPrev');
const nextBtn  = document.getElementById('trackNext');

if (track) {
  const cards = track.querySelectorAll('.screen-card');
  const total = cards.length;
  let current = 0;
  const VISIBLE = window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3;

  /* build dots */
  const maxDot = total - VISIBLE + 1;
  for (let i = 0; i < maxDot; i++) {
    const d = document.createElement('span');
    if (i === 0) d.classList.add('active');
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, maxDot - 1));
    const cardW = cards[0].offsetWidth + 24;
    const dir = document.body.getAttribute('data-lang') === 'ar' ? 1 : -1;
    track.style.transform = `translateX(${dir * current * cardW}px)`;
    dotsWrap.querySelectorAll('span').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));

  /* auto-advance */
  setInterval(() => goTo((current + 1) % maxDot), 3500);
}

/* ─── FAQ accordion ──────────────────────────────────────────── */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q')?.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ─── Smooth anchor scroll ───────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
