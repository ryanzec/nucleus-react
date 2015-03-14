var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var Button = require('../../../../assets/components/Button.component.jsx');
var testHelper = require('../../../test-helper');

describe('button component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = React.render(<Button>button</Button>, div);
    var button = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'button');

    expect(button.props.children).to.equal('button');
  });

  it('should be able to add custom classes', function() {
    this.component = React.render(<Button className="m-safe">button</Button>, div);
    var button = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'button');

    expect(button.props.className).to.equal('m-safe');
  });
});
