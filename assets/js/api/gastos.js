// assets/js/views/gastos.js
import {
  obtenerGastos,
  registrarGasto
} from '../api/gastos.js';

export async function initGastos(route) {
  // LISTAR
  if (route === '/gastos') {
    const tabla = document.getElementById('tabla-gastos');
    if (tabla) {
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
    }
  }

  // REGISTRAR
  if (route === '/gastos/registrar') {
    const form = document.getElementById('form-gasto');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        try {
          await registrarGasto(data);
          alert('✅ Gasto registrado');
          window.location.hash = '#/gastos';
        } catch (error) {
          console.error('❌ Error al registrar gasto:', error);
          alert('Error al registrar gasto');
        }
      });
    }
  }
}
