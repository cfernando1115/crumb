import View from './view.js';

class ThumbnailView extends View{

    _generateMarkup() {
        const id = window.location.hash.slice(1);
        return `
        <li>
            <a href="#${this._data.id}" class="result-container ${id === this._data.id ? 'result-active' : ''}">
                <div class="result-image">
                    <img src="${this._data.image}" alt="${this._data.title}">
                </div>
                <div class="result-title">
                    <p>${this._data.title}</p>
                    <p>${this._data.publisher}</p>
                </div>
                <div><span><i class="far fa-user ${this._data.key ? '' : 'hidden'}"></i></span></div>
            </a>
        </li>
        `;
    }
}

export default new ThumbnailView();