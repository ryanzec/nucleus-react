var React = require('react');
var commonReact = require('../../../../assets/index');
var applicationReact = require('../../react/index');
var fs = require('fs');

var menuStore = require('../../stores/menu.store');

var InlineCode = applicationReact.components.InlineCode;
var Link = require('react-router').Link;
var FrameworkExample = applicationReact.components.FrameworkExample;
var FrameworkProperty = applicationReact.components.FrameworkProperty;
var TextboxInput = commonReact.components.TextboxInput;

var textboxInputPage = {};

textboxInputPage.displayName = 'ComponentsTextboxInputPage';

textboxInputPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Textbox Input');
};

textboxInputPage.getInitialState = function() {
  return {
    autoSizeValue1: '',
    autoSizeValue2: '',
    managedValue: ''
  };
};

textboxInputPage.onChangeAutoSizeValue1 = function(value, event) {
  this.setState({
    autoSizeValue1: value
  });
};

textboxInputPage.onChangeAutoSizeValue2 = function(value, event) {
  this.setState({
    autoSizeValue2: value
  });
};

textboxInputPage.onChangeManagedValue = function(value, event) {
  this.setState({
    managedValue: value
  });
};

textboxInputPage.render = function() {
  return (
    <div className="p-components-textbox-input">
      <div className="u-headline">Textbox Input</div>
      <div>
        Textbox input is a component for working with the textbox and textarea input fields.  This component uses the <Link to="/mixins/form-input">Form Input</Link> mixin, please be should to read that documentation too.
      </div>
      <div>
        <div className="u-title">Textbox</div>
        <div>The default out of the <InlineCode langauge="jsx">{'<TextboxInput />'}</InlineCode> component is your standard text box.</div>
        <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/textbox-input/textbox.jsx', 'utf8')}>
          <TextboxInput
            placeholder="Input Field"
            unmanaged={true}
          />
        </FrameworkExample>
      </div>
      <div>
        <div className="u-title">Managed</div>
        <div>For a managed input element, you will want to pass the <InlineCode>value</InlineCode> and <InlineCode>onChange</InlineCode> properties.</div>
        <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/textbox-input/managed.jsx', 'utf8')}>
          <TextboxInput
            placeholder="Managed"
            value={this.state.managedValue}
            onChange={this.onChangeManagedValue}
          />
        </FrameworkExample>
      </div>
      <div>
        <div className="u-title">Unmanaged</div>
        <div>If you want the input element to be unmanaged, you can set the <InlineCode>unmanaged</InlineCode> property to <InlineCode>true</InlineCode>.</div>
        <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/textbox-input/unmanaged.jsx', 'utf8')}>
          <TextboxInput
            placeholder="Unmanaged"
            unmanaged={true}
          />
        </FrameworkExample>
      </div>
      <div>
        <div className="u-title">Types</div>
        <div>You can specify the type of the input by passing the <InlineCode>type</InlineCode> property which can be any value that the HTML standard supports.</div>
        <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/textbox-input/types.jsx', 'utf8')}>
          <TextboxInput
            type="password"
            placeholder="Password"
            unmanaged={true}
          />
        </FrameworkExample>
      </div>
      <div>
        <div className="u-title">Append / Prepend Content</div>
        <div>Sometimes you want to have a static content before and / or after the the input to better indicate to the user want they should be typing and that is what the <InlineCode>append</InlineCode> and <InlineCode>prepend</InlineCode> properties are for. You can pass in an renderable content for those properties that you want.</div>
        <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/textbox-input/append-prepend.jsx', 'utf8')}>
          <TextboxInput
            append=".com"
            prepend="https://"
            placeholder="Domain"
            unmanaged={true}
          />
        </FrameworkExample>
      </div>
      <div>
        <div className="u-title">Auto Size</div>
        <div>If you set the <InlineCode>autoSize</InlineCode> property to <InlineCode>true</InlineCode>, this component will makes use of the <Link to="/components/input-auto-sizer">Input Auto Sizer</Link> component which makes the input grow and shrink with the size of the content.</div>
        <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/textbox-input/auto-size.jsx', 'utf8')}>
          <TextboxInput
            autoSize={true}
            value={this.state.autoSizeValue1}
            onChange={this.onChangeAutoSizeValue1}
          />
        </FrameworkExample>
        <div>It also properly works with placeholder content.</div>
        <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/textbox-input/auto-size-placeholder.jsx', 'utf8')}>
          <TextboxInput
            autoSize={true}
            placeholder="Auto Size"
            value={this.state.autoSizeValue2}
            onChange={this.onChangeAutoSizeValue2}
          />
        </FrameworkExample>
      </div>
      <div>
        <div className="u-title">Textarea</div>
        <div>You wish to have a textarea instead of an input, you can set the <InlineCode>multiLined</InlineCode> property to <InlineCode>true</InlineCode>.</div>
        <FrameworkExample exampleCode={fs.readFileSync(__dirname + '/assets/examples/textbox-input/textarea.jsx', 'utf8')}>
          <TextboxInput
            multiLined={true}
            placeholder="Textarea Input"
            unmanaged={true}
          />
        </FrameworkExample>
      </div>
      <hr />
      <div className="framework-properties">
        <div className="u-title">Properties</div>
        <div><strong>NOTE: any properties that are passed and not specfied here will be passed through in the input element so things like <InlineCode>placeholder</InlineCode> will work</strong></div>
        <FrameworkProperty
          name="className"
          type="string"
          defaultValue="null"
          descriptionNode="This is a string of one or more css classes that you wish to add to the main element."
        />
        <FrameworkProperty
          name="label"
          type="string"
          defaultValue="null"
          descriptionNode="The label of the input if needed."
        />
        <FrameworkProperty
          name="type"
          type="string"
          defaultValue="text"
          descriptionNode={
            <span>
              <div>Any of the supported types of the textbox input.</div>
              <div><strong>This does not work the multiLined</strong></div>
            </span>
          }
        />
        <FrameworkProperty
          name="multiLined"
          type="boolean"
          defaultValue="false"
          descriptionNode="Set this to true if you want a textarea input."
        />
        <FrameworkProperty
          name="prepend"
          type="node"
          defaultValue="null"
          descriptionNode={
            <span>
              <div>A renderable node that is appended to the input.</div>
              <div><strong>This does not work the multiLined</strong></div>
            </span>
          }
        />
        <FrameworkProperty
          name="append"
          type="node"
          defaultValue="null"
          descriptionNode={
            <span>
              <div>A renderable node that is appended to the input.</div>
              <div><strong>This does not work the multiLined</strong></div>
            </span>
          }
        />
        <FrameworkProperty
          name="autoSize"
          type="boolean"
          defaultValue="false"
          descriptionNode={
            <span>
              <div>Set this to true if you want the input to auto resize based on the content.</div>
              <div><strong>This does not work the multiLined</strong></div>
            </span>
          }
        />
        <FrameworkProperty
          name="unmanaged"
          type="boolean"
          defaultValue="false"
          descriptionNode="Whether or not this should be a managed component"
        />
      </div>
    </div>
  );
};

module.exports = React.createClass(textboxInputPage);
