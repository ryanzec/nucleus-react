var React = require('react/addons');
var StyleGuideTemplate = require('./assets/components/style-guide-template.component.jsx');
var data = require('./data/form.jsx');

var FormPage = React.createClass({
  render: function() {
    return (
      <div className="p-form">
        <StyleGuideTemplate data={data} />
      </div>
    );
  }
});

module.exports = FormPage;
