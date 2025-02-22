import { db, collection, getDocs, updateDoc, doc } from "../JavaScript/firebaseconfig.js";


const usersTable = document.getElementById("usersTable");

async function fetchUsers() {
    const querySnapshot = await getDocs(collection(db, "users"));
    let users = [];

    querySnapshot.forEach((docSnap) => {
        const user = docSnap.data();
        users.push({ id: docSnap.id, ...user });
    });

    // Sort users by date (latest first)
    users.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

    usersTable.innerHTML = ""; // Clear table

    users.forEach((user) => {
        const row = document.createElement("tr");
        const createdAt = new Date(user.createdAt.seconds * 1000).toLocaleString();

        row.innerHTML = `
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>
            <td>${createdAt}</td>
            <td>
                <button class="block-btn ${user.isBlocked ? "unblock" : ""}" data-id="${user.id}" data-blocked="${user.isBlocked}">
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
    document.querySelectorAll(".block-btn").forEach(button => {
        button.addEventListener("click", async (e) => {
            const userId = e.target.getAttribute("data-id");
            const isBlocked = e.target.getAttribute("data-blocked") === "true";

            await updateDoc(doc(db, "users", userId), { isBlocked: !isBlocked });
            fetchUsers(); // Refresh table
        });
    });

    // Delete user functionality
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", async (e) => {
            const userId = e.target.getAttribute("data-id");

            if (confirm("Are you sure you want to delete this user?")) {
                await deleteDoc(doc(db, "users", userId));
                fetchUsers(); // Refresh table
            }
        });
    });
}

// Fetch users when page loads
fetchUsers();

