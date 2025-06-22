// assets/js/views/inventario.js
import { obtenerInventario } from '../api/inventario.js';
import { loadTableData } from '../components/table-manager.js';

document.addEventListener('DOMContentLoaded', async () => {
  if (location.hash === '#/inventario') {
    const data = await obtenerInventario();
    loadTableData('tabla-inventario', data, ['nombre', 'categoria', 'cantidad', 'precio']);
  }
});
