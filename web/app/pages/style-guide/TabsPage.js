import PropTypes from 'prop-types';
import React from 'react';

import CodeExample from '../../react/components/CodeExample';

import InteractiveExample from './assets/examples/tabs/TabsInteractiveExample';

import { readFileSync } from 'fs';
import { join } from 'path';

const interactiveExampleContent = readFileSync(join(__dirname, '/assets/examples/tabs/TabsInteractiveExample.js'), 'utf8');

import Tab from 'src/components/tabs/Tabs';
import TabItem from 'src/components/tabs/Tab';

class TabsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-tabs">
        <h1>Tabs</h1>
        <CodeExample
          exampleComponent={InteractiveExample}
          codeContent={interactiveExampleContent}
        />
      </div>
    );
  }
}

TabsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default TabsPage;
