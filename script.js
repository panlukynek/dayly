/* ====================================================
   DAYLY — Landing page interactions
==================================================== */

// ============ NAV scroll state ============
const nav = document.getElementById('nav');
const onScroll = () => {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ============ Reveal on scroll (IntersectionObserver) ============
const revealEls = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => io.observe(el));

// ============ Hero starfield (canvas) ============
const canvas = document.getElementById('stars');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];
    let w, h, dpr;

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.parentElement.getBoundingClientRect();
        w = rect.width;
        h = rect.height;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const count = Math.min(120, Math.floor(w * h / 12000));
        stars = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.4 + .2,
            a: Math.random() * .8 + .2,
            ds: (Math.random() - .5) * .015,
            vy: Math.random() * .15 + .03,
            hue: 250 + Math.random() * 30,
        }));
    }

    function tick() {
        ctx.clearRect(0, 0, w, h);
        for (const s of stars) {
            s.a += s.ds;
            if (s.a > 1) { s.a = 1; s.ds *= -1; }
            if (s.a < .15) { s.a = .15; s.ds *= -1; }
            s.y += s.vy;
            if (s.y > h) { s.y = -2; s.x = Math.random() * w; }

            ctx.beginPath();
            ctx.fillStyle = `hsla(${s.hue}, 80%, 80%, ${s.a})`;
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
        }
        requestAnimationFrame(tick);
    }

    resize();
    tick();
    window.addEventListener('resize', resize);
}

// ============ Subtle parallax for hero orbs ============
const orbs = document.querySelectorAll('.hero .orb');
let mx = 0, my = 0, tx = 0, ty = 0;
window.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth - .5) * 2;
    my = (e.clientY / window.innerHeight - .5) * 2;
}, { passive: true });

function parallax() {
    tx += (mx - tx) * .05;
    ty += (my - ty) * .05;
    orbs.forEach((orb, i) => {
        const depth = (i + 1) * 8;
        orb.style.transform = `translate(${tx * depth}px, ${ty * depth}px)`;
    });
    requestAnimationFrame(parallax);
}
parallax();

// ============ Smooth-scroll for in-page anchors ============
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const y = target.getBoundingClientRect().top + window.scrollY - 70;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    });
});

// ============ Waitlist form (front-end only stub) ============
window.handleWaitlist = function(e) {
    e.preventDefault();
    const form = e.target;
    const input = form.querySelector('input');
    const note = document.getElementById('cta-note');

    if (!input.value || !input.checkValidity()) {
        note.textContent = '⚠ Zadej platný email.';
        note.style.color = '#fbbf24';
        return false;
    }

    note.textContent = '✓ Skvěle, jsi na waitlistu! Pošleme ti pozvánku.';
    note.style.color = '#4ade80';
    input.value = '';

    setTimeout(() => { note.textContent = ''; }, 5000);
    return false;
};

// ============ Phone tilt on mouse-move ============
const phone = document.querySelector('.phone');
const phoneWrap = document.querySelector('.phone-wrap');
if (phone && phoneWrap) {
    phoneWrap.addEventListener('mousemove', (e) => {
        const rect = phoneWrap.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - .5;
        const py = (e.clientY - rect.top) / rect.height - .5;
        phone.style.transform = `rotateX(${8 - py * 12}deg) rotateY(${-4 + px * 12}deg)`;
        phone.style.animation = 'none';
    });
    phoneWrap.addEventListener('mouseleave', () => {
        phone.style.transform = '';
        phone.style.animation = '';
    });
}

// ============ Active section highlight in nav ============
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(a => {
                if (a.getAttribute('href') === `#${id}`) {
                    a.style.color = 'var(--text)';
                } else {
                    a.style.color = '';
                }
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));
