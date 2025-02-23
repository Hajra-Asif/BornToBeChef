




// Function to show the page loader
let showPageLoader = () => {
    document.getElementById("page-loader").style.display = "flex";
};

// Function to hide the page loader
let hidePageLoader = () => {
    document.getElementById("page-loader").style.display = "none";
};


let fetchApi = async () => {
    // Fetch data from the API
    showPageLoader(); // Show loader before fetching
    
    let fetchh = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s');
    let jsonData = await fetchh.json();
    hidePageLoader(); // Hide loader after fetching
    return jsonData;
}

// Function to display each food item card
let getData = (foodItems) => {
    return `
        <div class="card" data-category="${foodItems.strCategory}" data-rating="${foodItems.rating || 0}">
            <div class="position-relative">
                <img src="${foodItems.strMealThumb}" class="card-img-top" alt="${foodItems.strMeal}">
                <div class="recipe-badge">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 14l9-5-9-5-9 5 9 5z'/%3E%3Cpath d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'/%3E%3C/svg%3E" alt="Beginner">
                </div>
            </div>
            <div class="card-body">
                <div class="cardd">
                    <span onclick="rateMeal(event, 1)" class="star">★</span>
                    <span onclick="rateMeal(event, 2)" class="star">★</span>
                    <span onclick="rateMeal(event, 3)" class="star">★</span>
                    <span onclick="rateMeal(event, 4)" class="star">★</span>
                    <span onclick="rateMeal(event, 5)" class="star">★</span>
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
<a href="../Html/detailRamazan.html?id=${foodItems.idMeal}" class="anchor text-decoration-none">

                      <button class="btn-view">View Recipe</button>
                  </a>
                </div>
            </div>
        </div>
    `;
};

// Rate meal function
function rateMeal(event, rating) {
    let stars = event.target.parentElement.children;
    for (let i = 0; i < stars.length; i++) {
        stars[i].style.color = i < rating ? 'gold' : 'gray';
    }
    // Store the rating in the data attribute
    let mealCard = event.target.closest('.card');
    mealCard.setAttribute('data-rating', rating);
}

// Sorting function
let sortMeals = (meals, criteria) => {
    if (criteria === 'asc') {
        return meals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
    } else if (criteria === 'desc') {
        return meals.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
    } else if (criteria === 'rating') {
        return meals.sort((a, b) => b.dataset.rating - a.dataset.rating);
    }
};

// Apply filter based on category
let filterMeals = (category) => {
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

// Event listener for filter
document.querySelectorAll('.filter-item').forEach(item => {
    item.addEventListener('click', (e) => {
        let category = e.target.closest('.filter-item').dataset.category;
        filterMeals(category);
    });
});

// Event listener for sorting
document.getElementById('selection').addEventListener('change', async (e) => {
    let meals = await fetchApi();
    let sortedMeals = sortMeals(meals.meals, e.target.value);
    displayMeals(sortedMeals);
});

// Function to display meals
let displayMeals = (meals) => {
    let con = document.getElementById('con');
    meals.shift(); // First item remove kar diya
    con.innerHTML = '';
    meals.forEach(meal => {
        con.innerHTML += getData(meal);
    });
};

// Fetch data and display meals
document.addEventListener('DOMContentLoaded', async () => {
    let meals = await fetchApi();
    displayMeals(meals.meals);
});




document.addEventListener("DOMContentLoaded", function () {
    const filterItems = document.querySelectorAll(".filter-item");

    filterItems.forEach(item => {
        item.addEventListener("click", function () {
            this.classList.toggle("active"); // Click karne se active class toggle hogi
        });
    });
});