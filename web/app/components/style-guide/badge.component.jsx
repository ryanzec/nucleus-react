var React = require('react/addons');
var StyleGuideTemplate = require('./assets/components/style-guide-template.component.jsx');
var data = require('./data/badge.jsx');

var BadgePage = React.createClass({
  render: function() {
    return (
      <StyleGuideTemplate data={data} />
    );
  }
});

module.exports = BadgePage;
