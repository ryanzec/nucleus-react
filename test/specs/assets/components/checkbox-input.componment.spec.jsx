var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var CheckboxInput = require('../../../../assets/components/checkbox-input.component.jsx');
var testHelper = require('../../../test-helper');
var _ = require('lodash');
var iconData = require('nucleus-icons');

var testData = {};

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

var FormExampleValidationTrueBoth = React.createClass({
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
      <CheckboxInput
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
      <CheckboxInput
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
      <CheckboxInput
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
      <CheckboxInput
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
      <CheckboxInput
        value={this.state.formData.prop}
        onChange={this.onFormDataChange}
        renderValidation="valid"
        validators={[{validator: validateFalse}]}
      />
    );
  }
});

describe('checkbox input component', function() {
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

      expect(formElement.props.className).to.equal('form-element');
      expect(validationIcon.length).to.equal(0);
    });

    it('should run and be able to show validation on initial load', function() {
      testData.component = React.render(<FormExampleValidationFalseBothOnLoad />, div);
      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-invalid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.x);
    });

    it('should show valid validation', function() {
      testData.component = React.render(<FormExampleValidationTrueBoth />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          checked: true
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-valid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.checkmark);
    });

    it('should not show valid validation if configued for invalid only', function() {
      testData.component = React.render(<FormExampleValidationTrueInvalid />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          checked: true
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element');
      expect(validationIcon.length).to.equal(0);
    });

    it('should show invalid validation', function() {
      testData.component = React.render(<FormExampleValidationFalseBoth />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          checked: true
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-invalid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.x);
    });

    it('should not show invalid validation if configured for valid only', function() {
      testData.component = React.render(<FormExampleValidationFalseValid />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          checked: true
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element');
      expect(validationIcon.length).to.equal(0);
    });
  });

  describe('general', function() {
    it('should render', function() {
      testData.component = React.render(<CheckboxInput />, div);
      var mainComponent = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element');
      var label = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'label');
      var inputContainer = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__field-container');
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');

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
      testData.component = React.render(<FormExampleWithDefaultValue />, div);
      var input = testData.component.getDOMNode().querySelectorAll('input:checked');

      expect(input.length).to.equal(1);
    });

    it('should be able to render content to the left', function() {
      testData.component = React.render(<CheckboxInput label="Left" displayPosition="left" />, div);
      var label = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'label');
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');

      expect(label[0].props.children[0]).to.equal('Left');
      expect(input[0].props.className).to.equal('form-element__input m-checkbox m-left');
    });

    it('should be able to render label', function() {
      testData.component = React.render(<CheckboxInput label="Label" />, div);
      var label = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'label');

      expect(label.props.children[1]).to.equal('Label');
    });

    it('should be able to add custom classes', function() {
      testData.component = React.render(<CheckboxInput className="m-safe" />, div);
      var mainComponent = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');

      expect(mainComponent.props.className).to.equal('form-element m-safe');
    });

    it('should be able to attach onChange event', function() {
      testData.component = React.render(<FormExample />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          checked: true
        }
      });

      expect(testData.component.state.formData.prop).to.be.true;
    });
  });
});
