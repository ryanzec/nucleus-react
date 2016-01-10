var React = require('react');

var menuStore = require('../../stores/menu.store');

var formInputPage = {};

formInputPage.displayName = 'MixinsFormInputPage';

formInputPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Mixins', 'Form Input');
};

formInputPage.render = function() {
  return (
    <div className="p-mixins-form-input">
      <div>
        form input page
      </div>
    </div>
  );
};

module.exports = React.createClass(formInputPage);
