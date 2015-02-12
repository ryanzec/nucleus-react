var React = require('react/addons');

var StyleGuideProperty = React.createClass({
  propTypes: {
    type: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.any.isRequired,
    defaultValue: React.PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      type: null,
      name: null,
      description: null,
      defaultValue: null
    };
  },

  render: function() {
    var validValues = 'any';

    if(this.props.type === 'boolean') {
      this.props.validValues = [
        'true',
        'false'
      ]
    }

    if(this.props.validValues) {

      var values = this.props.validValues.map(function(value, key) {
        return (
          <li key={key}>{value}</li>
        );
      });

      validValues = (
        <ul className="plain-list">
          {values}
        </ul>
      );
    }

    return (
      <tr className="style-guide__property">
        <td className="style-guide__property-name"><span className="collapsed-header">Property</span>{this.props.name}</td>
        <td className="style-guide__property-type"><span className="collapsed-header">Value Type</span>{this.props.type}</td>
        <td className="style-guide__property-default"><span className="collapsed-header">Default Value</span>{this.props.defaultValue}</td>
        <td className="style-guide__property-valid-values"><span className="collapsed-header">Valid Values</span>{validValues}</td>
        <td className="style-guide__property-description"><span className="collapsed-header">Description</span>{this.props.description}</td>
      </tr>
    );
  }
});

module.exports = StyleGuideProperty;
