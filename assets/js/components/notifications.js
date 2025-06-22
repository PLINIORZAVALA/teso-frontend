export function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `toast ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}
