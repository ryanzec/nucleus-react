import forEach from 'lodash/forEach';
import immutable from 'immutable';

export default class PaginationTracker {
  constructor(options) {
    const data = {};

    data.currentPage = options.initialPage || 1;
    data.totalItems = options.totalItems || 0;
    data.itemsPerPage = options.itemsPerPage || 1;
    data.totalPages = data.itemsPerPage > 0 ? Math.ceil(data.totalItems / data.itemsPerPage) : 0;

    this.data = immutable.fromJS(data);
    this.data = this.data.withMutations((map) => {
      map
        .set('itemIndexes', this.getStartStopIndexes())
        .set('onFirstPage', this.onFirstPage())
        .set('onLastPage', this.onLastPage());
    });
  }

  updateOptions(options) {
    const validOptions = ['totalItems', 'itemsPerPage'];

    if (options) {
      forEach(options, (value, key) => {
        if (validOptions.indexOf(key) !== -1) {
          this.data = this.data.setIn([key], value);
        }
      });
    }
  }

  setCurrentPage(newPage) {
    this.data = this.data.withMutations((map) => {
      const newCurrentPage = this.calculatePageNumber(newPage);

      map
        .set('currentPage', this.calculatePageNumber(newCurrentPage))
        .set('itemIndexes', this.getStartStopIndexes(newCurrentPage))
        .set('onFirstPage', this.onFirstPage(newCurrentPage))
        .set('onLastPage', this.onLastPage(newCurrentPage));
    });
  }

  onFirstPage(overrideTestCurrentPage) {
    const currentPage = overrideTestCurrentPage || this.data.getIn(['currentPage']);
    return currentPage <= 1;
  }

  onLastPage(overrideTestCurrentPage) {
    const currentPage = overrideTestCurrentPage || this.data.getIn(['currentPage']);
    return currentPage >= this.data.getIn(['totalPages']);
  }

  previousPage() {
    this.setCurrentPage(this.data.getIn(['currentPage']) - 1);
  }

  nextPage() {
    this.setCurrentPage(this.data.getIn(['currentPage']) + 1);
  }

  calculatePageNumber(newPage) {
    if (newPage > this.data.getIn(['totalPages'])) {
      newPage = this.data.getIn(['totalPages']);
    } else if (newPage < 1) {
      newPage = 1;
    }

    return newPage;
  }

  getStartStopIndexes(overrideTestCurrentPage) {
    const currentPage = overrideTestCurrentPage || this.data.getIn(['currentPage']);
    const startIndex = ((currentPage - 1) * this.data.getIn(['itemsPerPage']));
    let stopIndex = startIndex + this.data.getIn(['itemsPerPage']) - 1;

    if (stopIndex > this.data.getIn(['totalItems'])) {
      stopIndex = this.data.getIn(['totalItems']) - 1;
    }

    return {
      start: startIndex,
      stop: stopIndex
    };
  }
}
