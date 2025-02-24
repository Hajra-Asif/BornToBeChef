import {
  db,
  getDocs,
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
  auth,
  onAuthStateChanged,
  orderBy,
updateDoc
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



let modal = document.getElementById("recipeModal")

function renderRecipe(foodItems) {
  const cardHTML = `
    <div class="col-12 col-lg-4">
      <div class="card" data-rating="${foodItems.rating || 0}">
        <div class="position-relative">
          <img src="${foodItems.imageUrl}" class="card-img-top" 
          alt="${foodItems.recipeName}">
          <div class="recipe-badge">
            <i class="fa-solid fa-pen text-light edit-btn" data-id="${foodItems.id}"></i>
         
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
       <button class="deleteRecipe" data-id="${recipeId}">Delete</button>


          <a href="detail-page.html?id=${foodItems.id}" class="anchor text-decoration-none">
           
            <button class="btn-view" id="btn-view">View Recipe</button>
          </a>
        </div>
      </div>
    </div>
  `;




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
      openEditModal(recipeId); 
    });
  });
}




// //////////////////////////////////// EDIT FUNCTOINALITY




async function openEditModal(recipeId) {
  console.log("Received Recipe ID:", recipeId);

  const recipeModal = new bootstrap.Modal(document.getElementById("recipeModal"));

  try {
  
    // Query for the document where 'id' field matches recipeId
    const recipesCollection = collection(db, "recipes");
    const q = query(recipesCollection, where("id", "==", recipeId)); 
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        console.log("Recipe Found:", doc.data()); 

        const recipeData = doc.data();

        document.getElementById("recipeName").value = recipeData.recipeName || "";
        document.getElementById("ingredients").value = recipeData.ingredients || "";
        document.getElementById("servingSize").value = recipeData.servingSize || "";
        document.getElementById("prepTime").value = recipeData.prepTime || "";
        document.getElementById("instructions").value = recipeData.instructions || "";
        // document.getElementById("instructions").value = recipeData.imageUrl || "";


        recipeModal.show();
      });
    } else {
      console.error("Recipe not found in Firestore!");
    }
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
}



console.log("hi hello chal rha meinnnn")




























//////////////////////////////////////////////////////////////////

// Handle save functionality


// Save Changes button ka event listener


// Recipe update karne ka function

// 🔥 **2. Save Changes to Firestore**

        // 🔥 **2. Save Changes to Firestore**
        async function saveRecipeChanges() {
          const recipeId = document.getElementById("btn-save").getAttribute("data-id");
console.log("recipeeeeeeeeeeeeeeeeeeeee", recipeId)
          if (!recipeId) {
              console.error("❌ No Recipe ID Found!");
              return;
          }

          const updatedData = {
              recipeName: document.getElementById("recipeName").value,
              ingredients: document.getElementById("ingredients").value,
              servingSize: document.getElementById("servingSize").value,
              prepTime: document.getElementById("prepTime").value,
              instructions: document.getElementById("instructions").value,
          };

          console.log("📝 Updating Recipe:", updatedData);

          try {
              const recipeRef = doc(db, "recipes", recipeId);
              await updateDoc(recipeRef, updatedData);

              console.log("✅ Recipe Updated Successfully!");

              Swal.fire({
                  title: "Updated!",
                  text: "Recipe has been updated successfully.",
                  icon: "success",
                  timer: 2000,
                  showConfirmButton: false,
              });

          } catch (error) {
              console.error("🔥 Error Updating Recipe:", error);
          }
      }

      // 🔥 **3. Event Listeners**
      document.addEventListener("click", function (event) {
        if (event.target && event.target.id === "btn-save") {
            console.log("🚀 Save Button Clicked!");
            saveRecipeChanges();
        }
    });
    

///////////////delete functionalityyyyy////////////////


document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("deleteRecipe")) {
      const recipeId = e.target.getAttribute("data-id");

      if (!recipeId) {
          console.error("❌ No Recipe ID Found!");
          return;
      }

      console.log("🗑️ Deleting Recipe ID:", recipeId);

      try {
          await deleteDoc(doc(db, "recipes", recipeId));
          console.log("✅ Recipe Deleted Successfully!");

          Swal.fire({
              title: "Deleted!",
              text: "Recipe has been deleted successfully.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
          });

          // 🔄 Refresh the recipes list
          fetchRecipes();  

      } catch (error) {
          console.error("🔥 Error Deleting Recipe:", error);
      }
  }
});

console.log(recipeId);
