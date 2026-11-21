const nav = document.querySelector('.links');
const menu = document.querySelector('.menu');
const mobile = window.matchMedia('(max-width: 820px)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const background = [...document.querySelectorAll('main, footer')];

// Keep restored pages consistent with the retired navigation section.
document.querySelectorAll('.links a').forEach(link => {
  if ((link.getAttribute('href') || '').includes('lab/') || link.textContent.trim() === 'Лаборатория') link.remove();
});

const closeMenu = (returnFocus = false) => {
  nav?.classList.remove('open');
  document.body.classList.remove('menu-open');
  background.forEach(element => { element.inert = false; });
  menu?.setAttribute('aria-expanded', 'false');
  menu?.setAttribute('aria-label', 'Открыть меню');
  if (returnFocus) menu?.focus({ preventScroll: true });
};

const openMenu = () => {
  if (!mobile.matches) return;
  nav?.classList.add('open');
  document.body.classList.add('menu-open');
  background.forEach(element => { element.inert = true; });
  menu?.setAttribute('aria-expanded', 'true');
  menu?.setAttribute('aria-label', 'Закрыть меню');
  requestAnimationFrame(() => {
    if (document.body.classList.contains('menu-open')) nav?.querySelector('a')?.focus({ preventScroll: true });
  });
};

if (menu && nav) {
  nav.id = 'site-navigation';
  nav.setAttribute('aria-label', 'Основная навигация');
  menu.setAttribute('aria-controls', nav.id);
  menu.textContent = '';
  const line = document.createElement('span');
  line.setAttribute('aria-hidden', 'true');
  menu.append(line);
  closeMenu();

  menu.addEventListener('click', event => {
    event.stopPropagation();
    document.body.classList.contains('menu-open') ? closeMenu(true) : openMenu();
  });

  document.addEventListener('click', event => {
    if (!document.body.classList.contains('menu-open')) return;
    if (event.target.closest('.menu')) return;
    closeMenu(!event.target.closest('a'));
  });

  document.addEventListener('keydown', event => {
    if (!document.body.classList.contains('menu-open')) return;
    if (event.key === 'Escape') { closeMenu(true); return; }
    if (event.key !== 'Tab') return;
    const controls = [menu, ...nav.querySelectorAll('a[href]')];
    const index = controls.indexOf(document.activeElement);
    event.preventDefault();
    const next = (index + (event.shiftKey ? -1 : 1) + controls.length) % controls.length;
    controls[next].focus();
  });

  window.addEventListener('resize', () => {
    if (!mobile.matches) closeMenu();
  });
}

// A page restored by Safari's back/forward cache must be visible and unlocked.
window.addEventListener('pageshow', event => {
  closeMenu();
  if (event.persisted) document.body.getAnimations().forEach(animation => animation.cancel());
});

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) element.classList.add('in');
    else { element.classList.add('reveal-pending'); observer.observe(element); }
  });
}

const ambient = document.querySelector('.ambient');
if (ambient && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reducedMotion.matches) {
  window.addEventListener('pointermove', event => {
    ambient.style.left = event.clientX + 'px';
    ambient.style.top = event.clientY + 'px';
  }, { passive: true });
}

// Animate entry only: exit fades can persist in the back/forward cache.
if (!reducedMotion.matches && document.body.animate) {
  document.body.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 500, easing: 'cubic-bezier(.16,1,.3,1)'
  });
}
