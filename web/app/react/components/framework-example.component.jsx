var React = require('react/addons');
var commonReact = require('../../../../assets/index');
var utilities = require('../../utilities/index');

var Code = commonReact.components.Code;

var frameworkExample = {};

frameworkExample.displayName = 'FrameworkExample';

frameworkExample.propTypes = {
  exampleCode: React.PropTypes.string.isRequired
};

frameworkExample.getDefaultProps = function() {
  return {
    exampleCode: null
  };
};

frameworkExample.getInitialState = function() {
  return {
    showCode: false
  };
};

frameworkExample.toggleCode = function() {
  this.setState({
    showCode: !this.state.showCode
  });
};

frameworkExample.render = function() {
  var codeClassName = 'framework-example__code';

  if (this.state.showCode === false) {
    codeClassName += ' u-hide';
  }

  return (
    <div className="framework-example">
      <div className="framework-example__example">
        {this.props.children}
      </div>
      <div className="framework-example__toggle-code" onClick={this.toggleCode}>Toggle Code</div>
      <div className={codeClassName}>
        <Code language="jsx">{utilities.code.formatFileCode(this.props.exampleCode)}</Code>
      </div>
    </div>
  );
};

module.exports = React.createClass(frameworkExample);
