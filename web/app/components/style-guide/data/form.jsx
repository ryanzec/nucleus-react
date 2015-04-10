var React = require('react/addons');
var dataValidation = require('data-validation');
var _ = require('lodash');
var nucleusReact = require('../../../../../assets/index');
var SvgIcon = nucleusReact.components.SvgIcon;
var TextboxInput = nucleusReact.components.TextboxInput;
var SelectInput = nucleusReact.components.SelectInput;
var RadioInput = nucleusReact.components.RadioInput;
var CheckboxInput = nucleusReact.components.CheckboxInput;
var DatePicker = nucleusReact.components.DatePicker;
var InputGroup = nucleusReact.components.InputGroup;
var Button = nucleusReact.components.Button;
var formMixin = nucleusReact.mixins.form;

var FormExmplePlaceholders = React.createClass({
  mixins: [
    formMixin
  ],

  getInitialState: function() {
    var initialFormData = {
      lastName: 'last',
      over21: true,
      liveIn: 'US',
      date: '03/02/2015'
    }
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
            placeholder: 'First Name'
          }
        },
        lastName: {
          component: TextboxInput,
          props: {
            placeholder: 'Last Name'
          }
        },
        email: {
          component: TextboxInput,
          props: {
            placeholder: 'Email Address',
            renderValidation: 'invalid',
            validators: [{
              message: "Can't be empty",
              validator: this.validateNotEmpty
            }, {
              message: '\'%%value%%\' - Must be valid email format : your.name@example.com',
              validator: this.validateEmail
            }]
          }
        },
        password: {
          component: TextboxInput,
          props: {
            className: 'password',
            maskValue: true,
            placeholder: 'Password',
            renderValidation: 'both',
            validators: [{
              validator: this.validate
            }]
          }
        },
        confirmPassword: {
          component: TextboxInput,
          props: {
            className: 'confirm-password',
            placeholder: 'Confirm Password'
          }
        },
        gender: {
          component: SelectInput,
          props: {
            emptyOption: 'Select Gender',
            options: this.getGenderOptions(),
            renderValidation: 'both',
            validators: [{
              validator: this.validate
            }]
          }
        },
        bio: {
          component: TextboxInput,
          props: {
            placeholder: 'Enter in breif bio...',
            multiLined: true
          }
        },
        receiveNewletters: {
          component: CheckboxInput,
          props: {
            label: 'I want to receive weekly newsletters'
          }
        },
        over21: {
          component: CheckboxInput,
          props: {
            label: 'I am over the age of 21',
            displayPosition: 'left'
          }
        },
        agreeToTermsAndConditions: {
          component: CheckboxInput,
          props: {
            label: 'I agree to the terms and conditions',
            renderValidation: 'both',
            validators: [{
              validator: this.validate
            }]
          }
        },
        liveIn: {
          component: RadioInput,
          props: {
            ref: 'liveIn',
            name: 'liveIn',
            options: this.getRadioOptions(),
            renderValidation: 'both',
            validators: [{
              validator: this.validateLiveIn
            }]
          }
        },
        date: {
          component: DatePicker,
          valueProperty: 'selectedDay',
          hasOnChange: false,
          props: {
            onClickDate: this.onClickDate,
            renderValidation: 'both',
            validateOnLoad: true,
            validators: [{
              message: 'Must be 03/10/2015 to validate',
              validator: function(value) {
                return value === '03/10/2015';
              }
            }]
          }
        }
      }
    };
  },

  renderForm: function() {
    var inputs = this.getInputs('test');

    return (
      <form>
        {inputs.firstName.render()}
        {inputs.lastName.render()}
        {inputs.email.render()}
        <InputGroup>
          {inputs.password.render()}
          {inputs.confirmPassword.render()}
        </InputGroup>
        {inputs.gender.render()}
        {inputs.bio.render()}
        {inputs.receiveNewletters.render()}
        {inputs.over21.render()}
        {inputs.agreeToTermsAndConditions.render()}
        {inputs.liveIn.render()}
        {inputs.date.render()}
      </form>
    );
  },

  validate: function(value) {
    return value === 'true' ? true : false;
  },

  validateLiveIn: function(value) {
    return value === 'US';
  },

  validateNotEmpty: function(value) {
    return value.length > 0;
  },

  validateEmail: function(value) {
    return value === 'jane.doe@example.com';
  },

  getGenderOptions: function() {
    return [{
      value: 'f',
      display: 'Female'
    }, {
      value: 'm',
      display: 'Male'
    }, {
      value: 'true',
      display: 'True'
    }];
  },

  getRadioOptions: function() {
    return [{
      display: 'I live in the US',
      value: 'US'
    }, {
      display: 'I live outside the US',
      value: 'OTHER',
      displayPosition: 'left'
    }];
  },

  onClickDate: function(value) {
    var newForm = _.clone(this.state.test);
    newForm.date = value;

    this.setState({
      test: newForm
    });
  },

  resetTestForm: function() {
    this.resetForm('test');
  },

  validateTestForm: function() {
    this.validateForm('test');
  },

  render: function() {
    return (
      <span>
        {this.renderForm()}
        <Button onClick={this.resetTestForm}>Reset</Button>
        <Button onClick={this.validateTestForm}>Validate</Button>
        <div>
          <header>Form Data</header>
          <span dangerouslySetInnerHTML={{__html: JSON.stringify(this.state.test, null, '\t').replace(/\n/g, '<br />')}}></span>
        </div>
      </span>
    );
  }
});

