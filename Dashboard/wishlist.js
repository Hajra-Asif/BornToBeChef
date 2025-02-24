// import { auth, db, collection, getDocs, query, where, addDoc, deleteDoc, doc, onAuthStateChanged } from "../JavaScript/firebaseconfig.js";

// // ✅ Check User Authentication
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         const userId = user.uid;
//         console.log("Logged in User ID:", userId);

//         // Load wishlist on page load
//         fetchWishlist(userId);

//         document.addEventListener('click', function (event) {
//             const heartIcon = event.target.closest('#heartIcon');
//             if (heartIcon) {
//                 alert("clickedddddddd");
//                 const recipeId = heartIcon.getAttribute('data-recipe-id');
//                 const recipeName = heartIcon.getAttribute('data-recipe-name') || "Unknown Recipe";
//                 const recipeImage = heartIcon.getAttribute('data-recipe-image') || "";
//                 const recipeDescription = heartIcon.getAttribute('data-recipe-description') || "No description";

//                 if (recipeId) {
//                     console.log("Recipe ID to Add:", recipeId);
//                     addToWishlist(userId, {
//                         id: recipeId, name: recipeName, image: recipeImage, description: recipeDescription
//                     });
//                 } else {
//                     console.error("Recipe ID not found!",recipeId);
//                 }
//             }
//         });
//     } else {
//         console.log("No user is logged in");
//     }
// });

// // ✅ Add to Wishlist
// const addToWishlist = async (userId, recipe) => {
//     const wishlistRef = collection(db, 'wishlist');
//     const q = query(wishlistRef, where('userId', '==', userId), where('recipId', '==', recipe.id.toString()));

//     const querySnapshot = await getDocs(q);

//     if (querySnapshot.empty) {
//         await addDoc(wishlistRef, {
//             recipId: recipe.id.toString(),
//             userId: userId,
//             name: recipe.name,
//             image: recipe.image,
//             description: recipe.description
//         });
//         console.log("Recipe added to wishlist!");
//     } else {
//         console.log("Recipe is already in the wishlist.");
//     }
//     fetchWishlist(userId);
// };

// // ✅ Fetch Wishlist
// async function fetchWishlist(userId) {
//     const wishlistContainer = document.getElementById('wishlist-container');
//     if (!wishlistContainer) {
//         console.error('No element with ID "wishlist-container" found!');
//         return;
//     }
//     const wishlistRef = collection(db, 'wishlist');
//     const q = query(wishlistRef, where('userId', '==', userId));

//     const wishlistSnapshot = await getDocs(q);
//     let wishlistIds = [];
//     wishlistSnapshot.forEach(docSnapshot => {
//         const recipId = docSnapshot.data().recipId;
//         wishlistIds.push(recipId.toString());
//         console.log("Each Recipe ID:", recipId);
//     });

//     console.log("Wishlist Recipe IDs:", wishlistIds);
    
//     let allRecipes = [];
//     try {
//         let response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken');
//         let data = await response.json();
//         allRecipes = data.meals;
//     } catch (error) {
//         console.error('Error fetching recipes from API:', error);
//         return;
//     }

//     console.log("All Recipes from API:", allRecipes);
//     let wishlistRecipes = allRecipes.filter(recipe => wishlistIds.includes(recipe.idMeal.toString()));

//     wishlistContainer.innerHTML = ''; 

