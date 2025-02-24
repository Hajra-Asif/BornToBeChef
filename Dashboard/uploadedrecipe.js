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
          <a href="detail-page.html?id=${foodItems.id}" class="anchor text-decoration-none">
            <button class="btn-view">View Recipe</button>
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

// Function to handle edit action
// async function openEditModal(recipeId) {
//   const recipeModal = new bootstrap.Modal(document.getElementById("recipeModal"));
//   recipeModal.show();

//   // document.getElementById("recipeName").value = `Recipe #${recipes.recipeName}`;/

//   const recipeData = {
//     recipeName: document.getElementById("recipeName").value,
//     ingredients: document.getElementById("ingredients").value,
//     servingSize: document.getElementById("servingSize").value,
//     prepTime: document.getElementById("prepTime").value,
//     instructions: document.getElementById("instructions").value,
//     fileUpload: document.getElementById("fileUpload").value,
 
//   };

//   console.log(recipeData, "recipe data.");


//   // document.getElementById("ingredients").value = `Ingredients for Recipe #${recipeId}`;

//   const userID = user.uid;
//   const recipeRef = collection(db, "recipes");
//   console.log(recipeId, "recipe id");
  
//   const q = query(recipeRef, where("uid", "==", userID));
  
//       try {
//         const querySnapshot = await getDocs(q);
//         console.log(querySnapshot.docs[0], "querySnapshot.docs");
//         if (!querySnapshot.empty) {
//           const docRef = doc(db, "recipes", querySnapshot.docs[0].id);
//           await updateDoc(docRef, recipeData);
//           console.log("Profile updated successfully.");
//           Swal.fire({
//             title: "Profile Updated!",
//             text: "Your profile has been successfully saved.",
//             icon: "success",
//             timer: 3000,
//             showConfirmButton: false,
//           });
  
//           setTimeout(() => {
//             window.location.href = "./recipe.html";
//           }, 3000);
//         } else {
//           console.log("No profile found for this user.");
//         }
//       } catch (error) {
//         console.error("Error updating profile data:", error);
//       };


// }


// //////////////////////////////////// EDIT FUNCTOINALITY


async function openEditModal(recipeId) {
  console.log("Received Recipe ID:", recipeId); 

  const recipeModal = new bootstrap.Modal(document.getElementById("recipeModal"));

  try {
    // Firestore se recipe fetch karein
    const recipeRef = doc(db, "recipes", recipeId);
    console.log("Firestore Doc Ref:", recipeRef.path); //


    

    const recipeSnap = await getDoc(recipeRef);

    if (recipeSnap.exists()) {
      console.log("Recipe Found:", recipeSnap.data()); 

      const recipeData = recipeSnap.data();

      // Input fields ko update karein
      document.getElementById("recipeName").value = recipeData.recipeName || "";
      document.getElementById("ingredients").value = recipeData.ingredients || "";
      document.getElementById("servingSize").value = recipeData.servingSize || "";
      document.getElementById("prepTime").value = recipeData.prepTime || "";
      document.getElementById("instructions").value = recipeData.instructions || "";

      recipeModal.show();
    } else {
      console.error("Recipe not found in Firestore!");
    }
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
}
