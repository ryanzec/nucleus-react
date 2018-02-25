import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

// import CodeExample from '../../react/components/code-example';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/src/examples/buttons/styles'), 'utf8');

import Code from 'src/components/code/Code';
import Button from 'src/components/button/Button';

import SvgIcon from 'src/components/svg-icon/SvgIcon';
import Notification from 'src/components/notification/Notification';
import NotificationIcon from 'src/components/notification/NotificationIcon';
import NotificationMessage from 'src/components/notification/NotificationMessage';
import NotificationActions from 'src/components/notification/NotificationActions';
import NotificationContainer from 'src/components/notification/NotificationContainer';

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
          <NotificationIcon styleType="success" fragment="check" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions styleType="success" type="icons" actions="both" />
        </Notification>
        <Notification styleType="info" className="u-margin-bottom-12">
          <NotificationIcon styleType="info" fragment="info" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions styleType="info" type="text" actions="both" />
        </Notification>
        <Notification styleType="warning" className="u-margin-bottom-12">
          <NotificationIcon styleType="warning" fragment="exclamation" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions styleType="warning" type="text" actions="negative" />
        </Notification>
        <Notification styleType="danger" className="u-margin-bottom-12">
          <NotificationIcon styleType="danger" fragment="times" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions styleType="danger" type="icons" actions="positive" />
        </Notification>
        <h2>Filled</h2>
        <Notification styleType="success" isFilled={true} className="u-margin-bottom-12">
          <NotificationIcon isFilled={true} styleType="success" fragment="check" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions isFilled={true} styleType="success" type="icons" actions="both" />
        </Notification>
        <Notification styleType="info" isFilled={true} className="u-margin-bottom-12">
          <NotificationIcon isFilled={true} styleType="info" fragment="info" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions isFilled={true} styleType="info" type="text" actions="both" />
        </Notification>
        <Notification styleType="warning" isFilled={true} className="u-margin-bottom-12">
          <NotificationIcon isFilled={true} styleType="warning" fragment="exclamation" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions isFilled={true} styleType="warning" type="text" actions="negative" />
        </Notification>
        <Notification styleType="danger" isFilled={true} className="u-margin-bottom-12">
          <NotificationIcon isFilled={true} styleType="danger" fragment="times" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions isFilled={true} styleType="danger" type="icons" actions="positive" />
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
      </div>
    );
  }
}

NotificationsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default NotificationsPage;
