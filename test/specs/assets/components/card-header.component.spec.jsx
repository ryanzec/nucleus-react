var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var CardHeader = require('../../../../assets/components/card-header.component.jsx');
var testHelper = require('../../../test-helper');

describe('card header component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = React.render(<CardHeader renderArrow={false}>header</CardHeader>, div);
    var cardHeader = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'card__header');
    var cardHeaderArrow = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'card__header-arrow');

    expect(cardHeader.props.className).to.equal('card__header');
    expect(cardHeader.props.children[0]).to.equal('header');
    expect(cardHeaderArrow.length).to.equal(0);
  });

  it('should render arrow', function() {
    this.component = React.render(<CardHeader renderArrow={true}>header</CardHeader>, div);
    var cardHeader = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'card__header');
    var cardHeaderArrow = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'card__header-arrow');

    expect(cardHeader.props.className).to.equal('card__header');
    expect(cardHeader.props.children[0]).to.equal('header');
    expect(cardHeaderArrow.length).to.equal(1);
  });

  it('should be able to add custom classes', function() {
    this.component = React.render(<CardHeader className="m-safe">header</CardHeader>, div);
    var cardHeader = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'card__header');

    expect(cardHeader.props.className).to.equal('card__header m-safe');
  });
});
