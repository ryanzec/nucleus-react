var React = require('react');

var menuStore = require('../../stores/menu.store');

var globalNotificationPage = {};

globalNotificationPage.displayName = 'ComponentsGlobalNotificationPage';

globalNotificationPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Global Notification');
};

globalNotificationPage.render = function() {
  return (
    <div className="p-components-global-notification">
      <div>
        global-notification page
      </div>
    </div>
  );
};

module.exports = React.createClass(globalNotificationPage);
