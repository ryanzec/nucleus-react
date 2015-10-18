var React = require('react/addons');

var menuStore = require('../../stores/menu.store');

var selectInputPage = {};

selectInputPage.displayName = 'ComponentsSelectInputPage';

selectInputPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Select Input');
};

selectInputPage.render = function() {
  return (
    <div className="p-components-select-input">
      <div>
        select-input page
      </div>
    </div>
  );
};

module.exports = React.createClass(selectInputPage);
