var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var Card = require('../../../../assets/components/card.component.jsx');
var testHelper = require('../../../test-helper');

var clickHandlerCalled = false;
var onClickHandler = function() {
  clickHandlerCalled = true;
};

describe('card component', function() {
  var div;

  beforeEach(function() {
    clickHandlerCalled = false;
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

  it('should be able to be clickable', function() {
    this.component = React.render(<Card isClickable={true} onClick={onClickHandler}>card</Card>, div);
    var card = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'card');

    reactTestUtils.Simulate.click(card);

    expect(clickHandlerCalled).to.be.true;
  });

  it('should properly set pressed state to true on mouse down', function() {
    this.component = React.render(<Card isClickable={true} onClick={onClickHandler}>card</Card>, div);
    var card = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'card');

    reactTestUtils.Simulate.mouseDown(card);

    expect(card.props.className).to.equal('card has-clickability is-pressed');
    expect(this.component.state.isPressed).to.be.true;
  });

  it('should properly set pressed state to false on mouse up', function() {
    this.component = React.render(<Card isClickable={true} onClick={onClickHandler}>card</Card>, div);
    var card = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'card');

    reactTestUtils.Simulate.mouseDown(card);
    reactTestUtils.Simulate.mouseUp(card);

    expect(card.props.className).to.equal('card has-clickability');
    expect(this.component.state.isPressed).to.be.false;
  });

  //TODO: enable once https://github.com/facebook/react/pull/1366 is merged into a release (it is merge but not released)
  // it('should properly set pressed state to false on mouse leave', function() {
  //   this.component = React.render(<Card isClickable={true} onClick={onClickHandler}>card</Card>, div);
  //   var card = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'card');

  //   reactTestUtils.Simulate.mouseDown(card);
  //   reactTestUtils.Simulate.mouseLeave(card);

  //   expect(card.props.className).to.equal('card has-clickability');
  //   expect(this.component.state.isPressed).to.be.false;
  // });
});
