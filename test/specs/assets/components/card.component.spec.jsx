var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var Card = require('../../../../assets/components/card.component.jsx');
var testHelper = require('../../../test-helper');

describe('card component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = React.render(<Card>card</Card>, div);
    var card = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'card');

    expect(card.props.className).to.equal('card');
    expect(card.props.children).to.equal('card');
  });

  it('should be able to add custom classes', function() {
    this.component = React.render(<Card className="m-safe">card</Card>, div);
    var card = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'card');

    expect(card.props.className).to.equal('card m-safe');
  });
});
