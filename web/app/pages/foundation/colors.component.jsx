var React = require('react/addons');

var menuStore = require('../../stores/menu.store');

var colorsPage = {};

colorsPage.displayName = 'FoundationColorsPage';

colorsPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Foundation', 'Colors');
};

colorsPage.render = function() {
  return (
    <div className="p-foundation-colors">
      <div className="u-headline">Colors</div>
      <div>
        <div className="u-title"> Color Types</div>
      </div>
    </div>
  );
};

module.exports = React.createClass(colorsPage);
