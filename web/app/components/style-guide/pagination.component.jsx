var React = require('react/addons');
var StyleGuideTemplate = require('./assets/components/style-guide-template.component.jsx');
var data = require('./data/pagination.jsx');

var PaginationPage = React.createClass({
  render: function() {
    return (
      <StyleGuideTemplate data={data} />
    );
  }
});

module.exports = PaginationPage;