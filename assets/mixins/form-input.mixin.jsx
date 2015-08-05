var _ = require('lodash');
var validatorMixin = require('./validator.mixin');

var formInputMixin = {};

formInputMixin.mixins = [
  validatorMixin
];

formInputMixin.componentDidMount = function formInputMixinComponentDidMount() {
  this.initialValue = _.isBoolean(this.props.value) || this.props.value ? this.props.value : null;
};

formInputMixin.onChange = function formInputMixinOnChange(event) {
  var value;

  if (this.constructor.displayName === 'CheckboxInput') {
    value = event.target.checked;
  } else {
    value = event.target.value;
  }

  this.changeValue(value);
};

formInputMixin.changeValue = function formInputMixinChangeValue(value) {
  /* istanbul ignore else */
  if (this.props.onChange) {
    this.props.onChange(value);
  }
};

module.exports = formInputMixin;
