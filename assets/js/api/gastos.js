// assets/js/api/gastos.js
const API_URL = 'http://localhost:5001/api/gastos/';

export async function obtenerGastos() {
  try {
    const res = await fetch(API_URL);
    return await res.json();
  } catch (error) {
    console.error('❌ Error al obtener gastos:', error);
    return [];
  }
}

export async function registrarGasto(data) {
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
    console.error('❌ Error al registrar gasto:', error);
    return { success: false };
  }
}
