var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var RadioInputGroup = require('../../../../assets/components/radio-input-group.component.jsx');
var RadioInput = require('../../../../assets/components/radio-input.component.jsx');
var testHelper = require('../../../test-helper');

describe('radio input group component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = ReactDOM.render(<RadioInputGroup><RadioInput name="one" radioValue="test" label="test" /><RadioInput name="two" radioValue="test" label="test" /></RadioInputGroup>, div);
    var radioInputGroup = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__radio-group');
    var radioInputGroupItems = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__radio-group-item');

    expect(radioInputGroup.length).to.equal(1);
    expect(radioInputGroupItems.length).to.equal(2);
    expect(ReactDOM.findDOMNode(radioInputGroupItems[0]).querySelectorAll('[name="one"]').length).to.equal(1);
    expect(ReactDOM.findDOMNode(radioInputGroupItems[1]).querySelectorAll('[name="two"]').length).to.equal(1);
  });

  it('should be able to add custom classes', function() {
    this.component = ReactDOM.render(<RadioInputGroup className="m-safe"><RadioInput name="one" radioValue="test" label="test" /><RadioInput name="two" radioValue="test" label="test" /></RadioInputGroup>, div);
    var radioInputGroup = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element__radio-group');

    expect(radioInputGroup.className).to.equal('form-element__radio-group m-safe');
  });
});
