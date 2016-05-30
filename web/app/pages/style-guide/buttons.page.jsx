import React from 'react';

import CodeExample from '../../react/components/code-example.component.jsx';

import StylesExample from './assets/examples/buttons/styles.jsx';

import { readFileSync } from 'fs';
import { join } from 'path';

const stylesExampleContent = readFileSync(join(__dirname, '/assets/examples/buttons/styles.jsx'), 'utf8');

class ButtonsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-buttons">
        <h1>Buttons</h1>
        <h2>Styles</h2>
        <p>The buttons provide a number of different stylistic options</p>
        <CodeExample
          headerText="Styles"
          exampleComponent={StylesExample}
          codeContent={stylesExampleContent}
        />
      </div>
    );
  }
}

ButtonsPage.displayName = 'ButtonsPage';

ButtonsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ButtonsPage;
