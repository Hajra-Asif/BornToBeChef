function toggleMenu() {
    document.querySelector('.menu').classList.toggle('active');
    console.log("chal raha hoon");
    
}




const carousel = new bootstrap.Carousel(document.getElementById('categoryCarousel'), {
    interval: 3000,
    wrap: true
});



const slider = document.querySelector('.recipe-slider');
const cards = document.querySelectorAll('.recipe-card');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const dotsContainer = document.querySelector('.slider-dots');

let currentIndex = 0;
const cardWidth = cards[0].offsetWidth + 25; // Include gap
const cardsPerView = Math.floor(slider.offsetWidth / cardWidth);
const maxIndex = cards.length - cardsPerView;

// Create dots
for (let i = 0; i <= maxIndex; i++) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = Math.max(0, Math.min(index, maxIndex));
  slider.scrollLeft = currentIndex * cardWidth;
  updateDots();
}

prevButton.addEventListener('click', () => {
  goToSlide(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
  goToSlide(currentIndex + 1);
});

// Auto-slide functionality
let autoSlideInterval;

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    const nextIndex = (currentIndex + 1) > maxIndex ? 0 : currentIndex + 1;
    goToSlide(nextIndex);
  }, 3000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Start auto-sliding
startAutoSlide();

// Pause auto-sliding when interacting with the slider
slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);
prevButton.addEventListener('mouseenter', stopAutoSlide);
prevButton.addEventListener('mouseleave', startAutoSlide);
nextButton.addEventListener('mouseenter', stopAutoSlide);
nextButton.addEventListener('mouseleave', startAutoSlide);

// Handle touch events
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  stopAutoSlide();
});

slider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const difference = touchStartX - touchEndX;
  
  if (Math.abs(difference) > 50) { // Minimum swipe distance
    if (difference > 0) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(currentIndex - 1);
    }
  }
  
  startAutoSlide();
});



