var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var BadgeGroup = require('../../../../assets/components/badge-group.component.jsx');
var testHelper = require('../../../test-helper');

describe('badge group component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = React.render(<BadgeGroup></BadgeGroup>, div);
    var element = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'badge-group');

    expect(element.props.className).to.equal('badge-group');
  });

  it('should be able to add custom classes', function() {
    this.component = React.render(<BadgeGroup className="m-safe">badge</BadgeGroup>, div);
    var element = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'badge-group');

    expect(element.props.className).to.contain('m-safe');
  });
});
