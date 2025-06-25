// assets/js/components/partials-loader.js

export async function cargarParciales() {
  try {
    const [header, sidebar, footer, modal] = await Promise.all([
      fetch('views/partials/header.html').then(res => res.text()),
      fetch('views/partials/sidebar.html').then(res => res.text()),
      fetch('views/partials/footer.html').then(res => res.text()),
      fetch('views/partials/modal-base.html').then(res => res.text()),
    ]);

    // Insertar en contenedores
    document.getElementById('header').innerHTML = header;
    document.getElementById('sidebar').innerHTML = sidebar;
    document.getElementById('footer').innerHTML = footer;
    document.getElementById('modal').innerHTML = modal;

  } catch (error) {
    console.error('❌ Error al cargar los parciales:', error);
  }
}
