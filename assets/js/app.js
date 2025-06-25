const routes = {
  '/': 'views/dashboard.html',
  '/login': 'views/login.html',

  // Usuarios
  '/usuarios': 'views/usuarios/listar.html',
  '/usuarios/registrar': 'views/usuarios/registrar.html',
  '/usuarios/editar': 'views/usuarios/editar.html',

  // Gastos
  '/gastos': 'views/gastos/listar.html',
  '/gastos/registrar': 'views/gastos/registrar.html',
  '/gastos/editar': 'views/gastos/editar.html',

  // Página no encontrada
  '/404': 'views/404.html'
};

async function loadView(route) {
  const path = routes[route] || routes['/404'];

  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Vista no encontrada');

    const html = await res.text();
    document.getElementById('app').innerHTML = html;

    // Cargar el módulo JS según la ruta
    if (route.startsWith('/usuarios')) {
      const module = await import('./views/usuarios.js');
      module.initUsuarios(route);
    } else if (route.startsWith('/gastos')) {
      const module = await import('./views/gastos.js');
      module.initGastos(route);
    } else if (route === '/login') {
      const module = await import('./views/login.js');
      module.initLogin();
    } else if (route === '/') {
      const module = await import('./views/dashboard.js');
      module.initDashboard();
    }

  } catch (err) {
    console.error('Error cargando la vista:', err);
    document.getElementById('app').innerHTML = `<h2>Error cargando la vista</h2>`;
  }
}

function router() {
  const route = window.location.hash.slice(1) || '/';
  loadView(route);
}

// Inicializar en primer carga y en cambios de hash
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
