// 📦 components/sidebar.js
class SidebarManager {
  constructor() {
    this.sidebar = document.getElementById('sidebar');
    this.navItems = document.querySelectorAll('[data-link]');
    this.currentPath = window.location.pathname;

    this.init();
  }

  init() {
    this.setupNavigation();
    this.setActiveItem();
    this.setupKeyboardNavigation();
    this.setupResponsive();
  }

  setupNavigation() {
    this.navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const href = item.getAttribute('href');
        this.navigateTo(href, item);
      });
      item.setAttribute('role', 'menuitem');
      item.setAttribute('tabindex', '0');
    });
  }

  navigateTo(path, clickedItem) {
    console.log(`Navegando a: ${path}`);
    this.setActiveItem(clickedItem);
    if (history.pushState) {
      history.pushState(null, null, path);
      this.currentPath = path;
    }
    this.emitNavigationEvent(path);
    if (this.isMobile()) this.closeMobileSidebar();
  }

  setActiveItem(activeItem = null) {
    this.navItems.forEach(item => {
      item.classList.remove('active');
      item.setAttribute('aria-current', 'false');
    });

    if (activeItem) {
      activeItem.classList.add('active');
      activeItem.setAttribute('aria-current', 'page');
    } else {
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
    this.createMobileOverlay();
    window.addEventListener('resize', () => {
      if (!this.isMobile()) this.closeMobileSidebar();
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

    this.overlay.addEventListener('click', () => this.closeMobileSidebar());
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
    const event = new CustomEvent('sidebarNavigation', { detail: { path } });
    document.dispatchEvent(event);
  }

  updateActiveItem(path) {
    this.currentPath = path;
    this.setActiveItem();
  }

  getActiveItem() {
    return document.querySelector('.nav-item.active');
  }
}

// Inicializar Sidebar al cargar
document.addEventListener('DOMContentLoaded', () => {
  window.sidebarManager = new SidebarManager();

  document.addEventListener('sidebarNavigation', (e) => {
    console.log('📌 Navegación a:', e.detail.path);
  });

  window.addEventListener('popstate', () => {
    window.sidebarManager.updateActiveItem(window.location.pathname);
  });
});
