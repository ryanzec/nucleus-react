var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var CardContent = require('../../../../assets/components/card-content.component.jsx');
var testHelper = require('../../../test-helper');

describe('card content component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = React.render(<CardContent>content</CardContent>, div);
    var cardContent = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'card__content');

    expect(cardContent.props.className).to.equal('card__content');
    expect(cardContent.props.children[1]).to.equal('content');
  });

  it('should be able to render arrow', function() {
    this.component = React.render(<CardContent renderArrow={true}>content</CardContent>, div);
    var cardContent = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'card__content');
    var cardContentArrow = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'card__content-arrow');

    expect(cardContent.props.className).to.equal('card__content');
    expect(cardContent.props.children[1]).to.equal('content');
    expect(cardContentArrow.length).to.equal(1);
    expect(cardContentArrow[0].props.className).to.equal('card__content-arrow');
  });

  it('should be able to add custom classes', function() {
    this.component = React.render(<CardContent className="m-safe">content</CardContent>, div);
    var cardContent = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'card__content');

    expect(cardContent.props.className).to.equal('card__content m-safe');
  });
});
