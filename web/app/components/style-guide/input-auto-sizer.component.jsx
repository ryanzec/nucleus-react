var React = require('react/addons');
var StyleGuideTemplate = require('./assets/components/style-guide-template.component.jsx');
var data = require('./data/input-auto-sizer.jsx');

var InputAutoSizerPage = React.createClass({
  render: function() {
    return (
      <StyleGuideTemplate data={data} />
    );
  }
});

module.exports = InputAutoSizerPage;
