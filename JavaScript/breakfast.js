// Function to show the page loader
let showPageLoader = () => {
    document.getElementById("page-loader").style.display = "flex";
};

// Function to hide the page loader
let hidePageLoader = () => {
    document.getElementById("page-loader").style.display = "none";
};



// API se data fetch karne ka function
async function fetchMeals() {
    showPageLoader();
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast');
    let data = await response.json();
    hidePageLoader()
    return data.meals; // Return only the meals array
}

// Ek meal ka card generate karne ka function
function generateMealCard(meal) {
    return `
          <div class="card" data-rating="${meal.rating || 0}">
              <div class="position-relative">
                  <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
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
                  <h5 class="recipe-title">${meal.strMeal}</h5>
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
    <a href="../Html/bDetail.html?id=${meal.idMeal}" class="anchor text-decoration-none">

                      <button class="btn-view">View Recipe</button>
                  </a>
              </div>
          </div>
    `;
}

// Filter buttons dynamically generate karne ka function
async function generateCategoryButtons() {
    let meals = await fetchMeals();
    let buttonContainer = document.querySelector(".filters-containerr");
    
    let categories = ["All Dishes", ...new Set(meals.map(meal => meal.strMeal))];

    categories.forEach(category => {
        let filterItem = document.createElement("div");
        filterItem.classList.add("filter-item", "btn-filter");
        filterItem.dataset.category = category;
        
        filterItem.innerHTML = `
            <span class="filter-box"></span> 
            <span class="filter-label">${category}</span>
        `;
        
        // Adding click event for toggling active class
        filterItem.addEventListener("click", function() {
            this.classList.toggle("active");
            filterMeals(category);
        });
        
        buttonContainer.appendChild(filterItem);
    });
}

// Meals ko filter kar ke display karne ka function
async function filterMeals(category) {
    let meals = await fetchMeals();
    let filteredMeals = category === "All Dishes" 
        ? meals 
        : meals.filter(meal => meal.strMeal.startsWith(category));
  
    renderMeals(filteredMeals);
}

// Meals ko render karne ka function
function renderMeals(meals) {
    let cardContainer = document.getElementById("con");
    cardContainer.innerHTML = meals.map(meal => generateMealCard(meal)).join("");
}

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

// Sorting function (ascending, descending, rating)
document.getElementById("selection").addEventListener("change", async function () {
    let meals = await fetchMeals();
    let sortOption = this.value;
  
    if (sortOption === "asc") {
        meals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
    } else if (sortOption === "desc") {
        meals.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
    } else if (sortOption === "rating") {
        meals.sort(() => Math.random() - 0.5); // Dummy random sort for rating
    }
  
    renderMeals(meals);
});

// Initialize functions on page load
(async function init() {
    await generateCategoryButtons();
    let meals = await fetchMeals();
    renderMeals(meals);
})();
