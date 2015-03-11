var React = require('react/addons');
var _ = require('lodash');
var formInputMixin = require('../mixins/form-input.mixin.jsx');

var radioInput = {};

radioInput.displayName = 'RadioInput';

radioInput.mixins = [
  React.addons.PureRenderMixin,
  formInputMixin
];

radioInput.propTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.string,
  validate: React.PropTypes.func,
  options: React.PropTypes.array.isRequired,
  name: React.PropTypes.string.isRequired
};

radioInput.getDefaultProps = function radioInputGetDefaultProps() {
  return {
    className: null,
    label: null,
    validate: null,
    options: [],
    name: null
  };
};

radioInput.getInitialState = function radioInputGetInitialState() {
  return {
    valid: true
  };
};

radioInput.getCssClasses = function radioInputGetCssClasses() {
  var cssClasses = ['form-element'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  if (this.shouldRenderValidation()) {
    cssClasses.push(this.state.valid ? 'm-valid' : 'm-invalid');
  }

  return cssClasses;
};

radioInput.renderLabel = function radioInputRenderLabel() {
  var label = null;

  if (this.props.label) {
    label = (
      <label>{this.props.label}</label>
    );
  }

  return label;
};

radioInput.renderInput = function radioInputRenderInput() {
  var options = _.map(this.props.options, function radioInputRenderInputOptionsMap(option) {
    var checked = this.props.value === option.value;

    if (option.displayPosition === 'left') {
      return (
        <label className="m-toggle" key={option.value}>
          {option.display}<input
                            className="form-element__input m-radio m-left"
                            type="radio"
                            checked={checked}
                            value={option.value}
                            name={this.props.name}
                            onChange={this.onChange} />
        </label>
      );
    }

    return (
      <label className="m-toggle" key={option.value}>
        <input
          className="form-element__input m-radio m-right"
          type="radio"
          value={option.value}
          checked={checked}
          name={this.props.name}
          onChange={this.onChange} />
          {option.display}
      </label>
    );
  }.bind(this));

  return (
    <div className="form-element__input-container form-element__radio-group">
      {options}
    </div>
  );
};

radioInput.render = function radioInputRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.renderLabel()}
      <div className="form-element__field-container">
        {this.renderInput()}
        {this.renderValidationIcon()}
      </div>
    </div>
  );
};

module.exports = React.createClass(radioInput);
