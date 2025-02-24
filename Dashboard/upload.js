import {
  db,
  collection,
  addDoc,
  auth,
  onAuthStateChanged,
  serverTimestamp,
} from "../JavaScript/firebaseconfig.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.uid);
  } else {
    console.log("User is not logged in");
    alert("Please log in to submit a recipe!");
    window.location.replace("/");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("recipe-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const recipeName = document.getElementById("recipe-name").value;
    const ingredients = document.getElementById("ingredients").value;
    const servingSize = document.getElementById("serving-size").value;
    const prepTime = document.getElementById("prep-time").value;
    const instructions = document.getElementById("instructions").value;
    const file = document.getElementById("imageInput").files[0];

    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to submit a recipe!");
      return;
    }

    let imageUrl = "";

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Food-fiesta");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/duo0iqvpr/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (data.secure_url) {
          imageUrl = data.secure_url;
        } else {
          console.error("Image upload failed:", data);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    try {
      const docRef = await addDoc(collection(db, "recipes"), {
        userId: user.uid,
        recipeName,
        ingredients,
        servingSize,
        prepTime,
        instructions,
        id: user.uid,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      console.log("Recipe added with ID:", docRef.id);

      Swal.fire({
        title: "Recipe Updated!",
        text: "Your recipe has been successfully added.",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        window.location.href = "./recipe.html";
      }, 3000);

      form.reset();
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  });
});
