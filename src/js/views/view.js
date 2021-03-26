export default class View{
    _data;

    render(data, render = true) {
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return this.renderError();
        }
        this._data = data;
        const markup = this._generateMarkup();
        if (!render) {
            return markup;
        }
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderSpinner() {
        const markup = '<div class="loader"></div>';
        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }  

    renderError(message = this._errorMessage) {
        const markup = `
        <div class="error">
            <i class="message-icon fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this._message) {
        const markup = `
        <div class="message">
            <i class="message-icon fas fa-smile"></i>
            <p>${message}</p>
        </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

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
    
    _clear() {
        this._parentElement.innerHTML = '';
    }
}