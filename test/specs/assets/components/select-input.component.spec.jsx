var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var SelectInput = require('../../../../assets/components/select-input.component.jsx');
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
      <SelectInput
        options={getOptions()}
        renderValidation="both"
        validators={[{validator: validateTrue}]}
        value={this.state.formData.prop}
        onChange={this.onFormDataChange}
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
      <SelectInput
        options={getOptions()}
        renderValidation="both"
        validateOnLoad={true}
        validators={[{validator: validateFalse}]}
        value={this.state.formData.prop}
        onChange={this.onFormDataChange}
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
      <SelectInput
        options={getOptions()}
        renderValidation="invalid"
        validators={[{validator: validateTrue}]}
        value={this.state.formData.prop}
        onChange={this.onFormDataChange}
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
      <SelectInput
        options={getOptions()}
        renderValidation="both"
        validators={[{validator: validateFalse}]}
        value={this.state.formData.prop}
        onChange={this.onFormDataChange}
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
      <SelectInput
        options={getOptions()}
        renderValidation="valid"
        validators={[{validator: validateFalse}]}
        value={this.state.formData.prop}
        onChange={this.onFormDataChange}
      />
    );
  }
});

describe('select input component', function() {
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

      expect(formElement.props.className).to.equal('form-element m-select');
      expect(validationIcon.length).to.equal(0);
    });

    it('should run and be able to show validation on initial load', function() {
      testData.component = React.render(<FormExampleValidationFalseBothOnLoad />, div);
      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-select m-invalid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.x);
    });

    it('should show valid validation', function() {
      testData.component = React.render(<FormExampleValidationTrueBoth />, div);
      var select = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'select');

      reactTestUtils.Simulate.change(select, {
        target: {
          value: 'two'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-select m-valid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.checkmark);
    });

    it('should not show valid validation if configued for invalid only', function() {
      testData.component = React.render(<FormExampleValidationTrueInvalid />, div);
      var select = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'select');

      reactTestUtils.Simulate.change(select, {
        target: {
          value: 'two'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-select');
      expect(validationIcon.length).to.equal(0);
    });

    it('should show invalid validation', function() {
      testData.component = React.render(<FormExampleValidationFalseBoth />, div);
      var select = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'select');

      reactTestUtils.Simulate.change(select, {
        target: {
          value: 'two'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-select m-invalid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.x);
    });

    it('should not show invalid validation if configured for valid only', function() {
      testData.component = React.render(<FormExampleValidationFalseValid />, div);
      var select = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'select');

      reactTestUtils.Simulate.change(select, {
        target: {
          value: 'two'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-select');
      expect(validationIcon.length).to.equal(0);
    });
  });

  describe('general', function() {
    it('should render', function() {
      testData.component = React.render(<SelectInput options={getOptions()} />, div);
      var mainComponent = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element');
      var label = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'label');
      var inputContainer = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__field-container');
      var select = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'select');
      var options = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'option');
      var selectedOption = testData.component.getDOMNode().querySelectorAll('option:checked');

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
      testData.component = React.render(<FormExampleWithDefaultValue />, div);
      var selectedOption = testData.component.getDOMNode().querySelectorAll('option:checked');

      expect(selectedOption.length).to.equal(1);
      expect(selectedOption[0].value).to.equal('two');
    });

    it('should be able to render label', function() {
      testData.component = React.render(<SelectInput options={getOptions()} label="Label" className="m-safe" />, div);
      var label = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'label');

      expect(label.props.children).to.equal('Label');
    });

    it('should be able to add custom classes', function() {
      testData.component = React.render(<SelectInput options={getOptions()} className="m-safe" />, div);
      var mainComponent = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');

      expect(mainComponent.props.className).to.equal('form-element m-select m-safe');
    });

    it('should be able to attach onChange event', function() {
      testData.component = React.render(<FormExample />, div);
      var select = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'select');
      var options = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'option');

      reactTestUtils.Simulate.change(select, {
        target: {
          value: 1
        }
      });

      expect(testData.component.state.formData.prop).to.equal(1);
    });

    it('should be able to configure custom empty option text', function() {
      testData.component = React.render(<SelectInput options={getOptions()} emptyOption="empty" />, div);
      var options = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'option');

      expect(options[0].props.children).to.equal('empty');
    });

    it('should be able to configure it to not have an empty option', function() {
      testData.component = React.render(<SelectInput options={getOptions()} emptyOption={false} />, div);
      var options = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'option');

        expect(options.length).to.equal(2);
    });
  });
});
