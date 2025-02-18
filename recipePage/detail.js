const getRecipe =(param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};
// ------ container 1

const fetchData = async () => {
    try {
        const response = await fetch('https://dummyjson.com/recipes?limit=1');
        return response.json();
    } catch (error) {
        throw new Error('Error in fetching data');
    }
  };
  
  const getData = async () => {
    try {
        const dataResult = await fetchData();
        const recipes = dataResult.recipes;
        displayRecipie(recipes);
    } catch (error) {
        throw new Error('Error in fetching data');
    }
  };
  getData();
  
  // Display Recipes
  const recipesContainer = document.querySelector('#container');
  
  const displayRecipie = (data) => {
    if (data && data.length > 0) {
        data.forEach(recipe => {
            console.log(recipe);
            const card = document.createElement("div");
  
            card.innerHTML = `
            <div class="row mb-4">
                <div class="col-md-6">
                    <img id="image" src="${recipe.image}" alt="" class="img-fluid rounded">
                </div>
  
                <div class="col-md-6">
                    <div class="recipe-header">
                        <h1 class="recipe-title">${recipe.name}</h1>
                        <div class="social-share">
                            <a href="#" class="social-icon">
                                <i class="fas fa-share"></i>
                            </a>
                            <a href="#" class="social-icon">
                                <i class="fas fa-print"></i>
                            </a>
                            <a href="#" class="social-icon">
                                <i class="fas fa-heart"></i>
                            </a>
                        </div>
                    </div>
                    <p class="recipe-description">
                        I am SO excited to share ${recipe.name} with you guys. 
                        I have been trying to perfect an oat flour pizza crust for quite some time, 
                        and I knew I finally nailed it when my husband ate half the pizza in one sitting!
                    </p>
                    <h3 class="section-title">Facts</h3>
                    <table class="nutrition-table">
                        <tr>
                            <td>Servings</td>
                            <td>${recipe.servings}</td>
                        </tr>
                        <tr>
                            <td>Preparation Time</td>
                            <td>${recipe.prepTimeMinutes}</td>
                        </tr>
                        <tr>
                            <td>Reviews</td>
                            <td>${recipe.reviewCount}</td>
                        </tr>
                        <tr>
                            <td>Rating</td>
                            <td>${recipe.rating}</td>
                        </tr>
                        <tr>
                            <td>Calories</td>
                            <td>${recipe.caloriesPerServing}</td>
                        </tr>
                    </table>
                </div>
            </div>
            `;
            
            recipesContainer.appendChild(card);
        });
    } else {
        recipesContainer.innerHTML = 'No recipes found';
    }
  };
  
//   ----- container 2
  let recipeDetail = async () => {
    let recipeId = getRecipe("id");
    const recipeDiv = document.querySelector("#container2");

    if (recipeId) {
        const response = await fetch('https://dummyjson.com/recipes');
        const recipeData = await response.json();
        const recipe = recipeData?.recipes?.find((r) => r.id === parseInt(recipeId));

        console.log(recipe);

        // ----- insert data
        const content = document.createElement("div");
        const recipeIngredients = recipe.ingredients;
        const relatedRecipes = recipeData?.recipes
            .filter((r) => r.id !== recipe.id)  
            .filter((r) => r.ingredients.some(ingredient => recipeIngredients.includes(ingredient))) 
            .slice(0, 3); 
        const relatedRecipeForMethodImg = relatedRecipes[0];

        content.innerHTML = `
        <div class="row mb-4">
            <div class="col-md-6">
                <div class="method-section">
                    <h3 class="section-title">Method</h3>
                    <div class="method-step">
                        <span class="step-number"></span>
                        <p>${recipe.instructions.join('</p><p>')}</p>
                        <div class="methodImg">
                            <!-- Display the related recipe image here -->
                            <img id="img" src="${relatedRecipeForMethodImg?.image || recipe.image}" alt="Related Recipe Image" class="img-fluid rounded">
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <h3 class="section-title">Ingredients</h3>
                <div class="ingredients-list">
                    ${recipe.ingredients.map(ingre => `<div class="ingredient-item"><span>${ingre}</span></div>`).join('')}
                </div>
                <div class="recipe-tip">
                    <h4 class="tip-title mb-2">Katie's tip!</h4>
                    <p class="mb-0">"These chickpeas as a snack, or over a salad for crunch!"</p>
                </div>
                <div class="related-recipes">
                    <h3 class="section-title">You may also like</h3>
                    <div class="row">
                        ${relatedRecipes.map(r => `
                            <div class="col-md-4 mb-3">
                                <img src="${r.image}" alt="Related Recipe" class="img-fluid">
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
        `;
        
        recipeDiv.appendChild(content);

    } else {
        document.body.innerHTML = `<p>Recipe not found</p>`;
    }
};

recipeDetail();
