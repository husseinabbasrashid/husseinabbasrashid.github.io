/**
 * Hussein Abbas Portfolio - Main JavaScript
 * Enhanced, Optimized, Professional
 */

// =========================================
// 1. Theme Management
// =========================================
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupToggle();
    }

    applyTheme() {
        if (this.theme === 'light') {
            document.body.classList.add('light');
            this.updateIcon('sun');
        } else {
            document.body.classList.remove('light');
            this.updateIcon('moon');
        }
    }

    toggle() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    updateIcon(icon) {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const iconEl = themeToggle.querySelector('i');
            if (iconEl) {
                iconEl.className = `fas fa-${icon}`;
            }
        }
    }

    setupToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggle());
        }
    }
}

// =========================================
// 2. Language Management
// =========================================
class LanguageManager {
    constructor() {
        this.lang = localStorage.getItem('lang') || 'ar';
        this.init();
    }

    init() {
        this.applyLanguage();
        this.setupToggle();
    }

    applyLanguage() {
        document.documentElement.lang = this.lang;
        document.documentElement.dir = this.lang === 'ar' ? 'rtl' : 'ltr';
        this.updateContent();
    }

    toggle() {
        this.lang = this.lang === 'ar' ? 'en' : 'ar';
        localStorage.setItem('lang', this.lang);
        this.applyLanguage();
    }

    updateContent() {
        document.querySelectorAll('[data-ar][data-en]').forEach(el => {
            const text = this.lang === 'ar' ? el.dataset.ar : el.dataset.en;
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.textContent = text;
            }
        });
    }

    setupToggle() {
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => this.toggle());
        }
    }
}

// =========================================
// 3. Custom Cursor
// =========================================
class CustomCursor {
    constructor() {
        this.dot = document.querySelector('[data-cursor-dot]');
        this.outline = document.querySelector('[data-cursor-outline]');
        this.init();
    }

    init() {
        if (!this.dot || !this.outline) return;
        if (window.innerWidth <= 768) return; // Disable on mobile

        this.setupMouseTracking();
        this.setupHoverEffects();
    }

    setupMouseTracking() {
        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            // Smooth follow effect
            dotX += (mouseX - dotX) * 0.8;
            dotY += (mouseY - dotY) * 0.8;
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            this.dot.style.left = `${dotX}px`;
            this.dot.style.top = `${dotY}px`;
            this.outline.style.left = `${outlineX}px`;
            this.outline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateCursor);
        };

        animateCursor();
    }

    setupHoverEffects() {
        document.querySelectorAll('.hover-target, a, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });
    }
}

// =========================================
// 4. Animated Background Canvas
// =========================================
class AnimatedBackground {
    constructor() {
        this.canvas = document.getElementById('bg-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
            this.ctx.fill();
        });

        // Draw connections
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance / 150)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// =========================================
// 5. Scroll Animations
// =========================================
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollProgress();
        this.setupNavHighlight();
        this.setupBackToTop();
    }

    setupScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #3b82f6, #06b6d4, #8b5cf6);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${scrolled}%`;
        });
    }

    setupNavHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTop.className = 'back-to-top';
        backToTop.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--gradient-btn);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s;
            z-index: 999;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
        `;
        document.body.appendChild(backToTop);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.transform = 'translateY(0)';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.transform = 'translateY(20px)';
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// =========================================
// 6. Form Handler
// =========================================
class FormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (this.form) this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'جاري الإرسال...';
        submitBtn.disabled = true;

        try {
            // Simulate API call (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            this.showMessage('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.', 'success');
            this.form.reset();
        } catch (error) {
            this.showMessage('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    showMessage(message, type) {
        const messageEl = document.createElement('div');
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 30px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 10px;
            z-index: 10000;
            animation: slideDown 0.3s ease;
        `;
        document.body.appendChild(messageEl);

        setTimeout(() => {
            messageEl.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => messageEl.remove(), 300);
        }, 3000);
    }
}

// =========================================
// 7. Performance Optimizations
// =========================================
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.preloadCriticalAssets();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalAssets() {
        const criticalAssets = [
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
            'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;600;700;800&display=swap'
        ];

        criticalAssets.forEach(asset => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = asset;
            document.head.appendChild(link);
        });
    }
}

