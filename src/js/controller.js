import View from "./view.js";
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const showRecipe = async function () {
    try {
        const recipeContainer = document.querySelector('.recipe');
        renderSpinner(recipeContainer);
        const id = window.location.hash.slice(1);
        console.log(id);
        if (!id) {
            return;
        }
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
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

        const markup = `
        <div class="recipe-img">
            <img src="${recipe.image}" alt="${recipe.title}">
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
            ${generateIngredients(recipe.ingredients)}
        </div>
        <div class="recipe-site">
            <h3>Would you like to see more from ${recipe.publisher}?</h3>
            <p>Click <a href="${recipe.sourceUrl}">Here</a></p>
        </div>
        `;
        recipeContainer.innerHTML = '';
        recipeContainer.insertAdjacentHTML('afterbegin', markup);
        
    } catch (error) {
        alert(error);
    }

    function generateIngredients(ingredients){
        let ingredientMarkup = '';
        for (let i = 0; i < ingredients.length; i += 2){
            ingredientMarkup +=    
                `<div class="recipe-ingredients__row">
                    <span class="recipe-ingredients__icon"><i class="recipe-icon fas fa-check"></i></span><p class="ingredient">${ingredients[i].quantity} ${ingredients[i].unit} ${ingredients[i].description}</p>
                `;
            ingredients[i + 1]
                ? ingredientMarkup +=
                    `
                        <span class="recipe-ingredients__icon"><i class="recipe-icon fas fa-check"></i></span><p class="ingredient">${ingredients[i + 1].quantity} ${ingredients[i + 1].unit} ${ingredients[i + 1].description}</p>
                    </div>
                    `           
                : ingredientMarkup += `</div>`;
            
        }
        return ingredientMarkup;
    }

    function renderSpinner(parentEl) {
        const markup = '<div class="loader"></div>';
        parentEl.innerHTML = '';
        parentEl.insertAdjacentHTML('afterbegin', markup);
    }

};

showRecipe();

['hashchange', 'load'].forEach(ev => {
    window.addEventListener(ev, showRecipe);
})

