var paginationMixin = {};

paginationMixin.setPaginationPage = function paginationMixinSetPaginationPage(newPage) {
  if (newPage > this.state.paginationTotalPages) {
    newPage = this.state.paginationTotalPages;
  } else if (newPage < 1) {
    newPage = 1;
  }

  this.setState({
    paginationCurrentPage: newPage
  });
};

module.exports = paginationMixin;
