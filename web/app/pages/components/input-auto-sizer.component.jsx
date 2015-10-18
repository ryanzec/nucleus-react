var React = require('react/addons');

var menuStore = require('../../stores/menu.store');

var inputAutoSizerPage = {};

inputAutoSizerPage.displayName = 'ComponentsInputAutoSizerPage';

inputAutoSizerPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Input Auto Sizer');
};

inputAutoSizerPage.render = function() {
  return (
    <div className="p-components-input-auto-sizer">
      <div>
        input auto sizer page
      </div>
    </div>
  );
};

module.exports = React.createClass(inputAutoSizerPage);
