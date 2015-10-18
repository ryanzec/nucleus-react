var React = require('react/addons');
var applicationStore = require('../../core/application.store');
var nucleusReact = require('../../../../../assets/index');
var ProgressBar = nucleusReact.components.ProgressBar;
var formMixin = nucleusReact.mixins.form;
var TextboxInput = nucleusReact.components.TextboxInput;

var SetLoadingBarPercentage = React.createClass({
  mixins: [
    formMixin
  ],

  getInitialState: function() {
    return {
      test: {},
      initialTest: {}
    };
  },

  componentWillMount: function() {
    this.formInputs = {
      test: {
        test: {
          component: TextboxInput,
          props: {
            placeholder: 'Loading bar precentage...'
          }
        }
      }
    }
  },

  componentDidUpdate: function() {
    applicationStore.setLoadingBarPercentage(this.state.test.test);
  },

  render: function() {
    var inputs = this.getInputs('test');

    return (
      <div>
        {inputs.test.render()}
      </div>
    );
  }
});

module.exports = {
  name: 'Loading Bar',
  type: 'component',
  overview: (
    <p>
      Progress bar.
    </p>
  ),
  properties: [],
  examples: [{
    description: (
      <p>
        Toggle main percentage, look at top.
      </p>
    ),
    example: (
      <SetLoadingBarPercentage />
    ),
    exampleString: '<ProgressBar style={{width: \'100px\'}} />'
  }]
};
