 // Function to get query parameters from URL
 let searchParams = (param) => {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};
let shre =  window.location.href
// console.log(shre);
let displayCardss = async () => {
    let idd = searchParams("id"); // Get meal ID from URL
    let ele = document.getElementById('con');

    if (idd) {
        let fetchh = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idd}`);
        let jsonData = await fetchh.json();
        const dessert =  jsonData.meals[0];

        if (!dessert) {
            ele.innerHTML = '<h2 class="text-danger">Dessert not found</h2>';
            return;
        }

        ele.innerHTML = `
            <h1  style="color:var(--blue);"class="mb-4">Recipe Detail Page</h1>
            <div class="row mb-4">
                <div class="col-lg-6 mb-4">
                    <img id="recipeImage" src="${dessert.strMealThumb}" alt="" class="img-fluidMeal rounded">
                </div>
                <div class="col-lg-6">
                    <div id="title">
                        <h1 id="recipeTitle" class="mb-1">${dessert.strMeal}</h1>
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
                        <p>${dessert.strInstructions}</p>
                    </div>
                </div>
            </div>
        `;
        

        // Populate the ingredients list dynamically
        let ingredientsHtml = "";
        for (let i = 1; i <= 20; i++) {
            const ingredient = dessert[`strIngredient${i}`];
            const measure = dessert[`strMeasure${i}`]; 
            if (ingredient && ingredient.trim()) {
                ingredientsHtml += `<li> <span class="measure">${measure ? measure : ""}</span> ${ingredient}</li>`;
            }
        }
        document.getElementById("ingredients").innerHTML = ingredientsHtml;
    // print
        const printLink = document.querySelector('#print-link');
        console.log(printLink);  
        if (printLink) {
            printLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.print();
            });
        }
    } else {
        ele.innerHTML = `<h2 class="text-danger">Recipe ID not found</h2>`;
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

displayCardss();


 // Add the comments functionality
 let comments = JSON.parse(localStorage.getItem('recipeComments')) || [
    {
        id: 1,
        author: 'John Doe',
        content: 'This recipe looks amazing!',
        timestamp: '2 hours ago',
        rating: 5 // Add the rating for this comment (for example, 5 stars)
    },
    {
        id: 2,
        author: 'Jane Smith',
        content: 'I tried this recipe yesterday, it was delicious!',
        timestamp: '1 hour ago',
        rating: 4 // Add the rating for this comment (for example, 4 stars)
    }
];
function saveComments() {
    localStorage.setItem('recipeComments', JSON.stringify(comments));
}
        let selectedRating = 0; // Default value is 0 (no rating)

function rateComment(rating) {
    selectedRating = rating; // Store the selected rating
    updateRatingDisplay(rating); // Update display of stars to reflect selected rating
}
        // Function to create comment HTML
        function createCommentHTML(comment, isNew = false) {
            const initial = comment.author.charAt(0).toUpperCase();
            return `
                <div class="card mb-3 comment-card ${isNew ? 'new-comment' : ''}" data-id="${comment.id}">
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
        function getStarIcons(rating, commentId) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += `
            <span 
                class="star ${i <= rating ? 'filled' : ''}" 
                onclick="gfg(event, ${i}, ${commentId})">
                ★
            </span>`;
    }
    return starsHtml;
}

        // Function to render comments
        function renderComments() {
            const container = document.getElementById('comments-container');
            container.innerHTML = comments.map(comment => createCommentHTML(comment)).join('');
            document.getElementById('comment-count').textContent = comments.length;
            const stars = container.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', (event) => {
            const commentId = event.target.closest('.comment-card').dataset.id;
            const rating = [...event.target.parentElement.children].indexOf(event.target) + 1;
            gfg(event, rating, commentId);
        });
    });
        }

        // Handle comment form submission
        document.getElementById('comment-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name-input');
            const commentInput = document.getElementById('comment-input');
            
            const newComment = {
                id: Date.now(),
                author: nameInput.value,
                content: commentInput.value,
                timestamp: 'Just now',
                rating: selectedRating
            };

            comments.push(newComment);
            saveComments();
            
            const container = document.getElementById('comments-container');
            container.insertAdjacentHTML('beforeend', createCommentHTML(newComment, true));
            
            document.getElementById('comment-count').textContent = comments.length;
            
            commentInput.value = '';
            
            setTimeout(() => {
                const newCommentElement = container.querySelector(`[data-id="${newComment.id}"]`);
                if (newCommentElement) {
                    newCommentElement.classList.remove('new-comment');
                }
            }, 2000);
            
        });

//     
function loadComments() {
    const storedComments = localStorage.getItem('recipeComments');
    if (storedComments) {
        comments = JSON.parse(storedComments);
    }
    renderComments(); // Rerender comments after loading them from localStorage
}   
        // Initialize everything
        async function init() {
            await displayData();
            renderComments();
        }

        init();