var React = require('react/addons');
var StyleGuideTemplate = require('./assets/components/style-guide-template.component.jsx');
var data = require('./data/extend-text.jsx');

var ExtendTextPage = React.createClass({
  render: function() {
    return (
      <div className="p-extend-text-documentation">
        <StyleGuideTemplate data={data} />
      </div>
    );
  }
});

module.exports = ExtendTextPage;
