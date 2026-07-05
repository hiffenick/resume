/* ===================================================================
   NIKHIL KAMTHE — PORTFOLIO
   Vanilla JS + GSAP + ScrollTrigger + Lenis + SplitType
   =================================================================== */

document.getElementById('year').textContent = new Date().getFullYear();

gsap.registerPlugin(ScrollTrigger);

/* -----------------------------------------------------------------
   1. LOADING SCREEN
   Simulated progress -> fades out -> reveals hero
----------------------------------------------------------------- */
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loaderBar');
const loaderPct = document.getElementById('loaderPct');

function runLoader() {
  return new Promise((resolve) => {
    let progress = 0;
    const tick = setInterval(() => {
      progress += Math.random() * 18;
      if (progress >= 100) {
        progress = 100;
        clearInterval(tick);
        loaderBar.style.width = '100%';
        loaderPct.textContent = '100%';
        gsap.to(loader, {
          opacity: 0,
          duration: 0.6,
          delay: 0.25,
          ease: 'power2.out',
          onComplete: () => {
            loader.style.display = 'none';
            resolve();
          }
        });
        return;
      }
      loaderBar.style.width = progress + '%';
      loaderPct.textContent = Math.floor(progress) + '%';
    }, 120);
  });
}

/* -----------------------------------------------------------------
   2. LENIS SMOOTH SCROLL
----------------------------------------------------------------- */
let lenis;
function initLenis() {
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // in-page nav links -> lenis scrollTo
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -70 });
      }
    });
  });
}

/* -----------------------------------------------------------------
   3. CUSTOM CURSOR
----------------------------------------------------------------- */
function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (window.matchMedia('(max-width: 860px)').matches) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  gsap.ticker.add(() => {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
  });

  document.querySelectorAll('a, button, .magnetic').forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-active'));
  });
}

/* -----------------------------------------------------------------
   4. MAGNETIC BUTTONS
----------------------------------------------------------------- */
function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: relX * 0.3, y: relY * 0.4, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

/* -----------------------------------------------------------------
   5. NAV: scrolled state + active section underline
----------------------------------------------------------------- */
function initNav() {
  const nav = document.getElementById('nav');
  ScrollTrigger.create({
    start: 40,
    onUpdate: (self) => {
      nav.classList.toggle('is-scrolled', self.scroll() > 40);
    }
  });

  const navLinks = document.querySelectorAll('[data-nav]');
  const sections = ['about', 'skills', 'projects', 'journey', 'contact'];

  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    ScrollTrigger.create({
      trigger: el,
      start: 'top center',
      end: 'bottom center',
      onToggle: (self) => {
        if (self.isActive) {
          navLinks.forEach((l) => l.classList.toggle('is-active', l.dataset.nav === id));
        }
      }
    });
  });
}

/* -----------------------------------------------------------------
   6. SCROLL PROGRESS BAR
----------------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  ScrollTrigger.create({
    start: 0,
    end: () => document.body.scrollHeight - window.innerHeight,
    onUpdate: (self) => { bar.style.width = (self.progress * 100) + '%'; }
  });
}

/* -----------------------------------------------------------------
   7. HERO — split text stagger reveal + parallax blobs
----------------------------------------------------------------- */
function initHero() {
  const lines = document.querySelectorAll('.hero__title .split-line');
  const split = new SplitType(lines, { types: 'words' });

  gsap.set(split.words, { yPercent: 120, opacity: 0 });
  gsap.set('.hero__eyebrow, .hero__sub, .hero__cta, .hero__scroll-cue', { opacity: 0, y: 20 });

  const tl = gsap.timeline({ delay: 0.2 });
  tl.to('.hero__eyebrow', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    .to(split.words, {
      yPercent: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.035
    }, '-=0.3')
    .to('.hero__sub', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .to('.hero__cta', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .to('.hero__scroll-cue', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');

  // gentle blob parallax on scroll
  gsap.utils.toArray('.blob').forEach((blob, i) => {
    gsap.to(blob, {
      y: (i + 1) * 120,
      ease: 'none',
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1 }
    });
  });
}

/* -----------------------------------------------------------------
   8. SCROLL REVEALS (generic .reveal-up elements)
----------------------------------------------------------------- */
function initReveals() {
  gsap.utils.toArray('.reveal-up').forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });
}

/* -----------------------------------------------------------------
   9. COUNTERS (about stats)
----------------------------------------------------------------- */
function initCounters() {
  document.querySelectorAll('.stat-card__num').forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const decimal = el.dataset.decimal;
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            if (decimal) {
              el.textContent = Math.floor(obj.val) + '.' + decimal;
            } else {
              el.textContent = Math.floor(obj.val);
            }
          },
          onComplete: () => {
            el.textContent = decimal ? target + '.' + decimal : target;
          }
        });
      }
    });
  });
}

/* -----------------------------------------------------------------
   10. JOURNEY TIMELINE — line draws in as you scroll
----------------------------------------------------------------- */
function initTimeline() {
  const fill = document.getElementById('timelineFill');
  const timeline = document.querySelector('.timeline');
  if (!fill || !timeline) return;

  gsap.to(fill, {
    height: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: timeline,
      start: 'top 70%',
      end: 'bottom 60%',
      scrub: 0.6
    }
  });
}

/* -----------------------------------------------------------------
   11. PROJECT CARDS — subtle tilt on hover
----------------------------------------------------------------- */
function initCardTilt() {
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, { rotateX: py * -3, rotateY: px * 4, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
    });
  });
}

/* -----------------------------------------------------------------
   12. MOBILE NAV BURGER (simple toggle, no separate CSS panel needed
        beyond showing links inline — kept minimal by design)
----------------------------------------------------------------- */
function initBurger() {
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    const open = links.style.display === 'flex';
    links.style.display = open ? 'none' : 'flex';
    links.style.cssText += open ? '' : `
      position:fixed; top:64px; left:0; right:0; flex-direction:column;
      background:rgba(5,5,5,0.96); padding:24px 32px; gap:20px; border-bottom:1px solid var(--border);
    `;
  });
}

/* -----------------------------------------------------------------
   INIT
----------------------------------------------------------------- */
(async function init() {
  initNav();
  initScrollProgress();
  initReveals();
  initCounters();
  initTimeline();
  initCardTilt();
  initMagnetic();
  initCursor();
  initBurger();

  await runLoader();
  initLenis();
  initHero();
})();