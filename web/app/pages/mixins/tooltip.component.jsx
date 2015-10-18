var React = require('react/addons');

var menuStore = require('../../stores/menu.store');

var tooltipPage = {};

tooltipPage.displayName = 'MixinsTooltipPage';

tooltipPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Mixins', 'Tooptip');
};

tooltipPage.render = function() {
  return (
    <div className="p-mixins-tooltip">
      <div>
        tooltip page
      </div>
    </div>
  );
};

module.exports = React.createClass(tooltipPage);
