var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var Button = require('../../../../assets/components/button.component.jsx');
var testHelper = require('../../../test-helper');

describe('button component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = ReactDOM.render(<Button>button</Button>, div);
    var button = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'button');

    expect(button.textContent).to.equal('button');
  });

  it('should be able to add custom classes', function() {
    this.component = ReactDOM.render(<Button className="m-safe">button</Button>, div);
    var button = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'button');

    expect(button.className).to.equal('m-safe');
  });
});
