var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var FlexCell = require('../../../../assets/components/flex-cell.component.jsx');
var testHelper = require('../../../test-helper');

describe('flex cell component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = React.render(<FlexCell>1</FlexCell>, div);
    var dataCell = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'flex-row__cell-data');

    expect(this.component.getDOMNode().className).to.equal('flex-row__cell');
    expect(dataCell.props.children).to.equal('1');
  });

  it('should be able to set small columns', function() {
    this.component = React.render(<FlexCell smallColumns={4}>1</FlexCell>, div);

    expect(this.component.getDOMNode().className).to.equal('flex-row__cell m-small-columns4');
  });

  it('should not be able to set small columns over max value', function() {
    this.component = React.render(<FlexCell smallColumns={94}>1</FlexCell>, div);

    expect(this.component.getDOMNode().className).to.equal('flex-row__cell m-small-columns12');
  });

  it('should be able to set medium columns', function() {
    this.component = React.render(<FlexCell mediumColumns={4}>1</FlexCell>, div);

    expect(this.component.getDOMNode().className).to.equal('flex-row__cell m-medium-columns4');
  });

  it('should not be able to set medium columns over max value', function() {
    this.component = React.render(<FlexCell mediumColumns={94}>1</FlexCell>, div);

    expect(this.component.getDOMNode().className).to.equal('flex-row__cell m-medium-columns12');
  });

  it('should be set columns', function() {
    this.component = React.render(<FlexCell columns={4}>1</FlexCell>, div);

    expect(this.component.getDOMNode().className).to.equal('flex-row__cell m-columns4');
  });

  it('should not be set columns over max limit', function() {
    this.component = React.render(<FlexCell columns={94}>1</FlexCell>, div);

    expect(this.component.getDOMNode().className).to.equal('flex-row__cell m-columns12');
  });

  it('should be able to set large columns', function() {
    this.component = React.render(<FlexCell largeColumns={4}>1</FlexCell>, div);

    expect(this.component.getDOMNode().className).to.equal('flex-row__cell m-large-columns4');
  });

  it('should not be able to set large columns over max limit', function() {
    this.component = React.render(<FlexCell largeColumns={94}>1</FlexCell>, div);

    expect(this.component.getDOMNode().className).to.equal('flex-row__cell m-large-columns12');
  });

  it('should be set alignment', function() {
    this.component = React.render(<FlexCell align="center">1</FlexCell>, div);

    expect(this.component.getDOMNode().className).to.equal('flex-row__cell m-align-center');
  });

  it('should be set flex', function() {
    this.component = React.render(<FlexCell flex={true}>1</FlexCell>, div);

    expect(this.component.getDOMNode().className).to.equal('flex-row__cell m-flex');
  });

  it('should be able to add css classes', function() {
    this.component = React.render(<FlexCell className="m-safe">1</FlexCell>, div);

    expect(this.component.getDOMNode().className).to.equal('flex-row__cell m-safe');
  });
});
