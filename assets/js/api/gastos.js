const API_BASE_URL = 'http://localhost:3000/api/gastos'; // Ajusta a tu ruta real

export async function obtenerGastos() {
  try {
    const res = await fetch(API_BASE_URL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al obtener gastos:', error);
    return [];
  }
}

export async function registrarGasto(gasto) {
  try {
    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(gasto)
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al registrar gasto:', error);
    return { success: false };
  }
}
