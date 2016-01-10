var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var LoadingBar = require('../../../../assets/components/loading-bar.component.jsx');
var testHelper = require('../../../test-helper');

describe('loading bar component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = ReactDOM.render(<LoadingBar />, div);
    var loadingBar = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'loading-bar');

    expect(loadingBar.className).to.equal('loading-bar');
    expect(loadingBar.childNodes[0].className).to.equal('loading-bar__indicator');
    expect(loadingBar.childNodes[0].style.width).to.equal('0%');
  });

  it('should be able to add custom classes', function() {
    this.component = ReactDOM.render(<LoadingBar className="m-safe" />, div);
    var loadingBar = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'loading-bar');

    expect(loadingBar.className).to.equal('loading-bar m-safe');
  });

  it('should set width based on percentage', function() {
    this.component = ReactDOM.render(<LoadingBar percentageDone={50} />, div);
    var loadingBar = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'loading-bar');

    expect(loadingBar.childNodes[0].style.width).to.equal('50%');
  });
});