var FormExmpleLabels = React.createClass({
  getInitialState: function() {
    return {
      test: {
        firstName: '1',
        lastName: '2',
        email: '3',
        password: '4',
        gender: 'm',
        bio: '7',
        receiveNewletters: true,
        over21: true,
        agreeToTermsAndConditions: true,
        liveIn: 'OTHER'
      }
    };
  },

  onChangeGenerator: function(formField) {
    return function() {
      var formData = _.clone(this.state.test, true);
      formData[formField] = event.target.value;

      this.setState({
        formData: formData
      });
    }.bind(this);
  },

  validate: function(value) {
    return false;
  },

  getGenderOptions: function() {
    return [{
      value: 'f',
      display: 'Female'
    }, {
      value: 'm',
      display: 'Male'
    }];
  },

  getRadioOptions: function() {
    return [{
      display: 'I live in the US',
      value: 'US'
    }, {
      display: 'I live outside the US',
      value: 'OTHER',
      displayPosition: 'left'
    }];
  },

  render: function() {
    return (
      <form>
        <TextboxInput label="First Name" value={this.state.test.firstName} onChange={this.onFirstNameChange} />
        <TextboxInput label="Last Name" value={this.state.test.lastName} onChange={this.onLastNameChange} />
        <TextboxInput label="Email Address" value={this.state.test.email} onChange={this.onEmailChange} renderValidation="invalid" validate={this.validate} />
        <InputGroup>
          <TextboxInput className="password" maskValue={true} label="Password" value={this.state.test.password} onChange={this.onPasswordChange} renderValidation="both" validateOnLoad={true} validators={[{validator:this.validate}]} />
          <TextboxInput className="confirm-password" label="Confirm Password" />
        </InputGroup>
        <SelectInput label="Gender" emptyOption="Select Gender" options={this.getGenderOptions()} value={this.state.test.gender} onChange={this.onGenderChange} />
        <TextboxInput label="Bio" placeholder="Enter in breif bio..." multiLined={true} onChange={this.onTestBioChange} />
        <CheckboxInput label="I want to receive weekly newsletters" checked={this.state.test.receiveNewletters} onChange={this.onReceiveNewlettersChange} />
        <CheckboxInput label="I am over the age of 21" checked={this.state.test.over21} displayPosition="left" onChange={this.onOver21Change} />
        <CheckboxInput label="I agree to the terms and conditions" checked={this.state.test.agreeToTermsAndConditions} onChange={this.onAgreeToTermsAndConditionsChange} renderValidation="both" validate={this.validate} />
        <RadioInput name="liveIn" options={this.getRadioOptions()} value={this.state.test.liveIn} onChange={this.onLiveInChange} renderValidation="both" validate={this.validateLiveIn} onChange={this.onChangeGenerator('liveIn')} />
      </form>
    );
  }
});

