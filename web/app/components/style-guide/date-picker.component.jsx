var React = require('react/addons');
var StyleGuideTemplate = require('./assets/components/style-guide-template.component.jsx');
var data = require('./data/date-picker.jsx');

var DatePickerPage = React.createClass({
  render: function() {
    return (
      <StyleGuideTemplate data={data} />
    );
  }
});

module.exports = DatePickerPage;
