var React = require('react');

var menuStore = require('../../stores/menu.store');

var debouncePage = {};

debouncePage.displayName = 'MixinsDebouncePage';

debouncePage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Mixins', 'Debounce');
};

debouncePage.render = function() {
  return (
    <div className="p-mixins-debounce">
      <div>
        debounce page
      </div>
    </div>
  );
};

module.exports = React.createClass(debouncePage);
