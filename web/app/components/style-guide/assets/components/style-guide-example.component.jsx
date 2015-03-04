var React = require('react/addons');
var Code = require('../../../../../../assets/index').components.Code;
var _ = require('lodash');

var StyleGuideExample = React.createClass({
  propTypes: {
    description: React.PropTypes.any,
    example: React.PropTypes.any.isRequired,
    exampleLanguage: React.PropTypes.string,
    exampleString: React.PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      description: null,
      example: null,
      exampleLanguage: 'javascript',
      exampleString: null
    };
  },

  getInitialState: function() {
    return {
      showExampleCode: false
    };
  },

  _onToggleExampleCode: function(event) {
    event.preventDefault();
    this.setState({
      showExampleCode: !this.state.showExampleCode
    });
  },

  render: function() {
    var description = (this.props.description && _.isString(this.props.description))
    ? description = (
      <p>{this.props.description}</p>
    )
    : this.props.description;

    return (
      <div className="style-guide__example">
        {description}
        <div>
          <a href onClick={this._onToggleExampleCode}>{this.state.showExampleCode === true ? 'Hide' : 'Show'} Code</a>
        </div>
        {this.state.showExampleCode === true ? <Code language={this.props.exampleLanguage}>{this.props.exampleString}</Code> : ''}
        {this.props.example}
      </div>
    );
  }
});

module.exports = StyleGuideExample;
