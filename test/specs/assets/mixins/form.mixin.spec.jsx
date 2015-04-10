var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var formMixin = require('../../../../assets/mixins/form.mixin.js');
var TextboxInput = require('../../../../assets/components/textbox-input.component.jsx');
var CheckboxInput = require('../../../../assets/components/checkbox-input.component.jsx');
var RadioInput = require('../../../../assets/components/radio-input.component.jsx');
var InputGroup = require('../../../../assets/components/input-group.component.jsx');
var DatePicker = require('../../../../assets/components/date-picker.component.jsx');
var Button = require('../../../../assets/components/button.component.jsx');
var testHelper = require('../../../test-helper');
var _ = require('lodash');

var SingleForm = React.createClass({
  mixins: [
    formMixin
  ],

  getInitialState: function() {
    var initialFormData = {
      firstName: '',
      password: 'test',
      receiveNewletters: true,
      over21: false,
      radio: 'false',
      date: ''
    };
    return {
      initialTest: initialFormData,
      test: initialFormData
    };
  },

  componentWillMount: function() {
    this.formInputs = {
      test: {
        firstName: {
          component: TextboxInput,
          props: {
            placeholder: 'First Name',
            validators: [{
              validator: this.validate
            }],
            renderValidation: 'both',
            validateOnLoad: true
          }
        },

        password: {
          component: TextboxInput,
          props: {
            placeholder: 'Password',
            validators: [{
              validator: this.validate
            }],
            maskValue: true,
            renderValidation: "both"
          }
        },

        receiveNewletters: {
          component: CheckboxInput,
          props: {
            label: "I want to receive weekly newsletters",
            validators: [{
              validator: this.validateBoolean
            }],
            renderValidation: 'both'
          }
        },

        over21: {
          component: CheckboxInput,
          props: {
            label: "I am over the age of 21",
            validators: [{
              validator: this.validateBoolean
            }],
            renderValidation: 'both',
            displayPosition: "left"
          }
        },

        radio: {
          component: RadioInput,
          props: {
            options: [{
              display: 'True',
              value: 'true'
            }, {
              display: 'False',
              value: 'false'
            }],
            validators: [{
              validator: this.validate
            }],
            renderValidation: 'both'
          }
        },

        date: {
          component: DatePicker,
          hasOnChange: false,
          valueProperty: 'selectedDay',
          props: {
            renderValidation: 'both',
            validators: [{
              validator: function(value) {
                return value === '01/01/2015';
              }
            }]
          }
        }
      }
    };
  },

  validate: function(value) {
    return value === 'true' ? true : false;
  },

  validateBoolean: function(value) {
    return value === true;
  },

  renderForm: function() {
    var inputs = this.getInputs('test');

    return (
      <form>
        <InputGroup>
          {inputs.firstName.render()}
          {inputs.password.render()}
        </InputGroup>
        {inputs.receiveNewletters.render()}
        {inputs.over21.render()}
        {inputs.radio.render()}
        {inputs.date.render()}
      </form>
    );
  },

  render: function() {
    return (
      <div>
        {this.renderForm()}
      </div>
    );
  }
});

