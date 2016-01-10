var React = require('react');

var menuStore = require('../../stores/menu.store');

var formPage = {};

formPage.displayName = 'MixinsFormPage';

formPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Mixins', 'Form');
};

formPage.render = function() {
  return (
    <div className="p-mixins-form">
      <div>
        form page
      </div>
    </div>
  );
};

module.exports = React.createClass(formPage);
