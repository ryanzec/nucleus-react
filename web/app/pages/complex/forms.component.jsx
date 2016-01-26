var React = require('react');
var ReactDOM = require('react-dom');
var commonReact = require('../../../../assets/index');
var applicationReact = require('../../react/index');
var formDataValidation = require('form-data-validation');
var formDataHelpers = formDataValidation.helpers;
var dataValidation = require('data-validation');
var immutable = require('immutable');
var fs = require('fs');
var inputHelper = commonReact.helpers.input;

var menuStore = require('../../stores/menu.store');

var Button = commonReact.components.Button;
var CheckboxInput = commonReact.components.CheckboxInput;
var DatePicker = commonReact.components.DatePicker;
var ExtendText = commonReact.components.ExtendText;
var FormElement = commonReact.components.FormElement;
var FormElementGroup = commonReact.components.FormElementGroup;
var FormValidationMessages = commonReact.components.FormValidationMessages;
var RadioInput = commonReact.components.RadioInput;
var RadioInputGroup = commonReact.components.RadioInputGroup;
var SelectInput = commonReact.components.SelectInput;
var SvgIcon = commonReact.components.SvgIcon;
var TextboxInput = commonReact.components.TextboxInput;

//NOTE: general helper methods
var arrayToValidationErrors = function(messages) {
  var formattedMessages = [];

  if (messages) {
    messages.forEach(function(message) {
      formattedMessages.push({
        className: 'm-danger',
        message: message
      });
    });
  }

  return formattedMessages;
};

var onChangeInputEventHandler = function(options) {
  var markAsDirty = options.markAsDirty === true;
  var newFormData = formDataHelpers.set(this.state[options.formName], options.fieldName, options.value, markAsDirty);
  var validateParameters = [newFormData, options.fieldName];

  if (options.validationWith) {
    var validatWithKeys = Object.keys(options.validationWith);

    validatWithKeys.forEach(function(vlaidateionWithKey) {
      if (options.fieldName === vlaidateionWithKey) {
        options.validationWith[vlaidateionWithKey].forEach(function(fieldName) {
          if (
            formDataHelpers.isDirty(newFormData, fieldName) === true
            || formDataHelpers.isValid(newFormData, fieldName) !== null
          ) {
            validateParameters.push(fieldName);
          }
        }.bind(this));
      }
    }.bind(this));
  }

  if (
    formDataHelpers.isDirty(newFormData, options.fieldName)
    || formDataHelpers.hasBeenValidated(newFormData, options.fieldName) === true
  ) {
    newFormData = formDataHelpers.validate.apply(null, validateParameters);
  }

  return newFormData;
};

var onBlurInputEventHandler = function(options) {
  var newFormData = formDataHelpers.validate(this.state[options.formName], options.fieldName);
  return formDataHelpers.markFieldAsDirty(newFormData, options.fieldName);
};

//NOTE: this provide performance gains
var DynamicEmail = React.createClass({
  mixins: [
    commonReact.mixins.simplePureRender
  ],

  render: function() {
    return (
      <FormElement
        renderValidation={this.props.renderValidation}
        isValid={this.props.isValid}
      >
        <label>Email</label>
        <TextboxInput
          data-form-name={this.props['data-form-name']}
          data-form-field={this.props['data-form-field']}
          value={this.props.value}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
        />
        {this.props.messagesNode}
      </FormElement>
    );
  }
});

var BasicForm = React.createClass({
  getInitialState: function() {
    return {
      form: formDataValidation.formDataFactory({
        fields: {
          username: {},
          password: {}
        }
      })
    };
  },

  onChangeInputEvent: function(event) {
    var formName = event.target.getAttribute('data-form-name');
    var newState = {};
    newState[formName] = onChangeInputEventHandler.call(this, {
      formName: formName,
      fieldName: event.target.getAttribute('data-form-field'),
      value: inputHelper.getValueFromEvent(event)
    });

    this.setState(newState);
  },

  onBlurInputEvent: function(event) {
    var formName = event.target.getAttribute('data-form-name');
    var newState = {};
    newState[formName] = onBlurInputEventHandler.call(this, {
      formName: event.target.getAttribute('data-form-name'),
      fieldName: event.target.getAttribute('data-form-field')
    });

    this.setState(newState);
  },

  onClickFormSubmit: function(event) {
    var formName = event.target.getAttribute('data-form-name');

    var newFormData = formDataHelpers.validate(this.state[formName]);
    console.log(formDataHelpers.isValid(newFormData));

    var newState = {};
    newState[formName] = newFormData;

    this.setState(newState);
  },

  onClickFormReset: function(event) {
    var formName = event.target.getAttribute('data-form-name');

    var newState = {};
    newState[formName] = newFormData.reset(this.state[formName]);

    this.setState(newState);
  },

  render: function() {
    return (
      <span>
        <div className="form-container">
          <FormElement>
            <label>Username</label>
            <TextboxInput
              data-form-name="form"
              data-form-field="username"
              value={this.state.form.getIn(['username', 'value'])}
              onChange={this.onChangeInputEvent}
              onBlur={this.onBlurInputEvent}
            />
          </FormElement>
          <FormElement>
            <label>Password</label>
            <TextboxInput
              data-form-name="form"
              data-form-field="password"
              type="password"
              value={this.state.form.getIn(['password', 'value'])}
              onChange={this.onChangeInputEvent}
              onBlur={this.onBlurInputEvent}
            />
          </FormElement>
          <pre
              dangerouslySetInnerHTML={{
                  __html: JSON.stringify(formDataHelpers.asJson(this.state.form), null, '\t')
              }}
          />
          <Button
            data-form-name="form"
            onClick={this.onClickFormSubmit}
          >Submit</Button>
          <Button
            data-form-name="form"
            onClick={this.onClickFormReset}
          >Reset</Button>
        </div>
      </span>
    );
  }
});

