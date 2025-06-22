const API_BASE_URL = 'http://localhost:3000/api/usuarios'; // Ajustar según tu backend

export async function obtenerUsuarios() {
  try {
    const res = await fetch(API_BASE_URL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
}

export async function registrarUsuario(usuario) {
  try {
    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(usuario)
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return { success: false };
  }
}
