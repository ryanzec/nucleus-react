var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var GlobalNotificationItem = require('../../../../assets/components/global-notification-item.component.jsx');
var testHelper = require('../../../test-helper');

describe('global notification component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should be able to render badge', function() {
    this.component = React.render(<GlobalNotificationItem>test</GlobalNotificationItem>, div);
    var badge = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'global-notification__item');

    expect(badge.props.className).to.equal('global-notification__item');
    expect(badge.props.children).to.equal('test');
  });

  it('should be able to add custom classes', function() {
    this.component = React.render(<GlobalNotificationItem className="m-safe">test</GlobalNotificationItem>, div);
    var badge = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'global-notification__item');

    expect(badge.props.className).to.contain('m-safe');
  });
});
