var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var Modal = require('../../../../assets/components/modal.component.jsx');
var testHelper = require('../../../test-helper');

describe('modal component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = React.render(<Modal>This is modal content</Modal>, div);
    var modal = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'modal');
    var modalContent = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'modal__content');

    expect(modal.props.className).to.equal('modal m-center');
    expect(modalContent.props.children).to.equal('This is modal content');
  });

  it('should display when active', function() {
    this.component = React.render(<Modal isActive={true}>This is modal content</Modal>, div);
    var modal = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'modal');

    expect(modal.props.className).to.equal('modal m-center is-active');
  });

  it('should be able to add custom classes', function() {
    this.component = React.render(<Modal className="m-absolute">This is modal content</Modal>, div);
    var modal = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'modal');

    expect(modal.props.className).to.equal('modal m-center m-absolute');
  });
});
