var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var RadioInput = require('../../../../assets/components/radio-input.component.jsx');
var testHelper = require('../../../test-helper');
var _ = require('lodash');

var testData = {};

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
      testData.component = ReactDOM.render(<RadioInput name={radioName} radioValue={1} label="Option 1" />, div);
      var label = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'label');
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      expect(label.textContent).to.equal('Option 1');
      expect(input.value).to.equal('1');
      expect(input.className).to.equal('form-element__input m-radio m-right');
      expect(input.type).to.equal('radio');
    });

    it('should be able to render content to the left of the input', function() {
      testData.component = ReactDOM.render(<RadioInput name={radioName} radioValue={1} label="Option 1" labelPosition="left" />, div);
      var label = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'label');
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      expect(label.childNodes[0].textContent).to.equal('Option 1');
      expect(input.className).to.contain('m-left');
    });

    it('should be able to set default value', function() {
      testData.component = ReactDOM.render(<RadioInput name={radioName} radioValue="two" label="Option 2" value="two" onChange={function(){}} />, div);
      var checkedRadio = ReactDOM.findDOMNode(testData.component).querySelector('input:checked');

      expect(checkedRadio.value).to.equal('two');
    });

    it('should be able to add custom classes', function() {
      testData.component = ReactDOM.render(<RadioInput name={radioName} radioValue="two" label="Option 2" className="m-safe" />, div);
      var mainComponent = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element__field-container');

      expect(mainComponent.className).to.contain('m-safe');
    });

    it('should pass through props to input', function() {
      testData.component = ReactDOM.render(<RadioInput name={radioName} radioValue={1} label="Option 1" data-test="test" />, div);
      var inputs = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      expect(inputs.getAttribute('data-test')).to.equal('test');
    });
  });
});
