import React from 'react';
import {connect} from 'react-redux';

// import CodeExample from '../../react/components/code-example';

// import StylesExample from './src/examples/buttons/styles';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/src/examples/buttons/styles'), 'utf8');

import applicationNotificationsActions from '../../store/application-notifications/application-notifications.actions';

import Code from '../../../../src/components/code';
import Button from '../../../../src/components/button';

import SvgIcon from '../../../../src/components/svg-icon';
import Notification from '../../../../src/components/notification';
import NotificationIcon from '../../../../src/components/notification-icon';
import NotificationMessage from '../../../../src/components/notification-message';
import NotificationActions from '../../../../src/components/notification-actions';
import NotificationContainer from '../../../../src/components/notification-container';
import getNextId from '../../../../src/utilities/get-next-id';

class NotificationsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  generateOnClickNegative(id) {
    return () => {
      this.props.dispatch(applicationNotificationsActions.remove(id));
    };
  }

  generateOnClickPositive(id) {
    return () => {
      this.props.dispatch(applicationNotificationsActions.remove(id));
    };
  }

  renderApplictionNotifications() {
    var applicationNotifications = [];

    if (this.props.applicationNotifications.notifications.length > 0) {
      this.props.applicationNotifications.notifications.forEach((notification) => {
        applicationNotifications.push(
          <Notification
            styleType="success"
            className="u-margin-bottom-12"
            hasShadow={true}
          >
            <NotificationIcon fragment="check" />
            <NotificationMessage>
              {notification.message}
            </NotificationMessage>
            <NotificationActions
              type="icons"
              actions="both"
              onClickNegative={this.generateOnClickNegative(notification.id)}
              onClickPositive={this.generateOnClickPositive(notification.id)}
            />
          </Notification>
        );
      });
    }

    return applicationNotifications;
  }

  render() {
    return (
      <div className="p-style-guide-notifications">
        <h1>Notifications</h1>
        <h2>Basic</h2>
        <Notification styleType="success" className="u-margin-bottom-12">
          <NotificationIcon fragment="check" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="icons" actions="both" />
        </Notification>
        <Notification styleType="info" className="u-margin-bottom-12">
          <NotificationIcon fragment="info" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="text" actions="both" />
        </Notification>
        <Notification styleType="warning" className="u-margin-bottom-12">
          <NotificationIcon fragment="exclamation" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="text" actions="negative" />
        </Notification>
        <Notification styleType="danger" className="u-margin-bottom-12">
          <NotificationIcon fragment="times" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="icons" actions="positive" />
        </Notification>
        <h2>Filled</h2>
        <Notification styleType="success" isFilled={true} className="u-margin-bottom-12">
          <NotificationIcon fragment="check" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="icons" actions="both" />
        </Notification>
        <Notification styleType="info" isFilled={true} className="u-margin-bottom-12">
          <NotificationIcon fragment="info" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="text" actions="both" />
        </Notification>
        <Notification styleType="warning" isFilled={true} className="u-margin-bottom-12">
          <NotificationIcon fragment="exclamation" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="text" actions="negative" />
        </Notification>
        <Notification styleType="danger" isFilled={true} className="u-margin-bottom-12">
          <NotificationIcon fragment="times" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="icons" actions="positive" />
        </Notification>
        <h2>Shadows</h2>
        <Notification styleType="success" hasShadow={true} className="u-margin-bottom-12">
          <NotificationIcon fragment="check" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="icons" actions="both" />
        </Notification>
        <Notification styleType="info" isFilled={true} hasShadow={true} className="u-margin-bottom-12">
          <NotificationIcon fragment="info" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="text" actions="both" />
        </Notification>
        <Notification styleType="warning" hasShadow={true} className="u-margin-bottom-12">
          <NotificationIcon fragment="exclamation" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="text" actions="negative" />
        </Notification>
        <Notification styleType="danger" isFilled={true} hasShadow={true} className="u-margin-bottom-12">
          <NotificationIcon fragment="times" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="icons" actions="positive" />
        </Notification>
        <h2>NotificationContainer</h2>
        <div>
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
      </div>
    );
  }
}

NotificationsPage.displayName = 'NotificationsPage';

NotificationsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

let mapStateToProps = (state) => ({
  applicationNotifications: state.applicationNotifications.toJSON()
});

let mapDispatchToProps = (dispatch) => ({
  dispatch,

  onClickAddAutoClose() {
    dispatch(applicationNotificationsActions.add({
      id: getNextId(),
      message: 'test',
      autoClose: 3000
    }));
  },

  onClickAdd() {
    dispatch(applicationNotificationsActions.add({
      id: getNextId(),
      message: 'test'
    }));
  },

  onClickUpdate() {
    dispatch(applicationNotificationsActions.update(1, {
      message: 'updated'
    }));
  },

  onClickClear() {
    dispatch(applicationNotificationsActions.clear());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsPage);
