var React = require('react/addons');

var StyleGuideMethod = React.createClass({
  render: function() {
    var parameters = this.props.method.parameters.map(function(parameter, key) {
      var begin = key > 0 ? ', ' : '';

      return (
        <span key={parameter.name}>{begin}{parameter.type} {parameter.name}</span>
      );
    });

    return (
      <div className="style-guide__method">
        <div className="style-guide__method-definition">
          <span className="style-guide__method-return-type">{this.props.method.returnType}</span> <span className="style-guide__method-name">{this.props.method.name}</span>({parameters})
        </div>
        <div className="style-guide__method-description">
          {this.props.method.description}
        </div>
      </div>
    );
  }
});

module.exports = StyleGuideMethod;
