
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("show-sidebar");
}












document.addEventListener('DOMContentLoaded', function () {
    // CSS Variables getter function
    const getCssVar = (variable) => {
        return getComputedStyle(document.documentElement).getPropertyValue(`--${variable}`).trim();
    };

    // Initialize semi-donut animation with error handling
    const initializeSemiDonut = () => {
        try {
            const semiDonut = document.querySelector('.semi-donut-fill');
            if (semiDonut) {
                setTimeout(() => {
                    semiDonut.style.transform = 'rotate(130deg)';
                }, 500);
            }
        } catch (error) {
            console.warn('Semi-donut initialization failed:', error);
        }
    };

    // Handle order buttons
    const initializeOrderButtons = () => {
        try {
            const orderButtons = document.querySelectorAll('.order-btn');
            orderButtons.forEach(button => {
                button.addEventListener('mouseenter', () => {
                    button.style.backgroundColor = getCssVar('blue');
                    button.style.color = getCssVar('white');
                });
                button.addEventListener('mouseleave', () => {
                    button.style.backgroundColor = getCssVar('grey');
                    button.style.color = getCssVar('bodytext');
                });

                // Add click handler for orders
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const menuItem = button.closest('.daily-menu');
                    const menuName = menuItem.querySelector('.menu-name').textContent;
                    const menuPrice = menuItem.querySelector('.menu-price').textContent;

                    // Show order confirmation
                    showNotification(`Order placed: ${menuName} - ${menuPrice}`);
                });
            });
        } catch (error) {
            console.warn('Order buttons initialization failed:', error);
        }
    };

    // Best seller items interactions
    const initializeBestSellerItems = () => {
        try {
            const bestSellerItems = document.querySelectorAll('.best-seller-item');
            bestSellerItems.forEach(item => {
                item.style.transition = 'all 0.3s ease';

                item.addEventListener('mouseenter', () => {
                    item.style.transform = 'scale(1.05)';
                    item.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                });

                item.addEventListener('mouseleave', () => {
                    item.style.transform = 'scale(1)';
                    item.style.boxShadow = 'none';
                });

                // Add click handler to show details
                item.addEventListener('click', () => {
                    showItemDetails(item);
                });
            });
        } catch (error) {
            console.warn('Best seller items initialization failed:', error);
        }
    };

    // Menu item statistics update
    const initializeMenuStats = () => {
        try {
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                const progressBar = item.querySelector('.progress-bar');
                const totalSales = item.querySelector('.menu-stats span');

                // Animate progress bars on scroll
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && progressBar) {
                            const width = progressBar.style.width;
                            progressBar.style.width = '0%';
                            setTimeout(() => {
                                progressBar.style.transition = 'width 1s ease-in-out';
                                progressBar.style.width = width;
                            }, 100);
                        }
                    });
                });

                observer.observe(item);
            });
        } catch (error) {
            console.warn('Menu stats initialization failed:', error);
        }
    };

    // Notification system
    const showNotification = (message) => {
        try {
            // Create notification element if it doesn't exist
            let notification = document.getElementById('dashboard-notification');
            if (!notification) {
                notification = document.createElement('div');
                notification.id = 'dashboard-notification';
                notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${getCssVar('blue')};
            color: ${getCssVar('white')};
            padding: 15px 25px;
            border-radius: 8px;
            z-index: 1000;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        `;
                document.body.appendChild(notification);
            }

            // Show notification
            notification.textContent = message;
            notification.style.transform = 'translateX(0)';

            // Hide after 3 seconds
            setTimeout(() => {
                notification.style.transform = 'translateX(120%)';
            }, 3000);
        } catch (error) {
            console.warn('Notification display failed:', error);
        }
    };

    // Show item details modal
    const showItemDetails = (item) => {
        try {
            const modal = document.createElement('div');
            modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${getCssVar('white')};
        padding: 20px;
        border-radius: 15px;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        max-width: 90%;
        width: 400px;
    `;

            const overlay = document.createElement('div');
            overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 999;
    `;

            // Close modal on overlay click
            overlay.addEventListener('click', () => {
                document.body.removeChild(modal);
                document.body.removeChild(overlay);
            });

            document.body.appendChild(overlay);
            document.body.appendChild(modal);
        } catch (error) {
            console.warn('Modal display failed:', error);
        }
    };

    // Initialize all features
    const initializeAll = () => {
        initializeSemiDonut();
        initializeOrderButtons();
        initializeBestSellerItems();
        initializeMenuStats();
    };

    // Run initialization
    initializeAll();

    // Add window resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initializeAll();
        }, 250);
    });
});


// dashboard

let profilename = document.getElementById("profilename").innerHTML;

// cards

let fetchApi = async () => {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken');
    let jsonData = await response.json();
    return jsonData.meals || [];
};


// Generate HTML for Each Meal Card
function getData(foodItems) {
    return `
        <div class="col-12 col-lg-4">
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

    container.innerHTML = data.slice(9, 17).map(getData).join('');
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


//   recent uploaded 

async function fetchRecipes() {
    const container = document.querySelector('.sidebar-recipes');
    container.innerHTML = "<h2></h2><p>Loading...</p>";

    try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken");
        const { meals } = await res.json();
        container.innerHTML = "<h2>Recently Uploaded</h2>";

        meals.slice(14, 18).forEach(({ strMeal, strMealThumb, idMeal }) => {
            container.innerHTML += `
                <div class="horizontal-recipe-card">
                    <img src="${strMealThumb}" class="h-card-img" alt="${strMeal}">
                    <div class="h-card-content">
                         <h4 class="h-recipe-title">${strMeal}</h4>
                         <div class="cardd">
                      <span onclick="gfg(event, 1)" class="star">★</span>
                      <span onclick="gfg(event, 2)" class="star">★</span>
                      <span onclick="gfg(event, 3)" class="star">★</span>
                      <span onclick="gfg(event, 4)" class="star">★</span>
                      <span onclick="gfg(event, 5)" class="star">★</span>
                  </div>
                   <a href="detail-page.html?id=${idMeal}" class="anchor text-decoration-none">
            <button class="btn-view sidebtn">View Recipe</button>
                    </div>
                </div>`;
        });

    } catch (error) {
        container.innerHTML = "<p>Failed to load recipes. Try again later.</p>";
    }
}

function viewRecipe(id) {
    window.open(`https://www.themealdb.com/meal/${id}, "_blank"`);
}

document.addEventListener("DOMContentLoaded", fetchRecipes);

// Keep your existing rating function
function gfg(e, rating) {
    const stars = e.target.parentElement.getElementsByClassName("h-star");
    const card = e.target.closest('.horizontal-recipe-card');

    // Update data-rating attribute
    card.dataset.rating = rating;

    // Update stars display
    for (let i = 0; i < stars.length; i++) {
        if (i < rating) {
            stars[i].style.color = "#FFB800";
        } else {
            stars[i].style.color = "#ccc";
        }
    }
}


// piechart

const ctx = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Chicken Fajita Mac and Cheese', 'Chicken Enchilada Casserole', 'Chicken Handi'],
        datasets: [{
            data: [78, 26, 17], // Yeh percentage values hain
            backgroundColor: ['#384c6b', '#e28a2b', '#859bba'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});









document.addEventListener('DOMContentLoaded', function () {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    function toggleSidebar() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    sidebarToggle.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);
});


// myrecipe

