var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var GlobalNotification = require('../../../../assets/components/global-notification.component.jsx');
var testHelper = require('../../../test-helper');

describe('global notification component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should be able to render badge', function() {
    this.component = React.render(<GlobalNotification>test</GlobalNotification>, div);
    var badge = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'global-notification');

    expect(badge.props.className).to.equal('global-notification m-top-center');
    expect(badge.props.children).to.equal('test');
  });

  it('should be able to add custom classes', function() {
    this.component = React.render(<GlobalNotification className="m-safe">test</GlobalNotification>, div);
    var badge = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'global-notification');

    expect(badge.props.className).to.contain('m-safe');
  });
});
