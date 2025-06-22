// assets/js/app.js
const routes = {
  '/': 'views/dashboard.html',
  '/login': 'views/login.html',
  '/404': 'views/404.html',
  // Puedes agregar más rutas aquí...
};

// Cargar vista por ruta
async function loadView(route) {
  const path = routes[route] || routes['/404'];
  try {
    const res = await fetch(path);
    const html = await res.text();
    document.getElementById('app').innerHTML = html;
  } catch (error) {
    console.error('Error cargando la vista:', error);
    document.getElementById('app').innerHTML = '<h2>Error al cargar la página.</h2>';
  }
}

// Controlador de rutas usando hash
function router() {
  const route = window.location.hash.replace('#', '') || '/';
  loadView(route);
}

// Detectar cambios de ruta
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
