var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var FlexRow = require('../../../../assets/components/flex-row.component.jsx');
var testHelper = require('../../../test-helper');

describe('flex row component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = React.render(<FlexRow>1</FlexRow>, div);

    expect(this.component.getDOMNode().className).to.equal('flex-row');
    expect(this.component.props.children).to.equal('1');
  });

  it('should be set column alignment vertically', function() {
    this.component = React.render(<FlexRow verticalAlign="center">1</FlexRow>, div);

    expect(this.component.getDOMNode().className).to.equal('flex-row m-vertical-align-center');
  });

  it('should be set column alignment horizontally', function() {
    this.component = React.render(<FlexRow horizontalAlign="center">1</FlexRow>, div);

    expect(this.component.getDOMNode().className).to.equal('flex-row m-horizontal-align-center');
  });

  it('should be able to add css classes', function() {
    this.component = React.render(<FlexRow className="m-safe">1</FlexRow>, div);

    expect(this.component.getDOMNode().className).to.equal('flex-row m-safe');
  });

  it('should be able to set if it has margin on the sides', function() {
    this.component = React.render(<FlexRow hasMargin={true}>1</FlexRow>, div);

    expect(this.component.getDOMNode().className).to.equal('flex-row m-has-margin');
  });
});
