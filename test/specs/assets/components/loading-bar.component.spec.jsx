var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var LoadingBar = require('../../../../assets/components/loading-bar.component.jsx');
var testHelper = require('../../../test-helper');

describe('loading bar component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = React.render(<LoadingBar />, div);
    var loadingBar = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'loading-bar');

    expect(loadingBar.props.className).to.equal('loading-bar');
    expect(loadingBar.props.children.props.className).to.equal('loading-bar__indicator');
    expect(loadingBar.props.children.props.style.width).to.equal('0%');
  });

  it('should be able to add custom classes', function() {
    this.component = React.render(<LoadingBar className="m-safe" />, div);
    var loadingBar = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'loading-bar');

    expect(loadingBar.props.className).to.equal('loading-bar m-safe');
  });

  it('should set width based on percentage', function() {
    this.component = React.render(<LoadingBar percentageDone={50} />, div);
    var loadingBar = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'loading-bar');

    expect(loadingBar.props.children.props.style.width).to.equal('50%');
  });
});
