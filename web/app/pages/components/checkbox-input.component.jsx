var React = require('react/addons');

var menuStore = require('../../stores/menu.store');

var checkboxInput = {};

checkboxInput.displayName = 'ComponentsCheckboxInput';

checkboxInput.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Checkout Input');
};

checkboxInput.render = function() {
  return (
    <div className="p-components-checkbox-input">
      <div>
        checkbox input page
      </div>
    </div>
  );
};

module.exports = React.createClass(checkboxInput);
