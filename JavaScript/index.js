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



// api fetch 

// let ourRecipes = async () =>{
    
//     let fetchdata = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken`)
//     let data = await fetchdata.json()
//     // return data 
//     console.log(data);
    

// }


// ourRecipes(); 

let fetchApi = async () => {
  let response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken');
  let jsonData = await response.json();
  return jsonData.meals || [];
};

// Function to create a card
let getData = (dessert) => {
  return `
      <div class="card">
            <div class="position-relative">
                <img src="${dessert.strMealThumb}" class="card-img-top" alt="${dessert.strMeal}">
                <div class="recipe-badge">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 14l9-5-9-5-9 5 9 5z'/%3E%3Cpath d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'/%3E%3C/svg%3E" alt="Beginner">
                </div>
            </div>
            <div class="card-body">
                <h5 class="recipe-title">${dessert.strMeal}</h5>
                <a href="detail-page.html?id=${dessert.idMeal}" class="anchor text-decoration-none">
                    <button class="btn-view">View Recipe</button>
                </a>
            </div>
        </div>
  `;
};

// Function to display desserts
let displayCards = async () => {
  let container = document.getElementById('maincardcontainer');
  let data = await fetchApi();

  if (!data.length) {
      container.innerHTML = "<p>No desserts found.</p>";
      return;
  }

  container.innerHTML = data.map(getData).join('');
};

// Call the function to display cards
displayCards();