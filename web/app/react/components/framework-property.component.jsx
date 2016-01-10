var React = require('react');
var commonReact = require('../../../../assets/index');
var utilities = require('../../utilities/index');

var Code = commonReact.components.Code;

var frameworkProperty = {};

frameworkProperty.displayName = 'FrameworkProperty';

frameworkProperty.propTypes = {
  name: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  defaultValue: React.PropTypes.string.isRequired,
  descriptionNode: React.PropTypes.node.isRequired
};

frameworkProperty.getDefaultProps = function() {
  return {
    name: null,
    type: null,
    defaultValue: null,
    descriptionNode: null
  };
};

frameworkProperty.render = function() {
  return (
    <div className="framework-properties__property">
          <div className="framework-properties__property-name">{this.props.name}</div>
          <div className="framework-properties__property-details">
            <div className="framework-properties__property-type">{this.props.type} <span className="framework-properties__property-default-value">{this.props.defaultValue}</span></div>
            <div className="framework-properties__property-description">{this.props.descriptionNode}</div>
          </div>
    </div>
  );
};

module.exports = React.createClass(frameworkProperty);