// =========================================
// 8. Initialize Everything
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    new ThemeManager();
    new LanguageManager();
    new CustomCursor();
    new AnimatedBackground();
    new ScrollAnimations();
    new FormHandler();
    new PerformanceOptimizer();

    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }

    // Remove loader
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 1000);
    }

    // Log initialization
    console.log('%c🚀 Portfolio Initialized Successfully!', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
});

// =========================================
// 9. Export for external use
// =========================================
window.PortfolioApp = {
    ThemeManager,
    LanguageManager,
    CustomCursor,
    AnimatedBackground,
    ScrollAnimations,
    FormHandler,
    PerformanceOptimizer
};


// =========================================
// 10. Enhanced Visual Effects
// =========================================
class VisualEffects {
    constructor() {
        this.init();
    }

    init() {
        this.addParticleBackground();
        this.addRippleEffect();
        this.addCardHoverEffects();
        this.addTextAnimations();
    }

    addParticleBackground() {
        const particleBg = document.createElement('div');
        particleBg.className = 'particle-bg';
        document.body.insertBefore(particleBg, document.body.firstChild);
    }

    addRippleEffect() {
        document.querySelectorAll('.btn, .card, .skill-tag').forEach(element => {
            element.classList.add('ripple-effect');
        });
    }

    addCardHoverEffects() {
        document.querySelectorAll('.bento-card, .social-card').forEach(card => {
            card.classList.add('card-hover-effect');
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    addTextAnimations() {
        document.querySelectorAll('.hero h1, .section-header h2').forEach(heading => {
            heading.classList.add('animated-gradient-text');
        });
    }
}

// =========================================
// 11. Smooth Scroll Reveal
// =========================================
class ScrollReveal {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.bento-card, .skill-tag, .section-header').forEach(el => {
            observer.observe(el);
        });
    }
}

// =========================================
// 12. Interactive Cursor Trail
// =========================================
class CursorTrail {
    constructor() {
        this.trail = [];
        this.maxTrail = 20;
        this.init();
    }

    init() {
        if (window.innerWidth <= 768) return;

        document.addEventListener('mousemove', (e) => {
            this.addTrailDot(e.clientX, e.clientY);
        });
    }

