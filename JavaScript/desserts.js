
// Function to show the page loader
let showPageLoader = () => {
  document.getElementById("page-loader").style.display = "flex";
};

// Function to hide the page loader
let hidePageLoader = () => {
  document.getElementById("page-loader").style.display = "none";
};




// Fetch all desserts from API
let fetchApi = async () => {
  showPageLoader();
  let response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
  let jsonData = await response.json();
  hidePageLoader()
  return jsonData.meals || [];
};

// Function to create a card
let getData = (dessert) => {
  return `
      <div class="card" data-rating="${dessert.rating || 0}">
            <div class="position-relative">
                <img src="${dessert.strMealThumb}" class="card-img-top" alt="${dessert.strMeal}">
                <div class="recipe-badge">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 14l9-5-9-5-9 5z'/%3E%3Cpath d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'/%3E%3C/svg%3E" alt="Beginner">
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
                <h5 class="recipe-title">${dessert.strMeal}</h5>
                <a href="detail-page.html?id=${dessert.idMeal}" class="anchor text-decoration-none">
                    <button class="btn-view">View Recipe</button>
                </a>
            </div>
        </div>
  `;
};

// Store selected filters
let selectedFilters = new Set();

// Function to display desserts based on filters
let displayCards = async () => {
  let container = document.getElementById('con');
  let data = await fetchApi();

  if (!data.length) {
    container.innerHTML = "<p>No desserts found.</p>";
    return;
  }

  // Apply multiple filters
  let filteredMeals = [...selectedFilters].length
    ? data.filter(dessert => [...selectedFilters].some(filter => dessert.strMeal.toLowerCase().includes(filter.toLowerCase())))
    : data;

  container.innerHTML = filteredMeals.map(getData).join("");
};

// Function to handle button clicks
let handleFilterClick = (event) => {
  let category = event.target.getAttribute("data-category");

  if (selectedFilters.has(category)) {
    selectedFilters.delete(category);
    event.target.classList.remove("active");
  } else {
    selectedFilters.add(category);
    event.target.classList.add("active");
  }

  displayCards();
};

// Function to populate filter buttons
let populateButtons = async () => {
  let buttonsContainer = document.querySelector('.filters-containerr');
  let data = await fetchApi();

  // Extract unique names (strMeal) dynamically from the fetched data
  let categories = ["All", ...new Set(data.map(dessert => dessert.strMeal))];  

  // Add filter buttons for each category
  buttonsContainer.innerHTML = categories.map(category => `
      <div class="filter-item btn-filter" data-category="${category}">
          <span class="filter-box"></span> 
          <span class="filter-label">${category}</span> 
      </div>
  `).join('');

  // Event listener for filter buttons
  buttonsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-filter")) {
      handleFilterClick(e);
    }
  });
};

// Initialize
(async () => {
  await populateButtons();
  await displayCards();
})();
