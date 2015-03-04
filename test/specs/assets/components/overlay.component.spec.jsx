var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var Overlay = require('../../../../assets/components/overlay.component.jsx');
var testHelper = require('../../../test-helper');

describe('overlay component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = React.render(<Overlay />, div);
    var overlay = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'overlay');

    expect(overlay.props.className).to.equal('overlay u-hide');
  });

  it('should be able to position element absolute', function() {
    this.component = React.render(<Overlay absolutePositioned={true} />, div);
    var overlay = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'overlay');

    expect(overlay.props.className).to.equal('overlay m-absolute u-hide');
  });

  it('should be able to set active', function() {
    this.component = React.render(<Overlay isActive={true}/>, div);
    var overlay = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'overlay');

    expect(overlay.props.className).to.equal('overlay');
  });

  it('should be able to render top content to an overlay', function() {
    this.component = React.render(<Overlay topContent="top content" />, div);
    var overlayContent = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'overlay__content');

    expect(overlayContent.props.children).to.equal('top content');
  });
});
