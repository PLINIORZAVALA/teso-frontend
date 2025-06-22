// assets/js/views/compras.js
import { obtenerCompras } from '../api/compras.js';
import { loadTableData } from '../components/table-manager.js';

document.addEventListener('DOMContentLoaded', async () => {
  if (location.hash === '#/compras') {
    const data = await obtenerCompras();
    loadTableData('tabla-compras', data, ['proveedor', 'producto', 'cantidad', 'total', 'fecha']);
  }
});
