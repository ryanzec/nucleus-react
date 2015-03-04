var _ = require('lodash');

var formOnChangeMixin = {};

formOnChangeMixin.componentWillMount = function() {
  /* istanbul ignore else */
  if(this.formData) {
    _.forEach(this.formData, function(formProperties, formObjectName) {
      formProperties.forEach(function(property) {
        var methodName = 'on' + _.capitalize(formObjectName) + _.capitalize(property) + 'Change';

        this[methodName] = function(value, event) {
          var setStateTo = {};
          setStateTo[formObjectName] = _.clone(this.state[formObjectName], true);
          setStateTo[formObjectName][property] = value;

          this.setState(setStateTo);
        }.bind(this);
      }.bind(this));
    }.bind(this));
  }
};

module.exports = formOnChangeMixin;
