var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var TextboxInput = require('../../../../assets/components/textbox-input.component.jsx');
var InputAutoSizer = require('../../../../assets/components/input-auto-sizer.component.jsx');
var formMixin = require('../../../../assets/mixins/form.mixin.js');
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

var FormExample = React.createClass({
  mixins: [
    formMixin
  ],

  getInitialState: function() {
    return {
      form: {},
      initialForm: {}
    };
  },

  componentWillMount: function() {
    this.formInputs = {
      form: {
        prop: {
          component: TextboxInput
        }
      }
    };
  },

  render: function() {
    var inputs = this.getInputs('form');

    return (
      <span>
        {inputs.prop.render()}
      </span>
    );
  }
});

var FormExampleValidationTrueBoth = React.createClass({
  mixins: [
    formMixin
  ],

  getInitialState: function() {
    return {
      form: {},
      initialForm: {}
    };
  },

  componentWillMount: function() {
    this.formInputs = {
      form: {
        prop: {
          component: TextboxInput,
          props: {
            renderValidation: 'both',
            validators: [{validator: validateTrue}]
          }
        }
      }
    };
  },

  render: function() {
    var inputs = this.getInputs('form');

    return inputs.prop.render();
  }
});

var FormExampleValidationFalseBoth = React.createClass({
  mixins: [
    formMixin
  ],

  getInitialState: function() {
    return {
      form: {},
      initialForm: {}
    };
  },

  componentWillMount: function() {
    this.formInputs = {
      form: {
        prop: {
          component: TextboxInput,
          props: {
            renderValidation: 'both',
            validators: [{validator: validateFalse}]
          }
        }
      }
    };
  },

  render: function() {
    var inputs = this.getInputs('form');

    return inputs.prop.render();
  }
});

var FormExampleValidationFalseValid = React.createClass({
  mixins: [
    formMixin
  ],

  getInitialState: function() {
    return {
      form: {},
      initialForm: {}
    };
  },

  componentWillMount: function() {
    this.formInputs = {
      form: {
        prop: {
          component: TextboxInput,
          props: {
            renderValidation: 'valid',
            validators: [{validator: validateFalse}]
          }
        }
      }
    };
  },

  render: function() {
    var inputs = this.getInputs('form');

    return inputs.prop.render();
  }
});

var FormExampleValidationTrueInvalid = React.createClass({
  mixins: [
    formMixin
  ],

  getInitialState: function() {
    return {
      form: {},
      initialForm: {}
    };
  },

  componentWillMount: function() {
    this.formInputs = {
      form: {
        prop: {
          component: TextboxInput,
          props: {
            renderValidation: 'invalid',
            validators: [{validator: validateTrue}]
          }
        }
      }
    };
  },

  render: function() {
    var inputs = this.getInputs('form');

    return inputs.prop.render();
  }
});

