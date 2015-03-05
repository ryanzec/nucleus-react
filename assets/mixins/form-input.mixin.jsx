var React = require('react/addons');
var SvgIcon = require('../components/svg-icon.component.jsx');
var svgPath ='/components/nucleus-icons/svg/svg-sprite.svg';

var validIconFragment = 'checkmark';
var invalidIconFragment = 'x';

module.exports = {
  propTypes: {
    renderValidation: React.PropTypes.oneOf([false, 'valid', 'invalid', 'both']),
    renderValidationOnLoad: React.PropTypes.bool
  },

  componentWillMount: function() {
    this._initialRenderDone = false;
  },

  getDefaultProps: function() {
    return {
      renderValidation: false,
      renderValidationOnLoad: false
    };
  },

  shouldRenderValidation: function() {
    return (
      this.props.renderValidation
      && (this.props.renderValidationOnLoad || this._initialRenderDone)
      && (
        (this.state.valid && this.props.renderValidation !== 'invalid')
        || (!this.state.valid && this.props.renderValidation !== 'valid')
      )
    );
  },

  renderValidationIcon: function() {
    var validationIcon = null;

    if(this.shouldRenderValidation()) {
      validationIcon = (
        <SvgIcon
          className="form-element__validation-icon"
          svgPath={svgPath}
          fragment={this.state.valid ? validIconFragment : invalidIconFragment} />
      );
    }

    return validationIcon;
  },

  onChange: function(event) {
    var value;

    this._initialRenderDone = true;

    if(this.constructor.displayName === 'CheckboxInput') {
      value = event.target.checked;
    } else {
      value = event.target.value;
    }

    if(this.props.validate) {
      this.state.valid = this.setState({
        valid: this.props.validate(value)
      });
    }

    if(this.props.onChange) {
      this.props.onChange(value, event);
    }

  }
};
