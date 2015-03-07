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
  align: React.PropTypes.oneOf(['top', 'center', 'bottom']),
  smallColumns: React.PropTypes.number,
  mediumColumns: React.PropTypes.number,
  columns: React.PropTypes.number,
  largeColumns: React.PropTypes.number,
  flex: React.PropTypes.bool
};

flexCell.getDefaultProps = function() {
  return {
    align: null,
    smallColumns: null,
    mediumColumns: null,
    columns: null,
    largeColumns: null,
    flex: false
  };
};

flexCell.getSmallColumnCount = function() {
  return this.props.smallColumns < maxSmallColumns ? this.props.smallColumns : maxSmallColumns;
};

flexCell.getMediumColumnCount = function() {
  return this.props.mediumColumns < maxMediumColumns ? this.props.mediumColumns : maxMediumColumns;
};

flexCell.getColumnCount = function() {
  return this.props.columns < maxColumns ? this.props.columns : maxColumns;
};

flexCell.getLargeColumnCount = function() {
  return this.props.largeColumns < maxLargeColumns ? this.props.largeColumns : maxLargeColumns;
};

flexCell.getCssClasses = function() {
  var cssClasses = ['flex-row__cell'];

  if(this.props.smallColumns) {
    cssClasses.push('m-small-columns' + this.getSmallColumnCount());
  }

  if(this.props.mediumColumns) {
    cssClasses.push('m-medium-columns' + this.getMediumColumnCount());
  }

  if(this.props.columns) {
    cssClasses.push('m-columns' + this.getColumnCount());
  }

  if(this.props.largeColumns) {
    cssClasses.push('m-large-columns' + this.getLargeColumnCount());
  }

  if(this.props.flex === true) {
    cssClasses.push('m-flex');
  }

  if(this.props.align) {
    cssClasses.push('m-align-' + this.props.align);
  }

  return cssClasses;
};

flexCell.render = function() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      <div className="flex-row__cell-data">
        {this.props.children}
      </div>
    </div>
  );
};

module.exports = React.createClass(flexCell);