var BasicValidation = React.createClass({
  getInitialState: function() {
    return {
      form: formDataValidation.formDataFactory({
        fields: {
          email: {
            validatorOptions: {
              validators: [{
                validator: function(value) {
                  return dataValidation.validate('email', value);
                },
                message: 'Not a valid email address'
              }]
            }
          }
        }
      })
    };
  },

  onChangeInputEvent: function(event) {
    var formName =event.target.getAttribute('data-form-name');
    var newState = {};
    newState[formName] = onChangeInputEventHandler.call(this, {
      formName: formName,
      fieldName: event.target.getAttribute('data-form-field'),
      value: inputHelper.getValueFromEvent(event)
    });

    this.setState(newState);
  },

  onBlurInputEvent: function(event) {
    var formName = event.target.getAttribute('data-form-name');
    var newState = {};
    newState[formName] = onBlurInputEventHandler.call(this, {
      formName: formName,
      fieldName: event.target.getAttribute('data-form-field')
    });

    this.setState(newState);
  },

  onClickFormSubmit: function(event) {
    var formName = event.target.getAttribute('data-form-name');

    var newFormData = formDataHelpers.validate(this.state[formName]);
    console.log(formDataHelpers.isValid(newFormData));

    var newState = {};
    newState[formName] = newFormData;

    this.setState(newState);
  },

  onClickFormReset: function(event) {
    var formName = event.target.getAttribute('data-form-name');

    var newState = {};
    newState[formName] = newFormData.reset(this.state[formName]);

    this.setState(newState);
  },

  render: function() {
    return (
      <span>
        <div className="form-container">
          <FormElement
            renderValidation="invalid"
            isValid={formDataHelpers.isValid(this.state.form, 'email')}
          >
            <label>Email</label>
            <TextboxInput
              data-form-name="form"
              data-form-field="email"
              value={this.state.form.getIn(['email', 'value'])}
              onChange={this.onChangeInputEvent}
              onBlur={this.onBlurInputEvent}
            />
          </FormElement>
          <FormValidationMessages messages={arrayToValidationErrors(formDataHelpers.getValidationMessages(this.state.form, 'email'))} />
          <pre
              dangerouslySetInnerHTML={{
                  __html: JSON.stringify(formDataHelpers.asJson(this.state.form), null, '\t')
              }}
          />
          <Button
            data-form-name="form"
            onClick={this.onClickFormSubmit}
          >Submit</Button>
          <Button
            data-form-name="form"
            onClick={this.onClickFormReset}
          >Reset</Button>
        </div>
      </span>
    );
  }
});

var MultipleInputValidationGrouped = React.createClass({
  getInitialState: function() {
    return {
      form: formDataValidation.formDataFactory({
        fields: {
          password: {
            validatorOptions: {
              validators: [{
                validator: function(value) {
                  return dataValidation.validate('minLength', value, 6);
                },
                message: 'Password must be at least 6 characters'
              }, {
                validator: function(value, option, formData) {
                  return formDataHelpers.isDirty(formData, 'confirmPassword') === true || formDataHelpers.hasBeenValidated(formData, 'confirmPassword') === true
                    ? formDataHelpers.get(formData, 'confirmPassword') === value
                    : true;
                }
              }]
            }
          },
          confirmPassword: {
            validatorOptions: {
              validators: [{
                validator: function(value, options, formData) {
                  return formDataHelpers.isDirty(formData, 'password') === true || formDataHelpers.hasBeenValidated(formData, 'password') === true
                    ? formDataHelpers.get(formData, 'password') === value
                    : true;
                },
                message: 'Passwords don\'t match'
              }]
            }
          }
        }
      })
    };
  },

  onChangeInputEvent: function(event) {
    var formName = event.target.getAttribute('data-form-name');
    var newState = {};
    newState[formName] = onChangeInputEventHandler.call(this, {
      formName: formName,
      fieldName: event.target.getAttribute('data-form-field'),
      value: inputHelper.getValueFromEvent(event),
      validationWith: {
        password: ['confirmPassword'],
        confirmPassword: ['password']
      }
    });

    this.setState(newState);
  },

  onBlurInputEvent: function(event) {
    var formName = event.target.getAttribute('data-form-name');
    var newState = {};
    newState[formName] = onBlurInputEventHandler.call(this, {
      formName: formName,
      fieldName: event.target.getAttribute('data-form-field')
    });

    this.setState(newState);
  },

  onClickFormSubmit: function(event) {
    var formName = event.target.getAttribute('data-form-name');

    var newFormData = formDataHelpers.validate(this.state[formName]);
    console.log(formDataHelpers.isValid(newFormData));

    var newState = {};
    newState[formName] = newFormData;

    this.setState(newState);
  },

  onClickFormReset: function(event) {
    var formName = event.target.getAttribute('data-form-name');

    var newState = {};
    newState[formName] = newFormData.reset(this.state[formName]);

    this.setState(newState);
  },

  render: function() {
    var validationErrors = formDataHelpers.getValidationMessages(this.state.form, 'password', 'confirmPassword');

    return (
      <span>
        <div className="form-container">
          <FormElementGroup>
            <FormElement
              renderValidation="invalid"
              isValid={formDataHelpers.isValid(this.state.form, 'password')}
            >
              <label>Password</label>
              <TextboxInput
                data-form-name="form"
                data-form-field="password"
                value={this.state.form.getIn(['password', 'value'])}
                onChange={this.onChangeInputEvent}
                onBlur={this.onBlurInputEvent}
              />
            </FormElement>
            <FormElement
              renderValidation="invalid"
              isValid={formDataHelpers.isValid(this.state.form, 'confirmPassword')}
            >
              <label>Confirm Password</label>
              <TextboxInput
                data-form-name="form"
                data-form-field="confirmPassword"
                value={this.state.form.getIn(['confirmPassword', 'value'])}
                onChange={this.onChangeInputEvent}
                onBlur={this.onBlurInputEvent}
              />
            </FormElement>
          </FormElementGroup>
          <FormValidationMessages messages={arrayToValidationErrors(validationErrors)} />
          <pre
              dangerouslySetInnerHTML={{
                  __html: JSON.stringify(formDataHelpers.asJson(this.state.form), null, '\t')
              }}
          />
          <Button
            data-form-name="form"
            onClick={this.onClickFormSubmit}
          >Submit</Button>
          <Button
            data-form-name="form"
            onClick={this.onClickFormReset}
          >Reset</Button>
        </div>
      </span>
    );
  }
});

