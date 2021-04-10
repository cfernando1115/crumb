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
            this.toggleModal();
        })
    }

    _addHandlerHideModal() {
        this._closeBtn.addEventListener('click', () => {
            this.toggleModal();
        })
    }
}

export default new AddRecipeView();