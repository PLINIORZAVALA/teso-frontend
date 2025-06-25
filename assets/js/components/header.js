document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  const adminName = document.getElementById('adminName');

  // Cargar nombre de administrador desde localStorage si existe
  const storedName = localStorage.getItem('adminName') || 'Administrador';
  adminName.textContent = storedName;

  logoutBtn?.addEventListener('click', () => {
    const confirmed = confirm('¿Deseas cerrar sesión?');
    if (confirmed) {
      localStorage.removeItem('authToken');
      sessionStorage.clear();
      window.location.href = '/#/login';
    }
  });
});
