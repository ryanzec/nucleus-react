var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var SvgIcon = require('../../../../assets/components/svg-icon.component.jsx');
var testHelper = require('../../../test-helper');
var iconData = require('nucleus-icons');

var clickHandlerCalled = false;
var onClickHandler = function() {
  clickHandlerCalled = true;
};

describe('svg icon component', function() {
  var div;

  beforeEach(function() {
    clickHandlerCalled = false;
    div = document.createElement('div');
  });

  it('should generate proper svg element', function() {
    this.component = ReactDOM.render(<SvgIcon fragment="user" />, div);
    var container = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'svg-icon__container');
    var indicator = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'svg-icon__indicator');

    expect(ReactDOM.findDOMNode(container).innerHTML).to.equal(iconData.small.user);
    expect(indicator.length).to.equal(0);
  });

  it('should render indicator', function() {
    this.component = ReactDOM.render(<SvgIcon indicator="new" fragment="user" />, div);
    var indicator = ReactDOM.findDOMNode(this.component).querySelector('.svg-icon__indicator');

    expect(indicator.getAttribute('class')).to.equal('svg-icon__indicator m-new');
  });

  it('should be able to add custom css classes to the outer svg container element', function() {
    this.component = ReactDOM.render(<SvgIcon fragment="user" outerClassName="custom1 custom2" />, div);
    var outerContainer = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'svg-icon__outer-container');

    expect(ReactDOM.findDOMNode(outerContainer).className).to.equal('svg-icon__outer-container user-icon custom1 custom2');
  });

  it('should be able to add custom css classes to the inner svg container element', function() {
    this.component = ReactDOM.render(<SvgIcon fragment="user" className="custom1 custom2" />, div);
    var innerContainer = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'svg-icon__container');

    expect(ReactDOM.findDOMNode(innerContainer).className).to.equal('svg-icon__container user-icon custom1 custom2');
  });

  it('should be able to be clickable', function() {
    this.component = ReactDOM.render(<SvgIcon fragment="user" isClickable={true} onClick={onClickHandler} />, div);
    var outerContainer = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'svg-icon__outer-container');

    reactTestUtils.Simulate.click(outerContainer);

    expect(clickHandlerCalled).to.be.true;
  });

  it('should properly set pressed state to true on mouse down', function() {
    this.component = ReactDOM.render(<SvgIcon fragment="user" isClickable={true} onClick={onClickHandler} />, div);
    var outerContainer = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'svg-icon__outer-container');

    reactTestUtils.Simulate.mouseDown(outerContainer);

    expect(outerContainer.className).to.equal('svg-icon__outer-container user-icon has-clickability is-pressed');
    expect(this.component.state.isPressed).to.be.true;
  });

  it('should properly set pressed state to false on mouse up', function() {
    this.component = ReactDOM.render(<SvgIcon fragment="user" isClickable={true} onClick={onClickHandler} />, div);
    var outerContainer = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'svg-icon__outer-container');

    reactTestUtils.Simulate.mouseDown(outerContainer);
    reactTestUtils.Simulate.mouseUp(outerContainer);

    expect(outerContainer.className).to.equal('svg-icon__outer-container user-icon has-clickability');
    expect(this.component.state.isPressed).to.be.false;
  });

  it('should be able to configure it as a quiet clickable element', function() {
    this.component = ReactDOM.render(<SvgIcon fragment="user" isClickable={true} onClick={onClickHandler} isQuiet={true} />, div);
    var outerContainer = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'svg-icon__outer-container');

    reactTestUtils.Simulate.mouseDown(outerContainer);
    reactTestUtils.Simulate.mouseUp(outerContainer);

    expect(outerContainer.className).to.equal('svg-icon__outer-container user-icon has-clickability m-quiet');
    expect(this.component.state.isPressed).to.be.false;
  });

  //TODO: enable once https://github.com/facebook/react/pull/1366 is merged into a release (it is merge but not released)
  // it('should properly set pressed state to false on mouse leave', function() {
  //   this.component = ReactDOM.render(<SvgIcon fragment="user" isClickable={true} onClick={onClickHandler} />, div);
  //   var outerContainer = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'svg-icon__outer-container');

  //   reactTestUtils.Simulate.mouseDown(outerContainer);
  //   reactTestUtils.Simulate.mouseLeave(outerContainer);

  //   expect(outerContainer.className).to.equal('svg-icon__outer-container user-icon has-clickability');
  //   expect(this.component.state.isPressed).to.be.false;
  // });
});
