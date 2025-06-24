import {
  obtenerCompras,
  registrarCompra
} from '../api/compras.js';

document.addEventListener('DOMContentLoaded', async () => {
  // LISTAR COMPRAS
  const tabla = document.getElementById('tabla-compras');
  if (tabla) {
    try {
      const compras = await obtenerCompras();
      tabla.innerHTML = '';

      compras.forEach(c => {
        const fila = `
          <tr>
            <td>${c.id}</td>
            <td>${c.usuario_id}</td>
            <td>${c.proveedor_id}</td>
          </tr>
        `;
        tabla.innerHTML += fila;
      });
    } catch (error) {
      console.error('❌ Error al mostrar compras:', error);
      tabla.innerHTML = '<tr><td colspan="3">Error al cargar datos</td></tr>';
    }
  }

  // REGISTRAR COMPRA
  const form = document.getElementById('form-compra');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));

      try {
        await registrarCompra(data);
        alert('✅ Compra registrada con éxito');
        window.location.href = 'listar.html';
      } catch (error) {
        console.error('❌ Error al registrar compra:', error);
        alert('Error al registrar la compra');
      }
    });
  }
});
