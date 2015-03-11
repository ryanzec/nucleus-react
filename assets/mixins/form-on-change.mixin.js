var _ = require('lodash');

var formOnChangeMixin = {};

formOnChangeMixin.componentWillMount = function formOnChangeMixinComponentWillMount() {
  //TODO: I think this should be coveragable
  /* istanbul ignore else */
  if (this.formData) {
    _.forEach(this.formData, function formOnChangeMixinComponentWillMountFormDataLoop(formProperties, formObjectName) {
      formProperties.forEach(function formOnChangeMixinComponentWillMountPropertiesLoop(property) {
        var methodName = 'on' + _.capitalize(formObjectName) + _.capitalize(property) + 'Change';

        //NOTE: generally we should not create function in loops however in this case we have too
        /*eslint-disable*/
        this[methodName] = function formOnChangeMixinComponentWillMountGeneratedMethod(value, event) {
          var setStateTo = {};
          setStateTo[formObjectName] = _.clone(this.state[formObjectName], true);
          setStateTo[formObjectName][property] = value;

          this.setState(setStateTo);
        }.bind(this);
        /*eslint-enable*/
      }.bind(this));
    }.bind(this));
  }
};

module.exports = formOnChangeMixin;