var FormExampleValidationFalseBothOnLoad = React.createClass({
  mixins: [
    formMixin
  ],

  getInitialState: function() {
    return {
      form: {},
      initialForm: {}
    };
  },

  componentWillMount: function() {
    this.formInputs = {
      form: {
        prop: {
          component: TextboxInput,
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
    var inputs = this.getInputs('form');

    return inputs.prop.render();
  }
});

var FormExampleWithDefaultValue = React.createClass({
  mixins: [
    formMixin
  ],

  getInitialState: function() {
    return {
      form: {
        prop: 'default'
      },
      initialForm: {
        prop: 'default'
      }
    };
  },

  componentWillMount: function() {
    this.formInputs = {
      form: {
        prop: {
          component: TextboxInput
        }
      }
    };
  },

  render: function() {
    var inputs = this.getInputs('form');

    return inputs.prop.render();
  }
});

describe('textbox input component', function() {
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

      expect(formElement.props.className).to.equal('form-element m-text');
      expect(validationIcon.length).to.equal(0);
    });

    it('should run and be able to show validation on initial load', function() {
      testData.component = React.render(<FormExampleValidationFalseBothOnLoad />, div);
      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-text m-invalid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.x);
    });

    it('should show valid validation', function() {
      testData.component = React.render(<FormExampleValidationTrueBoth />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-text m-valid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.checkmark);
    });

    it('should not show valid validation if configued for invalid only', function() {
      testData.component = React.render(<FormExampleValidationTrueInvalid />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-text');
      expect(validationIcon.length).to.equal(0);
    });

    it('should show invalid validation', function() {
      testData.component = React.render(<FormExampleValidationFalseBoth />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-text m-invalid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.x);
    });

    it('should not show invalid validation if configured for valid only', function() {
      testData.component = React.render(<FormExampleValidationFalseValid />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-text');
      expect(validationIcon.length).to.equal(0);
    });
  });

  describe('general', function() {
    it('should render', function() {
      testData.component = React.render(<TextboxInput />, div);
      var mainComponent = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element');
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');
      var label = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'label');
      var inputContainer = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__field-container');
      var textarea = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'textarea');
      var prepend = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__input-prepend');
      var append = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__input-append');

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
      testData.component = React.render(<TextboxInput multiLined={true} />, div);
      var mainComponent = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element');
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');
      var label = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'label');
      var inputContainer = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__field-container');
      var textarea = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'textarea');

      expect(mainComponent.length).to.equal(1);
      expect(inputContainer.length).to.equal(1);
      expect(input.length).to.equal(0);
      expect(label.length).to.equal(0);
      expect(textarea.length).to.equal(1);
    });

    it('should render password', function() {
      testData.component = React.render(<TextboxInput maskValue={true} />, div);
      var mainComponent = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element');
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');
      var label = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'label');
      var inputContainer = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__field-container');
      var textarea = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'textarea');

      expect(mainComponent.length).to.equal(1);
      expect(inputContainer.length).to.equal(1);
      expect(input.length).to.equal(1);
      expect(label.length).to.equal(0);
      expect(textarea.length).to.equal(0);
      expect(input[0].props.type).to.equal('password');
    });

    it('should render prepend', function() {
      testData.component = React.render(<TextboxInput prepend="pre" />, div);
      var prepend = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__input-prepend');

      expect(prepend.length).to.equal(1);
      expect(prepend[0].props.children).to.equal('pre');
    });

    it('should render append', function() {
      testData.component = React.render(<TextboxInput append="app" />, div);
      var append = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__input-append');

      expect(append.length).to.equal(1);
      expect(append[0].props.children).to.equal('app');
    });

    it('should be able to set default value', function() {
      testData.component = React.render(<FormExampleWithDefaultValue />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      expect(input.getDOMNode().value).to.equal('default');
    });

    it('should be able to set place holder', function() {
      testData.component = React.render(<TextboxInput placeholder="Placeholder" />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      expect(input.props.placeholder).to.equal('Placeholder');
    });

    it('should be able to render label', function() {
      testData.component = React.render(<TextboxInput label="Label" className="m-safe" />, div);
      var label = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'label');

      expect(label.props.children).to.equal('Label');
    });

    it('should be able to add custom classes', function() {
      testData.component = React.render(<TextboxInput className="m-safe" />, div);
      var mainComponent = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');

      expect(mainComponent.props.className).to.equal('form-element m-text m-safe');
    });

    it('should be able to attach onChange event', function() {
      testData.component = React.render(<FormExample />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      expect(testData.component.state.form.prop).to.equal('test');
    });

    it('should be able to click trigger click event when clicking on prepend element', function() {
      var spy = testHelper.getSpyForEventHandler(TextboxInput, 'onClickPend');
      testData.component = React.render(<TextboxInput prepend="pre" />, div);
      var prepend = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element__input-prepend');

      reactTestUtils.Simulate.click(prepend);

      expect(spy).to.have.callCount(1);

      testHelper.restoreEventHandler(TextboxInput, 'onClickPend');
    });

    it('should be able to click trigger click event when clicking on append element', function() {
      var spy = testHelper.getSpyForEventHandler(TextboxInput, 'onClickPend');
      testData.component = React.render(<TextboxInput append="app" />, div);
      var append = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element__input-append');

      reactTestUtils.Simulate.click(append);

      expect(spy).to.have.callCount(1);

      testHelper.restoreEventHandler(TextboxInput, 'onClickPend');
    });

    it('should work with input auto resizer element', function() {
      testData.component = React.render(<TextboxInput append="app" autoSize={true}/>, div);
      var inputAutoSizer = reactTestUtils.scryRenderedComponentsWithType(testData.component, InputAutoSizer);

      expect(inputAutoSizer.length).to.equal(1);
    });
  });
});
