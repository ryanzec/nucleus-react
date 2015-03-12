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
    expect(cardContent.props.children).to.equal('content');
  });

  it('should be able to add custom classes', function() {
    this.component = React.render(<CardContent className="m-safe">content</CardContent>, div);
    var cardContent = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'card__content');

    expect(cardContent.props.className).to.equal('card__content m-safe');
  });
});
