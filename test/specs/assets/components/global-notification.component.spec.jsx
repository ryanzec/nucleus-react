var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var GlobalNotification = require('../../../../assets/components/global-notification.component.jsx');
var testHelper = require('../../../test-helper');

describe('global notification component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should be able to render badge', function() {
    this.component = ReactDOM.render(<GlobalNotification>test</GlobalNotification>, div);
    var badge = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'global-notification');

    expect(badge.className).to.equal('global-notification m-top-center');
    expect(badge.textContent).to.equal('test');
  });

  it('should be able to add custom classes', function() {
    this.component = ReactDOM.render(<GlobalNotification className="m-safe">test</GlobalNotification>, div);
    var badge = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'global-notification');

    expect(badge.className).to.contain('m-safe');
  });
});
