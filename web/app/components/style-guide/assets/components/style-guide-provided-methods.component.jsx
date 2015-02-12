var React = require('react/addons');
var StyleGuideMethod = require('./style-guide-method.component.jsx');

var StyleGuideProvidedMethods = React.createClass({
  render: function() {
    var methods = this.props.providedMethods.map(function(method) {
      return (
        <StyleGuideMethod method={method} key={method.name} />
      );
    });

    return (
      <div className="style-guide__methods">
        <header className="style-guide__section-header">Provided Methods</header>
        <p>
          These are methods that are provided by adding this mixin.  This only documents the public methods.
        </p>
        <div>
          {methods}
        </div>
      </div>
    );
  }
});

module.exports = StyleGuideProvidedMethods;
