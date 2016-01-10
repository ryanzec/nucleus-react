var React = require('react');

var menuStore = require('../../stores/menu.store');

var typographyPage = {};

typographyPage.displayName = 'FoundationTypographyPage';

typographyPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Foundation', 'Typography');
};

typographyPage.render = function() {
  return (
    <div className="p-foundation-typography">
      <div>
        typography page
      </div>
    </div>
  );
};

module.exports = React.createClass(typographyPage);
