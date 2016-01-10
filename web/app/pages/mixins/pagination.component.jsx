var React = require('react');

var menuStore = require('../../stores/menu.store');

var paginationPage = {};

paginationPage.displayName = 'MixinsPaginationPage';

paginationPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Mixins', 'Pagaination');
};

paginationPage.render = function() {
  return (
    <div className="p-mixins-pagintion">
      <div>
        pagintion page
      </div>
    </div>
  );
};

module.exports = React.createClass(paginationPage);
