// Clase para manejar el Sidebar
class SidebarManager {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.navItems = document.querySelectorAll('[data-link]');
        this.currentPath = window.location.pathname;
        
        this.init();
    }
    
    init() {
        // Inicializar navegación
        this.setupNavigation();
        
        // Marcar item activo basado en la URL actual
        this.setActiveItem();
        
        // Configurar eventos de teclado para accesibilidad
        this.setupKeyboardNavigation();
        
        // Configurar responsive behavior
        this.setupResponsive();
    }
    
    setupNavigation() {
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                const href = item.getAttribute('href');
                this.navigateTo(href, item);
            });
            
            // Agregar atributos de accesibilidad
            item.setAttribute('role', 'menuitem');
            item.setAttribute('tabindex', '0');
        });
    }
    
    navigateTo(path, clickedItem) {
        // Simular navegación (en una app real, aquí harías el routing)
        console.log(`Navegando a: ${path}`);
        
        // Actualizar item activo
        this.setActiveItem(clickedItem);
        
        // Actualizar URL (sin recargar la página)
        if (history.pushState) {
            history.pushState(null, null, path);
            this.currentPath = path;
        }
        
        // Emit custom event para que otros componentes puedan escuchar
        this.emitNavigationEvent(path);
        
        // En móvil, cerrar sidebar después de navegación
        if (this.isMobile()) {
            this.closeMobileSidebar();
        }
    }
    
    setActiveItem(activeItem = null) {
        // Remover clase active de todos los items
        this.navItems.forEach(item => {
            item.classList.remove('active');
            item.setAttribute('aria-current', 'false');
        });
        
        // Si se proporciona un item específico, marcarlo como activo
        if (activeItem) {
            activeItem.classList.add('active');
            activeItem.setAttribute('aria-current', 'page');
        } else {
            // Buscar y marcar el item que coincida con la URL actual
            const currentItem = Array.from(this.navItems).find(item => {
                const href = item.getAttribute('href');
                return href === this.currentPath || 
                       (this.currentPath === '/' && href === '/') ||
                       (this.currentPath.startsWith(href) && href !== '/');
            });
            
            if (currentItem) {
                currentItem.classList.add('active');
                currentItem.setAttribute('aria-current', 'page');
            }
        }
    }
    
    setupKeyboardNavigation() {
        this.navItems.forEach((item, index) => {
            item.addEventListener('keydown', (e) => {
                switch(e.key) {
                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        item.click();
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        this.focusNextItem(index);
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        this.focusPreviousItem(index);
                        break;
                    case 'Home':
                        e.preventDefault();
                        this.navItems[0].focus();
                        break;
                    case 'End':
                        e.preventDefault();
                        this.navItems[this.navItems.length - 1].focus();
                        break;
                }
            });
        });
    }
    
    focusNextItem(currentIndex) {
        const nextIndex = (currentIndex + 1) % this.navItems.length;
        this.navItems[nextIndex].focus();
    }
    
    focusPreviousItem(currentIndex) {
        const prevIndex = currentIndex === 0 ? this.navItems.length - 1 : currentIndex - 1;
        this.navItems[prevIndex].focus();
    }
    
    setupResponsive() {
        // Configurar overlay para móvil (si se necesita)
        this.createMobileOverlay();
        
        // Escuchar cambios de tamaño de ventana
        window.addEventListener('resize', () => {
            if (!this.isMobile()) {
                this.closeMobileSidebar();
            }
        });
    }
    
    createMobileOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'sidebar-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 40;
            display: none;
        `;
        document.body.appendChild(this.overlay);
        
        this.overlay.addEventListener('click', () => {
            this.closeMobileSidebar();
        });
    }
    
    openMobileSidebar() {
        if (this.isMobile()) {
            this.sidebar.classList.add('mobile-open');
            this.overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeMobileSidebar() {
        this.sidebar.classList.remove('mobile-open');
        this.overlay.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    isMobile() {
        return window.innerWidth < 768;
    }
    
    emitNavigationEvent(path) {
        const event = new CustomEvent('sidebarNavigation', {
            detail: { path: path }
        });
        document.dispatchEvent(event);
    }
    
    // Método público para actualizar el estado activo desde fuera
    updateActiveItem(path) {
        this.currentPath = path;
        this.setActiveItem();
    }
    
    // Método público para obtener el item activo actual
    getActiveItem() {
        return document.querySelector('.nav-item.active');
    }
}

// Funciones utilitarias globales
const SidebarUtils = {
    // Obtener todos los paths disponibles
    getAvailablePaths() {
        return Array.from(document.querySelectorAll('[data-link]'))
            .map(item => item.getAttribute('href'));
    },
    
    // Verificar si un path es válido
    isValidPath(path) {
        return this.getAvailablePaths().includes(path);
    },
    
    // Obtener el título de una sección basado en el path
    getSectionTitle(path) {
        const item = document.querySelector(`[data-link][href="${path}"]`);
        return item ? item.textContent.trim() : 'Página no encontrada';
    }
};

// Inicializar el sidebar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Crear instancia global del sidebar
    window.sidebarManager = new SidebarManager();
    
    // Escuchar eventos de navegación personalizados
    document.addEventListener('sidebarNavigation', (e) => {
        console.log('Navegación detectada:', e.detail.path);
        
        // Aquí puedes agregar lógica adicional como:
        // - Cargar contenido dinámico
        // - Actualizar breadcrumbs
        // - Analíticos
        // - etc.
    });
    
    // Manejar navegación del navegador (botones atrás/adelante)
    window.addEventListener('popstate', (e) => {
        window.sidebarManager.updateActiveItem(window.location.pathname);
    });
});

// Exportar para uso en otros módulos si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SidebarManager, SidebarUtils };
}