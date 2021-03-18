import View from './view.js';

class ResultsView extends View{
    _parentElement = document.querySelector('.search-results__list');
    _errorMessage = 'No recipes found matching your search. Try again!';
    _message = '';

    updateActive(id) {
        const results = this._parentElement.querySelectorAll('.result-container');
        results.forEach(res => {
            const resId = res.hash.slice(1);
            if (res.classList.contains('result-active') && resId !== id) {
                res.classList.remove('result-active');
            }
            if (resId === id) {
                res.classList.add('result-active');
            }
        })
    }

    _generateMarkup() {
        return this._data.map(this._generateMarkupResult).join('');
    }

    _generateMarkupResult(res) {
        const id = window.location.hash.slice(1);
        return `
        <li>
            <a href="#${res.id}" class="result-container ${id === res.id ? 'result-active' : ''}">
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