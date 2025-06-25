// assets/js/views/dashboard.js
import { cargarParciales } from '../components/partials-loader.js';

export async function initDashboard() {
  await cargarParciales();

  // Referencias a las tarjetas del dashboard
  const cards = document.querySelectorAll('.card');

  // Animación de entrada para cada tarjeta
  cards.forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'all 0.4s ease';
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }, index * 100); // Animación en cascada
  });

}
