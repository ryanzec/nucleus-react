var React = require('react/addons');
var StyleGuideTemplate = require('./assets/components/style-guide-template.component.jsx');
var data = require('./data/flexbox-grid.jsx');

var BadgePage = React.createClass({
  render: function() {
    return (
      <div className="p-flexbox-grid">
        <StyleGuideTemplate data={data} />
      </div>
    );
  }
});

module.exports = BadgePage;
