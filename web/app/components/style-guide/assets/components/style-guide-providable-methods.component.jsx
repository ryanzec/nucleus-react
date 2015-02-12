var React = require('react/addons');
var StyleGuideMethod = require('./style-guide-method.component.jsx');

var StyleGuideProvidableMethods = React.createClass({
  render: function() {
    var methods = this.props.providableMethods.map(function(method) {
      return (
        <StyleGuideMethod method={method} key={method.name} />
      );
    });

    return (
      <div className="style-guide__methods">
        <header className="style-guide__section-header">Providable Methods</header>
        <p>
          These are methods that can be provided by the component this mixin is attached to.  Required methods are marked as such.
        </p>
        <div>
          {methods}
        </div>
      </div>
    );
  }
});

module.exports = StyleGuideProvidableMethods;
