const API_URL = 'http://localhost:5001/api/proveedor/';

export async function obtenerProveedores() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function registrarProveedor(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function obtenerProveedorPorId(id) {
  const res = await fetch(`${API_URL}${id}`);
  return await res.json();
}

export async function actualizarProveedor(id, data) {
  const res = await fetch(`${API_URL}${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function eliminarProveedor(id) {
  await fetch(`${API_URL}${id}`, {
    method: 'DELETE',
  });
}
