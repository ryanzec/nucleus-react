var React = require('react/addons');
var SvgIcon = require('./svg-icon.component.jsx');

var pagination = {};

pagination.displayName = 'Pagination';

pagination.mixins = [
  React.addons.PureRenderMixin
];

pagination.propTypes = {
  className: React.PropTypes.string,
  currentPage: React.PropTypes.number.isRequired,
  totalPages: React.PropTypes.number.isRequired,
  pagesToShow: React.PropTypes.number,
  setPage: React.PropTypes.func.isRequired
};

pagination.getDefaultProps = function paginationGetDefaultProps() {
  return {
    className: null,
    currentPage: 0,
    totalPages: 0,
    pagesToShow: 3,
    setPage: null
  };
};

pagination.onClickNavigation = function paginationOnClickNavigation(newPage) {
  this.props.setPage(newPage);
};

pagination.getCssClasses = function paginationGetCssClasses() {
  var cssClasses = ['pagination'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

pagination.renderPages = function paginationRenderPages() {
  var startPageNagivation = this.props.currentPage - Math.floor(this.props.pagesToShow / 2);
  var pageNavigation = [];

  if (startPageNagivation <= 0) {
    startPageNagivation = 1;
  }

  if (startPageNagivation > this.props.totalPages - Math.ceil(this.props.pagesToShow / 2)) {
    startPageNagivation = this.props.totalPages - Math.ceil(this.props.pagesToShow / 2);
  }

  var lastProcessedPageNumber = startPageNagivation;

  for (var x = 0; x < this.props.pagesToShow; x += 1) {
    if (startPageNagivation + x === 1 || startPageNagivation + x >= this.props.totalPages) {
      continue;
    }

    var cssClasses = 'pagination__navigation';

    if (startPageNagivation + x === parseInt(this.props.currentPage, 10)) {
      cssClasses += ' is-active';
    }

    pageNavigation.push(
      <li
        className={cssClasses}
        key={x}
        onClick={this.onClickNavigation.bind(this, startPageNagivation + x)}
      >
        {startPageNagivation + x}
      </li>
    );

    lastProcessedPageNumber = startPageNagivation + x;
  }

  var firstPageCssClasses = 'pagination__navigation';

  if (parseInt(this.props.currentPage, 10) === 1) {
    firstPageCssClasses += ' is-active';
  }

  var pages = [];
  pages.push(
    <li
      className="pagination__navigation pagination__previous"
      key="previous"
      onClick={this.onClickNavigation.bind(this, this.props.currentPage - 1)}
    >
      <SvgIcon
        svgPath="/components/nucleus-icons/svg/svg-sprite.svg"
        fragment="chevron-left"
      />
    </li>
  );
  pages.push(
    <li
      className={firstPageCssClasses}
      key="first"
      onClick={this.onClickNavigation.bind(this, 1)}
    >
      {1}
    </li>
  );

  if (startPageNagivation > 2) {
    pages.push(
      <li
        className="pagination__ellipse"
        key="first-ellipse"
      >
        ...
      </li>
    );
  }

  pages = pages.concat(pageNavigation);

  if (lastProcessedPageNumber < this.props.totalPages - 1) {
    pages.push(
      <li
        className="pagination__ellipse"
        key="last-ellipse"
      >
        ...
      </li>
    );
  }

  var lastPageCssClasses = 'pagination__navigation';

  if (parseInt(this.props.currentPage, 10) === parseInt(this.props.totalPages, 10)) {
    lastPageCssClasses += ' is-active';
  }

  pages.push(
    <li
      className={lastPageCssClasses}
      key="last"
      onClick={this.onClickNavigation.bind(this, this.props.totalPages)}
    >
      {this.props.totalPages}
    </li>
  );
  pages.push(
    <li
      className="pagination__navigation pagination__next"
      key="next"
      onClick={this.onClickNavigation.bind(this, this.props.currentPage + 1)}
    >
      <SvgIcon
        svgPath="/components/nucleus-icons/svg/svg-sprite.svg"
        fragment="chevron-right"
      />
    </li>
  );

  return (
    <ul className="pagination__pages plain-list">
      {pages}
    </ul>
  );
};

pagination.render = function paginationRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.renderPages()}
    </div>
  );
};

module.exports = React.createClass(pagination);
