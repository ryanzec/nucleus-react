var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var TextboxInput = require('../../../../assets/components/textbox-input.component.jsx');
var InputAutoSizer = require('../../../../assets/components/input-auto-sizer.component.jsx');
var Button = require('../../../../assets/components/button.component.jsx');
var testHelper = require('../../../test-helper');
var _ = require('lodash');

var testData = {};

var validateTrue = function() {
  return true;
};

var validateFalse = function() {
  return false;
};

describe('textbox input component', function() {
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
      testData.component = ReactDOM.render(<TextboxInput />, div);
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');
      var fieldContainer = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__field-container');
      var textarea = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'textarea');
      var prepend = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__input-prepend');
      var append = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__input-append');

      expect(fieldContainer.length).to.equal(1);
      expect(input.length).to.equal(1);
      expect(textarea.length).to.equal(0);
      expect(prepend.length).to.equal(0);
      expect(append.length).to.equal(0);
      expect(input[0].type).to.equal('text');
      expect(ReactDOM.findDOMNode(input[0]).value).to.equal('');
    });

    it('should render textarea', function() {
      testData.component = ReactDOM.render(<TextboxInput multiLined={true} />, div);
      var mainComponent = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__field-container');
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');
      var label = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'label');
      var fieldContainer = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__field-container');
      var textarea = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'textarea');

      expect(mainComponent.length).to.equal(1);
      expect(fieldContainer.length).to.equal(1);
      expect(input.length).to.equal(0);
      expect(label.length).to.equal(0);
      expect(textarea.length).to.equal(1);
    });

    it('should be able to specify the type', function() {
      testData.component = ReactDOM.render(<TextboxInput type="password" />, div);
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');

      expect(input[0].type).to.equal('password');
    });

    it('should render prepend', function() {
      testData.component = ReactDOM.render(<TextboxInput prependNode="pre" />, div);
      var prepend = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__input-prepend');

      expect(prepend.length).to.equal(1);
      expect(prepend[0].textContent).to.equal('pre');
    });

    it('should render append', function() {
      testData.component = ReactDOM.render(<TextboxInput appendNode="app" />, div);
      var append = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__input-append');

      expect(append.length).to.equal(1);
      expect(append[0].textContent).to.equal('app');
    });

    it('should be able to set default value', function() {
      testData.component = ReactDOM.render(<TextboxInput value="default" onChange={function(){}} />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      expect(ReactDOM.findDOMNode(input).value).to.equal('default');
    });

    it('should be able to set place holder', function() {
      testData.component = ReactDOM.render(<TextboxInput placeholder="Placeholder" />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      expect(input.getAttribute('placeholder')).to.equal('Placeholder');
    });

    it('should be able to add custom classes', function() {
      testData.component = ReactDOM.render(<TextboxInput className="m-safe" />, div);
      var mainComponent = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element__field-container');

      expect(mainComponent.className).to.contain('m-safe');
    });

    it('should be able to click trigger click event when clicking on prepend element', function() {
      var spy = testHelper.getSpyForEventHandler(TextboxInput, 'onClickPend');
      testData.component = ReactDOM.render(<TextboxInput prependNode="pre" />, div);
      var prepend = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element__input-prepend');

      reactTestUtils.Simulate.click(prepend);

      expect(spy).to.have.callCount(1);

      testHelper.restoreEventHandler(TextboxInput, 'onClickPend');
    });

    it('should be able to click trigger click event when clicking on append element', function() {
      var spy = testHelper.getSpyForEventHandler(TextboxInput, 'onClickPend');
      testData.component = ReactDOM.render(<TextboxInput appendNode="app" />, div);
      var append = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element__input-append');

      reactTestUtils.Simulate.click(append);

      expect(spy).to.have.callCount(1);

      testHelper.restoreEventHandler(TextboxInput, 'onClickPend');
    });

    it('should work with input auto resizer element', function() {
      testData.component = ReactDOM.render(<TextboxInput appendNode="app" autoSize={true}/>, div);
      var inputAutoSizer = reactTestUtils.scryRenderedComponentsWithType(testData.component, InputAutoSizer);

      expect(inputAutoSizer.length).to.equal(1);
    });

    it('should pass through props to input', function() {
      testData.component = ReactDOM.render(<TextboxInput data-test="test" />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      expect(input.getAttribute('data-test')).to.equal('test');
    });
  });
});
