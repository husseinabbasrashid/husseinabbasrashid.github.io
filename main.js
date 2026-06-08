/* ============================================================
   script.js — Hussein Abbas Portfolio
   Enhanced Edition v3.0
   ============================================================ */

'use strict';

/* ─── Utility: Debounce & Throttle ─────────────────────────── */
const debounce = (fn, delay) => {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
};
const throttle = (fn, limit) => {
    let last = 0;
    return (...args) => {
        const now = Date.now();
        if (now - last >= limit) { last = now; fn(...args); }
    };
};

/* ─── Utility: Element Selector ─────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ─── Utility: Clamp ─────────────────────────────────────────── */
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

/* ============================================================
   1. INITIAL SETUP & LOADER
   ============================================================ */
const init = () => {
    const loader = $('#loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }

    if (typeof AOS !== 'undefined') AOS.init({ duration: 800, once: true, offset: 60 });

    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const marqueeInit = $('.marquee-content');
    if (marqueeInit) marqueeInit.style.animationDirection = document.documentElement.lang === 'ar' ? 'normal' : 'reverse';

    createHeroParticles();
    initTypedText();
};

if (document.readyState === 'complete') init();
else window.addEventListener('load', init);


/* ─── 1.1 Hero Particles ─────────────────────────────────────── */
function createHeroParticles() {
    const container = $('#heroParticles');
    if (!container) return;
    const colors = ['var(--accent-primary)', 'var(--accent-secondary)', 'var(--accent-tertiary)', 'var(--accent-copper)'];
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        Object.assign(p.style, {
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 15 + 's',
            animationDuration: (15 + Math.random() * 10) + 's',
            opacity: Math.random() * 0.5 + 0.1,
            width: (Math.random() * 4 + 2) + 'px',
            height: p.style.width,
            background: colors[Math.floor(Math.random() * colors.length)]
        });
        container.appendChild(p);
    }
}


/* ─── 1.2 Typed Text Effect (no dependency) ─────────────────── */
function initTypedText() {
    const el = $('.typed-text, [data-typed]');
    if (!el) return;

    const raw = el.getAttribute('data-typed') || el.getAttribute('data-ar') || '';
    const lang = document.documentElement.lang || 'ar';
    const arPhrases = el.getAttribute('data-typed-ar')?.split('|') || [el.getAttribute('data-ar') || raw];
    const enPhrases = el.getAttribute('data-typed-en')?.split('|') || [el.getAttribute('data-en') || raw];

    let phrases = lang === 'ar' ? arPhrases : enPhrases;
    let pIdx = 0, cIdx = 0, deleting = false;
    const speed = { type: 80, delete: 40, pause: 2000 };

    const tick = () => {
        const current = phrases[pIdx];
        if (deleting) {
            el.textContent = current.substring(0, --cIdx);
        } else {
            el.textContent = current.substring(0, ++cIdx);
        }

        let delay = deleting ? speed.delete : speed.type;
        if (!deleting && cIdx === current.length) {
            delay = speed.pause;
            deleting = true;
        } else if (deleting && cIdx === 0) {
            deleting = false;
            pIdx = (pIdx + 1) % phrases.length;
        }
        setTimeout(tick, delay);
    };

    if (phrases.length && phrases[0]) tick();

    // Re-init on language switch
    document.addEventListener('langChanged', (e) => {
        phrases = e.detail === 'ar' ? arPhrases : enPhrases;
        pIdx = 0; cIdx = 0; deleting = false;
    });
}


/* ─── 1.3 Mobile Menu ────────────────────────────────────────── */
const mobileMenuBtn = $('#mobileMenuBtn');
const navLinks = $('#navLinks');

if (mobileMenuBtn && navLinks) {
    const icon = mobileMenuBtn.querySelector('i');
    const toggle = (force) => {
        const open = force !== undefined ? force : !navLinks.classList.contains('active');
        navLinks.classList.toggle('active', open);
        icon?.classList.toggle('fa-bars', !open);
        icon?.classList.toggle('fa-times', open);
        mobileMenuBtn.setAttribute('aria-expanded', open);
    };

    mobileMenuBtn.addEventListener('click', () => toggle());
    $$('.nav-link', navLinks).forEach(l => l.addEventListener('click', () => toggle(false)));
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) toggle(false);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) toggle(false);
    });
}


