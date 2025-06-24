import {
  obtenerGastos,
  registrarGasto
} from '../api/gastos.js';

document.addEventListener('DOMContentLoaded', async () => {
  // LISTAR GASTOS
  const tabla = document.getElementById('tabla-gastos');
  if (tabla) {
    try {
      const gastos = await obtenerGastos();
      tabla.innerHTML = '';

      gastos.forEach(g => {
        const fila = `
          <tr>
            <td>${g.id}</td>
            <td>${g.descripcion}</td>
            <td>${g.monto}</td>
            <td>${g.compra_id}</td>
          </tr>
        `;
        tabla.innerHTML += fila;
      });
    } catch (error) {
      console.error('❌ Error al cargar gastos:', error);
      tabla.innerHTML = '<tr><td colspan="4">Error al cargar datos</td></tr>';
    }
  }

  // REGISTRAR GASTO
  const form = document.getElementById('form-gasto');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));

      try {
        await registrarGasto(data);
        alert('✅ Gasto registrado');
        window.location.href = 'listar.html';
      } catch (error) {
        console.error('❌ Error al registrar gasto:', error);
        alert('Error al registrar gasto');
      }
    });
  }
});
