var React = require('react');
var commonReact = require('../../../../assets/index');
var applicationReact = require('../../react/index');
var utilities = require('../../utilities/index');
var fs = require('fs');

var menuStore = require('../../stores/menu.store');

var Callout = commonReact.components.Callout;
var Code = commonReact.components.Code;
var FrameworkExample = applicationReact.components.FrameworkExample;
var FrameworkProperty = applicationReact.components.FrameworkProperty;

var calloutPage = {};

calloutPage.displayName = 'ComponentsCalloutPage';

calloutPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Callout');
};

calloutPage.render = function() {
  return (
    <div className="p-components-callout">
      <div className="u-headline">Callout</div>
      <div>
        The callout component is used to bring attention to a particular element.
      </div>
      <div>
        <div className="u-title">Standard</div>
        <div>
          All you need to create a standard callout is to use the <Code language="jsx" isInline={true}>{'<Callout />'}</Code> component.
        </div>
        <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/callout/standard.jsx', 'utf8')}>
          <Callout>Look at me!!!</Callout>
        </FrameworkExample>
      </div>
      <div>
        <div className="u-title">Header</div>
        <div>
          This component comes with a built-in header element that can be used by passing a <Code isInline={true}>headerText</Code> property.
        </div>
        <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/callout/header.jsx', 'utf8')}>
          <Callout headerText="Header">Look at me!!!</Callout>
        </FrameworkExample>
      </div>
      <div>
        <div className="u-title">Color Types</div>
        <div>
          This component supports for 4 different color types with the <Code isInline={true}>m-safe</Code>, <Code isInline={true}>m-notice</Code>, <Code isInline={true}>m-warning</Code>, and <Code isInline={true}>m-danger</Code> classes.
        </div>
        <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/callout/color-types.jsx', 'utf8')}>
          <Callout className="m-safe" headerText="Safe">Look at me!!!</Callout>
          <Callout className="m-notice" headerText="Notice">Look at me!!!</Callout>
          <Callout className="m-warning" headerText="Warning">Look at me!!!</Callout>
          <Callout className="m-danger" headerText="Danger">Look at me!!!</Callout>
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
          name="headerText"
          type="string"
          defaultValue="null"
          descriptionNode="This is passed if you want to use the built-in callout header element."
        />
      </div>
    </div>
  );
};

module.exports = React.createClass(calloutPage);
