import {
  db,
  collection,
  addDoc,
  setDoc,
  getDoc,
  doc,
  auth,
  onAuthStateChanged,
  onSnapshot,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
} from "../JavaScript/firebaseconfig.js";

let firstname = document.getElementById("first-name");
let lastname = document.getElementById("last-name");
let address = document.getElementById("address");
let contact = document.getElementById("contact-number");
let email = document.getElementById("email");
let userId = "";
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.uid);

    fetchProfileData(user.uid);
  } else {
    console.log("User is not logged in");
    alert("Please log in to submit a recipe!");
    window.location.replace("/");
  }
});
// Handle image upload
document.getElementById("imageUpload").addEventListener("change", function (e) {
  if (e.target.files && e.target.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("profileImage").src = e.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  }
});

// Handle edit functionality
document.querySelectorAll(".edit-icon").forEach((icon) => {
  icon.addEventListener("click", function () {
    const field = this.closest(".profile-field");
    field.classList.add("active");
  });
});

// Handle save functionality
document.querySelectorAll(".save-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const field = this.closest(".profile-field");
    const valueText = field.querySelector(".value-text");
    const input = field.querySelector(".field-input");

    valueText.textContent = input.value;
    field.classList.remove("active");

    // Here you would typically send the update to your backend
    console.log(`Updating ${field.dataset.field} to: ${input.value}`);
  });
});

document.querySelector(".btn-save").addEventListener("click", async function () {
  
  const user = auth.currentUser; // Logged-in user
  if (!user) {
    console.error("User not logged in!");
    return;
  }

  const userID = user.uid; // Firebase Auth se User ID lena

  const profileData = {
    firstName: document.querySelector('[data-field="firstName"] .field-input')
      .value,
    lastName: document.querySelector('[data-field="lastName"] .field-input')
      .value,
    email: document.querySelector('[data-field="email"] .field-input').value,
    address: document.querySelector('[data-field="address"] .field-input')
      .value,
    contact: document.querySelector('[data-field="contact"] .field-input')
      .value,
  };

  console.log(profileData, "profile data.");

  const userProfileRef = collection(db, "users");

  console.log(userID, "user id---");
  const q = query(userProfileRef, where("uid", "==", userID));

  try {
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs[0], "querySnapshot.docs");
    if (!querySnapshot.empty) {
      const docRef = doc(db, "users", querySnapshot.docs[0].id);
      await updateDoc(docRef, profileData);
      console.log("Profile updated successfully.");
      Swal.fire({
        title: "Profile Updated!",
        text: "Your profile has been successfully saved.",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        window.location.href = "./profile.html";
      }, 3000);
    } else {
      console.log("No profile found for this user.");
    }
  } catch (error) {
    console.error("Error updating profile data:", error);
  }
});


async function fetchProfileData(uid) {
  console.log("func run");
  if (!uid) {
    console.error("User UID is required.");
    return;
  }

  const userProfileRef = collection(db, "users");
  const q = query(userProfileRef, where("uid", "==", uid));

  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const profileData = querySnapshot.docs[0].data();
      console.log(profileData, "profile data");

      updateProfileUI(profileData);
    } else {
      console.log("No profile found for this user.");
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
}

function updateProfileUI(profileData) {
  document.querySelector('[data-field="firstName"] .field-input').value =
    profileData.firstName;
  document.querySelector('[data-field="lastName"] .field-input').value =
    profileData.lastName;
  document.querySelector('[data-field="email"] .field-input').value =
    profileData.email;
  document.querySelector('[data-field="address"] .field-input').value =
    profileData.address;
  document.querySelector('[data-field="contact"] .field-input').value =
    profileData.contact;

  firstname.innerHTML = profileData.firstName;
  lastname.innerHTML = profileData.lastName;
  email.innerHTML = profileData.email;
  address.innerHTML = profileData.address;
  contact.innerHTML = profileData.contact;
}