/* ─── 1.4 Spotlight Cards ────────────────────────────────────── */
$$('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', (e.clientX - r.left) + 'px');
        card.style.setProperty('--mouse-y', (e.clientY - r.top) + 'px');
    });
});


/* ─── 1.5 Lazy Images ────────────────────────────────────────── */
if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting, target }) => {
            if (!isIntersecting) return;
            target.src = target.dataset.src;
            target.classList.add('loaded');
            target.removeAttribute('data-src');
            io.unobserve(target);
        });
    });
    $$('img[data-src]').forEach(img => io.observe(img));
} else {
    $$('img[data-src]').forEach(img => { img.src = img.dataset.src; img.classList.add('loaded'); });
}


/* ─── 1.6 Smooth Scroll ──────────────────────────────────────── */
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', href);
    }
});


/* ============================================================
   2. SCROLL LOGIC
   ============================================================ */
const scrollProgress = $('#scrollProgress');
const backToTop = $('#backToTop');

const handleScroll = throttle(() => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    if (scrollProgress) scrollProgress.style.width = (scrollTop / scrollHeight * 100) + '%';
    if (backToTop) backToTop.classList.toggle('visible', scrollTop > 300);

    // Active nav link based on section
    $$('section[id]').forEach(section => {
        const rect = section.getBoundingClientRect();
        const link = $(`.nav-link[href="#${section.id}"]`);
        if (link) link.classList.toggle('active', rect.top <= 120 && rect.bottom >= 120);
    });
}, 50);

window.addEventListener('scroll', handleScroll, { passive: true });
if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


/* ─── 2.1 Scroll-Triggered Reveal (native, no AOS fallback) ─── */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        const delay = target.dataset.delay || 0;
        setTimeout(() => {
            target.classList.add('revealed');
            target.style.opacity = '1';
            target.style.transform = 'translateY(0) scale(1)';
        }, delay);
        revealObserver.unobserve(target);
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

$$('[data-reveal]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px) scale(0.98)';
    el.style.transition = 'opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)';
    revealObserver.observe(el);
});


/* ============================================================
   3. COMMAND PALETTE  (Ctrl+K / ⌘K)
   ============================================================ */
