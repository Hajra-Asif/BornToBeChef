//  recipe detail code remains the same until getRecipeDetail function...
let searchParams = (params) => {
    let urll = new URLSearchParams(window.location.search);
    return urll.get(params)
  }
  let shre =  window.location.href

  let displayData = async()=>{
    let elem = document.getElementById('con');
    let idd = searchParams("id");

    if(idd){
        let fetchh = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idd}`)
        let jsonData = await fetchh.json();
        let foodItem = jsonData.meals[0];

        if(!foodItem){
elem.innerHTML='food items not foundddd......'
        }

        elem.innerHTML=`
        
        
                <h1  style="color:var(--blue);"class="mb-4">Recipe Detail Page</h1>
            <div class="row mb-4">
                <div class="col-lg-6 mb-4">
                    <img id="recipeImage" src="${foodItem.strMealThumb}" alt="${foodItem.strMealThumb}" class="img-fluidMeal rounded">
                </div>
                <div class="col-lg-6">
                    <div id="title">
                        <h1 id="recipeTitle" class="mb-1">${foodItem.strMeal}</h1>
                        <p class="recipe-date mb-4" id="recipeDate">SEPTEMBER 23RD, 2023</p>
                        <div class="social-share mb-2">
                          <a href="#" id="view-modal" class="social-icon">
<i class="fas fa-share"></i>
</a>

<div class="popup">
<header>
<span style="color:var(--blue);">Share with your friends</span>
<div class="close"><i class="uil uil-times"></i></div>
</header>
<div class="content">
<p style="color:var(--bodytext);">Share this link via</p>
<ul class="icons p-0">
  <a href="https://www.facebook.com/?u=${shre}" target="_blank"><i class="fab fa-facebook-f"></i></a>
  <a href="https://twitter.com/intent/tweet?url=${shre}" target="_blank"><i class="fab fa-twitter"></i></a>
  <a href="https://www.instagram.com/?url=${shre}"  target="_blank"><i class="fab fa-instagram"></i></a>
  <a href="https://web.whatsapp.com/?url=${shre}"  target="_blank"><i class="fab fa-whatsapp"></i></a>
  <a href="https://t.me/share/url?url=${shre}" target="_blank"><i class="fab fa-telegram-plane"></i></a>
</ul>
<p>Or copy link</p>
<div class="field">
  <i style="color:var(--bodytext);" class="url-icon uil uil-link "></i>
  <input type="text" readonly value="${shre}">
  <button id="copy">Copy</button>
</div>
</div>
</div>
                            <a href="#" id="print-link" class="social-icon">
                                <i class="fas fa-print"></i> 
                            </a>
                            <a href="#" class="social-icon">
                                <i class="fas fa-heart"></i>
                            </a>
                        </div>
                        <div class="recipe-intro mt-2 mb-4" id="recipeIntro">
                            I am SO excited to share this recipe with you guys. I have been trying to perfect it for quite some time...
                        </div>
                    </div>
                    <div class="nutrition-info col-md-6 ps-3">
                        <h5 class="mb-3 ps-0">Nutrition Information</h5>
                        <div class="row mb-2">
                            <div class="col-8 nutrition-label">Servings</div>
                            <div class="col-4 nutrition-value" id="recipeServings">4</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-8 nutrition-label">Calories</div>
                            <div class="col-4 nutrition-value" id="recipeCalories">345</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-8 nutrition-label">Fat</div>
                            <div class="col-4 nutrition-value" id="recipeFat">7g</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-8 nutrition-label">Carbohydrates</div>
                            <div class="col-4 nutrition-value" id="recipeCarbs">57g</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-8 nutrition-label">Protein</div>
                            <div class="col-4 nutrition-value" id="recipeProtein">11g</div>
                        </div>
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col-md-6">
                        <h3 class="section-heading">Ingredients</h3>
                        <ul id="ingredients" class="ingredients-list"></ul>
                    </div>
                    <div class="col-md-6">
                        <h3 class="section-heading">Instructions</h3>
                        <p>${foodItem.strInstructions}</p>
                    </div>
                </div>
            </div>
                `;






// Populate the ingredients list dynamically
let ingredientsHtml = "";
for (let i = 1; i <= 20; i++) {
    const ingredient = foodItem[`strIngredient${i}`];
    const measure = foodItem[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
        ingredientsHtml += `<li> <span class="measure">${measure ? measure : ""}</span> ${ingredient}</li>`;
    }
}
document.getElementById("ingredients").innerHTML = ingredientsHtml;
const printLink = document.querySelector('#print-link');
        // console.log(printLink);  
        if (printLink) {
            printLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.print();
            });
        }
} else {
document.body.innerHTML = `<p>Recipe not found</p>`;
}
const viewBtn = document.querySelector("#view-modal"),
popup = document.querySelector(".popup"),
close = popup.querySelector(".close"),
field = popup.querySelector(".field"),
input = field.querySelector("input"),
copy = field.querySelector("#copy");

viewBtn.onclick = ()=>{ 
popup.classList.toggle("show");
}
close.onclick = ()=>{
viewBtn.click();
}

copy.onclick = ()=>{
input.select();
if(document.execCommand("copy")){
field.classList.add("active");
copy.innerText = "Copied";
setTimeout(()=>{
  window.getSelection().removeAllRanges(); 
  field.classList.remove("active");
  copy.innerText = "Copy";
}, 3000);
}
}



};


displayData()
// comment section

let comments = JSON.parse(localStorage.getItem('recipeComments')) || [
    {
        id: 1,
        author: 'John Doe',
        content: 'This recipe looks amazing!',
        timestamp: '2 hours ago',
        rating: 5 // Default rating for a comment
    },
    {
        id: 2,
        author: 'Jane Smith',
        content: 'I tried this recipe yesterday, it was delicious!',
        timestamp: '1 hour ago',
        rating: 4 // Default rating for a comment
    }
];

function saveComments() {
    localStorage.setItem('recipeComments', JSON.stringify(comments));
}

let selectedRating = 0; // Default value for the selected rating

// Dynamically update the stars for rating
const stars = document.querySelectorAll(".star");
const nameInput = document.getElementById("name-input");
const reviewText = document.getElementById("comment-input");
const submitBtn = document.getElementById("post");
const reviewsContainer = document.getElementById("comments-container");

stars.forEach((star) => {
    star.addEventListener("click", () => {
        const value = parseInt(star.getAttribute("data-value"));
        selectedRating = value; // Store the selected rating

        // Remove existing star classes
        stars.forEach((s) => s.classList.remove("one", "two", "three", "four", "five"));
        
        // Add appropriate class to each star based on the selected rating
        stars.forEach((s, index) => {
            if (index < value) {
                s.classList.add(getStarColorClass(value));
            }
        });

        // Mark the selected star
        stars.forEach((s) => s.classList.remove("selected"));
        star.classList.add("selected");
    });
});

// Helper function to get class for rating color
function getStarColorClass(value) {
    switch (value) {
        case 1: return "one";
        case 2: return "two";
        case 3: return "three";
        case 4: return "four";
        case 5: return "five";
        default: return "";
    }
}

// Handle comment submission
submitBtn.addEventListener("click", () => {
    const review = reviewText.value.trim();
    if (!selectedRating || !review || !nameInput.value.trim()) {
        alert("Please select a rating and provide a review before submitting.");
        return;
    }

    const newComment = {
        id: Date.now(),
        author: nameInput.value,
        content: review,
        timestamp: 'Just now',
        rating: selectedRating
    };

    comments.push(newComment);
    saveComments();
    renderComments(); // Update the comment display

    reviewText.value = ''; // Clear the comment input
    stars.forEach((s) => s.classList.remove("one", "two", "three", "four", "five", "selected"));
});

// Function to render the comments
function renderComments() {
    const container = document.getElementById('comments-container');
    container.innerHTML = comments.map(comment => createCommentHTML(comment)).join('');
    document.getElementById('comment-count').textContent = comments.length;
}

// Function to create HTML for each comment
function createCommentHTML(comment) {
    const initial = comment.author.charAt(0).toUpperCase();
    return `
        <div class="card mb-3 comment-card" data-id="${comment.id}">
            <div class="card-body">
                <div class="d-flex">
                    <div class="avatar me-3">${initial}</div>
                    <div class="flex-grow-1">
                        <div class="d-flex align-items-center mb-1">
                            <strong class="me-2">${comment.author}</strong>
                            <small class="text-muted">• ${comment.timestamp}</small>
                        </div>
                        <p class="mb-0">${comment.content}</p>
                        <div class="stars">
                            ${getStarIcons(comment.rating, comment.id)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to generate star icons for each comment
function getStarIcons(rating, commentId) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += `
            <span 
                class="star ${i <= rating ? 'filled' : ''}" 
                data-id="${commentId}" data-rating="${i}" onclick="rateComment(${i}, ${commentId})">
                ★
            </span>
        `;
    }
    return starsHtml;
}

