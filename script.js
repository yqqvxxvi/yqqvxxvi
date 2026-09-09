// ===== mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== typewriter tagline =====
const tagline = document.querySelector('.hero-tagline');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (tagline && !prefersReducedMotion) {
  const cursor = tagline.querySelector('.cursor');
  const fullText = tagline.textContent.replace('_', '').trim();
  tagline.textContent = '';
  const textNode = document.createTextNode('');
  tagline.appendChild(textNode);
  tagline.appendChild(cursor || document.createTextNode(''));

  let i = 0;
  const type = () => {
    if (i <= fullText.length) {
      textNode.textContent = fullText.slice(0, i);
      i++;
      setTimeout(type, 28);
    }
  };
  type();
}

// ===== scroll reveal =====
const revealEls = document.querySelectorAll('.reveal, .project-card');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in-view'));
}

// ===== footer year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== click sparkle =====
document.addEventListener('click', (e) => {
  if (prefersReducedMotion) return;
  const sparkle = document.createElement('span');
  sparkle.className = 'sparkle';
  sparkle.style.left = `${e.clientX - 4}px`;
  sparkle.style.top = `${e.clientY - 4}px`;
  document.body.appendChild(sparkle);
  sparkle.addEventListener('animationend', () => sparkle.remove());
});
