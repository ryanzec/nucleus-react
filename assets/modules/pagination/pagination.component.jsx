var React = require('react/addons');
var SvgIcon = require('../svg/icon.component.jsx');

var Pagination = React.createClass({
  mixins: [
    React.addons.PureRenderMixin
  ],

  propTypes: {
    className: React.PropTypes.string,
    currentPage: React.PropTypes.number.isRequired,
    totalPages: React.PropTypes.number.isRequired,
    pagesToShow: React.PropTypes.number,
    setPage: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      className: null,
      currentPage: 0,
      totalPages: 0,
      pagesToShow: 3,
      setPage: null
    };
  },

  clickNavigationCallback: function(newPage) {
    return function(event) {
      this.props.setPage(newPage);
    }.bind(this);
  },

  getCssClasses: function() {
    var cssClasses = ['pagination'];

    if(this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  },

  renderPages: function() {
    var startPageNagivation = this.props.currentPage - Math.floor(this.props.pagesToShow / 2);
    var pageNavigation = [];

    if(startPageNagivation <= 0) {
      startPageNagivation = 1;
    }

    if(startPageNagivation > this.props.totalPages - Math.ceil(this.props.pagesToShow / 2)) {
      startPageNagivation = this.props.totalPages - Math.ceil(this.props.pagesToShow / 2);
    }

    var lastProcessedPageNumber = startPageNagivation;

    for(var x = 0; x < this.props.pagesToShow; x += 1) {
      if(startPageNagivation + x === 1 || startPageNagivation + x >= this.props.totalPages) {
        continue;
      }

      var cssClasses = 'pagination__navigation';

      if(startPageNagivation + x === parseInt(this.props.currentPage)) {
        cssClasses += ' is-active';
      }

      /* jshint ignore:start */
      pageNavigation.push(
        <li className={cssClasses} key={x} onClick={this.clickNavigationCallback(startPageNagivation + x)}>{startPageNagivation + x}</li>
      );
      /* jshint ignore:end */

      lastProcessedPageNumber = startPageNagivation + x;
    }

    var firstPageCssClasses = 'pagination__navigation';

    if(parseInt(this.props.currentPage) === 1) {
      firstPageCssClasses += ' is-active';
    }

    var pages = [];
    /* jshint ignore:start */
    pages.push(
      <li className="pagination__navigation pagination__previous" key="previous" onClick={this.clickNavigationCallback(this.props.currentPage - 1)}>
        <SvgIcon
          svgPath="/components/nucleus-icons/svg/svg-sprite.svg"
          fragment="chevron-left" />
      </li>
    );
    pages.push(
      <li className={firstPageCssClasses} key="first" onClick={this.clickNavigationCallback(1)}>{1}</li>
    );
    /* jshint ignore:end */

    /* jshint ignore:start */
    if(startPageNagivation > 2) {
      pages.push(
        <li className="pagination__ellipse" key="first-ellipse">...</li>
      );
    }
    /* jshint ignore:end */

    pages = pages.concat(pageNavigation);

    /* jshint ignore:start */
    if(lastProcessedPageNumber < this.props.totalPages - 1) {
      pages.push(
        <li className="pagination__ellipse" key="last-ellipse">...</li>
      );
    }
    /* jshint ignore:end */

    var lastPageCssClasses = 'pagination__navigation';

    if(parseInt(this.props.currentPage) === parseInt(this.props.totalPages)) {
      lastPageCssClasses += ' is-active';
    }

    /* jshint ignore:start */
    pages.push(
      <li className={lastPageCssClasses} key="last" onClick={this.clickNavigationCallback(this.props.totalPages)}>{this.props.totalPages}</li>
    );
    pages.push(
      <li className="pagination__navigation pagination__next" key="next" onClick={this.clickNavigationCallback(this.props.currentPage + 1)}>
        <SvgIcon
          svgPath="/components/nucleus-icons/svg/svg-sprite.svg"
          fragment="chevron-right" />
      </li>
    );
    /* jshint ignore:end */

    /* jshint ignore:start */
    return (
      <ul className="pagination__pages plain-list">
        {pages}
      </ul>
    );
    /* jshint ignore:end */
  },

  render: function() {
    /* jshint ignore:start */
    return (
      <div className={this.getCssClasses().join(' ')}>
        {this.renderPages()}
      </div>
    );
    /* jshint ignore:end */
  }
});

module.exports = Pagination;
