var React = require('react/addons');

var menuStore = require('../../stores/menu.store');

var calendarPage = {};

calendarPage.displayName = 'ComponentsCalendarPage';

calendarPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Calendar');
};

calendarPage.render = function() {
  return (
    <div className="p-components-calendar">
      <div>
        calendar page
      </div>
    </div>
  );
};

module.exports = React.createClass(calendarPage);
