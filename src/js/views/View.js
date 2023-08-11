import icons from 'url:../../img/icons.svg';

export default class View {
    _data;
    _parentElement;
    _errorMessage;
    _message;

    render(data, render = true) {
        if (!data || Array.isArray(data) && data.length === 0) return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();

        if (!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data) {
        this._data = data;
        const newMarkup = this._generateMarkup();
        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const currentElements = this._parentElement.querySelectorAll('*');
        // Update changed TEXT
        newElements.forEach((newElement, i) => {
            const currentElement = currentElements[i];

            if (!newElement.isEqualNode(currentElement) && newElement.firstChild?.nodeValue.trim() !== '') {
                currentElement.textContent = newElement.textContent;
            }

            // Updates changed ATTRIBUTES
            if (!newElement.isEqualNode(currentElement)) {
                Array.from(newElement.attributes).forEach(attribute => {
                    currentElement.setAttribute(attribute.name, attribute.value);
                });
            }
        });
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner() {
        const markup = `<div class="spinner">
                        <svg>
                            <use href="${icons}#icon-loader"></use>
                        </svg>
                    </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message = this._errorMessage) {
        const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('beforeend', markup);
    }

    renderMessage(message = this._message) {
        const markup = `<div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('beforeend', markup);
    }

    _generateMarkup() {

    }
}