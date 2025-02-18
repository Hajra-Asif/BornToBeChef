
let fetchApi = async () => {
    let fetchh = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s');
    let jsonData = await fetchh.json();
    return jsonData;
}

let getData = (foodItems) => {
    return `
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
                <a href="detail-page.html?id=${foodItems.idMeal}" class="anchor text-decoration-none">
                    <button class="btn-view">View Recipe</button>
                </a>
            </div>
        </div>
    `;
}

// Display function with category filtering
let displayy = async (category = "all", sortBy = "asc") => {
    let elem = document.getElementById('con');
    let gett = await fetchApi();
    
    // Filter meals by category
    let filteredMeals = gett.meals.filter(foodItem => {
        return category === "all" || foodItem.strCategory === category;
    });

    // Sort meals based on selection
    if (sortBy === "asc") {
        filteredMeals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
    } else if (sortBy === "desc") {
        filteredMeals.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
    } else if (sortBy === "rating") {
        filteredMeals.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    let mapp = filteredMeals.map(foodItems => getData(foodItems));
    let providerr = await Promise.all(mapp);
    
    elem.innerHTML = providerr.join("");
}

// Button Click Event for Category Filter
let filterButtons = document.querySelectorAll('.btn-filter');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        let category = button.getAttribute('data-category');
        displayy(category);
    });
});

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

// Sorting Dropdown Change Event
document.getElementById('selection').addEventListener('change', (event) => {
    let sortBy = event.target.value;
    let category = document.querySelector('.btn-filter.active')?.getAttribute('data-category') || 'all';
    displayy(category, sortBy);
});

// Initial Display (All Dishes)
displayy();

// Button to set active class for the filter
filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});