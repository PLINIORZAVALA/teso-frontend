// assets/js/views/proveedores.js
import { obtenerProveedores } from '../api/proveedores.js';
import { loadTableData } from '../components/table-manager.js';

document.addEventListener('DOMContentLoaded', async () => {
  if (location.hash === '#/proveedores') {
    const data = await obtenerProveedores();
    loadTableData('tabla-proveedores', data, ['nombre', 'ruc', 'direccion', 'telefono']);
  }
});
