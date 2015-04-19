var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var SvgIcon = require('../../../../assets/components/svg-icon.component.jsx');
var testHelper = require('../../../test-helper');
var iconData = require('nucleus-icons');

var clickHandlerCalled = false;
var onClickHandler = function() {
  clickHandlerCalled = true;
};

describe.only('svg icon component', function() {
  var div;

  beforeEach(function() {
    clickHandlerCalled = false;
    div = document.createElement('div');
  });

  it('should generate proper svg element', function() {
    this.component = React.render(<SvgIcon fragment="user" />, div);
    var innerContainer = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'svg-icon-container');

    expect(innerContainer.getDOMNode().innerHTML).to.equal(iconData.small.user);
  });

  it('should be able to add custom css classes to the inner svg container element', function() {
    this.component = React.render(<SvgIcon fragment="user" className="custom1 custom2" />, div);
    var innerContainer = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'svg-icon-container');

    expect(innerContainer.getDOMNode().className).to.equal('svg-icon-container custom1 custom2');
  });

  it('should be able to be clickable', function() {
    this.component = React.render(<SvgIcon fragment="user" isClickable={true} onClick={onClickHandler} />, div);
    var outerContainer = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'svg-icon-outer-container');

    reactTestUtils.Simulate.click(outerContainer);

    expect(clickHandlerCalled).to.be.true;
  });

  it('should properly set pressed state to true on mouse down', function() {
    this.component = React.render(<SvgIcon fragment="user" isClickable={true} onClick={onClickHandler} />, div);
    var outerContainer = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'svg-icon-outer-container');

    reactTestUtils.Simulate.mouseDown(outerContainer);

    expect(outerContainer.props.className).to.equal('svg-icon-outer-container has-clickability is-pressed');
    expect(this.component.state.isPressed).to.be.true;
  });

  it('should properly set pressed state to false on mouse up', function() {
    this.component = React.render(<SvgIcon fragment="user" isClickable={true} onClick={onClickHandler} />, div);
    var outerContainer = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'svg-icon-outer-container');

    reactTestUtils.Simulate.mouseDown(outerContainer);
    reactTestUtils.Simulate.mouseUp(outerContainer);

    expect(outerContainer.props.className).to.equal('svg-icon-outer-container has-clickability');
    expect(this.component.state.isPressed).to.be.false;
  });

  it('should be able to configure it as a quiet clickable element', function() {
    this.component = React.render(<SvgIcon fragment="user" isClickable={true} onClick={onClickHandler} isQuiet={true} />, div);
    var outerContainer = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'svg-icon-outer-container');

    reactTestUtils.Simulate.mouseDown(outerContainer);
    reactTestUtils.Simulate.mouseUp(outerContainer);

    expect(outerContainer.props.className).to.equal('svg-icon-outer-container has-clickability m-quiet');
    expect(this.component.state.isPressed).to.be.false;
  });

  //TODO: enable once https://github.com/facebook/react/pull/1366 is merged into a release (it is merge but not released)
  // it('should properly set pressed state to false on mouse leave', function() {
  //   this.component = React.render(<SvgIcon fragment="user" isClickable={true} onClick={onClickHandler} />, div);
  //   var outerContainer = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'svg-icon-outer-container');

  //   reactTestUtils.Simulate.mouseDown(outerContainer);
  //   reactTestUtils.Simulate.mouseLeave(outerContainer);

  //   expect(outerContainer.props.className).to.equal('svg-icon-outer-container has-clickability');
  //   expect(this.component.state.isPressed).to.be.false;
  // });
});
