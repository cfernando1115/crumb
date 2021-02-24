import View from "./view.js";

const showRecipe = async function () {
    try {
        const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886');
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message} (${res.status})`);
        }

        let { recipe } = data.data;
        console.log(recipe);
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        };
        console.log(recipe.ingredients.length);

        const markup = `
        <div class="recipe-img">
            <img src="${recipe.image}" alt="test food picture">
        </div>
        <div class="recipe-title">
            <h1>${recipe.title}</h1>
        </div>
        <div class="recipe-servings">
            <p><i class="recipe-icon far fa-clock"></i>${recipe.cookingTime} MINUTES</p>
            <p><i class="recipe-icon fas fa-user-friends"></i>${recipe.servings} SERVINGS</p>
            <p>
                <a href="#/"><i class="recipe-icon far fa-plus-square"></i></a>
                <a href="#/"><i class="recipe-icon far fa-minus-square"></i></a>
            </p>
            <p>
                <a href="#/"><span><i class="far fa-bookmark"></i></span></a>
            </p>
        </div>
        <div class="recipe-ingredients">
            <div class="recipe-ingredients__row">
                <p class="ingredient"><i class="recipe-icon fas fa-check"></i>here is an ingredient</p>
                <p class="ingredient"><i class="recipe-icon fas fa-check"></i>here is an ingredient</p>
            </div>
            <div class="recipe-ingredients__row">
                <p><i class="recipe-icon fas fa-check"></i>here is an ingredient</p>
            </div>
        </div>
        <div class="recipe-site">
            <h3>Would you like to see more from ${recipe.publisher}?</h3>
            <p>Click <a href="${recipe.sourceUrl}">Here</a></p>
        </div>
        `;
        const recipeContainer = document.querySelector('.recipe');
        recipeContainer.innerHTML = '';
        recipeContainer.insertAdjacentHTML('afterbegin', markup);
        
    } catch (error) {
        alert(error);
    }
};

showRecipe();