var FormExmpleInline = React.createClass({
  getInitialState: function() {
    return {
      test: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        gender: null,
        bio: null,
        receiveNewletters: false,
        over21: false,
        agreeToTermsAndConditions: false,
        liveIn: null
      }
    };
  },

  onChangeGenerator: function(formField) {
    return function() {
      var formData = _.clone(this.state.test, true);
      formData[formField] = event.target.value;

      this.setState({
        formData: formData
      });
    }.bind(this);
  },

  validate: function(value) {
    return false;
  },

  getGenderOptions: function() {
    return [{
      value: 'f',
      display: 'Female'
    }, {
      value: 'm',
      display: 'Male'
    }];
  },

  getRadioOptions: function() {
    return [{
      display: 'I live in the US',
      value: 'US'
    }, {
      display: 'I live outside the US',
      value: 'OTHER',
      displayPosition: 'left'
    }];
  },

  render: function() {
    return (
      <form className="m-inline">
        <TextboxInput label="First Name" value={this.state.test.firstName} onChange={this.onFirstNameChange} prepend="http://" />
        <TextboxInput label="Last Name" value={this.state.test.lastName} onChange={this.onLastNameChange} append=".com" />
        <TextboxInput label="Email Address" value={this.state.test.email} onChange={this.onEmailChange} renderValidation="invalid" validate={this.validate} prepend="http://" append=".com" />
        <InputGroup>
          <TextboxInput className="password" maskValue={true} label="Password" value={this.state.test.password} onChange={this.onPasswordChange} renderValidation="both" validateOnLoad={true} validators={[{validator:this.validate}]} />
          <TextboxInput className="confirm-password" label="Confirm Password" />
        </InputGroup>
        <SelectInput label="Gender" emptyOption="Select Gender" options={this.getGenderOptions()} value={this.state.test.gender} onChange={this.onGenderChange} />
        <TextboxInput label="Bio" placeholder="Enter in breif bio..." multiLined={true} onChange={this.onBioChange} />
        <CheckboxInput label="I want to receive weekly newsletters" checked={this.state.test.receiveNewletters} onChange={this.onReceiveNewlettersChange} />
        <CheckboxInput label="I am over the age of 21" checked={this.state.test.over21} displayPosition="left" onChange={this.onOver21Change} />
        <CheckboxInput label="I agree to the terms and conditions" checked={this.state.test.agreeToTermsAndConditions} onChange={this.onAgreeToTermsAndConditionsChange} renderValidation="both" validate={this.validate} />
        <RadioInput name="liveIn" options={this.getRadioOptions()} value={this.state.test.liveIn} onChange={this.onLiveInChange} renderValidation="both" validate={this.validateLiveIn} onChange={this.onChangeGenerator('liveIn')} />
      </form>
    );
  }
});

module.exports = {
  name: 'Form',
  type: 'component',
  overview: (
    <p>
      Forms.

      <p><strong>This is still very much a work in progress.</strong></p>
    </p>
  ),
  properties: [],
  examples: [{
    description: (
      <p>
        Standard form without labels (with data display).
      </p>
    ),
    example: (
      <FormExmplePlaceholders />
    ),
    exampleString: '<Badge>Standard</Badge>'
  }, {
    description: (
      <p>
        Standard form with labels (with pre-populated data).
      </p>
    ),
    example: (
      <FormExmpleLabels />
    ),
    exampleString: '<Badge>Standard</Badge>'
  }, {
    description: (
      <p>
        Inline form with labels.
      </p>
    ),
    example: (
      <FormExmpleInline />
    ),
    exampleString: '<Badge>Standard</Badge>'
  }]
};
