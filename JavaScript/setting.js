
import {
    auth,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
  } from "./firebaseconfig.js";
  

const updateUserPassword = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
        alert("No user is logged in!");
        return;
    }


    const currentPasswordField = document.getElementById("currentPassword");
    const newPasswordField = document.getElementById("newPassword");
    const confirmPasswordField = document.getElementById("confirmPassword");


    const oldPassword = currentPasswordField.value.trim();
    const newPassword = newPasswordField.value.trim();
    const confirmPassword = confirmPasswordField.value.trim();

    document.querySelectorAll(".error-message").forEach(el => el.style.display = "none");
    document.querySelectorAll(".form-control").forEach(el => el.classList.remove("input-error"));

    let hasError = false;


    if (!oldPassword) {
        showError(currentPasswordField, "Current password is required!");
        hasError = true;
    }
    if (!newPassword) {
        showError(newPasswordField, "New password is required!");
        hasError = true;
    }
    if (!confirmPassword) {
        showError(confirmPasswordField, "Please confirm your new password!");
        hasError = true;
    }
    if (newPassword !== confirmPassword) {
        showError(confirmPasswordField, "Passwords do not match!");
        hasError = true;
    }

    if (hasError) return;

    try {

        const credential = EmailAuthProvider.credential(user.email, oldPassword);
        await reauthenticateWithCredential(user, credential);
        console.log("User reauthenticated successfully!");


        await updatePassword(user, newPassword);
        console.log("Password updated successfully!");


        showSuccessModal();

    
        setTimeout(async () => {
            await auth.signOut();
            window.location.replace("/");
        }, 2000);

    } catch (error) {
        console.error("Error updating password:", error);
        // alert(error.message);
    }
};

const showError = (inputField, message) => {
    const errorElement = inputField.nextElementSibling;
    errorElement.textContent = message;
    errorElement.style.display = "block";
    inputField.style.border = "2px solid crimson"; 
};


const showSuccessModal = () => {
    const modal = document.getElementById("successModal");
    modal.style.display = "block";
};


document.getElementById("save")?.addEventListener("click", updateUserPassword);