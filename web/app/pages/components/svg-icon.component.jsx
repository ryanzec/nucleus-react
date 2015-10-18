var React = require('react/addons');

var menuStore = require('../../stores/menu.store');

var svgIconPage = {};

svgIconPage.displayName = 'ComponentsSvgIconPage';

svgIconPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'SVG Icon');
};

svgIconPage.render = function() {
  return (
    <div className="p-components-svg-icon">
      <div>
        svg-icon page
      </div>
    </div>
  );
};

module.exports = React.createClass(svgIconPage);
