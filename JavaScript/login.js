import {
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "./firebaseconfig.js";

onAuthStateChanged(auth, (user) => {
  console.log("Auth State Changed Triggered:", user);
  if (user) {
    console.log("User is logged in:", user);
    document.getElementById("avatar-email").innerHTML = user.email;
    document.getElementById("greetings").innerHTML = `Hi, ${
      user.email.split("@")[0]
    }`;

    document.getElementById("profileTrigger").style.display = "block";
    document.getElementById("avatar").innerHTML = user.email
      .slice(0, 1)
      .toUpperCase();
    document.getElementById("triggerText").innerHTML = user.email
      .slice(0, 1)
      .toUpperCase();
    document.getElementById("authentication")?.remove();
    document.getElementById("loginmodal")?.remove();
  } else {
    console.log("User is logged out");
    document.getElementById("profileTrigger").style.display = "none";
  }
});

const login = async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  document.getElementById("login-email").style.border = "";
  document.getElementById("login-password").style.border = "";
  document.getElementById("loginError").innerText = "";
  document.getElementById("loginError").style.display = "none";

  if (!email || !password) {
    document.getElementById("login-email").style.border = "2px solid crimson";
    document.getElementById("login-password").style.border =
      "2px solid crimson";
    document.getElementById("loginError").innerText =
      "Email and password are required.";
    document.getElementById("loginError").style.display = "block";
    return;
  }

  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    let user = userCredential.user;
    let useremail = user.email;
    let userNamee = user.displayName || useremail.split("@")[0];

    console.log("User logged in successfully:", user);

    if (user) {
      document.getElementById("authentication")?.remove();
      document.getElementById("loginmodal")?.remove();
      document.getElementById("profileTrigger").style.display = "block";
      document.getElementById("useraplha").innerHTML = useremail
        .slice(0, 1)
        .toUpperCase();
      document.getElementById("profileTrigger").innerHTML = useremail
        .slice(0, 1)
        .toUpperCase();
      document.getElementById("userEmail").innerHTML = useremail;
      document.getElementById("userName").innerHTML = `Hi, ${userNamee}`;
    }
  } catch (error) {
    console.error("Login failed:", error.code, error.message);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("login-btn");
  if (loginButton) {
    loginButton.addEventListener("click", login);
  }
});

// let loginButton =  document.getElementById("login-btn");
// loginButton.addEventListener("click", login);

console.log("login screen pe hooooooooooO!");

// logout

let logout = () => {
  try {
    console.log(auth, "logout");
    signOut(auth);
    window.location.replace("/");
    console.log("logout success!");
  } catch (e) {
    console.log(e, "error in logout");
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const logutButton = document.getElementById("signout");
  if (logutButton) {
    logutButton.addEventListener("click", logout);
    console.log("user logut");
  }
});

// console.log(document.getElementById("signout"), "document.getElementByIdsignout)")
// document.getElementById("signout")?.addEventListener("click", () => {
//   console.log("click signout")
// });

// profile image

document
  .getElementById("profileTrigger")
  .addEventListener("click", function () {
    document.getElementById("popupContainer").style.display = "block";
  });

// document.getElementById('manageAccountBtn').addEventListener('click', function () {
//   window.location.replace('../Dashboard/dashboard.html');
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const manageBtn = document.getElementById('manageAccountBtn');
//   if (manageBtn) {
//       manageBtn.addEventListener('click', function () {
//           window.location.replace('../Dashboard/dashboard.html');
//       });
//   }
// });

// Close popup when clicking outside
window.addEventListener("click", function (e) {
  const popup = document.getElementById("popupContainer");
  const trigger = document.getElementById("profileTrigger");
  if (!popup.contains(e.target) && !trigger.contains(e.target)) {
    popup.style.display = "none";
  }
});

// forgot password

let forgotpswd = async () => {
  try {
    const email = document.getElementById("login-email").value;
    let resetpswd = await sendPasswordResetEmail(auth, email);
    // console.log("aagaya apkay email pe");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
  }
};

document.getElementById("forgotpswd")?.addEventListener("click", forgotpswd);
