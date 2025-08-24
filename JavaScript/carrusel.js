const slide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const container = document.querySelector('.carousel-container');

let counter = 0;

function getSize() {
  return container.clientWidth;
}

function showSlide() {
  const size = getSize();
  slide.style.transform = `translateX(${-counter * size}px)`;
}

function nextSlide() {
  if (counter >= images.length - 1) return;
  counter++;
  showSlide();
}

function prevSlide() {
  if (counter <= 0) return;
  counter--;
  showSlide();
}

window.addEventListener('resize', () => {
  showSlide();
});

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

setInterval(() => {
  if (counter < images.length - 1) {
    nextSlide();
  } else {
    counter = 0;
    showSlide();
  }
}, 4000);
