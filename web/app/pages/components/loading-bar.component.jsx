var React = require('react/addons');

var menuStore = require('../../stores/menu.store');

var loadingBarPage = {};

loadingBarPage.displayName = 'ComponentsLoadingBarPage';

loadingBarPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Loading Bar');
};

loadingBarPage.render = function() {
  return (
    <div className="p-components-loading-bar">
      <div>
        loading bar page
      </div>
    </div>
  );
};

module.exports = React.createClass(loadingBarPage);
