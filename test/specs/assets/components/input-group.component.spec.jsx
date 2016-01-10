var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var InputGroup = require('../../../../assets/components/input-group.component.jsx');
var TextboxInput = require('../../../../assets/components/textbox-input.component.jsx');
var testHelper = require('../../../test-helper');

describe('input group component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = ReactDOM.render(<InputGroup><TextboxInput name="one" /><TextboxInput name="two" /></InputGroup>, div);
    var inputGroup = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__input-group');
    var inputGroupItems = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__input-group-item');

    expect(inputGroup.length).to.equal(1);
    expect(inputGroupItems.length).to.equal(2);
    expect(ReactDOM.findDOMNode(inputGroupItems[0]).querySelectorAll('[name="one"]').length).to.equal(1);
    expect(ReactDOM.findDOMNode(inputGroupItems[1]).querySelectorAll('[name="two"]').length).to.equal(1);
  });

  it('should be able to add custom classes', function() {
    this.component = ReactDOM.render(<InputGroup className="m-safe"><TextboxInput name="one" /><TextboxInput name="two" /></InputGroup>, div);
    var inputGroup = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element__input-group');

    expect(inputGroup.className).to.equal('form-element__input-group m-safe');
  });
});
