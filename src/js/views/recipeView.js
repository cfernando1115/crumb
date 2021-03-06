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

    addHandlerUpdateServings(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.serving-btn');
            if (!btn) {
                return;
            }
            const updateTo = +btn.dataset.updateTo;
            if (updateTo > 0) {
                handler(updateTo);
            }
        })
    }

    addHandlerAddBookmark(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.bookmark-btn');

            if (!btn) {
                return;
            }

            handler();
        })
    }

    renderServings(data, all = true) {    
        const recipeServings = document.querySelector('.recipe-servings');
        recipeServings.innerHTML = '';

        const servingsMarkup = this._generateServings(data);
        recipeServings.insertAdjacentHTML('afterbegin', servingsMarkup);

        //if all === false, only servings container will be re-rendered (for bookmarks)
        if (all === true) {                   
            const recipeIngredients = document.querySelector('.recipe-ingredients');
            recipeIngredients.innerHTML = '';

            const ingredientsMarkup = this._generateIngredients(data.ingredients);
            recipeIngredients.insertAdjacentHTML('afterbegin', ingredientsMarkup);
        }
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
            ${this._generateServings()}
        </div>
        <div class="recipe-ingredients">
            ${this._generateIngredients()}
        </div>
        <div class="recipe-site">
            <h3>Would you like to see more from ${this._data.publisher}?</h3>
            <p>Click <a target="_blank" href="${this._data.sourceUrl}">Here</a></p>
        </div>
        `;
    }

    _generateServings(data = this._data) {
        return `
        <p><i class="recipe-icon far fa-clock"></i>${data.cookingTime} MINUTES</p>
        <p><i class="recipe-icon fas fa-user-friends"></i>${data.servings} SERVINGS</p>
        <p>
            <button class="serving-btn" data-update-to="${data.servings+1}"><i class="recipe-icon far fa-plus-square"></i></button>
            <button class="serving-btn" data-update-to="${data.servings-1}"><i class="recipe-icon far fa-minus-square"></i></button>
        </p>
        <p>
            <button class="user-btn"><span><i class="far fa-user ${this._data.key ? '' : 'hidden'}"></i></span></button>
        </p>
        <p>
            <button class="bookmark-btn"><span><i class="${data.bookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'}"></i></span></button>
        </p>
        `;
    }

    _generateIngredients(ingredients = this._data.ingredients){
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