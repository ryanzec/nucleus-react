import React from 'react';
import {connect} from 'react-redux';

import applicationNotificationsActions from '../../../../src/stores/application-notifications/application-notifications.actions';

import Button from '../../../../src/components/button';

import Notification from '../../../../src/components/notification';
import NotificationIcon from '../../../../src/components/notification-icon';
import NotificationMessage from '../../../../src/components/notification-message';
import NotificationActions from '../../../../src/components/notification-actions';
import NotificationContainer from '../../../../src/components/notification-container';
import NotificationCountdown from '../../../../src/components/notification-countdown';
import ManagedNotification from '../../../../src/components/managed-notification';
import getNextId from '../../../../src/utilities/get-next-id';

class ApplicationNotificationsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.removeNotification = this.removeNotification.bind(this);
  }

  removeNotification(id) {
    this.props.dispatch(applicationNotificationsActions.remove(id));
  }

  renderApplictionNotifications() {
    var applicationNotifications = [];

    if (this.props.applicationNotifications.notifications.length > 0) {
      this.props.applicationNotifications.notifications.forEach((notification) => {
        applicationNotifications.push(
          <ManagedNotification
            key={notification.id}
            notification={notification}
            removeAction={this.removeNotification}
            className="u-margin-top-12"
          />
        );
      });
    }

    return applicationNotifications;
  }

  render() {
    return (
      <div className="p-sub-systems-application-notifications">
        <NotificationContainer>
          {this.renderApplictionNotifications()}
        </NotificationContainer>
        <Button
          styleType="success"
          onClick={this.props.onClickAdd}
        >
          Add
        </Button>
        <Button
          styleType="success"
          onClick={this.props.onClickAddAutoClose}
        >
          Add Auto Close
        </Button>
        <Button onClick={this.props.onClickUpdate}>
          Update
        </Button>
        <Button
          styleType="danger"
          onClick={this.props.onClickClear}
        >
          Clear
        </Button>
      </div>
    );
  }
}

ApplicationNotificationsPage.displayName = 'ApplicationNotificationsPage';

ApplicationNotificationsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

let mapStateToProps = (state) => ({
  applicationNotifications: state.applicationNotifications.toJSON()
});

let mapDispatchToProps = (dispatch) => ({
  dispatch,

  onClickAddAutoClose() {
    setTimeout(() => {
      for (var x = 1; x < 2; x += 1) {
        dispatch(applicationNotificationsActions.add({
          id: getNextId(),
          message: 'test',
          autoClose: 3000,
          iconFragment: 'exclamation',
          styleType: 'danger'
        }));
      }
    }, 0);
  },

  onClickAdd() {
    dispatch(applicationNotificationsActions.add({
      id: getNextId(),
      message: 'test',
      styleType: 'warning'
    }));
  },

  onClickUpdate() {
    dispatch(applicationNotificationsActions.update(1, {
      message: 'updated',
      styleType: 'success'
    }));
  },

  onClickClear() {
    dispatch(applicationNotificationsActions.clear());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationNotificationsPage);
