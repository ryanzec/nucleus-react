var React = require('react');

var menuStore = require('../../stores/menu.store');

var validatorPage = {};

validatorPage.displayName = 'FoundationValidatorPage';

validatorPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Foundation', 'Validator');
};

validatorPage.render = function() {
  return (
    <div className="p-foundation-validator">
      <div>
        validator page
      </div>
    </div>
  );
};

module.exports = React.createClass(validatorPage);
