const nav = document.querySelector('.links');
const menu = document.querySelector('.menu');

const closeMenu = () => {
  nav?.classList.remove('open');
  document.body.classList.remove('menu-open');
  menu?.setAttribute('aria-expanded', 'false');
  menu?.setAttribute('aria-label', 'Открыть меню');
};

const openMenu = () => {
  nav?.classList.add('open');
  document.body.classList.add('menu-open');
  menu?.setAttribute('aria-expanded', 'true');
  menu?.setAttribute('aria-label', 'Закрыть меню');
};

if (menu && nav) {
  menu.textContent = '';
  const line = document.createElement('span');
  line.setAttribute('aria-hidden', 'true');
  menu.append(line);
  menu.setAttribute('aria-expanded', 'false');

  menu.addEventListener('click', event => {
    event.stopPropagation();
    document.body.classList.contains('menu-open') ? closeMenu() : openMenu();
  });

  document.addEventListener('click', event => {
    if (!document.body.classList.contains('menu-open')) return;
    if (event.target.closest('.menu')) return;
    closeMenu();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) closeMenu();
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const ambient = document.querySelector('.ambient');
if (ambient) {
  window.addEventListener('pointermove', event => {
    ambient.style.left = `${event.clientX}px`;
    ambient.style.top = `${event.clientY}px`;
  });
}

document.querySelectorAll('a[href]').forEach(link => {
  const url = new URL(link.href);
  if (url.origin === location.origin && !link.hash) {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey) return;
      document.body.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 260, fill: 'forwards' }
      );
    });
  }
});

document.body.animate(
  [{ opacity: 0 }, { opacity: 1 }],
  { duration: 700, fill: 'forwards', easing: 'cubic-bezier(.16,1,.3,1)' }
);
