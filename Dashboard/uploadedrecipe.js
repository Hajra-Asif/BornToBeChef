import {
  db,
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
  auth,
  onAuthStateChanged,
  orderBy,
} from "../JavaScript/firebaseconfig.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.uid);
    fetchUserRecipes(user.uid);
  } else {
    console.log("User is not logged in");
    window.location.replace("/");
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
          <img src="${foodItems.imageUrl}" class="card-img-top" 
          alt="${foodItems.recipeName}">
          <div class="recipe-badge">
            <i class="fa-solid fa-pen text-light edit-btn" data-id="${
              foodItems.id
            }"></i>
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
            <span> ⏳ ${foodItems.prepTime || "N/A"} </span>
            <span> 🍽 ${foodItems.servingSize || "N/A"} </span>
            <span> 🎯 ${foodItems.level || "Beginner"} </span>
          </div>
          <a href="detail-page.html?id=${
            foodItems.id
          }" class="anchor text-decoration-none">
            <button class="btn-view">View Recipe</button>
          </a>
        </div>
      </div>
    </div>
  `;

  // Append new card to the container
  recipesContainer.innerHTML += cardHTML;

  // Add click event to the newly created edit button
  attachEditEvent();
}

// Function to attach event listeners to all edit buttons
function attachEditEvent() {
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const recipeId = this.getAttribute("data-id");
      console.log("Edit button clicked for Recipe ID:", recipeId);
      openEditModal(recipeId); // Call function to handle edit
    });
  });
}

// Function to handle edit action
function openEditModal(recipeId) {
  alert(`Editing Recipe ID: ${recipeId}`);
  // Implement your edit modal or form logic here
}

// //////////////////////////////////// EDIT FUNCTOINALITY
