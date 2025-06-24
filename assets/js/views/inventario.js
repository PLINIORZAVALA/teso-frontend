import {
  obtenerInventario,
  registrarProductoInventario
} from '../api/inventario.js';

document.addEventListener('DOMContentLoaded', async () => {
  // LISTAR INVENTARIO
  const tabla = document.getElementById('tabla-inventario');
  if (tabla) {
    try {
      const inventario = await obtenerInventario();
      tabla.innerHTML = '';

      inventario.forEach(item => {
        const fila = `
          <tr>
            <td>${item.id}</td>
            <td>${item.producto}</td>
            <td>${item.cantidad}</td>
            <td>${item.ubicacion}</td>
            <td>${item.compra_id}</td>
          </tr>
        `;
        tabla.innerHTML += fila;
      });
    } catch (error) {
      console.error('❌ Error al cargar inventario:', error);
      tabla.innerHTML = '<tr><td colspan="5">Error al cargar datos</td></tr>';
    }
  }

  // REGISTRAR PRODUCTO
  const form = document.getElementById('form-inventario');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));

      try {
        await registrarProductoInventario(data);
        alert('✅ Producto registrado en inventario');
        window.location.href = 'listar.html';
      } catch (error) {
        console.error('❌ Error al registrar producto:', error);
        alert('Error al registrar producto');
      }
    });
  }
});
