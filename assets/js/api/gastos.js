const API_URL = 'http://localhost:5001/api/gastos/';

export async function obtenerGastos() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function registrarGasto(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}
