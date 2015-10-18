var React = require('react/addons');

var menuStore = require('../../stores/menu.store');

var clickablePage = {};

clickablePage.displayName = 'MixinsClickablePage';

clickablePage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Mixins', 'Clickable');
};

clickablePage.render = function() {
  return (
    <div className="p-mixins-clickable">
      <div>
        clickable page
      </div>
    </div>
  );
};

module.exports = React.createClass(clickablePage);
