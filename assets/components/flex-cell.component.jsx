var React = require('react');
var ReactPureRenderMixin = require('react-addons-pure-render-mixin');

var maxSmallColumns = 12;
var maxMediumColumns = 12;
var maxLargeColumns = 12;
var maxExtraLargeColumns = 12;
var flexCell = {};

flexCell.displayName = 'FlexCell';

flexCell.mixins = [
  ReactPureRenderMixin
];

flexCell.propTypes = {
  verticalAlign: React.PropTypes.oneOf(['start', 'center', 'end']),
  smallColumns: React.PropTypes.number,
  mediumColumns: React.PropTypes.number,
  largeColumns: React.PropTypes.number,
  extraLargeColumns: React.PropTypes.number,
  flex: React.PropTypes.bool,
  className: React.PropTypes.string
};

flexCell.getDefaultProps = function flexCellGetDefaultProps() {
  return {
    verticalAlign: null,
    smallColumns: null,
    mediumColumns: null,
    largeColumns: null,
    extraLargeColumns: null,
    flex: false,
    className: null
  };
};

flexCell.getSmallColumnCount = function flexCellGetSmallColumnCount() {
  return this.props.smallColumns < maxSmallColumns ? this.props.smallColumns : maxSmallColumns;
};

flexCell.getMediumColumnCount = function flexCellGetMediumColumnCount() {
  return this.props.mediumColumns < maxMediumColumns ? this.props.mediumColumns : maxMediumColumns;
};

flexCell.getLargeColumnCount = function flexCellGetLargeColumnCount() {
  return this.props.largeColumns < maxLargeColumns ? this.props.largeColumns : maxLargeColumns;
};

flexCell.getExtraLargeColumnCount = function getExtraLargeColumnCount() {
  return this.props.extraLargeColumns < maxExtraLargeColumns ? this.props.extraLargeColumns : maxExtraLargeColumns;
};

flexCell.getCellCssClasses = function flexCellCellGetCssClasses() {
  var cssClasses = ['flex-row__cell'];

  if (this.props.smallColumns) {
    cssClasses.push('m-small-columns' + this.getSmallColumnCount());
  }

  if (this.props.mediumColumns) {
    cssClasses.push('m-medium-columns' + this.getMediumColumnCount());
  }

  if (this.props.largeColumns) {
    cssClasses.push('m-large-columns' + this.getLargeColumnCount());
  }

  if (this.props.extraLargeColumns) {
    cssClasses.push('m-extra-large-columns' + this.getExtraLargeColumnCount());
  }

  if (this.props.flex === true) {
    cssClasses.push('m-flex');
  }

  if (this.props.verticalAlign) {
    cssClasses.push('m-vertical-align-' + this.props.verticalAlign);
  }

  return cssClasses;
};

flexCell.getDataCssClasses = function flexCellGetDataCssClasses() {
  var cssClasses = ['flex-row__cell-data'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

flexCell.render = function flexCellRender() {
  return (
    <div className={this.getCellCssClasses().join(' ')}>
      <div className={this.getDataCssClasses().join(' ')}>
        {this.props.children}
      </div>
    </div>
  );
};

module.exports = React.createClass(flexCell);
