var React = require('react');

var menuStore = require('../../stores/menu.store');

var utilityPage = {};

utilityPage.displayName = 'FoundationUtilityPage';

utilityPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Foundation', 'Utility');
};

utilityPage.render = function() {
  return (
    <div className="p-foundation-utility">
      <div>
        utility page
      </div>
    </div>
  );
};

module.exports = React.createClass(utilityPage);
