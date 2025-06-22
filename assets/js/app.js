// Configuración global
const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  APP_ENV: import.meta.env.VITE_ENV || "development",
  ROUTES: {
    "/": { 
      template: "/views/dashboard.html",
      title: "Dashboard",
      auth: true 
    },
    "/login": { 
      template: "/views/login.html",
      title: "Iniciar Sesión",
      auth: false 
    },
    "/404": {
      template: "/views/404.html",
      title: "Página no encontrada",
      auth: false
    }
  }
};

// Estado global de la aplicación
const APP_STATE = {
  currentUser: null,
  isLoading: true
};

// Elementos DOM
const DOM = {
  app: document.getElementById("app"),
  loader: document.querySelector(".loader-container")
};

// Sistema de enrutamiento
class Router {
  constructor() {
    this.initEventListeners();
    this.navigate(window.location.pathname);
  }

  async navigate(path) {
    const route = CONFIG.ROUTES[path] || CONFIG.ROUTES["/404"];
    
    // Mostrar loader
    DOM.loader.classList.remove("hidden");
    
    try {
      // Cargar vista
      const response = await fetch(route.template);
      if (!response.ok) throw new Error("Template not found");
      
      const html = await response.text();
      DOM.app.innerHTML = html;
      document.title = `${route.title} | Inventario Tesorería`;
      
      // Cargar módulo JS asociado
      await this.loadViewModule(path);
      
      // Actualizar estado
      window.history.pushState(null, "", path);
      
    } catch (error) {
      console.error("Router error:", error);
      this.navigate("/404");
    } finally {
      // Ocultar loader
      setTimeout(() => {
        DOM.loader.classList.add("hidden");
      }, 300);
    }
  }

  async loadViewModule(path) {
    try {
      const viewName = path.split("/")[1] || "dashboard";
      const module = await import(`./views/${viewName}.js`);
      
      if (module.init) {
        await module.init();
      }
    } catch (error) {
      console.warn(`No JS module found for ${path}`);
    }
  }

  initEventListeners() {
    // Manejar clicks en links
    document.addEventListener("click", (e) => {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();
        this.navigate(e.target.getAttribute("href"));
      }
    });

    // Manejar navegación atrás/adelante
    window.addEventListener("popstate", () => {
      this.navigate(window.location.pathname);
    });
  }
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  // Iniciar router
  new Router();
  
  // Verificar autenticación
  checkAuth();
});

// Función para verificar autenticación
async function checkAuth() {
  try {
    const token = localStorage.getItem("auth_token");
    if (!token) throw new Error("No token found");
    
    const response = await fetch(`${CONFIG.API_BASE_URL}/auth/verify`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    
    if (!response.ok) throw new Error("Invalid token");
    
    APP_STATE.currentUser = await response.json();
  } catch (error) {
    console.warn("Auth check failed:", error.message);
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  } finally {
    APP_STATE.isLoading = false;
  }
}