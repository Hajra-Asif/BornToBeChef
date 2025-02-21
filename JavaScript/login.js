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

const login = async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    let userCredential = await signInWithEmailAndPassword(auth, email, password);
    let user = userCredential.user;
    let useremail = user.email;
    // let userNamee = user.displayName || "user"
    let userNamee = user.displayName || useremail.split("@")[0]; 

    
    console.log("User logged in successfully:", user);
    
    if (user) {
      document.getElementById("authentication")?.remove();
      document.getElementById("loginmodal")?.remove();
      document.getElementById("profileTrigger").style.display = "block";
      

      document.getElementById("useraplha").innerHTML = useremail.slice(0,1).toUpperCase();
      document.getElementById("profileTrigger").innerHTML = useremail.slice(0,1).toUpperCase();
      document.getElementById("userEmail").innerHTML = useremail;
      document.getElementById("userName").innerHTML = `Hi, ${userNamee}`;

    }
  } catch (error) {
    console.error("Login failed:", error.code, error.message);
  }
};

document.getElementById("login")?.addEventListener("click", login);


// profile image

document.getElementById('profileTrigger').addEventListener('click', function() {
  document.getElementById('popupContainer').style.display = 'block';
});

document.getElementById('closeBtn').addEventListener('click', function() {
  document.getElementById('popupContainer').style.display = 'none';
});

document.getElementById('manageAccountBtn').addEventListener('click', function() {
  window.location.href = '/dashboard';  // Replace with your dashboard URL
});

// Close popup when clicking outside
window.addEventListener('click', function(e) {
  const popup = document.getElementById('popupContainer');
  const trigger = document.getElementById('profileTrigger');
  if (!popup.contains(e.target) && !trigger.contains(e.target)) {
      popup.style.display = 'none';
  }
});



// logout

let logout = () => {
  signOut(auth);
  window.location.href = "./index.html";
};

document.getElementById("signout")?.addEventListener("click", logout);


// forgot password

let forgotpswd = async () => {
  try {
    const email = document.getElementById("email").value;
    let resetpswd = await sendPasswordResetEmail(auth, email);
    console.log("aagay apkay email pe");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
  }
};

document.getElementById("forgotpswd")?.addEventListener("click", forgotpswd);