var MultipleForms = React.createClass({
  mixins: [
    formMixin
  ],

  getInitialState: function() {
    var initialFormData = {
      firstName: '',
      password: 'test',
      receiveNewletters: true,
      over21: false,
      radio: 'false',
      date: ''
    };
    var initialFormData2 = {
      lastName: '',
      email: 'test',
      agreeToTerms: true,
      under21: false,
      radio2: 'false',
      date2: ''
    }
    return {
      initialTest: initialFormData,
      test: initialFormData,
      initialTest2: initialFormData2,
      test2: initialFormData2
    };
  },

  componentWillMount: function() {
    this.formInputs = {
      test: {
        firstName: {
          component: TextboxInput,
          props: {
            placeholder: 'First Name',
            validators: [{
              validator: this.validate
            }],
            renderValidation: 'both'
          }
        },

        password: {
          component: TextboxInput,
          props: {
            placeholder: 'Password',
            validators: [{
              validator: this.validate
            }],
            maskValue: true,
            renderValidation: "both"
          }
        },

        receiveNewletters: {
          component: CheckboxInput,
          props: {
            label: "I want to receive weekly newsletters",
            validators: [{
              validator: this.validateBoolean
            }],
            renderValidation: 'both'
          }
        },

        over21: {
          component: CheckboxInput,
          props: {
            label: "I am over the age of 21",
            validators: [{
              validator: this.validateBoolean
            }],
            renderValidation: 'both',
            displayPosition: "left"
          }
        },

        radio: {
          component: RadioInput,
          props: {
            options: [{
              display: 'True',
              value: 'true'
            }, {
              display: 'False',
              value: 'false'
            }],
            renderValidation: 'both',
            validators: [{
              validator: this.validate
            }]
          }
        },

        date: {
          component: DatePicker,
          hasOnChange: false,
          props: {}
        }
      },

      test2: {
        lastName: {
          component: TextboxInput,
          props: {
            placeholder: 'Last Name',
            validators: [{
              validator: this.validate
            }],
            renderValidation: 'both'
          }
        },

        email: {
          component: TextboxInput,
          props: {
            placeholder: 'Email',
            validators: [{
              validator: this.validate
            }],
            maskValue: true,
            renderValidation: "both"
          }
        },

        agreeToTerms: {
          component: CheckboxInput,
          props: {
            label: "I agree to terms",
            validators: [{
              validator: this.validateBoolean
            }],
            renderValidation: 'both'
          }
        },

        under21: {
          component: CheckboxInput,
          props: {
            label: "I am under the age of 21",
            validators: [{
              validator: this.validateBoolean
            }],
            renderValidation: 'both',
            displayPosition: "left"
          }
        },

        radio2: {
          component: RadioInput,
          props: {
            options: [{
              display: 'True',
              value: 'true'
            }, {
              display: 'False',
              value: 'false'
            }],
            validators: [{
              validator: this.validate
            }],
            renderValidation: 'both'
          }
        },

        date2: {
          component: DatePicker,
          hasOnChange: false,
          props: {}
        }
      }
    };
  },

  validate: function(value) {
    return value === 'true' ? true : false;
  },

  validateBoolean: function(value) {
    return value === true;
  },

  renderTestForm: function() {
    var inputs = this.getInputs('test');

    return (
      <form>
        <InputGroup>
          {inputs.firstName.render()}
          {inputs.password.render()}
        </InputGroup>
        {inputs.receiveNewletters.render()}
        {inputs.over21.render()}
        {inputs.radio.render()}
        {inputs.date.render()}
      </form>
    );
  },

  renderTest2Form: function() {
    var inputs = this.getInputs('test2');

    return (
      <form>
        <InputGroup>
          {inputs.lastName.render()}
          {inputs.email.render()}
        </InputGroup>
        {inputs.agreeToTerms.render()}
        {inputs.under21.render()}
        {inputs.radio2.render()}
        {inputs.date2.render()}
      </form>
    );
  },

  render: function() {
    return (
      <div>
        {this.renderTestForm()}
        {this.renderTest2Form()}
      </div>
    );
  }
});

