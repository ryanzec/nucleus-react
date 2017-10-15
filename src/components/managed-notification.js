import PropTypes from 'prop-types';
import React from 'react';

import Notification from './notification';
import NotificationIcon from './notification-icon';
import NotificationMessage from './notification-message';
import NotificationActions from './notification-actions';
import NotificationCountdown from './notification-countdown';

class ManagedNotification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      closeTimeoutId: null
    };
  }

  componentWillMount() {
    if (this.props.notification.autoClose) {
      this.setState({
        closeTimeoutId: setTimeout(() => {
          this.props.removeAction(this.props.notification.id);
        }, this.props.notification.autoClose)
      });
    }
  }

  onMouseEnterNotification = () => {
    if (this.state.closeTimeoutId) {
      clearTimeout(this.state.closeTimeoutId);

      this.setState({
        closeTimeoutId: null
      });
    }
  };

  onMouseLeaveNotification = () => {
    if (this.props.notification.autoClose) {
      this.start = new Date().getTime();

      this.setState({
        closeTimeoutId: setTimeout(() => {
          this.props.removeAction(this.props.notification.id);
        }, this.props.notification.autoClose)
      });
    }
  };

  onClickNegative = () => {
    this.props.removeAction(this.props.notification.id);
  };

  onClickPositive = () => {
    this.props.removeAction(this.props.notification.id);
  };

  render() {
    const countdownNode = this.props.notification.autoClose && this.state.closeTimeoutId
      ? <NotificationCountdown length={this.props.notification.autoClose} />
      : null;

    return (
      <Notification
        isFilled
        styleType={this.props.notification.styleType || 'success'}
        hasShadow
        onMouseEnter={this.onMouseEnterNotification}
        onMouseLeave={this.onMouseLeaveNotification}
        className={this.props.className}
      >
        <NotificationIcon fragment={this.props.notification.iconFragment || 'check'} />
        <NotificationMessage>
          {this.props.notification.message}
        </NotificationMessage>
        <NotificationActions
          type="icons"
          actions="both"
          onClickNegative={this.onClickNegative}
          onClickPositive={this.onClickPositive}
        />
        {countdownNode}
      </Notification>
    );
  }
}

ManagedNotification.propTypes = {
  className: PropTypes.string,
  notification: PropTypes.object.isRequired,
  removeAction: PropTypes.func.isRequired
};

ManagedNotification.defaultProps = {
  className: null,
  notification: {},
  removeAction: null
};

export default ManagedNotification;
