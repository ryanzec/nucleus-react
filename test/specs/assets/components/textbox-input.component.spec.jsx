var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var TextboxInput = require('../../../../assets/components/textbox-input.component.jsx');
var testHelper = require('../../../test-helper');
var iconData = require('nucleus-icons');
var _ = require('lodash');

var validateTrue = function() {
  return true;
};

var validateFalse = function() {
  return false;
};

var FormExample = React.createClass({
  getInitialState: function() {
    return {
      formData: {
        prop: null
      }
    };
  },

  onFormDataChange: function(value, event) {
    var formData = _.clone(this.state.formData);
    formData.prop = value;

    this.setState({
      formData: formData
    });
  },

  render: function() {
    return (
      <TextboxInput placeholder="Prop" value={this.state.formData.props} onChange={this.onFormDataChange} />
    );
  }
});

var FormExampleWithDefaultValue = React.createClass({
  getInitialState: function() {
    return {
      formData: {
        prop: 'default'
      }
    };
  },

  onFormDataChange: function(value, event) {
    var formData = _.clone(this.state.formData);
    formData.prop = value;

    this.setState({
      formData: formData
    });
  },

  render: function() {
    return (
      <TextboxInput placeholder="Prop" value={this.state.formData.prop} onChange={this.onFormDataChange} />
    );
  }
});

