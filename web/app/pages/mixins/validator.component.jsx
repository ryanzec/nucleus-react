var React = require('react');

var menuStore = require('../../stores/menu.store');

var validatorPage = {};

validatorPage.displayName = 'MixinsValidatorPage';

validatorPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Mixins', 'Validator');
};

validatorPage.render = function() {
  return (
    <div className="p-mixins-validator">
      <div>
        validator page
      </div>
    </div>
  );
};

module.exports = React.createClass(validatorPage);
