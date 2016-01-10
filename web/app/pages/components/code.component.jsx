var React = require('react');

var menuStore = require('../../stores/menu.store');

var codePage = {};

codePage.displayName = 'ComponentsCodePage';

codePage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Code');
};

codePage.render = function() {
  return (
    <div className="p-components-code">
      <div>
        code page
      </div>
    </div>
  );
};

module.exports = React.createClass(codePage);
