var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var BadgeGroup = require('../../../../assets/components/badge-group.component.jsx');
var testHelper = require('../../../test-helper');

describe('badge group component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = ReactDOM.render(<BadgeGroup></BadgeGroup>, div);
    var element = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'badge-group');

    expect(element.className).to.equal('badge-group');
  });

  it('should be able to add custom classes', function() {
    this.component = ReactDOM.render(<BadgeGroup className="m-safe">badge</BadgeGroup>, div);
    var element = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'badge-group');

    expect(element.className).to.contain('m-safe');
  });
});
