var React = require('react/addons');
var _ = require('lodash');
var SvgIcon = require('../components/svg-icon.component.jsx');

var validIconFragment = 'checkmark';
var invalidIconFragment = 'x';

var isValueEmpty = function isValueEmpty(value) {
  return value === '' || value === null || value === undefined || value.length === 0;
};

module.exports = {
  create: function validatorFactoryCreate(options) {
    options = options || {};
    options = _.extend({
      renderValidation: 'both',
      validateValueOnCreate: undefined,
      validators: [],
      initialValue: null,
      renderIcon: true,
      allowEmpty: false
    }, options);

    if (options.validators && !_.isArray(options.validators)) {
      throw new Error('You must pass validators as an array');
    }

    var validationHasHappened = false;

    var myValidator = {
      lastValidatedValue: null,

      valid: true,

      validationErrors: [],

      validate: function validatorValidate(value) {
        this.validationErrors = [];
        this.valid = true;
        this.lastValidatedValue = value;

        if (options.validators.length > 0) {
          if (!isValueEmpty(value) || options.allowEmpty !== true) {
            options.validators.forEach(function validatorValidateValidatorsLoop(validator) {
              if (validator.validator(value, validator.options) !== true) {
                this.valid = false;

                if (validator.message) {
                  this.validationErrors.push(validator.message.replace('%%value%%', value));
                }
              }
            }.bind(this));
          }
        }

        validationHasHappened = true;
      },

      shouldRenderValidation: function validatorShouldRenderValidation() {
        return (
          validationHasHappened === true
          && (
            this.valid && options.renderValidation !== 'invalid'
            || !this.valid && options.renderValidation !== 'valid'
          )
        );
      },

      renderValidationIcon: function validatorRenderValidationIcon(className) {
        var validationIcon = null;

        if (options.renderIcon === true && this.shouldRenderValidation()) {
          validationIcon = (
            <SvgIcon
              className={className}
              fragment={this.valid ? validIconFragment : invalidIconFragment}
            />
          );
        }

        return validationIcon;
      },

      reset: function validatorReset() {
        validationHasHappened = false;
        this.lastValidatedValue = null;
        this.valid = true;
        this.validationErrors = [];
      }
    };

    if (options.validateValueOnCreate !== undefined) {
      myValidator.validate(options.validateValueOnCreate);
    }

    return myValidator;
  }
};