    addTrailDot(x, y) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--accent-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            left: ${x}px;
            top: ${y}px;
            opacity: 0.6;
            transition: opacity 0.5s, transform 0.5s;
        `;
        
        document.body.appendChild(dot);
        this.trail.push(dot);

        setTimeout(() => {
            dot.style.opacity = '0';
            dot.style.transform = 'scale(0)';
        }, 50);

        setTimeout(() => {
            dot.remove();
            this.trail.shift();
        }, 500);

        if (this.trail.length > this.maxTrail) {
            const oldDot = this.trail.shift();
            oldDot.remove();
        }
    }
}

// =========================================
// 13. Typing Effect
// =========================================
class TypingEffect {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        if (!this.element) return;
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// =========================================
// 14. Parallax Effect
// =========================================
class ParallaxEffect {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            document.querySelectorAll('.hero-avatar, .grid-glow').forEach(el => {
                const speed = el.dataset.speed || 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// =========================================
// 15. Enhanced Initialization
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    new ThemeManager();
    new LanguageManager();
    new CustomCursor();
    new AnimatedBackground();
    new ScrollAnimations();
    new FormHandler();
    new PerformanceOptimizer();
    
    // NEW: Enhanced visual effects
    new VisualEffects();
    new ScrollReveal();
    new CursorTrail();
    new ParallaxEffect();

    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 100
        });
    }

    // Add typing effect to hero subtitle (if exists)
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        new TypingEffect(heroSubtitle, [
            'مطور ويب محترف',
            'مصمم واجهات مستخدم',
            'مبدع رقمي',
            'مطور Full Stack'
        ]);
    }

    // Remove loader with fade effect
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
                document.body.style.overflow = 'visible';
            }, 500);
        }, 1000);
    }

    // Add smooth reveal to all sections
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            section.style.transition = 'opacity 0.8s, transform 0.8s';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 200 * index);
    });

    // Enhanced console message
    console.log(
        '%c🚀 Portfolio Enhanced!',
        'color: #6366f1; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(99, 102, 241, 0.3);'
    );
    console.log(
        '%c✨ All visual effects loaded successfully!',
        'color: #8b5cf6; font-size: 14px;'
    );
});

// =========================================
// 16. Export Enhanced Modules
// =========================================
window.PortfolioApp = {
    ThemeManager,
    LanguageManager,
    CustomCursor,
    AnimatedBackground,
    ScrollAnimations,
    FormHandler,
    PerformanceOptimizer,
    VisualEffects,
    ScrollReveal,
    CursorTrail,
    TypingEffect,
    ParallaxEffect
};


// =========================================
// 17. Enhanced Button Interactions
// =========================================
class ButtonEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.addMagneticEffect();
        this.addRippleEffect();
        this.addHoverSound();
        this.addLoadingStates();
        this.addSuccessStates();
    }

    // Magnetic Button Effect
    addMagneticEffect() {
        document.querySelectorAll('.btn-magnetic, .btn-primary, .btn-outline').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = 100;
                
                if (distance < maxDistance) {
                    const strength = (maxDistance - distance) / maxDistance;
                    const moveX = x * strength * 0.3;
                    const moveY = y * strength * 0.3;
                    
                    btn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
                }
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // Enhanced Ripple Effect
    addRippleEffect() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    left: ${x}px;
                    top: ${y}px;
                    pointer-events: none;
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                `;

                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add ripple animation
        if (!document.getElementById('ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple-animation {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Hover Sound Effect (Optional)
    addHoverSound() {
        // Create audio context for button sounds
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        const playSound = (frequency, duration) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        };

        // Add sound to buttons (disabled by default, can be enabled)
        document.querySelectorAll('.btn').forEach(btn => {
            btn.dataset.soundEnabled = 'false'; // Disabled by default
            
            btn.addEventListener('mouseenter', () => {
                if (btn.dataset.soundEnabled === 'true') {
                    playSound(800, 0.1);
                }
            });

            btn.addEventListener('click', () => {
                if (btn.dataset.soundEnabled === 'true') {
                    playSound(1000, 0.15);
                }
            });
        });
    }

    // Loading States
    addLoadingStates() {
        document.querySelectorAll('[data-loading]').forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.classList.contains('loading')) return;
                
                const originalText = this.innerHTML;
                this.classList.add('loading');
                this.innerHTML = '<span>جاري التحميل...</span>';
                
                // Simulate loading (remove this in production)
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.classList.add('success');
                    this.innerHTML = '<span>تم بنجاح!</span>';
                    
                    setTimeout(() => {
                        this.classList.remove('success');
                        this.innerHTML = originalText;
                    }, 2000);
                }, 2000);
            });
        });
    }

    // Success States
    addSuccessStates() {
        document.querySelectorAll('[data-success]').forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.add('success');
                
                setTimeout(() => {
                    this.classList.remove('success');
                }, 2000);
            });
        });
    }
}

// =========================================
// 18. Button Animations Controller
// =========================================
class ButtonAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.addFloatingAnimation();
        this.addPulseAnimation();
        this.addGlowAnimation();
    }

    addFloatingAnimation() {
        document.querySelectorAll('.btn-float').forEach(btn => {
            btn.style.animation = 'float-btn 3s ease-in-out infinite';
        });
    }

    addPulseAnimation() {
        document.querySelectorAll('.btn-pulse').forEach(btn => {
            btn.style.animation = 'pulse-btn 2s infinite';
        });
    }

    addGlowAnimation() {
        document.querySelectorAll('.btn-primary, .btn-neon').forEach(btn => {
            let hue = 0;
            
            setInterval(() => {
                hue = (hue + 1) % 360;
                btn.style.filter = `hue-rotate(${hue}deg)`;
            }, 50);
        });
    }
}

// =========================================
// 19. Button Accessibility Enhancements
// =========================================
class ButtonAccessibility {
    constructor() {
        this.init();
    }

    init() {
        this.addAriaLabels();
        this.addKeyboardSupport();
        this.addFocusIndicators();
    }

    addAriaLabels() {
        document.querySelectorAll('.btn').forEach(btn => {
            if (!btn.getAttribute('aria-label') && btn.textContent) {
                btn.setAttribute('aria-label', btn.textContent.trim());
            }
        });
    }

    addKeyboardSupport() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    btn.click();
                }
            });
        });
    }

    addFocusIndicators() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('focus', function() {
                this.style.outline = '3px solid rgba(99, 102, 241, 0.5)';
                this.style.outlineOffset = '4px';
            });

            btn.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
            });
        });
    }
}

