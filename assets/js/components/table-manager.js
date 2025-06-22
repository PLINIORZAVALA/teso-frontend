export function loadTableData(tableId, data, columns) {
  const table = document.getElementById(tableId);
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';

  data.forEach(item => {
    const row = document.createElement('tr');
    columns.forEach(col => {
      const cell = document.createElement('td');
      cell.textContent = item[col] ?? '';
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });
}
