var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var CheckboxInput = require('../../../../assets/components/checkbox-input.component.jsx');
var formMixin = require('../../../../assets/mixins/form.mixin.js');
var testHelper = require('../../../test-helper');
var _ = require('lodash');

var testData = {};

var validateTrue = function() {
  return true;
};

var validateFalse = function() {
  return false;
};

var FormExample = React.createClass({
  mixins: [
    formMixin
  ],

  getInitialState: function() {
    return {
      form: {},
      initialform: {},
    };
  },

  componentWillMount: function() {
    this.formInputs = {
      form: {
        prop: {
          component: CheckboxInput
        }
      }
    };
  },

  render: function() {
    return this.getInputs('form').prop.render();
  }
});

var FormExampleWithDefaultValue = React.createClass({
  mixins: [
    formMixin
  ],

  getInitialState: function() {
    return {
      form: {
        prop: true
      },
      initialForm: {
        prop: true
      }
    };
  },

  componentWillMount: function() {
    this.formInputs = {
      form: {
        prop: {
          component: CheckboxInput
        }
      }
    };
  },

  render: function() {
    return this.getInputs('form').prop.render();
  }
});

var FormExampleValidationTrueBoth = React.createClass({
  mixins: [
    formMixin
  ],

  getInitialState: function() {
    return {
      form: {},
      initialform: {},
    };
  },

  componentWillMount: function() {
    this.formInputs = {
      form: {
        prop: {
          component: CheckboxInput,
          props: {
            renderValidation: 'both',
            validators: [{validator: validateTrue}]
          }
        }
      }
    };
  },

  render: function() {
    return this.getInputs('form').prop.render();
  }
});

var FormExampleValidationFalseBothOnLoad = React.createClass({
  mixins: [
    formMixin
  ],

  getInitialState: function() {
    return {
      form: {},
      initialform: {},
    };
  },

  componentWillMount: function() {
    this.formInputs = {
      form: {
        prop: {
          component: CheckboxInput,
          props: {
            renderValidation: 'both',
            validateOnLoad: true,
            validators: [{validator: validateFalse}]
          }
        }
      }
    };
  },

  render: function() {
    return this.getInputs('form').prop.render();
  }
});

var FormExampleValidationTrueInvalid = React.createClass({
  mixins: [
    formMixin
  ],

  getInitialState: function() {
    return {
      form: {},
      initialform: {},
    };
  },

  componentWillMount: function() {
    this.formInputs = {
      form: {
        prop: {
          component: CheckboxInput,
          props: {
            renderValidation: 'invalid',
            validators: [{validator: validateTrue}]
          }
        }
      }
    };
  },

  render: function() {
    return this.getInputs('form').prop.render();
  }
});

var FormExampleValidationFalseBoth = React.createClass({
  mixins: [
    formMixin
  ],

  getInitialState: function() {
    return {
      form: {},
      initialform: {},
    };
  },

  componentWillMount: function() {
    this.formInputs = {
      form: {
        prop: {
          component: CheckboxInput,
          props: {
            renderValidation: 'both',
            validators: [{validator: validateFalse}]
          }
        }
      }
    };
  },

  render: function() {
    return this.getInputs('form').prop.render();
  }
});

var FormExampleValidationFalseValid = React.createClass({
  mixins: [
    formMixin
  ],

  getInitialState: function() {
    return {
      form: {},
      initialform: {},
    };
  },

  componentWillMount: function() {
    this.formInputs = {
      form: {
        prop: {
          component: CheckboxInput,
          props: {
            renderValidation: 'valid',
            validators: [{validator: validateFalse}]
          }
        }
      }
    };
  },

  render: function() {
    return this.getInputs('form').prop.render();
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

      expect(formElement.props.className).to.equal('form-element m-checkbox');
    });

    it('should run and be able to show validation on initial load', function() {
      testData.component = React.render(<FormExampleValidationFalseBothOnLoad />, div);
      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');

      expect(formElement.props.className).to.equal('form-element m-checkbox m-invalid');
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

      expect(formElement.props.className).to.equal('form-element m-checkbox m-valid');
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

      expect(formElement.props.className).to.equal('form-element m-checkbox');
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

      expect(formElement.props.className).to.equal('form-element m-checkbox m-invalid');
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

      expect(formElement.props.className).to.equal('form-element m-checkbox');
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
      expect(label[0].props.children.length).to.equal(3);
      expect(label[0].props.children[2]).to.be.null;
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

      expect(label.props.children[2]).to.equal('Label');
    });

    it('should be able to add custom classes', function() {
      testData.component = React.render(<CheckboxInput className="m-safe" />, div);
      var mainComponent = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');

      expect(mainComponent.props.className).to.equal('form-element m-checkbox m-safe');
    });

    it('should be able to attach onChange event', function() {
      testData.component = React.render(<FormExample />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          checked: true
        }
      });

      expect(testData.component.state.form.prop).to.be.true;
    });
  });
});