// =========================================
// 20. Button Analytics Tracker
// =========================================
class ButtonAnalytics {
    constructor() {
        this.clicks = {};
        this.init();
    }

    init() {
        this.trackClicks();
        this.trackHovers();
    }

    trackClicks() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const btnText = btn.textContent.trim();
                this.clicks[btnText] = (this.clicks[btnText] || 0) + 1;
                
                console.log(`Button clicked: ${btnText} (${this.clicks[btnText]} times)`);
                
                // Send to analytics (example)
                // gtag('event', 'button_click', { button_text: btnText });
            });
        });
    }

    trackHovers() {
        document.querySelectorAll('.btn').forEach(btn => {
            let hoverTime = 0;
            let hoverInterval;

            btn.addEventListener('mouseenter', () => {
                hoverInterval = setInterval(() => {
                    hoverTime += 100;
                }, 100);
            });

            btn.addEventListener('mouseleave', () => {
                clearInterval(hoverInterval);
                if (hoverTime > 1000) {
                    console.log(`Button hovered for ${hoverTime}ms: ${btn.textContent.trim()}`);
                }
                hoverTime = 0;
            });
        });
    }

    getStats() {
        return this.clicks;
    }
}

// =========================================
// 21. Initialize Button Enhancements
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize button enhancements
    new ButtonEnhancer();
    new ButtonAnimations();
    new ButtonAccessibility();
    new ButtonAnalytics();

    console.log('%c✨ Button Enhancements Loaded!', 'color: #6366f1; font-size: 14px; font-weight: bold;');
});

// Export button modules
window.PortfolioApp.ButtonEnhancer = ButtonEnhancer;
window.PortfolioApp.ButtonAnimations = ButtonAnimations;
window.PortfolioApp.ButtonAccessibility = ButtonAccessibility;
window.PortfolioApp.ButtonAnalytics = ButtonAnalytics;

// ============================================
// Advanced UI Components Classes
// ============================================

/**
 * StatCounter - عداد الإحصائيات المتحرك
 */
class StatCounter {
    constructor() {
        this.counters = [];
        this.hasAnimated = false;
    }

    init() {
        this.setupCounters();
        this.observeCounters();
    }

    setupCounters() {
        const statElements = document.querySelectorAll('.stat-number');
        statElements.forEach(element => {
            const target = parseInt(element.getAttribute('data-target') || element.textContent);
            this.counters.push({
                element,
                target,
                current: 0,
                increment: target / 100
            });
        });
    }

    observeCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateCounters();
                    this.hasAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => {
            observer.observe(counter.element);
        });
    }

    animateCounters() {
        this.counters.forEach(counter => {
            const updateCount = () => {
                counter.current += counter.increment;
                if (counter.current < counter.target) {
                    counter.element.textContent = Math.ceil(counter.current);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.element.textContent = counter.target;
                }
            };
            updateCount();
        });
    }
}

/**
 * TimelineAnimator - محرك Timeline
 */
class TimelineAnimator {
    constructor() {
        this.items = [];
    }

    init() {
        this.setupTimeline();
        this.observeItems();
    }

    setupTimeline() {
        this.items = document.querySelectorAll('.timeline-item');
    }

    observeItems() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });

        this.items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(item);
        });
    }
}

/**
 * AccordionManager - مدير FAQ Accordion
 */
class AccordionManager {
    constructor() {
        this.items = [];
    }

    init() {
        this.setupAccordion();
    }

    setupAccordion() {
        this.items = document.querySelectorAll('.faq-item');
        
        this.items.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // إغلاق جميع العناصر الأخرى
                this.items.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // تبديل العنصر الحالي
                item.classList.toggle('active', !isActive);
            });
        });
    }
}

/**
 * ToastNotification - نظام الإشعارات
 */
class ToastNotification {
    constructor() {
        this.container = null;
        this.queue = [];
    }

    init() {
        this.createContainer();
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        this.container.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 15px;
        `;
        document.body.appendChild(this.container);
    }

    show(message, type = 'info', duration = 3000) {
        const toast = this.createToast(message, type);
        this.container.appendChild(toast);
        
        // إظهار Toast
        setTimeout(() => toast.classList.add('show'), 100);
        
        // إخفاء وإزالة Toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, duration);
    }

    createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '✓',
            error: '✕',
            info: 'ℹ',
            warning: '⚠'
        };
        
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">${icons[type] || icons.info}</div>
                <div class="toast-message">${message}</div>
            </div>
        `;
        
        return toast;
    }
}

