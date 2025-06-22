const API_BASE_URL = 'http://localhost:3000/api/proveedores'; // Ajustar según backend

export async function obtenerProveedores() {
  try {
    const res = await fetch(API_BASE_URL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al obtener proveedores:', error);
    return [];
  }
}

export async function registrarProveedor(proveedor) {
  try {
    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(proveedor)
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al registrar proveedor:', error);
    return { success: false };
  }
}
