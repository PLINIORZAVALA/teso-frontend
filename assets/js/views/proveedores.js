import {
  obtenerProveedores,
  registrarProveedor,
  obtenerProveedorPorId,
  actualizarProveedor,
  eliminarProveedor
} from '../api/proveedores.js';

export async function initProveedores(route) {
  // LISTAR PROVEEDORES
  if (route === '/proveedores') {
    const tabla = document.getElementById('tabla-proveedores');
    if (tabla) {
      try {
        const proveedores = await obtenerProveedores();
        tabla.innerHTML = '';
        proveedores.forEach(p => {
          const fila = `
            <tr id="fila-proveedor-${p.id}">
              <td>${p.id}</td>
              <td>${p.nombre}</td>
              <td>${p.contacto}</td>
              <td>${p.productos_suministrados}</td>
              <td>
                <button 
                  onclick="window.location.hash='#/proveedores/editar?id=${p.id}'"
                  style="background-color: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 4px; margin-right: 6px; cursor: pointer;">
                  Editar
                </button>
                <button 
                  onclick="eliminarProveedorDesdeVista(${p.id})"
                  style="background-color: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
                  Eliminar
                </button>
              </td>
            </tr>
          `;
          tabla.innerHTML += fila;
        });
      } catch (error) {
        console.error('❌ Error al cargar proveedores:', error);
        tabla.innerHTML = '<tr><td colspan="5">Error al cargar proveedores</td></tr>';
      }
    }
  }

  // REGISTRAR PROVEEDOR
  if (route === '/proveedores/registrar') {
    const form = document.getElementById('form-proveedor');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        try {
          await registrarProveedor(data);
          alert('✅ Proveedor registrado con éxito');
          window.location.hash = '#/proveedores';
        } catch (error) {
          console.error('❌ Error al registrar proveedor:', error);
          alert('Error al registrar proveedor');
        }
      });
    }
  }

  // EDITAR PROVEEDOR
  if (route.startsWith('/proveedores/editar')) {
    const form = document.getElementById('form-editar-proveedor');
    if (form) {
      const id = new URLSearchParams(window.location.hash.split('?')[1]).get('id');
      if (!id) {
        alert('❌ ID de proveedor no especificado');
        return;
      }

      try {
        const proveedor = await obtenerProveedorPorId(id);
        if (!proveedor) throw new Error('Proveedor no encontrado');

        form.nombre.value = proveedor.nombre;
        form.contacto.value = proveedor.contacto;
        form.productos_suministrados.value = proveedor.productos_suministrados;

        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const data = Object.fromEntries(new FormData(form));
          await actualizarProveedor(id, data);
          alert('✅ Proveedor actualizado');
          window.location.hash = '#/proveedores';
        });
      } catch (error) {
        console.error('❌ Error al cargar proveedor:', error);
        alert('❌ No se pudo cargar el proveedor. Verifica si existe.');
      }
    }
  }
}

// Declaración global para los botones inline
window.eliminarProveedorDesdeVista = async function(id) {
  if (confirm('¿Eliminar este proveedor?')) {
    try {
      await eliminarProveedor(id);
      alert('✅ Proveedor eliminado');
      window.location.hash = '#/proveedores';
    } catch (error) {
      console.error('❌ Error al eliminar proveedor:', error);
      alert('❌ No se pudo eliminar el proveedor. Verifica si existe o si hay errores en la API.');
    }
  }
};
