Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onChangeInputStateUpdater;

var _formDataValidation = require('form-data-validation');

function onChangeInputStateUpdater(options) {
  var markAsDirty = options.markAsDirty === true;
  var newFormData = _formDataValidation.helpers.set(this.state[options.formName], options.fieldName, options.value, markAsDirty);
  var validateParameters = [newFormData, options.fieldName];

  if (options.validateWith) {
    var validatWithKeys = Object.keys(options.validateWith);

    validatWithKeys.forEach(function (validateWithKey) {
      if (options.fieldName === validateWithKey) {
        options.validateWith[validateWithKey].forEach(function (fieldName) {
          if (_formDataValidation.helpers.isDirty(newFormData, fieldName) === true || _formDataValidation.helpers.isValid(newFormData, fieldName) !== null) {
            validateParameters.push(fieldName);
          }
        }.bind(this));
      }
    }.bind(this));
  }

  if (_formDataValidation.helpers.isDirty(newFormData, options.fieldName) || _formDataValidation.helpers.hasBeenValidated(newFormData, options.fieldName) === true) {
    newFormData = _formDataValidation.helpers.validate.apply(null, validateParameters);
  }

  return newFormData;
};