//     if (wishlistRecipes.length === 0) {
//         console.log("No items found in wishlist for this user.");
//         wishlistContainer.innerHTML = "<p>No items in your wishlist.</p>";
//     } else {
//         wishlistRecipes.forEach(recipe => {
//             wishlistContainer.innerHTML += `
//                 <div class="col-md-4 mb-4" id="wishlist-card-${recipe.id}">
//                     <div class="card h-100 shadow-sm border-0">
//                         <img class="card-img-top" src="${recipe.image}" alt="${recipe.name}" style="height: 200px; object-fit: cover;">
//                         <div class="card-body">
//                             <h5 class="card-title text-truncate">${recipe.name}</h5>
//                             <p class="card-text text-muted small">${recipe.description}</p>
//                         </div>
//                         <div class="card-footer bg-white border-0 text-center">
//                             <button class="btn btn-outline-danger remove-wishlist" data-recipe-id="${recipe.id}">
//                                 <i class="bi bi-heartbreak"></i> Remove from Wishlist
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             `;
//         });

//         // ✅ Remove from Wishlist
//         document.querySelectorAll('.remove-wishlist').forEach(button => {
//             button.addEventListener('click', function() {
//                 const recipeId = this.getAttribute('data-recipe-id');
//                 removeFromWishlist(userId, recipeId);
//             });
//         });
//     }
// }

// // ✅ Remove from Wishlist
// const removeFromWishlist = async (userId, recipeId) => {
//     console.log("Recipe ID to Remove:", recipeId);

//     const wishlistRef = collection(db, 'wishlist');
//     const q = query(wishlistRef, where('userId', '==', userId), where('recipId', '==', recipeId));

//     const querySnapshot = await getDocs(q);

//     console.log("Query Result Size:", querySnapshot.size);

//     if (!querySnapshot.empty) {
//         querySnapshot.forEach(async (docSnapshot) => {
//             console.log("Deleting Document ID:", docSnapshot.id);
//             await deleteDoc(doc(db, 'wishlist', docSnapshot.id));
//             console.log("Recipe removed from wishlist:", recipeId);
//         });

//         // ✅ Remove from UI
//         const itemToRemove = document.getElementById(`wishlist-card-${recipeId}`);
//         if (itemToRemove) {
//             itemToRemove.remove();
//         }
    
//     } else {
//         console.log("Recipe not found in wishlist.");
//     }
// };



import { auth, db, collection, getDocs, query, where, addDoc, deleteDoc, doc, onAuthStateChanged } from "../JavaScript/firebaseconfig.js";

// ✅ Check User Authentication
onAuthStateChanged(auth, (user) => {
    if (user) {
        const userId = user.uid;
        console.log("Logged in User ID:", userId);

        // Load wishlist on page load
        fetchWishlist(userId);

        document.body.addEventListener('click', function (event) {
            const heartIcon = event.target.closest('.fa-share');
            if (heartIcon) {
                const recipeId = heartIcon.getAttribute('data-recipe-id');
                if (recipeId) {
                    if (heartIcon.classList.contains('added-to-wishlist')) {
                        removeFromWishlist(userId, recipeId);
                        heartIcon.classList.remove('added-to-wishlist');
                        heartIcon.style.color = ''; // Reset icon color
                    } else {
                        fetchRecipeById(recipeId, userId, heartIcon);
                    }
                } else {
                    console.error("Recipe ID not found!", recipeId);
                }
            }
        });
    } else {
        console.log("No user is logged in");
    }
});

// ✅ Fetch Recipe Details by ID
async function fetchRecipeById(recipeId, userId, heartIcon) {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        let data = await response.json();
        let meal = data.meals ? data.meals[0] : null;
console.log(meal,"mein yahn honnnnnnnnnnnnnnnn")
        if (meal) {
            const recipe = {
                idMeal: meal.idMeal,
                name: meal.strMeal,
                image: meal.strMealThumb,
                description: meal.strInstructions.slice(0, 100) + "..." // Short description
            };

            addToWishlist(userId, recipe);
            heartIcon.classList.add('added-to-wishlist');
            heartIcon.style.color = 'red'; // Change icon color when added
        } else {
            console.error("Recipe not found in API.");
        }
    } catch (error) {
        console.error("Error fetching recipe:", error);
    }
}

// ✅ Add to Wishlist
const addToWishlist = async (userId, recipe) => {
    const wishlistRef = collection(db, 'wishlist');
    const q = query(wishlistRef, where('userId', '==', userId), where('idMeal', '==', recipe.idMeal));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        await addDoc(wishlistRef, {
            idMeal: recipe.idMeal,
            userId: userId,
            name: recipe.name,
            image: recipe.image,
            description: recipe.description
        });
        console.log("Recipe added to wishlist!");
    } else {
        console.log("Recipe is already in the wishlist.");
    }
    fetchWishlist(userId);
};

// ✅ Fetch Wishlist
async function fetchWishlist(userId) {
    const wishlistContainer = document.getElementById('wishlist-container');
    if (!wishlistContainer) {
        console.error('No element with ID "wishlist-container" found!');
        return;
    }
    
    const wishlistRef = collection(db, 'wishlist');
    const q = query(wishlistRef, where('userId', '==', userId));

    const wishlistSnapshot = await getDocs(q);
    let wishlistIds = [];
    wishlistSnapshot.forEach(docSnapshot => {
        const idMeal = docSnapshot.data().idMeal;
        wishlistIds.push(idMeal);
    });

    console.log("Wishlist Recipe IDs:", wishlistIds);
    
    let allRecipes = [
        {
            idMeal :  "53085",
        strMeal :  "15-minute chicken & halloumi burgers",
        strMealThumb : "https://www.themealdb.com/images/media/meals/vdwloy171322"}];
    try {
        let response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken');
        let data = await response.json();
        allRecipes = data.meals;
    } catch (error) {
        console.error('Error fetching recipes from API:', error);
        return;
    }

    console.log("All Recipes from API:", allRecipes);
    let wishlistRecipes = allRecipes.filter(recipe => wishlistIds.includes(recipe.idMeal));

    wishlistContainer.innerHTML = ''; 

    if (wishlistRecipes.length === 0) {
        console.log("No items found in wishlist for this user.");
        wishlistContainer.innerHTML = "<p>No items in your wishlist.</p>";
    } else {
        wishlistRecipes.forEach(recipe => {
            wishlistContainer.innerHTML += `
                <div class="col-md-4 mb-4" id="wishlist-card-${recipe.idMeal}">
                    <div class="card h-100 shadow-sm border-0">
                        <img class="card-img-top" src="${recipe.image}" alt="${recipe.name}" style="height: 200px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title text-truncate">${recipe.name}</h5>
                            <p class="card-text text-muted small">${recipe.description}</p>
                        </div>
                        <div class="card-footer bg-white border-0 text-center">
                            <button class="btn btn-outline-danger remove-wishlist" data-recipe-id="${recipe.idMeal}">
                                <i class="bi bi-heartbreak"></i> Remove from Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        // ✅ Remove from Wishlist
        document.querySelectorAll('.remove-wishlist').forEach(button => {
            button.addEventListener('click', function() {
                const recipeId = this.getAttribute('data-recipe-id');
                removeFromWishlist(userId, recipeId);
            });
        });
    }
}

// ✅ Remove from Wishlist
const removeFromWishlist = async (userId, recipeId) => {
    console.log("Recipe ID to Remove:", recipeId);

    const wishlistRef = collection(db, 'wishlist');
    const q = query(wishlistRef, where('userId', '==', userId), where('idMeal', '==', recipeId));

    const querySnapshot = await getDocs(q);

    console.log("Query Result Size:", querySnapshot.size);

    if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnapshot) => {
            console.log("Deleting Document ID:", docSnapshot.id);
            await deleteDoc(doc(db, 'wishlist', docSnapshot.id));
            console.log("Recipe removed from wishlist:", recipeId);
        });

        // ✅ Remove from UI
        const itemToRemove = document.getElementById(`wishlist-card-${recipeId}`);
        if (itemToRemove) {
            itemToRemove.remove();
        }
    } else {
        console.log("Recipe not found in wishlist.");
    }
};
