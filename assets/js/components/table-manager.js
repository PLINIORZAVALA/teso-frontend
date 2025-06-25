// 📦 components/table-manager.js
export function ordenarTabla(idTabla, columnaIndex) {
  const tabla = document.getElementById(idTabla);
  const filas = Array.from(tabla.querySelectorAll('tbody tr'));

  const ordenado = filas.sort((a, b) => {
    const valA = a.children[columnaIndex].textContent.trim();
    const valB = b.children[columnaIndex].textContent.trim();
    return valA.localeCompare(valB, undefined, { numeric: true });
  });

  const cuerpo = tabla.querySelector('tbody');
  cuerpo.innerHTML = '';
  ordenado.forEach(fila => cuerpo.appendChild(fila));
}
