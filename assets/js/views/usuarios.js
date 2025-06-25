import {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  registrarUsuario,
  actualizarUsuario,
  eliminarUsuario
} from '../api/usuarios.js';

export async function initUsuarios(route) {
  // LISTAR USUARIOS
  if (route === '/usuarios') {
    const tabla = document.getElementById('tabla-usuarios');
    if (tabla) {
      try {
        const usuarios = await obtenerUsuarios();
        tabla.innerHTML = '';
        usuarios.forEach(u => {
          const fila = `
            <tr id="fila-usuario-${u.id}">
              <td>${u.id}</td>
              <td>${u.nombre}</td>
              <td>${u.correo}</td>
              <td>${u.rol}</td>
              <td>
                <button 
                  onclick="window.location.hash='#/usuarios/editar?id=${u.id}'" 
                  style="background-color: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 4px; margin-right: 6px; cursor: pointer;">
                  Editar
                </button>
                <button 
                  onclick="eliminarUsuarioDesdeVista(${u.id})" 
                  style="background-color: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
                  Eliminar
                </button>
              </td>
            </tr>
          `;
          tabla.innerHTML += fila;
        });
      } catch (error) {
        console.error('❌ Error al cargar usuarios:', error);
        tabla.innerHTML = '<tr><td colspan="5">Error al cargar usuarios</td></tr>';
      }
    }
  }

  // REGISTRAR USUARIO
  if (route === '/usuarios/registrar') {
    const form = document.getElementById('form-usuario');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        try {
          await registrarUsuario(data);
          alert('✅ Usuario registrado con éxito');
          window.location.hash = '#/usuarios';
        } catch (error) {
          console.error('❌ Error al registrar usuario:', error);
          alert('Error al registrar usuario');
        }
      });
    }
  }

  // EDITAR USUARIO
  if (route.startsWith('/usuarios/editar')) {
    const form = document.getElementById('form-editar-usuario');
    if (form) {
      const id = new URLSearchParams(window.location.hash.split('?')[1]).get('id');
      if (!id) {
        alert('❌ ID de usuario no especificado');
        return;
      }

      try {
        const usuario = await obtenerUsuarioPorId(id);
        if (!usuario) throw new Error('Usuario no encontrado');

        form.nombre.value = usuario.nombre;
        form.correo.value = usuario.correo;
        form.rol.value = usuario.rol;
        form.contraseña.value = usuario.contraseña ?? '';

        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const data = Object.fromEntries(new FormData(form));
          await actualizarUsuario(id, data);
          alert('✅ Usuario actualizado');
          window.location.hash = '#/usuarios';
        });
      } catch (error) {
        console.error('❌ Error al cargar usuario:', error);
        alert('❌ No se pudo cargar el usuario');
      }
    }
  }
}

window.eliminarUsuarioDesdeVista = async function(id) {
  if (confirm('¿Eliminar este usuario?')) {
    try {
      const resultado = await eliminarUsuario(id);
      alert(`✅ ${resultado.mensaje || 'Usuario eliminado correctamente'}`);

      // Remover la fila correspondiente directamente
      const fila = document.querySelector(`#fila-usuario-${id}`);
      if (fila) fila.remove();
    } catch (error) {
      console.error('❌ Error al eliminar usuario:', error);
      alert('Error al eliminar usuario');
    }
  }
};



