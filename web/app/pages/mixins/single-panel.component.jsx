var React = require('react');

var menuStore = require('../../stores/menu.store');

var singlePanelPage = {};

singlePanelPage.displayName = 'MixinsSinglePanelPage';

singlePanelPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Mixins', 'Single Panel');
};

singlePanelPage.render = function() {
  return (
    <div className="p-mixins-single-panel">
      <div>
        single panel page
      </div>
    </div>
  );
};

module.exports = React.createClass(singlePanelPage);
