var React = require('react/addons');

var code = {};

code.displayName = 'Code';

code.propTypes = {
  language: React.PropTypes.string.isRequired,
  showLineNumbers: React.PropTypes.bool,
  lineNumberStart: React.PropTypes.number,
  highlightLines: React.PropTypes.string
};

code.getDefaultProps = function() {
  return {
    language: null,
    showLineNumbers: true,
    lineNumberStart: null,
    hightlightLines: null
  };
};

code.componentDidMount = function() {
  window.Prism.highlightElement(this.getDOMNode().querySelector('code'));
};

code.componentDidUpdate = function() {
  window.Prism.highlightElement(this.getDOMNode().querySelector('code'));
};

//TODO: simplify this method
code.render = function() {
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
};

module.exports = React.createClass(code);
