var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var Badge = require('../../../../assets/components/badge.component.jsx');
var testHelper = require('../../../test-helper');

describe('badge component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should be able to render badge', function() {
    this.component = ReactDOM.render(<Badge>badge</Badge>, div);
    var badge = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'badge');

    expect(badge.className).to.equal('badge');
    expect(badge.textContent).to.equal('badge');
  });

  it('should be able to add custom classes', function() {
    this.component = ReactDOM.render(<Badge className="m-safe">badge</Badge>, div);
    var badge = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'badge');

    expect(badge.className).to.equal('badge m-safe');
  });
});
