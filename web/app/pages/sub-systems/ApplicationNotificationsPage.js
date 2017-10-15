import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';

import applicationNotificationsActions from '../../../../src/stores/application-notifications/applicationNotificationsActions';

import { CSSTransitionGroup } from 'react-transition-group';
import Button from '../../../../src/components/button/Button';
import Notification from '../../../../src/components/notification/Notification';
import NotificationIcon from '../../../../src/components/notification/NotificationIcon';
import NotificationMessage from '../../../../src/components/notification/NotificationMessage';
import NotificationActions from '../../../../src/components/notification/NotificationActions';
import NotificationContainer from '../../../../src/components/notification/NotificationContainer';
import NotificationCountdown from '../../../../src/components/notification/NotificationCountdown';
import ManagedNotification from '../../../../src/components/notification/ManagedNotification';

class ApplicationNotificationsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  removeNotification = id => {
    this.props.dispatch(applicationNotificationsActions.remove(id));
  };

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
          <CSSTransitionGroup
            transitionName="fade-out"
            transitionEnterTimeout={100}
            transitionLeaveTimeout={500}
          >
            {this.renderApplictionNotifications()}
          </CSSTransitionGroup>
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

ApplicationNotificationsPage.contextTypes = {
  router: PropTypes.object.isRequired
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
          id: uuid(),
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
      id: uuid(),
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
