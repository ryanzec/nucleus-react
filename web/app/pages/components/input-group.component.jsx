var React = require('react');

var menuStore = require('../../stores/menu.store');

var inputGroupPage = {};

inputGroupPage.displayName = 'ComponentsInputGroupPage';

inputGroupPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Input Group');
};

inputGroupPage.render = function() {
  return (
    <div className="p-components-input-group">
      <div>
        input group page
      </div>
    </div>
  );
};

module.exports = React.createClass(inputGroupPage);
