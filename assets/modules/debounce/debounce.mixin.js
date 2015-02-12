var _ =  require('lodash');

var debounceMixin = {
  componentWillMount: function() {
    this.debounceMethods.forEach(function(methodDefinition) {
      this[methodDefinition.name] = _.debounce(methodDefinition.func.bind(this), methodDefinition.delay);
    }.bind(this));
  }
};

module.exports = debounceMixin;