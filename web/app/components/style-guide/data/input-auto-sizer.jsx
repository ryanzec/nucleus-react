var React = require('react/addons');
var nucleusReact = require('../../../../../assets/index');
var InputAutoSizer = nucleusReact.components.InputAutoSizer;

var ExampleText = React.createClass({
  getInitialState: function() {
    return {
      value: ''
    };
  },

  onChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },

  render: function() {
    return (
      <InputAutoSizer value={this.state.value} onChange={this.onChange} />
    );
  }
});

module.exports = {
  name: 'Input Auto Sizer',
  type: 'component',
  overview: (
    <p>
      This component allows you to create a textarea or text input that auto sizes.
    </p>
  ),
  properties: [{
    type: 'string',
    name: 'className',
    defaultValue: 'null',
    description: 'CSS classes to add to the pill.'
  }],
  examples: [{
    description: (
      <p>
        Text input.
      </p>
    ),
    example: (
      <ExampleText />
    ),
    exampleString: '<Badge>Standard</Badge>'
  }]
};