(function initCommandPalette() {
    const commands = [
        { label: { ar: '🏠 الرئيسية', en: '🏠 Home' }, action: () => scrollTo('#hero') },
        { label: { ar: '👤 من أنا', en: '👤 About' }, action: () => scrollTo('#about') },
        { label: { ar: '💼 مشاريع', en: '💼 Projects' }, action: () => scrollTo('#projects') },
        { label: { ar: '🛠 مهارات', en: '🛠 Skills' }, action: () => scrollTo('#advanced-skills') },
        { label: { ar: '📬 تواصل', en: '📬 Contact' }, action: () => scrollTo('#contact') },
        { label: { ar: '💬 غرفة الدردشة', en: '💬 Chat Room' }, action: () => { window.location.href = 'chat.html'; } },
        { label: { ar: '🤖 الذكاء الاصطناعي', en: '🤖 AI Chat' }, action: () => { window.location.href = 'AI.html'; } },
        { label: { ar: '📅 احجز موعد', en: '📅 Booking' }, action: () => { window.location.href = 'booking.html'; } },
        { label: { ar: '🌙 تبديل المظهر', en: '🌙 Toggle Theme' }, action: () => $('#themeToggle')?.click() },
        { label: { ar: '🌐 تبديل اللغة', en: '🌐 Toggle Language' }, action: () => $('#langToggle')?.click() },
        { label: { ar: '⬆️ أعلى الصفحة', en: '⬆️ Back to Top' }, action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    ];

    function scrollTo(sel) {
        const el = document.querySelector(sel);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Build DOM
    const overlay = document.createElement('div');
    overlay.id = 'cmdPalette';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Command Palette');
    overlay.innerHTML = `
        <div class="cmd-box">
            <div class="cmd-header">
                <i class="fas fa-terminal cmd-icon"></i>
                <input id="cmdInput" type="text" placeholder="اكتب أمراً... / Type a command..." autocomplete="off" spellcheck="false"/>
                <kbd class="cmd-esc">ESC</kbd>
            </div>
            <ul id="cmdList" role="listbox"></ul>
            <div class="cmd-footer">
                <span><kbd>↑↓</kbd> للتنقل</span>
                <span><kbd>Enter</kbd> تنفيذ</span>
                <span><kbd>Esc</kbd> إغلاق</span>
            </div>
        </div>`;

    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
        #cmdPalette {
            position: fixed; inset: 0; z-index: 99999;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(8px);
            display: flex; align-items: flex-start; justify-content: center;
            padding-top: min(12vh, 100px);
            opacity: 0; pointer-events: none;
            transition: opacity 0.2s ease;
        }
        #cmdPalette.open { opacity: 1; pointer-events: all; }
        .cmd-box {
            width: min(600px, 90vw);
            background: var(--bg-card, #1a1a2e);
            border: 1px solid var(--accent-primary, #7c3aed);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.2);
            transform: translateY(-20px) scale(0.97);
            transition: transform 0.25s cubic-bezier(.22,1,.36,1);
        }
        #cmdPalette.open .cmd-box { transform: translateY(0) scale(1); }
        .cmd-header {
            display: flex; align-items: center; gap: 12px;
            padding: 14px 16px;
            border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .cmd-icon { color: var(--accent-primary, #7c3aed); font-size: 1rem; }
        #cmdInput {
            flex: 1; background: transparent; border: none; outline: none;
            color: var(--text-primary, #fff); font-size: 1rem; font-family: inherit;
        }
        #cmdInput::placeholder { color: var(--text-muted, rgba(255,255,255,0.4)); }
        .cmd-esc {
            font-size: 0.7rem; padding: 2px 7px;
            background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
            border-radius: 5px; color: var(--text-muted, rgba(255,255,255,0.4));
        }
        #cmdList {
            list-style: none; margin: 0; padding: 6px;
            max-height: 320px; overflow-y: auto;
        }
        #cmdList::-webkit-scrollbar { width: 4px; }
        #cmdList::-webkit-scrollbar-thumb { background: var(--accent-primary, #7c3aed); border-radius: 4px; }
        #cmdList li {
            padding: 10px 14px; border-radius: 10px; cursor: pointer;
            font-size: 0.92rem; color: var(--text-secondary, rgba(255,255,255,0.7));
            transition: background 0.15s, color 0.15s;
            display: flex; align-items: center; gap: 8px;
        }
        #cmdList li:hover, #cmdList li.selected {
            background: var(--accent-primary, #7c3aed);
            color: #fff;
        }
        .cmd-footer {
            display: flex; gap: 16px; align-items: center;
            padding: 8px 16px; border-top: 1px solid rgba(255,255,255,0.06);
            font-size: 0.72rem; color: var(--text-muted, rgba(255,255,255,0.35));
        }
        .cmd-footer kbd {
            background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
            border-radius: 4px; padding: 1px 5px; font-size: 0.68rem;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(overlay);

    const input = $('#cmdInput');
    const list = $('#cmdList');
    let selected = -1;
    let filtered = [...commands];
    let isOpen = false;
    const lang = () => document.documentElement.lang === 'ar' ? 'ar' : 'en';

    function open() {
        isOpen = true;
        overlay.classList.add('open');
        render('');
        setTimeout(() => input.focus(), 50);
    }

    function close() {
        isOpen = false;
        overlay.classList.remove('open');
        input.value = '';
        selected = -1;
    }

    function render(query) {
        const q = query.toLowerCase();
        filtered = commands.filter(c => c.label[lang()].toLowerCase().includes(q));
        selected = filtered.length ? 0 : -1;
        list.innerHTML = filtered.map((c, i) => `
            <li role="option" aria-selected="${i === 0}" data-idx="${i}">${c.label[lang()]}</li>`).join('');
        updateSelection();
    }

    function updateSelection() {
        $$('li', list).forEach((li, i) => {
            li.classList.toggle('selected', i === selected);
            li.setAttribute('aria-selected', i === selected);
        });
    }

    function execute() {
        if (selected >= 0 && filtered[selected]) {
            close();
            setTimeout(() => filtered[selected].action(), 100);
        }
    }

    input.addEventListener('input', () => render(input.value));
    list.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if (li) { selected = +li.dataset.idx; execute(); }
    });
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); isOpen ? close() : open(); return; }
        if (!isOpen) return;
        if (e.key === 'Escape') { close(); return; }
        if (e.key === 'ArrowDown') { e.preventDefault(); selected = clamp(selected + 1, 0, filtered.length - 1); updateSelection(); }
        if (e.key === 'ArrowUp') { e.preventDefault(); selected = clamp(selected - 1, 0, filtered.length - 1); updateSelection(); }
        if (e.key === 'Enter') { e.preventDefault(); execute(); }
    });
})();


