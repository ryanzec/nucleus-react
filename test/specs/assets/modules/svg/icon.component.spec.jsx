var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var SvgIcon = require('../../../../../assets/modules/svg/icon.component.jsx');
var testHelper = require('../../../../test-helper');

describe('svg icon component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should support passing the svg path', function() {
    this.component = React.render(<SvgIcon svgPath="/path/to/file.svg" />, div);

    expect(this.component.getFullSvgPath()).to.equal('/path/to/file.svg');
  });

  it('should support passing the svg path with fragment with no size specified', function() {
    this.component = React.render(<SvgIcon svgPath="/path/to/file.svg" fragment="user" />, div);

    expect(this.component.getFullSvgPath()).to.equal('/path/to/file.svg#user-small');
  });

  it('should support passing the svg path with fragment with specific size', function() {
    this.component = React.render(<SvgIcon svgPath="/path/to/file.svg" fragment="user" size="large" />, div);
    var svg = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'svg');

    expect(this.component.getFullSvgPath()).to.equal('/path/to/file.svg#user-large');
    expect(svg.props.className).to.equal('svg-icon user-large icon-large');
  });

  it('should generate proper svg element', function() {
    this.component = React.render(<SvgIcon svgPath="/path/to/file.svg" fragment="user" />, div);
    var svg = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'svg');

    expect(svg.props.className).to.equal('svg-icon user-small icon-small');
    expect(svg.props.dangerouslySetInnerHTML).to.deep.equal({
      __html: '<use xlink:href="/path/to/file.svg#user-small" />'
    });
  });

  it('should be able to add custom css classes to the svg element', function() {
    this.component = React.render(<SvgIcon svgPath="/path/to/file.svg" fragment="user" className="custom1 custom2" />, div);
    var svg = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'svg');

    expect(svg.props.className).to.equal('svg-icon user-small icon-small custom1 custom2');
    expect(svg.props.dangerouslySetInnerHTML).to.deep.equal({
      __html: '<use xlink:href="/path/to/file.svg#user-small" />'
    });
  });
});
