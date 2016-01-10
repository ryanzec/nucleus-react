var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var CardContent = require('../../../../assets/components/card-content.component.jsx');
var testHelper = require('../../../test-helper');

describe('card content component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = ReactDOM.render(<CardContent>content</CardContent>, div);
    var cardContent = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'card__content');
    var cardContentArrow = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'card__content-arrow');

    expect(cardContentArrow.length).to.equal(0);
    expect(cardContent.className).to.equal('card__content');
    expect(cardContent.childNodes[0].textContent).to.equal('content');
  });

  it('should be able to render arrow', function() {
    this.component = ReactDOM.render(<CardContent renderArrow={true}>content</CardContent>, div);
    var cardContent = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'card__content');
    var cardContentArrow = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'card__content-arrow');

    expect(cardContent.className).to.equal('card__content');
    expect(cardContent.childNodes[1].textContent).to.equal('content');
    expect(cardContentArrow.length).to.equal(1);
    expect(cardContentArrow[0].className).to.equal('card__content-arrow');
  });

  it('should be able to add custom classes', function() {
    this.component = ReactDOM.render(<CardContent className="m-safe">content</CardContent>, div);
    var cardContent = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'card__content');

    expect(cardContent.className).to.equal('card__content m-safe');
  });
});