/**
 * ModalManager - مدير النوافذ المنبثقة
 */
class ModalManager {
    constructor() {
        this.modals = new Map();
    }

    init() {
        this.setupModals();
        this.setupTriggers();
    }

    setupModals() {
        const modalElements = document.querySelectorAll('.modal-overlay');
        modalElements.forEach(modal => {
            const id = modal.id;
            if (id) {
                this.modals.set(id, modal);
                this.setupModalClose(modal);
            }
        });
    }

    setupTriggers() {
        document.querySelectorAll('[data-modal]').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal');
                this.open(modalId);
            });
        });
    }

    setupModalClose(modal) {
        // إغلاق عند النقر على الخلفية
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.close(modal.id);
            }
        });

        // إغلاق عند النقر على زر الإغلاق
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.close(modal.id);
            });
        }

        // إغلاق عند الضغط على ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.close(modal.id);
            }
        });
    }

    open(modalId) {
        const modal = this.modals.get(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    close(modalId) {
        const modal = this.modals.get(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

/**
 * ProgressAnimator - محرك Progress Bars
 */
class ProgressAnimator {
    constructor() {
        this.bars = [];
    }

    init() {
        this.setupBars();
        this.observeBars();
    }

    setupBars() {
        const progressElements = document.querySelectorAll('.progress-bar');
        progressElements.forEach(bar => {
            const fill = bar.querySelector('.progress-fill');
            const target = parseInt(fill.getAttribute('data-progress') || '0');
            this.bars.push({ bar, fill, target, animated: false });
        });
    }

    observeBars() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const barData = this.bars.find(b => b.bar === entry.target);
                    if (barData && !barData.animated) {
                        this.animateBar(barData);
                        barData.animated = true;
                    }
                }
            });
        }, { threshold: 0.5 });

        this.bars.forEach(barData => {
            observer.observe(barData.bar);
        });
    }

    animateBar(barData) {
        setTimeout(() => {
            barData.fill.style.width = `${barData.target}%`;
        }, 100);
    }

    setProgress(barElement, progress) {
        const fill = barElement.querySelector('.progress-fill');
        if (fill) {
            fill.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        }
    }
}

/**
 * CardAnimator - محرك تحريك البطاقات
 */
class CardAnimator {
    constructor() {
        this.cards = [];
    }

    init() {
        this.setupCards();
        this.add3DTilt();
    }

    setupCards() {
        this.cards = document.querySelectorAll('.bento-card, .testimonial-card, .pricing-card');
    }

    add3DTilt() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale3d(1.02, 1.02, 1.02)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
}

/**
 * LazyLoader - محمل كسول للصور والمحتوى
 */
class LazyLoader {
    constructor() {
        this.images = [];
        this.observer = null;
    }

    init() {
        this.setupObserver();
        this.observeImages();
    }

    setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px'
        });
    }

    observeImages() {
        this.images = document.querySelectorAll('img[data-src], [data-bg]');
        this.images.forEach(img => this.observer.observe(img));
    }

    loadImage(element) {
        if (element.hasAttribute('data-src')) {
            element.src = element.getAttribute('data-src');
            element.removeAttribute('data-src');
        }
        
        if (element.hasAttribute('data-bg')) {
            element.style.backgroundImage = `url(${element.getAttribute('data-bg')})`;
            element.removeAttribute('data-bg');
        }
        
        element.classList.add('loaded');
    }
}

/**
 * SmoothScroll - تمرير سلس للروابط
 */
class SmoothScroll {
    constructor() {
        this.links = [];
    }

    init() {
        this.setupLinks();
    }

