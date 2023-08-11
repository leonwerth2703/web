import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handlerFunction) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;
            const goToPage = +btn.dataset.goto;
            handlerFunction(goToPage);
        });
    }

    _generateMarkup() {
        const currentPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        // Page 1, and there are other pages
        if (currentPage === 1 && numPages > 1) {
            return this._generateMarkupPagination('next', currentPage);
        }

        // Last page
        if (currentPage === numPages && numPages > 1) {
            return this._generateMarkupPagination('prev', currentPage);
        }

        // Other page
        if (currentPage < numPages) {
            return this._generateMarkupPagination(undefined, currentPage);
        }

        // Page 1, and there are NO other pages
        return '';
    }

    _generateMarkupPagination(type, currentPage) {
        const next = `<button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
              <span>Page ${currentPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button>`;

        const prev = `<button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${currentPage - 1}</span>
            </button>`;

        if (type === 'next') {
            return next;
        } else if (type === 'prev') {
            return prev;
        } else {
            return prev + next;
        }
    }
}

export default new PaginationView();
