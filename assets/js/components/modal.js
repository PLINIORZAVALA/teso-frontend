export function openModal(contentHTML) {
  const modal = document.getElementById('modal-base');
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = contentHTML;
  modal.classList.remove('hidden');
}

export function closeModal() {
  document.getElementById('modal-base').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
});
