
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
      fetchUserrRecipes(user.uid);
    } else {
      console.log("User is not logged in");
      window.location.replace("/");
    }
  });
  
  const  recipesDetailContainer = document.getElementById("con");
  let ViewRecipeId;
  function fetchUserrRecipes(userId) {
    const q = query(
      collection(db, "recipes"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
  
    onSnapshot(q, (snapshot) => {
      recipesDetailContainer.innerHTML = "";
  
      if (snapshot.empty) {
        recipesDetailContainer.innerHTML = "<p>No recipes found.</p>";
        return;
      }
  
      snapshot.forEach((doc) => {
        const recipedeatilData = doc.data();
        displayData(recipedeatilData);
      });
    });
  }