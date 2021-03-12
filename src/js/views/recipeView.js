import View from './view.js';

class RecipeView extends View{
    _parentElement = document.querySelector('.recipe');
    _errorMessage = 'We could not find your recipe!';
    _message = 'Start by searching for a recipe!';


    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => {
            window.addEventListener(ev, handler);
        })        
    }

    _generateMarkup() {
        return `
        <div class="recipe-img">
            <img src="${this._data.image}" alt="${this._data.title}">
        </div>
        <div class="recipe-title">
            <h1>${this._data.title}</h1>
        </div>
        <div class="recipe-servings">
            <p><i class="recipe-icon far fa-clock"></i>${this._data.cookingTime} MINUTES</p>
            <p><i class="recipe-icon fas fa-user-friends"></i>${this._data.servings} SERVINGS</p>
            <p>
                <a href="#/"><i class="recipe-icon far fa-plus-square"></i></a>
                <a href="#/"><i class="recipe-icon far fa-minus-square"></i></a>
            </p>
            <p>
                <a href="#/"><span><i class="far fa-bookmark"></i></span></a>
            </p>
        </div>
        <div class="recipe-ingredients">
            ${this._generateIngredients(this._data.ingredients)}
        </div>
        <div class="recipe-site">
            <h3>Would you like to see more from ${this._data.publisher}?</h3>
            <p>Click <a href="${this._data.sourceUrl}">Here</a></p>
        </div>
        `;
    }

    _generateIngredients(ingredients){
        let ingredientMarkup = '';
        for (let i = 0; i < ingredients.length; i += 2){
            ingredientMarkup +=    
                `<div class="recipe-ingredients__row">
                    <span class="recipe-ingredients__icon"><i class="recipe-icon fas fa-check"></i></span><p class="ingredient">${ingredients[i].quantity ? ingredients[i].quantity.toString() : ''} ${ingredients[i].unit} ${ingredients[i].description}</p>
                `;
            ingredients[i + 1]
                ? ingredientMarkup +=
                    `
                        <span class="recipe-ingredients__icon"><i class="recipe-icon fas fa-check"></i></span><p class="ingredient">${ingredients[i+1].quantity ? ingredients[i + 1].quantity.toString(): ''} ${ingredients[i + 1].unit} ${ingredients[i + 1].description}</p>
                    </div>
                    `           
                : ingredientMarkup += `</div>`;
            
        }
        return ingredientMarkup;
    }
}

export default new RecipeView();