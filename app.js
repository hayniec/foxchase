/* ── FOXCHASE — app.js ─────────────────────────────────────────── */

// Sticky header shadow on scroll
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Contact form submission
function handleForm(e) {
  e.preventDefault();
  const success = document.getElementById('form-success');
  success.hidden = false;
  e.target.querySelectorAll('input, select, textarea, button').forEach(el => {
    el.disabled = true;
  });
}

// Fade-in on scroll (simple IntersectionObserver)
const fadeEls = document.querySelectorAll(
  '.amenity-card, .announce-card, .event-item, .contact-card, .pillar'
);

if ('IntersectionObserver' in window) {
  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => observer.observe(el));
}
