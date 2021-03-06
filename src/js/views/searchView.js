import View from './view.js';

class SearchView extends View{
    _parentElement = document.querySelector('.search');

    addHandlerSearch(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        });
    }

    getQuery() {
        const query = this._parentElement.querySelector('input').value;
        this._clearInput();
        return query;
    }

    _clearInput() {
        this._parentElement.querySelector('input').value = '';
    }
}

export default new SearchView();