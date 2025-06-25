// 📦 components/notifications.js
export function showNotification(message, duration = 3000) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;

  document.body.appendChild(notification);
  setTimeout(() => notification.classList.add('show'), 100);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

// 📦 components/modal.js
export function showModal(htmlContent = '') {
  const modal = document.getElementById('modal-base');
  const body = document.getElementById('modal-body');
  body.innerHTML = htmlContent;
  modal.classList.add('show');
  modal.classList.remove('hidden');
}

export function closeModal() {
  const modal = document.getElementById('modal-base');
  modal.classList.remove('show');
  setTimeout(() => modal.classList.add('hidden'), 300);
}

document.addEventListener('click', (e) => {
  if (e.target.id === 'modal-close' || e.target.id === 'modal-base') {
    closeModal();
  }
});
