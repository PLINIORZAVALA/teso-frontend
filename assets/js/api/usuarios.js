const API_URL = 'http://localhost:5001/api/usuarios/';

export async function obtenerUsuarios() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function obtenerUsuarioPorId(id) {
  const res = await fetch(`${API_URL}${id}`);
  return await res.json();
}

export async function registrarUsuario(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function actualizarUsuario(id, data) {
  const res = await fetch(`${API_URL}${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function eliminarUsuario(id) {
  const res = await fetch(`${API_URL}${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Error al eliminar usuario: ${error}`);
  }

  // Si hay cuerpo de respuesta en JSON (como mensaje), devuélvelo
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await res.json();
  }

  // Si no hay cuerpo (ej. código 204), devuelve un mensaje genérico
  return { mensaje: 'Usuario eliminado correctamente' };
}

