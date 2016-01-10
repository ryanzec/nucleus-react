var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var CardHeader = require('../../../../assets/components/card-header.component.jsx');
var testHelper = require('../../../test-helper');

describe('card header component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = ReactDOM.render(<CardHeader renderArrow={false}>header</CardHeader>, div);
    var cardHeader = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'card__header');
    var cardHeaderArrow = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'card__header-arrow');

    expect(cardHeader.className).to.equal('card__header');
    expect(cardHeader.childNodes[0].textContent).to.equal('header');
    expect(cardHeaderArrow.length).to.equal(0);
  });

  it('should be able to render arrow', function() {
    this.component = ReactDOM.render(<CardHeader renderArrow={true}>header</CardHeader>, div);
    var cardHeader = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'card__header');
    var cardHeaderArrow = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'card__header-arrow');

    expect(cardHeader.className).to.equal('card__header');
    expect(cardHeader.childNodes[0].textContent).to.equal('header');
    expect(cardHeaderArrow.length).to.equal(1);
    expect(cardHeaderArrow[0].className).to.equal('card__header-arrow m-bottom');
  });

  it('should be able to render arrow on the top', function() {
    this.component = ReactDOM.render(<CardHeader renderArrow={true} arrowPosition="top">header</CardHeader>, div);
    var cardHeaderArrow = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'card__header-arrow');

    expect(cardHeaderArrow[0].className).to.equal('card__header-arrow m-top');
  });

  it('should be able to add custom classes', function() {
    this.component = ReactDOM.render(<CardHeader className="m-safe">header</CardHeader>, div);
    var cardHeader = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'card__header');

    expect(cardHeader.className).to.equal('card__header m-safe');
  });
});