describe('form mixin', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  describe('single form', function() {
    it('should be able to reset form values to initial values', function() {
      this.component = React.render(<SingleForm />, div);
      var inputs = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__input');

      var firstNameInput = inputs[0];
      var passwordInput = inputs[1];
      var receiveNewlettersInput = inputs[2];
      var over21Input = inputs[3];
      var radioTrueInput = inputs[4];

      reactTestUtils.Simulate.change(firstNameInput, {
        target: {
          value: '123'
        }
      });

      reactTestUtils.Simulate.change(passwordInput, {
        target: {
          value: '234'
        }
      });

      reactTestUtils.Simulate.change(receiveNewlettersInput, {
        target: {
          checked: false
        }
      });

      reactTestUtils.Simulate.change(over21Input, {
        target: {
          checked: true
        }
      });

      reactTestUtils.Simulate.change(radioTrueInput, {
        target: {
          value: 'true'
        }
      });

      expect(firstNameInput.getDOMNode().value).to.equal('123');
      expect(passwordInput.getDOMNode().value).to.equal('234');
      expect(receiveNewlettersInput.getDOMNode().checked).to.be.false;
      expect(over21Input.getDOMNode().checked).to.be.true;
      expect(radioTrueInput.getDOMNode().checked).to.be.true;

      this.component.resetForm('test');

      expect(firstNameInput.getDOMNode().value).to.equal('');
      expect(passwordInput.getDOMNode().value).to.equal('test');
      expect(receiveNewlettersInput.getDOMNode().checked).to.be.true;
      expect(over21Input.getDOMNode().checked).to.be.false;
      expect(radioTrueInput.getDOMNode().checked).to.be.false;
    });

    it('should be able to validate all form fields', function() {
      this.component = React.render(<SingleForm />, div);

      this.component.setState({
        test: {
          firstName: '123',
          password: '234',
          receiveNewletters: false,
          over21: false,
          radio: 'false',
          date: ''
        }
      });
      this.component.validateForm('test');

      expect(this.component.refs.firstName.validator.valid).to.be.false;
      expect(this.component.refs.password.validator.valid).to.be.false;
      expect(this.component.refs.receiveNewletters.validator.valid).to.be.false;
      expect(this.component.refs.over21.validator.valid).to.be.false;
      expect(this.component.refs.radio.validator.valid).to.be.false;

      this.component.setState({
        test: {
          firstName: 'true',
          password: 'true',
          receiveNewletters: true,
          over21: true,
          radio: 'true',
          date: ''
        }
      });
      this.component.validateForm('test');

      expect(this.component.refs.firstName.validator.valid).to.be.true;
      expect(this.component.refs.password.validator.valid).to.be.true;
      expect(this.component.refs.receiveNewletters.validator.valid).to.be.true;
      expect(this.component.refs.over21.validator.valid).to.be.true;
      expect(this.component.refs.radio.validator.valid).to.be.true;
    });

    it('should keep validation active on form reset if validateOnLoad is set to true', function() {
      this.component = React.render(<SingleForm />, div);

      expect(this.component.refs.firstName.validator.shouldRenderValidation()).to.be.true;
      expect(this.component.refs.password.validator.shouldRenderValidation()).to.be.false;
      expect(this.component.refs.receiveNewletters.validator.shouldRenderValidation()).to.be.false;
      expect(this.component.refs.over21.validator.shouldRenderValidation()).to.be.false;
      expect(this.component.refs.radio.validator.shouldRenderValidation()).to.be.false;

      this.component.resetForm('test');

      expect(this.component.refs.firstName.validator.shouldRenderValidation()).to.be.true;
      expect(this.component.refs.password.validator.shouldRenderValidation()).to.be.false;
      expect(this.component.refs.receiveNewletters.validator.shouldRenderValidation()).to.be.false;
      expect(this.component.refs.over21.validator.shouldRenderValidation()).to.be.false;
      expect(this.component.refs.radio.validator.shouldRenderValidation()).to.be.false;
    });

    it('should be able to validate form with a component that does not use value and the value property', function() {
      this.component = React.render(<SingleForm />, div);

      this.component.setState({
        test: {
          date: '01/01/2015'
        }
      });
      this.component.validateForm('test');

      expect(this.component.refs.date.validator.valid).to.be.true;

      this.component.setState({
        test: {
          date: ''
        }
      });
      this.component.validateForm('test');

      expect(this.component.refs.date.validator.valid).to.be.false;
    });
  });

  describe('multiple forms', function() {
    it('should be able to reset form values to initial values', function() {
      this.component = React.render(<MultipleForms />, div);
      var inputs = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__input');

      var firstNameInput = inputs[0];
      var passwordInput = inputs[1];
      var receiveNewlettersInput = inputs[2];
      var over21Input = inputs[3];
      var radioTrueInput = inputs[4];
      var radioFalseInput = inputs[5];
      var lastNameInput = inputs[7];
      var emailInput = inputs[8];
      var agreeToTermsInput = inputs[9];
      var under21Input = inputs[10];
      var radio2TrueInput = inputs[11];
      var radio2FalseInput = inputs[12];

      reactTestUtils.Simulate.change(lastNameInput, {
        target: {
          value: '123'
        }
      });

      reactTestUtils.Simulate.change(emailInput, {
        target: {
          value: '234'
        }
      });

      reactTestUtils.Simulate.change(agreeToTermsInput, {
        target: {
          checked: false
        }
      });

      reactTestUtils.Simulate.change(under21Input, {
        target: {
          checked: true
        }
      });

      reactTestUtils.Simulate.change(radio2TrueInput, {
        target: {
          value: 'true'
        }
      });

      expect(firstNameInput.getDOMNode().value).to.equal('');
      expect(passwordInput.getDOMNode().value).to.equal('test');
      expect(receiveNewlettersInput.getDOMNode().checked).to.be.true;
      expect(over21Input.getDOMNode().checked).to.be.false;
      expect(radioFalseInput.getDOMNode().checked).to.be.true;
      expect(lastNameInput.getDOMNode().value).to.equal('123');
      expect(emailInput.getDOMNode().value).to.equal('234');
      expect(agreeToTermsInput.getDOMNode().checked).to.be.flase;
      expect(under21Input.getDOMNode().checked).to.be.true;
      expect(radio2TrueInput.getDOMNode().checked).to.be.true;

      this.component.resetForm('test2');

      expect(lastNameInput.getDOMNode().value).to.equal('');
      expect(emailInput.getDOMNode().value).to.equal('test');
      expect(agreeToTermsInput.getDOMNode().checked).to.be.true;
      expect(under21Input.getDOMNode().checked).to.be.false;
      expect(radio2FalseInput.getDOMNode().checked).to.be.true;
    });

    it('should be able to validate all form fields', function() {
      this.component = React.render(<MultipleForms />, div);

      this.component.setState({
        test2: {
          lastName: '123',
          email: '234',
          receiveNewletters: false,
          agreeToTerms: false,
          radio2: 'false',
          date: ''
        }
      });
      this.component.validateForm('test2');

      expect(this.component.refs.firstName.validator.valid).to.be.true;
      expect(this.component.refs.password.validator.valid).to.be.true;
      expect(this.component.refs.receiveNewletters.validator.valid).to.be.true;
      expect(this.component.refs.over21.validator.valid).to.be.true;
      expect(this.component.refs.radio.validator.valid).to.be.true;
      expect(this.component.refs.lastName.validator.valid).to.be.false;
      expect(this.component.refs.email.validator.valid).to.be.false;
      expect(this.component.refs.agreeToTerms.validator.valid).to.be.false;
      expect(this.component.refs.under21.validator.valid).to.be.false;
      expect(this.component.refs.radio2.validator.valid).to.be.false;

      this.component.setState({
        test2: {
          lastName: 'true',
          email: 'true',
          agreeToTerms: true,
          under21: true,
          radio2: 'true',
          date2: ''
        }
      });
      this.component.validateForm('test2');

      expect(this.component.refs.firstName.validator.valid).to.be.true;
      expect(this.component.refs.password.validator.valid).to.be.true;
      expect(this.component.refs.receiveNewletters.validator.valid).to.be.true;
      expect(this.component.refs.over21.validator.valid).to.be.true;
      expect(this.component.refs.radio.validator.valid).to.be.true;
      expect(this.component.refs.lastName.validator.valid).to.be.true;
      expect(this.component.refs.email.validator.valid).to.be.true;
      expect(this.component.refs.agreeToTerms.validator.valid).to.be.true;
      expect(this.component.refs.under21.validator.valid).to.be.true;
      expect(this.component.refs.radio2.validator.valid).to.be.true;
    });
  });
});
