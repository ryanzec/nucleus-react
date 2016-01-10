var React = require('react');

var menuStore = require('../../stores/menu.store');

var gridPage = {};

gridPage.displayName = 'FoundationGridPage';

gridPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Foundation', 'Grid');
};

gridPage.render = function() {
  return (
    <div className="p-foundation-grid">
      <div>
        grid page
      </div>
    </div>
  );
};

module.exports = React.createClass(gridPage);
