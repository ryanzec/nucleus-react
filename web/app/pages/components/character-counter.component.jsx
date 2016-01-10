var React = require('react');
var commonReact = require('../../../../assets/index');
var applicationReact = require('../../react/index');
var utilities = require('../../utilities/index');
var fs = require('fs');

var menuStore = require('../../stores/menu.store');

var CharacterCounter = commonReact.components.CharacterCounter;
var Code = commonReact.components.Code;
var FrameworkExample = applicationReact.components.FrameworkExample;
var FrameworkProperty = applicationReact.components.FrameworkProperty;

var characterCounterPage = {};

characterCounterPage.displayName = 'ComponentsCharacterCounterPage';

characterCounterPage.getInitialState = function() {
  return {
    value1: '',
    value2: ''
  };
};

characterCounterPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Character Counter');
};

characterCounterPage.onChangeValue1 = function(event) {
  this.setState({
    value1: event.target.value
  });
};

characterCounterPage.onChangeValue2 = function(event) {
  this.setState({
    value2: event.target.value
  });
};

characterCounterPage.onOverLimit = function() {
  alert('you have gone over the limit');
};

characterCounterPage.onUnderLimit = function() {
  alert('you are now within the limit')
};

characterCounterPage.render = function() {
  return (
    <div className="p-components-character-counter">
      <div className="u-headline">Character Counter</div>
      <div>
        The character counter component it used to let the user know how many characters they have types with-in an input.
      </div>
      <div>
        <div className="u-title">Standard</div>
        <div>
          All you need to create a standard card is to use the <Code language="jsx" isInline={true}>{'<Card />'}</Code> and <Code language="jsx" isInline={true}>{'<CardContent />'}</Code> components.
        </div>
        <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/character-counter/standard.jsx', 'utf8')}>
          <input type="text" value={this.state.value2} onChange={this.onChangeValue2} />
          <CharacterCounter
            input={this.state.value2}
            maxLimit={20}
            warningLimit={10}
          />
        </FrameworkExample>
      </div>
      <div>
        <div className="u-title">Limit Hooks</div>
        <div>
          There are 2 event callbacks that you can attached to the component as properties.  This first is the <Code isInline={true}>onOverLimit</Code> which is executed when the state of the character counter goes from under limit to over limit.  This second is the <Code isInline={true}>onUnderLimit</Code> which is executed when the state of the character counter goes from over limit to under limit.  These callbacks are only executed when the state change so if you go over the limit and continue typing, the callback in only executed once on the initial overage.
        </div>
        <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/character-counter/limit-hooks.jsx', 'utf8')}>
          <input type="text" value={this.state.value1} onChange={this.onChangeValue1} />
          <CharacterCounter
            input={this.state.value1}
            maxLimit={20}
            warningLimit={10}
            onOverLimit={this.onOverLimit}
            onUnderLimit={this.onUnderLimit}
          />
        </FrameworkExample>
      </div>
      <hr />
      <div className="framework-properties">
        <div className="u-title">Properties</div>
        <FrameworkProperty
          name="className"
          type="string"
          defaultValue="null"
          descriptionNode="This is a string of one or more css classes that you wish to add to the main element."
        />
        <FrameworkProperty
          name="input"
          type="string"
          defaultValue="null"
          descriptionNode="The value to counter characters on."
        />
        <FrameworkProperty
          name="maxLimit"
          type="number"
          defaultValue="null"
          descriptionNode={
            <div>Once the input goes over this length, the <Code isInline={true}>m-safe</Code> class is added to the character counter test.</div>
          }
        />
        <FrameworkProperty
          name="warningLimit"
          type="number"
          defaultValue="null"
          descriptionNode={
            <div>Once the input goes over this length, the <Code isInline={true}>m-warning</Code> class is added to the character counter test.</div>
          }
        />
        <FrameworkProperty
          name="onOverLimit"
          type="function"
          defaultValue="null"
          descriptionNode="Callback to execute once the input goes over the limit (only happen when the state changes from under to over)."
        />
        <FrameworkProperty
          name="onUnderLimit"
          type="function"
          defaultValue="null"
          descriptionNode="Callback to execute once the input goes under the limit (only happen when the state changes from over to under)."
        />
      </div>
    </div>
  );
};

module.exports = React.createClass(characterCounterPage);
