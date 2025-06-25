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
