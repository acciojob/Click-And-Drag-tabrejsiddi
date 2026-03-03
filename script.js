const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let isDragging = false;
let currentItem = null;
let offsetX = 0;
let offsetY = 0;

items.forEach(item => {
  item.style.position = 'absolute';
  const rect = item.getBoundingClientRect();
  const parentRect = container.getBoundingClientRect();
  item.style.left = (rect.left - parentRect.left) + 'px';
  item.style.top = (rect.top - parentRect.top) + 'px';
});

items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    currentItem = item;

    const rect = currentItem.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    currentItem.style.zIndex = 1000;
    e.preventDefault();
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !currentItem) return;

  const containerRect = container.getBoundingClientRect();

  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;
  newLeft = Math.max(
    0,
    Math.min(newLeft, containerRect.width - currentItem.offsetWidth)
  );

  newTop = Math.max(
    0,
    Math.min(newTop, containerRect.height - currentItem.offsetHeight)
  );

  currentItem.style.left = newLeft + 'px';
  currentItem.style.top = newTop + 'px';
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  if (currentItem) currentItem.style.zIndex = '';
  currentItem = null;
});