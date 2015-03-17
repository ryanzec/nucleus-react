var React = require('react/addons');
var domUtilities = require('dom-utilities');
var _ = require('lodash');

var inputAutoSizer = {};

inputAutoSizer.displayName = 'InputAutoSizer';

inputAutoSizer.mixins = [
  React.addons.PureRenderMixin
];

inputAutoSizer.propTypes = {
  maxWidth: React.PropTypes.string,
  inputClassName: React.PropTypes.string
};

inputAutoSizer.getDefaultProps = function inputAutoSizerGetDefaultProps() {
  return {
    maxWidth: '100%',
    inputClassName: null
  };
};

inputAutoSizer.getInitialState = function inputAutoSizerGetInitialState() {
  return {
    width: '0px'
  };
};

inputAutoSizer.componentDidMount = function inputAutoSizerComponentDidMount() {
  this.setState({
    width: this.getNewWidth()
  });
};

inputAutoSizer.componentDidUpdate = function inputAutoSizerComponentDidUpdate(previousProps, previousState) {
  this.setState({
    width: this.getNewWidth()
  });
};

inputAutoSizer.getNewWidth = function inputAutoSizerGetNetWidth() {
  var dimensions = domUtilities.getDimensions(this.refs.input.getDOMNode());

  return (
    Math.ceil(dimensions.paddings.left
    + dimensions.paddings.right
    + dimensions.borders.left
    + dimensions.borders.right
    //the 1 is to make sure the cursor for the input is visible when the input value is empty
    + this.refs.sizer.getDOMNode().scrollWidth + 1) + 'px'
  );
};

inputAutoSizer.getInputCssClasses = function inputAutoSizerGetInputCssClasses() {
  var cssClasses = ['form-element__input m-text'];

  if (this.props.inputClassName) {
    cssClasses = cssClasses.concat(this.props.inputClassName.split(' '));
  }

  return cssClasses;
};

inputAutoSizer.renderInputElement = function inputAutoSizerRenderInputElement() {
  var props = _.clone(this.props);

  delete props.maxWidth;
  delete props.inputClassName;

  props.ref = 'input';

  if (props.defaultValue) {
    delete props.value;
  } else {
    delete props.defaultValue;
  }

  return (
    <input
      type="text"
      className={this.getInputCssClasses().join(' ')}
      style={{
        width: this.state.width,
        maxWidth: '100%'
      }}
      {...props} />
  );
};

inputAutoSizer.render = function inputAutoSizerRender() {
  var htmlValue = (this.props.value || '').replace(/ /g, '&nbsp;');

  return (
    <span className="input-auto-sizer">
      {this.renderInputElement()}
      <div
        ref="sizer"
        className="input-auto-sizer__sizer"
        style={{
          maxWidth: this.props.maxWidth
        }}
        dangerouslySetInnerHTML={{
          __html: htmlValue
        }}></div>
    </span>
  );
};

module.exports = React.createClass(inputAutoSizer);
