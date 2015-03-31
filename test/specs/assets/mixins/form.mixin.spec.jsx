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

var TestComponent = React.createClass({
  mixins: [
    formMixin
  ],

  getInitialState: function() {
    return {
      initialTest: {
        firstName: '',
        password: 'test',
        receiveNewletters: true,
        over21: false,
        date: ''
      },
      test: {
        firstName: '',
        password: 'test',
        receiveNewletters: true,
        over21: false,
        date: ''
      }
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
          checked={this.state.test.receiveNewletters}
          onChange={this.onChangeFormInput('test', 'receiveNewletters')}
          validate={this.validateBoolean}
        />
      ),
      over21: (
        <CheckboxInput
          ref="over21"
          label="I am over the age of 21"
          checked={this.state.test.over21}
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

describe('form mixin', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should be able to reset form values to initial values', function() {
    this.component = React.render(<TestComponent />, div);
    var inputs = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__input');

    var firstNameInput = inputs[0];//testHelper.findRenderedDOMComponentWithProp(this.component, 'ref', 'firstName');
    var passwordInput = inputs[1];//testHelper.findRenderedDOMComponentWithProp(this.component, 'ref', 'password');
    var receiveNewlettersInput = inputs[2];//testHelper.findRenderedDOMComponentWithProp(this.component, 'ref', 'receiveNewletters');
    var over21Input = inputs[3];//testHelper.findRenderedDOMComponentWithProp(this.component, 'ref', 'over21');

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

    this.component.resetTestForm();

    expect(firstNameInput.getDOMNode().value).to.equal('');
    expect(passwordInput.getDOMNode().value).to.equal('test');
    expect(receiveNewlettersInput.getDOMNode().checked).to.be.true;
    expect(over21Input.getDOMNode().checked).to.be.false;
  });

  it('should be able to validate all form fields', function() {
    this.component = React.render(<TestComponent />, div);

    var inputs = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__input');
    var firstNameInput = inputs[0];
    var passwordInput = inputs[1];
    var receiveNewlettersInput = inputs[2];
    var over21Input = inputs[3];

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
