// assets/js/api/login.js
const API_URL = 'http://localhost:5001/api/usuarios/login';

export async function loginUsuario(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.mensaje || 'Error en el login');
  }

  return await res.json(); // puedes guardar token si lo devuelve
}
