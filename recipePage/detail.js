
const getRecipe =(param)=>{
    const urlParams= new URLSearchParams(window.location.search);
    return urlParams.get(param);
  
  };
  // ----- Recipe Detail
  let recipeDetail= async () => {
    let recipeId = getRecipe("id");
  const recipeDiv =document.querySelector("#container2")
  
    if(recipeId){
        const response = await fetch('https://dummyjson.com/recipes')
        const recipeData = await response.json();
        const recipe = recipeData?.recipes?.find(
            (r)=>r.id ===parseInt(recipeId)
        );
    console.log(recipe);
    
  // ----- insert data
  const main = document.createElement("div")
  
  
  main.innerHTML=`
  <div class="row mb-4">
<div class="col-md-6">
<div class="method-section">
    <h3 class="section-title">Method</h3>
    <div class="method-step">
        <span class="step-number"></span>
        <p>${ins}</p>
         <span class="step-number"></span>
        <p>${ins}</p>
        <div class="img">
            <img id="img" src="${recipe.caloriesPerServing}" alt="" class="img-fluid rounded">
            
            </div>
    </div>
    
</div>
</div>

<div class="col-md-6">
    <h3 class="section-title">Ingredients</h3>
    <div class="ingredients-list">
        <div class="ingredient-item">
            <span class="ingredient-amount"></span>
            <span>${ingre}</span>
        </div>
        
    </div>
    <div class="recipe-tip">
        <h4 class="tip-title mb-2">Katie's tip!</h4>
        <p class="mb-0">"These chickpeas as a snack, or over a salad for crunch!"</p>
    </div>
    <div class="related-recipes">
        <h3 class="section-title">You may also like</h3>
        <div id="smallImages" class="row">
           
    </div>
</div>



  `;
  recipeDiv.appendChild(main)
  
  // ----- ingrediants
  let recipeHtml ="";
  recipe.ingredients.forEach((ingre) => (recipeHtml+=`<span>${ingre}</span>` )
  );
  document.getElementById("ingredients").innerHTML= recipeHtml;
  
  // ---- Instructon inner html
  let instructionsHTML="";
  recipe.instructions.forEach((ins) => (instructionsHTML+=`<p>${ins}</p>` ));
  document.getElementById("discription").innerHTML= instructionsHTML;
  
  }else{
    document.body.innerHTML=`  <p>Recipe not found</p>`
  }
  
  }
  recipeDetail()
  
  
   
  // ------ Cards of you may like
  
  const fetchData = async() =>{
      try {
        const response = await fetch('https://dummyjson.com/recipes')
        
        return response.json()
       console.log(response.json)
        
      } catch (error) {
        throw new Error ('Error in fetching data')
      }
     //console.log(fetchData())
    }
    fetchData()
    
    const getData = async () => {
      try {
        const dataResult = await fetchData()
       
        //console.log(dataResult.recipes)
        const recipes = dataResult.recipes;
        displayRecipie(recipes)
        
      } catch (error) {
        throw new Error ('Error in fetching data')
      }
    }
    getData()
    ///  ////// Display Recipes 
    const recipesContainer = document.querySelector ('#container');
    //data =null;
    const displayRecipie = (data)=>{
      if (data && data.length>0) {
        data.forEach(recipe =>{
          console.log(recipe)
          const card = document.createElement("div");
         // card.className='recipeCard'
          card.innerHTML=`<div class="row mb-4">
<div class="col-md-6 ">
<img id="image" src="${recipe.image}" alt="" class="img-fluid rounded">
</div>

<div class="col-md-6">

<div class="recipe-header">
<h1 class="recipe-title">${recipe.name}</h1>
<div class="social-share">
<a href="#" class="social-icon">
<i class="fa-solid fa-share"></i>
</a>
<a href="#" class="social-icon">
<i class="fa-solid fa-print"></i>
</a>
<a href="#" class="social-icon">
<i class="fa-regular fa-heart"></i>
</a>
</div>
<div class="col-md-6">
<p class="recipe-description">
I am SO excited to share ${recipe.name} with you guys. 
I have been trying to perfect an oat flour pizza crust for quite some time, 
and I knew I finally nailed it when my husband ate half the pizza in one sitting!
</p>
</div>
</div>
<div class="col-md-6">
<h3 class="section-title"> Facts</h3>
<table class="nutrition-table">
<tr>
    <td>Servings</td>
    <td>${recipe.servings}</td>
</tr>

<tr>
    <td>Prepearation Time </td>
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
`
          recipesContainer.appendChild(card)
        });
        
      } else {
        recipesContainer.innerHtml=' No recipes found'
      }
    }
    
//  --- may like second container
const fetchSecData = async() =>{
  try {
    const response = await fetch('https://dummyjson.com/recipes?limit=4&skip=4')
    
    return response.json()
   console.log(response.json)
    
  } catch (error) {
    throw new Error ('Error in fetching data')
  }
 //console.log(fetchData())
}
fetchSecData()

const getSecData = async () => {
  try {
    const dataResult = await fetchSecData()
   
    //console.log(dataResult.recipes)
    const recipes = dataResult.recipes;
    displayRecipie(recipes)
    
  } catch (error) {
    throw new Error ('Error in fetching data')
  }
}
getSecData()
///  ////// Display Recipes 
const recipesSecContainer = document.querySelector ('#smallImages');
//data =null;
const secDisplayRecipie = (data)=>{
  if (data && data.length>0) {
    data.forEach(recipe =>{
      console.log(recipe)
      const card = document.createElement("div");
     // card.className='recipeCard'
      card.innerHTML=` <div class="col-md-4 mb-3">
                <img src="${recipe.image}" alt="Related Recipe 1" class="img-fluid">
            </div>
            <div class="col-md-4 mb-3">
                <img src="${recipe.image}" alt="Related Recipe 2" class="img-fluid">
            </div>
            <div class="col-md-4 mb-3">
                <img src="${recipe.image}" alt="Related Recipe 3" class="img-fluid">
            </div>
        </div> `
  recipesSecContainer.appendChild(card)
    });
    
  } else {
      recipesSecContainer.innerHtml=' No recipes found'
  }
}


