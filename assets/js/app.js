const routes = {
  '/login': 'views/login.html',
  '/': 'views/dashboard.html',
  '/usuarios': 'views/usuarios/listar.html',
  '/usuarios/registrar': 'views/usuarios/registrar.html',
  '/usuarios/editar': 'views/usuarios/editar.html',
  '/gastos': 'views/gastos/listar.html',
  '/gastos/registrar': 'views/gastos/registrar.html',
  '/gastos/editar': 'views/gastos/editar.html',
  '/404': 'views/404.html',
};

async function loadView(route) {
  const path = routes[route] || routes['/404'];

  try {
    const res = await fetch(path);
    const html = await res.text();
    document.getElementById('app').innerHTML = html;

    // Cargar módulo según la ruta
    if (route.startsWith('/usuarios')) {
      const module = await import('./views/usuarios.js');
      await module.initUsuarios(route);
    } else if (route.startsWith('/gastos')) {
      const module = await import('./views/gastos.js');
      await module.initGastos(route);
    } else if (route === '/login') {
      const module = await import('./views/login.js');
      await module.initLogin();
    } else if (route === '/') {
      const module = await import('./views/dashboard.js');
      await module.initDashboard();
    } else if (route === '/404') {
      document.getElementById('app').innerHTML = `<h2>Página no encontrada</h2>`;
    }

  } catch (err) {
    document.getElementById('app').innerHTML = `<h2>Error cargando la vista</h2>`;
    console.error(err);
  }
}

function router() {
  const route = window.location.hash.slice(1) || '/';
  loadView(route);
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
