var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var FlexCell = require('../../../../assets/components/flex-cell.component.jsx');
var testHelper = require('../../../test-helper');

describe('flex cell component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = ReactDOM.render(<FlexCell>1</FlexCell>, div);
    var dataCell = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'flex-row__cell-data');

    expect(ReactDOM.findDOMNode(this.component).className).to.equal('flex-row__cell');
    expect(dataCell.textContent).to.equal('1');
  });

  it('should be able to set small columns', function() {
    this.component = ReactDOM.render(<FlexCell smallColumns={4}>1</FlexCell>, div);

    expect(ReactDOM.findDOMNode(this.component).className).to.equal('flex-row__cell m-small-columns4');
  });

  it('should not be able to set small columns over max value', function() {
    this.component = ReactDOM.render(<FlexCell smallColumns={94}>1</FlexCell>, div);

    expect(ReactDOM.findDOMNode(this.component).className).to.equal('flex-row__cell m-small-columns12');
  });

  it('should be able to set medium columns', function() {
    this.component = ReactDOM.render(<FlexCell mediumColumns={4}>1</FlexCell>, div);

    expect(ReactDOM.findDOMNode(this.component).className).to.equal('flex-row__cell m-medium-columns4');
  });

  it('should not be able to set medium columns over max value', function() {
    this.component = ReactDOM.render(<FlexCell mediumColumns={94}>1</FlexCell>, div);

    expect(ReactDOM.findDOMNode(this.component).className).to.equal('flex-row__cell m-medium-columns12');
  });

  it('should be able to set large columns', function() {
    this.component = ReactDOM.render(<FlexCell largeColumns={4}>1</FlexCell>, div);

    expect(ReactDOM.findDOMNode(this.component).className).to.equal('flex-row__cell m-large-columns4');
  });

  it('should not be able to set large columns over max limit', function() {
    this.component = ReactDOM.render(<FlexCell largeColumns={94}>1</FlexCell>, div);

    expect(ReactDOM.findDOMNode(this.component).className).to.equal('flex-row__cell m-large-columns12');
  });

  it('should be set extra large columns', function() {
    this.component = ReactDOM.render(<FlexCell extraLargeColumns={4}>1</FlexCell>, div);

    expect(ReactDOM.findDOMNode(this.component).className).to.equal('flex-row__cell m-extra-large-columns4');
  });

  it('should not be set extra large columns over max limit', function() {
    this.component = ReactDOM.render(<FlexCell extraLargeColumns={94}>1</FlexCell>, div);

    expect(ReactDOM.findDOMNode(this.component).className).to.equal('flex-row__cell m-extra-large-columns12');
  });

  it('should be set vertical alignment', function() {
    this.component = ReactDOM.render(<FlexCell verticalAlign="center">1</FlexCell>, div);

    expect(ReactDOM.findDOMNode(this.component).className).to.equal('flex-row__cell m-vertical-align-center');
  });

  it('should be set flex', function() {
    this.component = ReactDOM.render(<FlexCell flex={true}>1</FlexCell>, div);

    expect(ReactDOM.findDOMNode(this.component).className).to.equal('flex-row__cell m-flex');
  });

  it('should be able to add css classes to cell data element', function() {
    this.component = ReactDOM.render(<FlexCell className="m-safe">1</FlexCell>, div);
    var dataCell = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'flex-row__cell-data');

    expect(ReactDOM.findDOMNode(this.component).className).to.equal('flex-row__cell');
    expect(ReactDOM.findDOMNode(dataCell).className).to.equal('flex-row__cell-data m-safe');
  });
});
