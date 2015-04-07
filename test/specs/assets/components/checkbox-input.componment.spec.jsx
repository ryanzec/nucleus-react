var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var CheckboxInput = require('../../../../assets/components/checkbox-input.component.jsx');
var testHelper = require('../../../test-helper');
var _ = require('lodash');
var iconData = require('nucleus-icons');

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
        prop: false
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
      <CheckboxInput value={this.state.formData.prop} onChange={this.onFormDataChange} />
    );
  }
});

var FormExampleWithDefaultValue = React.createClass({
  getInitialState: function() {
    return {
      formData: {
        prop: true
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
      <CheckboxInput value={this.state.formData.prop} onChange={this.onFormDataChange} />
    );
  }
});

describe('checkbox input component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  afterEach(function() {
    testHelper.unmountComponent(this.component);
    this.component = null;
  });

  it('should render', function() {
    this.component = React.render(<CheckboxInput />, div);
    var mainComponent = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element');
    var label = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'label');
    var inputContainer = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__field-container');
    var input = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input');

    expect(mainComponent.length).to.equal(1);
    expect(inputContainer.length).to.equal(1);
    expect(label.length).to.equal(1);
    expect(label[0].props.children.length).to.equal(2);
    expect(label[0].props.children[1]).to.be.null;
    expect(input.length).to.equal(1);
    expect(input[0].getDOMNode().checked).to.be.false;
    expect(input[0].props.className).to.equal('form-element__input m-checkbox m-right');
    expect(input[0].props.type).to.equal('checkbox');
  });

  it('should be able to set default value', function() {
    this.component = React.render(<FormExampleWithDefaultValue />, div);
    var input = this.component.getDOMNode().querySelectorAll('input:checked');

    expect(input.length).to.equal(1);

    // var input = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'input');

    // expect(input.getDOMNode().checked).to.be.true;
  });

  it('should be able to render content to the left', function() {
    this.component = React.render(<CheckboxInput label="Left" displayPosition="left" />, div);
    var label = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'label');
    var input = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input');

    expect(label[0].props.children[0]).to.equal('Left');
    expect(input[0].props.className).to.equal('form-element__input m-checkbox m-left');
  });

  it('should be able to render label', function() {
    this.component = React.render(<CheckboxInput label="Label" />, div);
    var label = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'label');

    expect(label.props.children[1]).to.equal('Label');
  });

  it('should be able to add custom classes', function() {
    this.component = React.render(<CheckboxInput className="m-safe" />, div);
    var mainComponent = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');

    expect(mainComponent.props.className).to.equal('form-element m-safe');
  });

  it('should be able to attach onChange event', function() {
    this.component = React.render(<FormExample />, div);
    var input = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'input');

    reactTestUtils.Simulate.change(input, {
      target: {
        checked: true
      }
    });

    expect(this.component.state.formData.prop).to.be.true;
  });

  it('should not show validation on initial load by default', function() {
    this.component = React.render(<CheckboxInput renderValidation="both" validate={validateTrue}  />, div);
    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');
    var validationIcon = this.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

    expect(formElement.props.className).to.equal('form-element');
    expect(validationIcon.length).to.equal(0);
  });

  it('should be able to show validation on initial load', function() {
    this.component = React.render(<CheckboxInput renderValidation="both" renderValidationOnLoad={true} validate={validateTrue} />, div);
    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');
    var validationIcon = this.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

    expect(formElement.props.className).to.equal('form-element m-valid');
    expect(validationIcon.length).to.equal(1);
    expect(validationIcon[0].innerHTML).to.equal(iconData.small.checkmark);
  });

  it('should show valid validation', function() {
    this.component = React.render(<CheckboxInput renderValidation="both" validate={validateTrue} />, div);
    var input = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'input');

    reactTestUtils.Simulate.change(input, {
      target: {
        checked: true
      }
    });

    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');
    var validationIcon = this.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

    expect(formElement.props.className).to.equal('form-element m-valid');
    expect(validationIcon.length).to.equal(1);
    expect(validationIcon[0].innerHTML).to.equal(iconData.small.checkmark);
  });

  it('should not show valid validation if configued for invalid only', function() {
    this.component = React.render(<CheckboxInput renderValidation="invalid" validate={validateTrue} />, div);
    var input = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'input');

    reactTestUtils.Simulate.change(input, {
      target: {
        checked: true
      }
    });

    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');
    var validationIcon = this.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

    expect(formElement.props.className).to.equal('form-element');
    expect(validationIcon.length).to.equal(0);
  });

  it('should show invalid validation', function() {
    this.component = React.render(<CheckboxInput renderValidation="both" validate={validateFalse} />, div);
    var input = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'input');

    reactTestUtils.Simulate.change(input, {
      target: {
        checked: true
      }
    });

    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');
    var validationIcon = this.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

    expect(formElement.props.className).to.equal('form-element m-invalid');
    expect(validationIcon.length).to.equal(1);
    expect(validationIcon[0].innerHTML).to.equal(iconData.small.x);
  });

  it('should not show invalid validation if configured for valid only', function() {
    this.component = React.render(<CheckboxInput renderValidation="valid" validate={validateFalse} />, div);
    var input = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'input');

    reactTestUtils.Simulate.change(input, {
      target: {
        checked: true
      }
    });

    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');
    var validationIcon = this.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

    expect(formElement.props.className).to.equal('form-element');
    expect(validationIcon.length).to.equal(0);
  });
});
