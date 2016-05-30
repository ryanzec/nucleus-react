Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onBlurInputStateUpdater;

var _formDataValidation = require('form-data-validation');

function onBlurInputStateUpdater(options) {
  var validateParameters = [this.state[options.formName], options.fieldName];

  if (options.validateWith) {
    var validateWithKeys = Object.keys(options.validateWith);

    validateWithKeys.forEach(function (validateWithKey) {
      if (options.fieldName === validateWithKey) {
        options.validateWith[validateWithKey].forEach(function (fieldName) {
          if (_formDataValidation.helpers.isDirty(this.state[options.formName], fieldName) === true || _formDataValidation.helpers.isValid(this.state[options.formName], fieldName) !== null) {
            validateParameters.push(fieldName);
          }
        }.bind(this));
      }
    }.bind(this));
  }

  var newFormData = _formDataValidation.helpers.validate.apply(null, validateParameters);

  return _formDataValidation.helpers.markFieldAsDirty(newFormData, options.fieldName);
};