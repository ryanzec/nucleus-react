import React from 'react';

import CodeExample from '../../react/components/code-example';

import InteractiveExample from './assets/examples/tabs/interactive';

import { readFileSync } from 'fs';
import { join } from 'path';

const interactiveExampleContent = readFileSync(join(__dirname, '/assets/examples/tabs/interactive.js'), 'utf8');

import Tab from '../../../../src/components/tab';
import TabItem from '../../../../src/components/tab-item';

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
  router: React.PropTypes.object.isRequired
};

export default TabsPage;
