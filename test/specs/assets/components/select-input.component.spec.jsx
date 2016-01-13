var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var SelectInput = require('../../../../assets/components/select-input.component.jsx');
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

describe('select input component', function() {
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
      testData.component = ReactDOM.render(<SelectInput options={getOptions()} />, div);
      var fieldContainer = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__field-container');
      var select = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'select');
      var options = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'option');
      var selectedOption = ReactDOM.findDOMNode(testData.component).querySelectorAll('option:checked');

      expect(fieldContainer.length).to.equal(1);
      expect(select.length).to.equal(1);
      expect(options.length).to.equal(3);
      expect(options[0].textContent).to.equal('Select');
      expect(options[0].value).to.equal('');
      expect(options[1].textContent).to.equal('Option 1');
      expect(options[1].value).to.equal('1');
      expect(options[2].textContent).to.equal('Option 2');
      expect(options[2].value).to.equal('two');
      expect(selectedOption.length).to.equal(1);
      expect(selectedOption[0].value).to.equal('');
    });

    it('should be able to set default value', function() {
      testData.component = ReactDOM.render(<SelectInput options={getOptions()} value="two" onChange={function(){}} />, div);
      var selectedOption = ReactDOM.findDOMNode(testData.component).querySelectorAll('option:checked');

      expect(selectedOption.length).to.equal(1);
      expect(selectedOption[0].value).to.equal('two');
    });

    it('should be able to add custom classes', function() {
      testData.component = ReactDOM.render(<SelectInput options={getOptions()} className="m-safe" />, div);
      var mainComponent = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element__field-container');

      expect(mainComponent.className).to.contain('m-safe');
    });

    it('should be able to configure custom empty option text', function() {
      testData.component = ReactDOM.render(<SelectInput options={getOptions()} emptyOption="empty" />, div);
      var options = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'option');

      expect(options[0].textContent).to.equal('empty');
    });

    it('should be able to configure it to not have an empty option', function() {
      testData.component = ReactDOM.render(<SelectInput options={getOptions()} emptyOption={false} />, div);
      var options = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'option');

        expect(options.length).to.equal(2);
    });

    it('should pass through props to input', function() {
      testData.component = ReactDOM.render(<SelectInput data-test="test" />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'select');

      expect(input.getAttribute('data-test')).to.equal('test');
    });
  });
});
