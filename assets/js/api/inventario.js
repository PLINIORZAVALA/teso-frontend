const API_BASE_URL = 'http://localhost:3000/api/inventario'; // Ajusta a tu backend

export async function obtenerInventario() {
  try {
    const res = await fetch(API_BASE_URL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al obtener inventario:', error);
    return [];
  }
}

export async function registrarProducto(producto) {
  try {
    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(producto)
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al registrar producto:', error);
    return { success: false };
  }
}
