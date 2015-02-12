var React = require('react/addons');
var StyleGuideProperty = require('./style-guide-property.component.jsx');

var StyleGuideProperties = React.createClass({
  render: function() {
    return (
      <div>
        <header className="style-guide__section-header">Properties</header>
        <div>Here are the following properties that can be passed to this component:</div>
        <table className="style-guide__properties">
          <thead>
            <tr className="style-guide__property">
              <th className="style-guide__property-name">Property</th>
              <th className="style-guide__property-type">Value Type</th>
              <th className="style-guide__property-default">Default Value</th>
              <th className="style-guide__property-valid-values">Valid Values</th>
              <th className="style-guide__property-description">Description</th>
            </tr>
          </thead>
          <tbody>
            {this.props.properties.map(function(property) {
              return (
                <StyleGuideProperty
                  type={property.type}
                  name={property.name}
                  key={property.name}
                  defaultValue={property.defaultValue}
                  validValues={property.validValues}
                  description={property.description} />
              );
            })}
            </tbody>
        </table>
      </div>
    );
  }
});

module.exports = StyleGuideProperties;
