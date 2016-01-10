var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var FlexRow = require('../../../../assets/components/flex-row.component.jsx');
var testHelper = require('../../../test-helper');

describe('flex row component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = ReactDOM.render(<FlexRow>1</FlexRow>, div);

    expect(ReactDOM.findDOMNode(this.component).className).to.equal('flex-row');
    expect(ReactDOM.findDOMNode(this.component).textContent).to.equal('1');
  });

  it('should be set column alignment vertically', function() {
    this.component = ReactDOM.render(<FlexRow verticalAlign="center">1</FlexRow>, div);

    expect(ReactDOM.findDOMNode(this.component).className).to.equal('flex-row m-vertical-align-center');
  });

  it('should be set column alignment horizontally', function() {
    this.component = ReactDOM.render(<FlexRow horizontalAlign="center">1</FlexRow>, div);

    expect(ReactDOM.findDOMNode(this.component).className).to.equal('flex-row m-horizontal-align-center');
  });

  it('should be able to add css classes', function() {
    this.component = ReactDOM.render(<FlexRow className="m-safe">1</FlexRow>, div);

    expect(ReactDOM.findDOMNode(this.component).className).to.equal('flex-row m-safe');
  });

  it('should be able to set if it has margin on the sides', function() {
    this.component = ReactDOM.render(<FlexRow hasMargin={true}>1</FlexRow>, div);

    expect(ReactDOM.findDOMNode(this.component).className).to.equal('flex-row m-has-margin');
  });

  it('should be able to set if it has no gutters', function() {
    this.component = ReactDOM.render(<FlexRow hasGutter={false}>1</FlexRow>, div);

    expect(ReactDOM.findDOMNode(this.component).className).to.equal('flex-row m-no-gutter');
  });
});
