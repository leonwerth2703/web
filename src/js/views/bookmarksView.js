import View from './View.js';
import icons from '../../img/icons.svg';
import previewView from "./previewView.js";

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
    _message = '';

    addHandlerRender(handlerFunction) {
        window.addEventListener('load', handlerFunction);
    }

    _generateMarkup() {
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
    }
}

export default new BookmarksView();