    setupLinks() {
        this.links = document.querySelectorAll('a[href^="#"]');
        
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offset = 80; // ارتفاع الـ navbar
                    const targetPosition = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

/**
 * FormValidator - مدقق النماذج
 */
class FormValidator {
    constructor() {
        this.forms = [];
    }

    init() {
        this.setupForms();
    }

    setupForms() {
        this.forms = document.querySelectorAll('form[data-validate]');
        
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
            
            // التحقق الفوري عند الكتابة
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
            });
        });
    }

    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // التحقق من الحقول المطلوبة
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'هذا الحقل مطلوب';
        }
        
        // التحقق من البريد الإلكتروني
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'البريد الإلكتروني غير صحيح';
            }
        }
        
        // التحقق من رقم الهاتف
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[0-9+\-\s()]+$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'رقم الهاتف غير صحيح';
            }
        }
        
        this.showFieldError(field, isValid, errorMessage);
        return isValid;
    }

    showFieldError(field, isValid, message) {
        // إزالة الرسالة القديمة
        const oldError = field.parentElement.querySelector('.field-error');
        if (oldError) oldError.remove();
        
        if (!isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = `
                color: #ef4444;
                font-size: 0.85rem;
                margin-top: 5px;
            `;
            errorDiv.textContent = message;
            field.parentElement.appendChild(errorDiv);
        } else {
            field.classList.remove('error');
        }
    }
}

// ============================================
// تهيئة جميع المكونات عند تحميل الصفحة
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // المكونات الأساسية
    const themeManager = new ThemeManager();
    const languageManager = new LanguageManager();
    const customCursor = new CustomCursor();
    const animatedBg = new AnimatedBackground();
    const scrollAnimations = new ScrollAnimations();
    const formHandler = new FormHandler();
    const performanceOptimizer = new PerformanceOptimizer();
    
    // التأثيرات البصرية
    const visualEffects = new VisualEffects();
    const scrollReveal = new ScrollReveal();
    const cursorTrail = new CursorTrail();
    const parallaxEffect = new ParallaxEffect();
    
    // تحسينات الأزرار
    const buttonEnhancer = new ButtonEnhancer();
    const buttonAnimations = new ButtonAnimations();
    const buttonAccessibility = new ButtonAccessibility();
    const buttonAnalytics = new ButtonAnalytics();

    // المكونات المتقدمة الجديدة
    const statCounter = new StatCounter();
    const timelineAnimator = new TimelineAnimator();
    const accordionManager = new AccordionManager();
    const toastNotification = new ToastNotification();
    const modalManager = new ModalManager();
    const progressAnimator = new ProgressAnimator();
    const cardAnimator = new CardAnimator();
    const lazyLoader = new LazyLoader();
    const smoothScroll = new SmoothScroll();
    const formValidator = new FormValidator();
    
    // تهيئة جميع المكونات
    themeManager.init();
    languageManager.init();
    customCursor.init();
    animatedBg.init();
    scrollAnimations.init();
    formHandler.init();
    performanceOptimizer.init();
    visualEffects.init();
    scrollReveal.init();
    cursorTrail.init();
    parallaxEffect.init();
    buttonEnhancer.init();
    buttonAnimations.init();
    buttonAccessibility.init();
    buttonAnalytics.init();
    statCounter.init();
    timelineAnimator.init();
    accordionManager.init();
    toastNotification.init();
    modalManager.init();
    progressAnimator.init();
    cardAnimator.init();
    lazyLoader.init();
    smoothScroll.init();
    formValidator.init();
    
    // إضافة Typing Effect للعنوان الرئيسي
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const texts = [
            'مرحباً، أنا حسين عباس',
            'مطور ويب محترف',
            'مصمم واجهات مستخدم',
            'خبير في تطوير المواقع'
        ];
        const typingEffect = new TypingEffect(heroTitle, texts);
        typingEffect.init();
    }

    // إضافة أمثلة للإشعارات (اختياري)
    console.log('✅ جميع المكونات تم تحميلها بنجاح!');
    
    // مثال على استخدام Toast Notification
    // toastNotification.show('مرحباً بك في موقع حسين عباس!', 'success', 4000);
    
    // Global API للوصول إلى المكونات من Console
    window.HusseinAbbasWebsite = {
        toast: toastNotification,
        modal: modalManager,
        progress: progressAnimator,
        buttonStats: buttonAnalytics,
        version: '2.0.0'
    };
});

// ============================================
// Service Worker للأداء والتخزين المؤقت
// ============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // يمكن تفعيل Service Worker لاحقاً
        // navigator.serviceWorker.register('/sw.js');
    });
}

// ============================================
// معالجة الأخطاء العامة
// ============================================

window.addEventListener('error', (e) => {
    console.error('خطأ في التطبيق:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise غير معالج:', e.reason);
});
