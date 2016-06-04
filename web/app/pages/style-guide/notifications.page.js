import React from 'react';

// import CodeExample from '../../react/components/code-example';

// import StylesExample from './src/examples/buttons/styles';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/src/examples/buttons/styles'), 'utf8');

import SvgIcon from '../../../../src/components/svg-icon';
import Notification from '../../../../src/components/notification';
import NotificationIcon from '../../../../src/components/notification-icon';
import NotificationMessage from '../../../../src/components/notification-message';
import NotificationActions from '../../../../src/components/notification-actions';

class NotificationsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-notifications">
        <h1>Notifications</h1>
        <h2>Basic</h2>
        <Notification styleType="success" className="margin-bottom-10">
          <NotificationIcon fragment="check" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="icons" actions="both" />
        </Notification>
        <Notification styleType="info" className="margin-bottom-10">
          <NotificationIcon fragment="info" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="text" actions="both" />
        </Notification>
        <Notification styleType="warning" className="margin-bottom-10">
          <NotificationIcon fragment="exclamation" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="text" actions="negative" />
        </Notification>
        <Notification styleType="danger" className="margin-bottom-10">
          <NotificationIcon fragment="time" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="icons" actions="positive" />
        </Notification>
        <h2>Filled</h2>
        <Notification styleType="success" isFilled={true} className="margin-bottom-10">
          <NotificationIcon fragment="check" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="icons" actions="both" />
        </Notification>
        <Notification styleType="info" isFilled={true} className="margin-bottom-10">
          <NotificationIcon fragment="info" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="text" actions="both" />
        </Notification>
        <Notification styleType="warning" isFilled={true} className="margin-bottom-10">
          <NotificationIcon fragment="exclamation" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="text" actions="negative" />
        </Notification>
        <Notification styleType="danger" isFilled={true} className="margin-bottom-10">
          <NotificationIcon fragment="times" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="icons" actions="positive" />
        </Notification>
        <h2>Shadows</h2>
        <Notification styleType="success" hasShadow={true} className="margin-bottom-10">
          <NotificationIcon fragment="check" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="icons" actions="both" />
        </Notification>
        <Notification styleType="info" isFilled={true} hasShadow={true} className="margin-bottom-10">
          <NotificationIcon fragment="info" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="text" actions="both" />
        </Notification>
        <Notification styleType="warning" hasShadow={true} className="margin-bottom-10">
          <NotificationIcon fragment="exclamation" />
          <NotificationMessage>
            This is a BeeYouTeeful notification
          </NotificationMessage>
          <NotificationActions type="text" actions="negative" />
        </Notification>
        <Notification styleType="danger" isFilled={true} hasShadow={true} className="margin-bottom-10">
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

NotificationsPage.displayName = 'NotificationsPage';

NotificationsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default NotificationsPage;
