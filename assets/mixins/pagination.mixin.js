var _ = require('lodash');

module.exports = {
  setPaginationPage: function(newPage) {
    if(newPage > this.state.paginationTotalPages) {
      newPage = this.state.paginationTotalPages;
    } else if(newPage < 1) {
      newPage = 1;
    }

    this.setState({
      paginationCurrentPage: newPage
    });
  }
};
