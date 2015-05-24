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

var ExampleTextPlaceholder = React.createClass({
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
      <InputAutoSizer placeholder="Placeholder" value={this.state.value} onChange={this.onChange} />
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
  properties: [],
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
  }, {
    description: (
      <p>
        With placeholder.
      </p>
    ),
    example: (
      <ExampleTextPlaceholder />
    ),
    exampleString: '<Badge>Standard</Badge>'
  }]
};
