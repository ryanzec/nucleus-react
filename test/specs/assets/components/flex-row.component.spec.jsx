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

  it('should be set items alignment', function() {
    this.component = React.render(<FlexRow alignItems="center">1</FlexRow>, div);

    expect(this.component.getDOMNode().className).to.equal('flex-row m-align-center');
  });
});
