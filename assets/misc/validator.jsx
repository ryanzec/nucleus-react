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
      allowEmpty: false,
      isActive: true
    }, options);

    if (options.validators && !_.isArray(options.validators)) {
      throw new Error('You must pass validators as an array');
    }

    var myValidator = {
      validationHasHappened: false,

      lastValidatedValue: null,

      _valid: true,

      validationErrors: [],

      validate: function validatorValidate(value) {
        if (options.isActive) {
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

          this.validationHasHappened = true;
        }
      },

      shouldRenderValidation: function validatorShouldRenderValidation() {
        return (
          options.isActive
          && this.validationHasHappened === true
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
        this.validationHasHappened = false;
        this.lastValidatedValue = null;
        this.valid = true;
        this.validationErrors = [];
      },

      updateOptions: function validatorUpdateOptions(newOptions) {
        options = _.extend(options, newOptions);
      }
    };

    Object.defineProperty(myValidator, 'valid', {
      get: function myValidatorCustomPropertyValueGet() {
        return myValidator._valid || options.isActive === false;
      },

      set: function myValidatorCustomPropertyValueSet(newValue) {
        myValidator._valid = newValue;
      }
    });

    if (options.validateValueOnCreate !== undefined) {
      myValidator.validate(options.validateValueOnCreate);
    }

    return myValidator;
  }
};
