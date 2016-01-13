var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var RadioInput = require('../../../../assets/components/radio-input.component.jsx');
var testHelper = require('../../../test-helper');
var _ = require('lodash');

var testData = {};

var validateTrue = function() {
  return true;
};

var validateFalse = function() {
  return false;
};

var getOptions = function() {
  return [{
    display: 'Option 1',
    value: 1
  }, {
    display: 'Option 2',
    value: 'two'
  }];
};

var getOptionsLeft = function() {
  return [{
    display: 'Option 1',
    value: 1,
    displayPosition: 'left'
  }, {
    display: 'Option 2',
    value: 'two',
    displayPosition: 'left'
  }];
};

var radioName = 'test';

describe('radio input component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  afterEach(function() {
    testHelper.unmountComponent(testData.component);
    testData.component = null;
  });

  describe('general', function() {
    it('should render', function() {
      testData.component = ReactDOM.render(<RadioInput name={radioName} options={getOptions()} />, div);
      var radioGroup = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__radio-group');
      var label = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'label');
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');
      var checkedRadio = ReactDOM.findDOMNode(testData.component).querySelectorAll('option:checked');

      expect(radioGroup.length).to.equal(1);
      expect(label.length).to.equal(2);
      expect(input.length).to.equal(2);
      expect(label[0].childNodes[2].textContent).to.equal('Option 1');
      expect(input[0].value).to.equal('1');
      expect(input[0].type).to.equal('radio');
      expect(input[0].className).to.equal('form-element__input m-radio m-right');
      expect(label[1].childNodes[2].textContent).to.equal('Option 2');
      expect(input[1].value).to.equal('two');
      expect(input[1].type).to.equal('radio');
      expect(input[1].type).to.equal('radio');
      expect(input[1].className).to.equal('form-element__input m-radio m-right');
      expect(checkedRadio.length).to.equal(0);
    });

    it('should be able to render content to the left of the input', function() {
      testData.component = ReactDOM.render(<RadioInput name={radioName} options={getOptionsLeft()} />, div);
      var label = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'label');
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');

      expect(label[0].childNodes[0].textContent).to.equal('Option 1');
      expect(input[0].className).to.contain('m-left');
      expect(label[1].childNodes[0].textContent).to.equal('Option 2');
      expect(input[1].className).to.contain('m-left');
    });

    it('should be able to set default value', function() {
      testData.component = ReactDOM.render(<RadioInput name={radioName} options={getOptionsLeft()} value="two" onChange={function(){}} />, div);
      var checkedRadio = ReactDOM.findDOMNode(testData.component).querySelectorAll('input:checked');

      expect(checkedRadio.length).to.equal(1);
      expect(checkedRadio[0].value).to.equal('two');
    });

    it('should be able to add custom classes', function() {
      testData.component = ReactDOM.render(<RadioInput name={radioName} options={getOptions()} className="m-safe" />, div);
      var mainComponent = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element__field-container');

      expect(mainComponent.className).to.contain('m-safe');
    });

    it('should pass through props to input', function() {
      testData.component = ReactDOM.render(<RadioInput name={radioName} options={getOptionsLeft()} data-test="test" />, div);
      var inputs = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');

      expect(inputs[0].getAttribute('data-test')).to.equal('test');
      expect(inputs[1].getAttribute('data-test')).to.equal('test');
    });
  });
});
