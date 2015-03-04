var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var SelectInput = require('../../../../assets/components/select-input.component.jsx');
var testHelper = require('../../../test-helper');
var _ = require('lodash');

var validateTrue = function() {
  return true;
};

var validateFalse = function() {
  return false;
};

var getOptions = function() {
  return [{
    display: 'Option 1',
    value: 1
  }, {
    display: 'Option 2',
    value: 'two'
  }];
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
      <SelectInput options={getOptions()} value={this.state.formData.prop} onChange={this.onFormDataChange} />
    );
  }
});

var FormExampleWithDefaultValue = React.createClass({
  getInitialState: function() {
    return {
      formData: {
        prop: 'two'
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
      <SelectInput options={getOptions()} value={this.state.formData.prop} onChange={this.onFormDataChange} />
    );
  }
});

describe('select input component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  afterEach(function() {
    testHelper.unmountComponent(this.component);
    this.component = null;
  });

  it('should render', function() {
    this.component = React.render(<SelectInput options={getOptions()} />, div);
    var mainComponent = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element');
    var label = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'label');
    var inputContainer = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__field-container');
    var select = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'select');
    var options = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'option');
    var selectedOption = this.component.getDOMNode().querySelectorAll('option:checked');

    expect(mainComponent.length).to.equal(1);
    expect(inputContainer.length).to.equal(1);
    expect(label.length).to.equal(0);
    expect(select.length).to.equal(1);
    expect(options.length).to.equal(3);
    expect(options[0].props.children).to.equal('Select');
    expect(options[0].props.value).to.equal('');
    expect(options[1].props.children).to.equal('Option 1');
    expect(options[1].props.value).to.equal(1);
    expect(options[2].props.children).to.equal('Option 2');
    expect(options[2].props.value).to.equal('two');
    expect(selectedOption.length).to.equal(1);
    expect(selectedOption[0].value).to.equal('');
  });

  it('should be able to set default value', function() {
    this.component = React.render(<FormExampleWithDefaultValue />, div);
    var selectedOption = this.component.getDOMNode().querySelectorAll('option:checked');

    expect(selectedOption.length).to.equal(1);
    expect(selectedOption[0].value).to.equal('two');
  });

  it('should be able to render label', function() {
    this.component = React.render(<SelectInput options={getOptions()} label="Label" className="m-safe" />, div);
    var label = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'label');

    expect(label.props.children).to.equal('Label');
  });

  it('should be able to add custom classes', function() {
    this.component = React.render(<SelectInput options={getOptions()} className="m-safe" />, div);
    var mainComponent = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');

    expect(mainComponent.props.className).to.equal('form-element m-safe');
  });

  it('should be able to attach onChange event', function() {
    this.component = React.render(<FormExample />, div);
    var select = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'select');
    var options = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'option');

    reactTestUtils.Simulate.change(select, {
      target: {
        value: 1
      }
    });

    expect(this.component.state.formData.prop).to.equal(1);
  });

  it('should not show validation on initial load by default', function() {
    this.component = React.render(<SelectInput options={getOptions()} renderValidation="both" validate={validateTrue}  />, div);
    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');
    var validationIcon = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__validation-icon');

    expect(formElement.props.className).to.equal('form-element');
    expect(validationIcon.length).to.equal(0);
  });

  it('should be able to show validation on initial load', function() {
    this.component = React.render(<SelectInput options={getOptions()} renderValidation="both" renderValidationOnLoad={true} validate={validateTrue} />, div);
    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');
    var validationIcon = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__validation-icon');

    expect(formElement.props.className).to.equal('form-element m-valid');
    expect(validationIcon.length).to.equal(1);
    expect(validationIcon[0].props.dangerouslySetInnerHTML.__html).to.equal('<use xlink:href="/components/nucleus-icons/svg/svg-sprite.svg#checkmark-small" />');
  });

  it('should show valid validation', function() {
    this.component = React.render(<SelectInput options={getOptions()} renderValidation="both" validate={validateTrue} />, div);
    var select = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'select');

    reactTestUtils.Simulate.change(select, {
      target: {
        value: 'two'
      }
    });

    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');
    var validationIcon = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__validation-icon');

    expect(formElement.props.className).to.equal('form-element m-valid');
    expect(validationIcon.length).to.equal(1);
    expect(validationIcon[0].props.dangerouslySetInnerHTML.__html).to.equal('<use xlink:href="/components/nucleus-icons/svg/svg-sprite.svg#checkmark-small" />');
  });

  it('should not show valid validation if configued for invalid only', function() {
    this.component = React.render(<SelectInput options={getOptions()} renderValidation="invalid" validate={validateTrue} />, div);
    var select = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'select');

    reactTestUtils.Simulate.change(select, {
      target: {
        value: 'two'
      }
    });

    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');
    var validationIcon = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__validation-icon');

    expect(formElement.props.className).to.equal('form-element');
    expect(validationIcon.length).to.equal(0);
  });

  it('should show invalid validation', function() {
    this.component = React.render(<SelectInput options={getOptions()} renderValidation="both" validate={validateFalse} />, div);
    var select = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'select');

    reactTestUtils.Simulate.change(select, {
      target: {
        value: 'two'
      }
    });

    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');
    var validationIcon = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__validation-icon');

    expect(formElement.props.className).to.equal('form-element m-invalid');
    expect(validationIcon.length).to.equal(1);
    expect(validationIcon[0].props.dangerouslySetInnerHTML.__html).to.equal('<use xlink:href="/components/nucleus-icons/svg/svg-sprite.svg#x-small" />');
  });

  it('should not show invalid validation if configured for valid only', function() {
    this.component = React.render(<SelectInput options={getOptions()} renderValidation="valid" validate={validateFalse} />, div);
    var select = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'select');

    reactTestUtils.Simulate.change(select, {
      target: {
        value: 'two'
      }
    });

    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');
    var validationIcon = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__validation-icon');

    expect(formElement.props.className).to.equal('form-element');
    expect(validationIcon.length).to.equal(0);
  });
});
