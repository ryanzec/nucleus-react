var React = require('react/addons');
var nucleusReact = require('../../../../../assets/index');
var GlobalNotification = nucleusReact.components.GlobalNotification;
var GlobalNotificationItem = nucleusReact.components.GlobalNotificationItem;
var SvgIcon = nucleusReact.components.SvgIcon;

module.exports = {
  name: 'Notification',
  type: 'component',
  overview: (
    <p>
      Global notifications.
    </p>
  ),
  properties: [],
  examples: [{
    description: (
      <p>
        Standard .
      </p>
    ),
    example: (
      <GlobalNotification>
        <GlobalNotificationItem>
          <SvgIcon fragment="user" />
          <div>
            Something is happening
          </div>
        </GlobalNotificationItem>
        <GlobalNotificationItem className="m-safe">
          <SvgIcon fragment="user" />
          <div>
            Something is happening
          </div>
        </GlobalNotificationItem>
        <GlobalNotificationItem className="m-notice">
          <div>
            Something is happening
          </div>
        </GlobalNotificationItem>
        <GlobalNotificationItem className="m-warning">
          <SvgIcon fragment="user" />
          <div>
            Something is happening
          </div>
        </GlobalNotificationItem>
        <GlobalNotificationItem className="m-danger">
          <SvgIcon fragment="user" />
          <div>
            Something is happening
          </div>
        </GlobalNotificationItem>
      </GlobalNotification>
    ),
    exampleString: '<Badge>Standard</Badge>'
  }]
};
