var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var TextboxInput = require('../../../../assets/components/textbox-input.component.jsx');
var CheckboxInput = require('../../../../assets/components/checkbox-input.component.jsx');
var RadioInput = require('../../../../assets/components/radio-input.component.jsx');
var SelectInput = require('../../../../assets/components/select-input.component.jsx');
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

describe('form input mixin', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  afterEach(function() {
    testHelper.unmountComponent(testData.component);
    testData.component = null;
  });

  describe('general', function() {
    it('should not show validation on initial load by default', function() {
      testData.component = React.render(<TextboxInput renderValidation="both" validate={validateTrue}  />, div);
      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element');
      expect(validationIcon.length).to.equal(0);
    });

    it('should run and be able to show validation on initial load', function() {
      testData.component = React.render(<TextboxInput renderValidation="both" renderValidationOnLoad={true} validate={validateFalse} />, div);
      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-invalid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.x);
    });

    it('should show valid validation', function() {
      testData.component = React.render(<TextboxInput renderValidation="both" validate={validateTrue} />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-valid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.checkmark);
    });

    it('should not show valid validation if configued for invalid only', function() {
      testData.component = React.render(<TextboxInput renderValidation="invalid" validate={validateTrue} />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element');
      expect(validationIcon.length).to.equal(0);
    });

    it('should show invalid validation', function() {
      testData.component = React.render(<TextboxInput renderValidation="both" validate={validateFalse} />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-invalid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.x);
    });

    it('should not show invalid validation if configured for valid only', function() {
      testData.component = React.render(<TextboxInput renderValidation="valid" validate={validateFalse} />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element');
      expect(validationIcon.length).to.equal(0);
    });

    it('should be able to set multiple validations', function() {
      testData.component = React.render(<TextboxInput renderValidation="both" renderValidationOnLoad={true} validate={[{validator: validateTrue}, {validator: validateFalse}]} />, div);
      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-invalid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.x);
    });

    it('should be able to set validation error messages', function() {
      testData.component = React.render(<TextboxInput renderValidation="both" renderValidationOnLoad={true} validate={[{validator: validateTrue}, {message: 'Sorry, never will be true', validator: validateFalse}]} />, div);
      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');

      expect(testData.component.state.validationErrors).to.deep.equal([
        'Sorry, never will be true'
      ]);
    });

    it('should be able to set validation error messages with current value embedded', function() {
      testData.component = React.render(<TextboxInput renderValidation="both" renderValidationOnLoad={true} validate={[{validator: validateTrue}, {message: '"%%value%%" - Sorry, never will be true', validator: validateFalse}]} />, div);
      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      expect(testData.component.state.validationErrors).to.deep.equal([
        '"" - Sorry, never will be true'
      ]);

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      expect(testData.component.state.validationErrors).to.deep.equal([
        '"test" - Sorry, never will be true'
      ]);
    });
  });

  describe('radio', function() {
    it('should show valid validation', function() {
      testData.component = React.render(<TextboxInput renderValidation="both" validate={validateTrue} />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-valid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.checkmark);
    });

    it('should show invalid validation', function() {
      testData.component = React.render(<TextboxInput renderValidation="both" validate={validateFalse} />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-invalid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.x);
    });
  });

  describe('checkbox', function() {
    it('should show valid validation', function() {
      testData.component = React.render(<CheckboxInput options={[{display: 'test', value: 'test'}]} renderValidation="both" validate={validateTrue} />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-valid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.checkmark);
    });

    it('should show invalid validation', function() {
      testData.component = React.render(<CheckboxInput options={[{display: 'test', value: 'test'}]} renderValidation="both" validate={validateFalse} />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-invalid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.x);
    });
  });

  describe('radio', function() {
    it('should show valid validation', function() {
      testData.component = React.render(<RadioInput options={[{display: 'test', value: 'test'}]} renderValidation="both" validate={validateTrue} />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-valid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.checkmark);
    });

    it('should show invalid validation', function() {
      testData.component = React.render(<RadioInput options={[{display: 'test', value: 'test'}]} renderValidation="both" validate={validateFalse} />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-invalid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.x);
    });
  });

  describe('select', function() {
    it('should show valid validation', function() {
      testData.component = React.render(<SelectInput options={[{display: 'test', value: 'test'}]} renderValidation="both" validate={validateTrue} />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'select');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-valid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.checkmark);
    });

    it('should show invalid validation', function() {
      testData.component = React.render(<SelectInput options={[{display: 'test', value: 'test'}]} renderValidation="both" validate={validateFalse} />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'select');

      reactTestUtils.Simulate.change(input, {
        target: {
          value: 'test'
        }
      });

      var formElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element');
      var validationIcon = testData.component.getDOMNode().querySelectorAll('.form-element__validation-icon');

      expect(formElement.props.className).to.equal('form-element m-invalid');
      expect(validationIcon.length).to.equal(1);
      expect(validationIcon[0].innerHTML).to.equal(iconData.small.x);
    });
  });


});
