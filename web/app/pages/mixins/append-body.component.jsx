var React = require('react/addons');

var menuStore = require('../../stores/menu.store');

var appendBodyPage = {};

appendBodyPage.displayName = 'MixinsAppendBodyPage';

appendBodyPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Mixins', 'Append Body');
};

appendBodyPage.render = function() {
  return (
    <div className="p-mixins-append-body">
      <div>
        append body page
      </div>
    </div>
  );
};

module.exports = React.createClass(appendBodyPage);
