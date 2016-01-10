var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var TextboxInput = require('../../../../assets/components/textbox-input.component.jsx');
var InputAutoSizer = require('../../../../assets/components/input-auto-sizer.component.jsx');
var Button = require('../../../../assets/components/button.component.jsx');
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

var FormExampleAddValidation = React.createClass({
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

  addValidation: function() {
    this.updateFormInputProperty('form', 'prop', 'renderValidation', 'both');
    this.updateFormInputProperty('form', 'prop', 'validators', [{validator: validateTrue}]);
  },

  render: function() {
    var inputs = this.getInputs('form');

    return (
      <span>
        {inputs.prop.render()}
        <Button onClick={this.addValidation}>add validation</Button>
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
            validators: [{validator: validateFalse, message: 'test validation message'}]
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

var FormExampleValidationFalseBothOnLoadNoValidationMessages = React.createClass({
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
            renderValidationMessages: false,
            validateOnLoad: true,
            validators: [{validator: validateFalse, message: 'test validation message'}]
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
      testData.component = ReactDOM.render(<FormExampleValidationTrueBoth />, div);
      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');

      expect(formElement.className).to.equal('form-element m-text');
    });

    it('should run and be able to show validation on initial load', function() {
      testData.component = ReactDOM.render(<FormExampleValidationFalseBothOnLoad />, div);
      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var formMessages = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__validation-message');

      expect(formElement.className).to.equal('form-element m-text m-invalid');
      expect(formMessages.length).to.equal(1);
      expect(formMessages[0].textContent).to.equal('test validation message');
    });

    it('should not show validation messages', function() {
      testData.component = ReactDOM.render(<FormExampleValidationFalseBothOnLoadNoValidationMessages />, div);
      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var formMessages = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__validation-message');

      expect(formElement.className).to.equal('form-element m-text m-invalid');
      expect(formMessages.length).to.equal(0);
    });

    it('should show valid validation', function() {
      testData.component = ReactDOM.render(<FormExampleValidationTrueBoth />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');

      expect(formElement.className).to.equal('form-element m-text m-valid');
    });

    it('should be able to add validator after intial render', function() {
      testData.component = ReactDOM.render(<FormExampleAddValidation />, div);
      var button = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'button');

      reactTestUtils.Simulate.click(button);

      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');

      expect(formElement.className).to.equal('form-element m-text m-valid');
    });

    it('should not show valid validation if configued for invalid only', function() {
      testData.component = ReactDOM.render(<FormExampleValidationTrueInvalid />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');

      expect(formElement.className).to.equal('form-element m-text');
    });

    it('should show invalid validation', function() {
      testData.component = ReactDOM.render(<FormExampleValidationFalseBoth />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');

      expect(formElement.className).to.equal('form-element m-text m-invalid');
    });

    it('should not show invalid validation if configured for valid only', function() {
      testData.component = ReactDOM.render(<FormExampleValidationFalseValid />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');

      expect(formElement.className).to.equal('form-element m-text');
    });
  });

  describe('general', function() {
    it('should render', function() {
      testData.component = ReactDOM.render(<TextboxInput />, div);
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
      expect(input[0].type).to.equal('text');
      expect(ReactDOM.findDOMNode(input[0]).value).to.equal('');
    });

    it('should render textarea', function() {
      testData.component = ReactDOM.render(<TextboxInput multiLined={true} />, div);
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

    it('should be able to specify the type', function() {
      testData.component = ReactDOM.render(<TextboxInput type="password" />, div);
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');

      expect(input[0].type).to.equal('password');
    });

    it('should render prepend', function() {
      testData.component = ReactDOM.render(<TextboxInput prepend="pre" />, div);
      var prepend = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__input-prepend');

      expect(prepend.length).to.equal(1);
      expect(prepend[0].textContent).to.equal('pre');
    });

    it('should render append', function() {
      testData.component = ReactDOM.render(<TextboxInput append="app" />, div);
      var append = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__input-append');

      expect(append.length).to.equal(1);
      expect(append[0].textContent).to.equal('app');
    });

    it('should be able to set default value', function() {
      testData.component = ReactDOM.render(<FormExampleWithDefaultValue />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      expect(ReactDOM.findDOMNode(input).value).to.equal('default');
    });

    it('should be able to set place holder', function() {
      testData.component = ReactDOM.render(<TextboxInput placeholder="Placeholder" />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      expect(input.getAttribute('placeholder')).to.equal('Placeholder');
    });

    it('should be able to render label', function() {
      testData.component = ReactDOM.render(<TextboxInput label="Label" className="m-safe" />, div);
      var label = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'label');

      expect(label.textContent).to.equal('Label');
    });

    it('should be able to add custom classes', function() {
      testData.component = ReactDOM.render(<TextboxInput className="m-safe" />, div);
      var mainComponent = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');

      expect(mainComponent.className).to.equal('form-element m-text m-safe');
    });

    it('should be able to attach onChange event', function() {
      testData.component = ReactDOM.render(<FormExample />, div);
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
      testData.component = ReactDOM.render(<TextboxInput prepend="pre" />, div);
      var prepend = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element__input-prepend');

      reactTestUtils.Simulate.click(prepend);

      expect(spy).to.have.callCount(1);

      testHelper.restoreEventHandler(TextboxInput, 'onClickPend');
    });

    it('should be able to click trigger click event when clicking on append element', function() {
      var spy = testHelper.getSpyForEventHandler(TextboxInput, 'onClickPend');
      testData.component = ReactDOM.render(<TextboxInput append="app" />, div);
      var append = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element__input-append');

      reactTestUtils.Simulate.click(append);

      expect(spy).to.have.callCount(1);

      testHelper.restoreEventHandler(TextboxInput, 'onClickPend');
    });

    it('should work with input auto resizer element', function() {
      testData.component = ReactDOM.render(<TextboxInput append="app" autoSize={true}/>, div);
      var inputAutoSizer = reactTestUtils.scryRenderedComponentsWithType(testData.component, InputAutoSizer);

      expect(inputAutoSizer.length).to.equal(1);
    });
  });
});
