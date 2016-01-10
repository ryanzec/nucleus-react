//NOTE: there are some visual aspects to this component that can't be test with mocha/chai/jsdom
var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var InputAutoSizer = require('../../../../assets/components/input-auto-sizer.component.jsx');
var testHelper = require('../../../test-helper');

describe('input auto sizer component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  describe('text input', function() {
    it('should render', function() {
      this.component = ReactDOM.render(<InputAutoSizer />, div);
      var inputAutoSizer = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'input-auto-sizer');

      expect(inputAutoSizer.childNodes.length).to.equal(3);
      expect(inputAutoSizer.childNodes[0].tagName).to.equal('DIV');
      expect(inputAutoSizer.childNodes[1].tagName).to.equal('INPUT');
      expect(inputAutoSizer.childNodes[2].tagName).to.equal('DIV');
    });

    it('should be able to add custom class to input element', function() {
      this.component = ReactDOM.render(<InputAutoSizer inputClassName="m-safe" defaultValue="coverage" />, div);
      var inputAutoSizer = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'input-auto-sizer');

      expect(inputAutoSizer.childNodes[1].className).to.equal('form-element__input m-text m-safe');
    });

    it('should be able to add specify type', function() {
      this.component = ReactDOM.render(<InputAutoSizer type="password" inputClassName="m-safe" defaultValue="coverage" />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'input');

      expect(input.type).to.equal('password');
    });
  });
});
