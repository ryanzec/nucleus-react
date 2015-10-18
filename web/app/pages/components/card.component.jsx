var React = require('react/addons');
var commonReact = require('../../../../assets/index');
var applicationReact = require('../../react/index');
var utilities = require('../../utilities/index');
var fs = require('fs');

var menuStore = require('../../stores/menu.store');

var Card = commonReact.components.Card;
var CardContent = commonReact.components.CardContent;
var CardHeader = commonReact.components.CardHeader;
var Code = commonReact.components.Code;
var FrameworkExample = applicationReact.components.FrameworkExample;
var FrameworkProperty = applicationReact.components.FrameworkProperty;

var cardPage = {};

cardPage.displayName = 'ComponentsCardPage';

cardPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Card');
};

cardPage.render = function() {
  return (
    <div className="p-components-card">
      <div className="u-headline">Card</div>
      <p>
        A card is a standard component to put content into.  A card is made of 3 main components: <Code language="jsx" isInline={true}>{'<Card />'}</Code>, <Code language="jsx" isInline={true}>{'<CardContent />'}</Code>, and <Code language="jsx" isInline={true}>{'<CardHeader />'}</Code>.
      </p>
      <div>
        <div className="u-title">Standard</div>
        <p>
          All you need to create a standard card is to use the <Code language="jsx" isInline={true}>{'<Card />'}</Code> and <Code language="jsx" isInline={true}>{'<CardContent />'}</Code> components.
        </p>
        <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/card/standard.jsx', 'utf8')}>
          <Card>
            <CardContent>I am the card content</CardContent>
          </Card>
        </FrameworkExample>
      </div>
      <div>
        <div className="u-title">Header</div>
        <p>
          You can also add a header by using the <Code language="jsx" isInline={true}>{'<CardHeader />'}</Code> component.
        </p>
        <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/card/header.jsx', 'utf8')}>
          <Card>
            <CardHeader>Header</CardHeader>
            <CardContent>I am the card content</CardContent>
          </Card>
        </FrameworkExample>
      </div>
      <hr />
      <div className="framework-properties">
        <div className="u-title">Properties</div>
        <p>
          All three components, <Code language="jsx" isInline={true}>{'<Card />'}</Code>, <Code language="jsx" isInline={true}>{'<CardContent />'}</Code>, and <Code language="jsx" isInline={true}>{'<CardHeader />'}</Code>, have the same properties.
        </p>
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

module.exports = React.createClass(cardPage);
