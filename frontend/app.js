const statusElement = document.getElementById('status');
const list = document.getElementById('items');
const refreshButton = document.getElementById('refresh');

async function loadItems() {
  refreshButton.disabled = true;
  statusElement.textContent = 'Загрузка…';
  list.replaceChildren();
  try {
    const response = await fetch('/api/items');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const items = await response.json();
    for (const item of items) {
      const li = document.createElement('li');
      li.textContent = `${item.id}. ${item.name}`;
      list.appendChild(li);
    }
    statusElement.textContent = `Получено записей: ${items.length}`;
  } catch (error) {
    statusElement.textContent = `Не удалось загрузить данные: ${error.message}`;
  } finally {
    refreshButton.disabled = false;
  }
}

refreshButton.addEventListener('click', loadItems);
loadItems();
