var React = require('react/addons');

var menuStore = require('../../stores/menu.store');

var extendTextPage = {};

extendTextPage.displayName = 'ComponentsExtendTextPage';

extendTextPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Extend Text');
};

extendTextPage.render = function() {
  return (
    <div className="p-components-extend-text">
      <div>
        extend text page
      </div>
    </div>
  );
};

module.exports = React.createClass(extendTextPage);
