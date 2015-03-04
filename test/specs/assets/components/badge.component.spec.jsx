var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var Badge = require('../../../../assets/components/badge.component.jsx');
var testHelper = require('../../../test-helper');

describe('badge component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should be able to render badge', function() {
    this.component = React.render(<Badge>badge</Badge>, div);
    var badge = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'badge');

    expect(badge.props.className).to.equal('badge');
    expect(badge.props.children).to.equal('badge');
  });

  it('should be able to add custom classes', function() {
    this.component = React.render(<Badge className="m-safe">badge</Badge>, div);
    var badge = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'badge');

    expect(badge.props.className).to.equal('badge m-safe');
  });
});
