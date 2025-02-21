import {
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "./firebaseconfig.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is logged in:", user);
      const uid = user.uid;
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
    let userCredintial = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    let user = userCredintial.user;
    console.log("this is user", user);
    if (user) {
      document.getElementById("authentication")?.remove(); 
      document.getElementById("loginmodal")?.remove();
      document.getElementById("profile").style.display = "block"
      // document.getElementById("username").innerHTML = username + " "+ lastName ;
    } else {
      console.log("Invalid email or password");
    }
  } catch (error) {
    console.log(error);
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


onAuthStateChanged(auth, (user) => {
  if (user) {
      console.log("User is logged in:", user);

      document.getElementById("authentication")?.remove();
      document.getElementById("signupmodal")?.remove();
      document.getElementById("profile").style.display = "block";
      document.getElementById("username").innerHTML = user.displayName || "User";

      // Profile image set karein
      const profileImg = document.getElementById("pfp");
      if (user.photoURL) {
          profileImg.src = user.photoURL;
          profileImg.style.display = "block";
      } else {
          profileImg.style.display = "none";
      }
  } else {
      console.log("User is logged out");
      document.getElementById("profile").style.display = "none";
  }
});

// logout

let logout = () => {
  signOut(auth);
  window.location.href = "../html/login.html";
};

document.getElementById("logout")?.addEventListener("click", logout);

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
