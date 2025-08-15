// Create animated background particles
function createParticles() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bgAnimation = document.getElementById('bgAnimation');
    if (!bgAnimation) return;
    const particleCount = window.innerWidth <= 768 ? 15 : 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 10 + 5;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        bgAnimation.appendChild(particle);
    }
}

// Show more information function
function showMore(type) {
    const messages = {
        energy: "Świadectwa charakterystyki energetycznej są wymagane prawnie przy wielu okazjach. Nasze doświadczenie i profesjonalizm gwarantują szybkie i rzetelne wykonanie dokumentacji.",
        electrical: "Regularne pomiary elektryczne to podstawa bezpieczeństwa w Twoim domu. Wykrywamy potencjalne zagrożenia zanim staną się poważnym problemem."
    };
    showToast(messages[type]);
}

// Pulse effect for CTA
function pulseEffect(element) {
    element.style.transform = 'scale(1.05)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}


// Interactive service cards
function addServiceInteractivity() {
    const serviceSides = document.querySelectorAll('.service-side');
    
    serviceSides.forEach(side => {
        side.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateY(2deg)';
        });
        
        side.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
        });
    });
}

// Typing effect for title


// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    addServiceInteractivity();
    // reveal animations disabled

    const mainTitleElement = document.getElementById('main-title');
    if (mainTitleElement) {
        mainTitleElement.innerText = "Sławomir Drężek";
    }
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add hover effects to embedded images
    addImageHoverEffects();

    // Initialize hero slider
    initHeroSlider();

    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const open = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }));
    }
});

// Add parallax effect to background
let _scrollTicking = false;
function onScrollOptimized() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (_scrollTicking) return;
    _scrollTicking = true;
    requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        // Particle parallax
        const particleLayer = document.querySelector('.bg-animation');
        if (particleLayer) {
            particleLayer.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
        _scrollTicking = false;
    });
}
window.addEventListener('scroll', onScrollOptimized, { passive: true });

// Random particle movement
setInterval(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        const currentLeft = parseFloat(particle.style.left);
        const currentTop = parseFloat(particle.style.top);
        
        const newLeft = currentLeft + (Math.random() - 0.5) * 2;
        const newTop = currentTop + (Math.random() - 0.5) * 2;
        
        particle.style.left = Math.max(0, Math.min(100, newLeft)) + '%';
        particle.style.top = Math.max(0, Math.min(100, newTop)) + '%';
    });
}, 3000);

// Add subtle hover effects to embedded images
function addImageHoverEffects() {
    const images = document.querySelectorAll('.content-image, .service-image');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) contrast(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) contrast(1)';
        });
    });
}

// Toast system
function ensureToastContainer() {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.setAttribute('aria-live', 'polite');
        container.setAttribute('aria-atomic', 'true');
        document.body.appendChild(container);
    }
    return container;
}

function showToast(message, timeout = 4000) {
    const container = ensureToastContainer();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 300ms ease';
        setTimeout(() => toast.remove(), 300);
    }, timeout);
}

// HERO SLIDER
function initHeroSlider() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll('.slide'));
    const prevBtn = document.querySelector('.hero-arrow.prev');
    const nextBtn = document.querySelector('.hero-arrow.next');
    const dotsContainer = document.querySelector('.hero-dots');
    let current = 0;
    let timer = null;
    const interval = 5000;

    // Build dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'hero-dot' + (i === current ? ' active' : '');
            dot.setAttribute('aria-label', `Przejdź do slajdu ${i+1}`);
            dot.addEventListener('click', () => goTo(i, true));
            dotsContainer.appendChild(dot);
        });
    }

    function update() {
        slides.forEach((s, i) => s.classList.toggle('active', i === current));
        if (dotsContainer) {
            dotsContainer.querySelectorAll('.hero-dot').forEach((d, i) => d.classList.toggle('active', i === current));
        }
    }

    function goTo(i, pause) {
        current = (i + slides.length) % slides.length;
        update();
        if (pause) restart();
    }

    const next = () => goTo(current + 1, true);
    const prev = () => goTo(current - 1, true);

    // Controls
    prevBtn && prevBtn.addEventListener('click', prev);
    nextBtn && nextBtn.addEventListener('click', next);

    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    });

    // Swipe
    let startX = 0; let dragging = false;
    slider.addEventListener('touchstart', (e) => { dragging = true; startX = e.touches[0].clientX; stop(); }, { passive: true });
    slider.addEventListener('touchend', (e) => {
        if (!dragging) return;
        const dx = (e.changedTouches && e.changedTouches[0].clientX) - startX;
        if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
        startX = 0; dragging = false; start();
    });

    // Autoplay
    function start() { stop(); timer = setInterval(() => goTo(current + 1), interval); }
    function stop()  { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    // Init
    update();
    if (slides.length > 1) start();
}
