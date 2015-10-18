var React = require('react/addons');

var menuStore = require('../../stores/menu.store');

var introductionPage = {};

introductionPage.displayName = 'IntroductionPage';

introductionPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Nucleus React', 'Introduction');
};

introductionPage.render = function() {
  return (
    <div className="p-introduction">
      <div>
        introduction page
      </div>
    </div>
  );
};

module.exports = React.createClass(introductionPage);
