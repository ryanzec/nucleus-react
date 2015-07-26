var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var ConfirmationModal = require('../../../../assets/components/confirmation-modal.component.jsx');
var testHelper = require('../../../test-helper');

describe('confirmation modal component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = React.render(
      <ConfirmationModal
        isActive={true}
        onConfirm={function(){}}
        onDecline={function(){}}
      >
        Confirmation Modal
      </ConfirmationModal>, div);
    var confirmationModal = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'confirmation-modal');
    var confirmationActions = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'confirmation-modal__actions');
    var modal = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'modal');

    expect(confirmationModal.props.className).to.equal('confirmation-modal');
    expect(modal.props.children.props.children[0]).to.equal('Confirmation Modal');
    expect(confirmationActions.props.className).to.equal('confirmation-modal__actions');
    expect(confirmationActions.props.children.length).to.equal(2);
    expect(confirmationActions.props.children[0].props.children).to.equal('Yes');
    expect(confirmationActions.props.children[1].props.children).to.equal('No');
  });

  it('should be able to add custom classes', function() {
    this.component = React.render(
      <ConfirmationModal
        isActive={true}
        onConfirm={function(){}}
        onDecline={function(){}}
        className="m-safe"
      >
        Confirmation Modal
      </ConfirmationModal>, div);
    var confirmationModal = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'confirmation-modal');

    expect(confirmationModal.props.className).to.equal('confirmation-modal m-safe');
  });

  it('should be able to set custom action text', function() {
    this.component = React.render(
      <ConfirmationModal
        isActive={true}
        onConfirm={function(){}}
        onDecline={function(){}}
        confirmText="confirm"
        declineText="decline"
      >
        Confirmation Modal
      </ConfirmationModal>, div);
    var confirmationActions = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'confirmation-modal__actions');

    expect(confirmationActions.props.children[0].props.children).to.equal('confirm');
    expect(confirmationActions.props.children[1].props.children).to.equal('decline');
  });

  it('should be able to set action callbacks', function() {
    var test = null;

    this.component = React.render(
      <ConfirmationModal
        isActive={true}
        onConfirm={function(){
          test = 'confirm';
        }}
        onDecline={function(){
          test = 'decline'
        }}
        confirmText="confirm"
        declineText="decline"
      >
        Confirmation Modal
      </ConfirmationModal>, div);
    var confirmAction = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'confirmation-modal__confirm-action');
    var declineAction = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'confirmation-modal__decline-action');

    reactTestUtils.Simulate.click(confirmAction);

    expect(test).to.equal('confirm');

    reactTestUtils.Simulate.click(declineAction);

    expect(test).to.equal('decline');
  });
});