/* ============================================================
   4. TOAST NOTIFICATION SYSTEM
   ============================================================ */
window.Toast = (() => {
    let container = null;

    function getContainer() {
        if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            Object.assign(container.style, {
                position: 'fixed', bottom: '24px', insetInlineEnd: '24px',
                zIndex: '99998', display: 'flex', flexDirection: 'column-reverse', gap: '10px',
                maxWidth: '340px', pointerEvents: 'none'
            });
            document.body.appendChild(container);
        }
        return container;
    }

    const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle', warning: 'fa-exclamation-triangle' };
    const colors = { success: '#22c55e', error: '#ef4444', info: '#3b82f6', warning: '#f59e0b' };

    return function show(message, type = 'info', duration = 4000) {
        const c = getContainer();
        const toast = document.createElement('div');
        toast.innerHTML = `<i class="fas ${icons[type]}" style="color:${colors[type]};flex-shrink:0"></i><span>${message}</span>`;
        Object.assign(toast.style, {
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '12px 16px', borderRadius: '12px',
            background: 'var(--bg-card, #1a1a2e)',
            border: `1px solid ${colors[type]}33`,
            boxShadow: `0 8px 32px rgba(0,0,0,0.35), inset 0 0 0 1px ${colors[type]}22`,
            color: 'var(--text-primary, #fff)', fontSize: '0.88rem',
            pointerEvents: 'all', cursor: 'pointer',
            opacity: '0', transform: 'translateX(40px)',
            transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(.22,1,.36,1)',
            backdropFilter: 'blur(12px)',
            fontFamily: 'inherit'
        });

        c.appendChild(toast);
        requestAnimationFrame(() => requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }));

        const dismiss = () => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(40px)';
            setTimeout(() => toast.remove(), 350);
        };

        toast.addEventListener('click', dismiss);
        setTimeout(dismiss, duration);
    };
})();


/* ============================================================
   5. THEME & LANGUAGE
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

    /* ── Theme ── */
    const themeToggle = $('#themeToggle');
    if (themeToggle) {
        const applyTheme = (theme) => {
            const icon = themeToggle.querySelector('i');
            const isLight = theme === 'light';
            document.body.classList.toggle('light', isLight);
            icon?.classList.toggle('fa-moon', isLight);
            icon?.classList.toggle('fa-sun', !isLight);
            themeToggle.setAttribute('aria-pressed', isLight);
            document.documentElement.setAttribute('data-theme', theme);
        };

        const saved = localStorage.getItem('theme');
        applyTheme(saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));

        themeToggle.addEventListener('click', () => {
            const next = document.body.classList.contains('light') ? 'dark' : 'light';
            applyTheme(next);
            localStorage.setItem('theme', next);
            Toast(next === 'dark' ? '🌙 الوضع الداكن' : '☀️ الوضع الفاتح', 'info', 2000);
        });
    }

    /* ── Language ── */
    const langToggle = $('#langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const html = document.documentElement;
            const newLang = html.lang === 'ar' ? 'en' : 'ar';
            html.lang = newLang;
            html.dir = newLang === 'ar' ? 'rtl' : 'ltr';

            $$('[data-ar]').forEach(el => {
                el.textContent = el.getAttribute(`data-${newLang}`);
            });

            const marquee = $('.marquee-content');
            if (marquee) marquee.style.animationDirection = newLang === 'ar' ? 'normal' : 'reverse';

            document.dispatchEvent(new CustomEvent('langChanged', { detail: newLang }));
            Toast(newLang === 'ar' ? '🌐 تم تغيير اللغة إلى العربية' : '🌐 Language changed to English', 'success', 2500);
        });
    }

    /* ── Chat ── */
    const openChatBtn = $('#openChatBtn');
    openChatBtn?.addEventListener('click', () => { window.location.href = 'chat.html'; });

    /* ── Brand Dot Secret (Konami-style) ── */
    const brandDot = $('.brand .dot');
    if (brandDot) {
        let clicks = 0, timer = null;
        brandDot.style.cursor = 'pointer';
        brandDot.addEventListener('click', (e) => {
            e.stopPropagation();
            brandDot.style.transform = 'scale(1.3) rotate(180deg)';
            brandDot.style.transition = 'transform 0.3s ease';
            clearTimeout(timer);
            timer = setTimeout(() => {
                clicks = 0;
                brandDot.style.transform = '';
            }, 2500);
            if (++clicks >= 6) {
                window.location.href = 'chat.html';
            } else if (clicks === 3) {
                Toast('3 نقرات أخرى! 🤫', 'info', 1500);
            }
        });
    }
});