var InstantValidation = React.createClass({
  getInitialState: function() {
    return {
      form: formDataValidation.formDataFactory({
        fields: {
          password: {
            validatorOptions: {
              validators: [{
                validator: function(value) {
                  return dataValidation.validate('minLength', value, 6);
                },
                message: 'Password must be at least 6 characters'
              }, {
                validator: function(value, option, formData) {
                  return formDataHelpers.isDirty(formData, 'confirmPassword') === true || formDataHelpers.hasBeenValidated(formData, 'confirmPassword') === true
                    ? formDataHelpers.get(formData, 'confirmPassword') === value
                    : true;
                }
              }]
            }
          },
          confirmPassword: {
            validatorOptions: {
              validators: [{
                validator: function(value, options, formData) {
                  return formDataHelpers.isDirty(formData, 'password') === true || formDataHelpers.hasBeenValidated(formData, 'password') === true
                    ? formDataHelpers.get(formData, 'password') === value
                    : true;
                },
                message: 'Passwords don\'t match'
              }]
            }
          }
        }
      })
    };
  },

  onChangeInputEvent: function(event) {
    var formName = event.target.getAttribute('data-form-name');
    var newState = {};
    newState[formName] = onChangeInputEventHandler.call(this, {
      formName: formName,
      fieldName: event.target.getAttribute('data-form-field'),
      value: inputHelper.getValueFromEvent(event),
      markAsDirty: true,
      validationWith: {
        password: ['confirmPassword'],
        confirmPassword: ['password']
      }
    });

    this.setState(newState);
  },

  onBlurInputEvent: function(event) {
    var formName = event.target.getAttribute('data-form-name');
    var newState = {};
    newState[formName] = onBlurInputEventHandler.call(this, {
      formName: formName,
      fieldName: event.target.getAttribute('data-form-field')
    });

    this.setState(newState);
  },

  onClickFormSubmit: function(event) {
    var formName = event.target.getAttribute('data-form-name');

    var newFormData = formDataHelpers.validate(this.state[formName]);
    console.log(formDataHelpers.isValid(newFormData));

    var newState = {};
    newState[formName] = newFormData;

    this.setState(newState);
  },

  onClickFormReset: function(event) {
    var formName = event.target.getAttribute('data-form-name');

    var newState = {};
    newState[formName] = newFormData.reset(this.state[formName]);

    this.setState(newState);
  },

  render: function() {
    var validationErrors = formDataHelpers.getValidationMessages(this.state.form, 'password', 'confirmPassword');

    return (
      <span>
        <div className="form-container">
          <FormElementGroup>
            <FormElement
              renderValidation="invalid"
              isValid={formDataHelpers.isValid(this.state.form, 'password')}
            >
              <label>Password</label>
              <TextboxInput
                data-form-name="form"
                data-form-field="password"
                value={this.state.form.getIn(['password', 'value'])}
                onChange={this.onChangeInputEvent}
                onBlur={this.onBlurInputEvent}
              />
            </FormElement>
            <FormElement
              renderValidation="invalid"
              isValid={formDataHelpers.isValid(this.state.form, 'confirmPassword')}
            >
              <label>Confirm Password</label>
              <TextboxInput
                data-form-name="form"
                data-form-field="confirmPassword"
                value={this.state.form.getIn(['confirmPassword', 'value'])}
                onChange={this.onChangeInputEvent}
                onBlur={this.onBlurInputEvent}
              />
            </FormElement>
          </FormElementGroup>
          <FormValidationMessages messages={arrayToValidationErrors(validationErrors)} />
          <pre
              dangerouslySetInnerHTML={{
                  __html: JSON.stringify(formDataHelpers.asJson(this.state.form), null, '\t')
              }}
          />
          <Button
            data-form-name="form"
            onClick={this.onClickFormSubmit}
          >Submit</Button>
          <Button
            data-form-name="form"
            onClick={this.onClickFormReset}
          >Reset</Button>
        </div>
      </span>
    );
  }
});

