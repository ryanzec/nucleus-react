var React = require('react/addons');
var Modal = require('./modal.component.jsx');
var Button = require('./button.component.jsx');

var confirmationModal = {};

confirmationModal.displayName = 'ConfirmationModal';

confirmationModal.mixins = [
  React.addons.PureRenderMixin
];

confirmationModal.propTypes = {
  className: React.PropTypes.string,
  onConfirm: React.PropTypes.func.isRequired,
  onDecline: React.PropTypes.func.isRequired,
  isActive: React.PropTypes.bool,
  confirmText: React.PropTypes.string,
  declineText: React.PropTypes.string,
  disableButtons: React.PropTypes.bool
};

confirmationModal.getDefaultProps = function confirmationModalGetDefaultProps() {
  return {
    className: null,
    onConfirm: null,
    onDecline: null,
    isActive: false,
    confirmText: 'Yes',
    declineText: 'No',
    disableButtons: false
  };
};

confirmationModal.getCssClasses = function confirmationModalGetCssClasses() {
  var cssClasses = ['confirmation-modal'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

confirmationModal.render = function confirmationModalRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      <Modal isActive={this.props.isActive}>
        {this.props.children}
        <div className="confirmation-modal__actions">
          <Button
            className="confirmation-modal__confirm-action"
            onClick={this.props.onConfirm}
            disabled={this.props.disableButtons}
          >
            {this.props.confirmText}
          </Button>
          <Button
            className="confirmation-modal__decline-action"
            onClick={this.props.onDecline}
            disabled={this.props.disableButtons}
          >
            {this.props.declineText}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

module.exports = React.createClass(confirmationModal);
