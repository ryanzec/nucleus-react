var React = require('react/addons');

var menuStore = require('../../stores/menu.store');

var dropDownPage = {};

dropDownPage.displayName = 'ComponentsDropDownPage';

dropDownPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Drop Down');
};

dropDownPage.render = function() {
  return (
    <div className="p-components-drop-down">
      <div>
        drop down page
      </div>
    </div>
  );
};

module.exports = React.createClass(dropDownPage);
