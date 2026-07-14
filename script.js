/**
 * Pixel Game Developer V-Card Portfolio - JavaScript
 * Adds interactive animations and functionality
 */

// ============================================
// DOM ELEMENTS
// ============================================
const navLinks = document.querySelectorAll('[href^="#"]');
const socialLinks = document.querySelectorAll('.social-link');
const projectLinks = document.querySelectorAll('.project-link');
const certificateLinks = document.querySelectorAll('.certificate-link');
const timelineItems = document.querySelectorAll('.timeline-item');
const projectCards = document.querySelectorAll('.project-card');
const certificateCards = document.querySelectorAll('.certificate-card');
const educationItems = document.querySelectorAll('.education-item');

// ============================================
// CONFIGURATION
// ============================================
const config = {
    scrollOffset: 80,
    animationDuration: 300,
    particleCount: 15,
    particleSize: 4,
    eyeBlinkInterval: 4000,
    mouthMoveInterval: 3000
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initScrollAnimations();
    initHoverEffects();
    initParticles();
    initPixelCharacter();
    initActiveNavLink();
    initPreloader();
    initConsoleEasterEgg();
});

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - config.scrollOffset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.vcard-section, .timeline-item, .project-card, .certificate-card, .education-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity ${config.animationDuration}ms ease ${index * 50}ms, transform ${config.animationDuration}ms ease ${index * 50}ms`;
        observer.observe(el);
    });
}

// ============================================
// HOVER EFFECTS
// ============================================
function initHoverEffects() {
    // Timeline items
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const marker = item.querySelector('.timeline-marker');
            if (marker) {
                marker.style.transform = 'scale(1.2)';
                marker.style.boxShadow = '0 0 10px rgba(239, 35, 60, 0.8)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const marker = item.querySelector('.timeline-marker');
            if (marker) {
                marker.style.transform = '';
                marker.style.boxShadow = '';
            }
        });
    });

    // Project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const tags = card.querySelectorAll('.project-tag');
            tags.forEach(tag => {
                tag.style.background = 'rgba(239, 35, 60, 0.3)';
                tag.style.borderColor = '#ef233c';
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const tags = card.querySelectorAll('.project-tag');
            tags.forEach(tag => {
                tag.style.background = '';
                tag.style.borderColor = '';
            });
        });
    });

    // Social links
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
        });
    });
}

// ============================================
// PIXEL CHARACTER ANIMATIONS
// ============================================
function initPixelCharacter() {
    const leftEye = document.querySelector('.pixel-eye.left-eye');
    const rightEye = document.querySelector('.pixel-eye.right-eye');
    const mouth = document.querySelector('.pixel-mouth');
    const head = document.querySelector('.pixel-head');
    
    if (!leftEye || !rightEye || !mouth || !head) return;

    // Eye blink animation
    function blinkEyes() {
        leftEye.style.height = '4px';
        rightEye.style.height = '4px';
        leftEye.style.borderRadius = '0 0 50% 50% / 0 0 100% 100%';
        rightEye.style.borderRadius = '0 0 50% 50% / 0 0 100% 100%';
        
        setTimeout(() => {
            leftEye.style.height = '';
            rightEye.style.height = '';
            leftEye.style.borderRadius = '';
            rightEye.style.borderRadius = '';
        }, 150);
    }

    // Mouth movement
    function moveMouth() {
        mouth.style.height = '12px';
        mouth.style.borderRadius = '0 0 30% 30% / 0 0 100% 100%';
        
        setTimeout(() => {
            mouth.style.height = '';
            mouth.style.borderRadius = '';
        }, 200);
    }

    // Head tilt
    function tiltHead() {
        head.style.transform = 'translateX(-50%) rotate(-2deg)';
        
        setTimeout(() => {
            head.style.transform = 'translateX(-50%) rotate(2deg)';
            
            setTimeout(() => {
                head.style.transform = 'translateX(-50%) rotate(0deg)';
            }, 200);
        }, 200);
    }

    // Random animations
    setInterval(blinkEyes, config.eyeBlinkInterval);
    setInterval(moveMouth, config.mouthMoveInterval);
    setInterval(tiltHead, 8000);

    // Mouse follow for eyes
    document.addEventListener('mousemove', (e) => {
        if (!leftEye || !rightEye) return;
        
        const rect = head.getBoundingClientRect();
        const headCenterX = rect.left + rect.width / 2;
        const headCenterY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const angle = Math.atan2(mouseY - headCenterY, mouseX - headCenterX);
        const eyeOffset = 5;
        
        const leftEyeElement = leftEye.querySelector('.eye-iris');
        const rightEyeElement = rightEye.querySelector('.eye-iris');
        
        if (leftEyeElement) {
            leftEyeElement.style.left = `${Math.cos(angle) * eyeOffset + 2}px`;
            leftEyeElement.style.top = `${Math.sin(angle) * eyeOffset + 1}px`;
        }
        
        if (rightEyeElement) {
            rightEyeElement.style.left = `${Math.cos(angle) * eyeOffset + 2}px`;
            rightEyeElement.style.top = `${Math.sin(angle) * eyeOffset + 1}px`;
        }
    });
}

// ============================================
// PARTICLE EFFECTS
// ============================================
function initParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);

    for (let i = 0; i < config.particleCount; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * config.particleSize + 2;
    const colors = ['#ef233c', '#4cc9f0', '#f39c12', '#27ae60', '#ffffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        opacity: ${Math.random() * 0.6 + 0.2};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
    `;
    
    container.appendChild(particle);
    
    // Add keyframes for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: ${particle.style.opacity};
            }
            90% {
                opacity: ${particle.style.opacity};
            }
            100% {
                transform: translateY(-100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// ACTIVE NAV LINK
// ============================================
function initActiveNavLink() {
    const sections = document.querySelectorAll('.vcard-section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - config.scrollOffset - 50;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

// ============================================
// PRELOADER
// ============================================
function initPreloader() {
    // Create preloader element
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-portrait">
                <div class="preloader-head"></div>
            </div>
            <p class="preloader-text">LOADING...</p>
            <div class="preloader-bar">
                <div class="preloader-progress"></div>
            </div>
        </div>
    `;
    
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #121212;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    `;
    
    document.body.appendChild(preloader);
    
    // Add styles for preloader
    const preloaderStyles = document.createElement('style');
    preloaderStyles.textContent = `
        .preloader-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }
        .preloader-portrait {
            width: 80px;
            height: 80px;
            position: relative;
        }
        .preloader-head {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 60px;
            background: #f5d5b0;
            border-radius: 50%;
            animation: preloaderPulse 1s ease-in-out infinite;
        }
        .preloader-head::before {
            content: '';
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            border: 4px solid #3a2519;
            border-radius: 50%;
        }
        .preloader-text {
            font-family: 'Press Start 2P', cursive;
            font-size: 0.875rem;
            color: #ffffff;
            letter-spacing: 2px;
        }
        .preloader-bar {
            width: 200px;
            height: 6px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
            overflow: hidden;
        }
        .preloader-progress {
            height: 100%;
            background: linear-gradient(90deg, #ef233c, #4cc9f0);
            width: 0%;
            animation: preloaderProgress 2s ease-in-out forwards;
        }
        @keyframes preloaderPulse {
            0%, 100% { transform: translateX(-50%) scale(1); }
            50% { transform: translateX(-50%) scale(1.1); }
        }
        @keyframes preloaderProgress {
            from { width: 0%; }
            to { width: 100%; }
        }
    `;
    document.head.appendChild(preloaderStyles);
    
    // Hide preloader after animation
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => {
            preloader.remove();
            preloaderStyles.remove();
        }, 500);
    }, 2000);
}

// ============================================
// CONSOLE EASTER EGG
// ============================================
function initConsoleEasterEgg() {
    console.log(`
%c🎮 PIXEL V-CARD PORTFOLIO 🎮

%cWillkommen auf meinem Game Developer Portfolio!

%cDies ist eine V-Card im Pixel-Art-Stil mit:
• Links: Profilinformationen & Social Links
• Rechts: Beruflicher Werdegang, Bildung, Zertifikate & Projekte
• Responsive Design für alle Geräte
• Animierter Pixel-Character mit Augenbewegungen

%cTechnologien: HTML5, CSS3, JavaScript (Vanilla)

%cBesuche: https://github.com/tishutox/SWISS

`, 
'font-size: 20px; font-weight: bold; color: #ef233c; text-shadow: 2px 2px 0 #000;',
'font-size: 14px; color: #4cc9f0;',
'font-size: 12px; color: #b0b0b0; line-height: 1.6;',
'font-size: 12px; color: #f39c12;',
'font-size: 12px; color: #27ae60;'
);
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    // ESC to scroll to top
    if (e.key === 'Escape') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Arrow keys for navigation
    if (e.key === 'ArrowDown') {
        const nextSection = document.querySelector('.vcard-section:not([style*="opacity: 0"])');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
});

// ============================================
// TOUCH SUPPORT FOR MOBILE
// ============================================
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - scroll down
            window.scrollBy({
                top: window.innerHeight * 0.8,
                behavior: 'smooth'
            });
        } else {
            // Swipe down - scroll up
            window.scrollBy({
                top: -window.innerHeight * 0.8,
                behavior: 'smooth'
            });
        }
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// EXPORT FOR MODULES (if needed)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initSmoothScroll,
        initScrollAnimations,
        initHoverEffects,
        initPixelCharacter,
        initParticles,
        initActiveNavLink,
        initPreloader
    };
}
