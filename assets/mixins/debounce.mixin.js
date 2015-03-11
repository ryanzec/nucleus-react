var _ = require('lodash');

var debounceMixin = {};

debounceMixin.componentWillMount = function debounceMixinComponentWillMount() {
  this.debounceMethods.forEach(function debounceMixinComponentWillMountDebounceMethodLoop(methodDefinition) {
    this[methodDefinition.name] = _.debounce(methodDefinition.func.bind(this), methodDefinition.delay);
  }.bind(this));
};

module.exports = debounceMixin;
