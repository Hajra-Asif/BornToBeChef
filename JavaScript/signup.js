import {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  addDoc,
  collection,
  db,
  serverTimestamp,
} from "./firebaseconfig.js";

const register = async (e) => {
  console.log("mai chal raha hoon");

  e.preventDefault();

  const username = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const displayName = username + " " + lastName;

  document.getElementById("password").style.border = "";
  document.getElementById("email").style.border = "";
  document.getElementById("passwordError").innerText = "";
  document.getElementById("emailError").innerText = "";

  if (!username || !lastName || !email || !password) {
    alert("All fields are required.");
    return;
  }

  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    let user = userCredential.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid, // Firebase Auth ka user ID
      firstName: username,
      lastName,
      email,
      isBlocked: false, // By default user unblock hoga
      createdAt: serverTimestamp(),
    });
    if (user) {
      document.getElementById("authentication")?.remove();
      document.getElementById("signupmodal")?.remove();
      document.getElementById("profileTrigger").style.display = "block";
      document.getElementById("profileTrigger").innerHTML = user.email
        .slice(0, 1)
        .toUpperCase();
      document.getElementById("useraplha").innerHTML = user.email
        .slice(0, 1)
        .toUpperCase();
      document.getElementById("userEmail").innerHTML = email;
      document.getElementById("userName").innerHTML = `Hi, ${username}`;
    } else {
      alert("Invalid email or password.");
    }

    alert("User successfully registered & saved in Firestore!");
    signupForm.reset(); // Form clear karna
  } catch (error) {
    console.log(error);

    if (error.code === "auth/email-already-in-use") {
      document.getElementById("email").style.border = "2px solid crimson";
      document.getElementById("emailError").innerText =
        "This email is already in use.";
    } else if (error.code === "auth/invalid-email") {
      document.getElementById("email").style.border = "2px solid crimson";
      document.getElementById("emailError").innerText = "Invalid email format.";
    } else {
      document.getElementById("password").style.border = "2px solid crimson";
      document.getElementById("passwordError").innerText =
        "Password must be 8+ chars, with uppercase, lowercase, number & special character.";
    }
  }
};

document.getElementById("signup")?.addEventListener("click", register);

// googleauthprovider

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

let google = async () => {
  try {
    await signOut(auth);
    console.log("User signed out before sign-in attempt.");

    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    const useruid = user?.uid;
    const displayName = user?.displayName;
    const uid = credential?.idToken;
    // const displayname = credential?.displayName;
    const photoURL = user?.photoURL;

    const email = user?.email;
    console.log(email);

    if (uid) {
      window.location.pathname = "./index.html";

      document.getElementById("authentication")?.remove();
      document.getElementById("signupmodal")?.remove();
      document.getElementById("profileTrigger").style.display = "block";
      document.getElementById("username").innerHTML = displayName || "User";
      console.log(photoURL, "photo url");
      document.getElementById("userEmail").innerHTML = email;
      document.getElementById("userName").innerHTML = `Hi, ${displayName}`;

      document.body.style.overflow = "auto";
    }

    const profileImg = document.getElementById("pfp");
    if (photoURL) {
      profileImg.src = photoURL;
      profileImg.style.display = "block"; //
    } else {
      profileImg.style.display = "none"; //
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};

document.getElementById("google-signup")?.addEventListener("click", google);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user);

    document.getElementById("authentication")?.remove();
    document.getElementById("signupmodal")?.remove();
    document.getElementById("profileTrigger").style.display = "block";

    const profileImg = document.getElementById("pfp");
    if (user.photoURL) {
      profileImg.src = user.photoURL;
      profileImg.style.display = "block";
    } else {
      // profileImg.style.display = "none";
    }
  } else {
    console.log("User is logged out");
    document.getElementById("profileTrigger").style.display = "none";
  }
});
