// assets/js/components/partials-loader.js

export async function cargarParciales() {
  const parciales = [
    { id: 'header', url: 'views/partials/header.html' },
    { id: 'sidebar', url: 'views/partials/sidebar.html' },
    { id: 'footer', url: 'views/partials/footer.html' },
    { id: 'modal', url: 'views/partials/modal-base.html' }
  ];

  for (const parcial of parciales) {
    const contenedor = document.getElementById(parcial.id);
    if (contenedor) {
      try {
        const res = await fetch(parcial.url);
        const html = await res.text();
        contenedor.innerHTML = html;
      } catch (error) {
        console.error(`Error cargando el parcial ${parcial.url}:`, error);
      }
    }
  }
}
