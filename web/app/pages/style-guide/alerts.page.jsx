import React from 'react';

import CodeExample from '../../react/components/code-example.component.jsx';

import Alert from '../../../../assets/components/progress-bar.component.jsx';

// import StylesExample from './assets/examples/buttons/styles.jsx';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/assets/examples/buttons/styles.jsx'), 'utf8');

class AlertsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-alerts">
        <h1>Alerts</h1>
      </div>
    );
  }
}

AlertsPage.displayName = 'AlertsPage';

AlertsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default AlertsPage;
