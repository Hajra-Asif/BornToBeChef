let drinkData = [];

let fetchData = async () => {
    let url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';
    let response = await fetch(url);
    let jsonData = await response.json();
    return jsonData.drinks || [];
};

let displayCards = (drink) => {
    return `
          <div class="card" data-rating="${drink.rating || 0}">
            <div class="position-relative">
                <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
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
                <h5 class="recipe-title">${drink.strDrink}</h5>
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
    <a href="../Html/detailDrinks.html?id=${drink.idDrink}" class="anchor text-decoration-none">


                    <button class="btn-view">View Recipe</button>
                </a>
            </div>
        </div>
    `;
};

let renderDrinks = (drinks) => {
    const drinkContainer = document.getElementById('con');
    drinkContainer.innerHTML = drinks.map(displayCards).join('');
};

// **Step 1: Buttons Dynamically Generate Karna**
let renderButtons = (drinks) => {
    const buttonContainer = document.querySelector('.filters-containerr');
    let categories = ['All Drinks', ...new Set(drinks.map(drink => drink.strDrink))];
    buttonContainer.innerHTML = categories.map(category => 
        `
        <div class="filter-item btn-filter" data-category="${category}">
            <span class="filter-box"></span> 
            <span class="filter-label">${category}</span> 
        </div> 
    
        `
    ).join('');
    

    document.querySelectorAll('.btn-filter').forEach(button => {
        button.addEventListener('click', (e) => {
            let category = e.target.closest('.btn-filter').getAttribute('data-category');
            
            if (category === 'All Drinks') {
                // Show all drinks if 'All Drinks' is selected
                renderDrinks(drinks);
            } else {
                // Filter drinks by selected category
                let filteredDrinks = drinkData.filter(drink => drink.strDrink.startsWith(category));
                renderDrinks(filteredDrinks);
            }
              // Toggle the "active" class on the filter item
              button.classList.toggle("active");
        });
    });
};

// Rating Functionality
function gfg(event, n) {
  let card = event.target.closest('.card'); // Get the closest card element
  let stars = card.getElementsByClassName('star'); // Get all stars within the specific card

  // Remove previous ratings
  remove(stars);

  // Add new rating class to the clicked star
  for (let i = 0; i < n; i++) {
      let cls;
      if (n == 1) cls = "one";
      else if (n == 2) cls = "two";
      else if (n == 3) cls = "three";
      else if (n == 4) cls = "four";
      else if (n == 5) cls = "five";
      stars[i].className = "star " + cls;
  }

  // Update the card data-rating attribute
  card.setAttribute('data-rating', n);
}

function remove(stars) {
  let i = 0;
  while (i < 5) {
      stars[i].className = "star";
      i++;
  }
}

// **Step 2: Sorting Implement Karna**
document.getElementById('selection').addEventListener('change', (e) => {
    let value = e.target.value;
    let sortedDrinks = [...drinkData];

    if (value === 'asc') {
        sortedDrinks.sort((a, b) => a.strDrink.localeCompare(b.strDrink));
    } else if (value === 'desc') {
        sortedDrinks.sort((a, b) => b.strDrink.localeCompare(a.strDrink));
    }

    renderDrinks(sortedDrinks);
});

// **Step 3: Data Load Karna**
window.onload = async () => {
    drinkData = await fetchData();
    renderDrinks(drinkData);
    renderButtons(drinkData);
};



document.addEventListener("DOMContentLoaded", function () {
    const filterItems = document.querySelectorAll(".filter-item");
    filterItems.forEach(item => {
        item.addEventListener("click", function () {
            console.log('Item clicked');  // Check if this is fired when clicking
            this.classList.toggle("active");
        });
    });
});

// footer plus moudal
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
// footer plus moudal
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