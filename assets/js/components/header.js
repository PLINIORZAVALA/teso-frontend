// Header Manager Class
class HeaderManager {
    constructor() {
        this.elements = {};
        this.state = {
            menuOpen: false,
            hasNotifications: false,
            scrolled: false
        };
        
        this.init();
    }

    // Initialize the header manager
    init() {
        this.bindElements();
        this.attachEventListeners();
        this.setupScrollHandler();
        this.setupKeyboardNavigation();
    }

    // Bind DOM elements
    bindElements() {
        this.elements = {
            header: document.getElementById('header'),
            userMenu: document.getElementById('userMenu'),
            userTrigger: document.getElementById('userTrigger'),
            dropdown: document.getElementById('dropdown'),
            notificationBtn: document.getElementById('notificationBtn'),
            notificationBadge: document.getElementById('notificationBadge'),
            userName: document.getElementById('userName'),
            userAvatar: document.getElementById('userAvatar'),
            toastContainer: document.getElementById('toastContainer')
        };
    }

    // Attach event listeners
    attachEventListeners() {
        // User menu toggle
        this.elements.userTrigger?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleUserMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.state.menuOpen && !this.elements.userMenu?.contains(e.target)) {
                this.closeUserMenu();
            }
        });

        // Dropdown item clicks
        this.elements.dropdown?.addEventListener('click', (e) => {
            const action = e.target.closest('[data-action]')?.getAttribute('data-action');
            if (action) {
                this.handleDropdownAction(action, e);
            }
        });

        // Notification button
        this.elements.notificationBtn?.addEventListener('click', () => {
            this.handleNotificationClick();
        });

        // Logo click
        document.getElementById('logo')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleLogoClick();
        });
    }

    // Setup scroll handler for header effects
    setupScrollHandler() {
        let ticking = false;
        
        const handleScroll = () => {
            const scrolled = window.scrollY > 10;
            
            if (scrolled !== this.state.scrolled) {
                this.state.scrolled = scrolled;
                this.elements.header?.classList.toggle('scrolled', scrolled);
            }
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
            }
        });
    }

    // Setup keyboard navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'Escape':
                    if (this.state.menuOpen) {
                        this.closeUserMenu();
                        this.elements.userTrigger?.focus();
                    }
                    break;
                case 'ArrowDown':
                    if (this.state.menuOpen) {
                        e.preventDefault();
                        this.focusNextMenuItem();
                    }
                    break;
                case 'ArrowUp':
                    if (this.state.menuOpen) {
                        e.preventDefault();
                        this.focusPreviousMenuItem();
                    }
                    break;
            }
        });
    }

    // Toggle user menu
    toggleUserMenu() {
        if (this.state.menuOpen) {
            this.closeUserMenu();
        } else {
            this.openUserMenu();
        }
    }

    // Open user menu
    openUserMenu() {
        this.state.menuOpen = true;
        this.elements.userMenu?.classList.add('open');
        this.elements.dropdown?.classList.add('open');
        
        // Focus first menu item
        setTimeout(() => {
            const firstItem = this.elements.dropdown?.querySelector('.dropdown-item');
            firstItem?.focus();
        }, 100);
    }

    // Close user menu
    closeUserMenu() {
        this.state.menuOpen = false;
        this.elements.userMenu?.classList.remove('open');
        this.elements.dropdown?.classList.remove('open');
    }

    // Focus next menu item
    focusNextMenuItem() {
        const items = this.elements.dropdown?.querySelectorAll('.dropdown-item');
        const activeElement = document.activeElement;
        const currentIndex = Array.from(items || []).indexOf(activeElement);
        const nextIndex = (currentIndex + 1) % items.length;
        items[nextIndex]?.focus();
    }

    // Focus previous menu item
    focusPreviousMenuItem() {
        const items = this.elements.dropdown?.querySelectorAll('.dropdown-item');
        const activeElement = document.activeElement;
        const currentIndex = Array.from(items || []).indexOf(activeElement);
        const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
        items[prevIndex]?.focus();
    }

    // Handle dropdown actions
    handleDropdownAction(action, event) {
        event.preventDefault();
        this.closeUserMenu();

        switch (action) {
            case 'profile':
                this.handleProfileClick();
                break;
            case 'settings':
                this.handleSettingsClick();
                break;
            case 'logout':
                this.handleLogout();
                break;
        }
    }

    // Handle profile click
    handleProfileClick() {
        this.showNotification('Abriendo perfil de usuario...', 'info');
        // Add your profile navigation logic here
        console.log('Navigate to profile');
    }

    // Handle settings click
    handleSettingsClick() {
        this.showNotification('Abriendo configuración...', 'info');
        // Add your settings navigation logic here
        console.log('Navigate to settings');
    }

    // Handle logout
    async handleLogout() {
        const confirmed = await this.showConfirmDialog(
            '¿Cerrar sesión?',
            '¿Estás seguro de que quieres cerrar sesión?'
        );

        if (confirmed) {
            this.showNotification('Cerrando sesión...', 'info');
            
            // Simulate logout process
            setTimeout(() => {
                // Clear session data
                this.clearSessionData();
                
                // Redirect to login
                this.redirectToLogin();
            }, 1000);
        }
    }

    // Handle notification click
    handleNotificationClick() {
        this.hideNotificationBadge();
        this.showNotification('Mostrando notificaciones', 'info');
    }

    // Handle logo click
    handleLogoClick() {
        this.showNotification('Navegando al inicio...', 'info');
        // Add your home navigation logic here
        console.log('Navigate to home');
    }

    // Show notification toast
    showNotification(message, type = 'info', duration = 3000) {
        const toast = this.createToast(message, type);
        this.elements.toastContainer?.appendChild(toast);

        // Show animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto remove
        setTimeout(() => {
            this.removeToast(toast);
        }, duration);

        return toast;
    }

    // Create toast element
    createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icon = this.getToastIcon(type);
        
        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-message">${message}</div>
            <button class="toast-close" type="button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;

        // Close button functionality
        toast.querySelector('.toast-close')?.addEventListener('click', () => {
            this.removeToast(toast);
        });

        return toast;
    }

    // Get toast icon based on type
    getToastIcon(type) {
        const icons = {
            success: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20,6 9,17 4,12"></polyline>
                      </svg>`,
            error: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>`,
            info: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                     <circle cx="12" cy="12" r="10"></circle>
                     <line x1="12" y1="16" x2="12" y2="12"></line>
                     <line x1="12" y1="8" x2="12.01" y2="8"></line>
                   </svg>`
        };
        return icons[type] || icons.info;
    }

    // Remove toast
    removeToast(toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    // Show confirmation dialog
    showConfirmDialog(title, message) {
        return new Promise((resolve) => {
            const confirmed = window.confirm(`${title}\n\n${message}`);
            resolve(confirmed);
        });
    }

    // Show notification badge
    showNotificationBadge() {
        this.state.hasNotifications = true;
        if (this.elements.notificationBadge) {
            this.elements.notificationBadge.style.display = 'block';
        }
    }

    // Hide notification badge
    hideNotificationBadge() {
        this.state.hasNotifications = false;
        if (this.elements.notificationBadge) {
            this.elements.notificationBadge.style.display = 'none';
        }
    }

    // Toggle notification badge (for demo)
    toggleNotificationBadge() {
        if (this.state.hasNotifications) {
            this.hideNotificationBadge();
        } else {
            this.showNotificationBadge();
        }
    }

    // Update user info
    updateUser(name, avatarText) {
        if (this.elements.userName) {
            this.elements.userName.textContent = name;
        }
        if (this.elements.userAvatar) {
            this.elements.userAvatar.textContent = avatarText;
        }
    }

    // Clear session data
    clearSessionData() {
        // Clear localStorage
        const keysToRemove = ['authToken', 'userSession', 'preferences'];
        keysToRemove.forEach(key => {
            localStorage.removeItem(key);
        });

        // Clear sessionStorage
        sessionStorage.clear();
    }

    // Redirect to login
    redirectToLogin() {
        // In a real app, this would be your login route
        window.location.href = '/login';
    }

    // Public API methods
    getState() {
        return { ...this.state };
    }

    setNotificationCount(count) {
        if (count > 0) {
            this.showNotificationBadge();
        } else {
            this.hideNotificationBadge();
        }
    }
}

// Initialize header manager when DOM is loaded
let headerManager;

document.addEventListener('DOMContentLoaded', () => {
    headerManager = new HeaderManager();
    
    // Make it globally available for demo purposes
    window.headerManager = headerManager;
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeaderManager;
}