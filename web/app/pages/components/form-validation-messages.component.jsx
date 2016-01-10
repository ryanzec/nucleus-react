var React = require('react');

var menuStore = require('../../stores/menu.store');

var formValidationMessagesPage = {};

formValidationMessagesPage.displayName = 'ComponentsFormValidationMessagesPage';

formValidationMessagesPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Form Validation Messages');
};

formValidationMessagesPage.render = function() {
  return (
    <div className="p-components-form-validation-messages">
      <div>
        form validation messages page
      </div>
    </div>
  );
};

module.exports = React.createClass(formValidationMessagesPage);
