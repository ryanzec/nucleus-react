var React = require('react/addons');

var maxSmallColumns = 12;
var maxMediumColumns = 12;
var maxColumns = 12;
var maxLargeColumns = 12;
var flexCell = {};

flexCell.displayName = 'FlexCell';

flexCell.mixins = [
  React.addons.PureRenderMixin
];

flexCell.propTypes = {
  verticalAlign: React.PropTypes.oneOf(['start', 'center', 'end']),
  smallColumns: React.PropTypes.number,
  mediumColumns: React.PropTypes.number,
  columns: React.PropTypes.number,
  largeColumns: React.PropTypes.number,
  flex: React.PropTypes.bool,
  className: React.PropTypes.string
};

flexCell.getDefaultProps = function flexCellGetDefaultProps() {
  return {
    verticalAlign: null,
    smallColumns: null,
    mediumColumns: null,
    columns: null,
    largeColumns: null,
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

flexCell.getColumnCount = function flexCellGetColumnCount() {
  return this.props.columns < maxColumns ? this.props.columns : maxColumns;
};

flexCell.getLargeColumnCount = function flexCellGetLargeColumnCount() {
  return this.props.largeColumns < maxLargeColumns ? this.props.largeColumns : maxLargeColumns;
};

flexCell.getCssClasses = function flexCellGetCssClasses() {
  var cssClasses = ['flex-row__cell'];

  if (this.props.smallColumns) {
    cssClasses.push('m-small-columns' + this.getSmallColumnCount());
  }

  if (this.props.mediumColumns) {
    cssClasses.push('m-medium-columns' + this.getMediumColumnCount());
  }

  if (this.props.columns) {
    cssClasses.push('m-columns' + this.getColumnCount());
  }

  if (this.props.largeColumns) {
    cssClasses.push('m-large-columns' + this.getLargeColumnCount());
  }

  if (this.props.flex === true) {
    cssClasses.push('m-flex');
  }

  if (this.props.verticalAlign) {
    cssClasses.push('m-vertical-align-' + this.props.verticalAlign);
  }

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

flexCell.render = function flexCellRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      <div className="flex-row__cell-data">
        {this.props.children}
      </div>
    </div>
  );
};

module.exports = React.createClass(flexCell);