/* ============================================================
   6. KEYBOARD SHORTCUTS
   ============================================================ */
(function initKeyboardShortcuts() {
    const shortcuts = {
        'alt+h': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
        'alt+p': () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }),
        'alt+c': () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }),
        'alt+t': () => $('#themeToggle')?.click(),
        'alt+l': () => $('#langToggle')?.click(),
    };

    document.addEventListener('keydown', (e) => {
        const key = [e.altKey && 'alt', e.ctrlKey && 'ctrl', e.metaKey && 'meta', e.key?.toLowerCase()]
            .filter(Boolean).join('+');
        if (shortcuts[key]) { e.preventDefault(); shortcuts[key](); }
    });
})();


/* ============================================================
   7. KONAMI CODE EASTER EGG
   ============================================================ */
(function initKonami() {
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let pos = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === code[pos]) {
            pos++;
            if (pos === code.length) {
                pos = 0;
                activateEasterEgg();
            }
        } else {
            pos = 0;
        }
    });

    function activateEasterEgg() {
        Toast('🎮 كود كوناكو! أنت مميز 🌟', 'success', 4000);
        document.body.style.animation = 'rainbowShift 1s ease infinite';

        const style = document.createElement('style');
        style.id = 'konamiStyle';
        style.textContent = `
            @keyframes rainbowShift {
                0%   { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            document.body.style.animation = '';
            $('#konamiStyle')?.remove();
        }, 3000);
    }
})();


/* ============================================================
   8. MAGNETIC BUTTONS
   ============================================================ */
function initMagneticButtons() {
    $$('.magnetic, .btn-primary, .btn-secondary, .social-card').forEach(btn => {
        btn.style.transition = 'transform 0.3s cubic-bezier(.22,1,.36,1)';

        btn.addEventListener('mousemove', (e) => {
            const r = btn.getBoundingClientRect();
            const x = (e.clientX - r.left - r.width / 2) * 0.25;
            const y = (e.clientY - r.top - r.height / 2) * 0.25;
            btn.style.transform = `translate(${x}px, ${y}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0,0)';
        });
    });
}

document.addEventListener('DOMContentLoaded', initMagneticButtons);


/* ============================================================
   9. STATS COUNTER
   ============================================================ */
const statsSection = $('.stats-section');
const statNumbers = $$('.stat-number');
let statsAnimated = false;

if (statsSection && statNumbers.length) {
    const observer = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting || statsAnimated) return;
        statsAnimated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target') || 0);
            const duration = 2000;
            const start = performance.now();

            const easeOut = (t) => 1 - Math.pow(1 - t, 3);

            const update = (now) => {
                const elapsed = now - start;
                const progress = clamp(elapsed / duration, 0, 1);
                stat.textContent = Math.floor(easeOut(progress) * target).toLocaleString();
                if (progress < 1) requestAnimationFrame(update);
                else stat.textContent = target.toLocaleString();
            };

            requestAnimationFrame(update);
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}


/* ============================================================
   10. CURSOR TRAIL
   ============================================================ */
(function initCursorTrail() {
    const count = 12;
    const trail = [];
    let mx = 0, my = 0;

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'cursor-particle';
        document.body.appendChild(p);
        trail.push({ el: p, x: 0, y: 0, size: Math.random() * 5 + 2 });
    }

    document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });

    const render = () => {
        trail.forEach((p, i) => {
            const lag = (i * 1.5) + 5;
            p.x += (mx - p.x) / lag;
            p.y += (my - p.y) / lag;
            Object.assign(p.el.style, {
                left: p.x + 'px',
                top: p.y + 'px',
                width: p.size + 'px',
                height: p.size + 'px',
                opacity: (1 - i / count) * 0.7
            });
        });
        requestAnimationFrame(render);
    };
    render();
})();


/* ============================================================
   11. CUSTOM CURSOR
   ============================================================ */
