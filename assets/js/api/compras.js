const API_BASE_URL = 'http://localhost:3000/api/compras'; // Ajustar según tu backend

export async function obtenerCompras() {
  try {
    const res = await fetch(API_BASE_URL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al obtener compras:', error);
    return [];
  }
}

export async function registrarCompra(compra) {
  try {
    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(compra)
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al registrar compra:', error);
    return { success: false };
  }
}
