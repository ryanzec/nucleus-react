var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var CheckboxInput = require('../../../../assets/components/checkbox-input.component.jsx');
var testHelper = require('../../../test-helper');
var _ = require('lodash');

var testData = {};

describe('checkbox input component', function() {
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
      testData.component = ReactDOM.render(<CheckboxInput />, div);
      var label = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'label');
      var fieldContainer = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__field-container');
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');

      expect(fieldContainer.length).to.equal(1);
      expect(label.length).to.equal(1);
      expect(label[0].childNodes.length).to.equal(2);
      expect(label[0].childNodes[2]).to.be.undefined;
      expect(input.length).to.equal(1);
      expect(ReactDOM.findDOMNode(input[0]).checked).to.be.false;
      expect(input[0].className).to.equal('form-element__input m-checkbox m-right');
      expect(input[0].type).to.equal('checkbox');
    });

    it('should be able to set default value', function() {
      testData.component = ReactDOM.render(<CheckboxInput value={true} onChange={function(){}} />, div);
      var input = ReactDOM.findDOMNode(testData.component).querySelectorAll('input:checked');

      expect(input.length).to.equal(1);
    });

    it('should be able to render content to the left', function() {
      testData.component = ReactDOM.render(<CheckboxInput label="Left" displayPosition="left" />, div);
      var label = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'label');
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');

      expect(label[0].childNodes[0].textContent).to.equal('Left');
      expect(input[0].className).to.contain('m-left');
    });

    it('should be able to add custom classes', function() {
      testData.component = ReactDOM.render(<CheckboxInput className="m-safe" />, div);
      var mainComponent = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element__field-container');

      expect(mainComponent.className).to.contain('m-safe');
    });

    it('should pass through props to input', function() {
      testData.component = ReactDOM.render(<CheckboxInput data-test="test" />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      expect(input.getAttribute('data-test')).to.equal('test');
    });
  });
});
