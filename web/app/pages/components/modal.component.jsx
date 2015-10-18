var React = require('react/addons');

var menuStore = require('../../stores/menu.store');

var modalPage = {};

modalPage.displayName = 'ComponentsModalPage';

modalPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Loading Bar');
};

modalPage.render = function() {
  return (
    <div className="p-components-modal">
      <div>
        modal page
      </div>
    </div>
  );
};

module.exports = React.createClass(modalPage);
