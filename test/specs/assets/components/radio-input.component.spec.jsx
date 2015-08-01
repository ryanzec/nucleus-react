var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var RadioInput = require('../../../../assets/components/radio-input.component.jsx');
var testHelper = require('../../../test-helper');
var iconData = require('nucleus-icons');
var _ = require('lodash');

var testData = {};

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

var getOptionsLeft = function() {
  return [{
    display: 'Option 1',
    value: 1,
    displayPosition: 'left'
  }, {
    display: 'Option 2',
    value: 'two',
    displayPosition: 'left'
  }];
};

var radioName = 'test';

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
      <RadioInput name={radioName} options={getOptions()} value={this.state.formData.prop} onChange={this.onFormDataChange} />
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
      <RadioInput name={radioName} options={getOptions()} value={this.state.formData.prop} onChange={this.onFormDataChange} />
    );
  }
});

var FormExampleValidationTrueBoth = React.createClass({
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
      <RadioInput
        name={radioName}
        options={getOptions()}
        value={this.state.formData.prop}
        onChange={this.onFormDataChange}
        renderValidation="both"
        validators={[{validator: validateTrue}]}
      />
    );
  }
});

var FormExampleValidationFalseBothOnLoad = React.createClass({
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
      <RadioInput
        name={radioName}
        options={getOptions()}
        value={this.state.formData.prop}
        onChange={this.onFormDataChange}
        renderValidation="both"
        validateOnLoad={true}
        validators={[{validator: validateFalse}]}
      />
    );
  }
});

var FormExampleValidationTrueInvalid = React.createClass({
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
      <RadioInput
        name={radioName}
        options={getOptions()}
        value={this.state.formData.prop}
        onChange={this.onFormDataChange}
        renderValidation="invalid"
        validators={[{validator: validateTrue}]}
      />
    );
  }
});

var FormExampleValidationFalseBoth = React.createClass({
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
      <RadioInput
        name={radioName}
        options={getOptions()}
        value={this.state.formData.prop}
        onChange={this.onFormDataChange}
        renderValidation="both"
        validators={[{validator: validateFalse}]}
      />
    );
  }
});

var FormExampleValidationFalseValid = React.createClass({
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
      <RadioInput
        name={radioName}
        options={getOptions()}
        value={this.state.formData.prop}
        onChange={this.onFormDataChange}
        renderValidation="valid"
        validators={[{validator: validateFalse}]}
      />
    );
  }
});

describe('radio input component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  afterEach(function() {
    testHelper.unmountComponent(testData.component);
    testData.component = null;
  });

  describe('validation', function() {
    it('should not show validation on initial load by default', function() {
      testData.component = React.render(<FormExampleValidationTrueBoth />, div);
      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-radio');
      expect(validationIcon.length).to.equal(0);
    });

    it('should run and be able to show validation on initial load', function() {
      testData.component = React.render(<FormExampleValidationFalseBothOnLoad />, div);
      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-radio m-invalid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.x);
    });

    it('should show valid validation', function() {
      testData.component = React.render(<FormExampleValidationTrueBoth />, div);
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input[1], {
        target: {
          value: 'two'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-radio m-valid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.checkmark);
    });

    it('should not show valid validation if configued for invalid only', function() {
      testData.component = React.render(<FormExampleValidationTrueInvalid />, div);
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input[1], {
        target: {
          value: 'two'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-radio');
      expect(validationIcon.length).to.equal(0);
    });

    it('should show invalid validation', function() {
      testData.component = React.render(<FormExampleValidationFalseBoth />, div);
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input[1], {
        target: {
          value: 'two'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-radio m-invalid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.x);
    });

    it('should not show invalid validation if configured for valid only', function() {
      testData.component = React.render(<FormExampleValidationFalseValid />, div);
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input[1], {
        target: {
          value: 'two'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-radio');
      expect(validationIcon.length).to.equal(0);
    });
  });

  describe('general', function() {
    it('should render', function() {
      testData.component = React.render(<RadioInput name={radioName} options={getOptions()} />, div);
      var mainComponent = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element');
      var radioGroup = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__radio-group');
      var label = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'label');
      var inputContainer = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__input-container');
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');
      var checkedRadio = testData.component.getDOMNode().querySelectorAll('option:checked');

      expect(mainComponent.length).to.equal(1);
      expect(inputContainer.length).to.equal(1);
      expect(radioGroup.length).to.equal(1);
      expect(label.length).to.equal(2);
      expect(input.length).to.equal(2);
      expect(label[0].props.children[1]).to.equal('Option 1');
      expect(input[0].props.value).to.equal(1);
      expect(input[0].props.type).to.equal('radio');
      expect(input[0].props.className).to.equal('form-element__input m-radio m-right');
      expect(label[1].props.children[1]).to.equal('Option 2');
      expect(input[1].props.value).to.equal('two');
      expect(input[1].props.type).to.equal('radio');
      expect(input[1].props.type).to.equal('radio');
      expect(input[1].props.className).to.equal('form-element__input m-radio m-right');
      expect(checkedRadio.length).to.equal(0);
    });

    it('should be able to render content to the left of the input', function() {
      testData.component = React.render(<RadioInput name={radioName} options={getOptionsLeft()} />, div);
      var label = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'label');
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');

      expect(label[0].props.children[0]).to.equal('Option 1');
      expect(input[0].props.className).to.equal('form-element__input m-radio m-left');
      expect(label[1].props.children[0]).to.equal('Option 2');
      expect(input[1].props.className).to.equal('form-element__input m-radio m-left');
    });

    it('should be able to set default value', function() {
      testData.component = React.render(<FormExampleWithDefaultValue />, div);
      var checkedRadio = testData.component.getDOMNode().querySelectorAll('input:checked');

      expect(checkedRadio.length).to.equal(1);
      expect(checkedRadio[0].value).to.equal('two');
    });

    it('should be able to render label', function() {
      testData.component = React.render(<RadioInput name={radioName} options={getOptions()} label="Label" className="m-safe" />, div);
      var label = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'label');

      expect(label.length).to.equal(3)
      expect(label[0].props.children).to.equal('Label');
    });

    it('should be able to add custom classes', function() {
      testData.component = React.render(<RadioInput name={radioName} options={getOptions()} className="m-safe" />, div);
      var mainComponent = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');

      expect(mainComponent.props.className).to.equal('form-element m-radio m-safe');
    });

    it('should be able to attach onChange event', function() {
      testData.component = React.render(<FormExample />, div);
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input[1], {
        target: {
          value: 'two'
        }
      });

      expect(testData.component.state.formData.prop).to.equal('two');
    });
  });
});
