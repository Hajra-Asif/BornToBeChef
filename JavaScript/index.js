



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


let fetchApi = async () => {
  let response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken');
  let jsonData = await response.json();
  return jsonData.meals || [];
};


    // Generate HTML for Each Meal Card
    function getData(foodItems) {
      return `
      <div class="col-12 col-lg-3">
       <div class="card" data-rating="${foodItems.rating || 0}">
            <div class="position-relative">
                <img src="${foodItems.strMealThumb}" class="card-img-top" alt="${foodItems.strMeal}">
                <div class="recipe-badge">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 14l9-5-9-5-9 5 9 5z'/%3E%3Cpath d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'/%3E%3C/svg%3E" alt="Beginner">
                </div>
            </div>
            <div class="card-body">
                <div class="cardd">
                    <span onclick="gfg(event, 1)" class="star">★</span>
                    <span onclick="gfg(event, 2)" class="star">★</span>
                    <span onclick="gfg(event, 3)" class="star">★</span>
                    <span onclick="gfg(event, 4)" class="star">★</span>
                    <span onclick="gfg(event, 5)" class="star">★</span>
                </div>
                <h5 class="recipe-title">${foodItems.strMeal}</h5>
                <div class="recipe-info">
                    <span>
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.37V7z'/%3E%3C/svg%3E" alt="Time"> 45mins
                    </span>
                    <span>
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E" alt="Servings"> 2 people
                    </span>
                    <span>
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 14l9-5-9-5-9 5 9 5z'/%3E%3Cpath d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'/%3E%3C/svg%3E" alt="Level"> Beginner
                    </span>
                </div>
 <a href="./Html/homeD.html?id=${foodItems.idMeal}" class="anchor text-decoration-none">


                  <button class="btn-view">View Recipe</button>
                </a>
            </div>
        </div>
        </div>
      




      `;
  }

// Function to display desserts
let displayCards = async () => {
  let container = document.getElementById('maincardcontainer');
  let data = await fetchApi();

  if (!data.length) {
      container.innerHTML = "<p>No desserts found.</p>";
      return;
  }

  container.innerHTML = data.slice(9 , 17).map(getData).join('');
};

// Call the function to display cards
displayCards();


 // Rating Functionality (Event Delegation for Dynamic Elements)
 document.addEventListener("click", function (event) {
  if (event.target.classList.contains("star")) {
      let card = event.target.closest(".card"); // Get the closest card element
      let stars = card.querySelectorAll(".star"); // Get all stars in the card
      let rating = Array.from(stars).indexOf(event.target) + 1; // Get star index + 1

      // Remove previous ratings
      stars.forEach(star => star.classList.remove("one", "two", "three", "four", "five"));

      // Add new rating class up to the selected star
      for (let i = 0; i < rating; i++) {
          stars[i].classList.add(["one", "two", "three", "four", "five"][i]);
      }

      // Update the data-rating attribute
      card.setAttribute("data-rating", rating);
  }
});









document.addEventListener("DOMContentLoaded", function () {
  // Get modal elements
  const loginOverlay = document.querySelector(".login-overlay");
  const signupOverlay = document.querySelector(".signup-overlay");

  // Buttons/links to open modals
  const openLoginBtn = document.querySelector(".login1");
  const openSignupBtn = document.querySelector(".signup1");

  // Close buttons
  const closeLoginBtn = document.querySelector(".close-login");
  const closeSignupBtn = document.querySelector(".close-signup");

  // Switch between login/signup
  const switchToLogin = document.getElementById("switchToLogin");
  const switchToSignup = document.getElementById("switchToSignup");

  // Function to open modal
  function openModal(modal) {
      if (modal) {
          modal.classList.add("active");
          document.body.style.overflow = "hidden"; // Prevent background scrolling
      }
  }

  // Function to close modal
  function closeModal(modal) {
      if (modal) {
          modal.classList.remove("active");
          document.body.style.overflow = ""; // Restore scrolling
      }
  }

  // Open login modal
  if (openLoginBtn) {
      openLoginBtn.addEventListener("click", (e) => {
          e.preventDefault();
          openModal(loginOverlay);
      });
  }

  // Open signup modal
  if (openSignupBtn) {
      openSignupBtn.addEventListener("click", (e) => {
          e.preventDefault();
          openModal(signupOverlay);
      });
  }

  // Close login modal
  if (closeLoginBtn) {
      closeLoginBtn.addEventListener("click", () => closeModal(loginOverlay));
  }

  // Close signup modal
  if (closeSignupBtn) {
      closeSignupBtn.addEventListener("click", () => closeModal(signupOverlay));
  }

  // Close modal when clicking outside
  document.addEventListener("click", (e) => {
      if (e.target.classList.contains("login-overlay")) {
          closeModal(loginOverlay);
      } else if (e.target.classList.contains("signup-overlay")) {
          closeModal(signupOverlay);
      }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
          closeModal(loginOverlay);
          closeModal(signupOverlay);
      }
  });

  // Switch to login modal from signup modal
  if (switchToLogin) {
      switchToLogin.addEventListener("click", (e) => {
          e.preventDefault();
          closeModal(signupOverlay);
          openModal(loginOverlay);
      });
  }

  // Switch to signup modal from login modal
  if (switchToSignup) {
      switchToSignup.addEventListener("click", (e) => {
          e.preventDefault();
          closeModal(loginOverlay);
          openModal(signupOverlay);
      });
  }
});
