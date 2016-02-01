var React = require('react');
var commonReact = require('../../../../assets/index');
var applicationReact = require('../../react/index');
var fs = require('fs');
var formDataValidation = require('form-data-validation');
var formDataHelpers = formDataValidation.helpers;
var inputHelper = commonReact.helpers.input;

var domEventManagerMixin = commonReact.mixins.domEventManager;

var menuStore = require('../../stores/menu.store');

var ConfirmationModal = commonReact.components.ConfirmationModal;
var FormElement = commonReact.components.FormElement;
var Modal = commonReact.components.Modal;
var TextboxInput = commonReact.components.TextboxInput;

var onChangeInputEventHandler = function(options) {
  var markAsDirty = options.markAsDirty === true;
  var newFormData = formDataHelpers.set(this.state[options.formName], options.fieldName, options.value, markAsDirty);
  var validateParameters = [newFormData, options.fieldName];

  if (options.validateWith) {
    var validatWithKeys = Object.keys(options.validateWith);

    validatWithKeys.forEach(function(validateWithKey) {
      if (options.fieldName === validateWithKey) {
        options.validateWith[validateWithKey].forEach(function(fieldName) {
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
  var validateParameters = [this.state[options.formName], options.fieldName];

  if (options.validateWith) {
    var validateWithKeys = Object.keys(options.validateWith);

    validateWithKeys.forEach(function(validateWithKey) {
      if (options.fieldName === validateWithKey) {
        options.validateWith[validateWithKey].forEach(function(fieldName) {
          if (
            formDataHelpers.isDirty(this.state[options.formName], fieldName) === true
            || formDataHelpers.isValid(this.state[options.formName], fieldName) !== null
          ) {
            validateParameters.push(fieldName);
          }
        }.bind(this));
      }
    }.bind(this));
  }

  var newFormData = formDataHelpers.validate.apply(null, validateParameters);
  return formDataHelpers.markFieldAsDirty(newFormData, options.fieldName);
};

var ModalExample = React.createClass({
  mixins: [
    domEventManagerMixin
  ],

  componentDidMount: function() {
    this.addDomEvent(document, 'keyup', this._closeModalOnEscape);
  },

  getInitialState: function() {
    return {
      isModalActive: false,
      lines: 0,
      test: {},
      initialTest: {},
      form: formDataValidation.formDataFactory({
        fields: {
          test: {}
        }
      })
    }
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

  showModal: function() {
    this.setState({
      isModalActive: true
    });
  },

  hideModal: function() {
    this.setState({
      isModalActive: false
    });
  },

  _closeModalOnEscape: function() {
    if(event.which === 27) {
      this.hideModal();
    }
  },

  increaseLineCount: function() {
    this.setState({
      lines: this.state.lines + 3
    });
  },

  handleFormChange: function(event) {
    this.setState({test: event.target.value});
  },

  setRandomFormValue: function() {
    this.setState({
      form: this.state.form.setIn(['test', 'value'], Math.random().toString(36).replace(/[^a-z]+/g, ''))
    });
  },

  renderModalContent: function() {
    var lines = [];

    for(var x = 0; x < this.state.lines; x += 1) {
      lines.push(
        <p key={x}>line {x}</p>
      );
    }

    return (
      <div>
        <p><a onClick={this.hideModal}>close me (press escape key will close too)</a></p>
        <p><a onClick={this.increaseLineCount}>add 3 lines</a></p>
        This is the modal window content and making it extra long to testing purposes.<br />
        <FormElement>
          <label>test</label>
          <TextboxInput
            data-form-name="form"
            data-form-field="test"
            value={this.state.form.getIn(['test', 'value'])}
            onChange={this.onChangeInputEvent}
            onBlur={this.onBlurInputEvent}
          />
        </FormElement>
        {lines}
      </div>
    );
  },

  render: function() {
    return (
      <span>
        <p>test value from modal: {this.state.form.getIn(['test', 'value'])}</p>
        <button onClick={this.setRandomFormValue}>set randon form value</button><br />
        <a onClick={this.showModal}>Toggle Modal</a>
        <Modal
          isActive={this.state.isModalActive}>
          {this.renderModalContent()}
        </Modal>
      </span>
    );
  }
});

var ConfirmationModalExample = React.createClass({
  mixins: [
    domEventManagerMixin
  ],

  componentDidMount: function() {
    this.addDomEvent(document, 'keyup', this._closeModalOnEscape);
  },

  getInitialState: function() {
    return {
      isModalActive: false,
      confirmed: 'false'
    }
  },

  showModal: function() {
    this.setState({
      isModalActive: true
    });
  },

  hideModal: function() {
    this.setState({
      isModalActive: false
    });
  },

  _closeModalOnEscape: function() {
    console.log('escape');
    if(event.which === 27) {
      this.hideModal();
    }
  },

  onConfirm: function() {
    this.setState({
      isModalActive: false,
      confirmed: 'true'
    });
  },

  onDecline: function() {
    this.setState({
      isModalActive: false,
      confirmed: 'false'
    });
  },

  render: function() {
    return (
      <span>
        <div>
          Confirmed: {this.state.confirmed}
        </div>
        <a onClick={this.showModal}>Toggle Modal</a>
        <ConfirmationModal
          isActive={this.state.isModalActive}
          onConfirm={this.onConfirm}
          onDecline={this.onDecline}
        >
          <div>
            You are should you want to do this?
          </div>
        </ConfirmationModal>
      </span>
    );
  }
});


var modalPage = {};

modalPage.displayName = 'ComponentsModalPage';

modalPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Loading Bar');
};

modalPage.render = function() {
  return (
    <div className="p-components-modal">
      <div>
        modal page
      </div>
      <ModalExample />
      <hr />
      <ConfirmationModalExample />
      <div>NOTE: it is recommended to add the following styles to the html tag in order to prevent some mobile styling issues when using form fields in the modal window:
        <ul>
          <li>overflow: hidden;</li>
          <li>margin: 0;</li>
          <li>height: 100%;</li>
        </ul>
      </div>
    </div>
  );
};

module.exports = React.createClass(modalPage);
