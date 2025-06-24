import {
  obtenerProveedores,
  registrarProveedor,
  obtenerProveedorPorId,
  actualizarProveedor,
  eliminarProveedor
} from '../api/proveedores.js';

document.addEventListener('DOMContentLoaded', async () => {
  // LISTAR
  const tabla = document.getElementById('tabla-proveedores');
  if (tabla) {
    const proveedores = await obtenerProveedores();
    tabla.innerHTML = '';
    proveedores.forEach(p => {
      const fila = `
        <tr>
          <td>${p.id}</td>
          <td>${p.nombre}</td>
          <td>${p.contacto}</td>
          <td>${p.productos_suministrados}</td>
          <td>
            <button onclick="location.href='editar.html?id=${p.id}'">Editar</button>
            <button onclick="eliminarProveedorDesdeVista(${p.id})">Eliminar</button>
          </td>
        </tr>
      `;
      tabla.innerHTML += fila;
    });
  }

  // REGISTRAR
  const formRegistrar = document.getElementById('form-proveedor');
  if (formRegistrar) {
    formRegistrar.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(formRegistrar));
      try {
        await registrarProveedor(data);
        alert('✅ Proveedor registrado con éxito');
        window.location.href = 'listar.html';
      } catch (error) {
        console.error('❌ Error al registrar:', error);
        alert('Error al registrar proveedor');
      }
    });
  }

  // EDITAR
  const formEditar = document.getElementById('form-editar-proveedor');
  if (formEditar) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const proveedor = await obtenerProveedorPorId(id);

    formEditar.nombre.value = proveedor.nombre;
    formEditar.contacto.value = proveedor.contacto;
    formEditar.productos_suministrados.value = proveedor.productos_suministrados;

    formEditar.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(formEditar));
      await actualizarProveedor(id, data);
      alert('Proveedor actualizado');
      window.location.href = 'listar.html';
    });
  }
});

// Función global
window.eliminarProveedorDesdeVista = async function(id) {
  if (confirm('¿Eliminar este proveedor?')) {
    await eliminarProveedor(id);
    location.reload();
  }
};
