const slider = document.querySelector('.items');

let isDown = false;
let startX = 0;
let scrollLeft = 0;
slider.style.overflowX = 'scroll';
if (slider.scrollWidth <= slider.clientWidth) {
  slider.querySelectorAll('.item').forEach(item => {
    item.style.minWidth = '300px';
  });
}

slider.addEventListener('mousedown', (e) => {
  if (e.which !== 1) return;

  isDown = true;
  slider.classList.add('active');

  startX = e.pageX;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;

  e.preventDefault();

  const walk = e.pageX - startX;
  slider.scrollLeft = scrollLeft - walk;
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});