var InputInInput = React.createClass({
  getInitialState: function() {
    return {
      form: formDataValidation.formDataFactory({
        fields: {
          optInNewsletter: {},
          email: {
            validatorOptions: {
              validators: [{
                validator: function(value) {
                  return dataValidation.validate('email', value);
                },
                message: 'Not a valid email address'
              }]
            }
          }
        }
      }),
      formSettings: immutable.Map({
        email: immutable.Map({
          disabled: true
        })
      })
    };
  },

  onChangeInputEvent: function(event) {
    var formName = event.target.getAttribute('data-form-name');
    var fieldName = event.target.getAttribute('data-form-field');
    var value = inputHelper.getValueFromEvent(event);
    var newState = {};
    newState[formName] = onChangeInputEventHandler.call(this, {
      formName: formName,
      fieldName: fieldName,
      value: value,
      markAsDirty: event.target.getAttribute('type') === 'checkbox' || event.target.getAttribute('type') === 'radio'
    });

    if (fieldName === 'optInNewsletter') {
      newState.formSettings = this.state.formSettings.setIn(['email', 'disabled'], !value);

      if (value === false) {
        newState[formName] = formDataHelpers.reset(newState[formName], 'email');
      }
    }

    this.setState(newState);
  },

  onBlurInputEvent: function(event) {
    var formName = event.target.getAttribute('data-form-name');
    var newState = {};
    newState[formName] = onBlurInputEventHandler.call(this, {
      formName: formName,
      fieldName: event.target.getAttribute('data-form-field')
    });

    this.setState(newState);
  },

  onClickFormSubmit: function(event) {
    var formName = event.target.getAttribute('data-form-name');

    var newFormData = formDataHelpers.validate(this.state[formName]);
    console.log(formDataHelpers.isValid(newFormData));

    var newState = {};
    newState[formName] = newFormData;

    this.setState(newState);
  },

  onClickFormReset: function(event) {
    var formName = event.target.getAttribute('data-form-name');

    var newState = {};
    newState[formName] = newFormData.reset(this.state[formName]);

    this.setState(newState);
  },

  render: function() {
    return (
      <span>
        <div className="form-container">
          <FormElement
            className="m-inline"
            renderValidation="invalid"
            isValid={formDataHelpers.isValid(this.state.form, 'email')}
          >
            <CheckboxInput
              data-form-name="form"
              data-form-field="optInNewsletter"
              label="Opt-In Newsletter: "
              value={this.state.form.getIn(['optInNewsletter', 'value'])}
              onChange={this.onChangeInputEvent}
              onBlur={this.onBlurInputEvent}
            />
            <TextboxInput
              data-form-name="form"
              data-form-field="email"
              disabled={this.state.formSettings.getIn(['email', 'disabled'])}
              value={this.state.form.getIn(['email', 'value'])}
              onChange={this.onChangeInputEvent}
              onBlur={this.onBlurInputEvent}
            />
          </FormElement>
          <FormValidationMessages messages={arrayToValidationErrors(formDataHelpers.getValidationMessages(this.state.form, 'email'))} />
          <pre
              dangerouslySetInnerHTML={{
                  __html: JSON.stringify(formDataHelpers.asJson(this.state.form), null, '\t')
              }}
          />
          <Button
            data-form-name="form"
            onClick={this.onClickFormSubmit}
          >Submit</Button>
          <Button
            data-form-name="form"
            onClick={this.onClickFormReset}
          >Reset</Button>
        </div>
      </span>
    );
  }
});

var ToggleValidation = React.createClass({
  getInitialState: function() {
    return {
      form: formDataValidation.formDataFactory({
        fields: {
          email: {
            validatorOptions: {
              validators: [{
                validator: function(value) {
                  return dataValidation.validate('email', value);
                },
                message: 'Not a valid email address'
              }]
            }
          }
        }
      })
    };
  },

  onChangeInputEvent: function(event) {
    var formName = event.target.getAttribute('data-form-name');
    var newState = {};
    newState[formName] = onChangeInputEventHandler.call(this, {
      formName: formName,
      fieldName: event.target.getAttribute('data-form-field'),
      value: inputHelper.getValueFromEvent(event)
    });

    this.setState(newState);
  },

  onBlurInputEvent: function(event) {
    var formName = event.target.getAttribute('data-form-name');
    var newState = {};
    newState[formName] = onBlurInputEventHandler.call(this, {
      formName: formName,
      fieldName: event.target.getAttribute('data-form-field')
    });

    this.setState(newState);
  },

  onClickFormSubmit: function(event) {
    var formName = event.target.getAttribute('data-form-name');

    var newFormData = formDataHelpers.validate(this.state[formName]);
    console.log(formDataHelpers.isValid(newFormData));

    var newState = {};
    newState[formName] = newFormData;

    this.setState(newState);
  },

  onClickFormReset: function(event) {
    var formName = event.target.getAttribute('data-form-name');

    var newState = {};
    newState[formName] = newFormData.reset(this.state[formName]);

    this.setState(newState);
  },

  onClickValidationsOn: function(event) {
    var formName = event.target.getAttribute('data-form-name');
    var newState = {};
    var newFormData = formDataHelpers.enableValidation(this.state[formName]);
    var fieldNames = Object.keys(formDataHelpers.get(newFormData));

    fieldNames.forEach(function(fieldName) {
      if (
        formDataHelpers.isDirty(newFormData, fieldName)
        || formDataHelpers.hasBeenValidated(newFormData, fieldName) === true
      ) {
        newFormData = formDataHelpers.validate(newFormData, fieldName);
      }
    }.bind(this));

    newState[formName] = newFormData;

    this.setState(newState);
  },

  onClickValidationsOff: function(event) {
    var formName = event.target.getAttribute('data-form-name');
    var newState = {};

    newState[formName] = formDataHelpers.disableValidation(this.state[formName]);

    this.setState(newState);
  },

  render: function() {
    return (
      <span>
        <div className="form-container">
          <FormElement
            renderValidation="invalid"
            isValid={formDataHelpers.isValid(this.state.form, 'email')}
          >
            <label>Email</label>
            <TextboxInput
              data-form-name="form"
              data-form-field="email"
              value={this.state.form.getIn(['email', 'value'])}
              onChange={this.onChangeInputEvent}
              onBlur={this.onBlurInputEvent}
            />
          </FormElement>
          <FormValidationMessages messages={arrayToValidationErrors(formDataHelpers.getValidationMessages(this.state.form, 'email'))} />
          <pre
              dangerouslySetInnerHTML={{
                  __html: JSON.stringify(formDataHelpers.asJson(this.state.form), null, '\t')
              }}
          />
          <Button
            data-form-name="form"
            onClick={this.onClickFormSubmit}
          >Submit</Button>
          <Button
            data-form-name="form"
            onClick={this.onClickFormReset}
          >Reset</Button>
          <Button
            data-form-name="form"
            onClick={this.onClickValidationsOn}
          >Validations On</Button>
          <Button
            data-form-name="form"
            onClick={this.onClickValidationsOff}
          >Validations Off</Button>
        </div>
      </span>
    );
  }
});

