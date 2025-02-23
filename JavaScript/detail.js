document.addEventListener('DOMContentLoaded', function() {
    // url parameter
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get('id');
    
    if (!mealId) {
        // If no meal ID is provided
        fetchRandomMeal();
    } else {
        // Fetch specific meal by ID
        fetchMealById(mealId);
    }
    
    //  fetch a meal by ID
    function fetchMealById(id) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.meals && data.meals.length > 0) {
                    displayRecipe(data.meals[0]);
                    fetchSimilarMeals(data.meals[0].strCategory);
                } else {
                    showRecipeNotFound();
                }
            })
            .catch(error => {
                console.error('Error fetching recipe:', error);
                showRecipeNotFound();
            });
    }
    
    //  fetch a random meal
    function fetchRandomMeal() {
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(response => response.json())
            .then(data => {
                if (data.meals && data.meals.length > 0) {
                    displayRecipe(data.meals[0]);
                    fetchSimilarMeals(data.meals[0].strCategory);
                } else {
                    showRecipeNotFound();
                }
            })
            .catch(error => {
                console.error('Error fetching random recipe:', error);
                showRecipeNotFound();
            });
    }
    
    //  fetch similar meals based on category
    function fetchSimilarMeals(category) {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
            .then(response => response.json())
            .then(data => {
                if (data.meals && data.meals.length > 0) {
                    // Get random 3 meals
                    const randomMeals = data.meals
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 3);
                    displaySimilarRecipes(randomMeals);
                }
            })
            .catch(error => {
                console.error('Error fetching similar recipes:', error);
            });
    }
    
    // Show recipe not found message
    function showRecipeNotFound() {
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('recipeNotFound').style.display = 'block';
    }
    
    // Function to display recipe details
    function displayRecipe(meal) {
        // Hide loading spinner and show recipe container
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('recipeContainer').style.display = 'block';
        
        // Set recipe title and image
        document.getElementById('recipeTitle').textContent = meal.strMeal;
        document.getElementById('recipeImage').src = meal.strMealThumb;
        document.getElementById('recipeImage').alt = meal.strMeal;
        
        // Format and set the date
        const currentDate = new Date();
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options).toUpperCase();
        document.getElementById('recipeDate').textContent = formattedDate;
        
        // Set recipe introduction
        const intro = `I am SO excited to share this ${meal.strMeal.toLowerCase()} recipe with you guys. 
            I've been perfecting this recipe for some time, and it's become a family favorite in our home. 
            This healthy version makes it possible for our family to enjoy ${meal.strCategory.toLowerCase()} in a much healthier way!`;
        document.getElementById('recipeIntro').textContent = intro;
        
        // Generate nutrition information (using placeholder data)
        document.getElementById('recipeServings').textContent = '4';
        document.getElementById('recipeCalories').textContent = Math.floor(Math.random() * 300 + 200);
        document.getElementById('recipeFat').textContent = Math.floor(Math.random() * 15 + 5) + 'g';
        document.getElementById('recipeCarbs').textContent = Math.floor(Math.random() * 40 + 20) + 'g';
        document.getElementById('recipeProtein').textContent = Math.floor(Math.random() * 15 + 5) + 'g';
        
        // Set recipe tip
        document.getElementById('recipeTip').textContent = 
            `"This ${meal.strMeal} is perfect for a ${meal.strCategory.toLowerCase()} night! Try pairing it with a simple side salad for a complete meal."`;
        
        // Process and display ingredients
        displayIngredients(meal);
        
        // Process and display instructions
        displayInstructions(meal);
        
        // // Display dummy comments
        // displayComments(meal.strMeal);
    }
    
    // Function to display ingredients
    function displayIngredients(meal) {
        const ingredientsList = document.getElementById('ingredientsList');
        ingredientsList.innerHTML = '';
        
        // Create arrays of ingredients and measures
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            
            if (ingredient && ingredient.trim() !== '') {
                const listItem = document.createElement('li');
                
                const measureSpan = document.createElement('span');
                measureSpan.className = 'measure';
                measureSpan.textContent = measure ? measure.trim() : '';
                
                const ingredientSpan = document.createElement('span');
                ingredientSpan.className = 'ingredient-name';
                ingredientSpan.textContent = ingredient;
                
                listItem.appendChild(measureSpan);
                listItem.appendChild(ingredientSpan);
                
                ingredientsList.appendChild(listItem);
            }
        }
    }
    
    // Function to display instructions
    function displayInstructions(meal) {
        const instructionsContainer = document.getElementById('recipeInstructions');
        instructionsContainer.innerHTML = '';
        
        // Split instructions into steps
        let instructions = meal.strInstructions.split('.');
        // Remove empty strings
        instructions = instructions.filter(instruction => instruction.trim() !== '');
        
        // Add step numbers and styling
        instructions.forEach((instruction, index) => {
            if (index < 6) { // Limit to 6 steps for cleaner UI
                const stepDiv = document.createElement('div');
                stepDiv.className = 'method-step';
                
                const stepNumber = document.createElement('div');
                stepNumber.className = `step-number ${index % 2 === 0 ? 'blue-bg' : 'brown-bg'}`;
                stepNumber.textContent = index + 1;
                
                const stepText = document.createElement('p');
                stepText.textContent = instruction.trim() + '.';
                
                stepDiv.appendChild(stepNumber);
                stepDiv.appendChild(stepText);
                
                instructionsContainer.appendChild(stepDiv);
            }
        });
        
        // Add "Enjoy!" at the end
        const finalStep = document.createElement('div');
        finalStep.className = 'method-step';
        
        const finalStepNumber = document.createElement('div');
        finalStepNumber.className = 'step-number pink-bg';
        finalStepNumber.textContent = instructions.length > 6 ? 7 : instructions.length + 1;
        
        const finalStepText = document.createElement('p');
        finalStepText.textContent = 'Serve immediately and enjoy!';
        
        finalStep.appendChild(finalStepNumber);
        finalStep.appendChild(finalStepText);
        instructionsContainer.appendChild(finalStep);
    }
    
    // Function to display similar recipes
    function displaySimilarRecipes(meals) {
        const similarRecipesContainer = document.getElementById('similarRecipes');
        similarRecipesContainer.innerHTML = '';
        
        meals.forEach(meal => {
            const col = document.createElement('div');
            col.className = 'col-4 similar-recipe';
            
            const link = document.createElement('a');
            link.href = `?id=${meal.idMeal}`;
            link.className = 'text-decoration-none';
            
            const img = document.createElement('img');
            img.src = meal.strMealThumb;
            img.alt = meal.strMeal;
            img.className = 'img-fluid';
            
            const title = document.createElement('p');
            title.className = 'similar-recipe-title';
            title.textContent = meal.strMeal;
            
            link.appendChild(img);
            link.appendChild(title);
            col.appendChild(link);
            similarRecipesContainer.appendChild(col);
        });
    }
    
    //  display comments
    // function displayComments(recipeName) {
    //     const commentsContainer = document.getElementById('commentsContainer');
    //     commentsContainer.innerHTML = '';
        
    //     const comments = [
    //         {
    //             author: 'Susy Smith',
    //             text: `This looks great! I love that ${recipeName.toLowerCase()}! If I don't have a springform pan can you use a round cake pan?`,
    //             date: '2 days ago'
    //         },
    //         {
    //             author: 'Jessica Johnson',
    //             text: `Looks so good, I think I'll make this for 4th of July!`,
    //             date: '1 week ago'
    //         },
    //         {
    //             author: 'Tina Thomas',
    //             text: `If I plan on taking this to a celebration, will it keep in a cooler while traveling?`,
    //             date: '2 weeks ago'
    //         },
    //         {
    //             author: 'Leah Lawson',
    //             text: `Made this last weekend and everyone loved it!`,
    //             date: '3 weeks ago'
    //         }
    //     ];
        
    //     // Display each comment
    //     comments.forEach(comment => {
    //         const commentDiv = document.createElement('div');
    //         commentDiv.className = 'bg-light p-3 rounded mb-3';
            
    //         const authorName = document.createElement('h5');
    //         authorName.className = 'authorName';
    //         authorName.textContent = comment.author;
            
    //         const commentText = document.createElement('p');
    //         commentText.textContent = comment.text;
            
    //         const commentDate = document.createElement('small');
    //         commentDate.className = 'text-muted';
    //         commentDate.textContent = comment.date;
            
    //         commentDiv.appendChild(authorName);
    //         commentDiv.appendChild(commentText);
    //         commentDiv.appendChild(commentDate);
            
    //         commentsContainer.appendChild(commentDiv);
    //     });
        
    //     document.getElementById('commentCount').textContent = 
    //         `${comments.length} People are talking about this recipe! Say Something!`;
    // }
 });
 document.querySelector('.print-link').addEventListener('click', (e) => {
    e.preventDefault();
    window.print();
});