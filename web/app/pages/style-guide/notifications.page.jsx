import React from 'react';

// import CodeExample from '../../react/components/code-example.component.jsx';

// import StylesExample from './assets/examples/buttons/styles.jsx';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/assets/examples/buttons/styles.jsx'), 'utf8');

import SvgIcon from '../../../../assets/components/svg-icon.component.jsx';
import Notification from '../../../../assets/components/notification.component.jsx';
import NotificationIcon from '../../../../assets/components/notification-icon.component.jsx';
import NotificationMessage from '../../../../assets/components/notification-message.component.jsx';
import NotificationActions from '../../../../assets/components/notification-actions.component.jsx';

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