describe('textbox input component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  afterEach(function() {
    testHelper.unmountComponent(this.component);
    this.component = null;
  });

  it('should render', function() {
    this.component = React.render(<TextboxInput />, div);
    var mainComponent = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element');
    var input = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input');
    var label = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'label');
    var inputContainer = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__field-container');
    var textarea = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'textarea');
    var prepend = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__input-prepend');
    var append = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__input-append');

    expect(mainComponent.length).to.equal(1);
    expect(inputContainer.length).to.equal(1);
    expect(input.length).to.equal(1);
    expect(label.length).to.equal(0);
    expect(textarea.length).to.equal(0);
    expect(prepend.length).to.equal(0);
    expect(append.length).to.equal(0);
    expect(input[0].props.type).to.equal('text');
    expect(input[0].getDOMNode().value).to.equal('');
  });

  it('should render textarea', function() {
    this.component = React.render(<TextboxInput multiLined={true} />, div);
    var mainComponent = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element');
    var input = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input');
    var label = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'label');
    var inputContainer = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__field-container');
    var textarea = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'textarea');

    expect(mainComponent.length).to.equal(1);
    expect(inputContainer.length).to.equal(1);
    expect(input.length).to.equal(0);
    expect(label.length).to.equal(0);
    expect(textarea.length).to.equal(1);
  });

  it('should render password', function() {
    this.component = React.render(<TextboxInput maskValue={true} />, div);
    var mainComponent = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element');
    var input = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input');
    var label = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'label');
    var inputContainer = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__field-container');
    var textarea = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'textarea');

    expect(mainComponent.length).to.equal(1);
    expect(inputContainer.length).to.equal(1);
    expect(input.length).to.equal(1);
    expect(label.length).to.equal(0);
    expect(textarea.length).to.equal(0);
    expect(input[0].props.type).to.equal('password');
  });

  it('should render prepend', function() {
    this.component = React.render(<TextboxInput prepend="pre" />, div);
    var prepend = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__input-prepend');

    expect(prepend.length).to.equal(1);
    expect(prepend[0].props.children).to.equal('pre');
  });

  it('should render append', function() {
    this.component = React.render(<TextboxInput append="app" />, div);
    var append = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__input-append');

    expect(append.length).to.equal(1);
    expect(append[0].props.children).to.equal('app');
  });

  it('should be able to set default value', function() {
    this.component = React.render(<FormExampleWithDefaultValue />, div);
    var input = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'input');

    expect(input.getDOMNode().value).to.equal('default');
  });

  it('should be able to set place holder', function() {
    this.component = React.render(<TextboxInput placeholder="Placeholder" />, div);
    var input = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'input');

    expect(input.props.placeholder).to.equal('Placeholder');
  });

  it('should be able to render label', function() {
    this.component = React.render(<TextboxInput label="Label" className="m-safe" />, div);
    var label = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'label');

    expect(label.props.children).to.equal('Label');
  });

  it('should be able to add custom classes', function() {
    this.component = React.render(<TextboxInput className="m-safe" />, div);
    var mainComponent = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');

    expect(mainComponent.props.className).to.equal('form-element m-safe');
  });

  it('should be able to attach onChange event', function() {
    this.component = React.render(<FormExample />, div);
    var input = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'input');

    reactTestUtils.Simulate.change(input, {
      target: {
        value: 'test'
      }
    });

    expect(this.component.state.formData.prop).to.equal('test');
  });

  it('should not show validation on initial load by default', function() {
    this.component = React.render(<TextboxInput renderValidation="both" validate={validateTrue}  />, div);
    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');
    var validationIcon = this.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

    expect(formElement.props.className).to.equal('form-element');
    expect(validationIcon.length).to.equal(0);
  });

  it('should be able to show validation on initial load', function() {
    this.component = React.render(<TextboxInput renderValidation="both" renderValidationOnLoad={true} validate={validateTrue} />, div);
    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');
    var validationIcon = this.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

    expect(formElement.props.className).to.equal('form-element m-valid');
    expect(validationIcon.length).to.equal(1);
    expect(validationIcon[0].innerHTML).to.equal(iconData.small.checkmark);
  });

  it('should show valid validation', function() {
    this.component = React.render(<TextboxInput renderValidation="both" validate={validateTrue} />, div);
    var input = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'input');

    reactTestUtils.Simulate.change(input, {
      target: {
        value: 'test'
      }
    });

    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');
    var validationIcon = this.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

    expect(formElement.props.className).to.equal('form-element m-valid');
    expect(validationIcon.length).to.equal(1);
    expect(validationIcon[0].innerHTML).to.equal(iconData.small.checkmark);
  });

  it('should not show valid validation if configued for invalid only', function() {
    this.component = React.render(<TextboxInput renderValidation="invalid" validate={validateTrue} />, div);
    var input = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'input');

    reactTestUtils.Simulate.change(input, {
      target: {
        value: 'test'
      }
    });

    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');
    var validationIcon = this.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

    expect(formElement.props.className).to.equal('form-element');
    expect(validationIcon.length).to.equal(0);
  });

  it('should show invalid validation', function() {
    this.component = React.render(<TextboxInput renderValidation="both" validate={validateFalse} />, div);
    var input = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'input');

    reactTestUtils.Simulate.change(input, {
      target: {
        value: 'test'
      }
    });

    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');
    var validationIcon = this.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

    expect(formElement.props.className).to.equal('form-element m-invalid');
    expect(validationIcon.length).to.equal(1);
    expect(validationIcon[0].innerHTML).to.equal(iconData.small.x);
  });

  it('should not show invalid validation if configured for valid only', function() {
    this.component = React.render(<TextboxInput renderValidation="valid" validate={validateFalse} />, div);
    var input = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'input');

    reactTestUtils.Simulate.change(input, {
      target: {
        value: 'test'
      }
    });

    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');
    var validationIcon = this.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

    expect(formElement.props.className).to.equal('form-element');
    expect(validationIcon.length).to.equal(0);
  });

  it('should be able to click trigger click event when clicking on prepend element', function() {
    var spy = testHelper.getSpyForEventHandler(TextboxInput, 'onClickPend');
    this.component = React.render(<TextboxInput prepend="pre" />, div);
    var prepend = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element__input-prepend');

    reactTestUtils.Simulate.click(prepend);

    expect(spy).to.have.callCount(1);

    testHelper.restoreEventHandler(TextboxInput, 'onClickPend');
  });

  it('should be able to click trigger click event when clicking on append element', function() {
    var spy = testHelper.getSpyForEventHandler(TextboxInput, 'onClickPend');
    this.component = React.render(<TextboxInput append="app" />, div);
    var append = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element__input-append');

    reactTestUtils.Simulate.click(append);

    expect(spy).to.have.callCount(1);

    testHelper.restoreEventHandler(TextboxInput, 'onClickPend');
  });
});
