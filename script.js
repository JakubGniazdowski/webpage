// Create animated background particles
function createParticles() {
    const bgAnimation = document.getElementById('bgAnimation');
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
    
    alert(messages[type]);
}

// Pulse effect for CTA
function pulseEffect(element) {
    element.style.transform = 'scale(1.05)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}

// Smooth scroll reveal animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
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
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    addServiceInteractivity();
    
    // Initial reveal
    setTimeout(() => {
        revealOnScroll();
    }, 500);
    
    // Add scroll listener
    window.addEventListener('scroll', revealOnScroll);
    
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
});

// Add parallax effect to background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.bg-animation');
    const speed = scrolled * 0.5;
    
    parallax.style.transform = `translateY(${speed}px)`;
});

// Random particle movement
setInterval(() => {
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
