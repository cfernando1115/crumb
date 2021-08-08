import View from './view.js';

class AddRecipeView extends View{
    _message = 'Recipe was successfully uploaded';
    _parentElement = document.querySelector('.upload-form');
    _uploadModal = document.querySelector('.upload-modal');
    _overlay = document.querySelector('.overlay');
    _openBtn = document.querySelector('.add-recipe');
    _closeBtn = document.querySelector('.model-close__btn');
    _uploadBtn = document.querySelector('.upload-form__btn');

    constructor() {
        super();
        this._addHandlerShowModal();
        this._addHandlerHideModal();
    }

    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const dataArr = [...new FormData(this._parentElement)];
            const data = Object.fromEntries(dataArr);
            handler(data);
        })
    }

    toggleModal() {
        this._overlay.classList.toggle('hidden');
        this._uploadModal.classList.toggle('hidden');
    }

    _addHandlerShowModal() {
        this._openBtn.addEventListener('click', () => {
            this._parentElement.innerHTML = '';
            this._generateMarkup();
            this.toggleModal();
        })
    }

    _addHandlerHideModal() {
        this._closeBtn.addEventListener('click', () => {
            this.toggleModal();
        })
    }

    _generateMarkup() {
        const markup = `
        <div class="upload-info">
            <div class="upload-column">
                <h3 class="upload-column__heading">Recipe data</h3>
                <label>Title</label>
                <input required name="title" type="text" />
                <label>URL</label>
                <input required name="sourceUrl" type="text" />
                <label>Image URL</label>
                <input required name="image" type="text" />
                <label>Publisher</label>
                <input required name="publisher" type="text" />
                <label>Prep time</label>
                <input required name="cookingTime" type="number" />
                <label>Servings</label>
                <input required name="servings" type="number" />
            </div>
    
            <div class="upload-column">
                <h3 class="upload-column__heading">Ingredients</h3>
                ${this._generateIngredientFields()}
            </div>
        </div>            
        <button type="submit" class="upload-form__btn"><span><i class="fas fa-cloud-upload-alt"></i></span>Upload</button>`;
    
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _generateIngredientFields() {
        let ingredientHtml = '';
        for (let i = 1; i <= 6; i++) {
            ingredientHtml += `
            <fieldset>
                <legend>Ingredient ${i}</legend>
                <div class="ing-holder">
                    <label class="sr-only">Qty</label>
                    <input
                        type="text"
                        class="ing__input--qty"
                        ${i === 1 ? 'required' : ''}
                        name="ingredient[${i}][qty]"
                        placeholder="Qty"
                    />
                    <label class="sr-only">Unit</label>
                    <input
                        type="text"
                        class="ing__input--unit"
                        ${i === 1 ? 'required' : ''}
                        name="ingredient[${i}][unit]"
                        placeholder="Unit"
                    />
                    <label class="sr-only">Description</label>
                    <input
                        type="text"
                        class="ing__input--desc"
                        ${i === 1 ? 'required' : ''}
                        name="ingredient[${i}][desc]"
                        placeholder="Description"
                    />
                </div>
            </fieldset>`;
        }
        return ingredientHtml;
    }
}

export default new AddRecipeView();