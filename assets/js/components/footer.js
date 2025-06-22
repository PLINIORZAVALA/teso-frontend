// Footer JavaScript - Funcionalidades interactivas
document.addEventListener('DOMContentLoaded', function() {
    
    // Actualizar año automáticamente
    updateCurrentYear();
    
    // Configurar formulario de newsletter
    setupNewsletterForm();
    
    // Configurar animaciones de scroll
    setupScrollAnimations();
    
    // Configurar smooth scroll para enlaces internos
    setupSmoothScroll();
    
    // Configurar efectos de hover mejorados
    setupHoverEffects();
});

/**
 * Actualiza el año automáticamente en el footer
 */
function updateCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Configura el formulario de newsletter
 */
function setupNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    const input = form?.querySelector('.newsletter-input');
    const button = form?.querySelector('.newsletter-btn');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = input.value.trim();
        
        if (!isValidEmail(email)) {
            showNotification('Por favor, ingresa un email válido', 'error');
            input.focus();
            return;
        }
        
        // Simular envío (aquí integrarías con tu backend)
        button.textContent = 'Enviando...';
        button.disabled = true;
        
        setTimeout(() => {
            showNotification('¡Gracias por suscribirte! Te hemos enviado un email de confirmación.', 'success');
            input.value = '';
            button.textContent = 'Suscribirse';
            button.disabled = false;
        }, 2000);
    });
    
    // Validación en tiempo real
    input.addEventListener('input', function() {
        const email = this.value.trim();
        if (email && !isValidEmail(email)) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
    });
}

/**
 * Valida formato de email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Muestra notificaciones al usuario
 */
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Colores según tipo
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
    }
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

/**
 * Configura animaciones de scroll
 */
function setupScrollAnimations() {
    // Verificar si el navegador soporta Intersection Observer
    if (!('IntersectionObserver' in window)) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos del footer
    const footerElements = document.querySelectorAll('.footer-section, .newsletter-section');
    footerElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
}

/**
 * Configura smooth scroll para enlaces internos
 */
function setupSmoothScroll() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Solo aplicar smooth scroll si el elemento existe
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Configura efectos de hover mejorados
 */
function setupHoverEffects() {
    // Efecto parallax suave para redes sociales
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto de ripple para el botón de newsletter
    const newsletterBtn = document.querySelector('.newsletter-btn');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    }
}

// Agregar estilos CSS para animaciones vía JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .notification {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
    
    .footer-section:hover .footer-links a {
        opacity: 0.7;
    }
    
    .footer-section:hover .footer-links a:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Funciones utilitarias adicionales

/**
 * Debounce function para optimizar eventos
 */
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

/**
 * Función para detectar si el dispositivo es móvil
 */
function isMobileDevice() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Optimizaciones para dispositivos móviles
if (isMobileDevice()) {
    // Reducir animaciones en móviles para mejor rendimiento
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
    
    // Mejorar experiencia táctil
    const touchElements = document.querySelectorAll('.social-link, .newsletter-btn, .footer-links a');
    touchElements.forEach(element => {
        element.style.minHeight = '44px'; // Tamaño mínimo recomendado para touch
    });
}