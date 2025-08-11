// Create animated background particles
function createParticles() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bgAnimation = document.getElementById('bgAnimation');
    if (!bgAnimation) return;
    const particleCount = 50;

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

// Smooth scroll reveal animation using IntersectionObserver
function setupReveal() {
    const elements = document.querySelectorAll('.fade-in');
    if (!('IntersectionObserver' in window)) {
        elements.forEach(el => el.classList.add('visible'));
        return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    elements.forEach(el => observer.observe(el));
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
function typeWriter(element, text, onComplete, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (onComplete) {
            onComplete();
        }
    }
    type();
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    addServiceInteractivity();
    setupReveal();

    const mainTitleElement = document.getElementById('main-title');
    const subtitleH1Element = document.querySelector('.subtitle-h1');
    const titleText = "Sławomir Drężek";

    if (mainTitleElement && subtitleH1Element) {
        typeWriter(mainTitleElement, titleText, () => {
            subtitleH1Element.style.opacity = '1';
        }, 150);
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
});

// Add parallax effect to background
window.addEventListener('scroll', () => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.bg-animation');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

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
