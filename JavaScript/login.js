import {
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile
} from "./firebaseconfig.js";



onAuthStateChanged(auth, (user) => {
  console.log("Auth State Changed Triggered:", user);
  if (user) {
    console.log("User is logged in:", user);
  } else {
    console.log("User is logged out");
  }
});

// signInWithEmailAndPassword

// const login = async (e) => {
//   e.preventDefault();

//   const email = document.getElementById("login-email").value;
//   const password = document.getElementById("login-password").value;

//   try {
//     let userCredential = await signInWithEmailAndPassword(auth, email, password);
//     let user = userCredential.user;
//     let useremail = user.email;
//     let userNamee = user.displayName || useremail.split("@")[0];


//     console.log("User logged in successfully:", user);

//     if (user) {
//       document.getElementById("authentication")?.remove();
//       document.getElementById("loginmodal")?.remove();
//       document.getElementById("profileTrigger").style.display = "block";


//       document.getElementById("useraplha").innerHTML = useremail.slice(0, 1).toUpperCase();
//       document.getElementById("profileTrigger").innerHTML = useremail.slice(0, 1).toUpperCase();
//       document.getElementById("userEmail").innerHTML = useremail;
//       document.getElementById("userName").innerHTML = `Hi, ${userNamee}`;

//     }
//   } catch (error) {
//     console.error("Login failed:", error.code, error.message);
//   }
// };
const login = async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  // ✅ UI Reset
  document.getElementById("login-email").style.border = "";
  document.getElementById("login-password").style.border = "";
  document.getElementById("loginError").innerText = "";
  document.getElementById("loginError").style.display = "none";

  // ✅ Input Validation
  if (!email || !password) {
      document.getElementById("login-email").style.border = "2px solid crimson";
      document.getElementById("login-password").style.border = "2px solid crimson";
      document.getElementById("loginError").innerText = "Email and password are required.";
      document.getElementById("loginError").style.display = "block";
      return;
  }

  try {
      let userCredential = await signInWithEmailAndPassword(auth, email, password);
      let user = userCredential.user;
      let useremail = user.email;
      let userNamee = user.displayName || useremail.split("@")[0];

      console.log("User logged in successfully:", user);

      if (user) {
          // ✅ UI Update on Success
          document.getElementById("authentication")?.remove();
          document.getElementById("loginmodal")?.remove();
          document.getElementById("profileTrigger").style.display = "block";
          document.getElementById("useraplha").innerHTML = useremail.slice(0, 1).toUpperCase();
          document.getElementById("profileTrigger").innerHTML = useremail.slice(0, 1).toUpperCase();
          document.getElementById("userEmail").innerHTML = useremail;
          document.getElementById("userName").innerHTML = `Hi, ${userNamee}`;
      }
  } catch (error) {
      console.error("Login failed:", error.code, error.message);

      document.getElementById("login-email").style.border = "2px solid crimson";
      document.getElementById("login-password").style.border = "2px solid crimson";
      document.getElementById("loginError").innerText = "Invalid username or password.";
      document.getElementById("loginError").style.display = "block";
  }
};

// ✅ Event Listener
document.getElementById("login-btn")?.addEventListener("click", login);

// document.getElementById("login")?.addEventListener("click", login);

// logout

let logout = () => {
  signOut(auth);
  window.location.replace("/");
};

document.getElementById("signout")?.addEventListener("click", logout);




// profile image

document.getElementById('profileTrigger').addEventListener('click', function () {
  document.getElementById('popupContainer').style.display = 'block';
});


document.getElementById('manageAccountBtn').addEventListener('click', function () {
  window.location.href = '/dashboard';  // Replace with your dashboard URL
});

// Close popup when clicking outside
window.addEventListener('click', function (e) {
  const popup = document.getElementById('popupContainer');
  const trigger = document.getElementById('profileTrigger');
  if (!popup.contains(e.target) && !trigger.contains(e.target)) {
    popup.style.display = 'none';
  }
});




// forgot password

let forgotpswd = async () => {
  try {
    const email = document.getElementById("login-email").value;
    let resetpswd = await sendPasswordResetEmail(auth, email);
    console.log("aagaya apkay email pe");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
  }
};

document.getElementById("forgotpswd")?.addEventListener("click", forgotpswd);


