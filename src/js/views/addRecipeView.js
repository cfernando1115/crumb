import { Obj } from 'prelude-ls';
import View from './view.js';

class AddRecipeView extends View{
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

    _addHandlerShowModal() {
        this._openBtn.addEventListener('click', () => {
            this._toggleModal();
        })
    }

    _addHandlerHideModal() {
        this._closeBtn.addEventListener('click', () => {
            this._toggleModal();
        })
    }

    _toggleModal() {
        this._overlay.classList.toggle('hidden');
        this._uploadModal.classList.toggle('hidden');
    }

    _generateMarkup() {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        //page 1 of > 1
        if (this._data.currentPage === 1 && numPages > 1) {
            return `
            <button class="page-btn search-results__pagination--next" data-goto="${this._data.currentPage+1}">${this._data.currentPage+1} <i class="fas fa-arrow-right"></i></button>
            `;
        }

        //last page
        if (this._data.currentPage === numPages && numPages > 1) {
            return `
            <button class="page-btn search-results__pagination--prev" data-goto="${this._data.currentPage-1}"><i class="fas fa-arrow-left"></i> ${this._data.currentPage-1}</button>
            `;
        }

        //middle page
        if (this._data.currentPage < numPages) {
            return `
            <button class="page-btn search-results__pagination--prev" data-goto="${this._data.currentPage-1}"><i class="fas fa-arrow-left"></i> ${this._data.currentPage-1}</button>
            <button class="page-btn search-results__pagination--next" data-goto="${this._data.currentPage+1}">${this._data.currentPage+1} <i class="fas fa-arrow-right"></i></button>
            `;
        }

        return '';
    }
}

export default new AddRecipeView();