var DynamicInputs = React.createClass({
  getInitialState: function() {
    return {
      form: formDataValidation.formDataFactory({
        fields: {}
      }),
      numberOfInputs: 0
    };
  },

  onChangeInputEvent: function(event) {
    var formName = event.target.getAttribute('data-form-name');
    var newState = {};
    newState[formName] = onChangeInputEventHandler.call(this, {
      formName: formName,
      fieldName: event.target.getAttribute('data-form-field'),
      value: inputHelper.getValueFromEvent(event)
    });

    this.setState(newState);
  },

  onBlurInputEvent: function(event) {
    var formName = event.target.getAttribute('data-form-name');
    var newState = {};
    newState[formName] = onBlurInputEventHandler.call(this, {
      formName: formName,
      fieldName: event.target.getAttribute('data-form-field')
    });

    this.setState(newState);
  },

  onClickFormSubmit: function(event) {
    var formName = event.target.getAttribute('data-form-name');

    var newFormData = formDataHelpers.validate(this.state[formName]);
    console.log(formDataHelpers.isValid(newFormData));

    var newState = {};
    newState[formName] = newFormData;

    this.setState(newState);
  },

  onClickFormReset: function(event) {
    var formName = event.target.getAttribute('data-form-name');

    var newState = {};
    newState[formName] = newFormData.reset(this.state[formName]);

    this.setState(newState);
  },

  // onClickAdd: function() {
  //   var newCount = this.state.numberOfInputs + 1;
  //   var newFieldName = 'email' + newCount;

  //   this.form.addField(newFieldName, {
  //     validatorOptions: {
  //       validators: [{
  //         validator: function(value) {
  //           return dataValidation.validate('email', value);
  //         },
  //         message: 'Not a valid email address'
  //       }]
  //     }
  //   });

  //   this.setState({
  //     form: this.form.asImmutable(),
  //     numberOfInputs: newCount
  //   });
  // },

  onClickAdd: function() {
    var c = 120;
    var newCount = this.state.numberOfInputs;
    var newFieldName;
    var newFormData = this.state.form;

    while (c > 0) {
      newCount = newCount + 1;
      newFieldName = 'email' + newCount;

      newFormData = formDataHelpers.addField(newFormData, newFieldName, {
        validatorOptions: {
          validators: [{
            validator: function(value) {
              return dataValidation.validate('email', value);
            },
            message: 'Not a valid email address'
          }]
        }
      });

      c -= 1;
    }

    this.setState({
      form: newFormData,
      numberOfInputs: newCount
    });
  },

  onClickRemove: function() {
    this.setState({
      form: formDataHelpers.removeField(this.state.form, 'email' + this.state.numberOfInputs),
      numberOfInputs: this.state.numberOfInputs - 1
    });
  },

  renderInputs: function() {
    var nodes = null;

    if (this.state.numberOfInputs > 0) {
      var count = this.state.numberOfInputs;
      var fieldName;
      nodes = [];

      while (count > 0) {
        var formMessagesNode = null;
        fieldName = 'email' + count;

        var formValidationMessages = formDataHelpers.getValidationMessages(this.state.form, fieldName);

        if (formValidationMessages && formValidationMessages.length > 0) {
          formMessagesNode = (
            <FormValidationMessages messages={arrayToValidationErrors(formDataHelpers.getValidationMessages(this.state.form, fieldName))} />
          );
        }

        nodes.push(
          <DynamicEmail
            key={count}
            simpleChecks={this.state.form.getIn([fieldName])}
            renderValidation="invalid"
            isValid={formDataHelpers.isValid(this.state.form, fieldName)}
            data-form-name="form"
            data-form-field={fieldName}
            value={this.state.form.getIn([fieldName, 'value'])}
            onChange={this.onChangeInputEvent}
            onBlur={this.onBlurInputEvent}
            messagesNode={formMessagesNode}
          />
        );

        count -= 1;
      }
    }

    if (nodes) {
      nodes.reverse();
    }

    return nodes;
  },

  render: function() {
    return (
      <span>
        <div className="form-container">
          <label>Emails <Button onClick={this.onClickAdd}>+</Button> <Button onClick={this.onClickRemove}>-</Button></label>
          <pre
              dangerouslySetInnerHTML={{
                  __html: 'Number of inputs: ' + this.state.numberOfInputs
              }}
          />
          {this.renderInputs()}
          <pre
              dangerouslySetInnerHTML={{
                  __html: JSON.stringify(formDataHelpers.asJson(this.state.form), null, '\t')
              }}
          />
          <Button
            data-form-name="form"
            onClick={this.onClickFormSubmit}
          >Submit</Button>
          <Button
            data-form-name="form"
            onClick={this.onClickFormReset}
          >Reset</Button>
        </div>
      </span>
    );
  }
});

