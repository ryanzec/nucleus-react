var React = require('react/addons');

var menuStore = require('../../stores/menu.store');

var domEventManagerPage = {};

domEventManagerPage.displayName = 'MixinsDomEventManagerPage';

domEventManagerPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Mixins', 'DOM Event Manager');
};

domEventManagerPage.render = function() {
  return (
    <div className="p-mixins-dom-event-manager">
      <div>
        dom event manager page
      </div>
    </div>
  );
};

module.exports = React.createClass(domEventManagerPage);