// Function to handle rating update when star is clicked
function rateComment(n, commentId) {
    const comment = comments.find(c => c.id === parseInt(commentId));
    if (comment) {
        comment.rating = n; // Update the rating for this comment
        saveComments(); // Save to localStorage
        renderComments(); // Re-render the comments with the updated rating
    }
}

// Initialize and render the comments when the page loads
function init() {
    renderComments();
}

// Initialize the page with existing comments
init();

// footer plus moudal
document.addEventListener("DOMContentLoaded", function () {
    // Get modal elements
    const loginOverlay = document.querySelector(".login-overlay");
    const signupOverlay = document.querySelector(".signup-overlay");

    // Buttons/links to open modals
    const openLoginBtn = document.querySelector(".login1");
    const openSignupBtn = document.querySelector(".signup1");

    // Close buttons
    const closeLoginBtn = document.querySelector(".close-login");
    const closeSignupBtn = document.querySelector(".close-signup");

    // Switch between login/signup
    const switchToLogin = document.getElementById("switchToLogin");
    const switchToSignup = document.getElementById("switchToSignup");

    // Function to open modal
    function openModal(modal) {
        if (modal) {
            modal.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent background scrolling
        }
    }

    // Function to close modal
    function closeModal(modal) {
        if (modal) {
            modal.classList.remove("active");
            document.body.style.overflow = ""; // Restore scrolling
        }
    }

    // Open login modal
    if (openLoginBtn) {
        openLoginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(loginOverlay);
        });
    }

    // Open signup modal
    if (openSignupBtn) {
        openSignupBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(signupOverlay);
        });
    }

    // Close login modal
    if (closeLoginBtn) {
        closeLoginBtn.addEventListener("click", () => closeModal(loginOverlay));
    }

    // Close signup modal
    if (closeSignupBtn) {
        closeSignupBtn.addEventListener("click", () => closeModal(signupOverlay));
    }

    // Close modal when clicking outside
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("login-overlay")) {
            closeModal(loginOverlay);
        } else if (e.target.classList.contains("signup-overlay")) {
            closeModal(signupOverlay);
        }
    });

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal(loginOverlay);
            closeModal(signupOverlay);
        }
    });

    // Switch to login modal from signup modal
    if (switchToLogin) {
        switchToLogin.addEventListener("click", (e) => {
            e.preventDefault();
            closeModal(signupOverlay);
            openModal(loginOverlay);
        });
    }

    // Switch to signup modal from login modal
    if (switchToSignup) {
        switchToSignup.addEventListener("click", (e) => {
            e.preventDefault();
            closeModal(loginOverlay);
            openModal(signupOverlay);
        });
    }
});