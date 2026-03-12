// 1. Initial Setup and Load
const init = () => {
    // Loader
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }

    // AOS Init
    AOS.init({ duration: 800, once: true });

    // Set current year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Initial Marquee Direction
    const marqueeInit = document.querySelector('.marquee-content');
    if (marqueeInit) marqueeInit.style.animationDirection = document.documentElement.lang === 'ar' ? 'normal' : 'reverse';

    // Generate hero particles
    createHeroParticles();
};
if (document.readyState === 'complete') {
    init();
} else {
    window.addEventListener('load', init);
}


// 1.1 Hero Particles Generator
function createHeroParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;

        const colors = ['var(--accent-primary)', 'var(--accent-secondary)', 'var(--accent-tertiary)', 'var(--accent-copper)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(particle);
    }
}

// 1.2 Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// 1.3 Spotlight Effect for Cards
document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});

// 1.4 Lazy Loading Images
const lazyImages = document.querySelectorAll('img[data-src]');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
} else {
    lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.classList.add('loaded');
    });
}

// 1.5 Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// 2. Scroll Logic
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    // Scroll Progress
    if (scrollProgress) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }

    // Back to Top Visibility
    if (backToTop) {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 3. Interactions (Theme, Language, Chat)
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        const applyTheme = (theme) => {
            const icon = themeToggle.querySelector('i');
            if (theme === 'light') {
                document.body.classList.add('light');
                if (icon) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
                themeToggle.setAttribute('aria-pressed', 'true');
            } else {
                document.body.classList.remove('light');
                if (icon) {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
                themeToggle.setAttribute('aria-pressed', 'false');
            }
        };

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            applyTheme('light');
        } else {
            applyTheme('dark');
        }

        themeToggle.addEventListener('click', () => {
            const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Language Switcher
    const langToggle = document.getElementById("langToggle");
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const html = document.documentElement;
            const currentLang = html.lang;
            const newLang = currentLang === 'ar' ? 'en' : 'ar';

            html.lang = newLang;
            html.dir = newLang === 'ar' ? 'rtl' : 'ltr';

            document.querySelectorAll('[data-ar]').forEach(el => {
                el.textContent = el.getAttribute(`data-${newLang}`);
            });

            const marquee = document.querySelector('.marquee-content');
            if (marquee) {
                marquee.style.animationDirection = newLang === 'ar' ? 'normal' : 'reverse';
            }
        });
    }

    // Chat Button
    const openChatBtn = document.getElementById('openChatBtn');
    if (openChatBtn) {
        openChatBtn.addEventListener('click', () => {
            window.location.href = 'chat.html';
        });
    }

    // Secret Brand Dot Click
    const brandDotEl = document.querySelector('.brand .dot');
    if (brandDotEl) {
        let _clicks = 0;
        let _timer = null;
        brandDotEl.style.cursor = 'pointer';
        brandDotEl.addEventListener('click', (e) => {
            e.stopPropagation();
            _clicks++;
            if (brandDotEl.style) brandDotEl.style.transform = 'scale(1.2)';
            clearTimeout(_timer);
            _timer = setTimeout(() => {
                _clicks = 0;
                if (brandDotEl.style) brandDotEl.style.transform = '';
            }, 2500);
            if (_clicks >= 6) window.location.href = 'chat.html';
        });
    }
});

// 4. Stats Counter
const statsSection = document.querySelector('.stats-section');
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const animateStats = () => {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target') || 0);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target.toLocaleString();
            }
        };
        updateCounter();
    });
};

if (statsSection && statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                animateStats();
                statsAnimated = true;
            }
        });
    }, { threshold: 0.5 });
    observer.observe(statsSection);
}

// 5. Cursor Trail
const particles = [];
const particleCount = 15;
let mouseX = 0, mouseY = 0;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    document.body.appendChild(particle);
    particles.push({ element: particle, x: 0, y: 0, size: Math.random() * 5 + 2 });
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

const animateParticles = () => {
    particles.forEach((particle, index) => {
        const delay = index * 2;
        particle.x += (mouseX - particle.x) / (delay + 5);
        particle.y += (mouseY - particle.y) / (delay + 5);
        particle.element.style.left = particle.x + 'px';
        particle.element.style.top = particle.y + 'px';
        particle.element.style.width = particle.size + 'px';
        particle.element.style.height = particle.size + 'px';
        particle.element.style.opacity = 1 - (index / particleCount);
    });
    requestAnimationFrame(animateParticles);
};
animateParticles();

