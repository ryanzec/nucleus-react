var React = require('react/addons');

var menuStore = require('../../stores/menu.store');

var confirmationModalPage = {};

confirmationModalPage.displayName = 'ComponentsConfirmationModalPage';

confirmationModalPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Confirmation Modal');
};

confirmationModalPage.render = function() {
  return (
    <div className="p-components-confirmation-modal">
      <div>
        confirmation modal page
      </div>
    </div>
  );
};

module.exports = React.createClass(confirmationModalPage);
