const routes = {
  '/': 'views/dashboard.html',
  '/usuarios': 'views/usuarios/listar.html',
  '/usuarios/registrar': 'views/usuarios/registrar.html',
  '/usuarios/editar': 'views/usuarios/editar.html',
  '/404': 'views/404.html',
};

async function loadView(route) {
  const path = routes[route] || routes['/404'];

  try {
    const res = await fetch(path);
    const html = await res.text();
    document.getElementById('app').innerHTML = html;

    if (route.startsWith('/usuarios')) {
      const module = await import('./views/usuarios.js');
      await module.initUsuarios(route);
    }
  } catch (err) {
    document.getElementById('app').innerHTML = `<h2>Error cargando la vista</h2>`;
    console.error(err);
  }
}

function router() {
  const route = window.location.hash.slice(1) || '/'; // quitar #
  loadView(route);
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
