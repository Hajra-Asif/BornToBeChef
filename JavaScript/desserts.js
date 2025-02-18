// Fetch all desserts from API
let fetchApi = async () => {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
    let jsonData = await response.json();
    return jsonData.meals || [];
  };
  
  // Function to create a card
  let getData = (dessert) => {
    return `
        <div class="card" data-rating="${dessert.rating || 0}">
              <div class="position-relative">
                  <img src="${dessert.strMealThumb}" class="card-img-top" alt="${dessert.strMeal}">
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
                  <h5 class="recipe-title">${dessert.strMeal}</h5>
                  <a href="detail-page.html?id=${dessert.idMeal}" class="anchor text-decoration-none">
                      <button class="btn-view">View Recipe</button>
                  </a>
              </div>
          </div>
    `;
  };
  
  // Function to display desserts (filtered/sorted)
  let displayCards = async (filter = '', sortOrder = 'asc') => {
    let container = document.getElementById('con');
    let data = await fetchApi();
  
    if (!data.length) {
        container.innerHTML = "<p>No desserts found.</p>";
        return;
    }
  
    // Apply filter
    let filteredMeals = filter ? data.filter(dessert => dessert.strMeal === filter) : data;
  
    // Apply sorting
    if (sortOrder !== 'none') {
        filteredMeals.sort((a, b) => {
            return sortOrder === 'asc' 
                ? a.strMeal.localeCompare(b.strMeal)
                : b.strMeal.localeCompare(a.strMeal);
        });
    }
  
    container.innerHTML = filteredMeals.map(getData).join("");
  };
  
  // ⭐ Moved gfg function outside displayCards
  function gfg(event, n) {
    let card = event.target.closest('.card');
    let stars = card.getElementsByClassName('star');
  
    remove(stars);
    for (let i = 0; i < n; i++) {
        let cls = ["one", "two", "three", "four", "five"][n - 1];
        stars[i].classList.add(cls);
    }
    card.setAttribute('data-rating', n);
  }
  
  function remove(stars) {
    for (let i = 0; i < 5; i++) {
        stars[i].classList.remove("one", "two", "three", "four", "five");
    }
  }
  
  // Function to populate buttons dynamically
  let populateButtons = async () => {
    let buttonsContainer = document.querySelector('.buttons');
    let data = await fetchApi();
  
    buttonsContainer.innerHTML = `<button class="btn-filter" data-category="all">All Dishes</button>`;
  
    data.forEach(dessert => {
        let button = document.createElement("button");
        button.classList.add("btn-filter");
        button.innerText = dessert.strMeal;
        button.setAttribute("data-category", dessert.strMeal);
        buttonsContainer.appendChild(button);
    });
  
    buttonsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-filter")) {
            let selectedDessert = e.target.getAttribute("data-category");
            displayCards(selectedDessert === "all" ? "" : selectedDessert);
        }
    });
  };
  
  // Sorting event listener
  document.getElementById('selection').addEventListener('change', (e) => {
    displayCards('', e.target.value);
  });
  
  // Initialize
  (async () => {
    await populateButtons();
    await displayCards();
  })();
  