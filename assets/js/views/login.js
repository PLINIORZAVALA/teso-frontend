// assets/js/views/login.js
import { loginUsuario } from '../api/login.js';

export async function initLogin() {
  const form = document.getElementById('form-login');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // ← Previene que el formulario haga un reload

      const data = Object.fromEntries(new FormData(form));

      try {
        const response = await loginUsuario(data);
        alert(`✅ Bienvenido ${response.usuario.nombre}`);
        window.location.hash = '#/';
      } catch (error) {
        console.error('❌ Error en login:', error.message);
        alert('Correo o contraseña incorrectos');
      }
    });
  }
}
