/**
 * Pixel Game Developer Portfolio - JavaScript
 * Adds interactive animations and functionality
 */

// ============================================
// DOM ELEMENTS
// ============================================
const navLinks = document.querySelectorAll('.nav-link');
const skillItems = document.querySelectorAll('.skill-item');
const scrollIndicator = document.querySelector('.scroll-indicator');
const socialLinks = document.querySelectorAll('.social-link');
const typewriterElement = document.querySelector('.typewriter');

// ============================================
// CONFIGURATION
// ============================================
const config = {
    scrollOffset: 80,
    animationDuration: 300,
    typewriterSpeed: 50, // ms per character
    particleCount: 20,
    particleSize: 4
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initScrollAnimations();
    initSkillAnimations();
    initParticles();
    initTypewriter();
    initActiveNavLink();
    initParallaxEffects();
    initPreloader();
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

    // Scroll indicator click
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const targetPosition = aboutSection.offsetTop - config.scrollOffset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-header, .skill-category, .info-item, .contact-intro');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity ${config.animationDuration}ms ease, transform ${config.animationDuration}ms ease`;
        observer.observe(el);
    });
}

// ============================================
// SKILL ANIMATIONS
// ============================================
function initSkillAnimations() {
    skillItems.forEach((item, index) => {
        // Add hover effect
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05) translateY(-5px)';
            const icon = item.querySelector('.skill-icon');
            if (icon) {
                icon.style.animation = 'none';
                icon.offsetHeight; // Trigger reflow
                icon.style.animation = 'iconBounce 0.5s ease';
            }
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });

        // Add delay for staggered animation
        item.style.transitionDelay = `${index * 50}ms`;
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
        @keyframes iconBounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// TYPEWRITER EFFECT
// ============================================
function initTypewriter() {
    if (!typewriterElement) return;

    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';
    typewriterElement.style.borderRight = '2px solid #ef233c';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            // Start blink animation
            setInterval(() => {
                typewriterElement.style.borderRight = typewriterElement.style.borderRight === 'none' ? '2px solid #ef233c' : 'none';
            }, 500);
        }
    }, config.typewriterSpeed);
}

// ============================================
// ACTIVE NAV LINK
// ============================================
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    
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
                link.style.color = '#ef233c';
                link.style.borderColor = '#ef233c';
            } else {
                link.style.color = '';
                link.style.borderColor = '';
            }
        });
    });
}

// ============================================
// PARALLAX EFFECTS
// ============================================
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    const pixelCharacter = document.querySelector('.pixel-character');
    
    if (hero && pixelCharacter) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;
            
            if (scrolled < window.innerHeight) {
                pixelCharacter.style.transform = `translateX(-50%) translateY(${rate}px)`;
            }
        });
    }
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
            <div class="preloader-character"></div>
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
        .preloader-character {
            width: 60px;
            height: 60px;
            background: #ef233c;
            border-radius: 50%;
            position: relative;
            animation: preloaderPulse 1s ease-in-out infinite;
        }
        .preloader-character::before {
            content: '';
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            border: 4px solid #4cc9f0;
            border-radius: 50%;
            animation: preloaderRotate 2s linear infinite;
        }
        .preloader-text {
            font-family: 'Press Start 2P', cursive;
            font-size: 1rem;
            color: #ffffff;
            letter-spacing: 2px;
        }
        .preloader-bar {
            width: 200px;
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
        }
        .preloader-progress {
            height: 100%;
            background: linear-gradient(90deg, #ef233c, #4cc9f0);
            width: 0%;
            animation: preloaderProgress 2s ease-in-out forwards;
        }
        @keyframes preloaderPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        @keyframes preloaderRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
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
// CONSOLE EASTER EGG
// ============================================
console.log(`
%c🎮 PIXEL GAME DEV PORTFOLIO 🎮

%cWillkommen auf meinem Portfolio!

%cDies ist ein Pixel-Art inspiriertes Portfolio für einen werdenden Game Developer.
Technologien: HTML5, CSS3, JavaScript (Vanilla)

%cMöchtest du den Quellcode sehen?
Besuche: https://github.com/tishutox/SWISS

`, 
'font-size: 24px; font-weight: bold; color: #ef233c; text-shadow: 2px 2px 0 #000;',
'font-size: 16px; color: #4cc9f0;',
'font-size: 14px; color: #b0b0b0;',
'font-size: 14px; color: #f39c12;'
);

// ============================================
// SERVICE WORKER REGISTRATION (Optional PWA)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA functionality
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => {
        //         console.log('ServiceWorker registration successful');
        //     })
        //     .catch(err => {
        //         console.log('ServiceWorker registration failed: ', err);
        //     });
    });
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

// Throttle function for scroll events
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
        initSkillAnimations,
        initParticles,
        initTypewriter,
        initActiveNavLink,
        initParallaxEffects
    };
}
