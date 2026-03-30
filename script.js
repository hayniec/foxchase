document.addEventListener('DOMContentLoaded', () => {

    // ── MOBILE NAV ─────────────────────────────────────────────
    const hamburger = document.querySelector('.mobile-menu-toggle');
    const navMenu   = document.querySelector('.nav-links');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu on nav-link click using event delegation
        navMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ── SCROLL REVEAL ───────────────────────────────────────────
    const sections = document.querySelectorAll('.section');
    if (sections.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        sections.forEach((section) => {
            section.classList.add('fade-in-section');
            observer.observe(section);
        });
    }

    // ── STICKY HEADER SHADOW ────────────────────────────────────
    const header = document.querySelector('.site-header');
    if (header) {
        const onScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 10);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // ── CONTACT FORM ────────────────────────────────────────────
    const form    = document.getElementById('contact-form');
    const success = document.getElementById('form-success');
    const error   = document.getElementById('form-error');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name    = form.querySelector('#name');
            const email   = form.querySelector('#email');
            const message = form.querySelector('#message');

            // Basic validation
            if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
                if (error)   error.hidden   = false;
                if (success) success.hidden = true;
                return;
            }

            // Hide any previous messages
            if (error) error.hidden = true;

            // Show success and reset (no backend — static site)
            if (success) success.hidden = false;
            form.reset();
        });
    }

});
