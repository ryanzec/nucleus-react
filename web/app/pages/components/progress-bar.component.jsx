var React = require('react');

var menuStore = require('../../stores/menu.store');

var progressBarPage = {};

progressBarPage.displayName = 'ComponentsProgressBarPage';

progressBarPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Progress Bar');
};

progressBarPage.render = function() {
  return (
    <div className="p-components-progress-bar">
      <div>
        progress-bar page
      </div>
    </div>
  );
};

module.exports = React.createClass(progressBarPage);
