const API_URL = 'http://localhost:5001/api/inventario/';

export async function obtenerInventario() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function registrarProductoInventario(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}
