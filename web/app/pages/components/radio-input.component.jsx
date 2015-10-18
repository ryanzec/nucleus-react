var React = require('react/addons');

var menuStore = require('../../stores/menu.store');

var radioInputPage = {};

radioInputPage.displayName = 'ComponentsRadioInputPage';

radioInputPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Radio Input');
};

radioInputPage.render = function() {
  return (
    <div className="p-components-radio-input">
      <div>
        radio-input page
      </div>
    </div>
  );
};

module.exports = React.createClass(radioInputPage);
