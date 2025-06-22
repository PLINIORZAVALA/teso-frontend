// assets/js/views/gastos.js
import { obtenerGastos } from '../api/gastos.js';
import { loadTableData } from '../components/table-manager.js';

document.addEventListener('DOMContentLoaded', async () => {
  if (location.hash === '#/gastos') {
    const data = await obtenerGastos();
    loadTableData('tabla-gastos', data, ['descripcion', 'categoria', 'monto', 'fecha']);
  }
});
