var React = require('react/addons');
var StyleGuideMethod = require('./style-guide-method.component.jsx');

var StyleGuideProvidedMethods = React.createClass({
  render: function() {
    var methods = this.props.actions.map(function(method) {
      return (
        <StyleGuideMethod method={method} key={method.name} />
      );
    });

    return (
      <div className="style-guide__methods">
        <header className="style-guide__section-header">Actions</header>
        <p>
          These are actions that are available from this store.
        </p>
        <div>
          {methods}
        </div>
      </div>
    );
  }
});

module.exports = StyleGuideProvidedMethods;
