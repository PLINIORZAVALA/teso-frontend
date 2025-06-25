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

  // Proveedores
  '/proveedores': 'views/proveedores/listar.html',
  '/proveedores/registrar': 'views/proveedores/registrar.html',
  '/proveedores/editar': 'views/proveedores/editar.html',

  // Usuarios
  '/usuarios': 'views/usuarios/listar.html',
  '/usuarios/registrar': 'views/usuarios/registrar.html',
  '/usuarios/editar': 'views/usuarios/editar.html',

  // Página no encontrada
  '/404': 'views/404.html'
};

async function loadView(baseRoute, fullRoute = baseRoute) {
  const path = routes[baseRoute] || routes['/404'];

  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Vista no encontrada');

    const html = await res.text();

    const main = document.getElementById('main-content');
    if (baseRoute === '/login' || baseRoute === '/') {
      document.getElementById('app').innerHTML = html;
    } else if (main) {
      main.innerHTML = html;
    } else {
      document.getElementById('app').innerHTML = html;
    }

    // Cargar módulo JS correspondiente a la ruta
    const loadModule = async (path, fnName) => {
      const module = await import(path);
      module[fnName]?.(fullRoute);
    };

    if (baseRoute.startsWith('/usuarios')) {
      await loadModule('./views/usuarios.js', 'initUsuarios');
    } else if (baseRoute.startsWith('/gastos')) {
      await loadModule('./views/gastos.js', 'initGastos');
    } else if (baseRoute.startsWith('/inventario')) {
      await loadModule('./views/inventario.js', 'initInventario');
    } else if (baseRoute.startsWith('/compras')) {
      await loadModule('./views/compras.js', 'initCompras');
    } else if (baseRoute.startsWith('/proveedores')) {
      await loadModule('./views/proveedores.js', 'initProveedores');
    } else if (baseRoute === '/login') {
      await loadModule('./views/login.js', 'initLogin');
    } else if (baseRoute === '/') {
      await loadModule('./views/dashboard.js', 'initDashboard');
    }

  } catch (err) {
    console.error('Error cargando la vista:', err);
    const container = document.getElementById('main-content') || document.getElementById('app');
    container.innerHTML = `<h2>Error cargando la vista</h2>`;
  }
}

function router() {
  const fullRoute = window.location.hash.slice(1) || '/';
  const baseRoute = fullRoute.split('?')[0];
  loadView(baseRoute, fullRoute);
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
