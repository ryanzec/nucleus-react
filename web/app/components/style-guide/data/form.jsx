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
    return {
      initialTest: {
        firstName: '',
        lastName: '',
        email: '',
        password: 'true',
        gender: '',
        bio: '',
        receiveNewletters: false,
        over21: false,
        agreeToTermsAndConditions: false,
        liveIn: '',
        date: ''
      },
      test: {
        firstName: '',
        lastName: '',
        email: '',
        password: 'true',
        gender: '',
        bio: '',
        receiveNewletters: false,
        over21: false,
        agreeToTermsAndConditions: false,
        liveIn: '',
        date: ''
      }
    };
  },

  getInputs: function(name) {
    return {
      firstName: (
        <TextboxInput
          ref="firstName"
          placeholder="First Name"
          value={this.state.test.firstName}
          onChange={this.onChangeFormInput('test', 'firstName')}
        />
      ),
      lastName: (
        <TextboxInput
          ref="lastName" placeholder="Last Name" value={this.state.test.lastName} onChange={this.onChangeFormInput('test', 'lastName')} />
      ),
      email: (
        <TextboxInput
          ref="email" placeholder="Email Address" value={this.state.test.email} onChange={this.onChangeFormInput('test', 'email')} renderValidation="invalid" validate={this.validate} />
      ),
      password: (
        <TextboxInput
          ref="password" className="password" maskValue={true} placeholder="Password" value={this.state.test.password} onChange={this.onChangeFormInput('test', 'password')} renderValidation="both" validate={this.validate} />
      ),
      confirmPassword: (
        <TextboxInput
          ref="confirmPassword" className="confirm-password" placeholder="Confirm Password" />
      ),
      gender: (
        <SelectInput
          ref="gender" emptyOption="Select Gender" options={this.getGenderOptions()} value={this.state.test.gender} onChange={this.onChangeFormInput('test', 'gender')} renderValidation="both"  validate={this.validate} />
      ),
      bio: (
        <TextboxInput
          ref="bio" placeholder="Enter in breif bio..." multiLined={true} value={this.state.test.bio} onChange={this.onChangeFormInput('test', 'bio')} />
      ),
      receiveNewletters: (
        <CheckboxInput
          ref="receiveNewletters" label="I want to receive weekly newsletters" checked={this.state.test.receiveNewletters} onChange={this.onChangeFormInput('test', 'receiveNewletters')} />
      ),
      over21: (
        <CheckboxInput
          ref="over21" label="I am over the age of 21" checked={this.state.test.over21} displayPosition="left" onChange={this.onChangeFormInput('test', 'over21')} />
      ),
      agreeToTermsAndConditions: (
        <CheckboxInput
          ref="agreeToTermsAndConditions" label="I agree to the terms and conditions" checked={this.state.test.agreeToTermsAndConditions} onChange={this.onChangeFormInput('test', 'agreeToTermsAndConditions')} renderValidation="both" validate={this.validate} />
      ),
      liveIn: (
        <RadioInput
          ref="liveIn" name="liveIn" options={this.getRadioOptions()} value={this.state.test.liveIn} onChange={this.onChangeFormInput('test', 'liveIn')} renderValidation="both" validate={this.validateLiveIn} />
      ),
      date: (
        <DatePicker
          ref="date" onClickDate={this.onClickDate} selectedDay={this.state.test.date} />
      )
    };
  },

  renderForm: function() {
    var inputs = this.getInputs();

    return (
      <form>
        {inputs.firstName}
        {inputs.lastName}
        {inputs.email}
        <InputGroup>
          {inputs.password}
          {inputs.confirmPassword}
        </InputGroup>
        {inputs.gender}
        {inputs.bio}
        {inputs.receiveNewletters}
        {inputs.over21}
        {inputs.agreeToTermsAndConditions}
        {inputs.liveIn}
        {inputs.date}
      </form>
    );
  },

  validate: function(value) {
    return value === 'true' ? true : false;
  },

  validateLiveIn: function(value) {
    return value === 'US';
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

  render: function() {
    return (
      <span>
        <div>
          <header>Form Data</header>
          <span dangerouslySetInnerHTML={{__html: JSON.stringify(this.state.test, null, '\t').replace(/\n/g, '<br />')}}></span>
        </div>
        {this.renderForm()}
        <Button onClick={this.resetTestForm}>Clear</Button>
        <Button onClick={this.validateFormTest}>Validate</Button>
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
          <TextboxInput className="password" maskValue={true} label="Password" value={this.state.test.password} onChange={this.onPasswordChange} renderValidation="both" renderValidationOnLoad={true} validate={this.validate} />
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
          <TextboxInput className="password" maskValue={true} label="Password" value={this.state.test.password} onChange={this.onPasswordChange} renderValidation="both" renderValidationOnLoad={true} validate={this.validate} />
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
