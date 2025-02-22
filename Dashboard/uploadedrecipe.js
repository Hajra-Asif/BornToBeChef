

import { db, getDocs, collection, query, where, onSnapshot, auth, onAuthStateChanged, orderBy, doc, getDoc, updateDoc  } from "../JavaScript/firebaseconfig.js";


onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user.uid);
        fetchUserRecipes(user.uid);
    } else {
        console.log("User is not logged in");
        alert("Please log in to submit a recipe!");
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

        snapshot.forEach((docSnap) => {
            const recipeData = docSnap.data();
            recipeData.id = docSnap.id; 
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
           <i class="fa-solid fa-pen text-light edit-icon" data-id="${foodItems.id}"></i>
          </div>
        </div>
        <div class="card-body">
          <h5 class="recipe-title">${foodItems.recipeName}</h5>
          <div class="recipe-info">
            <span>⏳ ${foodItems.prepTime || "N/A"}</span>
            <span>🍽 ${foodItems.servingSize || "N/A"}</span>
            <span>⭐ ${foodItems.level || "Beginner"}</span>
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


// Function to handle the edit icon click
document.addEventListener('DOMContentLoaded', function() {
    // Event delegation for edit icons
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('edit-icon')) {
        const recipeId = e.target.getAttribute('data-id');
        openEditPopup(recipeId);
      }
    });
  
    
  
    // Close popup when clicking outside
    window.addEventListener('click', function(e) {
      if (e.target.classList.contains('edit-popup')) {
        closeEditPopup();
      }
    });
  // Close popup when clicking the close button
  document.querySelector('.close-btn').addEventListener('click', closeEditPopup);
    // Handle form submission
    document.getElementById('editRecipeForm').addEventListener('submit', function(e) {
      e.preventDefault();
      saveRecipe();
    });
  });
  
  function openEditPopup(recipeId) {
    // Get the recipe data (assuming you have the foodItems array available)
    const recipe = foodItems.find(item => item.id === recipeId);
    
    if (recipe) {
      // Populate the form with current values
      document.getElementById('recipeId').value = recipe.id;
      document.getElementById('recipeName').value = recipe.recipeName;
      document.getElementById('prepTime').value = recipe.prepTime;
      document.getElementById('servingSize').value = recipe.servingSize;
      document.getElementById('level').value = recipe.level;
      document.getElementById('imageUrl').value = recipe.imageUrl;
      
      // Show the popup
      document.getElementById('editPopup').style.display = 'block';
    }
  }
  
  function closeEditPopup() {
    document.getElementById('editPopup').style.display = 'none';
  }
  
  function saveRecipe() {
    // Get form values
    const recipeId = document.getElementById('recipeId').value;
    const updatedRecipe = {
      id: recipeId,
      recipeName: document.getElementById('recipeName').value,
      prepTime: document.getElementById('prepTime').value,
      servingSize: document.getElementById('servingSize').value,
      level: document.getElementById('level').value,
      imageUrl: document.getElementById('imageUrl').value
    };
  
    // Update the recipe in your data structure
    const index = foodItems.findIndex(item => item.id === recipeId);
    if (index !== -1) {
      foodItems[index] = { ...foodItems[index], ...updatedRecipe };
      
      // Update the card in the UI
      updateRecipeCard(updatedRecipe);
      
      // Close the popup
      closeEditPopup();
    }
  }
  
  function updateRecipeCard(recipe) {
    // Find and update the corresponding card in the DOM
    const card = document.querySelector(`[data-id="${recipe.id}"]`).closest('.card');
    if (card) {
      card.querySelector('.recipe-title').textContent = recipe.recipeName;
      card.querySelector('img').src = recipe.imageUrl;
      card.querySelector('img').alt = recipe.recipeName;
      
      const recipeInfo = card.querySelector('.recipe-info');
      recipeInfo.children[0].textContent = `⏳ ${recipe.prepTime || "N/A"}`;
      recipeInfo.children[1].textContent = `🍽 ${recipe.servingSize || "N/A"}`;
      recipeInfo.children[2].textContent = `⭐ ${recipe.level || "Beginner"}`;
    }
  }

