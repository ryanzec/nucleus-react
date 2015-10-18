var React = require('react/addons');

var menuStore = require('../../stores/menu.store');

var overlayPage = {};

overlayPage.displayName = 'ComponentsOverlayPage';

overlayPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Overlay');
};

overlayPage.render = function() {
  return (
    <div className="p-components-overlay">
      <div>
        overlay page
      </div>
    </div>
  );
};

module.exports = React.createClass(overlayPage);
