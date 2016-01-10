var React = require('react');

var menuStore = require('../../stores/menu.store');

var paginationPage = {};

paginationPage.displayName = 'ComponentsPaginationPage';

paginationPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Pagination');
};

paginationPage.render = function() {
  return (
    <div className="p-components-pagination">
      <div>
        pagination page
      </div>
    </div>
  );
};

module.exports = React.createClass(paginationPage);
