// assets/js/views/usuarios.js
import { obtenerUsuarios } from '../api/usuarios.js';
import { loadTableData } from '../components/table-manager.js';

document.addEventListener('DOMContentLoaded', async () => {
  if (location.hash === '#/usuarios') {
    const data = await obtenerUsuarios();
    loadTableData('tabla-usuarios', data, ['nombre', 'correo', 'rol', 'estado']);
  }
});
