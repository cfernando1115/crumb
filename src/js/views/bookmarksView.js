import View from './view.js';
import thumbnailView from './thumbnailView.js';

class BookmarksView extends View{
    _parentElement = document.querySelector('.bookmarks-dropdown__content');
    _errorMessage = 'No bookmarks yet!';
    _message = '';

    _generateMarkup() {
        return this._data.map(bookmark => thumbnailView.render(bookmark, false)).join('');
    }
}

export default new BookmarksView();