(function initCustomCursor() {
    const dot = $('[data-cursor-dot]');
    const outline = $('[data-cursor-outline]');
    if (!dot || !outline) return;

    let ox = 0, oy = 0;

    window.addEventListener('mousemove', (e) => {
        const { clientX: x, clientY: y } = e;
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';
        outline.animate([{ left: ox + 'px', top: oy + 'px' }, { left: x + 'px', top: y + 'px' }],
            { duration: 500, fill: 'forwards', easing: 'cubic-bezier(.22,1,.36,1)' });
        ox = x; oy = y;
    }, { passive: true });

    const addHover = () => document.body.classList.add('hovering');
    const removeHover = () => document.body.classList.remove('hovering');

    $$('.hover-target, a, button').forEach(el => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
    });

    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; outline.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; outline.style.opacity = '1'; });
})();


/* ============================================================
   12. PARALLAX (Smooth, Reduced Motion Aware)
   ============================================================ */
(function initParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = $$('.hero-avatar, .hero h1, .hero p');
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.scrollY;
        els.forEach((el, i) => {
            el.style.transform = `translateY(${scrolled * (i + 1) * 0.07}px)`;
        });
    }, 16), { passive: true });
})();


/* ============================================================
   13. GALLERY & MODAL
   ============================================================ */
