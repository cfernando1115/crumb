import View from './view.js';

class PaginationView extends View{
    _parentElement = document.querySelector('.search-results__pagination');
    _countElement = document.querySelector('.search-results__count');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.page-btn');
            if (!btn) {
                return;
            }
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        })
    }

    _generateMarkup() {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        this._countElement.innerHTML = `Page ${this._data.currentPage} of ${numPages} pages`;

        //page 1 of > 1
        if (this._data.currentPage === 1 && numPages > 1) {
            return `
            <button class="page-btn search-results__pagination--next" data-goto="${this._data.currentPage + 1}">${this._data.currentPage + 1} <i class="fas fa-arrow-right"></i></button>
            `;
        }

        //last page
        if (this._data.currentPage === numPages && numPages > 1) {
            return `
            <button class="page-btn search-results__pagination--prev" data-goto="${this._data.currentPage - 1}"><i class="fas fa-arrow-left"></i> ${this._data.currentPage - 1}</button>
            `;
        }

        //middle page
        if (this._data.currentPage < numPages) {
            return `
            <button class="page-btn search-results__pagination--prev" data-goto="${this._data.currentPage - 1}"><i class="fas fa-arrow-left"></i> ${this._data.currentPage - 1}</button>
            <button class="page-btn search-results__pagination--next" data-goto="${this._data.currentPage+1}">${this._data.currentPage+1} <i class="fas fa-arrow-right"></i></button>
            `;
        }

        return '';
    }
}

export default new PaginationView();