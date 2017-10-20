import PropTypes from 'prop-types';
import React from 'react';

import Notification from './Notification';
import NotificationIcon from './NotificationIcon';
import NotificationMessage from './NotificationMessage';
import NotificationActions from './NotificationActions';
import NotificationCountdown from './NotificationCountdown';

export const createComponentWillMount = (instance) => {
  return () => {
    if (instance.props.notification.autoClose) {
      instance.setState({
        closeTimeoutId: setTimeout(() => {
          instance.props.removeAction(instance.props.notification.id);
        }, instance.props.notification.autoClose)
      });
    }
  };
};

export const createOnMouseEnterNotification = (instance) => {
  return () => {
    if (instance.state.closeTimeoutId) {
      clearTimeout(instance.state.closeTimeoutId);

      instance.setState({
        closeTimeoutId: null
      });
    }
  };
};

export const createOnMouseLeaveNotification = (instance) => {
  return () => {
    if (instance.props.notification.autoClose) {
      instance.start = new Date().getTime();

      instance.setState({
        closeTimeoutId: setTimeout(() => {
          instance.props.removeAction(instance.props.notification.id);
        }, instance.props.notification.autoClose)
      });
    }
  };
};

export const createOnClickNegative = (instance) => {
  return () => {
    instance.props.removeAction(instance.props.notification.id);
  };
};

export const createOnClickPositive = (instance) => {
  return () => {
    instance.props.removeAction(instance.props.notification.id);
  };
};

// TODO: PureComponent?
class ManagedNotification extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    notification: PropTypes.object.isRequired,
    removeAction: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: null,
    notification: {},
    removeAction: null
  };

  constructor(props) {
    super(props);

    this.state = {
      closeTimeoutId: null
    };
  }

  componentWillMount = createComponentWillMount(this);
  onMouseEnterNotification = createOnMouseEnterNotification(this);
  onMouseLeaveNotification = createOnMouseLeaveNotification(this);
  onClickNegative = createOnClickNegative(this);
  onClickPositive = createOnClickPositive(this);

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

export default ManagedNotification;
