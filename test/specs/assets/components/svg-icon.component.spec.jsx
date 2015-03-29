var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var SvgIcon = require('../../../../assets/components/svg-icon.component.jsx');
var testHelper = require('../../../test-helper');
var iconData = require('nucleus-icons');

describe('svg icon component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should generate proper svg element', function() {
    this.component = React.render(<SvgIcon fragment="user" />, div);

    expect(this.component.getDOMNode().innerHTML).to.equal(iconData.small.user);
  });

  it('should be able to add custom css classes to the svg element', function() {
    this.component = React.render(<SvgIcon fragment="user" className="custom1 custom2" />, div);

    //TODO: research: not sure why this.component.props.className is not working here, maybe becuase the use of setting html manually?
    expect(this.component.getDOMNode().className).to.equal('svg-icon-container custom1 custom2');
  });
});