var AllInputTypes = React.createClass({
  getInitialState: function() {
    this.ratingOptions = [{
      display: "1 star",
      value: 1
    }, {
      display: "2 stars",
      value: 2
    }, {
      display: "3 stars",
      value: 3
    }, {
      display: "4 stars",
      value: 4
    }, {
      display: "5 stars",
      value: 5
    }];

    this.genderOptions = [{
      display: 'Other',
      value: 'other'
    }, {
      display: 'Female',
      value: 'female'
    }, {
      display: 'Male',
      value: 'male'
    }];

    this.tagsStaticData = [{
      display: 'test 1',
      value: 't1'
    }, {
      display: 'test 2',
      value: 't2'
    }, {
      display: 'test 3',
      value: 't3'
    }, {
      display: 'test 4',
      value: 't4'
    }, {
      display: 'test 5',
      value: 't5'
    }];

    this.append1 = (<span>.com</span>);
    this.prepend1 = (<SvgIcon fragment="atom" />);
    this.append2 = (<SvgIcon fragment="bell" />);

    return {
      form: formDataValidation.formDataFactory({
        fields: {
          email: {
            validatorOptions: {
              validators: [{
                validator: function(value) {
                  return dataValidation.validate('email', value);
                },
                message: 'Not a valid email address'
              }]
            }
          },
          money: {
            validatorOptions: {
              validators: [{
                validator: function(value) {
                  return dataValidation.validate('minValue', value, 3);
                },
                message: 'Must be 3 or higher'
              }]
            }
          },
          url: {
            validatorOptions: {
              validators: [{
                validator: function(value) {
                  return dataValidation.validate('minLength', value, 3);
                },
                message: 'Must have at least 3 characters'
              }]
            }
          },
          wth: {
            validatorOptions: {
              validators: [{
                validator: function(value) {
                  return value === 'wth'
                },
                message: 'Must be "wth"'
              }]
            }
          },
          duplicatedFileName: {
            validatorOptions: {
              validators: [{
                validator: function(value) {
                  return dataValidation.validate('minLength', value, 3);
                },
                message: 'Must have at least 3 characters'
              }]
            }
          },
          agreeToTerms: {
            validatorOptions: {
              validators: [{
                validator: function(value) {
                  return value === true;
                },
                message: 'You must agree to our terms'
              }]
            }
          },
          rating: {
            validatorOptions: {
              validators: [{
                validator: function(value) {
                  return dataValidation.validate('minValue', value, 3);
                },
                message: 'Must be 3 stars or higher'
              }]
            }
          },
          gender: {
            validatorOptions: {
              validators: [{
                validator: function(value) {
                  return value === 'other';
                },
                message: 'Must be other'
              }]
            }
          },
          birthDate: {
            validatorOptions: {
              validators: [{
                validator: function(value) {
                  return value === '01/01/2016'
                },
                message: 'Must be 01/01/2016'
              }]
            }
          },
          tags: {
            initialValue: [],
            validatorOptions: {
              validators: [{
                validator: function(value) {
                  return dataValidation.validate('minValue', value.length, 3);
                },
                message: 'Must have 3 tags entered'
              }]
            }
          },
          uploadFile: {
            validatorOptions: {
              validators: [{
                validator: function(value) {
                  return document.querySelector('input[type="file"]').files.length > 0;
                },
                message: 'Must select a file'
              }]
            }
          }
        }
      })
    };
  },

  onChangeInputEvent: function(event) {
    var formName = event.target.getAttribute('data-form-name');
    var fieldName = event.target.getAttribute('data-form-field');
    var value = inputHelper.getValueFromEvent(event);
    var newState = {};
    newState[formName] = onChangeInputEventHandler.call(this, {
      formName: formName,
      fieldName: fieldName,
      value: value,
      markAsDirty: event.target.getAttribute('type') === 'checkbox' || event.target.getAttribute('type') === 'radio' || event.target.getAttribute('type') === 'file'
    });

    if (fieldName === 'optInNewsletter') {
      newState.formSettings = this.state.formSettings.setIn(['email', 'disabled'], !value);

      if (value === false) {
        newState[formName] = formDataHelpers.reset(newState[formName], 'email');
      }
    }

    this.setState(newState);
  },

  onBlurInputEvent: function(event) {
    var formName = event.target.getAttribute('data-form-name');
    var newState = {};
    newState[formName] = onBlurInputEventHandler.call(this, {
      formName: formName,
      fieldName: event.target.getAttribute('data-form-field')
    });

    this.setState(newState);
  },

  onBlurExtendTextEvent: function(event) {
    var newFormData = formDataHelpers.validate(this.state.form, 'tags');
    newFormData = formDataHelpers.markFieldAsDirty(newFormData, 'tags');

    this.setState({
      form: newFormData
    });
  },

  onChangeTags: function(value) {
    this.setState({
      form: formDataHelpers.set(this.state.form, 'tags', value)
    });
  },

  onBlurTags: function(event) {
    var newFormData = formDataHelpers.validate(this.state.form, 'tags');
    newFormData = formDataHelpers.markFieldAsDirty(newFormData, 'tags');

    this.setState({
      form: newFormData
    });
  },

  onClickDateBirthDate: function(value) {
    var newFormData = formDataHelpers.set(this.state.form, 'birthDate', value, true);
    newFormData = formDataHelpers.validate(newFormData, 'birthDate');

    this.setState({
      form: newFormData
    });
  },

  onClickFormSubmit: function(event) {
    var formName = event.target.getAttribute('data-form-name');

    var newFormData = formDataHelpers.validate(this.state[formName]);
    console.log(formDataHelpers.isValid(newFormData));

    var newState = {};
    newState[formName] = newFormData;

    this.setState(newState);
  },

  onClickFormReset: function(event) {
    var formName = event.target.getAttribute('data-form-name');

    var newState = {};
    newState[formName] = newFormData.reset(this.state[formName]);

    this.setState(newState);
  },

  render: function() {
    return (
      <span>
        <div className="form-container">
          <FormElement
            renderValidation="both"
            isValid={formDataHelpers.isValid(this.state.form, 'email')}
          >
            <label>Email</label>
            <TextboxInput
              data-form-name="form"
              data-form-field="email"
              value={this.state.form.getIn(['email', 'value'])}
              onChange={this.onChangeInputEvent}
              onBlur={this.onBlurInputEvent}
            />
            <FormValidationMessages messages={arrayToValidationErrors(formDataHelpers.getValidationMessages(this.state.form, 'email'))} />
          </FormElement>
          <FormElement
            renderValidation="both"
            isValid={formDataHelpers.isValid(this.state.form, 'money')}
          >
            <label>Money</label>
            <TextboxInput
              data-form-name="form"
              data-form-field="money"
              prependNode="$"
              value={this.state.form.getIn(['money', 'value'])}
              onChange={this.onChangeInputEvent}
              onBlur={this.onBlurInputEvent}
            />
            <FormValidationMessages messages={arrayToValidationErrors(formDataHelpers.getValidationMessages(this.state.form, 'money'))} />
          </FormElement>
          <FormElement
            renderValidation="both"
            isValid={formDataHelpers.isValid(this.state.form, 'url')}
          >
            <label>URL</label>
            <TextboxInput
              data-form-name="form"
              data-form-field="url"
              prependNode="https://"
              appendNode={this.append1}
              value={this.state.form.getIn(['url', 'value'])}
              onChange={this.onChangeInputEvent}
              onBlur={this.onBlurInputEvent}
            />
            <FormValidationMessages messages={arrayToValidationErrors(formDataHelpers.getValidationMessages(this.state.form, 'url'))} />
          </FormElement>
          <FormElement
            renderValidation="both"
            isValid={formDataHelpers.isValid(this.state.form, 'wth')}
          >
            <label>WTH</label>
            <TextboxInput
              data-form-name="form"
              data-form-field="wth"
              prependNode={this.prepend1}
              appendNode={this.append2}
              value={this.state.form.getIn(['wth', 'value'])}
              onChange={this.onChangeInputEvent}
              onBlur={this.onBlurInputEvent}
            />
            <FormValidationMessages messages={arrayToValidationErrors(formDataHelpers.getValidationMessages(this.state.form, 'wth'))} />
          </FormElement>
          <FormElement
            renderValidation="both"
            isValid={formDataHelpers.isValid(this.state.form, 'duplicatedFileName')}
          >
            <label>Duplicated File Name</label>
            <TextboxInput
              data-form-name="form"
              data-form-field="duplicatedFileName"
              appendNode="-COPY"
              value={this.state.form.getIn(['duplicatedFileName', 'value'])}
              onChange={this.onChangeInputEvent}
              onBlur={this.onBlurInputEvent}
            />
            <FormValidationMessages messages={arrayToValidationErrors(formDataHelpers.getValidationMessages(this.state.form, 'duplicatedFileName'))} />
          </FormElement>
          <FormElement
            renderValidation="both"
            isValid={formDataHelpers.isValid(this.state.form, 'uploadFile')}
          >
            <label>UploadFile</label>
            <TextboxInput
              data-form-name="form"
              data-form-field="uploadFile"
              type="file"
              value={this.state.form.getIn(['uploadFile', 'value'])}
              onChange={this.onChangeInputEvent}
            />
            <FormValidationMessages messages={arrayToValidationErrors(formDataHelpers.getValidationMessages(this.state.form, 'uploadFile'))} />
          </FormElement>
          <FormElement
            renderValidation="both"
            isValid={formDataHelpers.isValid(this.state.form, 'agreeToTerms')}
          >
            <CheckboxInput
              data-form-name="form"
              data-form-field="agreeToTerms"
              label="I agree to the terms"
              value={this.state.form.getIn(['agreeToTerms', 'value'])}
              onChange={this.onChangeInputEvent}
              onBlur={this.onBlurInputEvent}
            />
            <FormValidationMessages messages={arrayToValidationErrors(formDataHelpers.getValidationMessages(this.state.form, 'agreeToTerms'))} />
          </FormElement>
          <FormElement
            renderValidation="both"
            isValid={formDataHelpers.isValid(this.state.form, 'rating')}
          >
            <label>Rating</label>
            <SelectInput
              data-form-name="form"
              data-form-field="rating"
              options={this.ratingOptions}
              value={this.state.form.getIn(['rating', 'value'])}
              onChange={this.onChangeInputEvent}
              onBlur={this.onBlurInputEvent}
            />
            <FormValidationMessages messages={arrayToValidationErrors(formDataHelpers.getValidationMessages(this.state.form, 'rating'))} />
          </FormElement>
          <FormElement
            renderValidation="both"
            isValid={formDataHelpers.isValid(this.state.form, 'gender')}
          >
            <label>Gender</label>
            <RadioInputGroup>
              <RadioInput
                data-form-name="form"
                data-form-field="gender"
                name="gender"
                radioValue={this.genderOptions[0].value}
                label={this.genderOptions[0].display}
                labelPosition="left"
                value={this.state.form.getIn(['gender', 'value'])}
                onChange={this.onChangeInputEvent}
                onBlur={this.onBlurInputEvent}
              />
              <RadioInput
                data-form-name="form"
                data-form-field="gender"
                name="gender"
                radioValue={this.genderOptions[1].value}
                label={this.genderOptions[1].display}
                value={this.state.form.getIn(['gender', 'value'])}
                onChange={this.onChangeInputEvent}
                onBlur={this.onBlurInputEvent}
              />
              <RadioInput
                data-form-name="form"
                data-form-field="gender"
                name="gender"
                radioValue={this.genderOptions[2].value}
                label={this.genderOptions[2].display}
                value={this.state.form.getIn(['gender', 'value'])}
                onChange={this.onChangeInputEvent}
                onBlur={this.onBlurInputEvent}
              />
              <TextboxInput
                data-form-name="form"
                data-form-field="email"
                value={this.state.form.getIn(['email', 'value'])}
                onChange={this.onChangeInputEvent}
                onBlur={this.onBlurInputEvent}
              />
            </RadioInputGroup>
            <FormValidationMessages messages={arrayToValidationErrors(formDataHelpers.getValidationMessages(this.state.form, 'gender'))} />
          </FormElement>
          <FormElement
            renderValidation="both"
            isValid={formDataHelpers.isValid(this.state.form, 'birthDate')}
          >
            <label>Birth Date</label>
            <DatePicker
              selectedDay={this.state.form.getIn(['birthDate', 'value'])}
              onClickDate={this.onClickDateBirthDate}
            />
            <FormValidationMessages messages={arrayToValidationErrors(formDataHelpers.getValidationMessages(this.state.form, 'birthDate'))} />
          </FormElement>
          <FormElement
            renderValidation="both"
            isValid={formDataHelpers.isValid(this.state.form, 'tags')}
          >
            <label>Tags</label>
            <ExtendText
              taggingEnabled={true}
              allowFreeForm={true}
              staticData={this.tagsStaticData}
              value={this.state.form.getIn(['tags', 'value'])}
              onChange={this.onChangeTags}
              onBlur={this.onBlurExtendTextEvent}
            />
            <FormValidationMessages messages={arrayToValidationErrors(formDataHelpers.getValidationMessages(this.state.form, 'tags'))} />
          </FormElement>
          <pre
              dangerouslySetInnerHTML={{
                  __html: JSON.stringify(formDataHelpers.asJson(this.state.form), null, '\t')
              }}
          />
          <Button
            data-form-name="form"
            onClick={this.onClickFormSubmit}
          >Submit</Button>
          <Button
            data-form-name="form"
            onClick={this.onClickFormReset}
          >Reset</Button>
        </div>
      </span>
    );
  }
});

