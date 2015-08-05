var React = require('react/addons');
var domUtilities = require('dom-utilities');
var domEventManagerMixin = require('../mixins/dom-event-manager.mixin');
var _ = require('lodash');

var inputAutoSizer = {};

inputAutoSizer.displayName = 'InputAutoSizer';

inputAutoSizer.mixins = [
  React.addons.PureRenderMixin,
  domEventManagerMixin
];

inputAutoSizer.propTypes = {
  maxWidth: React.PropTypes.string,
  inputClassName: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  type: React.PropTypes.string
};

inputAutoSizer.getDefaultProps = function inputAutoSizerGetDefaultProps() {
  return {
    maxWidth: '100%',
    inputClassName: null,
    placeholder: null,
    type: 'text'
  };
};

inputAutoSizer.getInitialState = function inputAutoSizerGetInitialState() {
  return {
    width: '0px'
  };
};

inputAutoSizer.componentDidMount = function inputAutoSizerComponentDidMount() {
  this.setSize();

  this.addDomEvent(window, 'resize', this.setSize);
  this.addDomEvent(window, 'orientationchange', this.setSize);
};

inputAutoSizer.componentDidUpdate = function inputAutoSizerComponentDidUpdate() {
  this.setSize();
};

inputAutoSizer.setSize = function inputAutoSizerSetSize() {
  this.setState({
    width: this.getNewWidth()
  });
};

inputAutoSizer.getNewWidth = function inputAutoSizerGetNetWidth() {
  var dimensions = domUtilities.getDimensions(this.refs.input.getDOMNode());
  var sizerElement = this.props.value ? this.refs.sizer : this.refs.placeholder;

  return (
    Math.ceil(dimensions.paddings.left
    + dimensions.paddings.right
    + dimensions.borders.left
    + dimensions.borders.right
    //the 1 is to make sure the cursor for the input is visible when the input value is empty
    + sizerElement.getDOMNode().scrollWidth + 1) + 'px'
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
      type={this.props.type}
      className={this.getInputCssClasses().join(' ')}
      style={{
        width: this.state.width,
        maxWidth: '100%'
      }}
      {...props}
    />
  );
};

inputAutoSizer.renderPlaceholder = function inputAutoSizerRenderPlaceholder() {
  var placeholder = (
    <div ref="placeholder" className="input-auto-sizer__placeholder"></div>
  );

  if (!this.props.value) {
    placeholder = (
      <div ref="placeholder" className="input-auto-sizer__placeholder">{this.props.placeholder}</div>
    );
  }

  return placeholder;
};

inputAutoSizer.render = function inputAutoSizerRender() {
  var htmlValue = (this.props.value || '').replace(/ /g, '&nbsp;');

  return (
    <span className="input-auto-sizer">
      {this.renderPlaceholder()}
      {this.renderInputElement()}
      <div
        ref="sizer"
        className="input-auto-sizer__sizer"
        style={{
          maxWidth: this.props.maxWidth
        }}
        dangerouslySetInnerHTML={{
          __html: htmlValue
        }}
      ></div>
    </span>
  );
};

module.exports = React.createClass(inputAutoSizer);
