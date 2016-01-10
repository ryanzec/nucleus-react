var React = require('react');
var commonReact = require('../../../../assets/index');
var applicationReact = require('../../react/index');
var utilities = require('../../utilities/index');
var fs = require('fs');

var menuStore = require('../../stores/menu.store');

var Button = commonReact.components.Button;
var Code = commonReact.components.Code;
var FrameworkExample = applicationReact.components.FrameworkExample;
var FrameworkProperty = applicationReact.components.FrameworkProperty;

var buttonPage = {};

buttonPage.displayName = 'ComponentsButtonPage';

buttonPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Button');
};

buttonPage.render = function() {
  return (
    <div className="p-components-button">
      <div className="u-headline">Button</div>
      <div>
        This component will display a button.
      </div>
      <div>
        <div className="u-title">Standard</div>
        <div>
          All you need to create a standard button is to use the <Code language="jsx" isInline={true}>{'<Button />'}</Code> component.
        </div>
        <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/button/standard.jsx', 'utf8')}>
          <Button>My Button</Button>
        </FrameworkExample>
      </div>
      <div>
        <div className="u-title">Disabled</div>
        <div>
          The button component will pass through all properties to the native button component so you can pass properties like <Code language="jsx" isInline={true}>disabled</Code>.
        </div>
        <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/button/disabled.jsx', 'utf8')}>
          <Button disabled={true}>My Disabled Button</Button>
        </FrameworkExample>
      </div>
      <div>
        <div className="u-title">Color Types</div>
        <div>
          This component supports for 4 different color types with the <Code isInline={true}>m-safe</Code>, <Code isInline={true}>m-notice</Code>, <Code isInline={true}>m-warning</Code>, and <Code isInline={true}>m-danger</Code> classes.
        </div>
        <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/button/color-types.jsx', 'utf8')}>
          <Button className="m-safe">My Safe Button</Button>
          <Button className="m-notice">My Notice Button</Button>
          <Button className="m-warning">My Warning Button</Button>
          <Button className="m-danger">My Danger Button</Button>
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
      </div>
    </div>
  );
};

module.exports = React.createClass(buttonPage);
