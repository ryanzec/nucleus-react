var React = require('react/addons');
var StyleGuideTemplate = require('./assets/components/style-guide-template.component.jsx');
var data = require('./data/global-notification.jsx');

var GlobalNotificationPage = React.createClass({
  render: function() {
    return (
      <StyleGuideTemplate data={data} />
    );
  }
});

module.exports = GlobalNotificationPage;
