import { loginUsuario } from '../api/login.js';

export async function initLogin() {
  const form = document.getElementById('form-login');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = Object.fromEntries(new FormData(form));

      try {
        const response = await loginUsuario(data);

        // Guardar sesión (token o flag)
        localStorage.setItem('token', response.token || 'sesion_activa');

        alert(`✅ Bienvenido ${response.usuario.nombre}`);

        // Redirigir al dashboard o vista principal
        window.location.hash = '/';

      } catch (error) {
        console.error('❌ Error en login:', error.message);
        alert('Correo o contraseña incorrectos');
      }
    });
  }
}