// 6. Custom Cursor
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');
if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const { clientX: px, clientY: py } = e;
        cursorDot.style.left = `${px}px`;
        cursorDot.style.top = `${py}px`;
        cursorOutline.animate({ left: `${px}px`, top: `${py}px` }, { duration: 500, fill: "forwards" });
    });
}
document.querySelectorAll('.hover-target, a, button').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// 7. Parallax
const parallaxElements = document.querySelectorAll('.hero-avatar, .hero h1, .hero p');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    parallaxElements.forEach((el, index) => {
        el.style.transform = `translateY(${scrolled * (index + 1) * 0.1}px)`;
    });
});

// 8. Gallery and Modal
const galleryData = [
    { title: { ar: "لوحة إدارة البيانات", en: "Data Dashboard" }, description: { ar: "نظام متكامل لتصور البيانات وتحليلها.", en: "Integrated data visualization system." }, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
    { title: { ar: "تطبيق التوصيل الذكي", en: "Smart Delivery App" }, description: { ar: "منصة توصيل حديثة وقابلة للتوسع.", en: "Modern and scalable delivery platform." }, image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80" },
    { title: { ar: "محتوى تعليمي", en: "Educational Content" }, description: { ar: "سلسلة فيديوهات تعليمية احترافية.", en: "Professional educational video series." }, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" },
    { title: { ar: "تحليل ذكي", en: "Smart Analytics" }, description: { ar: "منصة تحليل بيانات متقدمة بالذكاء الاصطناعي.", en: "Advanced AI analytics platform." }, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" },
    { title: { ar: "تطبيق التسويق", en: "Marketing App" }, description: { ar: "أداة تسويقية شاملة وفعالة.", en: "Comprehensive marketing tool." }, image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80" },
    { title: { ar: "تطبيق الشبكة الاجتماعية", en: "Social Network" }, description: { ar: "منصة تواصل اجتماعية مبتكرة.", en: "Innovative social network." }, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?auto=format&fit=crop&w=800&q=80" }
];

window.openModal = (index) => {
    const modal = document.getElementById('galleryModal');
    if (!modal || !galleryData[index]) return;
    const data = galleryData[index];
    const lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
    document.getElementById('modalImage').src = data.image;
    document.getElementById('modalTitle').textContent = data.title[lang];
    document.getElementById('modalDescription').textContent = data.description[lang];
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeModal = () => {
    const modal = document.getElementById('galleryModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = 'auto';
};

const modalOverlay = document.getElementById('galleryModal');
if (modalOverlay) modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

// 9. Tilt and Skills Animation
VanillaTilt.init(document.querySelectorAll(".bento-card, .cv-section, .social-card, .skill-box"), { max: 5, speed: 400, glare: true, "max-glare": 0.2 });

const skillsSection = document.querySelector('#advanced-skills');
const bars = document.querySelectorAll('.skill-progress-bar');
if (skillsSection && bars.length > 0) {
    let sAnim = false;
    const sObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !sAnim) {
                bars.forEach(bar => {
                    const w = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => { bar.style.width = w; }, 100);
                });
                sAnim = true;
            }
        });
    }, { threshold: 0.5 });
    sObs.observe(skillsSection);
}

// 10. Forms
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const submitBtn = document.getElementById('submitBtn');
        const feedback = document.getElementById('formFeedback');

        if (!name || !email || !subject || !message) {
            feedback.style.display = 'block';
            feedback.style.background = 'rgba(239, 68, 68, 0.2)';
            feedback.style.color = '#ef4444';
            feedback.textContent = document.documentElement.lang === 'ar' ? 'ملء جميع الحقول' : 'Fill all fields';
            return;
        }

        submitBtn.disabled = true;
        const oldHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        setTimeout(() => {
            window.location.href = `mailto:huseinabbas49039@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = oldHtml;
            feedback.style.display = 'block';
            feedback.style.background = 'rgba(34, 197, 94, 0.2)';
            feedback.style.color = '#22c55e';
            feedback.textContent = document.documentElement.lang === 'ar' ? '✓ تم فتح البريد!' : '✓ Email client opened!';
            setTimeout(() => { feedback.style.display = 'none'; }, 5000);
        }, 500);
    });
}