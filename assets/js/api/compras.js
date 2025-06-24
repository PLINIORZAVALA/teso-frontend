const API_URL = 'http://localhost:5001/api/compra/';

export async function obtenerCompras() {
  try {
    const res = await fetch(API_URL);
    return await res.json();
  } catch (error) {
    console.error('❌ Error al obtener compras:', error);
    return [];
  }
}

export async function registrarCompra(data) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (error) {
    console.error('❌ Error al registrar compra:', error);
    return { success: false };
  }
}
