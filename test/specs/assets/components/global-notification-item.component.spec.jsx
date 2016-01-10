var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var GlobalNotificationItem = require('../../../../assets/components/global-notification-item.component.jsx');
var testHelper = require('../../../test-helper');

describe('global notification item component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should be able to render badge', function() {
    this.component = ReactDOM.render(<GlobalNotificationItem>test</GlobalNotificationItem>, div);
    var badge = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'global-notification__item');

    expect(badge.className).to.equal('global-notification__item');
    expect(badge.textContent).to.equal('test');
  });

  it('should be able to add custom classes', function() {
    this.component = ReactDOM.render(<GlobalNotificationItem className="m-safe">test</GlobalNotificationItem>, div);
    var badge = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'global-notification__item');

    expect(badge.className).to.contain('m-safe');
  });
});
