var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var FormElementGroup = require('../../../../assets/components/form-element-group.component.jsx');
var TextboxInput = require('../../../../assets/components/textbox-input.component.jsx');
var testHelper = require('../../../test-helper');

describe('form element group component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = ReactDOM.render(<FormElementGroup><TextboxInput name="one" /><TextboxInput name="two" /></FormElementGroup>, div);
    var formElementGroup = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__group');
    var formElementGroupItems = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__group-item');

    expect(formElementGroup.length).to.equal(1);
    expect(formElementGroupItems.length).to.equal(2);
    expect(ReactDOM.findDOMNode(formElementGroupItems[0]).querySelectorAll('[name="one"]').length).to.equal(1);
    expect(ReactDOM.findDOMNode(formElementGroupItems[1]).querySelectorAll('[name="two"]').length).to.equal(1);
  });

  it('should be able to add custom classes', function() {
    this.component = ReactDOM.render(<FormElementGroup className="m-safe"><TextboxInput name="one" /><TextboxInput name="two" /></FormElementGroup>, div);
    var formElementGroup = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element__group');

    expect(formElementGroup.className).to.equal('form-element__group m-safe');
  });
});