var formsPage = {};

formsPage.displayName = 'ComplexExampleFormsPage';

formsPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Foundation', 'Colors');
};

formsPage.onClickDate = function(value) {
  this.form1.set('datePicker', value);

  this.setState({
    form1: this.form1.asImmutable()
  });
};

formsPage.onChangeExtendText = function(value) {
  this.form1.set('extendText', value);

  this.setState({
    form1: this.form1.asImmutable()
  });
};

formsPage.onChangeExtendTextTagging = function(value) {
  this.form1.set('extendTextTagging', value);

  this.setState({
    form1: this.form1.asImmutable()
  });
};

formsPage.render = function() {
  return (
    <div className="p-complex-forms">
      <div className="u-headline">Forms</div>
      <div>
        Forms can be one of the more complex user interactions to deal with in any web application and there are a number of components that are built to help with this. The form component built in this library are designed to not know how to handle the data or validation, all of that is just passed as props to the components. Handling of data and validation needs to be performed yourself with any custom or 3rd party solution (all examples here use this library: https://github.com/ryanzec/form-data-validation).
      </div>
      <div>
        <div className="u-title">Basic Form</div>
        <div>
          This forms show some pretty basic features on how to use the form elements.
        </div>
        <BasicForm />
      </div>
      <div>
        <div className="u-title">Basic Validation</div>
        <div>
          This forms show some pretty basic validation.
        </div>
        <BasicValidation />
      </div>
      <div>
        <div className="u-title">Grouped Validation Messages</div>
        <div>
          You are about to group validation messages from multiple input into one group.
        </div>
        <MultipleInputValidationGrouped />
      </div>
      <div>
        <div className="u-title">Instant Validation</div>
        <div>
          This is an examle of validation as you type.
        </div>
        <InstantValidation />
      </div>
      <div>
        <div className="u-title">Inputs In Inputs</div>
        <div>
          You can have input within inputs.  This also shows how to change form settings based on other form values.
        </div>
        <InputInInput />
      </div>
      <div>
        <div className="u-title">Toggle Validation</div>
        <div>
          show toggling of validation.
        </div>
        <ToggleValidation />
      </div>
      <div>
        <div className="u-title">Dynamic Inputs</div>
        <div>
          dynamically adding / remove inputs.
        </div>
        <DynamicInputs />
      </div>
      <div>
        <div className="u-title">All Input Types</div>
        <div>
          Just an example of all input types and all validation types to be used and a way to do manual regression testing on the form system.
        </div>
        <AllInputTypes />
      </div>
    </div>
  );
};

module.exports = React.createClass(formsPage);
