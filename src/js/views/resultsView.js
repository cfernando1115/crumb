import View from './view.js';
import thumbnailView from './thumbnailView.js';

class ResultsView extends View {
    _parentElement = document.querySelector('.search-results__list');
    _errorMessage = 'No recipes found matching your search. Try again!';
    _message = '';
    
    _generateMarkup() {
        return this._data.map(result => thumbnailView.render(result, false)).join('');
    }
}

export default new ResultsView();