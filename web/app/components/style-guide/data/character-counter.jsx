var React = require('react/addons');
var nucleusReact = require('../../../../../assets/index');
var CharacterCounter = nucleusReact.components.CharacterCounter;

var Example = React.createClass({
  getInitialState: function() {
    return {
      value: '',
      isDisabled: false
    };
  },

  onChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },

  onOverLimit: function() {
    this.setState({
      isDisabled: true
    });
  },

  onUnderLimit: function() {
    this.setState({
      isDisabled: false
    });
  },

  render: function() {
    return (
      <span>
        <input type="text" value={this.state.value} onChange={this.onChange} />
        <CharacterCounter
          input={this.state.value}
          maxLimit={20} warningLimit={10}
          onOverLimit={this.onOverLimit}
          onUnderLimit={this.onUnderLimit} />
        <button disabled={this.state.isDisabled}>Submit</button>
      </span>
    );
  }
});

module.exports = {
  name: 'Character Counter',
  type: 'component',
  overview: (
    <p>
      Component for being able to track the number of character in a string.
    </p>
  ),
  properties: [{
    type: 'string',
    name: 'input',
    defaultValue: 'null',
    description: 'The string the character counter is happening on.',
    required: true
  }, {
    type: 'number',
    name: 'maxLimit',
    defaultValue: 'null',
    description: 'The maximum number of character in the input string can have.',
    required: true
  }, {
    type: 'number',
    name: 'warningLimit',
    defaultValue: 50,
    description: (
      <span>The number of characters the input string can have left before the <code>m-warning</code> class is applied to the element</span>
    )
  }, {
    type: 'string',
    name: 'className',
    defaultValue: 'null',
    description: 'CSS classes to add to the main element.'
  }, {
    type: 'function',
    name: 'onOverLimit',
    defaultValue: 'null',
    description: 'A function to execute when the character counter status goes from under to over.'
  }, {
    type: 'function',
    name: 'onUnderLimit',
    defaultValue: 'null',
    description: 'A function to execute when the character counter status goes from over to under.'
  }],
  examples: [{
    description: (
      <p>
        Character should off all the features.  When the character counter goes over the limit, the button is disabled and when it come back under the limit, it is enabled again.
      </p>
    ),
    example: (
      <Example />
    ),
    exampleString: ''
  }]
};
