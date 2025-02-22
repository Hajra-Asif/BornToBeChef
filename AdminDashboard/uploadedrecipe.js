

import { db, getDocs, collection, query, where, onSnapshot, auth, onAuthStateChanged, orderBy } from "../JavaScript/firebaseconfig.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user.uid);
        fetchUserRecipes(user.uid);
    } else {
        console.log("User is not logged in");
   
        window.location.href = "/";
    }
});


const recipesContainer = document.getElementById("recipes-container");


function fetchUserRecipes(userId) {
    const q = query(
        collection(db, "recipes"), 
        where("userId", "==", userId),
        orderBy("createdAt", "desc") 
    );

    onSnapshot(q, (snapshot) => {
        recipesContainer.innerHTML = ""; 

        if (snapshot.empty) {
            recipesContainer.innerHTML = "<p>No recipes found.</p>";
            return;
        }

        snapshot.forEach((doc) => {
            const recipeData = doc.data();
            renderRecipe(recipeData);
        });
    });
}


function renderRecipe(foodItems) {
    const cardHTML = `
    <div class="col-12 col-lg-4">
      <div class="card" data-rating="${foodItems.rating || 0}">
        <div class="position-relative">
          <img src="${foodItems.imageUrl}" class="card-img-top" alt="${foodItems.recipeName}">
          <div class="recipe-badge">
            <i  class="fa-solid fa-pen text-light"></i>
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
          <h5 class="recipe-title">${foodItems.recipeName}</h5>
          <div class="recipe-info">
            <span>
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8 8 8-3.589 8-8-3.589-8-8-8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.37V7z'/%3E%3C/svg%3E" alt="Time"> ${foodItems.prepTime || "N/A"}
            </span>
            <span>
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E" alt="Servings"> ${foodItems.servingSize || "N/A"}
            </span>
            <span>
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 14l9-5-9-5-9 5 9 5z'/%3E%3Cpath d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'/%3E%3C/svg%3E" alt="Level"> ${foodItems.level || "Beginner"}
            </span>
          </div>
          <a href="detail-page.html?id=${foodItems.id}" class="anchor text-decoration-none">
            <button class="btn-view">View Recipe</button>
          </a>
        </div>
      </div>
    </div>
  `;

    recipesContainer.innerHTML += cardHTML;
}


// //////////////////////////////////// EDIT FUNCTOINALITY