const galleryData = [
    { title: { ar: 'لوحة إدارة البيانات', en: 'Data Dashboard' }, description: { ar: 'نظام متكامل لتصور البيانات وتحليلها.', en: 'Integrated data visualization system.' }, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', tags: ['UI', 'Dashboard', 'Data'] },
    { title: { ar: 'تطبيق التوصيل الذكي', en: 'Smart Delivery App' }, description: { ar: 'منصة توصيل حديثة وقابلة للتوسع.', en: 'Modern and scalable delivery platform.' }, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80', tags: ['Mobile', 'App'] },
    { title: { ar: 'محتوى تعليمي', en: 'Educational Content' }, description: { ar: 'سلسلة فيديوهات تعليمية احترافية.', en: 'Professional educational video series.' }, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', tags: ['Education', 'Video'] },
    { title: { ar: 'تحليل ذكي', en: 'Smart Analytics' }, description: { ar: 'منصة تحليل بيانات متقدمة بالذكاء الاصطناعي.', en: 'Advanced AI analytics platform.' }, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', tags: ['AI', 'Analytics'] },
    { title: { ar: 'تطبيق التسويق', en: 'Marketing App' }, description: { ar: 'أداة تسويقية شاملة وفعالة.', en: 'Comprehensive marketing tool.' }, image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80', tags: ['Marketing', 'Tool'] },
    { title: { ar: 'الشبكة الاجتماعية', en: 'Social Network' }, description: { ar: 'منصة تواصل اجتماعية مبتكرة.', en: 'Innovative social network.' }, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?auto=format&fit=crop&w=800&q=80', tags: ['Social', 'Network'] }
];

let currentIndex = 0;

window.openModal = (index) => {
    const modal = $('#galleryModal');
    if (!modal || !galleryData[index]) return;
    currentIndex = index;
    renderModal(index);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modal.focus();
};

function renderModal(index) {
    const data = galleryData[index];
    const lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
    const imgEl = $('#modalImage');
    const titleEl = $('#modalTitle');
    const descEl = $('#modalDescription');
    const tagsEl = $('#modalTags');
    const counterEl = $('#modalCounter');

    if (imgEl) { imgEl.style.opacity = '0'; imgEl.src = data.image; imgEl.onload = () => { imgEl.style.opacity = '1'; }; }
    if (titleEl) titleEl.textContent = data.title[lang];
    if (descEl) descEl.textContent = data.description[lang];
    if (tagsEl && data.tags) tagsEl.innerHTML = data.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');
    if (counterEl) counterEl.textContent = `${index + 1} / ${galleryData.length}`;
}

window.closeModal = () => {
    const modal = $('#galleryModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
};

window.modalPrev = () => {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    renderModal(currentIndex);
};

window.modalNext = () => {
    currentIndex = (currentIndex + 1) % galleryData.length;
    renderModal(currentIndex);
};

const galleryModal = $('#galleryModal');
if (galleryModal) {
    galleryModal.addEventListener('click', (e) => { if (e.target === galleryModal) closeModal(); });
    document.addEventListener('keydown', (e) => {
        if (!galleryModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') modalPrev();
        if (e.key === 'ArrowRight') modalNext();
    });
}


/* ============================================================
   14. TILT & SKILLS
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init($$('.bento-card, .cv-section, .social-card, .skill-box'), {
            max: 5, speed: 400, glare: true, 'max-glare': 0.15
        });
    }

    const skillsSection = $('#advanced-skills');
    const bars = $$('.skill-progress-bar');
    if (skillsSection && bars.length) {
        let animated = false;
        new IntersectionObserver((entries) => {
            if (!entries[0].isIntersecting || animated) return;
            animated = true;
            bars.forEach((bar, i) => {
                const target = bar.style.width || bar.getAttribute('data-width') || '0%';
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.transition = 'width 1s cubic-bezier(.22,1,.36,1)';
                    bar.style.width = target;
                }, 100 + i * 60);
            });
        }, { threshold: 0.4 }).observe(skillsSection);
    }
});


/* ============================================================
   15. CONTACT FORM (with validation + rate-limit protection)
   ============================================================ */
const contactForm = $('#contactForm');
if (contactForm) {
    let submitting = false;

    const validate = (fields) => {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!fields.name) return 'الاسم مطلوب / Name required';
        if (!emailRe.test(fields.email)) return 'البريد الإلكتروني غير صحيح / Invalid email';
        if (!fields.subject) return 'الموضوع مطلوب / Subject required';
        if (fields.message.length < 10) return 'الرسالة قصيرة جداً / Message too short';
        return null;
    };

    // Live validation
    $$('#name, #email, #subject, #message', contactForm).forEach(input => {
        input.addEventListener('blur', () => {
            const isValid = input.value.trim().length > 0;
            input.classList.toggle('input-error', !isValid);
            input.classList.toggle('input-valid', isValid);
        });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (submitting) return;

        const fields = {
            name: $('#name', contactForm)?.value.trim() || '',
            email: $('#email', contactForm)?.value.trim() || '',
            subject: $('#subject', contactForm)?.value.trim() || '',
            message: $('#message', contactForm)?.value.trim() || ''
        };

        const error = validate(fields);
        if (error) { Toast(error, 'error'); return; }

        const submitBtn = $('#submitBtn', contactForm);
        const oldHTML = submitBtn?.innerHTML;
        submitting = true;
        if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; }

        setTimeout(() => {
            const body = encodeURIComponent(`الاسم: ${fields.name}\nالبريد: ${fields.email}\n\n${fields.message}`);
            window.location.href = `mailto:huseinabbas49039@gmail.com?subject=${encodeURIComponent(fields.subject)}&body=${body}`;
            contactForm.reset();
            $$('.input-valid, .input-error', contactForm).forEach(el => el.classList.remove('input-valid', 'input-error'));
            if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = oldHTML; }
            submitting = false;
            Toast('✅ تم فتح عميل البريد الإلكتروني!', 'success');
        }, 600);
    });
}


/* ============================================================
   16. PAGE TRANSITION (Fade on navigation)
   ============================================================ */
(function initPageTransition() {
    const overlay = document.createElement('div');
    overlay.id = 'pageTransitionOverlay';
    Object.assign(overlay.style, {
        position: 'fixed', inset: '0', background: 'var(--bg-primary, #0d0d1a)',
        zIndex: '999999', opacity: '0', pointerEvents: 'none',
        transition: 'opacity 0.35s ease'
    });
    document.body.appendChild(overlay);

    // Fade in on load
    requestAnimationFrame(() => {
        overlay.style.opacity = '0';
    });

    // Intercept external links (non-hash, same-origin)
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href]');
        if (!link) return;
        const href = link.getAttribute('href');
        if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http') || link.target === '_blank') return;

        e.preventDefault();
        overlay.style.pointerEvents = 'all';
        overlay.style.opacity = '1';
        setTimeout(() => { window.location.href = href; }, 360);
    });
})();


/* ============================================================
   17. PERFORMANCE: Pause animations when tab is hidden
   ============================================================ */
document.addEventListener('visibilitychange', () => {
    const state = document.hidden ? 'paused' : 'running';
    $$('.particle, .marquee-content, .cursor-particle').forEach(el => {
        el.style.animationPlayState = state;
    });
});


/* ============================================================
   18. ACCESSIBILITY: Focus trap for modals
   ============================================================ */
function trapFocus(modal) {
    const focusables = $$('a,button,input,textarea,[tabindex]:not([tabindex="-1"])', modal);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    modal.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
        } else {
            if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
        }
    });
}

const modalEl = $('#galleryModal');
if (modalEl) trapFocus(modalEl);
const cmdEl = $('#cmdPalette');
if (cmdEl) trapFocus(cmdEl);