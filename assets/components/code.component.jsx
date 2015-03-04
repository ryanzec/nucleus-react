var React = require('react/addons');

var Code = React.createClass({
  componentDidMount: function() {
    window.Prism.highlightElement(this.getDOMNode().querySelector('code'));
  },

  componentDidUpdate: function() {
    window.Prism.highlightElement(this.getDOMNode().querySelector('code'));
  },

  propTypes: {
    language: React.PropTypes.string.isRequired,
    showLineNumbers: React.PropTypes.bool,
    lineNumberStart: React.PropTypes.number,
    highlightLines: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      language: null,
      showLineNumbers: true,
      lineNumberStart: null,
      hightlightLines: null
    };
  },

  render: function() {
    var codeCssClasses = ['language-' + this.props.language];
    var preCssClasses = [];
    var codeAttributes = {};
    var preAttributes = {};

    if(this.props.showLineNumbers === true) {
      preCssClasses.push('line-numbers');

      if(this.props.lineNumberStart !== null) {
        preAttributes['data-start'] = this.props.lineNumberStart;
      }
    }

    if(this.props.highlightLines) {
      preAttributes['data-line'] = this.props.highlightLines;
    }

    if(this.props.className) {
      preCssClasses.push(this.props.className);
    }

    codeAttributes.className = codeCssClasses.join(' ');
    preAttributes.className = preCssClasses.join(' ');

    return (
      React.createElement("pre", preAttributes,
        React.createElement("code", codeAttributes, this.props.children)
      )
    );
  }
});

module.exports = Code;
