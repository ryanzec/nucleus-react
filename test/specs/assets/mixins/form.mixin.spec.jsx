var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var formMixin = require('../../../../assets/mixins/form.mixin.js');
var TextboxInput = require('../../../../assets/components/textbox-input.component.jsx');
var CheckboxInput = require('../../../../assets/components/checkbox-input.component.jsx');
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
      firstName: null,
      password: 'test',
      receiveNewletters: true,
      over21: false,
      date: null
    };
    return {
      initialTest: initialFormData,
      test: initialFormData
    };
  },

  getInputs: function() {
    return {
      firstName: (
        <TextboxInput
          ref="firstName"
          placeholder="First Name"
          value={this.state.test.firstName}
          onChange={this.onChangeFormInput('test', 'firstName')}
          validate={this.validate}
        />
      ),
      password: (
        <TextboxInput
          ref="password"
          className="password"
          maskValue={true}
          placeholder="Password"
          value={this.state.test.password}
          onChange={this.onChangeFormInput('test', 'password')}
          renderValidation="both"
          validate={this.validate}
        />
      ),
      receiveNewletters: (
        <CheckboxInput
          ref="receiveNewletters"
          label="I want to receive weekly newsletters"
          value={this.state.test.receiveNewletters}
          onChange={this.onChangeFormInput('test', 'receiveNewletters')}
          validate={this.validateBoolean}
        />
      ),
      over21: (
        <CheckboxInput
          ref="over21"
          label="I am over the age of 21"
          value={this.state.test.over21}
          displayPosition="left"
          onChange={this.onChangeFormInput('test', 'over21')}
          validate={this.validateBoolean}
        />
      ),
      date: (
        <DatePicker ref="date" />
      )
    };
  },

  validate: function(value) {
    return value === 'true' ? true : false;
  },

  validateBoolean: function(value) {
    return value === true;
  },

  resetTestForm: function() {
    this.resetForm('test');
  },

  renderForm: function() {
    var inputs = this.getInputs();

    return (
      <form>
        <InputGroup>
          {inputs.firstName}
          {inputs.password}
        </InputGroup>
        {inputs.receiveNewletters}
        {inputs.over21}
        {inputs.date}
      </form>
    );
  },

  render: function() {
    return (
      <div>
        {this.renderForm()}
        <Button className="reset" onClick={this.resetTestForm}>Clear</Button>
        <Button className="validate-form" onClick={this.validateForm}>Validate</Button>
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
      firstName: null,
      password: 'test',
      receiveNewletters: true,
      over21: false,
      date: null
    };
    var initialFormData2 = {
      lastName: null,
      email: 'test',
      agreeToTerms: true,
      under21: false,
      date2: null
    }
    return {
      initialTest: initialFormData,
      test: initialFormData,
      initialTest2: initialFormData2,
      test2: initialFormData2
    };
  },

  getInputs: function(formName) {
    if(formName === 'test') {
      return {
        firstName: (
          <TextboxInput
            ref="firstName"
            placeholder="First Name"
            value={this.state.test.firstName}
            onChange={this.onChangeFormInput('test', 'firstName')}
            validate={this.validate}
          />
        ),
        password: (
          <TextboxInput
            ref="password"
            className="password"
            maskValue={true}
            placeholder="Password"
            value={this.state.test.password}
            onChange={this.onChangeFormInput('test', 'password')}
            renderValidation="both"
            validate={this.validate}
          />
        ),
        receiveNewletters: (
          <CheckboxInput
            ref="receiveNewletters"
            label="I want to receive weekly newsletters"
            value={this.state.test.receiveNewletters}
            onChange={this.onChangeFormInput('test', 'receiveNewletters')}
            validate={this.validateBoolean}
          />
        ),
        over21: (
          <CheckboxInput
            ref="over21"
            label="I am over the age of 21"
            value={this.state.test.over21}
            displayPosition="left"
            onChange={this.onChangeFormInput('test', 'over21')}
            validate={this.validateBoolean}
          />
        ),
        date: (
          <DatePicker ref="date" />
        )
      };
    } else if (formName === 'test2') {
      return {
        lastName: (
          <TextboxInput
            ref="lastName"
            placeholder="Last Name"
            value={this.state.test2.lastName}
            onChange={this.onChangeFormInput('test2', 'lastName')}
            validate={this.validate}
          />
        ),
        email: (
          <TextboxInput
            ref="email"
            className="email"
            maskValue={true}
            placeholder="Email"
            value={this.state.test2.email}
            onChange={this.onChangeFormInput('test2', 'email')}
            renderValidation="both"
            validate={this.validate}
          />
        ),
        agreeToTerms: (
          <CheckboxInput
            ref="agreeToTerms"
            label="I agree to the terms"
            value={this.state.test2.agreeToTerms}
            onChange={this.onChangeFormInput('test2', 'agreeToTerms')}
            validate={this.validateBoolean}
          />
        ),
        under21: (
          <CheckboxInput
            ref="under21"
            label="I am under the age of 21"
            value={this.state.test2.under21}
            displayPosition="left"
            onChange={this.onChangeFormInput('test2', 'under21')}
            validate={this.validateBoolean}
          />
        ),
        date2: (
          <DatePicker ref="date2" />
        )
      };
    }
  },

  validate: function(value) {
    return value === 'true' ? true : false;
  },

  validateBoolean: function(value) {
    return value === true;
  },

  resetTestForm: function() {
    this.resetForm('test');
  },

  resetTest2Form: function() {
    this.resetForm('test2');
  },

  validateTestForm: function() {
    this.validateForm('test');
  },

  validateTest2Form: function() {
    this.validateForm('test2');
  },

  renderTestForm: function() {
    var inputs = this.getInputs('test');

    return (
      <form>
        <InputGroup>
          {inputs.firstName}
          {inputs.password}
        </InputGroup>
        {inputs.receiveNewletters}
        {inputs.over21}
        {inputs.date}
      </form>
    );
  },

  renderTest2Form: function() {
    var inputs = this.getInputs('test2');

    return (
      <form>
        <InputGroup>
          {inputs.lastName}
          {inputs.email}
        </InputGroup>
        {inputs.agreeToTerms}
        {inputs.under21}
        {inputs.date2}
      </form>
    );
  },

  render: function() {
    return (
      <div>
        {this.renderTestForm()}
        {this.renderTest2Form()}
        <Button className="reset" onClick={this.resetTestForm}>Clear Test</Button>
        <Button className="reset2" onClick={this.resetTest2Form}>Clear Test2</Button>
        <Button className="validate-form" onClick={this.validateTestForm}>Validate Test</Button>
        <Button className="validate-form2" onClick={this.validateTest2Form}>Validate Test2</Button>
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

      expect(firstNameInput.getDOMNode().value).to.equal('123');
      expect(passwordInput.getDOMNode().value).to.equal('234');
      expect(receiveNewlettersInput.getDOMNode().checked).to.be.flase;
      expect(over21Input.getDOMNode().checked).to.be.true;

      this.component.resetTestForm();

      expect(firstNameInput.getDOMNode().value).to.equal('');
      expect(passwordInput.getDOMNode().value).to.equal('test');
      expect(receiveNewlettersInput.getDOMNode().checked).to.be.true;
      expect(over21Input.getDOMNode().checked).to.be.false;
    });

    it('should be able to validate all form fields', function() {
      this.component = React.render(<SingleForm />, div);

      expect(this.component.refs.firstName.state.valid).to.be.true;
      expect(this.component.refs.password.state.valid).to.be.true;
      expect(this.component.refs.receiveNewletters.state.valid).to.be.true;
      expect(this.component.refs.over21.state.valid).to.be.true;

      this.component.setState({
        test: {
          firstName: '123',
          password: '234',
          receiveNewletters: false,
          over21: false,
          date: ''
        }
      });
      this.component.validateForm();

      expect(this.component.refs.firstName.state.valid).to.be.false;
      expect(this.component.refs.password.state.valid).to.be.false;
      expect(this.component.refs.receiveNewletters.state.valid).to.be.false;
      expect(this.component.refs.over21.state.valid).to.be.false;

      this.component.setState({
        test: {
          firstName: 'true',
          password: 'true',
          receiveNewletters: true,
          over21: true,
          date: ''
        }
      });
      this.component.validateForm();

      expect(this.component.refs.firstName.state.valid).to.be.true;
      expect(this.component.refs.password.state.valid).to.be.true;
      expect(this.component.refs.receiveNewletters.state.valid).to.be.true;
      expect(this.component.refs.over21.state.valid).to.be.true;
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
      var lastNameInput = inputs[5];
      var emailInput = inputs[6];
      var agreeToTermsInput = inputs[7];
      var under21Input = inputs[8];

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

      expect(firstNameInput.getDOMNode().value).to.equal('');
      expect(passwordInput.getDOMNode().value).to.equal('test');
      expect(receiveNewlettersInput.getDOMNode().checked).to.be.true;
      expect(over21Input.getDOMNode().checked).to.be.false;
      expect(lastNameInput.getDOMNode().value).to.equal('123');
      expect(emailInput.getDOMNode().value).to.equal('234');
      expect(agreeToTermsInput.getDOMNode().checked).to.be.flase;
      expect(under21Input.getDOMNode().checked).to.be.true;

      this.component.resetTest2Form();

      expect(lastNameInput.getDOMNode().value).to.equal('');
      expect(emailInput.getDOMNode().value).to.equal('test');
      expect(agreeToTermsInput.getDOMNode().checked).to.be.true;
      expect(under21Input.getDOMNode().checked).to.be.false;
    });

    it('should be able to validate all form fields', function() {
      this.component = React.render(<MultipleForms />, div);

      expect(this.component.refs.firstName.state.valid).to.be.true;
      expect(this.component.refs.password.state.valid).to.be.true;
      expect(this.component.refs.receiveNewletters.state.valid).to.be.true;
      expect(this.component.refs.over21.state.valid).to.be.true;
      expect(this.component.refs.lastName.state.valid).to.be.true;
      expect(this.component.refs.email.state.valid).to.be.true;
      expect(this.component.refs.agreeToTerms.state.valid).to.be.true;
      expect(this.component.refs.under21.state.valid).to.be.true;

      this.component.setState({
        test2: {
          lastName: '123',
          email: '234',
          receiveNewletters: false,
          agreeToTerms: false,
          date: ''
        }
      });
      this.component.validateForm('test2');

      expect(this.component.refs.firstName.state.valid).to.be.true;
      expect(this.component.refs.password.state.valid).to.be.true;
      expect(this.component.refs.receiveNewletters.state.valid).to.be.true;
      expect(this.component.refs.over21.state.valid).to.be.true;
      expect(this.component.refs.lastName.state.valid).to.be.false;
      expect(this.component.refs.email.state.valid).to.be.false;
      expect(this.component.refs.agreeToTerms.state.valid).to.be.false;
      expect(this.component.refs.under21.state.valid).to.be.false;

      this.component.setState({
        test2: {
          lastName: 'true',
          email: 'true',
          agreeToTerms: true,
          under21: true,
          date2: ''
        }
      });
      this.component.validateForm('test2');

      expect(this.component.refs.firstName.state.valid).to.be.true;
      expect(this.component.refs.password.state.valid).to.be.true;
      expect(this.component.refs.receiveNewletters.state.valid).to.be.true;
      expect(this.component.refs.over21.state.valid).to.be.true;
      expect(this.component.refs.lastName.state.valid).to.be.true;
      expect(this.component.refs.email.state.valid).to.be.true;
      expect(this.component.refs.agreeToTerms.state.valid).to.be.true;
      expect(this.component.refs.under21.state.valid).to.be.true;
    });
  });
});
