import View from './view.js';

class ResultsView extends View{
    _parentElement = document.querySelector('.search-results__list');
    _errorMessage = 'No recipes found matching your search. Try again!';
    _message = '';

    _generateMarkup() {
        return this._data.map(this._generateMarkupResult).join('');
    }

    _generateMarkupResult(res) {
        return `
        <li>
            <a href="#${res.id}" class="result-container">
                <div class="result-image">
                    <img src="${res.image}" alt="${res.title}">
                </div>
                <div class="result-title">
                    <p>${res.title}</p>
                    <p>${res.publisher}</p>
                </div>
            </a>
        </li>
        `;
    }
}

export default new ResultsView();