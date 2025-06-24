import {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  registrarUsuario,
  actualizarUsuario,
  eliminarUsuario
} from '../api/usuarios.js';

document.addEventListener('DOMContentLoaded', async () => {
  // LISTAR
  const tabla = document.getElementById('tabla-usuarios');
  if (tabla) {
    const usuarios = await obtenerUsuarios();
    tabla.innerHTML = '';

    usuarios.forEach(u => {
      const fila = `
        <tr>
          <td>${u.id}</td>
          <td>${u.nombre}</td>
          <td>${u.correo}</td>
          <td>${u.rol}</td>
          <td>
            <button onclick="location.href = 'editar.html?id=${u.id}'">Editar</button>
            <button onclick="eliminarUsuarioDesdeVista(${u.id})">Eliminar</button>
          </td>
        </tr>
      `;
      tabla.innerHTML += fila;
    });
  }

  // REGISTRAR
  const formRegistrar = document.getElementById('form-usuario');
  if (formRegistrar) {
    formRegistrar.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(formRegistrar));
      try {
        await registrarUsuario(data);
        alert('✅ Usuario registrado con éxito');
        window.location.href = 'listar.html';
      } catch (error) {
        console.error('❌ Error al registrar usuario:', error);
        alert('Error al registrar usuario');
      }
    });
  }

  // EDITAR
  const formEditar = document.getElementById('form-editar-usuario');
  if (formEditar) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const usuario = await obtenerUsuarioPorId(id);

    formEditar.nombre.value = usuario.nombre;
    formEditar.correo.value = usuario.correo;
    formEditar.rol.value = usuario.rol;
    formEditar.contraseña.value = usuario.contraseña ?? '';

    formEditar.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(formEditar));
      await actualizarUsuario(id, data);
      alert('Usuario actualizado');
      window.location.href = 'listar.html';
    });
  }
});

// Global
window.eliminarUsuarioDesdeVista = async function (id) {
  if (confirm('¿Eliminar este usuario?')) {
    await eliminarUsuario(id);
    location.reload();
  }
};
