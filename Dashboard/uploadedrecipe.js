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
  updateDoc,
  deleteDoc,
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
let editRecipeId;
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

let modal = document.getElementById("recipeModal");

function renderRecipe(foodItems) {
  const cardHTML = `
    <div class="col-12 col-lg-4">
      <div class="card" data-rating="${foodItems.rating || 0}">
        <div class="position-relative">
          <img src="${foodItems.imageUrl}" class="card-img-top" 
          alt="${foodItems.recipeName}">
         <div class="recipe-badge me-5">
            <i class="fa-solid fa-pen text-light edit-btn" data-id="${
              foodItems.id
            }"></i>
          </div>
          <div class="recipe-badge">
            <i class="fa-solid fa-trash text-light delete-btn" data-id="${
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
           
            <button class="btn-view" id="btn-view">View Recipe</button>
           
          </a>
        </div>
      </div>
    </div>
  `;

  recipesContainer.innerHTML += cardHTML;

  // Add click event to the newly created edit button
  attachEditEvent();
  attachDeleteEvent();
}

// Function to attach event listeners to all edit buttons
function attachEditEvent() {
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const recipeId = this.getAttribute("data-id");
      console.log("Edit button clicked for Recipe ID:", recipeId);
      editRecipeId = recipeId;
      openEditModal(recipeId);
    });
  });
}

function attachDeleteEvent() {
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const recipeId = this.getAttribute("data-id");
      console.log("Delete button clicked for Recipe ID:", recipeId);
      editRecipeId = recipeId;
      deleteRecipe();
    });
  });
}

// //////////////////////////////////// EDIT FUNCTOINALITY

async function openEditModal(recipeId) {
  console.log("Received Recipe ID:", recipeId);

  const recipeModal = new bootstrap.Modal(
    document.getElementById("recipeModal")
  );

  try {
    // Query for the document where 'id' field matches recipeId
    const recipesCollection = collection(db, "recipes");
    const q = query(recipesCollection, where("id", "==", recipeId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        console.log("Recipe Found:", doc.data());

        const recipeData = doc.data();

        document.getElementById("recipeName").value =
          recipeData.recipeName || "";
        document.getElementById("ingredients").value =
          recipeData.ingredients || "";
        document.getElementById("servingSize").value =
          recipeData.servingSize || "";
        document.getElementById("prepTime").value = recipeData.prepTime || "";
        document.getElementById("instructions").value =
          recipeData.instructions || "";
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

console.log("hi hello chal rha meinnnn");

//////////////////////////////////////////////////////////////////

// Handle save functionality

// Save Changes button ka event listener

// Recipe update karne ka function

// 🔥 **2. Save Changes to Firestore**

// 🔥 **2. Save Changes to Firestore**
async function saveRecipeChanges() {
  const recipeId = editRecipeId;

  // document
  //   .getElementById("saveRecipe")
  //   ?.getAttribute("data-id");

  console.log("recipeeeeeeeeeeeeeeeeeeeee", recipeId);
  if (!recipeId) {
    console.error("❌ No Recipe ID Found!");
    return;
  }
  // func here for uploading on storage || return url link

  const updatedData = {
    recipeName: document.getElementById("recipeName").value,
    ingredients: document.getElementById("ingredients").value,
    servingSize: document.getElementById("servingSize").value,
    prepTime: document.getElementById("prepTime").value,
    instructions: document.getElementById("instructions").value,
    // imageUrl: // return url id.
  };

  console.log("📝 Updating Recipe:", updatedData);

  try {
    const recipeColl = collection(db, "recipes");
    const q = query(recipeColl, where("id", "==", recipeId));
    const querySnapshot = await getDocs(q);

    const docRef = doc(db, "recipes", querySnapshot.docs[0].id);
    await updateDoc(docRef, updatedData);

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

async function deleteRecipe() {
  const recipeId = editRecipeId;

  // document
  //   .getElementById("saveRecipe")
  //   ?.getAttribute("data-id");

  console.log("recipeeeeeeeeeeeeeeeeeeeee", recipeId);
  if (!recipeId) {
    console.error("❌ No Recipe ID Found!");
    return;
  }

  console.log("📝 deleting Recipe:", recipeId);

  try {
    const recipeColl = collection(db, "recipes");
    const q = query(recipeColl, where("id", "==", recipeId));
    const querySnapshot = await getDocs(q);

    const docRef = doc(db, "recipes", querySnapshot.docs[0].id);
    await deleteDoc(docRef);

    console.log("✅ ");

    // Swal.fire({
    //   title: "Delete!",
    //   text: "Recipe has been deleted successfully.",
    //   icon: "success",
    //   timer: 2000,
    //   showConfirmButton: false,
    // });
    alert("Recipe deleted Successfully!");
  } catch (error) {
    console.error("🔥 Error deleting Recipe:", error);
  }
}
// // 🔥 **3. Event Listeners**
// document.addEventListener("click", function (event) {
//   if (event.target && event.target.id === "saveRecipe") {
//     event.preventDefault();
//     alert("🚀 Save Button Clicked!");
//     // saveRecipeChanges();
//   }
// });
document.getElementById("saveRecipe").addEventListener("click", (e) => {
  e.preventDefault();
  saveRecipeChanges();
});
document.getElementById("deleteRecipe").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("delete excute");
  // saveRecipeChanges();
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
