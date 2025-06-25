const routes = {
  '/': 'views/dashboard.html',
  '/login': 'views/login.html',

  // Inventario
  '/inventario': 'views/inventario/listar.html',
  '/inventario/registrar': 'views/inventario/registrar.html',
  '/inventario/editar': 'views/inventario/editar.html',

  // Compras
  '/compras': 'views/compras/listar.html',
  '/compras/registrar': 'views/compras/registrar.html',

  // Gastos
  '/gastos': 'views/gastos/listar.html',
  '/gastos/registrar': 'views/gastos/registrar.html',

  // Usuarios
  '/usuarios': 'views/usuarios/listar.html',
  '/usuarios/registrar': 'views/usuarios/registrar.html',
  '/usuarios/editar': 'views/usuarios/editar.html',

  // Página no encontrada
  '/404': 'views/404.html'
};


async function loadView(route) {
  const path = routes[route] || routes['/404'];

  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Vista no encontrada');

    const html = await res.text();

    // Si es login o dashboard, reemplaza todo el #app
    if (route === '/login' || route === '/') {
      document.getElementById('app').innerHTML = html;
    } else {
      // Si es otra ruta (inventario, usuarios, etc), solo actualiza el contenido del main
      const main = document.getElementById('main-content');
      if (main) {
        main.innerHTML = html;
      } else {
        // Si no se ha cargado todavía el layout (header/sidebar), entonces cargar todo
        document.getElementById('app').innerHTML = html;
      }
    }

    // Cargar módulo JS correspondiente a la ruta
    if (route.startsWith('/usuarios')) {
      const module = await import('./views/usuarios.js');
      module.initUsuarios?.(route);
    } else if (route.startsWith('/gastos')) {
      const module = await import('./views/gastos.js');
      module.initGastos?.(route);
    } else if (route.startsWith('/inventario')) {
      const module = await import('./views/inventario.js');
      module.initInventario?.(route);
    } else if (route === '/login') {
      const module = await import('./views/login.js');
      module.initLogin();
    } else if (route.startsWith('/compras')) {
      const module = await import('./views/compras.js');
      module.initCompras?.(route);
    } else if (route === '/') {
      const module = await import('./views/dashboard.js');
      module.initDashboard();
    }

  } catch (err) {
    console.error('Error cargando la vista:', err);
    const container = document.getElementById('main-content') || document.getElementById('app');
    container.innerHTML = `<h2>Error cargando la vista</h2>`;
  }
}

function router() {
  const route = window.location.hash.slice(1) || '/';
  loadView(route);
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
