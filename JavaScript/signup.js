import {
    auth, createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    doc,
    setDoc,
    db,
} from "./firebaseconfig.js"


const register = async (e) => {
    e.preventDefault();
    const username = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const displayName = username + " " + lastName;

    try {

        let userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password)

        let user = userCredential.user;

        // await setDoc(doc(db, "Users", user.uid), {
        //     name: username,
        //     age,
        //     gender,
        //   });

        if (userCredential?.user) {

            document.getElementById("authentication")?.remove();
            document.getElementById("signupmodal")?.remove();
            document.getElementById("profileTrigger").style.display = "block";
            document.getElementById("profileTrigger").innerHTML = user.email.slice(0,1).toUpperCase();
            document.getElementById("useraplha").innerHTML = user.email.slice(0,1).toUpperCase();
            // console.log(photoURL , "photo url");

        }
        else {
            alert("invalid email or passsword")
        }
        console.log(user);



    }


    catch (error) {
        console.log(error);

    }
}
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
        const displayname = credential?.displayName;
        const photoURL = user?.photoURL;

        if (uid) {
            window.location.pathname = './index.html';

            document.getElementById("authentication")?.remove();
            document.getElementById("signupmodal")?.remove();
            document.getElementById("profileTrigger").style.display = "block";
            document.getElementById("username").innerHTML = displayName || "User";
            console.log(photoURL, "photo url");



            document.body.style.overflow = "auto";
        }


        const profileImg = document.getElementById("pfp");
        if (photoURL) {
            profileImg.src = photoURL;
            profileImg.style.display = "block"; // Show the image if hidden
        } else {
            profileImg.style.display = "none"; // Hide if no image available
        }
    } catch (error) {
        console.error("Error during sign-in:", error);
    }




};

document.getElementById("google-signup")?.addEventListener("click", google);



// Jab page reload ho ya load ho toh ye function run hoga
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user);

        document.getElementById("authentication")?.remove();
        document.getElementById("signupmodal")?.remove();
        document.getElementById("profileTrigger").style.display = "block";
        // document.getElementById("username").innerHTML = user.displayName || "User";

        // Profile image set karein
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

// document.getElementById("login")?.addEventListener("click", login);
