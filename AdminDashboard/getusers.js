import {
  db,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "../JavaScript/firebaseconfig.js";

const usersTable = document.getElementById("usersTable");

async function fetchUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));
  let users = [];

  querySnapshot.forEach((docSnap) => {
    const user = docSnap.data();
    users.push({ id: docSnap.id, ...user });
  });

  // Sort users by date
  users.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

  usersTable.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");
    const createdAt = new Date(user.createdAt.seconds * 1000).toLocaleString();

    row.innerHTML = `
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>
            <td>${createdAt}</td>
            <td>
                <button class="block-btn ${
                  user.isBlocked ? "unblock" : ""
                }" data-id="${user.id}" data-blocked="${user.isBlocked}">
                    ${user.isBlocked ? "Unblock" : "Block"}
                </button>
            </td>
            <td>
                <button class="delete-btn" data-id="${user.id}">Delete</button>
            </td>
        `;

    usersTable.appendChild(row);
  });

  // Block/Unblock functionality
  document.querySelectorAll(".block-btn").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const userId = e.target.getAttribute("data-id");
      const isBlocked = e.target.getAttribute("data-blocked") === "true";

      await updateDoc(doc(db, "users", userId), { isBlocked: !isBlocked });
      fetchUsers();
    });
  });


  
//////////////////deleteeeee 

  const modal = document.getElementById("deleteModal");
  const deleteBtn = document.getElementById("delete");
  let userIdToDelete = null;

  function showModal(userId) {
    userIdToDelete = userId;
    modal.style.display = "flex";
  }

  function hideModal() {
    modal.style.display = "none";
    userIdToDelete = null;
  }

  async function handleDelete() {
    if (userIdToDelete) {
      await deleteDoc(doc(db, "users", userIdToDelete));
      fetchUsers();
      hideModal();
    }
  }

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const userId = e.target.getAttribute("data-id");
      showModal(userId);
    }
  });

  deleteBtn.addEventListener("click", handleDelete);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      hideModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideModal();
    }
  });
}

fetchUsers();
